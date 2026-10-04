# portfolio-website
Source for karska.dev: my personal site, with experience, projects and contact.

Plain HTML and CSS. There is no build step and no JavaScript.

## Structure

```
index.html            Homepage: headline, project cards, project list, experience, contact
projects/             One page per project, all sharing the same layout
  mailagent.html
  loose-ends.html
  minesweeper.html
  karska-dev-v1.html
css/style.css         All styles. Colours and fonts are variables at the top of the file
assets/img/           Project screenshots
assets/fonts/         Self-hosted fonts and their licence
favicon.svg
```

## Preview locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Editing

- **Text**: edit the HTML directly. Each project appears in three places: its card and its
  list entry in `index.html`, and its own page in `projects/`.
- **Accent colour**: change `--accent` in `css/style.css`.
- **New project**: copy one of the pages in `projects/`, then add a card and a list entry
  to `index.html` and a link in the "More projects" strip at the bottom of the other
  project pages.

All links between pages are relative, so the site works from a domain root or a subfolder.

## Credits

Typefaces: Bricolage Grotesque and DM Mono, both under the SIL Open Font License
(see `assets/fonts/LICENSE.txt`).
