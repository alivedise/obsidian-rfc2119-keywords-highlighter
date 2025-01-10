# RFC 2119 Highlighter Plugin

## Overview

The **RFC 2119 Highlighter Plugin** is an Obsidian plugin designed to highlight RFC 2119 keywords in the editor. These keywords include:

- `MUST`, `MUST NOT`, `REQUIRED`, `SHALL`
- `SHOULD`, `SHOULD NOT`, `RECOMMENDED`, `NOT RECOMMENDED`
- `MAY`, `OPTIONAL`

Each keyword is highlighted with a distinct style to make important directives stand out in your notes.

## Features

- Highlights RFC 2119 keywords (`MUST`, `SHOULD`, `MAY`, etc.) in the editor.
- Customizable styles for each keyword (defined in the plugin settings).
- Seamless integration with the Obsidian editor.

## Installation

1. **Download the Plugin**
   - Clone or download the repository containing this plugin.

2. **Place the Plugin in Your Vault**
   - Navigate to your Obsidian vault directory.
   - Go to the `.obsidian/plugins` folder (create it if it doesn't exist).
   - Create a subfolder named `rfc2119-highlighter`.
   - Copy the `main.js` file into this folder.

3. **Enable the Plugin**
   - Open Obsidian.
   - Go to `Settings > Community Plugins`.
   - Turn off Safe Mode (if enabled).
   - Click on "Load Plugins" and enable the `RFC 2119 Highlighter` plugin from the list.

## Usage
1. Open or create a note in the editor.
2. Write text containing RFC 2119 keywords like `MUST`, `SHOULD`, or `MAY`. You MUST write in UPPERCASE.
3. The plugin will automatically highlight these keywords in the editor.

## Customization

To modify the styles for highlighted keywords:
1. Open the plugin's `KeywordHighlighterPlugin.settings` in the code.
2. Adjust the `color` or `fontWeight` properties for each keyword.
   Example:
   ```javascript
   { keyword: "MUST", style: { color: "#ff0000", fontWeight: "bold" } }
   ```

## TODO

* Add obsidian settings UI to edit the custom style.

## Contributing

Feel free to submit issues or contribute to the development of this plugin by creating pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

