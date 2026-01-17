// An Obsidian plugin that registers custom "OUW", "OUQ", and "OUY" format token in moment.js.
// You can then use "OUW", "OUQ", or "OUY" in your Daily Note plugin's date format, for instance: 
//     OUY [ Q]OUQ [ Week ]OUW
// This will display "2425 Q4 Week 1" or "2425 Q3 Week T" (=tentamenweek) in the 11th week of the quarter.

const { Plugin } = require("obsidian");
// save this puppy for unloading
const originalFormat = window.moment.fn.format;

const ZOMER = "Z";

const ouPeriods = [
  { q: "1", start: 36, end: 46 },
  { q: "2", start: 47, end: 6 }, // weken 53 en 1 zijn kerstreces
  { q: "3", start: 7, end: 17 },
  { q: "4", start: 18, end: 28 },
  { q: ZOMER, start: 29, end: 35 }
]

const enhanceMomentWithOuDateFormat = () => {

  const getOUPeriod = function (isoWeekNumber) {

    for (const period of ouPeriods) {
      if (isoWeekNumber >= period.start && isoWeekNumber <= period.end) {
        return period;
      }
    }
    // It must be q2, the weird one with a higher number for start than for end
    return ouPeriods[1];
  }

  // If ouWeek() is not already defined, we add it
  if (!window.moment.prototype.ouWeek) {
    window.moment.prototype.ouWeek = function (date) {

      const isoWeekNumber = date.isoWeek();
      const ouPeriod = getOUPeriod(isoWeekNumber);

      if ([53, 1].includes(isoWeekNumber)) {
        return "Kerstreces";
      } else if (isoWeekNumber < ouPeriods[1].end) {
        return `${isoWeekNumber + 5}`;
      } else if (isoWeekNumber === ouPeriod.end && !(isoWeekNumber === 35)) {
        return "T";
      } else {
        return `${isoWeekNumber - ouPeriod.start + 1}`;
      }
    }
  };

  // If ouQuarter() is not already defined, we add it
  if (!window.moment.prototype.ouQuarter) {
    window.moment.prototype.ouQuarter = function (date) {
      const ouPeriod = getOUPeriod(date.isoWeek());

      return ouPeriod.q;
    };
  }

  // If ouYear() is not already defined, we add it
  if (!window.moment.prototype.ouYear) {
    window.moment.prototype.ouYear = function (date) {
      const calendarYear = date.format("YY");
      const prevYear = date.subtract(1,"y").format("YY");
      const nextYear = date.add(1, "y").format("YY");

      if (date.isoWeek() >= 36) {
        return `${calendarYear}-${nextYear}}`;
      } else {
        return `${prevYear}-${calendarYear}`;
      }
    };
  }

  // Patch moment's format() to replace "OUW", "OUQ", and "OUY" with the outputs of ouWeek(), ouQuarter(), and ouYear() respectively
  // We do this only once, indicated by a custom flag _oupInjected.
  if (!window.moment.prototype._oupInjected) {

    window.moment.prototype.format = function (formatStr) {
      if (!formatStr) {
        return originalFormat.call(this, formatStr);
      }
      if (formatStr.includes("OUW")) {
        const ouWeekValue = this.ouWeek(this); // "3" or "T"
        formatStr = formatStr.replace(/OUW/g, "[" + ouWeekValue + "]");
      }
      if (formatStr.includes("OUQ")) {
        const ouQuarterValue = this.ouQuarter(this); // "2" or "Z"
        formatStr = formatStr.replace(/OUQ/g, "[" + ouQuarterValue + "]");
      }
      if (formatStr.includes("OUY")) {
        const ouYearValue = this.ouYear(this); // "2425"
        formatStr = formatStr.replace(/OUY/g, "[" + ouYearValue + "]");
      }
      return originalFormat.call(this, formatStr);
    };
    window.moment.prototype._oupInjected = true;
  }
};

module.exports = class OuDateFormatPlugin extends Plugin {
  async onload() {
    // Enhance the global moment with our custom OuDateFormat logic
    enhanceMomentWithOuDateFormat();
    console.log("OuDateFormatPlugin loaded");
  }

  onunload() {
    if (window.moment.prototype._oupInjected) {
      window.moment.prototype.format = originalFormat;

      delete window.moment.prototype._oupInjected;
      delete window.moment.prototype.ouWeek;
      delete window.moment.prototype.ouQuarter;
      delete window.moment.prototype.ouYear;
    }
    console.log("OuDateFormatPlugin unloaded");
  }
};