# Lancaster University Week (LUW) Plugin

This plugin extends Obsidian’s built-in Moment.js features to provide a custom date token called **LUW**. When you set your Daily Note (or other Obsidian date formatting options) to include "LUW," it will be replaced with either:

- **Week X** (where X is the numbered Lancaster University week for the 2024/2025 academic year), or
- **VACATION** if the date does not fall within a defined term week.

---

## Academic Year 2024/2025

The plugin’s logic is currently tailored for the **2024/2025** academic year at Lancaster University. It covers:

- Weeks 1 to 10 (between 6 Oct 2023 and 15 Dec 2023)
- Weeks 11 to 21 (between 12 Jan 2024 and 22 Mar 2024)
- Weeks 22 to 30 (between 19 Apr 2024 and 28 Jun 2024)

Any date outside these date ranges will automatically show "VACATION" in place of "LUW."

> Note: We will update the plugin before the **2025/2026** academic year to maintain accuracy. In case of changes to term dates or naming conventions, you may need to adjust or update the plugin’s configuration.

---

## Usage

1. **Install the Plugin**  
   - Copy or clone the plugin files into your Obsidian vault’s plugins folder.  
   - Alternatively you can download it from the Community Plugin Browser.
   - Ensure that you have enabled it in Obsidian’s "Community Plugins" section.

2. **Set Your Daily Note Date Format**  
   - Go to Obsidian’s "Settings" → "Core Plugins" → "Daily Notes."  
   - In the **Date Format** field, include `LUW`.  
   - Example: `LUW MMM Do YYYY`

3. **Verify the Output**  
   - Create a new daily note or check your daily note for a date within the defined ranges.  
   - Confirm that "LUW" is replaced with the correct "Week X" or "VACATION."

---

## Contributing & Future Updates

- If you notice any incorrect dates or need additional features, feel free to open an issue or pull request in the repository.
- This plugin is designed for 2024/2025 term dates and will be updated before the 2025/2026 academic year.

---

## License

This plugin is provided under the CC-0 License. See [LICENSE](./LICENSE) for more details.
