<!--
@component
Pubdate.svelte — Publication date shared by ArticleHeader and DatabaseHeader.

Accepts a date string and wraps it in a semantic <time> element. Dates in
YYYY-MM-DD format are automatically formatted to "JANUARY 15, 2024" style;
other strings are displayed as-is.

USAGE EXAMPLE:
<Pubdate date="2024-01-15" />
-->
<script>
  let {
    date = '', // Date string; YYYY-MM-DD is formatted, other strings shown as-is
  } = $props();

  // Format YYYY-MM-DD to "JANUARY 15, 2024" style.
  // Parses manually to avoid UTC timezone offset issues.
  // Non-ISO strings are returned unchanged.
  function formatDate(dateString) {
    if (!dateString) return '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    const [year, month, day] = dateString.split('-').map(Number);
    const d = new Date(year, month - 1, day); // month is 0-indexed
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
      .format(d)
      .toUpperCase();
  }
</script>

{#if date}
  <p class="pubdate">
    <time datetime={date}>{formatDate(date)}</time>
  </p>
{/if}

<style lang="scss">
  .pubdate {
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    color: var(--color-medium-gray);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    margin: var(--spacing-xxs) 0;
  }
</style>
