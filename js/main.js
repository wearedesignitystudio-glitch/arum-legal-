/* Radiant Rootz — cinematic motion system */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(pointer: coarse)").matches;
  const preloader = document.getElementById("preloader");
  const bar = document.getElementById("preloaderBar");

  let progress = 0;
  const boot = setInterval(() => {
    progress = Math.min(100, progress + (reduceMotion ? 20 : 2 + Math.random() * 6));
    if (bar) bar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(boot);
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          preloader?.classList.add("is-done");
          initExperience();
        }, reduceMotion ? 120 : 420);
      });
    }
  }, reduceMotion ? 40 : 45);

  window.addEventListener("load", () => {
    progress = Math.max(progress, 92);
  });

  function initExperience() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    initCursor();
    initNav();
    initSpores();
    initSmooth();
    initHero();
    initSale();
    initCommerceMotion();
    initRootz();
    initCreator();
    initScramble();
    initMagnetic();
    initForms();
    initCart();
    initHeaderTheme();
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
    const label = cursor.querySelector(".cursor-label");
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;

    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      gsap.set(dot, { x, y });
    });

    gsap.ticker.add(() => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      gsap.set(ring, { x: rx, y: ry });
      gsap.set(label, { x: rx, y: ry });
    });

    document.querySelectorAll("a, button, .root-item, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hover");
        if (label) label.textContent = el.dataset.cursor || "View";
      });
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ---------- Nav ---------- */
  function initNav() {
    const header = document.getElementById("header");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");

    const onScroll = () => header?.classList.toggle("is-scrolled", scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    toggle?.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    links?.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle?.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  function initHeaderTheme() {
    const header = document.getElementById("header");
    const darkZones = [".hero", ".ritual", ".finale", ".atelier-panel"];
    if (!header || typeof ScrollTrigger === "undefined") return;

    const sync = () => {
      const y = 40;
      const el = document.elementFromPoint(innerWidth / 2, y);
      const dark = el?.closest(".hero, .ritual, .finale, .atelier-panel--cta, .atelier-pin");
      // Keep light nav over hero until scrolled
      const overHero = scrollY < innerHeight * 0.85;
      header.classList.toggle("is-light", overHero && !header.classList.contains("is-scrolled") ? true : !!dark && !header.classList.contains("is-scrolled"));
      if (overHero && scrollY < 40) header.classList.add("is-light");
      if (!overHero && header.classList.contains("is-scrolled")) header.classList.remove("is-light");
    };

    // Simpler: light text only at top of hero
    const apply = () => {
      if (scrollY < 80) header.classList.add("is-light");
      else header.classList.remove("is-light");
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    void darkZones;
    void sync;
  }

  /* ---------- Spores canvas ---------- */
  function initSpores() {
    const canvas = document.getElementById("sporeField");
    if (!canvas || reduceMotion || isTouch) {
      canvas?.remove();
      return;
    }

    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;

    const resize = () => {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      particles = Array.from({ length: Math.min(42, Math.floor(w / 40)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.05,
        a: Math.random() * 0.35 + 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(176, 138, 74, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else draw();
    });
  }

  /* ---------- Smooth scroll ---------- */
  let lenis;
  function initSmooth() {
    if (reduceMotion || typeof Lenis === "undefined") return;

    lenis = new Lenis({
      duration: 1.2,
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
    const lines = document.querySelectorAll(".hero-line > span");
    const fades = document.querySelectorAll("[data-hero-fade]");
    const img = document.querySelector(".hero-img");

    if (reduceMotion) {
      gsap.set([lines, fades], { clearProps: "all", opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.to(lines, { y: 0, duration: 1.25, stagger: 0.14 }, 0.15)
      .to(fades, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.45);

    if (img) {
      gsap.to(img, {
        scale: 1.22,
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

  /* ---------- Sale banner ---------- */
  function initSale() {
    const img = document.querySelector(".sale-media img");
    if (img && typeof ScrollTrigger !== "undefined" && !reduceMotion) {
      gsap.to(img, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: ".sale-banner",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    const root = document.getElementById("saleCountdown");
    if (!root) return;
    const end = Date.now() + ((2 * 24 + 14) * 60 * 60 + 36 * 60 + 18) * 1000;
    const days = root.querySelector("[data-days]");
    const hours = root.querySelector("[data-hours]");
    const mins = root.querySelector("[data-mins]");
    const secs = root.querySelector("[data-secs]");
    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

    const tick = () => {
      let left = Math.max(0, end - Date.now());
      const d = Math.floor(left / 86400000);
      left -= d * 86400000;
      const h = Math.floor(left / 3600000);
      left -= h * 3600000;
      const m = Math.floor(left / 60000);
      left -= m * 60000;
      const s = Math.floor(left / 1000);
      if (days) days.textContent = pad(d);
      if (hours) hours.textContent = pad(h);
      if (mins) mins.textContent = pad(m);
      if (secs) secs.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Commerce motion ---------- */
  function initCommerceMotion() {
    if (typeof ScrollTrigger === "undefined") return;

    const bundleImg = document.querySelector(".bundle-media img");
    const finaleImg = document.querySelector(".finale-media img");
    const bestImg = document.querySelector(".bestseller-img");

    if (bundleImg && !reduceMotion) {
      gsap.to(bundleImg, {
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: ".bundle",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (finaleImg && !reduceMotion) {
      gsap.to(finaleImg, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: ".finale",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (bestImg && !reduceMotion) {
      gsap.from(bestImg, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bestseller", start: "top 75%", once: true },
      });
    }

    gsap.utils.toArray(".product").forEach((el, i) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: (i % 4) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    gsap.utils.toArray(".bestseller-copy, .shop-head, .sale-content, .bundle-copy, .rootz-intro, .creator-copy, .contact-shell").forEach((el) => {
      gsap.from(el, {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }

  /* ---------- Ingredients ---------- */
  function initRootz() {
    const items = document.querySelectorAll(".root-item");
    const images = document.querySelectorAll("[data-root-img]");
    if (!items.length) return;

    const activate = (index) => {
      items.forEach((item, i) => item.classList.toggle("is-active", i === index));
      images.forEach((img, i) => img.classList.toggle("is-active", i === index));
    };

    items.forEach((item) => {
      const index = Number(item.dataset.root);
      item.addEventListener("mouseenter", () => activate(index));
      item.addEventListener("focus", () => activate(index));
      item.addEventListener("click", () => activate(index));
    });

    if (typeof ScrollTrigger !== "undefined" && !reduceMotion) {
      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 75%",
          onEnter: () => activate(index),
        });
      });
    }
  }

  /* ---------- Creator ---------- */
  function initCreator() {
    const section = document.querySelector(".creator");
    if (!section) return;

    if (typeof ScrollTrigger === "undefined") {
      section.classList.add("is-inview");
      return;
    }

    ScrollTrigger.create({
      trigger: section,
      start: "top 72%",
      once: true,
      onEnter: () => section.classList.add("is-inview"),
    });

    const img = section.querySelector(".creator-mask img");
    if (img && !reduceMotion) {
      gsap.to(img, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }

  /* ---------- Scramble ---------- */
  function initScramble() {
    const el = document.querySelector("[data-scramble]");
    if (!el || reduceMotion || typeof ScrollTrigger === "undefined") return;

    const original = el.textContent;
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ••••";

    ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      once: true,
      onEnter: () => {
        let frame = 0;
        const total = 22;
        const id = setInterval(() => {
          el.textContent = original
            .split("")
            .map((ch, i) => {
              if (ch === " " || ch === ",") return ch;
              if (i < (frame / total) * original.length) return original[i];
              return glyphs[Math.floor(Math.random() * glyphs.length)];
            })
            .join("");
          frame += 1;
          if (frame > total) {
            clearInterval(id);
            el.textContent = original;
          }
        }, 36);
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
        gsap.to(el, { x: x * 0.28, y: y * 0.28, duration: 0.35, ease: "power3.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
      });
    });
  }

  /* ---------- Forms ---------- */
  function initForms() {
    const form = document.getElementById("contactForm");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      showToast("Message received — we'll grow back to you soon.");
    });
  }

  /* ---------- Cart toast ---------- */
  function initCart() {
    document.querySelectorAll("[data-add-cart]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const name = btn.getAttribute("data-add-cart") || "Item";
        showToast(`${name} added to your bag`);
      });
    });
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-show");
    setTimeout(() => toast.classList.remove("is-show"), 2800);
  }
})();
