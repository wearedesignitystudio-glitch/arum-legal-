import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const NAV = [
  { to: '/mission', label: 'Story' },
  { to: '/shop', label: 'Collection' },
  { to: '/impact', label: 'Purpose' },
  { to: '/donate', label: 'Give' },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dusk, setDusk] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      if (!isHome) {
        setDusk(false);
        return;
      }
      const gate = document.getElementById('dusk-gate');
      if (!gate) return;
      setDusk(gate.getBoundingClientRect().top < 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  return (
    <>
      <header className={`nav ${scrolled || menuOpen ? 'is-solid' : ''} ${dusk ? 'is-dusk' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand">
            Moccasins <span>for Markers</span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <button type="button" className="nav-cart" onClick={openCart} aria-label={`Cart ${count}`}>
              Cart{count > 0 ? ` ${count}` : ''}
            </button>
            <Link to="/donate" className="nav-give">
              Give
            </Link>
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close' : 'Menu'}
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
            className={`mobile-menu ${dusk ? 'is-dusk' : ''}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav>
              {NAV.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={reduce ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={l.to} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
