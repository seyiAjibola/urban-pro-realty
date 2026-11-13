# Urban Pro Realty - Demo & Google Sheets CMS Website

## What Is Included
- `index.html`: Responsive real estate website styled in Urban Pro Realty's brand colors (Black, Red, White) with live search and multi-filter controls.
- `app.js`: Clean JavaScript powered by PapaParse so it never breaks on commas or special characters.
- `assets/logo.svg`, `assets/logo-transparent.png`, `assets/logo-dark.png`: High-resolution, cleaned-up versions of the Urban Pro Realty logo.
- `google_sheet_template.csv`: Ready-to-import spreadsheet template for the client.

## How to Deploy on GitHub Pages
1. Extract the zip folder and upload all files (`index.html`, `app.js`, `README.md`, `google_sheet_template.csv`, and the `assets` folder) to a public GitHub repository.
2. Go to **Settings -> Pages**, choose the `main` branch, and click **Save**.
3. Your live demo link works immediately with 6 sample Lagos properties and active filters.

## How to Connect a Live Google Sheet
1. Import `google_sheet_template.csv` into Google Sheets.
2. In Google Sheets, go to **File -> Share -> Publish to web**, select **Comma-separated values (.csv)**, and click **Publish**.
3. Open `app.js` and paste that link inside `googleSheetCsvUrl: "PASTE_LINK_HERE"`.
