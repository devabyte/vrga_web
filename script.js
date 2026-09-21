(() => {
  'use strict';

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('is-open', open);
    };
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Close after choosing a link
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });

    // Close with Escape and return focus to the button
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset if the window is resized up to desktop width
    window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------- Reveal game tiles as they scroll into view ---------- */
  const tiles = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // animate once, then leave it alone
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    tiles.forEach((tile) => {
      // small stagger between neighbours in the same row
      const index = Array.prototype.indexOf.call(tile.parentElement.parentElement.children, tile.parentElement);
      tile.style.setProperty('--d', `${(index % 4) * 0.08}s`);
      observer.observe(tile);
    });
  } else {
    tiles.forEach((tile) => tile.classList.add('is-visible'));
  }

  /* ---------- "Open now" indicator (Indian Standard Time, open 10:00 to 23:00) ---------- */
  const statusText = document.getElementById('open-status');

  if (statusText) {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23',
      }).formatToParts(new Date());

      const hour = Number(parts.find((p) => p.type === 'hour').value);
      const minute = Number(parts.find((p) => p.type === 'minute').value);
      const minutes = hour * 60 + minute;
      const isOpen = minutes >= 10 * 60 && minutes < 23 * 60;

      statusText.textContent = isOpen ? 'Open now, until 11 PM' : 'Closed now, opens at 10 AM';
      statusText.parentElement.dataset.state = isOpen ? 'open' : 'closed';
    } catch (err) {
      /* keep the default "Open daily" text */
    }
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
