# Open Universiteit Period Plugin

This plugin extends Obsidian’s built-in Moment.js features to provide custom date tokens called **OUW** and **OUQ**. When you set your Daily Note (or other Obsidian date formatting options) to include "OUW" or "OUQ" it will be replaced with either:

| Token | Replacement    | Explanation                                                 |
|-------|----------------|-------------------------------------------------------------|
| OUW   | "Week #"       | For weeks 1 - 10 of the quarter, where # is the week number |
| OUW   | "Tentamenweek" | For the last week of the quarter or the last week of summer |
| OUW   | "Kerstreces"   | For the Christmas break                                     |
| OUQ   | "Q#"           | Where # is the quarter number                               |
| OUQ   | "Zomer"        | Between Q4 and the next academic year                       | 

## OU Academic Year
The week numbers in below table are ISO8601 weeknumbers. 

| Quarter | First week | Last week |
|---------|------------|-----------|
| 1       | 36         | 46        |
| 2       | 47         |  6        |
| 3       |  7         | 17        | 
| 4       | 18         | 28        |
| Summer  | 29         | 35        |

> The OU academic year has followed above pattern for several years now, but this is not an official schedule. After the study guides for the next academic year are released, I will ensure they continue to do so, or update the plugin accordingly.
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
### 0.2.0
- Summer "tentamenweek" is now supported
- Q2 "kerstreces" is now supported
- Fixed week count in Q2 post Christmas break

### 0.1.0
- Forked from https://github.com/IMB11/ObsidianLUWeeks
- Adjusted for Open Universiteit
- Cleaned up code

## Known issues
- In years with a week 53 there are two weeks of Christmas recess. These two weeks return the same string which will lead to duplicate filenames when used with e.g. periodic notes.

## License

This plugin is provided under the CC-0 License. See [LICENSE](./LICENSE) for more details.
