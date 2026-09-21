# Static Site Migration Guide: Exodus Wars Wiki

This guide provides an architectural blueprint and actionable migration roadmap to convert the extracted Exodus Wars MediaWiki archive into a modern, high-performance static website.

---

## 1. Archive Overview & Assets

The extraction from `wiki_ew.dump` produced a clean, fully-indexed content structure ready for static site transformation:

| Asset | Location | Count / Size | Description |
| :--- | :--- | :--- | :--- |
| **Main Articles** | `wiki/articles/` | 2,368 files | Core lore, factions, characters, vehicles, starships, and battles |
| **Categories** | `wiki/categories/` | 259 files | Taxonomy groupings and classification descriptions |
| **Templates & Infoboxes**| `wiki/templates/` | 38 files | 24 Infoboxes, 9 Navboxes, 5 Utilities / Docs |
| **File / Image Metadata**| `wiki/files/` | 993 files | Captions, upload notes, and licenses for wiki images |
| **Image Binaries** | `images/` | 982 files | Raw PNG, JPG, and GIF illustration assets |
| **Custom Styling** | `css/ew.css` | 1 file | Original Exodus Wars web styling (fonts, layout, colors) |
| **Pages Master Index** | `wiki/manifests/pages_index.json` | 3,860 entries | Master manifest linking titles, IDs, namespaces, authors, dates |
| **Redirects Manifest** | `wiki/manifests/redirects.json` | 323 entries | MediaWiki alias/redirect lookup table |
| **Templates Manifest** | `wiki/manifests/templates_summary.json` | 38 entries | Template schemas, parameter lists, and usage statistics |
| **Images Manifest** | `wiki/manifests/images_manifest.json` | 993 entries | DB-to-disk filename mappings and resolution status |

---

## 2. Framework Recommendations

For an encyclopedia/wiki of this scale (~2,400 articles, ~1,000 images), the following modern static site generators (SSGs) are strongly recommended:

