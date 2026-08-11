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
    initManifesto();
    initAtelier();
    initRootz();
    initRitual();
    initCreator();
    initScramble();
    initMagnetic();
    initForms();
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

  /* ---------- Manifesto ---------- */
  function initManifesto() {
    if (typeof ScrollTrigger === "undefined") return;

    document.querySelectorAll(".m-line").forEach((line) => {
      const speed = Number(line.dataset.speed || 0.1);
      gsap.to(line, {
        xPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    const emblem = document.querySelector(".float-emblem");
    if (emblem && !reduceMotion) {
      gsap.to(emblem, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }

  /* ---------- Atelier horizontal ---------- */
  function initAtelier() {
    const track = document.getElementById("atelierTrack");
    const pin = document.querySelector(".atelier-pin");
    const progress = document.getElementById("atelierProgress");
    if (!track || !pin || typeof ScrollTrigger === "undefined") return;

    const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);

    if (reduceMotion || window.matchMedia("(max-width: 800px)").matches) {
      // Fallback: native horizontal overflow
      pin.style.overflowX = "auto";
      return;
    }

    const tween = gsap.to(track, {
      x: () => -getScroll(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${getScroll()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progress) progress.style.width = `${self.progress * 100}%`;
        },
      },
    });

    window.addEventListener("resize", () => {
      tween.scrollTrigger?.refresh();
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

  /* ---------- Ritual / Finale ---------- */
  function initRitual() {
    if (typeof ScrollTrigger === "undefined" || reduceMotion) return;

    const ritualImg = document.querySelector(".ritual-bg img");
    const finaleImg = document.querySelector(".finale-media img");

    if (ritualImg) {
      gsap.to(ritualImg, {
        scale: 1.22,
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

    if (finaleImg) {
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

    gsap.utils.toArray(".ritual-grid li").forEach((li, i) => {
      gsap.from(li, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: li, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray(".rootz-intro, .atelier-head, .creator-copy, .contact-shell, .manifesto-body").forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
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
    const toast = document.getElementById("toast");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      if (!toast) return;
      toast.textContent = "Message received — we'll grow back to you soon.";
      toast.classList.add("is-show");
      setTimeout(() => toast.classList.remove("is-show"), 3200);
    });
  }
})();
