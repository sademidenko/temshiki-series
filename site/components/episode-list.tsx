import { episodes, matchLog } from '@/lib/content';

export function EpisodeList() {
  return (
    <div className="episodes">
      {episodes.map((episode, index) => (
        <details
          key={episode.number}
          className="episode reveal"
          open={index === 0}
          data-testid="episode-card"
        >
          <summary>
            <span className="episode__num" aria-hidden="true">
              0{episode.number}
            </span>
            <span>
              <h3 className="episode__title">{episode.title}</h3>
              <span className="episode__year">
                Серия {episode.number} · {episode.year}
              </span>
            </span>
            <span className="episode__choice">
              <span className="episode__choice-label">Выбор Антона</span>
              {episode.choice}
            </span>
            <span className="episode__marker" aria-hidden="true" />
          </summary>
          <div className="episode__body">
            <dl className="kv kv--danger">
              <dt>Цена</dt>
              <dd>{episode.consequence}</dd>
            </dl>
            <dl className="kv">
              <dt>Матч серии</dt>
              <dd>{matchLog[index]}</dd>
            </dl>
            <p className="episode__summary">{episode.summary}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
