(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(pointer: coarse)").matches;
  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader?.classList.add("is-done");
      boot();
    }, reduce ? 150 : 700);
  });

  function boot() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    nav();
    smooth();
    hero();
    timer();
    ingredients();
    reveals();
    cart();
    form();
  }

  function nav() {
    const header = document.getElementById("header");
    const btn = document.getElementById("menuBtn");
    const navEl = document.getElementById("nav");
    const onScroll = () => header?.classList.toggle("is-on", scrollY > 20);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });

    btn?.addEventListener("click", () => {
      const open = navEl.classList.toggle("is-open");
      btn.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    navEl?.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navEl.classList.remove("is-open");
        btn?.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  let lenis;
  function smooth() {
    if (reduce || typeof Lenis === "undefined") return;
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = id && document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70 });
      });
    });
  }

  function hero() {
    const lines = document.querySelectorAll(".h-line > span");
    const fades = document.querySelectorAll(".hero-copy .eyebrow, .lede, .hero-actions");
    if (reduce) {
      gsap.set([lines, fades], { clearProps: "all", opacity: 1, y: 0 });
      return;
    }
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .to(lines, { y: 0, duration: 1.15, stagger: 0.12 }, 0.05)
      .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.35);

    const img = document.querySelector(".hero-product img");
    if (img && typeof ScrollTrigger !== "undefined") {
      gsap.to(img, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }
  }

  function timer() {
    const root = document.getElementById("timer");
    if (!root) return;
    const end = Date.now() + ((2 * 24 + 14) * 3600 + 36 * 60 + 18) * 1000;
    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
    const tick = () => {
      let left = Math.max(0, end - Date.now());
      const d = Math.floor(left / 86400000); left -= d * 86400000;
      const h = Math.floor(left / 3600000); left -= h * 3600000;
      const m = Math.floor(left / 60000); left -= m * 60000;
      const s = Math.floor(left / 1000);
      root.querySelector("[data-d]").textContent = pad(d);
      root.querySelector("[data-h]").textContent = pad(h);
      root.querySelector("[data-m]").textContent = pad(m);
      root.querySelector("[data-s]").textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  function ingredients() {
    const btns = [...document.querySelectorAll(".ing")];
    const imgs = [...document.querySelectorAll(".ing-visual img")];
    const activate = (i) => {
      btns.forEach((b, n) => b.classList.toggle("is-on", n === i));
      imgs.forEach((img, n) => img.classList.toggle("is-on", n === i));
    };
    btns.forEach((b) => {
      b.addEventListener("mouseenter", () => activate(Number(b.dataset.i)));
      b.addEventListener("focus", () => activate(Number(b.dataset.i)));
      b.addEventListener("click", () => activate(Number(b.dataset.i)));
    });
  }

  function reveals() {
    if (typeof ScrollTrigger === "undefined") return;
    gsap.utils.toArray(".sale, .feature, .shop, .bundle, .ingredients, .creator, .contact-wrap, .item").forEach((el, i) => {
      gsap.from(el, {
        y: 36,
        opacity: 0,
        duration: reduce ? 0.2 : 0.95,
        delay: reduce ? 0 : (i % 4) * 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    const bundle = document.querySelector(".bundle-bg");
    if (bundle && !reduce) {
      gsap.to(bundle, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: ".bundle", start: "top bottom", end: "bottom top", scrub: true },
      });
    }
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    setTimeout(() => el.classList.remove("is-on"), 2600);
  }

  function cart() {
    document.querySelectorAll("[data-add]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toast(`${btn.getAttribute("data-add")} added to your bag`);
      });
    });
  }

  function form() {
    document.getElementById("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      if (!f.checkValidity()) return f.reportValidity();
      f.reset();
      toast("Message sent — we'll be in touch soon.");
    });
  }

  // silence unused
  void touch;
})();