### Recommended Choice: Astro + Starlight
- **Why**:
  - Purpose-built for documentation and knowledge bases.
  - Zero client-side JavaScript by default (ultra-fast page loads).
  - Out-of-the-box support for full-text search ([Pagefind](https://pagefind.app/)), sidebars, table of contents, and dark/light modes.
  - Native support for MDX / Astro components (`.astro`), allowing infoboxes and navboxes to be rendered as clean, reusable UI components.
  - Highly customizable with custom CSS (`css/ew.css`).

### Alternative Choice: Quartz (v4)
- **Why**:
  - Built specifically for digital gardens and wikis.
  - **Native Wikilink parsing**: Directly parses `[[Article Title]]` and `[[Article Title|Alias]]` without needing a complex markdown rewrite.
  - Interactive interactive graph view, backlinks explorer, and hover page previews.

### Alternative Choice: Hugo + Docsy / Doks
- **Why**:
  - Single Golang binary with near-instant build times (<1 second for 3,000+ pages).
  - Built-in `aliases: []` frontmatter support for handling all 323 redirects automatically.

---

## 3. Wikitext to Markdown/MDX Conversion Pipeline

To convert the MediaWiki source markup to standard Markdown or MDX, follow this multi-phase transformation pipeline:

### 3.1 Frontmatter Normalization
Every extracted `.md` file currently contains YAML frontmatter:
```yaml
---
title: "Anthony_Hadrian"
page_id: 2
namespace: 0
namespace_name: "Main"
latest_revision_id: 10616
last_updated: "2008-11-16 03:04:28"
author: "JDavis"
is_redirect: false
categories:
  - "Military_Leaders"
  - "National_Leaders"
  - "Terrans"
templates:
  - "Person_Information"
---
```
**Static Site Adjustments**:
- Convert underscore titles to clean human titles: `title: "Anthony Hadrian"`.
- Map `categories` to static site tags: `tags: ["Military Leaders", "National Leaders", "Terrans"]`.
- Slugify file paths for clean URLs (e.g. `/articles/anthony-hadrian`).

---

### 3.2 Internal Link Transformation
MediaWiki uses `[[Target|Anchor]]` and `[[Target]]`:

| Wikitext Pattern | Static Site Target | Output Markdown |
| :--- | :--- | :--- |
| `[[Anthony Hadrian]]` | Same namespace | `[Anthony Hadrian](/articles/anthony-hadrian)` |
| `[[Anthony Hadrian\|General Hadrian]]` | Custom anchor | `[General Hadrian](/articles/anthony-hadrian)` |
| `[[:Category:Terrans\|Terrans]]` | Category link | `[Terrans](/categories/terrans)` |
| `[[Category:Terrans]]` | Category tag | *Strip from body text* (already in frontmatter `categories`) |

**Handling Underscores**: MediaWiki treats spaces and underscores interchangeably. Standardize link targets by converting `_` to `-` or lowercase slugs.

---

### 3.3 Image Embed Transformation
MediaWiki image syntax:
```wikitext
[[Image:2188Howell.png|thumb|right|250px|Howell Light Fighter]]
[[File:Lucius_Black_Face_Portrait.png|frame|center|Lucius Black]]
```

**Markdown / HTML Conversion**:
- **Standard Markdown**:
  ```markdown
  ![Howell Light Fighter](/images/2188Howell.png)
  *Howell Light Fighter*
  ```
- **Semantic HTML / Astro Component**:
  ```html
  <figure class="wiki-image align-right">
    <img src="/images/2188Howell.png" alt="Howell Light Fighter" width="250" />
    <figcaption>Howell Light Fighter</figcaption>
  </figure>
  ```

#### Critical Image Filename Resolution
As identified in `wiki/manifests/images_manifest.json`, 974 images match the local `images/` directory, with 3 special cases where the database had umlauts/quotes and the disk files had normalized ASCII names:

| Database Image Name | Actual Disk File in `images/` | Handling |
| :--- | :--- | :--- |
| `Dulit\xc3\xa4t.jpg` (`Dulität.jpg`) | `Dulitat.jpg` | Map automatically via `images_manifest.json` |
| `Die-Befreier-Söhne.gif` | `Die-Befreier-Sahne.gif` | Map automatically via `images_manifest.json` |
| `Flag_of_the_Ikronin_Jurekän.png` | `Flag_of_the_Ikronin_Jurekan.png` | Map automatically via `images_manifest.json` |
| `VF-01_..._"Scimitar_Squadron"_logo.png` | `VF-01_..._-__Scimitar_Squadron__logo.png` | Map quotes to double underscores |

*19 personal / tutorial images (`CR-1.JPG`, `InkscapeTutorial*.png`, `Potis-*.JPG`, `Townview-*.JPG`) were never committed to the disk folder and can either be omitted or replaced with a placeholder.*

---

### 3.4 Typographic & Formatting Rules

| Wikitext Syntax | Markdown Syntax | Description |
| :--- | :--- | :--- |
| `== Heading 2 ==` | `## Heading 2` | Section header |
| `=== Heading 3 ===` | `### Heading 3` | Subsection header |
| `==== Heading 4 ====` | `#### Heading 4` | Sub-subsection |
| `'''Bold Text'''` | `**Bold Text**` | Strong emphasis |
| `''Italic Text''` | `*Italic Text*` | Emphasis |
| `'''''Bold Italic'''''` | `***Bold Italic***` | Strong emphasis |
| `* Item 1`<br>`** Subitem 1` | `- Item 1`<br>`  - Subitem 1` | Unordered list |
| `# Item 1`<br>`## Subitem 1` | `1. Item 1`<br>`   1. Subitem 1` | Ordered list |
| `<blockquote>...</blockquote>` | `> ...` | Blockquote |
| `{| class="wikitable"`<br>`! Header 1 !! Header 2`<br>`\|-`<br>`\| Row 1 \|\| Row 2`<br>`\|}` | `\| Header 1 \| Header 2 \|`<br>`\| :--- \| :--- \|`<br>`\| Row 1 \| Row 2 \|` | Standard tables |

---

## 4. Infobox & Navbox Component Strategy

### 4.1 Infobox as Structured Frontmatter + Component (Recommended)

Instead of maintaining brittle raw table markup inside article bodies, parse template calls into structured frontmatter data.

**Example: `articles/Anthony_Hadrian.md`**:
```yaml
---
title: "Anthony Hadrian"
infobox:
  type: "Person_Information"
  name: "Antonius 'Anthony' Aurelius Hadrian"
  birth_date: "November 7, 2060"
  birth_place: "Ailqot, Torimur, Cildeng System"
  allegiance: "Federated Districts of the Prefecture"
  profession: "Fleet Admiral, High Commissioner"
---
```

**Reusable Astro Component (`src/components/Infobox.astro`)**:
```astro
---
const { data } = Astro.props;
if (!data) return null;
---
<aside class="ew-infobox">
  <header class="ew-infobox-header">
    <h3>{data.name}</h3>
  </header>
  {data.image && (
    <figure class="ew-infobox-image">
      <img src={`/images/${data.image}`} alt={data.caption || data.name} />
      {data.caption && <figcaption>{data.caption}</figcaption>}
    </figure>
  )}
  <dl class="ew-infobox-details">
    {Object.entries(data).map(([key, val]) => {
      if (['type', 'name', 'image', 'caption'].includes(key) || !val) return null;
      return (
        <div class="ew-infobox-row">
          <dt>{key.replace(/_/g, ' ')}</dt>
          <dd set:html={val} />
        </div>
      );
    })}
  </dl>
</aside>
```

---

### 4.2 Navbox Strategy: Reusable Footer Component or Sidebar

Navbox templates (such as `{{Second_Exodus_War_Navbox}}` and `{{Tempest_War_Navbox}}`) group related historical events and factions.

In a static site:
1. Store navbox data in `src/data/navboxes.json` (derived from `wiki/manifests/templates_summary.json`).
2. Insert a component call at the bottom of articles: `<Navbox id="Second_Exodus_War" />`.
3. Alternatively, configure them as persistent **Starlight Sidebar Groups**:
   ```ts
   // astro.config.mjs
   sidebar: [
     {
       label: 'Second Exodus War',
       autogenerate: { directory: 'wars/second-exodus-war' },
     },
     {
       label: 'Fleets & Factions',
       autogenerate: { directory: 'factions' },
     }
   ]
   ```

---

## 5. Handling Redirects (323 Redirects)

MediaWiki has 323 alias and redirect pages (e.g. `AI` -> `Artificial_Intelligence`, `People` -> `Category:People`).

All 323 redirects are documented in `wiki/manifests/redirects.json`.

### Static Hosting Redirection Rules
- **Netlify (`public/_redirects`)**:
  ```text
  /articles/ai  /articles/artificial-intelligence  301
  /articles/people  /categories/people  301
  ```
- **Cloudflare Pages (`public/_redirects`)**:
  Same syntax as Netlify.
- **Vercel (`vercel.json`)**:
  ```json
  {
    "redirects": [
      { "source": "/articles/ai", "destination": "/articles/artificial-intelligence", "permanent": true }
    ]
  }
  ```
- **Astro / Starlight**:
  Use `redirects` in `astro.config.mjs`:
  ```js
  redirects: {
    '/articles/ai': '/articles/artificial-intelligence',
  }
  ```

---

## 6. Styling Integration (`css/ew.css`)

The repository already contains `css/ew.css`, which provides the authentic visual theme of the Exodus Wars lore site:
- **Fonts**: Pre-configured with Google Font `Iceland`.
- **Palette**:
  - Accent Navy: `#1E5188`
  - Deep Space Background: `#0B0F19`
  - High-tech borders and outlines (`frame_outline.webp`, `frame_bg.png`)
- **Integration**:
  Import `css/ew.css` directly into your SSG's root layout (`Layout.astro` or `layouts/base.html`).

---

## 7. Migration Checklist

- [x] **Phase 1: Dump Extraction & Indexing** (Complete)
  - [x] 3,860 pages extracted to clean `.md` files in `wiki/` partitioned by namespace.
  - [x] Master index `pages_index.json` created.
  - [x] Redirect manifest `redirects.json` created.
  - [x] Template schemas documented in `templates_summary.json` and `TEMPLATES_AND_INFOBOXES.md`.
  - [x] Images linked and validated in `images_manifest.json`.
- [ ] **Phase 2: SSG Scaffolding** (Next)
  - [ ] Initialize project (e.g. `npm create astro@latest -- --template starlight`).
  - [ ] Configure `ew.css` and custom fonts.
- [ ] **Phase 3: Wikitext-to-Markdown Transformation**
  - [ ] Run automated script to convert `[[Wikilinks]]` and `[[Images]]` to Markdown/HTML.
  - [ ] Convert Infobox calls to YAML frontmatter blocks.
  - [ ] Generate `_redirects` file from `redirects.json`.
- [ ] **Phase 4: Build & Search Verification**
  - [ ] Build static site and verify zero broken internal links.
  - [ ] Test Pagefind full-text search indexing across all lore articles.
