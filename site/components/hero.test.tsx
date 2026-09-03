import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { seriesMeta } from '@/lib/content';
import { Hero } from './hero';

describe('Hero', () => {
  it('presents the title, formula, format, logline and both actions', () => {
    render(<Hero meta={seriesMeta} />);
    expect(screen.getByRole('heading', { name: 'ТЕМЩИКИ' })).toBeVisible();
    expect(screen.getByText('4 игрока. 3 смерти. 1 выживший')).toBeVisible();
    expect(screen.getByText('8 × 50')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Смотреть проект' })).toHaveAttribute('href', '#idea');
    expect(screen.getByRole('link', { name: 'Скачать заявку' })).toHaveAttribute(
      'href',
      './materials/temshchiki-season-1-v2.md',
    );
  });
});
