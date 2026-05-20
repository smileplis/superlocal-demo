/* ============================================================
   SUPERLOCAL — Demo Page Animations
   GSAP + ScrollTrigger powered scroll-driven experience.
   Light theme retheme + floating badges + hero phone tilt.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────
   UTILITY
───────────────────────────────────── */

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

/* ─────────────────────────────────────
   1. NAV — slide in after hero scrolls past
───────────────────────────────────── */

(function initNav() {
  const nav = qs('#nav');
  if (!nav) return;

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'bottom top',
    onEnter: () => nav.classList.add('visible'),
    onLeaveBack: () => nav.classList.remove('visible'),
  });

  // Smooth scroll for Try Demo nav link
  qs('a[href="#demo-section"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    qs('#demo-section')?.scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ─────────────────────────────────────
   2. HERO — word reveal on load + ambient orbs + phone tilt
───────────────────────────────────── */

(function initHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Label fade in
  tl.to('.hero-label', { opacity: 1, y: 0, duration: 0.7 }, 0.3);

  // Word-by-word headline stagger
  tl.from('.hero-word', {
    opacity: 0,
    y: 50,
    stagger: 0.09,
    duration: 0.85,
    ease: 'power3.out',
  }, 0.5);

  // Sub and buttons
  tl.to('.hero-sub', { opacity: 1, y: 0, duration: 0.6 }, 1.0);
  tl.to('.hero-buttons', { opacity: 1, y: 0, duration: 0.6 }, 1.2);
  tl.to('.hero-scroll-indicator', { opacity: 1, duration: 0.6 }, 1.5);

  // Hero phone — start tilted, reveal after text
  const heroPhone = qs('#hero-phone');
  const heroPhoneWrap = qs('#hero-phone-wrap');
  if (heroPhone) {
    gsap.set(heroPhone, { rotateY: -6, rotateZ: -6, opacity: 0, y: 30 });
    tl.to(heroPhone, {
      rotateY: 0,
      rotateZ: 0,
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
    }, 0.9);
  }

  // Hero phone tilt on scroll (scrub: straightens as you scroll down)
  if (heroPhone) {
    gsap.to(heroPhone, {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
      rotateZ: 3,
      y: -20,
      ease: 'none',
    });
  }

  // Ambient orbs — slow subtle float
  gsap.to('.hero-orb--blue', {
    y: -30,
    x: 20,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.hero-orb--yellow', {
    y: 40,
    x: -20,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 2,
  });
})();

/* ─────────────────────────────────────
   3. FLOATING BADGES — independent yoyo float animations
───────────────────────────────────── */

(function initFloatingBadges() {
  const badge1 = qs('#badge-1');
  const badge2 = qs('#badge-2');
  const badge3 = qs('#badge-3');

  if (badge1) {
    gsap.set(badge1, { opacity: 0, y: 10 });
    gsap.to(badge1, { opacity: 1, y: 0, duration: 0.6, delay: 1.4, ease: 'power3.out' });
    gsap.to(badge1, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.0,
    });
  }

  if (badge2) {
    gsap.set(badge2, { opacity: 0, y: 10 });
    gsap.to(badge2, { opacity: 1, y: 0, duration: 0.6, delay: 1.65, ease: 'power3.out' });
    gsap.to(badge2, {
      y: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.2,
    });
  }

  if (badge3) {
    gsap.set(badge3, { opacity: 0, y: 10 });
    gsap.to(badge3, { opacity: 1, y: 0, duration: 0.6, delay: 1.85, ease: 'power3.out' });
    gsap.to(badge3, {
      y: -8,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.4,
    });
  }
})();

/* ─────────────────────────────────────
   4. STATS SECTION — pinned, 3 stat slides
───────────────────────────────────── */

