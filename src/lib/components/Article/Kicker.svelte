<!--
@component
Kicker.svelte — A small uppercase eyebrow label rendered above a headline.

Displays the provided text in the site accent color (CUNY Blue), all-caps,
bold, and with wider letter spacing. Used by DatabaseHeader and ArticleHeader
when an optional kicker string is supplied.

USAGE EXAMPLE:
<Kicker text="Housing Coverage" />
-->
<script>
  let {
    text = '', // The kicker label to display
  } = $props();
</script>

{#if text}
  <p class="kicker">{text}</p>
{/if}

<style lang="scss">
  .kicker {
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    margin: 0 0 var(--spacing-xxs);
  }
</style>
