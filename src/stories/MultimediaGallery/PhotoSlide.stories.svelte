<!--
  PhotoSlide.stories.svelte

  Stories for the PhotoSlide component.
  PhotoSlide renders a full-bleed photograph with a gradient overlay at the
  bottom displaying the title, caption, and photo credit.

  Props:
  - photo: Object with filename, title, caption, and credit
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PhotoSlide from '$lib/components/MultimediaGallery/PhotoSlide.svelte';

  const { Story } = defineMeta({
    title: 'MultimediaGallery/PhotoSlide',
    component: PhotoSlide,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
    argTypes: {
      photo: {
        control: 'object',
        description:
          'Photo data object with filename, title, caption, and credit',
      },
    },
  });
</script>

<!-- Default: a photo slide with full caption information -->
<Story
  name="Default"
  args={{
    photo: {
      filename: '../example-photo.gif',
      title: 'Morning Rush at Bedford Avenue',
      caption:
        'Commuters pack the platform as a Manhattan-bound L train approaches during the 8 a.m. rush.',
      credit: 'Photo by Jane Doe',
    },
  }}
/>

<!-- Short Caption: minimal caption text -->
<Story
  name="Short Caption"
  args={{
    photo: {
      filename: '../example-photo.gif',
      title: 'The Platform',
      caption: 'Waiting for the next train.',
      credit: 'Jane Doe',
    },
  }}
/>
