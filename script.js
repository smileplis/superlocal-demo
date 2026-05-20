/* ============================================================
   SUPERLOCAL — Demo Page Animations
   GSAP + ScrollTrigger.

   CRITICAL RULE: NO element has opacity:0 in CSS.
   All reveals use gsap.from() so content is always visible
   if JS fails, is blocked, or GSAP CDN is unavailable.
   Pinned timeline panels use gsap.set() in JS only.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────
   UTILITY
───────────────────────────────────── */
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; }

/* ─────────────────────────────────────
   1. SCROLL PROGRESS BAR — 3px brand-blue line at top
───────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = [
    'position:fixed', 'top:0', 'left:0', 'height:3px', 'width:0%',
    'background:linear-gradient(90deg,#1d4ed8,#3b82f6,#eab308)',
    'z-index:9999', 'pointer-events:none', 'border-radius:0 2px 2px 0',
  ].join(';');
  document.body.appendChild(bar);

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate(self) { bar.style.width = (self.progress * 100) + '%'; },
  });
})();

/* ─────────────────────────────────────
   2. NAV — slide down after hero passes
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

  // Smooth scroll for demo link in nav + hero button
  qsa('.js-scroll-demo, a[href="#demo-section"]').forEach(el => {
    el.addEventListener('click', e => {
      const target = qs('#demo-section');
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();

/* ─────────────────────────────────────
   3. HERO — word-by-word stagger reveal on page load
   Uses gsap.from() — words are visible in CSS.
───────────────────────────────────── */
(function initHero() {
  // Delay slightly for paint
  setTimeout(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Label
    tl.from('.hero-label', { opacity: 0, y: 20, duration: 0.6 }, 0.2);

    // Words stagger
    tl.from('.hero-word', {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
    }, 0.4);

    // Sub and buttons
    tl.from('.hero-sub', { opacity: 0, y: 24, duration: 0.6 }, 1.0);
    tl.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6 }, 1.2);

    // Hero phone
    tl.from('#hero-phone', {
      opacity: 0,
      rotateZ: -8,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
    }, 0.6);
  }, 200);

  // Ambient orb float
  gsap.to('.hero-glow', {
    y: -20, x: 15, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut',
  });
})();

/* ─────────────────────────────────────
   4. FLOATING BADGES — appear after phone, then yoyo float
   gsap.from() for appearance, then separate yoyo.
───────────────────────────────────── */
(function initFloatingBadges() {
  const defs = [
    { id: '#badge-1', delay: 1.2, floatY: -10, floatDur: 3.2 },
    { id: '#badge-2', delay: 1.4, floatY: 12,  floatDur: 4.1 },
    { id: '#badge-3', delay: 1.6, floatY: -8,  floatDur: 3.7 },
  ];

  defs.forEach(({ id, delay, floatY, floatDur }) => {
    const el = qs(id);
    if (!el) return;

    // Appear
    gsap.from(el, { opacity: 0, y: 14, duration: 0.6, delay, ease: 'power3.out' });

    // Yoyo float after appear
    gsap.to(el, {
      y: floatY,
      duration: floatDur,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay + 0.7,
    });
  });
})();

