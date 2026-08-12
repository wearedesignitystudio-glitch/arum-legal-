import { useMemo, useState } from 'react';
import Seo from '../components/ui/Seo';
import Reveal from '../components/ui/Reveal';
import ProductGrid from '../components/product/ProductGrid';
import { PRODUCTS, BUNDLES } from '../data/products';
import { PurposeBanner, BundleBanners } from '../components/ui/PromoBanners';
import './Shop.css';

export default function Shop() {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    if (filter === 'featured') list = list.filter((p) => p.tags.includes('featured'));
    if (filter === 'new') list = list.filter((p) => p.tags.includes('new'));
    if (filter === 'available') list = list.filter((p) => p.available);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'featured') {
      list.sort((a, b) => Number(b.tags.includes('featured')) - Number(a.tags.includes('featured')));
    }
    return list;
  }, [filter, sort]);

  return (
    <div className="page">
      <Seo
        title="Shop the Collection"
        description="Nine handcrafted ornamental moccasin pairs and bundle offers. Each one made with care and purpose — from $85 CAD."
        path="/shop"
      />
      <section className="page-hero container">
        <Reveal>
          <p className="kicker">Shop</p>
          <h1>Shop the Collection</h1>
          <p>Nine handcrafted pairs. Bundle offers available. Each one made with care and purpose.</p>
        </Reveal>
      </section>

      <PurposeBanner />

      <BundleBanners bundles={BUNDLES} />

      <section className="container shop-toolbar">
        <div className="filters" role="group" aria-label="Filter products">
          {[
            ['all', 'All'],
            ['featured', 'Featured'],
            ['new', 'New'],
            ['available', 'Available'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={filter === value ? 'is-active' : ''}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="shop-meta">
          <p>{products.length} pieces</p>
          <label>
            <span className="sr-only">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </label>
        </div>
      </section>

      <section className="container section-tight">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
