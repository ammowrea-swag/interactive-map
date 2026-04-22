<!--
  SlideGallery.stories.svelte

  Stories for the SlideGallery container component.
  SlideGallery shows one slide at a time in a horizontal track, with
  tap/click zones to move forward and backward and dot indicators for
  the current position. It wraps TitleSlide, PhotoSlide, TextSlide, and
  CreditsSlide components.

  Props:
  - children: Slide components rendered inside the gallery (Svelte snippet)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SlideGallery from '$lib/components/MultimediaGallery/SlideGallery.svelte';
  import TitleSlide from '$lib/components/MultimediaGallery/TitleSlide.svelte';
  import PhotoSlide from '$lib/components/MultimediaGallery/PhotoSlide.svelte';
  import TextSlide from '$lib/components/MultimediaGallery/TextSlide.svelte';
  import CreditsSlide from '$lib/components/MultimediaGallery/CreditsSlide.svelte';

  const { Story } = defineMeta({
    title: 'MultimediaGallery/SlideGallery',
    component: SlideGallery,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<!-- Default: a short gallery with a mix of slide types -->
<Story name="Default">
  <SlideGallery>
    <TitleSlide
      headline="Life on the L Train"
      intro="A photo essay documenting everyday moments underground."
      byline="By Jane Doe"
    />
    <PhotoSlide
      photo={{
        filename: '../example-photo.gif',
        title: 'Morning Rush',
        caption: 'Commuters pack the platform at Bedford Avenue.',
        credit: 'Photo by Jane Doe',
      }}
    />
    <TextSlide
      slide={{
        headline: 'The Commute',
        body: 'More than 400,000 riders depend on the L train every day.',
      }}
    />
    <PhotoSlide
      photo={{
        filename: '../example-photo.gif',
        title: 'Underground',
        caption: 'A musician performs between cars.',
        credit: 'Photo by Jane Doe',
      }}
    />
    <CreditsSlide>
      <h2>Credits</h2>
      <p>Photography and text by Jane Doe</p>
    </CreditsSlide>
  </SlideGallery>
</Story>
