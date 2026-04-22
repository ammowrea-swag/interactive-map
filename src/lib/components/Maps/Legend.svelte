<!--
@component
Legend.svelte — Quantitative and categorical legend for maps and data displays

Renders one of five legend types:
- threshold: discrete bins with color swatches
- continuous: a continuous gradient with ticks
- diverging: threshold bins with a highlighted midpoint
- categorical: square swatches with labels in a horizontal row
- proportional-symbols: nested circles with leader lines and labels

The component is presentational and can be placed anywhere in page layout.

The optional `noData` prop renders a separate fallback swatch for missing,
unknown, or unavailable values across all legend modes.

USAGE EXAMPLE:
<Legend
  title="Median Rent Change"
  mode="diverging"
  items={[
    { to: -10, color: '#b2182b' },
    { from: -10, to: 0, color: '#ef8a62' },
    { from: 0, to: 10, color: '#67a9cf' },
    { from: 10, color: '#2166ac' },
  ]}
  midpoint={{ value: 0, label: 'No change' }}
/>
-->
<script>
  const VALID_MODES = new Set([
    'threshold',
    'continuous',
    'diverging',
    'categorical',
    'proportional-symbols',
  ]);

  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  function buildKey(...parts) {
    return parts.join('-');
  }

  function isFiniteNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }

  function formatValue(value, formatter) {
    if (typeof formatter === 'function') {
      return formatter(value);
    }

    return numberFormatter.format(value);
  }

  function sortThresholdItems(items) {
    return [...items].sort((left, right) => {
      const leftStart = left.from ?? Number.NEGATIVE_INFINITY;
      const rightStart = right.from ?? Number.NEGATIVE_INFINITY;
      return leftStart - rightStart;
    });
  }

  function normalizeThresholdItems(items, formatter) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(
        'Legend requires a non-empty "items" array for threshold and diverging modes.'
      );
    }

    const sortedItems = sortThresholdItems(items);
    let previousUpperBound = Number.NEGATIVE_INFINITY;

    return sortedItems.map((item, index) => {
      if (!item || typeof item !== 'object') {
        throw new Error(
          'Legend items must be objects with color and numeric bounds.'
        );
      }

      const { color, from = null, to = null, label = '' } = item;
      if (typeof color !== 'string' || color.trim() === '') {
        throw new Error(
          'Legend items require a non-empty string "color" value.'
        );
      }

      if (from === null && to === null) {
        throw new Error('Legend items must define at least one numeric bound.');
      }

      if (from !== null && !isFiniteNumber(from)) {
        throw new Error(
          'Legend item "from" values must be finite numbers when provided.'
        );
      }

      if (to !== null && !isFiniteNumber(to)) {
        throw new Error(
          'Legend item "to" values must be finite numbers when provided.'
        );
      }

      if (from !== null && to !== null && from >= to) {
        throw new Error(
          'Legend items must have "from" values lower than "to" values.'
        );
      }

      const lowerBound = from ?? Number.NEGATIVE_INFINITY;
      const upperBound = to ?? Number.POSITIVE_INFINITY;

      if (index > 0 && lowerBound < previousUpperBound) {
        throw new Error(
          'Legend items must be ordered without overlapping ranges.'
        );
      }

      previousUpperBound = upperBound;

      let generatedLabel = label;
      if (!generatedLabel) {
        if (from === null) {
          generatedLabel = `Under ${formatValue(to, formatter)}`;
        } else if (to === null) {
          generatedLabel = `${formatValue(from, formatter)}+`;
        } else {
          generatedLabel = `${formatValue(from, formatter)}–${formatValue(to, formatter)}`;
        }
      }

      return {
        key: buildKey('range', color, lowerBound, upperBound),
        color,
        from,
        to,
        label: generatedLabel,
        lowerBound,
        upperBound,
      };
    });
  }

  function normalizeStops(stops, formatter) {
    if (!Array.isArray(stops) || stops.length < 2) {
      throw new Error(
        'Legend requires at least two stops for continuous mode.'
      );
    }

    const normalizedStops = [...stops].map((stop) => {
      if (!stop || typeof stop !== 'object') {
        throw new Error(
          'Legend stops must be objects with value and color properties.'
        );
      }

      const { value, color, label = '' } = stop;
      if (!isFiniteNumber(value)) {
        throw new Error('Legend stop values must be finite numbers.');
      }

      if (typeof color !== 'string' || color.trim() === '') {
        throw new Error(
          'Legend stops require a non-empty string "color" value.'
        );
      }

      return {
        key: buildKey('stop', value, color),
        value,
        color,
        label: label || formatValue(value, formatter),
      };
    });

    for (let index = 1; index < normalizedStops.length; index += 1) {
      if (normalizedStops[index].value <= normalizedStops[index - 1].value) {
        throw new Error('Legend stops must be ordered by ascending value.');
      }
    }

    return normalizedStops;
  }

  function normalizeCategoricalItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(
        'Legend requires a non-empty "items" array for categorical mode.'
      );
    }

    return items.map((item) => {
      if (!item || typeof item !== 'object') {
        throw new Error(
          'Categorical legend items must be objects with color and label values.'
        );
      }

      const { color, label } = item;
      if (typeof color !== 'string' || color.trim() === '') {
        throw new Error(
          'Categorical legend items require a non-empty string "color" value.'
        );
      }

      if (typeof label !== 'string' || label.trim() === '') {
        throw new Error(
          'Categorical legend items require a non-empty string "label" value.'
        );
      }

      return {
        key: buildKey('category', color, label),
        color,
        label,
      };
    });
  }

  function normalizeProportionalItems(items, formatter) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(
        'Legend requires a non-empty "items" array for proportional-symbols mode.'
      );
    }

    const normalizedItems = items.map((item) => {
      if (!item || typeof item !== 'object') {
        throw new Error(
          'Proportional symbol legend items must be objects with numeric values.'
        );
      }

      const { value, label = '' } = item;
      if (!isFiniteNumber(value) || value < 0) {
        throw new Error(
          'Proportional symbol legend items require a non-negative numeric "value".'
        );
      }

      return {
        key: buildKey('symbol', value, label || formatValue(value, formatter)),
        value,
        label: label || formatValue(value, formatter),
      };
    });

    return [...normalizedItems].sort((left, right) => right.value - left.value);
  }

  function normalizeNoData(noData) {
    if (!noData) {
      return null;
    }

    if (typeof noData !== 'object') {
      throw new Error(
        'Legend noData must be an object with label and optional color.'
      );
    }

    const { label, color = 'var(--color-light-gray)' } = noData;

    if (typeof label !== 'string' || label.trim() === '') {
      throw new Error(
        'Legend noData objects require a non-empty string "label" value.'
      );
    }

    if (typeof color !== 'string' || color.trim() === '') {
      throw new Error(
        'Legend noData objects require a non-empty string "color" value when provided.'
      );
    }

    return {
      label,
      color,
    };
  }

  function normalizeTicks(ticks, min, max, formatter) {
    if (!Array.isArray(ticks) || ticks.length === 0) {
      return [
        { value: min, label: formatValue(min, formatter), position: 0 },
        { value: max, label: formatValue(max, formatter), position: 100 },
      ];
    }

    const normalizedTicks = [...ticks].map((tick) => {
      if (!tick || typeof tick !== 'object') {
        throw new Error('Legend ticks must be objects with numeric values.');
      }

      const { value, label = '' } = tick;
      if (!isFiniteNumber(value)) {
        throw new Error('Legend tick values must be finite numbers.');
      }

      if (value < min || value > max) {
        throw new Error(
          'Legend tick values must fall within the continuous legend domain.'
        );
      }

      return {
        value,
        label: label || formatValue(value, formatter),
        position: ((value - min) / (max - min)) * 100,
      };
    });

    const sortedTicks = [...normalizedTicks].sort(
      (left, right) => left.value - right.value
    );
    for (let index = 1; index < sortedTicks.length; index += 1) {
      if (sortedTicks[index].value <= sortedTicks[index - 1].value) {
        throw new Error('Legend ticks must be ordered by ascending value.');
      }
    }

    return sortedTicks;
  }

  function buildGradient(stops, min, max) {
    const segments = stops.map((stop) => {
      const position = ((stop.value - min) / (max - min)) * 100;
      return `${stop.color} ${position}%`;
    });

    return `linear-gradient(90deg, ${segments.join(', ')})`;
  }

  function getDomainFromItems(items) {
    const finiteBounds = items
      .flatMap((item) => [item.from, item.to])
      .filter((value) => isFiniteNumber(value));

    return {
      min: Math.min(...finiteBounds),
      max: Math.max(...finiteBounds),
    };
  }

  function buildDivergingSegments(items, min, max) {
    const finiteSpan = max - min;

    return items.map((item) => {
      const lower = item.from ?? min;
      const upper = item.to ?? max;
      const span = upper - lower;
      const width =
        finiteSpan > 0 ? (span / finiteSpan) * 100 : 100 / items.length;

      return {
        ...item,
        width,
      };
    });
  }

  function buildBoundaryTicks(items, formatter, midpoint = null) {
    const values = items
      .flatMap((item) => [item.from, item.to])
      .filter((value) => isFiniteNumber(value));

    const uniqueValues = [...new Set(values)].sort(
      (left, right) => left - right
    );

    return uniqueValues.map((value) => ({
      value,
      label:
        midpoint !== null && value === midpoint.value
          ? midpoint.label
          : formatValue(value, formatter),
    }));
  }

  function buildThresholdSegments(items) {
    const segmentWidth = 100 / items.length;

    return items.map((item, index) => ({
      ...item,
      width: segmentWidth,
      position: segmentWidth * index + segmentWidth / 2,
    }));
  }

  function buildThresholdBreakTicks(items, formatter) {
    const segmentWidth = 100 / items.length;
    const finiteBounds = items
      .flatMap((item) => [item.from, item.to])
      .filter((value) => isFiniteNumber(value));
    const isNonNegativeScale = finiteBounds.every((value) => value >= 0);

    const startTick =
      items[0]?.from !== null && isFiniteNumber(items[0]?.from)
        ? {
            value: items[0].from,
            label: formatValue(items[0].from, formatter),
            position: 0,
          }
        : isNonNegativeScale
          ? {
              value: 0,
              label: formatValue(0, formatter),
              position: 0,
            }
          : null;

    const breakTicks = items
      .slice(0, -1)
      .map((item, index) => {
        if (!isFiniteNumber(item.to)) {
          return null;
        }

        return {
          value: item.to,
          label: formatValue(item.to, formatter),
          position: segmentWidth * (index + 1),
        };
      })
      .filter(Boolean);

    return startTick ? [startTick, ...breakTicks] : breakTicks;
  }

  function buildProportionalSymbolLayout(items) {
    const nonZeroItems = items.filter((item) => item.value > 0);
    const maxValue = nonZeroItems[0]?.value ?? 0;
    const maxRadius = 58;
    const leftPad = 8;
    const topPad = 6;
    const rightPad = 96;
    const bottomPad = 6;
    const centerX = leftPad + maxRadius;
    const baselineY = topPad + maxRadius * 2;
    const chartWidth = centerX + maxRadius + rightPad;
    const chartHeight = baselineY + bottomPad;
    const leaderStartX = centerX + maxRadius + 4;
    const labelX = leaderStartX + 8;

    const entries = items.map((item) => {
      if (item.value === 0 || maxValue === 0) {
        return {
          ...item,
          radius: 0,
          centerX,
          centerY: baselineY,
          lineY: baselineY,
        };
      }

      const radius = maxRadius * Math.sqrt(item.value / maxValue);
      return {
        ...item,
        radius,
        centerX,
        centerY: baselineY - radius,
        lineY: baselineY - radius * 2,
      };
    });

    return {
      entries,
      chartWidth,
      chartHeight,
      baselineY,
      centerX,
      leaderStartX,
      labelX,
    };
  }

  function normalizeMidpoint(midpoint, domain, formatter) {
    if (!midpoint || typeof midpoint !== 'object') {
      throw new Error(
        'Legend diverging mode requires a "midpoint" object with a numeric "value".'
      );
    }

    const { value, label = '' } = midpoint;
    const normalizedLabel = typeof label === 'string' ? label.trim() : label;

    if (
      normalizedLabel !== '' &&
      (typeof normalizedLabel !== 'string' || normalizedLabel === '')
    ) {
      throw new Error(
        'Legend midpoint labels must be non-empty strings when provided.'
      );
    }

    if (!isFiniteNumber(value) || value < domain.min || value > domain.max) {
      throw new Error(
        'Legend diverging mode requires a midpoint value within the legend domain.'
      );
    }

    return {
      value,
      label: normalizedLabel || formatValue(value, formatter),
    };
  }

  function buildLegendState({
    mode,
    items,
    stops,
    ticks,
    midpoint,
    formatter,
  }) {
    switch (mode) {
      case 'threshold': {
        const normalizedItems = normalizeThresholdItems(items, formatter);

        return {
          entries: buildThresholdSegments(normalizedItems),
          ticks: buildThresholdBreakTicks(normalizedItems, formatter),
        };
      }

      case 'continuous': {
        const entries = normalizeStops(stops, formatter);
        const domain = {
          min: entries[0].value,
          max: entries[entries.length - 1].value,
        };

        return {
          entries,
          gradient: buildGradient(entries, domain.min, domain.max),
          ticks: normalizeTicks(ticks, domain.min, domain.max, formatter),
        };
      }

      case 'diverging': {
        const normalizedItems = normalizeThresholdItems(items, formatter);
        const domain = getDomainFromItems(normalizedItems);
        const normalizedMidpoint = normalizeMidpoint(
          midpoint,
          domain,
          formatter
        );

        return {
          entries: buildDivergingSegments(
            normalizedItems,
            domain.min,
            domain.max
          ),
          midpoint: {
            ...normalizedMidpoint,
            position:
              ((normalizedMidpoint.value - domain.min) /
                (domain.max - domain.min || 1)) *
              100,
          },
          ticks: buildBoundaryTicks(
            normalizedItems,
            formatter,
            normalizedMidpoint
          ).map((tick) => ({
            ...tick,
            position:
              ((tick.value - domain.min) / (domain.max - domain.min || 1)) *
              100,
          })),
        };
      }

      case 'categorical':
        return {
          entries: normalizeCategoricalItems(items),
        };

      case 'proportional-symbols':
        return buildProportionalSymbolLayout(
          normalizeProportionalItems(items, formatter)
        );

      default:
        return {};
    }
  }

  let {
    title = '',
    subtitle = '',
    mode = 'threshold',
    items = [],
    stops = [],
    ticks = [],
    midpoint = null,
    formatter = null,
    noData = null,
  } = $props();

  const validatedMode = $derived.by(() => {
    if (!VALID_MODES.has(mode)) {
      throw new Error(
        'Legend mode must be one of "threshold", "continuous", "diverging", "categorical", or "proportional-symbols".'
      );
    }

    return mode;
  });

  const headingId = $derived(
    title
      ? `legend-${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')}`
      : null
  );

  const legendState = $derived.by(() =>
    buildLegendState({
      mode: validatedMode,
      items,
      stops,
      ticks,
      midpoint,
      formatter,
    })
  );

  const noDataItem = $derived(normalizeNoData(noData));
