<!--
  TextSlide.stories.svelte

  Stories for the TextSlide component.
  TextSlide renders a centered headline and body paragraph on a black
  background, providing narrative context between photos in a gallery.

  Props:
  - slide: Object with headline and body text
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TextSlide from '$lib/components/MultimediaGallery/TextSlide.svelte';

  const { Story } = defineMeta({
    title: 'MultimediaGallery/TextSlide',
    component: TextSlide,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
    argTypes: {
      slide: {
        control: 'object',
        description: 'Slide data object with headline and body text',
      },
    },
  });
</script>

<!-- Default: narrative context slide -->
<Story
  name="Default"
  args={{
    slide: {
      headline: 'The Commute',
      body: 'Every day, more than 400,000 riders depend on the L train to cross between Brooklyn and Manhattan. For many, the crowded platform is the most predictable part of their morning.',
    },
  }}
/>

<!-- Short: brief interstitial -->
<Story
  name="Short"
  args={{
    slide: {
      headline: 'What Comes Next',
      body: 'The MTA has proposed three options for the corridor.',
    },
  }}
/>
