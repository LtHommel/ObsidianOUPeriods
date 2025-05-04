# Open Universiteit Period Plugin

This plugin extends Obsidian’s built-in Moment.js features to provide custom date tokens called **OUW** and **OUQ**. When you set your Daily Note (or other Obsidian date formatting options) to include "OUW" or "OUQ" it will be replaced with either:

|token | replacement | explanation |
|-|-|-|
|OUW | "Week #" | In weeks 1 - 10 of the quarter, where # is the week number |
|OUW | "Tentamenweek" | In week 11 of the quarter, note that the tentamenweek in the summerperiod is not signaled |
| OUW | "Week ?" | When the date is outside the supported range (currently the academic year 2024/2025) | 
| OUQ | "Q#" | Where # is the quarter number |
|OUQ | "Zomer" | Between Q4 and the next academic year | 
|OUQ | "Q?" | When the date is outside the supported range (currently the academic year 2024/2025)|

## Academic Year 2024/2025

The plugin’s logic is currently tailored for the **2024/2025** academic year at Open Universiteit. It covers:

| quarter | start date | end date |
|-|-|-|
|1 |  1 Sep 2024 | 17 Nov 2024 |
|2 | 18 Nov 2024 | 09 Feb 2025 |
|3 | 10 Feb 2025 | 27 Apr 2025 | 
| 4 | 28 Apr 2025 | 13 Jul 2025|
| Zomer | 14 Jul 2025 | 31 Aug 2025 |


> Note: The plugin will be updated to support the **2025/2026** academic year after the study guide is released.

## Usage

1. **Install the Plugin**  
   - Copy or clone the plugin files into your Obsidian vault’s plugins folder.  
   - ~~Alternatively you can download it from the Community Plugin Browser.~~ -> not at the moment, hopefully later.
   - Ensure that you have enabled it in Obsidian’s "Community Plugins" section.

2. **Set Your Daily Note Date Format**  
   - Go to Obsidian’s "Settings" → "Core Plugins" → "Daily Notes."  
   - In the **Date Format** field, include `OUW` or `OUQ`.  
   - Example: `OUW MMM Do YYYY`

3. **Verify the Output**  
   - Create a new daily note or check your daily note for a date within the defined ranges.  
   - Confirm that "LUW" is replaced with the correct "Week X" or "VACATION."

## Releases
### 0.1.0
- Forked from https://github.com/IMB11/ObsidianLUWeeks
- Adjusted for Open Universiteit
- Cleaned up code

## Known issues
- The plugin always returns the current quarter and week, not that of the date that is formatted
- While typing this I'm realizing there is a Christmas reces, and that the week count for Q3 will be off.
- The summer tentamenweek is not supported.

## License

This plugin is provided under the CC-0 License. See [LICENSE](./LICENSE) for more details.
