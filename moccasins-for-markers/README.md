# Moccasins for Markers

Professional website for selling handmade ornamental moccasins. All sales and donations support permanent headstones for unmarked graves of former residential school survivors.

## Contents

- `index.html` — landing page with mission, shop, impact, and donate sections
- `css/styles.css` — brand styles
- `js/main.js` — cart, checkout, and donation flows (demo)
- `assets/images/` — logo, hero, impact, and product photography

## Local preview

```bash
cd moccasins-for-markers
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Notes

- Product price: **$85 CAD** per pair
- Cart persists in `localStorage`
- Checkout and donate forms are demo flows ready for Stripe/PayPal
