# Thank you
This plugin started out as a fork of https://github.com/IMB11/ObsidianLUWeeks. It has digressed enough to make it a standalone project, but not without proper thanks to IMB11 for the idea and a basis to work off!

# Open Universiteit Date Format Plugin
This plugin extends Obsidian’s built-in Moment.js features to provide the custom date tokens **OUW**, **OUQ**, and **OUY**. When you set your Daily Note (or other Obsidian date formatting options) to include `OUW`, `OUQ`, or `OUY` it will be replaced with either:

| Token | Replacement  | Explanation                                                      |
|-------|--------------|------------------------------------------------------------------|
| OUW   | "#"          | **Weeks 1–10** of the quarter (replace # with week number)       |
| OUW   | "T"          | **Final week** of the quarter ("T" = tentamenweek)               |
| OUW   | "Kerstreces" | **Christmas break**                                              |
| OUQ   | "#"          | **Quarter number** (replace # with quarter)                      |
| OUQ   | "Z"          | **Between Q4 and next academic year** ("Z" = zomer)              |
| OUY   | "##-##"      | **Academic year** (replace ## with YY for start and end)         |


## OU Academic Year
The week numbers in below table are ISO8601 weeknumbers. 

| Quarter | First week | Last week |
|---------|------------|-----------|
| 1       | 36         | 46        |
| 2       | 47         |  6        |
| 3       |  7         | 17        | 
| 4       | 18         | 28        |
| Summer  | 29         | 35        |

> The OU academic year has followed above pattern for several years now, but this is not an official schedule. After the study guides for each next academic year are released I will ensure they continue to do so, or update the plugin accordingly.
## Usage
### Installation
1. There are several ways to install the plugin, pick your favorite: 
   - Copy or clone the plugin files into your Obsidian vault’s plugins folder.
   - Install through [BRAT](https://tfthacker.com/brat-quick-guide).
   - ~~Download it from the Community Plugin Browser.~~ -> not at the moment, hopefully soon.
2. Ensure that you have enabled it in Obsidian’s "Community Plugins" section.

### Use with Daily Notes/Periodic Notes/Templater and others
You can now use the tokens in any place where you can use moment.js formatting. For example to use in your Daily Notes:
   - Go to Obsidian’s "Settings" → "Core Plugins" → "Daily Notes."  
   - In the **Date Format** field, include `OUW`, `OUQ`, `OUY`.  
   - Example: `OUY [Q]OUQ - [week] OUW` returns something like "2525 Q3 - week 7"

## Releases
### 0.4.0
- Remove summer "tentamenweek" as they won't take place anymore starting this academic year
- Added token `OUY` for the academic year

### 0.3.0
- Plugin cleans up after itself on unload

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
