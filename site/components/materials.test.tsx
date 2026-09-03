import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Materials } from './materials';

it('offers all approved project materials', () => {
  render(<Materials />);
  expect(screen.getAllByRole('link')).toHaveLength(3);
  expect(screen.getByRole('link', { name: /заявка v2/i })).toHaveAttribute(
    'href',
    './materials/temshchiki-season-1-v2.md',
  );
});