</script>

<section
  class="legend"
  class:is-threshold={validatedMode === 'threshold'}
  class:is-continuous={validatedMode === 'continuous'}
  class:is-diverging={validatedMode === 'diverging'}
  class:is-categorical={validatedMode === 'categorical'}
  class:is-proportional={validatedMode === 'proportional-symbols'}
  aria-labelledby={headingId}
>
  {#if title}
    <div class="legend-heading">
      <h3 class="legend-title" id={headingId}>{title}</h3>
      {#if subtitle}
        <p class="legend-subtitle">{subtitle}</p>
      {/if}
    </div>
  {/if}

  {#if validatedMode === 'threshold'}
    <div class="threshold-legend" aria-label={title || 'Threshold legend'}>
      <div class="threshold-bar" aria-hidden="true">
        {#each legendState.entries as segment (segment.key)}
          <span
            class="threshold-segment"
            style:width={`${segment.width}%`}
            style:background-color={segment.color}
          ></span>
        {/each}
      </div>
      <div class="scale-labels threshold-scale-labels">
        {#each legendState.ticks as tick (tick.value)}
          <span class="scale-label" style:left={`${tick.position}%`}
            >{tick.label}</span
          >
        {/each}
      </div>
    </div>
  {/if}

  {#if validatedMode === 'continuous'}
    <div class="continuous-legend" aria-label={title || 'Continuous legend'}>
      <div
        class="continuous-bar"
        style:background-image={legendState.gradient}
        aria-hidden="true"
      ></div>
      <div class="legend-axis" aria-hidden="true">
        {#each legendState.ticks as tick (tick.value)}
          <span class="legend-tick" style:left={`${tick.position}%`}></span>
        {/each}
      </div>
      <div class="legend-tick-labels">
        {#each legendState.ticks as tick (tick.value)}
          <span class="legend-tick-label" style:left={`${tick.position}%`}
            >{tick.label}</span
          >
        {/each}
      </div>
    </div>
  {/if}

  {#if validatedMode === 'diverging'}
    <div class="diverging-legend" aria-label={title || 'Diverging legend'}>
      <div class="diverging-bar" aria-hidden="true">
        {#each legendState.entries as segment (segment.key)}
          <span
            class="diverging-segment"
            style:width={`${segment.width}%`}
            style:background-color={segment.color}
          ></span>
        {/each}
        <span
          class="diverging-midpoint"
          style:left={`${legendState.midpoint.position}%`}
        ></span>
      </div>
      <div class="scale-labels diverging-scale-labels">
        {#each legendState.ticks as tick (tick.value)}
          <span class="scale-label" style:left={`${tick.position}%`}
            >{tick.label}</span
          >
        {/each}
      </div>
    </div>
  {/if}

  {#if validatedMode === 'categorical'}
    <div class="categorical-legend" aria-label={title || 'Categorical legend'}>
      {#each legendState.entries as item (item.key)}
        <div class="categorical-item">
          <span
            class="categorical-swatch"
            style:background-color={item.color}
            aria-hidden="true"
          ></span>
          <span class="categorical-label">{item.label}</span>
        </div>
      {/each}
      {#if noDataItem}
        <div class="categorical-item categorical-no-data-item">
          <span
            class="categorical-swatch"
            style:background-color={noDataItem.color}
            aria-hidden="true"
          ></span>
          <span class="categorical-label">{noDataItem.label}</span>
        </div>
      {/if}
    </div>
  {/if}

  {#if validatedMode === 'proportional-symbols'}
    <div
      class="proportional-legend"
      aria-label={title || 'Proportional symbol legend'}
    >
      <svg
        class="proportional-chart"
        viewBox={`0 0 ${legendState.chartWidth} ${legendState.chartHeight}`}
        role="img"
        aria-hidden="true"
      >
        {#each legendState.entries as symbol (symbol.key)}
          {#if symbol.radius > 0}
            <circle
              cx={symbol.centerX}
              cy={symbol.centerY}
              r={symbol.radius}
              class="proportional-circle"
            />
          {/if}
          <line
            x1={legendState.centerX}
            y1={symbol.lineY}
            x2={legendState.leaderStartX}
            y2={symbol.lineY}
            class="proportional-leader"
          />
          <text
            x={legendState.labelX}
            y={symbol.lineY}
            class="proportional-label"
            dominant-baseline="middle"
          >
            {symbol.label}
          </text>
        {/each}
      </svg>
    </div>
  {/if}

  {#if noDataItem && validatedMode !== 'categorical'}
    <div class="legend-no-data-item">
      <span
        class="categorical-swatch"
        style:background-color={noDataItem.color}
        aria-hidden="true"
      ></span>
      <span class="legend-no-data-label">{noDataItem.label}</span>
    </div>
  {/if}
</section>

<style lang="scss">
  @use '../../styles' as *;

  .legend {
    width: 100%;
    max-width: 52rem;
    background: var(--color-white);
    padding: var(--spacing-xs) 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .legend-title {
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-tight);
    text-align: left;
    color: var(--color-dark);
    margin-bottom: 0;
  }

  .legend-heading {
    display: flex;
    flex-direction: column;
    gap: 0.0625rem;
    margin-bottom: var(--spacing-xxs);
  }

  .legend-subtitle {
    font-size: var(--font-size-base);
    line-height: 1.2;
    color: var(--color-text);
    margin-bottom: 0;
  }

  .threshold-legend,
  .continuous-legend,
  .diverging-legend,
  .categorical-legend,
  .proportional-legend {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .categorical-legend {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .legend-no-data-item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-top: 0.125rem;
  }

  .legend-no-data-label {
    font-size: var(--font-size-sm);
    line-height: 1.2;
    color: rgb(102 102 102 / 0.72);
  }

  .threshold-bar,
  .continuous-bar,
  .diverging-bar {
    position: relative;
    width: 100%;
    height: 1.125rem;
    border-radius: 0.1875rem;
    overflow: hidden;
  }

  .threshold-bar,
  .continuous-bar {
    border: 0;
  }

  .threshold-bar {
    display: flex;
  }

  .diverging-bar {
    display: flex;
    border: 0;
  }

  .threshold-segment,
  .diverging-segment {
    display: block;
    height: 100%;
  }

  .categorical-item {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .categorical-no-data-item {
    color: rgb(102 102 102 / 0.72);
  }

  .categorical-swatch {
    width: 0.875rem;
    height: 0.875rem;
    flex: 0 0 0.875rem;
    border-radius: 0.125rem;
  }

  .categorical-label {
    font-size: var(--font-size-base);
    line-height: 1.2;
    color: var(--color-text);
  }

  .categorical-no-data-item .categorical-label {
    font-size: var(--font-size-sm);
    color: rgb(102 102 102 / 0.72);
  }

  .proportional-chart {
    width: 100%;
    max-width: 17rem;
    overflow: visible;
  }

  .proportional-circle {
    fill: none;
    stroke: rgba(0, 0, 0, 0.72);
    stroke-width: 1.5;
  }

  .proportional-leader {
    stroke: rgba(0, 0, 0, 0.6);
    stroke-width: 1;
    stroke-dasharray: 4 3;
  }

  .proportional-label {
    font-size: 12px;
    fill: var(--color-text);
    font-family: var(--font-sans);
  }

  .diverging-midpoint {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.9);
    transform: translateX(-50%);
  }

  .legend-axis {
    position: relative;
    height: 0.375rem;
  }

  .legend-tick {
    position: absolute;
    top: 0;
    width: 1px;
    height: 0.375rem;
    background: var(--color-medium-gray);
    transform: translateX(-50%);
  }

  .legend-tick-labels,
  .scale-labels {
    position: relative;
    min-height: 1.25rem;
    font-size: var(--font-size-base);
    color: #8a8d91;
    line-height: 1.2;
  }

  .legend-tick-label,
  .scale-label {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .diverging-scale-labels {
    margin-top: -0.125rem;
  }

  .threshold-scale-labels {
    margin-top: -0.125rem;
  }

  .is-diverging {
    max-width: 56rem;
  }

  .is-diverging .legend-title {
    text-align: center;
  }

  .is-diverging .legend-heading {
    align-items: center;
  }

  @include mobile {
    .legend {
      max-width: none;
    }

    .legend-tick-labels,
    .scale-labels {
      min-height: 1.125rem;
    }

    .threshold-bar,
    .continuous-bar,
    .diverging-bar {
      height: 1rem;
    }
  }
</style>