(function initStats() {
  const outer = qs('#stats-outer');
  const pin = qs('#stats-pin');
  const slides = qsa('.stat-slide');
  if (!outer || !pin || !slides.length) return;

  // Set heights — pin for 3× viewport
  const totalScrollHeight = window.innerHeight * 3.5;
  outer.style.height = totalScrollHeight + window.innerHeight + 'px';

  // Set pin to fill viewport
  pin.style.height = window.innerHeight + 'px';

  // Initially show first slide
  slides[0].classList.add('active');

  // Counter animation
  const COUNTER_TARGET = 63000000;
  let counterAnimated = false;

  function animateCounter() {
    if (counterAnimated) return;
    counterAnimated = true;
    const el = qs('#stat-counter');
    if (!el) return;
    gsap.fromTo(
      { val: 0 },
      {
        val: COUNTER_TARGET,
        duration: 2.0,
        ease: 'power2.out',
        onUpdate: function () {
          el.textContent = Math.round(this.targets()[0].val).toLocaleString('en-IN');
        },
        onComplete: function () {
          el.textContent = '63,000,000';
        },
      }
    );
  }

  // Scrub through slides based on scroll progress
  ScrollTrigger.create({
    trigger: outer,
    start: 'top top',
    end: () => `+=${totalScrollHeight}`,
    pin: pin,
    scrub: 1.5,
    onUpdate(self) {
      const p = self.progress;

      let activeIndex = 0;
      if (p >= 0.33 && p < 0.66) activeIndex = 1;
      if (p >= 0.66) activeIndex = 2;

      slides.forEach((s, i) => {
        if (i === activeIndex) {
          s.classList.add('active');
          gsap.to(s, { opacity: 1, y: 0, duration: 0.4 });
        } else {
          const offset = i < activeIndex ? -60 : 60;
          gsap.to(s, {
            opacity: 0,
            y: offset,
            duration: 0.3,
            onComplete: () => s.classList.remove('active'),
          });
        }
      });

      if (activeIndex === 0 && p < 0.1) {
        animateCounter();
      }
    },
    onEnter() {
      animateCounter();
    },
  });
})();

/* ─────────────────────────────────────
   5. DATA-REVEAL — generic scroll reveal
───────────────────────────────────── */

