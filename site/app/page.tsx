import { Fragment } from 'react';
import { CharacterGrid } from '@/components/character-grid';
import { EpisodeList } from '@/components/episode-list';
import { EvolutionTimeline } from '@/components/evolution-timeline';
import { FinalChoice } from '@/components/final-choice';
import { Hero } from '@/components/hero';
import { Materials } from '@/components/materials';
import { SectionHead, SectionNav } from '@/components/section-nav';
import {
  clearance,
  episodeEngine,
  highConcept,
  powerTriangle,
  production,
  references,
  seasonArc,
  seriesMeta,
  shortPitch,
  supportingCast,
  tagline,
  tone,
  world,
} from '@/lib/content';

export default function Home() {
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <SectionNav />
      <main>
        <Hero meta={seriesMeta} />

        <section id="idea" className="section">
          <SectionHead id="idea" title="Идея" lead={tagline} />
          <div className="story">
            {shortPitch.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <h3 className="sub">О чём это на самом деле</h3>
          <div className="grid">
            {highConcept.map((block) => (
              <article key={block.title} className="card reveal">
                <h4 className="card__name">{block.title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{block.text}</p>
              </article>
            ))}
          </div>
          <h3 className="sub">Как устроена каждая серия</h3>
          <ol className="engine">
            {episodeEngine.map((stage) => (
              <li key={stage}>{stage}</li>
            ))}
          </ol>
        </section>

        <section id="team" className="section">
          <SectionHead
            id="team"
            title="Команда из четырёх"
            lead="Dota здесь нужна не для красоты. Роли в игре показывают, зачем друзья нужны друг другу, а короткая сцена в игре в каждой серии показывает, как меняется их дружба."
          />
          <CharacterGrid />
          <h3 className="sub">Кто на самом деле главный</h3>
          <div className="triangle">
            {powerTriangle.map((node, index) => (
              <Fragment key={node.name}>
                {index > 0 ? (
                  <span className="triangle__link" aria-hidden="true">
                    ↔
                  </span>
                ) : null}
                <article className="card reveal">
                  <p className="card__meta">{node.role}</p>
                  <h4 className="card__name">{node.name}</h4>
                  <p style={{ fontSize: '0.88rem' }}>{node.detail}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </section>

        <section id="evolution" className="section">
          <SectionHead
            id="evolution"
            title="Как росла «ТЕМА»"
            lead="Это не набор отдельных афер. Каждая победа оставляет что-то, что нельзя вернуть, и новый долг перед Рудиным. В конце площадка работает уже без своих создателей."
          />
          <EvolutionTimeline />
          <h3 className="sub">Кто пострадал</h3>
          <div className="grid">
            {supportingCast.map(({ name, role, detail }) => (
              <article key={name} className="card reveal">
                <p className="card__meta">{role}</p>
                <h4 className="card__name">{name}</h4>
                <p style={{ fontSize: '0.88rem' }}>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="episodes" className="section">
          <SectionHead
            id="episodes"
            title="Восемь серий"
            lead="В каждой серии Антон делает один выбор, который нельзя отменить. Восемь таких выборов ведут от общей кассы к предательству. Подробности открываются по нажатию, первая серия уже открыта."
          />
          <EpisodeList />
          <h3 className="sub">Финальный выбор</h3>
          <FinalChoice />
          <blockquote className="quote reveal" style={{ marginTop: '3rem' }}>
            {seasonArc}
          </blockquote>
        </section>

        <section className="section">
          <SectionHead id="world" title="Где происходит действие" lead={tone} />
          <div className="grid">
            {world.map((place) => (
              <article key={place.title} className="card reveal">
                <h3 className="card__name">{place.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{place.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHead
            id="production"
            title="Как это снимать"
            lead="Дорогих сцен три. Остальное снимается в помещениях."
          />
          <div className="grid">
            {production.map((block) => (
              <article key={block.title} className="card reveal">
                <h3 className="card__name">{block.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{block.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHead
            id="references"
            title="Похожие сериалы"
            lead="Что каждый из них даёт проекту. Отличие «ТЕМЩИКОВ»: четверо друзей из компьютерной игры и пустое пятое место, мелкие схемы, которые вырастают в площадку, и государство, которое забирает себе их дружбу."
          />
          <ul className="refs">
            {references.map((reference) => (
              <li key={reference.title}>
                <span className="refs__title">«{reference.title}»</span>
                <span className="refs__role">{reference.role}</span>
              </li>
            ))}
          </ul>
          <h3 className="sub">Права и вымышленные названия</h3>
          <div className="prose" style={{ display: 'grid', gap: '0.75rem' }}>
            {clearance.map((paragraph) => (
              <p key={paragraph} className="muted" style={{ fontSize: '0.88rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section id="materials" className="section">
          <SectionHead
            id="materials"
            title="Материалы"
            lead="Три рабочих документа. Скачиваются напрямую, без регистрации."
          />
          <Materials />
        </section>
      </main>

      <footer className="footer">
        <p className="footer__line">
          {seriesMeta.title} · {seriesMeta.formula} · {seriesMeta.format}
        </p>
        <p className="prose">{seriesMeta.logline}</p>
        <p>
          Рабочее название. Продюсерская заявка, версия 2. Все персонажи,
          букмекер, площадка «ТЕМА», программа «Контур» и компании внутри
          операций вымышлены; реальные игра, производитель видеокарт и вузы
          упомянуты как приметы времени и требуют согласования прав.
        </p>
      </footer>
    </>
  );
}
