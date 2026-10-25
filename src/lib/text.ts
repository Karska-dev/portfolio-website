// A browser may break a line after any hyphen, which splits "e-paper" into
// "e-" and "paper" across two lines. Words listed here are kept whole.

const KEEP_TOGETHER = ['e-paper'];

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Returns HTML for a piece of plain text, with the listed words wrapped so
 * they never break across lines. The text is escaped first because the result
 * is inserted as HTML (with set:html), which Astro does not escape for us.
 */
export function keepTogether(text: string): string {
  let html = escapeHtml(text);
  for (const word of KEEP_TOGETHER) {
    html = html.replaceAll(word, `<span class="nowrap">${word}</span>`);
  }
  return html;
}
