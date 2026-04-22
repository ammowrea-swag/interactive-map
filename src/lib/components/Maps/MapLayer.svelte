<!--
@component
MapLayer.svelte — Adds a GeoJSON source and layer to a parent Map

Must be placed as a child of a Map component. Uses Svelte context to
obtain the MapLibre GL map instance, then adds a GeoJSON source and a
styled layer. The layer is automatically removed when the component is
destroyed or when the map style changes and reloads.

Pass a `popup` template function to enable click-to-inspect popups. The
function receives the clicked feature and should return an HTML string.
When `popup` is set, the cursor changes to a pointer while hovering
over the layer so readers know it is clickable.

USAGE EXAMPLE:
<Map longitude={-74.006} latitude={40.7128} zoom={10}>
  <MapLayer
    id="my-points"
    type="circle"
    data={{
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [-74.006, 40.7128] },
          properties: { name: 'NYC' },
        },
      ],
    }}
    paint={{ 'circle-radius': 8, 'circle-color': '#0033A1' }}
    popup={(feature) => `<strong>${feature.properties.name}</strong>`}
  />
</Map>
-->
<script>
  import { getContext, onDestroy } from 'svelte';
  import maplibregl from 'maplibre-gl';

  let {
    id, // Unique layer identifier (required)
    type = 'circle', // MapLibre layer type: 'circle' | 'fill' | 'line' | 'symbol'
    data = { type: 'FeatureCollection', features: [] }, // GeoJSON data
    paint = {}, // MapLibre paint properties
    layout = {}, // MapLibre layout properties
    popup = null, // Optional function (feature) => htmlString
  } = $props();

  const validatedId = $derived.by(() => {
    if (typeof id !== 'string' || id.trim() === '') {
      throw new Error('MapLayer requires a non-empty string "id" prop.');
    }

    return id;
  });

  const ctx = getContext('maplibre-map');
  if (!ctx) {
    throw new Error(
      'MapLayer must be placed inside a Map component. No map context found.'
    );
  }

  /** Tracks the currently-open popup so we can close it when another click opens a new one. */
  let openPopup = null;

  /** Handles clicks on the layer: builds an HTML popup from the template function. */
  function handleClick(e) {
    if (!popup) return;
    const feature = e.features && e.features[0];
    if (!feature) return;

    const html = popup(feature);
    if (!html) return;

    if (openPopup) openPopup.remove();
    openPopup = new maplibregl.Popup({ closeButton: true, closeOnClick: true })
      .setLngLat(e.lngLat)
      .setHTML(html)
      .addTo(ctx.getMap());
  }

  /** Sets the cursor to a pointer while hovering over a clickable layer. */
  function handleMouseEnter() {
    if (!popup) return;
    const map = ctx.getMap();
    if (map) map.getCanvas().style.cursor = 'pointer';
  }

  /** Restores the default cursor when the hover ends. */
  function handleMouseLeave() {
    const map = ctx.getMap();
    if (map) map.getCanvas().style.cursor = '';
  }

  /** Adds the source, layer, and interaction handlers to the map. */
  function addLayer() {
    const map = ctx.getMap();
    if (!map) return;

    // Remove existing source/layer if already present (e.g. after style reload)
    if (map.getLayer(validatedId)) map.removeLayer(validatedId);
    if (map.getSource(validatedId)) map.removeSource(validatedId);

    map.addSource(validatedId, {
      type: 'geojson',
      data,
    });

    map.addLayer({
      id: validatedId,
      type,
      source: validatedId,
      paint,
      layout,
    });

    if (popup) {
      map.on('click', validatedId, handleClick);
      map.on('mouseenter', validatedId, handleMouseEnter);
      map.on('mouseleave', validatedId, handleMouseLeave);
    }
  }

  /** Removes the source, layer, and any registered handlers from the map. */
  function removeLayer() {
    const map = ctx.getMap();
    if (!map) return;

    if (popup) {
      map.off('click', validatedId, handleClick);
      map.off('mouseenter', validatedId, handleMouseEnter);
      map.off('mouseleave', validatedId, handleMouseLeave);
    }

    if (map.getLayer(validatedId)) map.removeLayer(validatedId);
    if (map.getSource(validatedId)) map.removeSource(validatedId);

    if (openPopup) {
      openPopup.remove();
      openPopup = null;
    }
  }

  // Re-add the layer whenever the map style reloads (e.g. theme change)
  function handleStyleLoad() {
    addLayer();
  }

  // Add the layer now (map is already ready because Map renders children
  // only after mapReady is true).
  addLayer();
  ctx.onStyleLoad(handleStyleLoad);

  // Reactively update the GeoJSON data when the data prop changes
  $effect(() => {
    const map = ctx.getMap();
    if (!map) return;
    const currentData = data; // read reactive prop
    const source = map.getSource(validatedId);
    if (source) {
      source.setData(currentData);
    }
  });

  // Track previous paint keys so we can unset removed properties
  let previousPaintKeys = [];

  // Reactively update paint properties when paint prop changes
  $effect(() => {
    const map = ctx.getMap();
    if (!map || !map.getLayer(validatedId)) return;
    const currentPaint = paint; // read reactive prop
    const currentKeys = Object.keys(currentPaint);

    // Unset any paint properties that were removed
    for (const key of previousPaintKeys) {
      if (!(key in currentPaint)) {
        map.setPaintProperty(validatedId, key, undefined);
      }
    }

    // Apply current paint properties
    for (const [key, value] of Object.entries(currentPaint)) {
      map.setPaintProperty(validatedId, key, value);
    }

    previousPaintKeys = currentKeys;
  });

  onDestroy(() => {
    ctx.offStyleLoad(handleStyleLoad);
    removeLayer();
  });
</script>
