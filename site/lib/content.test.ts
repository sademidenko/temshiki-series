import { describe, expect, it } from 'vitest';
import { characters, episodes, evolutionSteps, seriesMeta } from './content';

describe('pitch content contract', () => {
  it('keeps the approved series identity and complete season', () => {
    expect(seriesMeta.title).toBe('ТЕМЩИКИ');
    expect(seriesMeta.format).toBe('8 × 50');
    expect(seriesMeta.logline).toContain('Антон Шубин');
    expect(characters.map((item) => item.name)).toEqual([
      'Антон Шубин',
      'Лев Марков',
      'Максим Корнеев',
      'Кирилл Савельев',
    ]);
    expect(episodes).toHaveLength(8);
    expect(episodes[0].year).toBe('2017');
    expect(episodes[7].year).toBe('2026');
    expect(evolutionSteps.at(-1)?.label).toBe('Государственная платформа');
  });
});
