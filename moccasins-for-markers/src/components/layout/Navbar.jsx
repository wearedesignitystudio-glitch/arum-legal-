import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { asset } from '../../data/products';
import './Navbar.css';

const NAV = [
  { to: '/mission', label: 'Mission' },
  { to: '/shop', label: 'Shop' },
  { to: '/impact', label: 'Our Impact' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const solid = scrolled || !isHome || menuOpen;

  return (
    <>
      <header className={`nav ${solid ? 'is-solid' : 'is-overlay'} ${isHome ? 'on-home' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand" aria-label="Moccasins for Markers home">
            <img src={asset('logo.png')} alt="" width="40" height="40" />
            <span>
              Moccasins
              <em>for Markers</em>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV.map((link) => (
              <NavLink key={link.to + link.label} to={link.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <Link to="/donate" className="nav-donate">
              Donate
            </Link>
            <button type="button" className="nav-icon cart-btn" onClick={openCart} aria-label={`Open cart, ${count} items`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 7h12l-1.1 11a2 2 0 0 1-2 1.8H9.1a2 2 0 0 1-2-1.8L6 7Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 7V5.8A3 3 0 0 1 12 2.8v0a3 3 0 0 1 3 3V7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.nav
              initial={reduce ? false : { y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Mobile"
            >
              {NAV.map((link, i) => (
                <motion.div
                  key={link.to + link.label}
                  initial={reduce ? false : { y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link to={link.to} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/donate" className="mobile-donate" onClick={() => setMenuOpen(false)}>
                Donate
              </Link>
              <Link to="/faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
