<!--
@component
Byline.svelte — Author attribution line shared by ArticleHeader and DatabaseHeader.

Displays the provided author name(s) in a sans-serif paragraph styled with
medium-gray text. Used by both header components for consistent attribution.

USAGE EXAMPLE:
<Byline byline="Jane Smith, John Doe" />
-->
<script>
  let {
    byline = '', // Author name(s) to display
  } = $props();
</script>

{#if byline}
  <p class="byline">{byline}</p>
{/if}

<style lang="scss">
  .byline {
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    color: var(--color-medium-gray);
    margin: var(--spacing-xxs) 0;
  }
</style>
