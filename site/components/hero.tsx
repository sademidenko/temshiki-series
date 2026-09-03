import type { SeriesMeta } from '@/lib/content';

export function Hero({ meta }: { meta: SeriesMeta }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <img
        className="hero__art"
        src="./hero/temshchiki-hero.webp"
        alt="Четыре силуэта между дымящими трубами индустриального города, огнями Москвы и холодными серверными стойками; пятое место в ряду пустует, по дороге уходит фура"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content">
        <p className="label label--arrow">
          Продюсерская заявка · мини-сериал · рабочее название
        </p>
        <h1 id="hero-title" className="display hero__title cursor">
          <span className="hero__title-mark">{meta.title}</span>
        </h1>
        <p className="hero__formula">{meta.formula}</p>
        <p className="hero__logline">{meta.logline}</p>
        <ul className="hero__chips" aria-label="Формат проекта">
          <li className="chip">{meta.format}</li>
          <li className="chip">{meta.period}</li>
          <li className="chip">{meta.genre}</li>
        </ul>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#idea">
            Смотреть проект
          </a>
          <a
            className="btn"
            href="./materials/temshchiki-season-1-v2.md"
            download
          >
            Скачать заявку
          </a>
        </div>
      </div>
      <p className="hero__scroll" aria-hidden="true">
        листайте ↓
      </p>
    </section>
  );
}
