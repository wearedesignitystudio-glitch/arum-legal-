export const PRODUCTS = [
  {
    id: 'emerald-heart',
    slug: 'emerald-heart',
    name: 'Emerald Heart',
    price: 85,
    currency: 'CAD',
    tagline: 'Heart gem beadwork',
    description:
      'Tan leather with a faceted green heart gem and gold bead border. A quiet emblem of care, made by hand for remembrance.',
    longDescription:
      'Emerald Heart is crafted from soft tan leather and finished with a faceted green heart stone framed in gold-toned beads. Each pair is ornamental in scale — intimate enough to hold, meaningful enough to keep.',
    materials: 'Vegetable-tanned leather, glass and metal beads, cotton thread, heart-cut stone accent.',
    craftsmanship: 'Hand-cut, hand-stitched, and beaded one pair at a time. Minor variations are part of the handmade character.',
    impact: '100% of sales support permanent headstones for unmarked graves of former residential school survivors.',
    shipping: 'Ships within Canada. Orders are prepared with care; timelines may vary for handmade pieces.',
    image: 'moccasin-emerald-heart.jpg',
    hoverImage: 'moccasin-sage-leaf.jpg',
    category: 'featured',
    tags: ['handmade', 'limited', 'featured', 'available'],
    available: true,
  },
  {
    id: 'bear-medicine',
    slug: 'bear-medicine',
    name: 'Bear Medicine',
    price: 85,
    currency: 'CAD',
    tagline: 'Bear emblem beadwork',
    description:
      'Soft brown leather with a white bear emblem on blue and red beadwork — strength held gently in miniature form.',
    longDescription:
      'Bear Medicine centres a white bear silhouette against blue and red geometric beadwork. The soft brown leather body is stitched by hand, creating a piece that feels both protective and tender.',
    materials: 'Soft brown leather, glass seed beads, cotton lining thread.',
    craftsmanship: 'Beadwork applied by hand. Each emblem is composed with patience and precision.',
    impact: 'Proceeds fund permanent markers where names were never given stone.',
    shipping: 'Ships within Canada. Handmade fulfilment may take additional time.',
    image: 'moccasin-bear-medicine.jpg',
    hoverImage: 'moccasin-coral-path.jpg',
    category: 'featured',
    tags: ['handmade', 'limited', 'featured', 'available', 'new'],
    available: true,
  },
  {
    id: 'turquoise-bloom',
    slug: 'turquoise-bloom',
    name: 'Turquoise Bloom',
    price: 85,
    currency: 'CAD',
    tagline: 'Floral turquoise beadwork',
    description:
      'Caramel leather with turquoise floral beadwork and copper accents — a quiet bloom for remembrance.',
    longDescription:
      'Turquoise Bloom brings floral beadwork to caramel leather, finished with warm copper accents. It is designed as an ornamental keepsake with a soft, luminous presence.',
    materials: 'Caramel leather, turquoise glass beads, copper accents, cotton thread.',
    craftsmanship: 'Floral motifs are beaded by hand over a shaped leather vamp.',
    impact: 'Every purchase contributes to permanent headstones.',
    shipping: 'Ships within Canada.',
    image: 'moccasin-turquoise-bloom.jpg',
    hoverImage: 'moccasin-night-star.jpg',
    category: 'available',
    tags: ['handmade', 'limited', 'available', 'new'],
    available: true,
  },
  {
    id: 'coral-path',
    slug: 'coral-path',
    name: 'Coral Path',
    price: 85,
    currency: 'CAD',
    tagline: 'Geometric coral beadwork',
    description:
      'Chestnut leather with coral-red geometric beadwork and amber beads — a path traced in colour and care.',
    longDescription:
      'Coral Path features geometric beadwork in coral and white, grounded by chestnut leather and amber glass accents. A composed, architectural piece in miniature.',
    materials: 'Chestnut leather, coral and white beads, amber glass, cotton thread.',
    craftsmanship: 'Geometric patterns are planned and beaded by hand for balance and clarity.',
    impact: 'Sales support permanent markers for unmarked graves.',
    shipping: 'Ships within Canada.',
    image: 'moccasin-coral-path.jpg',
    hoverImage: 'moccasin-bear-medicine.jpg',
    category: 'available',
    tags: ['handmade', 'limited', 'available'],
    available: true,
  },
  {
    id: 'night-star',
    slug: 'night-star',
    name: 'Night Star',
    price: 85,
    currency: 'CAD',
    tagline: 'Midnight star motif',
    description:
      'Honey-tan leather with midnight blue and silver star beadwork — light kept close in the dark.',
    longDescription:
      'Night Star places a midnight-blue and silver star on honey-tan leather. Soft fringe and careful stitching give the pair a quiet ceremonial presence.',
    materials: 'Honey-tan leather, midnight blue and silver beads, cotton thread.',
    craftsmanship: 'Star motifs are beaded by hand; fringe is cut and finished individually.',
    impact: 'Proceeds help place lasting stone where silence once stood.',
    shipping: 'Ships within Canada.',
    image: 'moccasin-night-star.jpg',
    hoverImage: 'moccasin-turquoise-bloom.jpg',
    category: 'featured',
    tags: ['handmade', 'limited', 'featured', 'available'],
    available: true,
  },
  {
    id: 'sage-leaf',
    slug: 'sage-leaf',
    name: 'Sage Leaf',
    price: 85,
    currency: 'CAD',
    tagline: 'Sage embroidery',
    description:
      'Sand leather with sage leaf embroidery and gold bead details — soft earth, held with reverence.',
    longDescription:
      'Sage Leaf pairs sand-coloured leather with sage embroidery and gold bead accents. A gentle, grounded design meant to be held and remembered.',
    materials: 'Sand leather, sage embroidery thread, gold-toned beads.',
    craftsmanship: 'Leaf embroidery is stitched by hand and finished with bead details.',
    impact: '100% of sales support permanent headstones.',
    shipping: 'Ships within Canada.',
    image: 'moccasin-sage-leaf.jpg',
    hoverImage: 'moccasin-emerald-heart.jpg',
    category: 'available',
    tags: ['handmade', 'limited', 'available'],
    available: true,
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug, limit = 3) {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, limit);
}

export function formatMoney(amount, currency = 'CAD') {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function asset(path) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}images/${path}`.replace(/([^:]\/)\/+/g, '$1');
}
