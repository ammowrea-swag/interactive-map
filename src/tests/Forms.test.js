import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SearchInput from '$lib/components/Forms/SearchInput.svelte';
import DropdownInput from '$lib/components/Forms/DropdownInput.svelte';

describe('SearchInput', () => {
  it('renders with default placeholder and label', () => {
    render(SearchInput);
    expect(screen.getByLabelText('Search')).toBeTruthy();
    expect(screen.getByPlaceholderText('Search…')).toBeTruthy();
  });

  it('accepts a custom label and placeholder', () => {
    render(SearchInput, {
      props: { label: 'Find a program', placeholder: 'Type here…' },
    });
    expect(screen.getByLabelText('Find a program')).toBeTruthy();
    expect(screen.getByPlaceholderText('Type here…')).toBeTruthy();
  });
});

describe('DropdownInput', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ];

  it('renders with a label and placeholder option', () => {
    render(DropdownInput, { props: { options } });
    expect(screen.getByLabelText('Select')).toBeTruthy();
    expect(screen.getByText('Choose an option…')).toBeTruthy();
  });

  it('renders all options', () => {
    render(DropdownInput, { props: { options } });
    expect(screen.getByText('Option A')).toBeTruthy();
    expect(screen.getByText('Option B')).toBeTruthy();
  });

  it('accepts a custom label', () => {
    render(DropdownInput, {
      props: { label: 'Category', options },
    });
    expect(screen.getByLabelText('Category')).toBeTruthy();
  });
});
