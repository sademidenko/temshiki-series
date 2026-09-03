import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CharacterGrid } from './character-grid';
import { EpisodeList } from './episode-list';

describe('narrative sections', () => {
  it('renders four friends, the missing fifth and all episodes', () => {
    const { rerender } = render(<CharacterGrid />);
    expect(screen.getAllByTestId('character-card')).toHaveLength(4);
    expect(screen.getByText('Позиция 5 свободна')).toBeVisible();
    rerender(<EpisodeList />);
    expect(screen.getAllByTestId('episode-card')).toHaveLength(8);
    expect(screen.getByText('Суверенитет')).toBeVisible();
    expect(screen.getByText(/выдаёт Льва/i)).toBeVisible();
  });
});
