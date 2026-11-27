/**
 * Placeholder card photos. picsum.photos serves free-licence photos and returns
 * the same picture for the same seed, so a card keeps its photo between visits.
 * Replace a placeholder with a chosen photo by setting an explicit image URL
 * where the card is built (e.g. `coverImage:` in a blog post's frontmatter).
 */
export function placeholderPhoto(seed: string, width = 800, height = 450): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
