<!--
@component
SiteFooter.svelte — Site Footer Component (NYCity News Service Style)

A professional news-organization-style footer with multi-column layout,
CUNY branding, navigation links, and copyright notice.

USAGE EXAMPLE:
<SiteFooter />
-->
<script>
  let {
    navLinks = [
      {
        label: 'Arts & Culture',
        href: 'https://www.nycitynewsservice.com/nycns_topics/arts-culture/',
      },
      {
        label: 'Business',
        href: 'https://www.nycitynewsservice.com/nycns_topics/business/',
      },
      {
        label: 'Education',
        href: 'https://www.nycitynewsservice.com/nycns_topics/education/',
      },
      {
        label: 'Environment',
        href: 'https://www.nycitynewsservice.com/nycns_topics/environment/',
      },
      {
        label: 'Health',
        href: 'https://www.nycitynewsservice.com/nycns_topics/health/',
      },
      {
        label: 'Housing',
        href: 'https://www.nycitynewsservice.com/nycns_topics/housing/',
      },
      {
        label: 'Politics',
        href: 'https://www.nycitynewsservice.com/nycns_topics/politics/',
      },
    ],
    aboutLinks = [
      {
        label: 'About Us',
        href: 'https://www.nycitynewsservice.com/about/',
      },
      {
        label: 'Contact Us',
        href: 'https://www.nycitynewsservice.com/contact/',
      },
    ],
    logoHref = 'https://www.journalism.cuny.edu/',
    logoAriaLabel = 'Visit the Craig Newmark Graduate School of Journalism website',
    logoTitle = 'Craig Newmark Graduate School of Journalism at CUNY',
    tagline = 'A student-powered service at the Craig Newmark Graduate School of Journalism',
    orgName = 'NYCity News Service',
  } = $props();

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-brand">
          <a
            href={logoHref}
            class="footer-logo-link"
            aria-label={logoAriaLabel}
          >
            <svg
              viewBox="0 0 795 115"
              class="cuny-logo"
              role="img"
              aria-label={logoTitle}
            >
              <g fill="currentColor">
                <path
                  d="M20.7,23.4v-3.7c0-4.1-1.9-5.8-4-5.8c-3.3,0-4.4,1.7-4.4,5.3v24.4c0,3.6,1.1,5.3,4.4,5.3c3,0,4-1.7,4-4.9v-5.8H29v5.5C29,50.5,25,56,16.7,56C8,56,4,50.5,4,43.7V19C4,12.2,8,6.7,16.7,6.7c8.3,0,12.3,6,12.3,13.2v3.5L20.7,23.4L20.7,23.4z"
                />
                <path
                  d="M44.3,55.4H36V7.3h11.6c9.3,0,14,3.9,14,14.2c0,7.7-3,10.9-5.8,12.1l7,21.8h-8.4l-5.9-19.9c-1.1,0.1-2.8,0.2-4.3,0.2L44.3,55.4L44.3,55.4z M44.3,28.9h2.9c4.5,0,6.1-1.7,6.1-7.4c0-5.7-1.7-7.4-6.1-7.4h-2.9V28.9z"
                />
                <path
                  d="M73.5,55.4h-8l8.9-48.1h10.3l8.9,48.1h-8l-1.5-10.7H75L73.5,55.4z M76.1,37.6h6.7l-3.3-20.7h-0.1L76.1,37.6z"
                />
                <path d="M99.5,55.4V7.3h8.3v48.1H99.5z" />
                <path
                  d="M126.7,31h13.5v24.4h-4l-1.5-3.6c-2.5,2.9-4.5,4.3-8.3,4.3c-6.5,0-11.1-4.7-11.1-12.3V19c0-6.8,4-12.3,12.1-12.3c8.3,0,12.4,6,12.4,13.2V23h-7.9c0-7.2-1.5-9.1-4.7-9.1c-2,0-3.7,1.2-3.7,5.3v24.7c0,3.1,1,5.1,3.9,5.1c3.3,0,4.5-1.9,4.5-6.7v-4.7h-5.3V31H126.7z"
                />
                <path
                  d="M157,55.4V7.3h7.7l10.1,27.5h0.1V7.3h7.5v48.1h-7.2l-10.5-30.1h-0.1v30.1H157z"
                />
                <path
                  d="M189.5,55.4V7.3h22.1v7.2h-13.9v12.4h10.7v7.2h-10.7v14.1h14.8v7.2L189.5,55.4L189.5,55.4z"
                />
                <path
                  d="M233,7.3h6.8l5.6,30.7h0.1l4.6-30.7h7.7l-8.5,48.1h-6.9l-6-31.8h-0.1l-5.6,31.8h-6.9l-9.1-48.1h7.7l5.1,30.7h0.1L233,7.3z"
                />
                <path
                  d="M297,7.3v48.1h-7.2V17.8h-0.1l-7.5,37.6h-4l-7.5-37.6h-0.1v37.6h-7.2V7.3h10.9l5.9,28.1h0.1l5.9-28.1H297z"
                />
                <path
                  d="M310.3,55.4h-8l8.9-48.1h10.3l8.9,48.1h-8l-1.5-10.7h-9.1L310.3,55.4z M313,37.6h6.7l-3.3-20.7h-0.1L313,37.6z"
                />
                <path
                  d="M344,55.4h-8.3V7.3h11.6c9.3,0,14,3.9,14,14.2c0,7.7-3,10.9-5.8,12.1l7,21.8h-8.4l-5.9-19.9c-1.1,0.1-2.8,0.2-4.3,0.2v19.7H344z M344,28.9h2.9c4.5,0,6.1-1.7,6.1-7.4c0-5.7-1.7-7.4-6.1-7.4H344V28.9z"
                />
                <path
                  d="M368.7,55.4V7.3h8.3v17.8h0.1l8.7-17.8h8.3l-8.9,17.9l10.1,30.2h-8.4L380,33h-0.1l-2.9,5.3v17.1H368.7z"
                />
                <path
                  d="M418.4,31H432v24.4h-4l-1.5-3.6c-2.5,2.9-4.5,4.3-8.3,4.3c-6.5,0-11.1-4.7-11.1-12.3V19c0-6.8,4-12.3,12.1-12.3c8.3,0,12.4,6,12.4,13.2V23h-7.9c0-7.2-1.5-9.1-4.7-9.1c-2,0-3.7,1.2-3.7,5.3v24.7c0,3.1,1,5.1,3.9,5.1c3.3,0,4.5-1.9,4.5-6.7v-4.7h-5.3V31z"
                />
                <path
                  d="M447.4,55.4h-8.3V7.3h11.6c9.3,0,14,3.9,14,14.2c0,7.7-3,10.9-5.8,12.1l7,21.8h-8.4l-5.9-19.9c-1.1,0.1-2.8,0.2-4.3,0.2v19.7H447.4z M447.4,28.9h2.9c4.5,0,6.1-1.7,6.1-7.4c0-5.7-1.7-7.4-6.1-7.4h-2.9V28.9z"
                />
                <path
                  d="M476.9,55.4h-8l8.9-48.1H488l8.9,48.1h-8l-1.5-10.7h-9.1L476.9,55.4z M479.5,37.6h6.7l-3.3-20.7h-0.1L479.5,37.6z"
                />
                <path
                  d="M502.4,7.3h12.3c8.5,0,13.1,4.7,13.1,14.5v19.1c0,9.9-4.5,14.5-13.1,14.5h-12.3V7.3z M510.6,48.6h2.9c4.4,0,5.9-1.7,5.9-6.7V20.8c0-5.1-1.5-6.7-5.9-6.7h-2.9V48.6z"
                />
                <path
                  d="M534.6,7.3h8.3v36.3c0,3.5,1.4,5.3,4.4,5.3s4.4-1.7,4.4-5.3V7.3h8.3v36c0,8.3-4.8,12.8-12.7,12.8s-12.7-4.5-12.7-12.8V7.3z"
                />
                <path
                  d="M572.5,55.4h-8l8.9-48.1h10.3l8.9,48.1h-8l-1.5-10.7H574L572.5,55.4z M575.2,37.6h6.7l-3.3-20.7h-0.1L575.2,37.6z"
                />
                <path d="M600.5,14.5h-8V7.3h24.3v7.2h-8v40.9h-8.3V14.5z" />
                <path
                  d="M622.2,55.4V7.3h22.1v7.2h-13.9v12.4h10.7v7.2h-10.7v14.1h14.8v7.2L622.2,55.4L622.2,55.4z"
                />
                <path
                  d="M256.3,74.4c-0.3-4.1-2.5-5.3-4.4-5.3c-2.7,0-4.1,1.7-4.1,4.7c0,8.2,16.8,12.1,16.8,25.2c0,7.9-5.3,12.3-13.1,12.3c-7.7,0-12.1-6.1-12.4-13.3l7.9-1.1c0.3,4.9,2.3,7.3,4.9,7.3c2.9,0,4.8-1.5,4.8-4.4c0-9.5-16.8-12.1-16.8-25.9c0-7.7,4.7-12,12.8-12c6.7,0,10.7,4.9,11.5,11.7L256.3,74.4z"
                />
                <path
                  d="M287.4,78.6v-3.7c0-4.1-1.9-5.8-4-5.8c-3.3,0-4.4,1.7-4.4,5.3v24.4c0,3.6,1.1,5.3,4.4,5.3c3,0,4-1.7,4-4.9v-5.8h8.3v5.5c0,6.8-4,12.3-12.3,12.3c-8.7,0-12.7-5.5-12.7-12.3V74.1c0-6.8,4-12.3,12.7-12.3c8.3,0,12.3,6,12.3,13.2v3.5L287.4,78.6L287.4,78.6z"
                />
                <path
                  d="M302.8,110.6V62.5h8.3v19.6h8.8V62.5h8.3v48.1h-8.3V89.3H311v21.3H302.8z"
                />
                <path
                  d="M335.1,74.2c0-6.8,4-12.3,12.7-12.3s12.7,5.5,12.7,12.3V99c0,6.8-4,12.3-12.7,12.3s-12.7-5.5-12.7-12.3V74.2z M343.4,98.8c0,3.6,1.1,5.3,4.4,5.3c3.3,0,4.4-1.7,4.4-5.3V74.4c0-3.6-1.1-5.3-4.4-5.3c-3.3,0-4.4,1.7-4.4,5.3V98.8z"
                />
                <path
                  d="M367.4,74.2c0-6.8,4-12.3,12.7-12.3s12.7,5.5,12.7,12.3V99c0,6.8-4,12.3-12.7,12.3s-12.7-5.5-12.7-12.3V74.2z M375.6,98.8c0,3.6,1.1,5.3,4.4,5.3c3.3,0,4.4-1.7,4.4-5.3V74.4c0-3.6-1.1-5.3-4.4-5.3c-3.3,0-4.4,1.7-4.4,5.3V98.8z"
                />
                <path d="M399.6,110.6V62.5h8.3v40.9h13v7.2H399.6z" />
                <path
                  d="M434.3,74.2c0-6.8,4-12.3,12.7-12.3s12.7,5.5,12.7,12.3V99c0,6.8-4,12.3-12.7,12.3s-12.7-5.5-12.7-12.3V74.2z M442.6,98.8c0,3.6,1.1,5.3,4.4,5.3c3.3,0,4.4-1.7,4.4-5.3V74.4c0-3.6-1.1-5.3-4.4-5.3c-3.3,0-4.4,1.7-4.4,5.3V98.8z"
                />
                <path
                  d="M466.7,110.6V62.5h23.1v7.2H475v12.4h11v7.2h-11.1v21.3H466.7z"
                />
                <path
                  d="M500.9,104.1h1.7c3.2,0,4.3-1.3,4.3-4V62.5h8.3V101c0,6.1-2.5,10.3-11.6,10.3h-2.7V104.1z"
                />
                <path
                  d="M522.1,74.2c0-6.8,4-12.3,12.7-12.3s12.7,5.5,12.7,12.3V99c0,6.8-4,12.3-12.7,12.3s-12.7-5.5-12.7-12.3V74.2z M530.4,98.8c0,3.6,1.1,5.3,4.4,5.3c3.3,0,4.4-1.7,4.4-5.3V74.4c0-3.6-1.1-5.3-4.4-5.3c-3.3,0-4.4,1.7-4.4,5.3V98.8z"
                />
                <path
                  d="M554.5,62.5h8.3v36.3c0,3.5,1.4,5.3,4.4,5.3s4.4-1.7,4.4-5.3V62.5h8.3v36c0,8.3-4.8,12.8-12.7,12.8s-12.7-4.5-12.7-12.8V62.5z"
                />
                <path
                  d="M595.2,110.6h-8.3V62.5h11.6c9.3,0,14,3.9,14,14.2c0,7.7-3,10.9-5.8,12.1l7,21.8h-8.4l-5.9-19.9c-1.1,0.1-2.8,0.2-4.3,0.2v19.7H595.2z M595.2,84.1h2.9c4.5,0,6.1-1.7,6.1-7.4c0-5.7-1.7-7.4-6.1-7.4h-2.9V84.1z"
                />
                <path
                  d="M620,110.6V62.5h7.7L637.8,90h0.1V62.5h7.5v48.1h-7.2l-10.5-30.1h-0.1v30.1H620z"
                />
                <path
                  d="M658.8,110.6h-8l8.9-48.1H670l8.9,48.1h-8l-1.5-10.7h-9.1L658.8,110.6z M661.5,92.8h6.7l-3.3-20.7h-0.1L661.5,92.8z"
                />
                <path d="M684.1,110.6V62.5h8.3v40.9h13v7.2H684.1z" />
                <path d="M710.2,110.6V62.5h8.3v48.1H710.2z" />
                <path
                  d="M742,74.4c-0.3-4.1-2.5-5.3-4.4-5.3c-2.7,0-4.1,1.7-4.1,4.7c0,8.2,16.8,12.1,16.8,25.2c0,7.9-5.3,12.3-13.1,12.3c-7.7,0-12.1-6.1-12.4-13.3l7.9-1.1c0.3,4.9,2.3,7.3,4.9,7.3c2.9,0,4.8-1.5,4.8-4.4c0-9.5-16.8-12.1-16.8-25.9c0-7.7,4.7-12,12.8-12c6.7,0,10.7,4.9,11.5,11.7L742,74.4z"
                />
                <path
                  d="M789.8,62.5v48.1h-7.2V73h-0.1l-7.5,37.6h-4L763.5,73h-0.1v37.6h-7.2V62.5h10.9l5.9,28.1h0.1l5.9-28.1H789.8z"
                />
              </g>
            </svg>
          </a>
          <p class="footer-tagline">
            {tagline}
          </p>
        </div>

        <!-- Navigation Column -->
        <div class="footer-col">
          <h3 class="footer-heading">ABOUT</h3>
          <nav aria-label="Footer navigation">
            <ul class="footer-list">
              {#each aboutLinks as link (link.href)}
                <li>
                  <a href={link.href} class="footer-link"
                    >{link.label.toUpperCase()}</a
                  >
                </li>
              {/each}
            </ul>
          </nav>
        </div>

        <!-- Topics Column -->
        {#if navLinks.length > 0}
          <div class="footer-col">
            <h3 class="footer-heading">TOPICS</h3>
            <nav aria-label="Footer topics">
              <ul class="footer-list">
                {#each navLinks as link (link.href)}
                  <li>
                    <a href={link.href} class="footer-link"
                      >{link.label.toUpperCase()}</a
                    >
                  </li>
                {/each}
              </ul>
            </nav>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Bottom bar with copyright -->
  <div class="footer-bottom">
    <div class="footer-container">
      <p class="footer-copyright">
        &copy; {currentYear}
        {orgName}
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  @use '../../styles' as *;

  .site-footer {
    margin-top: var(--spacing-xxl);
  }

  .footer-main {
    background-color: var(--color-cuny-blue-dark);
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .footer-container {
    max-width: var(--max-width-wide);
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  /* Brand column */
  .footer-brand {
    text-align: left;
  }

  .footer-logo-link {
    display: inline-block;
    text-decoration: none;
    color: var(--color-white);
  }

  .cuny-logo {
    width: 100%;
    max-width: var(--max-width-footer-logo);
    height: auto;
    margin: 0 auto;
    display: block;
    transition: var(--transition-opacity);
  }

  .footer-logo-link:hover .cuny-logo {
    opacity: var(--opacity-hover);
  }

  .footer-tagline {
    color: var(--color-border);
    font-family: var(--font-serif);
    font-size: var(--font-size-sm);
    line-height: var(--leading-normal);
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
  }

  /* Column headings */
  .footer-heading {
    color: var(--color-white);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-wider);
    text-transform: uppercase;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-xs);
    border-bottom: var(--border-width-thin) solid var(--color-medium-gray);
  }

  /* Link lists */
  .footer-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .footer-list li {
    margin-bottom: var(--spacing-xs);
  }

  .footer-link {
    color: var(--color-border);
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--letter-spacing-wider);
    transition: var(--transition-color);
  }

  .footer-link:hover {
    color: var(--color-white);
  }

  /* Bottom copyright bar */
  .footer-bottom {
    background-color: var(--color-cuny-blue-dark);
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: center;
  }

  .footer-copyright {
    color: var(--color-border);
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    letter-spacing: var(--letter-spacing-wide);
    margin: 0;
  }

  /* Tablet and up: multi-column layout */
  @include tablet {
    .footer-grid {
      grid-template-columns: 2fr 1fr 1fr;
      gap: var(--spacing-xl);
    }

    .footer-brand {
      text-align: left;
    }

    .cuny-logo {
      margin: 0;
    }
  }
</style>
