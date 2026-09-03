import { finalChoice } from '@/lib/content';

export function FinalChoice() {
  return (
    <div>
      <p className="section__lead">{finalChoice.intro}</p>
      <div className="choice">
        <article className="choice__branch reveal">
          <p className="choice__key">Вариант 1</p>
          <h4 className="choice__title">{finalChoice.burn.title}</h4>
          <p>{finalChoice.burn.text}</p>
        </article>
        <article className="choice__branch choice__branch--restore reveal">
          <p className="choice__key">Вариант 2</p>
          <h4 className="choice__title">{finalChoice.restore.title}</h4>
          <p>{finalChoice.restore.text}</p>
        </article>
      </div>
      <div className="choice__outcome reveal">
        <p className="choice__key">Что выбирает Антон</p>
        <h4>{finalChoice.outcome}</h4>
        <p>{finalChoice.outcomeText}</p>
      </div>
      <p className="choice__key" style={{ marginTop: "1.5rem" }}>Эпилог</p>
      <p className="choice__epilogue" style={{ marginTop: "0.5rem" }}>{finalChoice.epilogue}</p>
    </div>
  );
}
