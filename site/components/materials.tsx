import { downloads } from '@/lib/content';

export function Materials() {
  return (
    <div className="grid">
      {downloads.map((item) => (
        <a key={item.href} className="dl reveal" href={item.href} download>
          <span className="dl__label">{item.label}</span>
          <span className="dl__file">
            {item.href.replace('./materials/', '')}
          </span>
          <span className="dl__desc">{item.description}</span>
          <span className="dl__cta">Скачать ↓</span>
        </a>
      ))}
    </div>
  );
}
