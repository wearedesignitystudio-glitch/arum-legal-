import { useEffect } from 'react';

export default function Seo({
  title,
  description,
  path = '',
}) {
  useEffect(() => {
    const fullTitle = title.includes('Moccasins for Markers')
      ? title
      : `${title} · Moccasins for Markers`;
    document.title = fullTitle;

    const ensureMeta = (selector, attrs) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      return el;
    };

    const desc = ensureMeta('meta[name="description"]', { name: 'description' });
    desc.setAttribute('content', description);

    const ogTitle = ensureMeta('meta[property="og:title"]', { property: 'og:title' });
    ogTitle.setAttribute('content', fullTitle);

    const ogDesc = ensureMeta('meta[property="og:description"]', { property: 'og:description' });
    ogDesc.setAttribute('content', description);

    const ogType = ensureMeta('meta[property="og:type"]', { property: 'og:type' });
    ogType.setAttribute('content', 'website');

    const canonicalHref = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);
  }, [title, description, path]);

  return null;
}
