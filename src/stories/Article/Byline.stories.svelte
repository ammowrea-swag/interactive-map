<!--
  Byline.stories.svelte

  Stories for the Byline subcomponent.
  Byline renders an author attribution paragraph used by ArticleHeader and DatabaseHeader.

  Props:
  - byline: Author name(s) to display
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Byline from '$lib/components/Article/Byline.svelte';

  const { Story } = defineMeta({
    title: 'Article/Byline',
    component: Byline,
    tags: ['autodocs'],
    argTypes: {
      byline: {
        control: 'text',
        description: 'Author name(s) to display as an attribution line',
      },
    },
  });
</script>

<!-- Default: single author -->
<Story
  name="Default"
  args={{
    byline: 'NYCity News Service',
  }}
/>

<!-- Multiple Authors: comma-separated names -->
<Story
  name="Multiple Authors"
  args={{
    byline: 'Jane Smith, John Doe',
  }}
/>

<!-- Empty: renders nothing when byline is blank -->
<Story
  name="Empty"
  args={{
    byline: '',
  }}
/>
