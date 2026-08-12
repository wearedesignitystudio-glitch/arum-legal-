(() => {
  const PRODUCTS = [
    {
      id: "emerald-heart",
      name: "Emerald Heart",
      description: "Tan leather with a faceted green heart gem and gold bead border.",
      price: 85,
      image: "assets/images/moccasin-emerald-heart.jpg",
    },
    {
      id: "bear-medicine",
      name: "Bear Medicine",
      description: "Soft brown leather with a white bear emblem on blue and red beadwork.",
      price: 85,
      image: "assets/images/moccasin-bear-medicine.jpg",
    },
    {
      id: "turquoise-bloom",
      name: "Turquoise Bloom",
      description: "Caramel leather with turquoise floral beadwork and copper accents.",
      price: 85,
      image: "assets/images/moccasin-turquoise-bloom.jpg",
    },
    {
      id: "coral-path",
      name: "Coral Path",
      description: "Chestnut leather with coral-red geometric beadwork and amber beads.",
      price: 85,
      image: "assets/images/moccasin-coral-path.jpg",
    },
    {
      id: "night-star",
      name: "Night Star",
      description: "Honey-tan leather with midnight blue and silver star beadwork.",
      price: 85,
      image: "assets/images/moccasin-night-star.jpg",
    },
    {
      id: "sage-leaf",
      name: "Sage Leaf",
      description: "Sand leather with sage leaf embroidery and gold bead details.",
      price: 85,
      image: "assets/images/moccasin-sage-leaf.jpg",
    },
  ];

  const STORAGE_KEY = "mfm-cart-v1";

  const els = {
    header: document.getElementById("siteHeader"),
    menuToggle: document.getElementById("menuToggle"),
    nav: document.getElementById("primaryNav"),
    productGrid: document.getElementById("productGrid"),
    cartToggle: document.getElementById("cartToggle"),
    cartClose: document.getElementById("cartClose"),
    cartDrawer: document.getElementById("cartDrawer"),
    cartBackdrop: document.getElementById("cartBackdrop"),
    cartBody: document.getElementById("cartBody"),
    cartFooter: document.getElementById("cartFooter"),
    cartCount: document.getElementById("cartCount"),
    cartTotal: document.getElementById("cartTotal"),
    checkoutBtn: document.getElementById("checkoutBtn"),
    checkoutModal: document.getElementById("checkoutModal"),
    checkoutForm: document.getElementById("checkoutForm"),
    checkoutSummary: document.getElementById("checkoutSummary"),
    donateForm: document.getElementById("donateForm"),
    customAmount: document.getElementById("customAmount"),
    toast: document.getElementById("toast"),
    year: document.getElementById("year"),
  };

  let cart = loadCart();
  let selectedDonation = 50;
  let toastTimer;

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function money(amount) {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  }

  function cartQty() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function cartSubtotal() {
    return cart.reduce((sum, item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  }

  function showToast(message) {
    els.toast.hidden = false;
    els.toast.textContent = message;
    requestAnimationFrame(() => els.toast.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("is-visible");
      setTimeout(() => {
        els.toast.hidden = true;
      }, 350);
    }, 2600);
  }

  function renderProducts() {
    els.productGrid.innerHTML = PRODUCTS.map(
      (product) => `
      <article class="product reveal" data-product-id="${product.id}">
        <div class="product-media">
          <img src="${product.image}" alt="${product.name} ornamental moccasins" loading="lazy" width="640" height="640">
        </div>
        <div class="product-meta">
          <div class="product-top">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${money(product.price)}</p>
          </div>
          <p class="product-desc">${product.description}</p>
          <button type="button" class="btn-add" data-add="${product.id}">Add to cart</button>
        </div>
      </article>
    `
    ).join("");
  }

  function renderCart() {
    const count = cartQty();
    els.cartCount.hidden = count === 0;
    els.cartCount.textContent = String(count);

    if (!cart.length) {
      els.cartBody.innerHTML = `<p class="cart-empty">Your cart is empty. Choose a pair to begin.</p>`;
      els.cartFooter.hidden = true;
      return;
    }

    els.cartFooter.hidden = false;
    els.cartTotal.textContent = money(cartSubtotal());

    els.cartBody.innerHTML = cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.id);
        if (!product) return "";
        return `
        <div class="cart-item" data-id="${product.id}">
          <img src="${product.image}" alt="">
          <div>
            <h3>${product.name}</h3>
            <p>${money(product.price)} each</p>
            <div class="qty-controls">
              <button type="button" data-qty-dec="${product.id}" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-inc="${product.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button type="button" class="cart-item-remove" data-remove="${product.id}">Remove</button>
        </div>
      `;
      })
      .join("");
  }

  function addToCart(id) {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, qty: 1 });
    }
    saveCart();
    renderCart();
    const product = PRODUCTS.find((p) => p.id === id);
    showToast(`${product ? product.name : "Item"} added to cart`);
  }

  function updateQty(id, delta) {
    const item = cart.find((entry) => entry.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((entry) => entry.id !== id);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((entry) => entry.id !== id);
    saveCart();
    renderCart();
  }

  function openCart() {
    els.cartDrawer.classList.add("is-open");
    els.cartDrawer.setAttribute("aria-hidden", "false");
    els.cartToggle.setAttribute("aria-expanded", "true");
    els.cartBackdrop.hidden = false;
    requestAnimationFrame(() => els.cartBackdrop.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }

  function closeCart({ keepScrollLock = false } = {}) {
    els.cartDrawer.classList.remove("is-open");
    els.cartDrawer.setAttribute("aria-hidden", "true");
    els.cartToggle.setAttribute("aria-expanded", "false");
    els.cartBackdrop.classList.remove("is-open");
    setTimeout(() => {
      els.cartBackdrop.hidden = true;
    }, 300);
    if (!keepScrollLock) {
      document.body.style.overflow = "";
    }
  }

  function openCheckout() {
    if (!cart.length) return;
    els.checkoutSummary.textContent = `Order total: ${money(cartSubtotal())} · ${cartQty()} item${cartQty() === 1 ? "" : "s"}`;
    els.checkoutModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCheckout() {
    els.checkoutModal.hidden = true;
    if (!els.cartDrawer.classList.contains("is-open")) {
      document.body.style.overflow = "";
    }
  }

  function setDonationAmount(amount, fromCustom = false) {
    selectedDonation = amount;
    document.querySelectorAll(".amount-btn").forEach((btn) => {
      const value = Number(btn.dataset.amount);
      btn.classList.toggle("is-selected", !fromCustom && value === amount);
    });
  }

  function initHeader() {
    const onScroll = () => {
      els.header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    els.menuToggle.addEventListener("click", () => {
      const open = els.nav.classList.toggle("is-open");
      els.menuToggle.setAttribute("aria-expanded", String(open));
    });

    els.nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        els.nav.classList.remove("is-open");
        els.menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
  }

  function initEvents() {
    els.productGrid.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-add]");
      if (!btn) return;
      addToCart(btn.dataset.add);
    });

    els.cartToggle.addEventListener("click", openCart);
    els.cartClose.addEventListener("click", closeCart);
    els.cartBackdrop.addEventListener("click", closeCart);

    els.cartBody.addEventListener("click", (event) => {
      const inc = event.target.closest("[data-qty-inc]");
      const dec = event.target.closest("[data-qty-dec]");
      const remove = event.target.closest("[data-remove]");
      if (inc) updateQty(inc.dataset.qtyInc, 1);
      if (dec) updateQty(dec.dataset.qtyDec, -1);
      if (remove) removeFromCart(remove.dataset.remove);
    });

    els.checkoutBtn.addEventListener("click", () => {
      closeCart({ keepScrollLock: true });
      openCheckout();
    });

    els.checkoutModal.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-modal]")) {
        closeCheckout();
      }
    });

    els.checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!els.checkoutForm.reportValidity()) return;
      const total = money(cartSubtotal());
      cart = [];
      saveCart();
      renderCart();
      els.checkoutForm.reset();
      closeCheckout();
      showToast(`Thank you. Your order (${total}) supports permanent headstones.`);
    });

    document.querySelectorAll(".amount-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        els.customAmount.value = "";
        setDonationAmount(Number(btn.dataset.amount));
      });
    });

    els.customAmount.addEventListener("input", () => {
      const value = Number(els.customAmount.value);
      if (value > 0) {
        setDonationAmount(value, true);
      }
    });

    els.donateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!els.donateForm.reportValidity()) return;
      const custom = Number(els.customAmount.value);
      const amount = custom > 0 ? custom : selectedDonation;
      if (!amount || amount < 1) {
        showToast("Please choose a donation amount.");
        return;
      }
      const name = document.getElementById("donorName").value.trim();
      els.donateForm.reset();
      setDonationAmount(50);
      showToast(`Thank you, ${name}. Your ${money(amount)} donation will help place a marker.`);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!els.checkoutModal.hidden) closeCheckout();
      else if (els.cartDrawer.classList.contains("is-open")) closeCart();
    });
  }

  function init() {
    if (els.year) els.year.textContent = String(new Date().getFullYear());
    renderProducts();
    renderCart();
    initHeader();
    initEvents();
    // Observe product cards after render
    requestAnimationFrame(initReveal);
  }

  init();
})();
