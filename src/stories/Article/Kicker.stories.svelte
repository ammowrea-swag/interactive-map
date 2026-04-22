<!--
  Kicker.stories.svelte

  Stories for the Kicker component.
  Kicker renders a small uppercase eyebrow label in the site accent color
  (CUNY Blue), intended for use above a headline.

  Props:
  - text: The kicker label to display (required for visible output)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Kicker from '$lib/components/Article/Kicker.svelte';

  const { Story } = defineMeta({
    title: 'Article/Kicker',
    component: Kicker,
    tags: ['autodocs'],
    argTypes: {
      text: {
        control: 'text',
        description: 'The eyebrow label to display above a headline',
      },
    },
  });
</script>

<!-- Default: a typical section label -->
<Story
  name="Default"
  args={{
    text: 'Housing Coverage',
  }}
/>

<!-- News Category: topic-based kicker -->
<Story
  name="News Category"
  args={{
    text: 'Breaking News',
  }}
/>

<!-- Long text: tests wrapping on narrow viewports -->
<Story
  name="Long Text"
  args={{
    text: 'Special Investigation: Public Schools',
  }}
/>

<!-- Empty: renders nothing when text is blank -->
<Story
  name="Empty"
  args={{
    text: '',
  }}
/>
