import { useState } from 'react';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import { FAQ_ITEMS } from '../data/content';
import './StoryPages.css';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <div className="page">
      <Seo title="FAQ" description="Frequently asked questions about Moccasins for Markers." path="/faq" />
      <section className="page-hero container">
        <Reveal>
          <p className="kicker">FAQ</p>
          <h1>Questions, answered.</h1>
          <p>Clear information about the products, purpose, and how to support the work.</p>
        </Reveal>
      </section>

      <section className="container-narrow section-tight">
        {FAQ_ITEMS.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04}>
            <button
              type="button"
              className={`faq-item ${open === i ? 'is-open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{item.q}</span>
              <em>{open === i ? '−' : '+'}</em>
            </button>
            {open === i && <p className="faq-answer">{item.a}</p>}
          </Reveal>
        ))}
      </section>
    </div>
  );
}