/* ─────────────────────────────────────
   5. TWO SIDES SECTION — left slides from left, right from right, connector fades last
───────────────────────────────────── */
(function initTwoSides() {
  const provCol = qs('#provider-col');
  const consCol = qs('#consumer-col');
  const connCol = qs('#connector-col');
  if (!provCol) return;

  gsap.from(provCol, {
    scrollTrigger: { trigger: '#two-sides', start: 'top 88%', once: true },
    opacity: 0, x: -60, duration: 0.9, ease: 'power3.out',
  });
  gsap.from(consCol, {
    scrollTrigger: { trigger: '#two-sides', start: 'top 88%', once: true },
    opacity: 0, x: 60, duration: 0.9, ease: 'power3.out',
  });
  gsap.from(connCol, {
    scrollTrigger: { trigger: '#two-sides', start: 'top 88%', once: true },
    opacity: 0, y: 20, duration: 0.7, delay: 0.4, ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   6. CHAOS SECTION — pinned, panels scrub in one by one
   gsap.set() used in JS right before the timeline (NOT in CSS).
───────────────────────────────────── */
(function initChaos() {
  const outer = qs('#chaos-outer');
  const pin = qs('#chaos-pin');
  const panelA = qs('#chaos-panel-a');
  const panelB = qs('#chaos-panel-b');
  const panelC = qs('#chaos-panel-c');
  const better = qs('#chaos-better');
  if (!outer || !pin) return;

  const scrollHeight = window.innerHeight * 2.5;
  outer.style.height = (scrollHeight + window.innerHeight) + 'px';
  pin.style.height = window.innerHeight + 'px';
  pin.style.position = 'relative';

  // JS set panels invisible before timeline — NOT in CSS
  gsap.set([panelB, panelC], { opacity: 0, y: 30, pointerEvents: 'none' });
  gsap.set(better, { opacity: 0, y: 30 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: outer,
      start: 'top top',
      end: () => `+=${scrollHeight}`,
      pin: pin,
      scrub: 1.5,
      anticipatePin: 1,
    },
  });

  // Panel A is already visible (default)
  // Panel B scrubs in, A fades out
  tl.to(panelA, { opacity: 0, y: -30, duration: 1 }, 0)
    .to(panelB, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, 0.5)
    // Panel C scrubs in, B fades out
    .to(panelB, { opacity: 0, y: -30, duration: 1 }, 2)
    .to(panelC, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, 2.5)
    // After Panel C, "better" text
    .to(panelC, { opacity: 0, y: -30, duration: 0.8 }, 4)
    .to(better, { opacity: 1, y: 0, duration: 1 }, 4.5);
})();

/* ─────────────────────────────────────
   7. ENTER SUPERLOCAL — wordmark scale+fade reveal + module grid stagger
───────────────────────────────────── */
(function initEnterSection() {
  const wordmark = qs('#enter-wordmark');
  if (!wordmark) return;

  gsap.from(wordmark, {
    scrollTrigger: { trigger: '#enter-section', start: 'top 70%', once: true },
    scale: 0.85,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
  });

  gsap.from('.enter-tagline', {
    scrollTrigger: { trigger: '#enter-section', start: 'top 65%', once: true },
    opacity: 0, y: 24, duration: 0.8, delay: 0.3, ease: 'power3.out',
  });

  // Module cards stagger
  gsap.from('.module-card', {
    scrollTrigger: { trigger: '#modules-grid', start: 'top 82%', once: true },
    opacity: 0, y: 24,
    stagger: 0.06,
    duration: 0.55,
    ease: 'power3.out',
  });

  gsap.from('.modules-note', {
    scrollTrigger: { trigger: '#modules-grid', start: 'bottom 88%', once: true },
    opacity: 0, y: 16, duration: 0.6, ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   8. PROVIDER STEPS — text slides from left, phone from right
───────────────────────────────────── */
(function initProviderSteps() {
  const steps = [
    { id: '#pstep-1', textX: -40, phoneX: 40 },
    { id: '#pstep-2', textX: 40,  phoneX: -40 },
    { id: '#pstep-3', textX: -40, phoneX: 40 },
  ];

  steps.forEach(({ id, textX, phoneX }) => {
    const step = qs(id);
    if (!step) return;
    const text = qs('.pstep-text', step);
    const phone = qs('.pstep-phone', step);

    if (text) {
      gsap.from(text, {
        scrollTrigger: { trigger: step, start: 'top 88%', once: true },
        opacity: 0, x: textX, duration: 0.9, ease: 'power3.out',
      });
    }
    if (phone) {
      gsap.from(phone, {
        scrollTrigger: { trigger: step, start: 'top 88%', once: true },
        opacity: 0, x: phoneX, duration: 0.9, delay: 0.1, ease: 'power3.out',
      });
    }
  });
})();

/* ─────────────────────────────────────
   9. DATA-REVEAL — generic scroll reveals for [data-reveal] elements
   Uses gsap.from() so elements always visible without JS.
───────────────────────────────────── */
(function initReveal() {
  const items = qsa('[data-reveal]');
  if (!items.length) return;

  ScrollTrigger.batch(items, {
    start: 'top 88%',
    onEnter(batch) {
      gsap.from(batch, {
        opacity: 0,
        y: 36,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });
    },
    once: true,
  });
})();

/* ─────────────────────────────────────
   10. CONSUMER STEPS — staggered reveal
───────────────────────────────────── */
(function initConsumerSteps() {
  const items = qsa('.consumer-step-card, .cstep-arrow');
  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: { trigger: '.consumer-steps', start: 'top 88%', once: true },
    opacity: 0, y: 36,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   11. SHOP URL TYPING — letter-by-letter "ramas-tiffin" on enter viewport
───────────────────────────────────── */
(function initShopUrlTyping() {
  const slugEl = qs('#shoplink-slug');
  if (!slugEl) return;

  const finalText = 'ramas-tiffin';
  // Keep the text visible by default (no clearing) — type over it on enter
  ScrollTrigger.create({
    trigger: '.shoplink-url-display',
    start: 'top 88%',
    once: true,
    onEnter() {
      slugEl.textContent = '';
      let i = 0;
      const interval = setInterval(() => {
        slugEl.textContent = finalText.slice(0, i + 1);
        i++;
        if (i >= finalText.length) clearInterval(interval);
      }, 90);
    },
  });
})();

/* ─────────────────────────────────────
   12. INDIA PILLARS — stagger reveal
───────────────────────────────────── */
(function initIndiaPillars() {
  const pillars = qsa('.india-pillar');
  if (!pillars.length) return;

  gsap.from(pillars, {
    scrollTrigger: { trigger: '.india-pillars', start: 'top 88%', once: true },
    opacity: 0, y: 40,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   13. STRATEGY TIMELINE — items stagger, line draws
───────────────────────────────────── */
(function initStrategy() {
  const fill = qs('#strategy-line-fill');
  const items = qsa('.strategy-item');
  if (!items.length) return;

  // Line drawing effect
  if (fill) {
    ScrollTrigger.create({
      trigger: '.strategy-timeline',
      start: 'top 88%',
      end: 'bottom 60%',
      scrub: 1,
      onUpdate(self) {
        fill.style.height = (self.progress * 100) + '%';
      },
    });
  }

  // Items stagger from left
  gsap.from(items, {
    scrollTrigger: { trigger: '.strategy-timeline', start: 'top 88%', once: true },
    opacity: 0, x: -30,
    stagger: 0.18,
    duration: 0.7,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   14. DEMO CARDS — stagger from below
───────────────────────────────────── */
(function initDemoCards() {
  const cards = qsa('.demo-card');
  if (!cards.length) return;

  gsap.from(cards, {
    scrollTrigger: { trigger: '.demo-grid', start: 'top 88%', once: true },
    opacity: 0, y: 36,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power3.out',
  });
})();

/* ─────────────────────────────────────
   15. CTA FOOTER — orb pulse
───────────────────────────────────── */
(function initCTAOrbs() {
  gsap.to('.cta-orb--1', {
    scale: 1.2, x: 40, y: -20,
    duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
  });
  gsap.to('.cta-orb--2', {
    scale: 1.3, x: -30, y: 30,
    duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3,
  });
})();

/* ─────────────────────────────────────
   RESIZE HANDLER
───────────────────────────────────── */
(function initResize() {
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => ScrollTrigger.refresh(), 250);
  });
})();

/* ─────────────────────────────────────
   CLEANUP
───────────────────────────────────── */
window.addEventListener('beforeunload', () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
});
