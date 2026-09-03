import { characters, deaths, fifthSlot } from '@/lib/content';

export function CharacterGrid() {
  return (
    <ul className="team" aria-label="Команда из четырёх и пустое пятое место">
      {characters.map((character, index) => {
        const death = deaths[character.id];
        return (
          <li
            key={character.id}
            className="card reveal"
            data-testid="character-card"
          >
            <span className="card__num" aria-hidden="true">
              0{index + 1}
            </span>
            {death ? (
              <span className="card__death">
                погибает · {death}
              </span>
            ) : null}
            <p className="card__meta">{character.city}</p>
            <h3 className="card__name">{character.name}</h3>
            <dl>
              <dt>В игре</dt>
              <dd>{character.game}</dd>
              <dt>Что делает</dt>
              <dd>{character.function}</dd>
              <dt>Чего хочет</dt>
              <dd>{character.desire}</dd>
              <dt>Слабость</dt>
              <dd>{character.flaw}</dd>
            </dl>
          </li>
        );
      })}
      <li className="card card--empty reveal">
        <span className="card__num" aria-hidden="true">
          05
        </span>
        <p className="card__name">{fifthSlot.label}</p>
        <p className="muted" style={{ fontSize: '0.82rem' }}>
          {fifthSlot.detail}
        </p>
      </li>
    </ul>
  );
}
