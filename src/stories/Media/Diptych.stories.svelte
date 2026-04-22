<!--
  Diptych.stories.svelte

  Stories for the Diptych component.
  Diptych renders a responsive two-column photo layout that stacks to a single
  column on mobile screens. It accepts any child elements (typically Image
  components) and supports an optional shared caption and credit.

  Props:
  - caption: Optional shared caption text below both images
  - credit: Optional shared photo credit line
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Diptych from '$lib/components/Media/Diptych.svelte';
  import Image from '$lib/components/Media/Image.svelte';

  const DEMO_IMAGE = '/example-photo.gif';

  const { Story } = defineMeta({
    title: 'Media/Diptych',
    component: Diptych,
    tags: ['autodocs'],
    argTypes: {
      caption: {
        control: 'text',
        description: 'Optional shared caption displayed below both images',
      },
      credit: {
        control: 'text',
        description: 'Optional shared photo credit attribution',
      },
    },
  });
</script>

<!-- Default: two images side by side with shared caption and credit -->
<Story name="Default">
  <Diptych
    caption="Left: The school's entrance on 40th Street. Right: Students in the newsroom during deadline."
    credit="Craig Newmark Graduate School of Journalism"
  >
    <Image
      src={DEMO_IMAGE}
      alt="The Craig Newmark Graduate School of Journalism entrance on 40th Street."
    />
    <Image
      src={DEMO_IMAGE}
      alt="Students working in the newsroom during deadline."
    />
  </Diptych>
</Story>

<!-- No Caption: two images without any caption or credit -->
<Story name="No Caption">
  <Diptych>
    <Image
      src={DEMO_IMAGE}
      alt="The Craig Newmark Graduate School of Journalism entrance on 40th Street."
    />
    <Image
      src={DEMO_IMAGE}
      alt="Students working in the newsroom during deadline."
    />
  </Diptych>
</Story>

<!-- Caption Only: two images with a shared caption but no credit -->
<Story name="Caption Only">
  <Diptych caption="Side-by-side views of the journalism school campus.">
    <Image
      src={DEMO_IMAGE}
      alt="The Craig Newmark Graduate School of Journalism entrance on 40th Street."
    />
    <Image
      src={DEMO_IMAGE}
      alt="Students working in the newsroom during deadline."
    />
  </Diptych>
</Story>
