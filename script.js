/* ═══════════════════════════════════════════════
   TARUN PANDEY — PORTFOLIO | script.js
   Handles: link config (validated) · contact assembly · nav state ·
            mobile menu · active section · scroll reveal · footer year
   No innerHTML, no eval, no network requests.
═══════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────────
   1. LINKS — fill these in; empty ones stay hidden.
   Only https:// URLs or a relative .pdf file are accepted,
   so a typo can never create a javascript: or data: link.
───────────────────────────────────────── */
const LINKS = {
  envelope: '',   // ScienceDirect article for the building-envelope project, e.g. 'https://www.sciencedirect.com/science/article/pii/…'
  linkedin: '',   // e.g. 'https://www.linkedin.com/in/your-handle'
  github:   '',   // e.g. 'https://github.com/your-handle'
  xing:     ''    // e.g. 'https://www.xing.com/profile/your-handle'
};

function safeUrl(value) {
  const v = String(value || '').trim();
  if (/^https:\/\/[^\s"'<>]+$/i.test(v)) return v;
  if (/^[\w\-./]+\.pdf$/i.test(v) && !v.includes('..') && !v.startsWith('/')) return v;
  return '';
}

document.querySelectorAll('[data-link]').forEach(el => {
  const url = safeUrl(LINKS[el.dataset.link]);
  if (!url) return;                                   // stays hidden
  el.href = url;
  el.hidden = false;
  if (/^https:/i.test(url)) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
});

/* ─────────────────────────────────────────
   2. CONTACT — assembled at runtime (anti-harvesting)
   The Impressum page always shows the details in plain text,
   as German law requires.
───────────────────────────────────────── */
(function initContact() {
  const email = 'tarunpandey068' + '@' + 'gmail' + '.com';

  document.querySelectorAll('[data-contact]').forEach(el => {
    switch (el.dataset.contact) {
      case 'email':
        el.href = 'mailto:' + email; el.textContent = 'Email me'; break;
      case 'email-text':
        el.href = 'mailto:' + email; el.textContent = email; break;
    }
  });
})();

/* ─────────────────────────────────────────
   3. NAV — mobile menu + active section
───────────────────────────────────────── */
(function initNav() {
  const burger   = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  if (!burger || !navLinks) return;

  const mq = window.matchMedia('(max-width: 900px)');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navLinks.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  }

  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      burger.focus();
    }
  });
  mq.addEventListener('change', () => setMenu(false));

  const links = Array.from(document.querySelectorAll('.nav__link'));
  const sections = links.map(l => document.getElementById(l.dataset.section)).filter(Boolean);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => {
          const on = l.dataset.section === entry.target.id;
          l.classList.toggle('active', on);
          if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
  }
})();

/* ─────────────────────────────────────────
   4. SCROLL REVEAL — content stays visible if JS fails
───────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  els.forEach(el => {
    const sibs = el.parentElement.querySelectorAll(':scope > .reveal');
    const i = Array.prototype.indexOf.call(sibs, el);
    el.style.setProperty('--d', Math.min(i, 4) * 0.06 + 's');
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  els.forEach(el => io.observe(el));
})();

/* ─────────────────────────────────────────
   5. FOOTER YEAR
───────────────────────────────────────── */
(function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
