<!--
@component
Blockquote.svelte — A styled pull-quote with an optional attribution line.

Uses the NYCity News Service style: a blue left border accent, italic text,
and an optional attribution footer.

USAGE EXAMPLE:
<Blockquote attribution="Craig Newmark Graduate School of Journalism">
  <p>We invite you to be part of our world.</p>
</Blockquote>
-->
<script>
  let {
    children, // The quote content passed between opening/closing tags
    attribution = '', // Optional source or speaker name
  } = $props();
</script>

<blockquote class="blockquote">
  <div class="blockquote-content">
    {@render children()}
  </div>
  {#if attribution}
    <footer class="blockquote-attribution">— {attribution}</footer>
  {/if}
</blockquote>

<style lang="scss">
  @use '../../styles' as *;

  .blockquote {
    border-left: var(--border-width-accent) solid var(--color-accent);
    margin: var(--spacing-lg) 0;
    padding: var(--spacing-sm) var(--spacing-sm);
    font-style: italic;
    font-size: var(--font-size-lg);
    line-height: var(--leading-normal);
    color: var(--color-dark);
  }

  .blockquote-content :global(p) {
    margin-bottom: 0;
  }

  .blockquote-attribution {
    font-style: normal;
    font-size: var(--font-size-sm);
    color: var(--color-medium-gray);
    margin-top: var(--spacing-xs);
  }

  @include tablet {
    .blockquote {
      font-size: var(--font-size-xl);
      padding-left: var(--spacing-md);
    }
  }
</style>
