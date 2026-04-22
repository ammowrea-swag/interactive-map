<script>
  let { children } = $props();
</script>

<div class="row">
  {@render children()}
</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .row {
    margin: var(--spacing-lg) 0;
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    justify-content: center;
  }

  .row > :global(*) {
    flex: 1;
    min-width: var(--dashboard-item-min-width);
    max-width: var(--dashboard-item-max-width);
  }

  @include mobile {
    .row {
      flex-direction: column;
    }

    .row > :global(*) {
      min-width: 0;
      max-width: none;
    }
  }
</style>
