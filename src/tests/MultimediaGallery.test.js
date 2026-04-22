import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import TitleSlide from '$lib/components/MultimediaGallery/TitleSlide.svelte';
import PhotoSlide from '$lib/components/MultimediaGallery/PhotoSlide.svelte';
import TextSlide from '$lib/components/MultimediaGallery/TextSlide.svelte';

describe('TitleSlide', () => {
  it('renders headline, intro, and byline', () => {
    render(TitleSlide, {
      props: {
        headline: 'Life on the L Train',
        intro: 'A photo essay about the subway.',
        byline: 'By Jane Doe',
      },
    });
    expect(screen.getByText('Life on the L Train')).toBeTruthy();
    expect(screen.getByText('A photo essay about the subway.')).toBeTruthy();
    expect(screen.getByText('By Jane Doe')).toBeTruthy();
  });

  it('renders a scroll hint', () => {
    render(TitleSlide, {
      props: {
        headline: 'Test',
        intro: 'Test intro',
        byline: 'By Test',
      },
    });
    expect(screen.getByText('Tap to begin →')).toBeTruthy();
  });

  it('renders the headline in an h1', () => {
    const { container } = render(TitleSlide, {
      props: {
        headline: 'The Storm',
        intro: 'Photos from the aftermath.',
        byline: 'By John Smith',
      },
    });
    const h1 = container.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('The Storm');
  });
});

describe('PhotoSlide', () => {
  const photo = {
    filename: 'subway-platform.jpg',
    title: 'Morning Rush',
    caption: 'Commuters pack the platform.',
    credit: 'Photo by Jane Doe',
  };

  it('renders the image with correct src and alt', () => {
    render(PhotoSlide, { props: { photo } });
    const img = screen.getByAltText('Morning Rush');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('/photos/subway-platform.jpg');
  });

  it('renders title, caption, and credit', () => {
    render(PhotoSlide, { props: { photo } });
    expect(screen.getByText('Morning Rush')).toBeTruthy();
    expect(screen.getByText('Commuters pack the platform.')).toBeTruthy();
    expect(screen.getByText('Photo by Jane Doe')).toBeTruthy();
  });

  it('has data-slide and data-photo attributes', () => {
    const { container } = render(PhotoSlide, { props: { photo } });
    const slide = container.querySelector('[data-slide]');
    expect(slide).toBeTruthy();
    expect(slide.hasAttribute('data-photo')).toBe(true);
  });
});

describe('TextSlide', () => {
  const slide = {
    headline: 'The Commute',
    body: 'More than 400,000 riders depend on the L train every day.',
  };

  it('renders headline and body', () => {
    render(TextSlide, { props: { slide } });
    expect(screen.getByText('The Commute')).toBeTruthy();
    expect(
      screen.getByText(
        'More than 400,000 riders depend on the L train every day.'
      )
    ).toBeTruthy();
  });

  it('renders the headline in an h2', () => {
    const { container } = render(TextSlide, { props: { slide } });
    const h2 = container.querySelector('h2');
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe('The Commute');
  });

  it('has a data-slide attribute', () => {
    const { container } = render(TextSlide, { props: { slide } });
    expect(container.querySelector('[data-slide]')).toBeTruthy();
  });
});
