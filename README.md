# consentlens


ConsentLens is a Chrome extension designed to detect and highlight tracking elements on any webpage before cookie consent is given. It helps users identify scripts, iframes, hidden inputs, and third-party network calls that may be capturing user data without explicit permission.

This project was created to demonstrate how real-time browser behavior can be analyzed using JavaScript and browser APIs, while promoting user awareness of hidden or early-loading trackers.

## Features

- Detects tracking scripts from common analytics and advertising providers
- Highlights hidden input fields that may be used for invisible data collection
- Identifies iframes that load third-party content
- Monitors all network requests made by the page and flags potential trackers
- Displays a floating dashboard summarizing all detected elements

## Technologies Used

- JavaScript (vanilla)
- Chrome Extension (Manifest V3)
- MutationObserver API
- Performance API
- DOM manipulation
- localStorage

## How to Use

1. Clone or download this repository.
2. Open Google Chrome and go to `chrome://extensions`
3. Enable Developer Mode (toggle in the top right corner)
4. Click "Load Unpacked"
5. Select the folder containing the cloned repository
6. Visit any website and ConsentLens will automatically activate
7. A floating panel will appear with a summary of detected trackers, and all flagged elements will be highlighted directly on the page

## File Overview

- `manifest.json` – Chrome extension configuration file
- `consentlens.js` – Core detection and UI logic
- `icon128.png` – Extension icon
- `README.md` – Project documentation

## Purpose of the Project

This project was built to explore how browser-based JavaScript can be used to analyze runtime page behavior in a privacy-focused context. It reflects my interest in combining user experience design with practical security and privacy tools.

The goal was to create something lightweight yet useful, without relying on any external libraries or frameworks. ConsentLens can serve as a foundation for more advanced browser privacy tools, or even evolve into a full-scale auditing product.

## Future Enhancements

- Add support for exporting scan reports in JSON format
- Maintain detection history per domain
- Enable a toggle between different sensitivity levels
- Improve UI for accessibility and visibility

## Author

Aryan Murugesh  
[GitHub: rexm5402](https://github.com/rexm5402)

If you have feedback or suggestions, feel free to open an issue or reach out.
