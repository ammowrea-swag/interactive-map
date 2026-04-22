<!--
@component
Diptych.svelte — Side-by-Side Photo Layout

A parent container that displays two images (or any media) in a diptych
layout: two equal columns on tablet/desktop screens and a single stacked
column on mobile.

Wrap two child elements (typically Image components) inside the default slot.

USAGE EXAMPLE:
<Diptych caption="Before and after the renovation." credit="Jane Smith / The Daily News">
  <Image src="/images/before.jpg" alt="Before the renovation" />
  <Image src="/images/after.jpg" alt="After the renovation" />
</Diptych>
-->
<script>
  let {
    caption = '', // Optional: shared caption below both images
    credit = '', // Optional: shared photo credit
    children,
  } = $props();
</script>

<figure class="diptych">
  <div class="diptych-grid">
    {@render children()}
  </div>

  {#if caption || credit}
    <figcaption class="caption-container">
      {#if caption}
        <span class="caption">{caption}</span>
      {/if}
      {#if credit}
        <span class="credit">{credit}</span>
      {/if}
    </figcaption>
  {/if}
</figure>

<style lang="scss">
  @use '../../styles' as *;

  .diptych {
    margin: var(--spacing-md) 0;
    padding: 0;

    @include tablet {
      margin: var(--spacing-lg) 0;
    }
  }

  .diptych-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);

    @include tablet {
      grid-template-columns: 1fr 1fr;
    }
  }

  .caption-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding-top: var(--spacing-xs);
    margin-top: var(--spacing-xs);
  }

  .caption {
    font-size: var(--font-size-sm);
    line-height: var(--leading-caption);
    color: var(--color-text);
  }

  .credit {
    font-size: var(--font-size-xs);
    color: var(--color-medium-gray);
    font-style: italic;
  }
</style>
