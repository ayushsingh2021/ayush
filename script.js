/* Advanced interactions:
   - Theme toggle (persists in localStorage)
   - Typed hero text
   - Mobile nav toggle
   - Smooth scroll
   - IntersectionObserver reveal animations
   - Formspree lightweight client feedback
*/

(() => {
  const $ = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // Theme toggle with persistence
  const themeToggle = $('#themeToggle');
  const body = document.body;
  const stored = localStorage.getItem('site-theme');
  if (stored) body.className = stored;
  themeToggle && themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('theme-light');
    body.classList.toggle('theme-light', !isLight);
    body.classList.toggle('theme-dark', isLight);
    const newTheme = body.className || 'theme-dark';
    localStorage.setItem('site-theme', newTheme);
    themeToggle.setAttribute('aria-pressed', String(!isLight));
  });

  // Mobile nav toggle
  const menuBtn = $('#menuBtn');
  const nav = document.querySelector('.nav');
  menuBtn && menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav && nav.classList.toggle('open');
  });

  // Close mobile nav on link click
  $$('.nav a').forEach(a => a.addEventListener('click', () => {
    if (nav && nav.classList.contains('open')) nav.classList.remove('open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }));

  // Smooth scroll
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });

  // Typed text (lightweight)
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    const phrases = [
      'Full Stack Developer — PHP • Django • MySQL • JavaScript',
      'Web Security Enthusiast • Bug Hunter',
      'I build secure, production-ready web apps'
    ];
    let pi = 0, ci = 0, forward = true;
    const speed = 36;
    function tick() {
      const txt = phrases[pi];
      typedEl.textContent = txt.slice(0, ci);
      if (forward) {
        if (ci < txt.length) ci++;
        else { forward = false; setTimeout(tick, 900); return; }
      } else {
        if (ci > 0) ci--;
        else { forward = true; pi = (pi + 1) % phrases.length; }
      }
      setTimeout(tick, speed);
    }
    tick();
  }

  // IntersectionObserver reveal
  const reveals = $$('[data-reveal]');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          observer.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));
  }

  // Form feedback (Formspree)
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const msg = $('#formMsg');
      if (msg) msg.textContent = 'Sending...';
      // Let Formspree handle submission. Show success after a delay.
      setTimeout(() => {
        if (msg) msg.textContent = 'Message sent. I will reply soon — or email me directly.';
        form.reset();
      }, 900);
    });
  }

  // Year
  const year = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = year;

  // Accessibility: keyboard focus styling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.documentElement.classList.add('kbd-nav');
  });
})();
