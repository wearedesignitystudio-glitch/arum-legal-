import { useState } from 'react';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import './StoryPages.css';

export default function Contact() {
  const { showToast } = useCart();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    // TODO: Wire contact form to inbox/CRM when ready.
    showToast('Thank you. Your message has been received.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="page">
      <Seo
        title="Contact"
        description="Contact Moccasins for Markers about orders, donations, or partnerships."
        path="/contact"
      />
      <section className="page-hero container">
        <Reveal>
          <p className="kicker">Contact</p>
          <h1>We would be honoured to hear from you.</h1>
          <p>Questions about orders, memorial partnerships, or donations — reach out.</p>
        </Reveal>
      </section>

      <section className="container contact-grid">
        <Reveal>
          <form className="contact-form" onSubmit={submit}>
            <label className="field">
              <span>Full name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <Button type="submit" variant="primary">
              Send message
            </Button>
          </form>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="contact-aside">
            <h2>Direct</h2>
            <p>
              <a href="mailto:hello@moccasinsformarkers.ca">hello@moccasinsformarkers.ca</a>
            </p>
            <p className="muted">We aim to respond with care. For urgent order questions, email us directly.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
