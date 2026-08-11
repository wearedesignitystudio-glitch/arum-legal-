/* Radiant Rootz — motion & interactions */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(pointer: coarse)").matches;

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader?.classList.add("hidden");
      document.body.classList.add("is-ready");
      initSite();
    }, reduceMotion ? 200 : 1900);
  });

  function initSite() {
    initCursor();
    initNav();
    initSmoothScroll();
    initHero();
    initReveals();
    initIngredients();
    initRitualParallax();
    initCreator();
    initScramble();
    initMagnetic();
    initForms();
  }

  /* ---------- Cursor ---------- */
  function initCursor() {
    const cursor = document.getElementById("cursor");
    if (!cursor || isTouch) {
      document.body.classList.add("no-cursor");
      return;
    }

    const dot = cursor.querySelector(".cursor-dot");
    const ring = cursor.querySelector(".cursor-ring");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      gsap.set(dot, { x, y });
    });

    gsap.ticker.add(() => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      gsap.set(ring, { x: rx, y: ry });
    });

    document.querySelectorAll("a, button, .ingredient, input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const header = document.getElementById("header");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    const onScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    toggle?.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    links?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle?.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Smooth scroll ---------- */
  let lenis;
  function initSmoothScroll() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (reduceMotion || typeof Lenis === "undefined") return;

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70 });
      });
    });
  }

  /* ---------- Hero ---------- */
  function initHero() {
    const titleLines = document.querySelectorAll(".hero-title .line span");
    const brand = document.querySelector(".brand-lockup");
    const lead = document.querySelector(".hero-lead");
    const cta = document.querySelector(".hero-cta");
    const img = document.querySelector(".hero-img");

    if (reduceMotion) {
      gsap.set([brand, lead, cta, titleLines], { opacity: 1, y: 0, clearProps: "all" });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(brand, { opacity: 1, y: 0, duration: 1 }, 0.1)
      .to(titleLines, { y: 0, duration: 1.15, stagger: 0.12 }, 0.2)
      .to(lead, { opacity: 1, y: 0, duration: 0.9 }, 0.55)
      .to(cta, { opacity: 1, y: 0, duration: 0.9 }, 0.7);

    if (img && typeof ScrollTrigger !== "undefined") {
      gsap.to(img, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }

  /* ---------- Reveals ---------- */
  function initReveals() {
    if (typeof ScrollTrigger === "undefined") {
      document.querySelectorAll(".reveal").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    gsap.utils.toArray(".reveal").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: reduceMotion ? 0.2 : 1,
        ease: "power3.out",
        delay: reduceMotion ? 0 : (i % 4) * 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    gsap.utils.toArray(".collection-panel").forEach((panel) => {
      const media = panel.querySelector(".collection-media img");
      if (!media || reduceMotion) return;
      gsap.fromTo(
        media,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }

  /* ---------- Ingredients ---------- */
  function initIngredients() {
    const items = document.querySelectorAll(".ingredient");
    const images = document.querySelectorAll("[data-ingredient-img]");
    if (!items.length) return;

    const activate = (index) => {
      items.forEach((item, i) => item.classList.toggle("is-active", i === index));
      images.forEach((img, i) => img.classList.toggle("is-active", i === index));
    };

    items.forEach((item) => {
      const index = Number(item.dataset.ingredient);
      item.addEventListener("mouseenter", () => activate(index));
      item.addEventListener("focus", () => activate(index));
      item.addEventListener("click", () => activate(index));
      item.setAttribute("tabindex", "0");
    });

    if (typeof ScrollTrigger !== "undefined" && !reduceMotion) {
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 70%",
          onEnter: () => activate(index),
        });
      });
    }
  }

  /* ---------- Ritual parallax ---------- */
  function initRitualParallax() {
    const img = document.querySelector(".ritual-bg img");
    const finale = document.querySelector(".finale-media img");
    if (typeof ScrollTrigger === "undefined" || reduceMotion) return;

    if (img) {
      gsap.to(img, {
        scale: 1.2,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".ritual",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (finale) {
      gsap.to(finale, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".finale",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    gsap.utils.toArray(".ritual-step").forEach((step, i) => {
      gsap.from(step, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          once: true,
        },
      });
    });
  }

  /* ---------- Creator ---------- */
  function initCreator() {
    const section = document.querySelector(".creator");
    if (!section || typeof ScrollTrigger === "undefined") {
      section?.classList.add("is-inview");
      return;
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      once: true,
      onEnter: () => section.classList.add("is-inview"),
    });
  }

  /* ---------- Text scramble ---------- */
  function initScramble() {
    const el = document.querySelector("[data-scramble]");
    if (!el || reduceMotion) return;

    const original = el.textContent;
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        let frame = 0;
        const total = 18;
        const id = setInterval(() => {
          el.textContent = original
            .split("")
            .map((ch, i) => {
              if (ch === " " || ch === ",") return ch;
              if (i < (frame / total) * original.length) return original[i];
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join("");
          frame++;
          if (frame > total) {
            clearInterval(id);
            el.textContent = original;
          }
        }, 40);
      },
    });
  }

  /* ---------- Magnetic ---------- */
  function initMagnetic() {
    if (isTouch || reduceMotion) return;

    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.35, ease: "power3.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
      });
    });
  }

  /* ---------- Forms ---------- */
  function initForms() {
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toast");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      if (!toast) return;
      toast.textContent = "Message sent — we'll be in touch soon.";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3200);
    });
  }
})();
