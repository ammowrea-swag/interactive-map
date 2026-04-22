<!--
@component
Headline.svelte — A large serif h1 headline shared by ArticleHeader and DatabaseHeader.

Displays the provided text as a bold serif heading in the site dark color with
tight line-height. Font size steps up at the tablet breakpoint.

USAGE EXAMPLE:
<Headline text="City Council Approves New Budget" />
-->
<script>
  let {
    text = '', // The headline text to display
  } = $props();
</script>

{#if text}
  <h1 class="headline">{text}</h1>
{/if}

<style lang="scss">
  @use '../../styles' as *;

  .headline {
    font-family: var(--font-serif);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-tight);
    color: var(--color-dark);
    margin-bottom: var(--spacing-sm);

    @include tablet {
      font-size: var(--font-size-6xl);
    }
  }
</style>
