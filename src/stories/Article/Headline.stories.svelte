<!--
  Headline.stories.svelte

  Stories for the Headline subcomponent.
  Headline renders a large bold serif h1 used by ArticleHeader and DatabaseHeader.

  Props:
  - text: The headline text to display
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Headline from '$lib/components/Article/Headline.svelte';

  const { Story } = defineMeta({
    title: 'Article/Headline',
    component: Headline,
    tags: ['autodocs'],
    argTypes: {
      text: {
        control: 'text',
        description: 'The headline text displayed as a large serif h1',
      },
    },
  });
</script>

<!-- Default: typical article headline -->
<Story
  name="Default"
  args={{
    text: 'City Council Approves New Budget',
  }}
/>

<!-- Long Headline: tests wrapping behavior on narrow viewports -->
<Story
  name="Long Headline"
  args={{
    text: "How America's Top News Organizations Escape Rigid Publishing Systems to Design Beautiful Data-Driven Stories on Deadline",
  }}
/>

<!-- Empty: renders nothing when text is blank -->
<Story
  name="Empty"
  args={{
    text: '',
  }}
/>
