<!--
  TitleSlide.stories.svelte

  Stories for the TitleSlide component.
  TitleSlide is the opening screen of a multimedia gallery, displaying a
  centered headline, intro text, byline, and scroll hint on a black background.

  Props:
  - headline: The main gallery title
  - intro: Introductory text below the headline
  - byline: Author attribution
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TitleSlide from '$lib/components/MultimediaGallery/TitleSlide.svelte';

  const { Story } = defineMeta({
    title: 'MultimediaGallery/TitleSlide',
    component: TitleSlide,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
    argTypes: {
      headline: {
        control: 'text',
        description: 'The main gallery title displayed prominently',
      },
      intro: {
        control: 'text',
        description: 'Introductory text below the headline',
      },
      byline: {
        control: 'text',
        description: 'Author attribution line',
      },
    },
  });
</script>

<!-- Default: all fields populated -->
<Story
  name="Default"
  args={{
    headline: 'Life on the L Train',
    intro:
      "A photo essay documenting the commuters, musicians, and everyday moments on New York's busiest crosstown subway line.",
    byline: 'By Jane Doe',
  }}
/>

<!-- Short: minimal headline only -->
<Story
  name="Short Headline"
  args={{
    headline: 'The Storm',
    intro: 'Photos from the aftermath.',
    byline: 'By John Smith',
  }}
/>

<!-- Long: testing text wrapping with extended content -->
<Story
  name="Long Content"
  args={{
    headline:
      'Inside the Fight to Save a Disappearing Neighborhood: A Visual Investigation',
    intro:
      'Over the past decade, rising rents and rapid development have transformed the character of this once-quiet Brooklyn enclave. Through dozens of interviews and months of reporting, we documented what residents stand to lose — and what some are doing to hold on.',
    byline: 'By Jane Doe and John Smith, NYCity News Service',
  }}
/>