(function initReveal() {
  const items = qsa('[data-reveal]');
  if (!items.length) return;

  ScrollTrigger.batch(items, {
    start: 'top 88%',
    onEnter(batch) {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
    once: true,
  });
})();

/* ─────────────────────────────────────
   6. CHAOS PANELS — stagger in
───────────────────────────────────── */

(function initChaos() {
  const panels = qsa('.chaos-panel');
  if (!panels.length) return;

  panels.forEach((panel, i) => {
    gsap.from(panel, {
      scrollTrigger: {
        trigger: panel,
        start: 'top 86%',
        once: true,
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });
})();

/* ─────────────────────────────────────
   7. ENTER SUPERLOCAL — wordmark reveal + module grid stagger
───────────────────────────────────── */

(function initEnter() {
  const wordmark = qs('#enter-wordmark');
  if (!wordmark) return;

  gsap.to(wordmark, {
    scrollTrigger: {
      trigger: '#enter-section',
      start: 'top 70%',
      once: true,
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
  });

  // Module cards stagger
  const cards = qsa('.module-card');
  if (cards.length) {
    gsap.set(cards, { opacity: 0, y: 24 });

    gsap.to(cards, {
      scrollTrigger: {
        trigger: '#modules-grid',
        start: 'top 82%',
        once: true,
      },
      opacity: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.55,
      ease: 'power3.out',
    });
  }
})();

/* ─────────────────────────────────────
   8. PROVIDER FEATURES — slide in alternate sides
───────────────────────────────────── */

(function initProviderFeatures() {
  const features = qsa('.provider-feature');
  if (!features.length) return;

  features.forEach((feature, i) => {
    const fromX = i % 2 === 0 ? -35 : 35;
    gsap.from(feature, {
      scrollTrigger: {
        trigger: feature,
        start: 'top 82%',
        once: true,
      },
      opacity: 0,
      x: fromX,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
    });
  });
})();

/* ─────────────────────────────────────
   9. CONSUMER STEPS — stagger left to right
───────────────────────────────────── */

(function initConsumerSteps() {
  const steps = qsa('.consumer-step');
  const arrows = qsa('.step-arrow');

  if (!steps.length) return;

  const allItems = [];
  steps.forEach((step, i) => {
    allItems.push(step);
    if (arrows[i]) allItems.push(arrows[i]);
  });

  gsap.to(allItems, {
    scrollTrigger: {
      trigger: '.consumer-steps',
      start: 'top 82%',
      once: true,
    },
    opacity: 1,
    y: 0,
    x: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   10. INDIA PILLARS — stagger
───────────────────────────────────── */

(function initIndiaPillars() {
  const pillars = qsa('.india-pillar');
  if (!pillars.length) return;

  gsap.to(pillars, {
    scrollTrigger: {
      trigger: '.india-pillars',
      start: 'top 84%',
      once: true,
    },
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   11. DEMO CARDS — stagger reveal
───────────────────────────────────── */

(function initDemoCards() {
  const cards = qsa('.demo-card');
  if (!cards.length) return;

  gsap.to(cards, {
    scrollTrigger: {
      trigger: '.demo-grid',
      start: 'top 84%',
      once: true,
    },
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   12. CTA FOOTER — orb pulse animation
───────────────────────────────────── */

(function initCTAFooter() {
  gsap.to('.cta-orb--1', {
    scale: 1.2,
    x: 40,
    y: -20,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.cta-orb--2', {
    scale: 1.3,
    x: -30,
    y: 30,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 3,
  });
})();

/* ─────────────────────────────────────
   13. SHOPLINK URL — typing effect on enter viewport
───────────────────────────────────── */

(function initShopLink() {
  const slugEl = qs('.shoplink-url-slug');
  if (!slugEl) return;

  const finalText = 'your-shop';
  slugEl.textContent = '';

  ScrollTrigger.create({
    trigger: '.shoplink-url-display',
    start: 'top 86%',
    once: true,
    onEnter() {
      let i = 0;
      const interval = setInterval(() => {
        slugEl.textContent = finalText.slice(0, i + 1);
        i++;
        if (i >= finalText.length) clearInterval(interval);
      }, 80);
    },
  });
})();

/* ─────────────────────────────────────
   14. CHAOS HEADER — reveal
───────────────────────────────────── */

(function initChaosHeader() {
  const header = qs('.chaos-header');
  if (!header) return;

  gsap.from(header, {
    scrollTrigger: {
      trigger: header,
      start: 'top 82%',
      once: true,
    },
    opacity: 0,
    y: 50,
    duration: 1.0,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   15. SCROLL PROGRESS INDICATOR — 3px brand line at top
───────────────────────────────────── */

(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #1d4ed8, #3b82f6, #eab308);
    z-index: 200;
    pointer-events: none;
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(bar);

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) {
      bar.style.width = (self.progress * 100) + '%';
    },
  });
})();

/* ─────────────────────────────────────
   16. PHONE PARALLAX — subtle vertical shift on scroll
───────────────────────────────────── */

(function initPhoneParallax() {
  // Provider section phones
  const pfPhones = qsa('.pf-phone');
  pfPhones.forEach((phone) => {
    gsap.to(phone, {
      scrollTrigger: {
        trigger: phone,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -18,
      ease: 'none',
    });
  });

  // Consumer phone
  const consumerPhone = qs('.consumer-phone');
  if (consumerPhone) {
    gsap.to(consumerPhone, {
      scrollTrigger: {
        trigger: consumerPhone,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -12,
      ease: 'none',
    });
  }
})();

/* ─────────────────────────────────────
   17. REFRESH ScrollTrigger on resize (debounced)
───────────────────────────────────── */

(function initResizeHandler() {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
})();

/* ─────────────────────────────────────
   CLEANUP — kill all on page unload
───────────────────────────────────── */

window.addEventListener('beforeunload', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});
