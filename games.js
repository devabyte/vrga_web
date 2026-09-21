/* Builds the game tiles on the home page and the paginated Games page
   from games-data.js. You should not need to edit this file. */
(() => {
  'use strict';

  const featuredList = document.getElementById('featured-games');
  const libraryList = document.getElementById('game-list');
  if (!featuredList && !libraryList) return;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  /* ---------- If the data file is broken, say so (and tell the owner in the console) ---------- */
  if (typeof GAME_CATALOG === 'undefined') {
    console.error('games-data.js did not load. Check that the file exists and that every line in it has its quotes and commas.');
    [featuredList, libraryList].filter(Boolean).forEach((list) => {
      list.replaceWith(el('p', 'noscript-note', "Sorry, the game list couldn't load right now. Please call us to ask what's on the shelf."));
    });
    return;
  }

  const { gamesPerPage, imageFolder, moreTile, games } = GAME_CATALOG;

  /* ---------- One game tile ---------- */
  const makeTile = (game, { headingTag = 'h3', reveal = false, more = false } = {}) => {
    const item = el('li', more ? 'tile-item--more' : null);
    const tile = el('article', 'tile' + (more ? ' tile--more' : '') + (reveal ? ' reveal' : ''));

    const img = el('img');
    img.src = imageFolder + encodeURIComponent(game.image);
    img.alt = ''; // the game's name is written right on the tile
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => console.warn('Game image not found: ' + img.src));

    tile.append(img, el(headingTag, 'tile-title', game.name));
    item.append(tile);
    return item;
  };

  /* ---------- Home page: featured games ---------- */
  if (featuredList) {
    let featured = games.filter((game) => game.featured);
    if (featured.length === 0) featured = games.slice(0, 6); // nothing marked: show the first six
    featuredList.replaceChildren(...featured.map((game) => makeTile(game, { headingTag: 'h3', reveal: true })));
  }

  /* ---------- Games page: pages of ten ---------- */
  if (libraryList) {
    const pager = document.getElementById('pager');
    const status = document.getElementById('pager-status');
    const totalPages = Math.max(1, Math.ceil(games.length / gamesPerPage));

    const pageFromUrl = () => {
      const n = parseInt(new URLSearchParams(window.location.search).get('page'), 10);
      return Number.isFinite(n) ? Math.min(Math.max(n, 1), totalPages) : 1;
    };

    // 1 2 3 ... shows the first, last, current and neighbouring pages
    const pageNumbers = (current) => {
      const wanted = [...new Set([1, totalPages, current - 1, current, current + 1])]
        .filter((n) => n >= 1 && n <= totalPages)
        .sort((a, b) => a - b);
      const out = [];
      wanted.forEach((n, i) => {
        if (i > 0 && n - wanted[i - 1] > 1) out.push('gap');
        out.push(n);
      });
      return out;
    };

    const pageLink = (n, text, className, label) => {
      const a = el('a', className, text);
      a.href = '?page=' + n;
      a.dataset.page = String(n);
      if (label) a.setAttribute('aria-label', label);
      return a;
    };

    const disabledLink = (text, className) => {
      const span = el('span', className + ' is-disabled', text);
      span.setAttribute('aria-disabled', 'true');
      return span;
    };

    const renderPager = (page) => {
      if (!pager) return;
      if (totalPages <= 1) { pager.replaceChildren(); return; }

      const numbers = el('ol', 'pager-pages');
      pageNumbers(page).forEach((n) => {
        const li = el('li');
        if (n === 'gap') {
          li.className = 'pager-gap';
          li.textContent = '\u2026';
          li.setAttribute('aria-hidden', 'true');
        } else {
          const a = pageLink(n, String(n), 'pager-num', 'Page ' + n);
          if (n === page) a.setAttribute('aria-current', 'page');
          li.append(a);
        }
        numbers.append(li);
      });

      pager.replaceChildren(
        page > 1 ? pageLink(page - 1, 'Previous', 'pager-link', 'Previous page') : disabledLink('Previous', 'pager-link'),
        numbers,
        page < totalPages ? pageLink(page + 1, 'Next', 'pager-link', 'Next page') : disabledLink('Next', 'pager-link')
      );
    };

    const render = (page) => {
      const start = (page - 1) * gamesPerPage;
      const slice = games.slice(start, start + gamesPerPage);

      const tiles = slice.map((game) => makeTile(game, { headingTag: 'h2' }));
      if (moreTile && page === totalPages) {
        tiles.push(makeTile(moreTile, { headingTag: 'h2', more: true }));
      }

      libraryList.replaceChildren(...tiles);
      libraryList.setAttribute('aria-label', `Games, page ${page} of ${totalPages}`);
      renderPager(page);

      if (status) {
        status.textContent = slice.length
          ? `Showing games ${start + 1} to ${start + slice.length} of ${games.length}`
          : 'No games to show yet.';
      }
    };

    const goTo = (page) => {
      render(page);
      try {
        window.history.pushState({ page }, '', '?page=' + page);
      } catch (err) {
        /* some browsers block this for files opened straight from a folder; the page still works */
      }
      libraryList.focus({ preventScroll: true });
      libraryList.scrollIntoView({ block: 'start' });
    };

    if (pager) {
      pager.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-page]');
        if (!link) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let "open in new tab" work
        e.preventDefault();
        goTo(Number(link.dataset.page));
      });
    }

    // Browser back and forward buttons move between pages
    window.addEventListener('popstate', () => render(pageFromUrl()));

    render(pageFromUrl());
  }
})();
