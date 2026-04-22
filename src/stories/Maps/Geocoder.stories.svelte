<!--
  Geocoder.stories.svelte

  Stories for the Geocoder component.
  Geocoder renders an address search input that queries the Nominatim
  (OpenStreetMap) geocoding API and returns latitude/longitude results
  in a dropdown.

  Props:
  - placeholder: Placeholder text shown when the input is empty
  - label: Accessible label displayed above the input
  - onresult: Callback fired when the user selects a result
  - debounceMs: Debounce delay in milliseconds before querying
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Geocoder from '$lib/components/Maps/Geocoder.svelte';

  const { Story } = defineMeta({
    title: 'Maps/Geocoder',
    component: Geocoder,
    tags: ['autodocs'],
    argTypes: {
      placeholder: {
        control: 'text',
        description: 'Placeholder text shown when the field is empty',
      },
      label: {
        control: 'text',
        description: 'Accessible label shown above the input',
      },
      debounceMs: {
        control: { type: 'number', min: 100, max: 2000, step: 100 },
        description: 'Debounce delay in milliseconds before querying Nominatim',
      },
      onresult: {
        action: 'result',
        description:
          'Callback fired when the user selects a result. Receives { displayName, lat, lng }.',
      },
    },
  });
</script>

<!-- Default: empty geocoder with standard label -->
<Story
  name="Default"
  args={{
    placeholder: 'Search for an address…',
    label: 'Location',
    debounceMs: 300,
  }}
/>

<!-- Custom Label: geocoder with a contextual label and placeholder -->
<Story
  name="Custom Label"
  args={{
    placeholder: 'Enter a city, ZIP code, or address…',
    label: 'Find a location',
    debounceMs: 300,
  }}
/>

<!-- Fast Debounce: geocoder with a shorter debounce for quick results -->
<Story
  name="Fast Debounce"
  args={{
    placeholder: 'Start typing for instant results…',
    label: 'Quick search',
    debounceMs: 150,
  }}
/>
