<!--
  Blockquote.stories.svelte

  Stories for the Blockquote component.
  Blockquote displays a styled pull-quote with an optional attribution footer,
  using the NYCity News Service blue-left-border accent style.

  Props:
  - children: The quote content (Svelte snippet)
  - attribution: Optional source or speaker name (string)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Blockquote from '$lib/components/Article/Blockquote.svelte';

  const { Story } = defineMeta({
    title: 'Article/Blockquote',
    component: Blockquote,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
    argTypes: {
      attribution: {
        control: 'text',
        description:
          'Optional source or speaker name displayed below the quote',
      },
      children: {
        control: false,
        description:
          'The quote content passed between opening and closing tags',
      },
    },
  });
</script>

<!-- Default: simple pull-quote without attribution -->
<Story
  name="Default"
  parameters={{
    docs: {
      source: {
        code: `<Blockquote>
  <p>We invite you to be part of our world.</p>
</Blockquote>`,
      },
    },
  }}
>
  <div class="story-container">
    <Blockquote>
      <p>We invite you to be part of our world.</p>
    </Blockquote>
  </div>
</Story>

<!-- With Attribution: includes a source line below the quote -->
<Story
  name="With Attribution"
  parameters={{
    docs: {
      source: {
        code: `<Blockquote attribution="Craig Newmark Graduate School of Journalism">
  <p>We invite you to be part of our world.</p>
</Blockquote>`,
      },
    },
  }}
>
  <div class="story-container">
    <Blockquote attribution="Craig Newmark Graduate School of Journalism">
      <p>We invite you to be part of our world.</p>
    </Blockquote>
  </div>
</Story>

<!-- Long Quote: a multi-sentence pull-quote with attribution -->
<Story
  name="Long Quote"
  parameters={{
    docs: {
      source: {
        code: `<Blockquote attribution="NYCity News Service">
  <p>
    At a time when our profession is reeling from financial pressures and lack
    of trust, the Newmark Graduate School of Journalism is committed to
    producing the next generation of skilled, ethically minded, and diverse
    journalists.
  </p>
</Blockquote>`,
      },
    },
  }}
>
  <div class="story-container">
    <Blockquote attribution="NYCity News Service">
      <p>
        At a time when our profession is reeling from financial pressures and
        lack of trust, the Newmark Graduate School of Journalism is committed to
        producing the next generation of skilled, ethically minded, and diverse
        journalists.
      </p>
    </Blockquote>
  </div>
</Story>

<style>
  .story-container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }
</style>
