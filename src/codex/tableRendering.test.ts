import { describe, it, expect } from 'vitest';
import { CodexRenderer } from './CodexRenderer';
import { HISTORY_YEARS_ARTICLES } from './articles/historyYearsArticles';

describe('MediaWiki Table Rendering', () => {
    it('renders year infobox headers and footers as styled HTML tables', () => {
        const yearInfoboxWikitext = `{| class="infobox" style="text-align: center;"
| align="right" | <small>'''Centuries:''' </small> 
| align="center" | [[23rd Century]] - [[24th Century]] - 25th Century
|-
| align="right" | <small>'''Years:'''</small>
| align="center" | [[2299]] [[2300]] [[2301]] - [[2302]] - [[2303]] [[2304]] [[2305]]
|}`;

        const html = CodexRenderer.render(yearInfoboxWikitext);

        // Container and table wrapper classes
        expect(html).toContain('<div class="codex-table-container codex-table-container-infobox">');
        expect(html).toContain('<table class="codex-table infobox codex-table-infobox" style="text-align: center;">');
        expect(html).toContain('<tbody>');
        expect(html).toContain('</tbody>');
        expect(html).toContain('</table>');

        // Cells and inline styles
        expect(html).toContain('<td style="text-align: right;"><small><strong>Centuries:</strong> </small></td>');
        expect(html).toContain('<td style="text-align: right;"><small><strong>Years:</strong></small></td>');

        // Internal wikilinks inside table cells
        expect(html).toContain('<a href="#/codex/23rd%20Century" class="codex-wikilink" data-target="23rd Century">23rd Century</a>');
        expect(html).toContain('<a href="#/codex/24th%20Century" class="codex-wikilink" data-target="24th Century">24th Century</a>');
        expect(html).toContain('<a href="#/codex/2299" class="codex-wikilink" data-target="2299">2299</a>');
        expect(html).toContain('<a href="#/codex/2302" class="codex-wikilink" data-target="2302">2302</a>');

        // Plain text without link preserved
        expect(html).toContain('25th Century');

        // No unparsed MediaWiki table tokens
        expect(html).not.toContain('{|');
        expect(html).not.toContain('|}');
        expect(html).not.toContain('|-');
    });

    it('renders general MediaWiki tables with headers, multi-cells, and captions', () => {
        const tableWikitext = `{| class="wikitable"
|+ Annual Performance Log
|-
! Date !! Customer !! Comments
|-
| 1951 || U.S. Census Bureau || Not shipped until 1952
|-
| 1952 || U.S. Air Force || Pentagon
|}`;

        const html = CodexRenderer.render(tableWikitext);

        expect(html).toContain('<div class="codex-table-container">');
        expect(html).toContain('<table class="codex-table wikitable">');
        expect(html).toContain('<caption class="codex-table-caption">Annual Performance Log</caption>');
        expect(html).toContain('<th>Date</th>');
        expect(html).toContain('<th>Customer</th>');
        expect(html).toContain('<th>Comments</th>');
        expect(html).toContain('<td>1951</td>');
        expect(html).toContain('<td>U.S. Census Bureau</td>');
        expect(html).toContain('<td>Not shipped until 1952</td>');
    });

    it('renders both header and footer tables on year articles alongside sections', () => {
        const year2001 = HISTORY_YEARS_ARTICLES.find(a => a.slug === '2001');
        expect(year2001).toBeDefined();

        const html = CodexRenderer.render(year2001!.rawContent);

        // Count occurrences of <table in the rendered output
        const tableCount = (html.match(/<table /g) || []).length;
        expect(tableCount).toBe(2);

        // Header and footer tables present
        expect(html).toContain('<h2 class="codex-h2">// Events of 2001</h2>');
        expect(html).toContain('<h3 class="codex-h3">// January</h3>');

        // Wikilinks in year table are correctly formatted
        expect(html).toContain('<a href="#/codex/20th%20Century" class="codex-wikilink" data-target="20th Century">20th Century</a>');
        expect(html).toContain('<a href="#/codex/1998" class="codex-wikilink" data-target="1998">1998</a>');

        // No raw table tokens left in the output
        expect(html).not.toContain('{|');
        expect(html).not.toContain('|}');
    });
});
