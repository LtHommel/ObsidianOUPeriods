// An Obsidian plugin that registers custom "OUW" and OUQ format token in moment.js.
// You can then use "OUW" or "OUQ" in your Daily Note plugin's date format, for instance: 
//     [2425] OUQ OUW
// This will display "2425 Q4 Week 1" or "2425 Q3 Tentamenweek" in the 11th week of the quarter.
// When the current date is not supported by the plugin it will return "Week ?" or "Q?".

const { Plugin } = require("obsidian");

const ouBlocks = [
  {q: 1, start: 36, end: 46},
  {q: 2, start: 47, end: 6}, // weken 53 en 1 zijn kerstreces
  {q: 3, start: 7, end: 17},
  {q: 4, start: 18, end: 28},
  {q: "zomer", start: 29, end: 35}
]

const enhanceMomentWithOUPeriods = () => {

  const getOUBlock = function (isoWeekNumber) {

    for (const block of ouBlocks) {
      if (isoWeekNumber >= block.start && isoWeekNumber <=block.end) {
        return block;
      }
    }
    // It must be q2, the weird one.
    return ouBlocks[1];
  }

  // If ouWeek() is not already defined, we add it
  if (!window.moment.prototype.ouWeek) {
    window.moment.prototype.ouWeek = function (date) {
      
      const isoWeekNumber = date.isoWeek();
      const block = getOUBlock(isoWeekNumber);
      
        if ([53,1].includes(isoWeekNumber)) {
            return "Kerstreces";
        } else if (isoWeekNumber < ouBlocks[1].end) {
            return `Week ${isoWeekNumber + 4}`;
        } else if (isoWeekNumber == block.end) {
            return "Tentamenweek";
        } else {
            return `Week ${isoWeekNumber - block.start + 1}`;
        }
    }
  };

  // If ouQuarter() is not already defined, we add it
  if (!window.moment.prototype.ouQuarter) {
    window.moment.prototype.ouQuarter = function (date) {
      const block = getOUBlock(date.isoWeek());

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