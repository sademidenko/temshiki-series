export const sections = [
  { id: 'idea', num: '01', label: 'Идея' },
  { id: 'team', num: '02', label: 'Команда' },
  { id: 'evolution', num: '03', label: 'Эволюция' },
  { id: 'episodes', num: '04', label: '8 серий' },
  { id: 'materials', num: '05', label: 'Материалы' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export function SectionNav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          ТЕМЩИКИ
        </a>
        <nav aria-label="Разделы страницы">
          <ul className="nav__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a className="nav__link" href={`#${section.id}`}>
                  <span className="nav__num" aria-hidden="true">
                    {section.num}
                  </span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function SectionHead({
  id,
  title,
  lead,
}: {
  id: string;
  title: string;
  lead?: string;
}) {
  const known = sections.find((section) => section.id === id);
  return (
    <>
      <div className="section__head">
        {known ? (
          <span className="section__num" aria-hidden="true">
            {known.num}
          </span>
        ) : null}
        <h2 className="section__title">{title}</h2>
      </div>
      {lead ? <p className="section__lead">{lead}</p> : null}
    </>
  );
}
