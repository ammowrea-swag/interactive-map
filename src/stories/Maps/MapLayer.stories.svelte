<!--
  MapLayer.stories.svelte

  Stories for the MapLayer component.
  MapLayer adds a GeoJSON source and styled layer to a parent Map.
  It must be placed inside a Map component.

  Props:
  - id: Unique layer identifier (required)
  - type: MapLibre layer type — 'circle' | 'fill' | 'line' | 'symbol'
  - data: GeoJSON FeatureCollection or Feature
  - paint: MapLibre paint properties object
  - layout: MapLibre layout properties object
  - popup: Optional function (feature) => htmlString for click popups
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MapLayer from '$lib/components/Maps/MapLayer.svelte';

  const { Story } = defineMeta({
    title: 'Maps/MapLayer',
    tags: ['autodocs'],
    parameters: {
      docs: {
        description: {
          component:
            'MapLayer adds a GeoJSON source and styled layer to a parent Map. It must be placed inside a Map component.',
        },
      },
    },
  });
</script>

<script>
  import Map from '$lib/components/Maps/Map.svelte';

  const nycLandmarks = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-73.9857, 40.7484] },
        properties: { name: 'Empire State Building' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-73.9855, 40.758] },
        properties: { name: 'Times Square' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-74.0445, 40.6892] },
        properties: { name: 'Statue of Liberty' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-73.9712, 40.7831] },
        properties: { name: 'Central Park' },
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [-73.9914, 40.7556] },
        properties: { name: 'Craig Newmark Graduate School of Journalism' },
      },
    ],
  };

  const brooklynBridgeLine = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [-73.9969, 40.7061],
            [-73.9944, 40.7038],
            [-73.991, 40.7017],
            [-73.9871, 40.6998],
          ],
        },
        properties: { name: 'Brooklyn Bridge' },
      },
    ],
  };

  const centralParkPolygon = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-73.9819, 40.7681],
              [-73.958, 40.8006],
              [-73.9493, 40.7968],
              [-73.9732, 40.7644],
              [-73.9819, 40.7681],
            ],
          ],
        },
        properties: { name: 'Central Park' },
      },
    ],
  };
</script>

<!-- Circle Points: NYC landmarks as circle markers -->
<Story name="Circle Points" asChild>
  <Map
    longitude={-73.99}
    latitude={40.735}
    zoom={11}
    caption="NYC landmarks as circle markers."
  >
    <MapLayer
      id="landmarks"
      type="circle"
      data={nycLandmarks}
      paint={{
        'circle-radius': 8,
        'circle-color': '#0033A1',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      }}
    />
  </Map>
</Story>

<!-- Line Layer: Brooklyn Bridge path -->
<Story name="Line Layer" asChild>
  <Map
    longitude={-73.992}
    latitude={40.703}
    zoom={14}
    caption="The Brooklyn Bridge drawn as a line layer."
  >
    <MapLayer
      id="brooklyn-bridge"
      type="line"
      data={brooklynBridgeLine}
      paint={{
        'line-color': '#0033A1',
        'line-width': 4,
      }}
      layout={{
        'line-cap': 'round',
        'line-join': 'round',
      }}
    />
  </Map>
</Story>

<!-- Fill Layer: Central Park polygon -->
<Story name="Fill Layer" asChild>
  <Map
    longitude={-73.965}
    latitude={40.783}
    zoom={13}
    caption="Central Park rendered as a filled polygon."
  >
    <MapLayer
      id="central-park"
      type="fill"
      data={centralParkPolygon}
      paint={{
        'fill-color': '#0033A1',
        'fill-opacity': 0.3,
      }}
    />
    <MapLayer
      id="central-park-outline"
      type="line"
      data={centralParkPolygon}
      paint={{
        'line-color': '#0033A1',
        'line-width': 2,
      }}
    />
  </Map>
</Story>

<!-- Popup: Click a landmark to see a popup -->
<Story name="Popup" asChild>
  <Map
    longitude={-73.99}
    latitude={40.735}
    zoom={11}
    caption="Click a landmark to see a popup."
  >
    <MapLayer
      id="landmarks-popup"
      type="circle"
      data={nycLandmarks}
      paint={{
        'circle-radius': 8,
        'circle-color': '#0033A1',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      }}
      popup={(feature) => `<strong>${feature.properties.name}</strong>`}
    />
  </Map>
</Story>

<!-- Multiple Layers: Combining several layer types -->
<Story name="Multiple Layers" asChild>
  <Map
    longitude={-73.975}
    latitude={40.755}
    zoom={12}
    caption="Multiple layer types overlaid on the same map."
  >
    <MapLayer
      id="park-fill"
      type="fill"
      data={centralParkPolygon}
      paint={{
        'fill-color': '#228B22',
        'fill-opacity': 0.2,
      }}
    />
    <MapLayer
      id="park-outline"
      type="line"
      data={centralParkPolygon}
      paint={{
        'line-color': '#228B22',
        'line-width': 2,
      }}
    />
    <MapLayer
      id="bridge-path"
      type="line"
      data={brooklynBridgeLine}
      paint={{
        'line-color': '#CC5500',
        'line-width': 3,
      }}
    />
    <MapLayer
      id="landmark-dots"
      type="circle"
      data={nycLandmarks}
      paint={{
        'circle-radius': 7,
        'circle-color': '#0033A1',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
      }}
    />
  </Map>
</Story>
