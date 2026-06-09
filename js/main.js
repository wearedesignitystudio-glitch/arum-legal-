/**
 * Aurum Legal Solutions — Premium Interactive Experience
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ─── Preloader ─── */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const minTime = prefersReducedMotion ? 0 : 2200;

    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
      initHeroAnimation();
    }, minTime);
  }

  /* ─── Custom Cursor ─── */
  function initCursor() {
    if (isTouchDevice || prefersReducedMotion) {
      document.body.classList.add('no-cursor', 'no-cursor-mobile');
      return;
    }

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.querySelector('.cursor-dot').style.left = mouseX + 'px';
      cursor.querySelector('.cursor-dot').style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursor.querySelector('.cursor-ring').style.left = ringX + 'px';
      cursor.querySelector('.cursor-ring').style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = document.querySelectorAll('a, button, [data-magnetic], .practice-card, input, select, textarea');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ─── Smooth Scroll (Lenis) ─── */
  let lenis;

  function initSmoothScroll() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* ─── Split Text & Hero Animation ─── */
  function splitText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.setAttribute('aria-label', text);

    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  }

  function initHeroAnimation() {
    document.querySelectorAll('[data-split]').forEach(splitText);

    if (prefersReducedMotion) {
      document.querySelectorAll('.char').forEach((c) => {
        c.style.transform = 'none';
        c.style.opacity = '1';
      });
      document.querySelectorAll('.reveal-up').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.to('.char', {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.2,
      stagger: { amount: 0.8, from: 'start' },
    })
      .to('.reveal-up', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      }, '-=0.6')
      .from('.hero-image-wrap', {
        scale: 1.15,
        opacity: 0,
        duration: 1.4,
      }, '-=1')
      .from('.hero-stat-card', {
        x: -40,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5');
  }

  /* ─── Scramble Text Effect ─── */
  const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';

  function scrambleText(element) {
    const finalText = element.dataset.original || element.textContent;
    element.dataset.original = finalText;

    if (prefersReducedMotion) return;

    let iteration = 0;
    const maxIterations = finalText.length * 3;

    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration / 3) return finalText[i];
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      iteration++;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        element.textContent = finalText;
      }
    }, 30);
  }

  function initScrambleTexts() {
    document.querySelectorAll('[data-scramble]').forEach((el) => {
      el.dataset.original = el.textContent;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => scrambleText(el),
      });
    });
  }

  /* ─── Scroll Reveals ─── */
  function initScrollReveals() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-up, .split-reveal span').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.utils.toArray('.reveal-up').forEach((el) => {
      const delay = (el.dataset.delay || 0) * 0.1;
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
      });
    });

    gsap.utils.toArray('.split-reveal').forEach((el) => {
      const spans = el.querySelectorAll('span');
      gsap.from(spans, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: '110%',
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      });
    });

    gsap.utils.toArray('.value-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
      });
    });

    gsap.utils.toArray('.step').forEach((step, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 90%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power3.out',
      });
    });
  }

  /* ─── Counter Animation ─── */
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power2.out',
          });
        },
      });
    });
  }

  /* ─── Parallax ─── */
  function initParallax() {
    if (prefersReducedMotion) return;

    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: () => window.innerHeight * speed,
        ease: 'none',
      });
    });

    gsap.to('.hero-bg-img', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 150,
      scale: 1.1,
      ease: 'none',
    });

    gsap.to('.hero-image', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: -80,
      ease: 'none',
    });
  }

  /* ─── Practice Area Horizontal Scroll ─── */
  function initPracticeScroll() {
    const track = document.getElementById('practiceTrack');
    const progress = document.getElementById('practiceProgress');
    if (!track || !progress) return;

    track.addEventListener('scroll', () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const pct = maxScroll > 0 ? (track.scrollLeft / maxScroll) * 100 : 0;
      progress.style.width = pct + '%';
    });

    let isDown = false;
    let startX, scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup', () => { isDown = false; });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });

    if (!prefersReducedMotion) {
      gsap.utils.toArray('.practice-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: '.practice-scroll-wrap',
            start: 'top 80%',
          },
          x: 80,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.08,
          ease: 'power3.out',
        });
      });
    }
  }

  /* ─── Card Tilt ─── */
  function initTilt() {
    if (isTouchDevice || prefersReducedMotion) return;

    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ─── Magnetic Buttons ─── */
  function initMagnetic() {
    if (isTouchDevice || prefersReducedMotion) return;

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  /* ─── Header Scroll Behavior ─── */
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    ScrollTrigger.create({
      start: 100,
      onUpdate: (self) => {
        const scroll = self.scroll();
        header.classList.toggle('scrolled', scroll > 50);
        if (scroll > lastScroll && scroll > 300) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
        lastScroll = scroll;
      },
    });

    document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          if (lenis) lenis.scrollTo(target, { offset: -80 });
          else target.scrollIntoView({ behavior: 'smooth' });
        }
        document.getElementById('navLinks')?.classList.remove('open');
        document.getElementById('navToggle')?.classList.remove('active');
      });
    });
  }

  /* ─── Melbourne Time ─── */
  function initMelbourneTime() {
    const el = document.getElementById('melbourneTime');
    if (!el) return;

    function update() {
      const now = new Date();
      const melb = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Melbourne',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      el.textContent = `MEL ${melb}`;
    }
    update();
    setInterval(update, 30000);
  }

  /* ─── Mobile Nav ─── */
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });
  }

  /* ─── Testimonials Slider ─── */
  function initTestimonials() {
    const track = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    if (!track || !testimonials.length) return;

    let current = 0;
    let autoplay;

    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer?.appendChild(dot);
    });

    const dots = dotsContainer?.querySelectorAll('.testimonial-dot');

    function goTo(index) {
      testimonials[current].classList.remove('active');
      dots?.[current]?.classList.remove('active');
      current = (index + testimonials.length) % testimonials.length;
      testimonials[current].classList.add('active');
      dots?.[current]?.classList.add('active');
    }

    document.querySelector('.testimonial-btn.prev')?.addEventListener('click', () => goTo(current - 1));
    document.querySelector('.testimonial-btn.next')?.addEventListener('click', () => goTo(current + 1));

    function startAutoplay() {
      autoplay = setInterval(() => goTo(current + 1), 6000);
    }

    startAutoplay();
    track.addEventListener('mouseenter', () => clearInterval(autoplay));
    track.addEventListener('mouseleave', startAutoplay);
  }

  /* ─── Modal ─── */
  function initModal() {
    const modal = document.getElementById('consultationModal');
    if (!modal) return;

    document.querySelectorAll('[data-modal="consultation"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    modal.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    const consultForm = document.getElementById('consultationForm');
    consultForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!consultForm.checkValidity()) {
        consultForm.reportValidity();
        return;
      }
      closeModal();
      showToast('Consultation booked! We\'ll confirm via email within 2 hours.');
      consultForm.reset();
    });

    const dateInput = document.getElementById('consultDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }
  }

  /* ─── Contact Form ─── */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      showToast('Thank you! Your enquiry has been received. We\'ll respond within 24 hours.');
      form.reset();
    });
  }

  /* ─── Toast ─── */
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  /* ─── Active Nav on Scroll ─── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => setActive(section.id),
        onEnterBack: () => setActive(section.id),
      });
    });

    function setActive(id) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  }

  /* ─── CTA Title Character Wave ─── */
  function initCTAWave() {
    if (prefersReducedMotion) return;

    const ctaTitle = document.querySelector('.cta-title');
    if (!ctaTitle) return;

    ScrollTrigger.create({
      trigger: ctaTitle,
      start: 'top 80%',
      once: true,
      onEnter: () => scrambleText(ctaTitle),
    });
  }

  /* ─── Init ─── */
  function init() {
    gsap.registerPlugin(ScrollTrigger);

    initPreloader();
    initCursor();
    initSmoothScroll();
    initScrambleTexts();
    initScrollReveals();
    initCounters();
    initParallax();
    initPracticeScroll();
    initTilt();
    initMagnetic();
    initHeader();
    initMelbourneTime();
    initMobileNav();
    initTestimonials();
    initModal();
    initContactForm();
    initActiveNav();
    initCTAWave();

    if (prefersReducedMotion) {
      initHeroAnimation();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
