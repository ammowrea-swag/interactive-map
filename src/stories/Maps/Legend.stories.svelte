<!--
  Legend.stories.svelte

  Stories for the Legend component.
  Legend renders threshold, continuous, diverging, categorical, and proportional symbol legends.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Legend from '$lib/components/Maps/Legend.svelte';

  const { Story } = defineMeta({
    title: 'Maps/Legend',
    component: Legend,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: 'text',
        description: 'Optional legend heading displayed above the scale.',
      },
      mode: {
        control: { type: 'select' },
        options: [
          'threshold',
          'continuous',
          'diverging',
          'categorical',
          'proportional-symbols',
        ],
        description: 'Legend rendering mode.',
      },
      items: {
        control: 'object',
        description:
          'Legend entries. Threshold/diverging modes use numeric bounds and colors; categorical mode uses label and color pairs; proportional-symbols mode uses numeric values and optional labels.',
      },
      stops: {
        control: 'object',
        description: 'Ordered continuous color stops with numeric values.',
      },
      ticks: {
        control: 'object',
        description: 'Optional tick values and labels for continuous mode.',
      },
      midpoint: {
        control: 'object',
        description:
          'Diverging midpoint object with a numeric value and optional label.',
      },
      subtitle: {
        control: 'text',
        description: 'Optional subtitle displayed beneath the title.',
      },
      noData: {
        control: 'object',
        description:
          'Optional fallback swatch for missing values as an object with label and optional color.',
      },
    },
  });
</script>

<script>
  import Map from '$lib/components/Maps/Map.svelte';

  const thresholdItems = [
    { to: 10, color: '#f4d35e' },
    { from: 10, to: 25, color: '#ee964b' },
    { from: 25, to: 50, color: '#f95738' },
    { from: 50, color: '#9c1c13' },
  ];

  const continuousStops = [
    { value: 0, color: '#edf8fb' },
    { value: 50, color: '#66c2a4' },
    { value: 100, color: '#238b45' },
  ];

  const continuousTicks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ];

  const divergingItems = [
    { from: -10, to: -8, color: '#1b76c2' },
    { from: -8, to: -6, color: '#2f8edb' },
    { from: -6, to: -4, color: '#4b9fe8' },
    { from: -4, to: -2, color: '#75b4eb' },
    { from: -2, to: 0, color: '#bed6ea' },
    { from: 0, to: 2, color: '#f1d8cc' },
    { from: 2, to: 4, color: '#f9b99a' },
    { from: 4, to: 6, color: '#ff7634' },
    { from: 6, to: 8, color: '#f26a07' },
    { from: 8, to: 10, color: '#d74d00' },
  ];

  const signedDegrees = (value) => {
    if (value === 0) {
      return '0°';
    }

    return `${value > 0 ? '+' : '−'}${Math.abs(value)}°`;
  };

  const categoricalItems = [
    { label: 'Hospital', color: '#0033a1' },
    { label: 'School', color: '#ee964b' },
    { label: 'Shelter', color: '#f95738' },
  ];

  const proportionalItems = [
    { value: 1400, label: '1,400' },
    { value: 600, label: '600' },
    { value: 150, label: '150' },
    { value: 0, label: '0' },
  ];
</script>

<Story
  name="Threshold"
  args={{
    title: 'Rent Burden',
    mode: 'threshold',
    items: thresholdItems,
    noData: { label: 'Data not available' },
  }}
/>

<Story
  name="Continuous Gradient"
  args={{
    title: 'Graduation Rate',
    mode: 'continuous',
    stops: continuousStops,
    ticks: continuousTicks,
  }}
/>

<Story
  name="Diverging Midpoint"
  args={{
    title: "Today's difference from the normal high of 1961-1990",
    mode: 'diverging',
    items: divergingItems,
    midpoint: { value: 0, label: '±0°' },
    formatter: signedDegrees,
  }}
/>

<Story
  name="Categorical"
  args={{
    title: 'Site Type',
    mode: 'categorical',
    items: categoricalItems,
    noData: { label: 'Data not available' },
  }}
/>

<Story
  name="Proportional Symbols"
  args={{
    title: 'Population',
    subtitle: 'in million inh.',
    mode: 'proportional-symbols',
    items: proportionalItems,
  }}
/>

<Story name="Map Layout" asChild>
  <div class="map-layout-story">
    <Legend
      title="Today's difference from the normal high of 1961-1990"
      mode="diverging"
      items={divergingItems}
      midpoint={{ value: 0, label: '±0°' }}
      formatter={signedDegrees}
    />

    <div class="map-layout-main">
      <Map
        longitude={-74.006}
        latitude={40.7128}
        zoom={10}
        caption="Example map with a legend placed above the viewport."
      />
    </div>
  </div>
</Story>

<style lang="scss">
  @use '$lib/styles' as *;

  .map-layout-story {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
</style>
