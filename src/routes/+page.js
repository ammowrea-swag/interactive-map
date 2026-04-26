// Page settings
// These values are passed to the layout to control what appears on the page.
import packages from '$lib/data/packages.json';

export function load() {
  return {
    showHeader: true,
    showFooter: true,
    packages,
  };
}
