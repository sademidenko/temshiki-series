import { evolutionSteps } from '@/lib/content';

export function EvolutionTimeline() {
  const last = evolutionSteps.length - 1;
  return (
    <ol className="timeline" aria-label="Эволюция «ТЕМЫ» по годам">
      {evolutionSteps.map((step, index) => (
        <li
          key={step.label}
          className={`step reveal${index === last ? ' step--last' : ''}`}
        >
          <span className="step__index" aria-hidden="true">
            0{index + 1}
          </span>
          <p className="step__year">{step.year}</p>
          <h3 className="step__label">{step.label}</h3>
          <p className="step__detail">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
