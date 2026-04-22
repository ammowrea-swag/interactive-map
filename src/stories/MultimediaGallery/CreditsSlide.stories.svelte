<!--
  CreditsSlide.stories.svelte

  Stories for the CreditsSlide component.
  CreditsSlide renders a closing slide via a children snippet, suitable for
  credits, acknowledgments, or any closing content.

  Props:
  - children: Content rendered inside the slide (Svelte snippet)
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CreditsSlide from '$lib/components/MultimediaGallery/CreditsSlide.svelte';

  const { Story } = defineMeta({
    title: 'MultimediaGallery/CreditsSlide',
    component: CreditsSlide,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<!-- Default: typical credits content -->
<Story name="Default">
  <CreditsSlide>
    <h2>Credits</h2>
    <p>Photography by Jane Doe</p>
    <p>Text by John Smith</p>
    <p>
      Published by
      <a href="https://www.nycitynewsservice.com/">NYCity News Service</a>
    </p>
  </CreditsSlide>
</Story>

<!-- Minimal: short acknowledgment -->
<Story name="Minimal">
  <CreditsSlide>
    <h2>Thank You</h2>
    <p>A project by the Craig Newmark Graduate School of Journalism.</p>
  </CreditsSlide>
</Story>
