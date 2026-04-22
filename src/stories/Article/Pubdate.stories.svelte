<!--
  Pubdate.stories.svelte

  Stories for the Pubdate subcomponent.
  Pubdate renders a publication date in a semantic <time> element used by
  ArticleHeader and DatabaseHeader. YYYY-MM-DD strings are formatted to
  "JANUARY 15, 2024" style; other strings are displayed as-is.

  Props:
  - date: Date string to display (YYYY-MM-DD preferred)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Pubdate from '$lib/components/Article/Pubdate.svelte';

  const { Story } = defineMeta({
    title: 'Article/Pubdate',
    component: Pubdate,
    tags: ['autodocs'],
    argTypes: {
      date: {
        control: 'text',
        description:
          'Date string to display. YYYY-MM-DD is formatted to "JANUARY 15, 2024"; other strings are shown as-is.',
      },
    },
  });
</script>

<!-- Default: ISO date formatted to full display -->
<Story
  name="Default"
  args={{
    date: '2026-01-31',
  }}
/>

<!-- Raw String: non-ISO string displayed as-is -->
<Story
  name="Raw String"
  args={{
    date: 'Updated March 2026',
  }}
/>

<!-- Empty: renders nothing when date is blank -->
<Story
  name="Empty"
  args={{
    date: '',
  }}
/>
