import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Image from '$lib/components/Media/Image.svelte';

describe('Image', () => {
  it('renders an image with alt text', () => {
    render(Image, { props: { src: '/photo.jpg', alt: 'A test photo' } });
    const img = screen.getByAltText('A test photo');
    expect(img).toBeTruthy();
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('renders a caption when provided', () => {
    render(Image, {
      props: {
        src: '/photo.jpg',
        alt: 'A photo',
        caption: 'Downtown Manhattan',
      },
    });
    expect(screen.getByText('Downtown Manhattan')).toBeTruthy();
  });

  it('renders a credit when provided', () => {
    render(Image, {
      props: {
        src: '/photo.jpg',
        alt: 'A photo',
        credit: 'Photo by Jane Doe',
      },
    });
    expect(screen.getByText('Photo by Jane Doe')).toBeTruthy();
  });

  it('does not render figcaption when no caption or credit', () => {
    const { container } = render(Image, {
      props: { src: '/photo.jpg', alt: 'A photo' },
    });
    expect(container.querySelector('figcaption')).toBeNull();
  });

  it('keeps external URLs unchanged', () => {
    render(Image, {
      props: { src: 'https://example.com/photo.jpg', alt: 'External' },
    });
    const img = screen.getByAltText('External');
    expect(img.getAttribute('src')).toBe('https://example.com/photo.jpg');
  });

  it('resolves local paths through asset()', () => {
    render(Image, {
      props: { src: '/images/local.jpg', alt: 'Local' },
    });
    const img = screen.getByAltText('Local');
    // Our mock returns the path unchanged
    expect(img.getAttribute('src')).toBe('/images/local.jpg');
  });
});
