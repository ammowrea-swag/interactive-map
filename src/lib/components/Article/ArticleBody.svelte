<!--
@component
ArticleBody.svelte — NYCity News Service Style Article Content

A wrapper component that provides proper typography for article body text.
Uses sans-serif font for body, serif for subheadings.

USAGE EXAMPLE:
<ArticleBody>
  <p>Your article paragraphs go here...</p>
  <p>Each paragraph will be properly styled.</p>
</ArticleBody>
-->
<script>
  let {
    children, // The content passed between opening/closing tags
  } = $props();

  /**
   * Svelte action: wraps the first visible character of each `p.dropcap`
   * in a `<span class="dropcap-letter">` so we can apply an animated
   * gradient that `::first-letter` alone cannot support.
   */
  function initDropcap(node) {
    const paragraphs = node.querySelectorAll('p.dropcap');
    for (const p of paragraphs) {
      if (p.querySelector('.dropcap-letter')) continue;
      const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
      let textNode = walker.nextNode();
      while (textNode && textNode.textContent.trim() === '') {
        textNode = walker.nextNode();
      }
      if (!textNode) continue;

      const text = textNode.textContent;
      const idx = text.search(/\S/);
      if (idx === -1) continue;

      const span = document.createElement('span');
      span.className = 'dropcap-letter';
      span.textContent = text[idx];

      textNode.textContent = text.slice(idx + 1);
      if (idx > 0) {
        p.insertBefore(document.createTextNode(text.slice(0, idx)), textNode);
      }
      p.insertBefore(span, textNode);
    }
  }
</script>

<article class="article-body" use:initDropcap>
  {@render children()}
</article>

<style lang="scss">
  @use '../../styles' as *;

  /* Mobile-first: smaller text */
  .article-body {
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
  }

  /* Paragraph styling */
  .article-body :global(p) {
    margin-bottom: var(--spacing-md);
  }

  .article-body :global(p:last-child) {
    margin-bottom: 0;
  }

  /* Links within article body */
  .article-body :global(a) {
    color: var(--color-dark);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .article-body :global(a:hover) {
    color: var(--color-accent);
  }

  /* Subheadings within article */
  .article-body :global(h2) {
    font-family: var(--font-serif);
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-normal);
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-sm);
    color: var(--color-dark);
  }

  .article-body :global(h3) {
    font-family: var(--font-serif);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-normal);
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-sm);
    color: var(--color-dark);
  }

  /* Block quotes - NYCity style with blue left border */
  .article-body :global(blockquote) {
    border-left: var(--border-width-accent) solid var(--color-accent);
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-sm) var(--spacing-sm);
    font-style: italic;
    font-size: var(--font-size-lg);
    line-height: var(--leading-normal);
    color: var(--color-dark);
  }

  .article-body :global(blockquote p) {
    margin-bottom: 0;
  }

  /* Lists */
  .article-body :global(ul),
  .article-body :global(ol) {
    margin-bottom: var(--spacing-md);
    padding-left: var(--spacing-md);
  }

  .article-body :global(li) {
    margin-bottom: var(--spacing-xs);
  }

  /* Dropcap: apply class="dropcap" to the opening <p> */
  .article-body :global(p.dropcap > .dropcap-letter) {
    font-family: var(--font-serif);
    font-size: var(--dropcap-font-size);
    font-weight: var(--font-weight-bold);
    line-height: var(--dropcap-line-height);
    float: left;
    margin-right: var(--dropcap-margin-right);
    /* Animated gradient matching the site header */
    background: linear-gradient(
      90deg,
      var(--color-cuny-blue-dark) 0%,
      var(--color-accent) 50%,
      var(--color-cuny-blue-light) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--dropcap-color);
    animation: dropcap-gradient 6s ease-in-out infinite;
  }

  /* Strong/Bold text */
  .article-body :global(strong) {
    font-weight: var(--font-weight-semibold);
  }

  /* Tablet and up: larger text */
  @include tablet {
    .article-body {
      font-size: var(--font-size-lg);
      line-height: var(--leading-loose);
    }

    .article-body :global(blockquote) {
      font-size: var(--font-size-xl);
      padding-left: var(--spacing-md);
    }
  }
</style>
