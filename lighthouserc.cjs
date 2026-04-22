/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      // Use the SvelteKit static build output
      staticDistDir: './build',
      // Test the main page
      url: ['http://localhost/'],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        // Accessibility: enforce a minimum score
        'categories:accessibility': ['error', { minScore: 0.9 }],

        // Performance: warn if below threshold
        'categories:performance': ['warn', { minScore: 0.8 }],

        // Best practices
        'categories:best-practices': ['warn', { minScore: 0.9 }],

        // SEO
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      // Store results locally as JSON (no external server needed)
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
