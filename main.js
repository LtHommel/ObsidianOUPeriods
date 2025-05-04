// An Obsidian plugin that registers custom "OUW" and OUQ format token in moment.js.
// You can then use "OUW" or "OUQ" in your Daily Note plugin's date format, for instance: 
//     [2425] OUQ OUW
// This will display "2425 Q4 Week 1" or "2425 Q3 Tentamenweek" in the 11th week of the quarter.
// When the current date is not supported by the plugin it will return "Week ?" or "Q?".

const { Plugin } = require("obsidian");

// Define date ranges for Open Universiteit terms
const ouQuarters = [
  { q: 1, start: "2024-09-01", end: "2024-11-17"},
  { q: 2, start: "2024-11-18", end: "2025-02-09"},
  { q: 3, start: "2025-02-10", end: "2024-04-27"},
  { q: 4, start: "2025-04-28", end: "2025-07-13"},
  { q: "Zomer", start: "2025-07-14", end: "2025-08-31"} // TODO check einddatum
];

const enhanceMomentWithOUPeriods = () => {

  const currentBlock = function (date) {
    for (const block of ouQuarters) {
      // isBetween matches exclusively by default, the last parameter changes this.
      if (date.isBetween(block.start, block.end, undefined, "[]")) {
        return block;
      } 
    }
      // TODO come up with more elegant solution for unsupported dates
      return {}
}

  // If ouWeek() is not already defined, we add it
  if (!window.moment.prototype.ouWeek) {
    window.moment.prototype.ouWeek = function (date) {
      const block = currentBlock(date);
      if (block.start == undefined) {
        return "Week ?"
      }
      const daysDiff = date.diff(block.start, "days");
      const week = Math.ceil(daysDiff / 7)

      return week == 11 
        ? "Tentamenweek"
        : `Week ${week}`;
    }
  };

  // If ouQuarter() is not already defined, we add it
  if (!window.moment.prototype.ouQuarter) {
    window.moment.prototype.ouQuarter = function (date) {
      const block = currentBlock(date);

      if (block.q == undefined) {
        return "Q?"
      }
      const q = block.q;
      
      return q == "Zomer"
      ? q
      : `Q${q}`;
    };
  }
  

  // Patch moment's format() to replace "OUW" and "OUQ" with the outputs of ouWeek() and ouQuarter() respectively
  // We do this only once, indicated by a custom flag _oupInjected.
  if (!window.moment.prototype._oupInjected) {
    const originalFormat = window.moment.fn.format;
    window.moment.prototype.format = function (formatStr) {
      if (!formatStr) {
        return originalFormat.call(this, formatStr);
      }
      if (formatStr.includes("OUW")) {
        const ouWeekValue = this.ouWeek(this); // "Week 3" or "Tentamenweek"
        formatStr = formatStr.replace(/OUW/g, "[" + ouWeekValue + "]");
      }
      if (formatStr.includes("OUQ")) {
        const ouQuarterValue = this.ouQuarter(this); // "Q3" or "Zomer"
        formatStr = formatStr.replace(/OUQ/g, "[" + ouQuarterValue + "]");
      }
      return originalFormat.call(this, formatStr);
    };
    window.moment.prototype._oupInjected = true;
  }
};

module.exports = class OUPeriodsFormatTokenPlugin extends Plugin {
  async onload() {
    // Enhance the global moment with our custom OUPeriods logic
    enhanceMomentWithOUPeriods();
    console.log("OUPeriodsFormatTokenPlugin loaded");
  }

  onunload() {
    console.log("OUPeriodsFormatTokenPlugin unloaded");
  }
};