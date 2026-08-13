import { useEffect, useRef, useState } from 'react';
import { asset } from '../../data/products';
import './ImpactStory.css';

const STAGES = [
  {
    id: 'crafted',
    label: 'Crafted',
    title: 'Handmade with patience',
    copy: 'A pair of miniature ornamental moccasins is carefully cut, stitched, and beaded — one at a time.',
    image: 'moccasin-emerald-heart.jpg',
  },
  {
    id: 'chosen',
    label: 'Chosen',
    title: 'Selected with intention',
    copy: 'Someone purchases a pair or contributes directly — beauty held as an act of care.',
    image: 'moccasin-bear-medicine.jpg',
  },
  {
    id: 'given',
    label: 'Given',
    title: 'Directed toward stone',
    copy: 'Funds are directed toward permanent memorial markers for unmarked graves of former residential school survivors.',
    image: 'craft-table.jpg',
  },
  {
    id: 'remembered',
    label: 'Remembered',
    title: 'Dignity restored',
    copy: 'A lasting marker helps preserve memory where silence once stood.',
    image: 'impact-marker.jpg',
  },
];

export default function ImpactStory() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const current = STAGES[active];

  return (
    <section className="impact-story" aria-label="The journey of a pair">
      <div className="container impact-story-intro">
        <p className="label">The journey</p>
        <h2>
          One pair.
          <br />
          One contribution.
          <br />
          One lasting marker.
        </h2>
      </div>

      <div className="impact-story-layout">
        <div className="impact-story-sticky" aria-hidden="true">
          {STAGES.map((stage, i) => (
            <img
              key={stage.id}
              src={asset(stage.image)}
              alt=""
              className={i === active ? 'is-active' : ''}
            />
          ))}
          <span className="impact-story-chip">{current.label}</span>
        </div>

        <div className="impact-story-steps">
          {STAGES.map((stage, i) => (
            <article
              key={stage.id}
              className={`impact-step ${i === active ? 'is-active' : ''}`}
              data-index={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
            >
              <p className="label">
                0{i + 1} / {stage.label}
              </p>
              <h3>{stage.title}</h3>
              <p>{stage.copy}</p>
              <div className="impact-step-mobile-media">
                <img src={asset(stage.image)} alt="" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
