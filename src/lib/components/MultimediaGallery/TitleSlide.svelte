<!--
@component
TitleSlide.svelte — The opening slide of a multimedia gallery.

Displays a centered headline, introductory text, byline, and a
"Scroll to begin" hint on a full-screen black background.

USAGE EXAMPLE:
<TitleSlide
  headline="Life on the L Train"
  intro="A photo essay documenting commuters on New York's busiest crosstown line."
  byline="By Jane Doe"
/>
-->
<script>
  let {
    headline, // The main gallery title
    intro, // Introductory text below the headline
    byline, // Author attribution
  } = $props();
</script>

<div class="slide" data-slide>
  <div class="masthead">
    <a
      href="https://www.nycitynewsservice.com/"
      class="logo"
      aria-label="NYCity News Service"
    >
      <span class="logo-text">
        <span class="logo-nycity">NYCITY</span><span class="logo-news-service"
          >News Service</span
        >
      </span>
    </a>
  </div>
  <div class="content">
    <h1>{headline}</h1>
    <p class="intro">{intro}</p>
    <p class="byline">{byline}</p>
  </div>
  <div class="scroll-hint">Tap to begin →</div>
</div>

<style lang="scss">
  @use '../../styles' as *;

  .slide {
    height: 100%;
    flex: 0 0 100%;
    background: black;
    display: flex;
    flex-direction: column;
  }

  .masthead {
    display: flex;
    justify-content: center;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: linear-gradient(
      90deg,
      var(--color-cuny-blue-dark) 0%,
      var(--color-accent) 50%,
      var(--color-cuny-blue-light) 100%
    );
    background-size: 200% 100%;
    animation: gradient-sweep 6s ease-in-out infinite;
  }

  @keyframes gradient-sweep {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .masthead {
      animation: none;
    }
  }

  .logo {
    display: inline-block;
    text-decoration: none;
  }

  .logo:hover {
    text-decoration: none;
  }

  .logo:focus-visible {
    outline: 2px solid var(--color-white);
    outline-offset: 2px;
  }

  .logo-text {
    display: inline-flex;
    align-items: stretch;
    border: 1px solid var(--color-white);
  }

  .logo-nycity {
    background-color: var(--color-white);
    color: var(--color-accent);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-extrabold);
    padding: var(--logo-padding-mobile);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }

  .logo-news-service {
    color: var(--color-white);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);
    padding: var(--logo-padding-mobile);
    letter-spacing: var(--letter-spacing-tight);
    display: flex;
    align-items: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    color: white;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    line-height: 1.2;
    margin: 0 0 1rem;
    color: white;

    @container (min-width: 768px) {
      font-size: 3.5rem;
    }
  }

  .intro {
    font-size: 1.0625rem;
    line-height: 1.6;
    opacity: 0.85;
    margin: 0 0 1.5rem;

    @container (min-width: 768px) {
      font-size: 1.375rem;
      line-height: 1.7;
    }
  }

  .byline {
    font-size: 0.875rem;
    opacity: 0.6;
    margin: 0;

    @container (min-width: 768px) {
      font-size: 1.125rem;
    }
  }

  .scroll-hint {
    font-size: 0.8125rem;
    opacity: 0.6;
    margin: 0;
    padding-bottom: 3.5rem;
    color: white;
    display: flex;
    justify-content: center;
  }
</style>
