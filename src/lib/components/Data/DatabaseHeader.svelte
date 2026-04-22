<!--
@component
DatabaseHeader.svelte — A full-width hero header with optional background color,
kicker, headline, byline, date, description, children slot for additional content
(e.g. search controls), and an optional graphic snippet that renders in a right
column.

When `graphic` is provided the inner layout becomes a two-column flex row
(text + controls on the left, graphic on the right). Without `graphic` the
layout is single-column and backward-compatible.
-->
<script>
  import Kicker from '../Article/Kicker.svelte';
  import Headline from '../Article/Headline.svelte';
  import Byline from '../Article/Byline.svelte';
  import Pubdate from '../Article/Pubdate.svelte';

  let {
    kicker = '',
    headline = '',
    description = '',
    byline = '',
    date = '',
    bgColor = 'var(--color-light-gray)',
    children,
    graphic,
  } = $props();
</script>

<header class="hero-header" style:background-color={bgColor}>
  <div class="hero-inner" class:has-graphic={!!graphic}>
    <div class="hero-left">
      <div class="hero-content">
        {#if kicker}
          <Kicker text={kicker} />
        {/if}
        <Headline text={headline} />
        {#if description}
          <p class="hero-description">{description}</p>
        {/if}
        <Byline {byline} />
        <Pubdate {date} />
      </div>
      {#if children}
        <div class="hero-extra">
          {@render children()}
        </div>
      {/if}
    </div>
    {#if graphic}
      <div class="hero-graphic">
        {@render graphic()}
      </div>
    {/if}
  </div>
</header>

<style lang="scss">
  @use '../../styles' as *;

  .hero-header {
    width: 100%;
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .hero-inner {
    max-width: var(--max-width-wide);
    margin: 0 auto;
  }

  /* Two-column layout when a graphic snippet is provided */
  .hero-inner.has-graphic {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .hero-left {
    flex: 1;
  }

  .hero-content {
    max-width: var(--max-width);
  }

  /* Override Headline margin and desktop font size for the hero context */
  .hero-content :global(.headline) {
    margin-bottom: var(--spacing-xs);
  }

  .hero-description {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    line-height: var(--leading-base);
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }

  .hero-extra {
    margin-top: var(--spacing-md);
  }

  .hero-graphic {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }

  @include tablet {
    .hero-header {
      padding: var(--spacing-xxl) var(--spacing-md);
    }

    .hero-inner.has-graphic {
      flex-direction: row;
      align-items: center;
    }

    .hero-description {
      font-size: var(--font-size-xl);
    }

    .hero-graphic {
      max-width: none;
    }
  }

  @include desktop {
    .hero-inner {
      padding: 0 var(--spacing-md);
    }

    .hero-content :global(.headline) {
      font-size: var(--font-size-display);
    }
  }
</style>
