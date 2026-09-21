/* Builds the Menu page and the "Food & drinks" preview on the home page
   from menu-data.js. You should not need to edit this file. */
(() => {
  'use strict';

  const root = document.getElementById('menu-root');       // Menu page
  const jump = document.getElementById('menu-jump');       // category links on the Menu page
  const preview = document.getElementById('menu-preview'); // home page preview
  if (!root && !preview) return;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  /* ---------- If the data file is broken, say so (and tell the owner in the console) ---------- */
  if (typeof MENU === 'undefined') {
    console.error('menu-data.js did not load. Check that the file exists and that every line in it has its quotes and commas.');
    [root, preview].filter(Boolean).forEach((target) => {
      target.replaceChildren(el('p', 'noscript-note', "Sorry, the menu couldn't load right now. Please call us to ask about items and prices."));
    });
    return;
  }

  const rupees = (amount) => '\u20B9' + amount;

  // rows look like { name: 'Maggi', price: 60 }; a price can also be ready-made text like 'from ₹120'
  const priceList = (rows) => {
    const dl = el('dl', 'menu-list');
    rows.forEach((row) => {
      const shown = typeof row.price === 'number' ? rupees(row.price) : row.price;
      const item = el('div', 'menu-item');
      item.append(el('dt', null, row.name), el('dd', null, shown));
      dl.append(item);
    });
    return dl;
  };

  /* ---------- Menu page: every category in full ---------- */
  if (root) {
    MENU.forEach((category) => {
      const section = el('section', 'menu-section');
      section.id = category.id;
      section.setAttribute('aria-labelledby', category.id + '-title');

      const title = el('h2', 'menu-title', category.title);
      title.id = category.id + '-title';

      const body = el('div', 'menu-body');

      if (category.items) body.append(priceList(category.items));

      if (category.combos) {
        const grid = el('div', 'combo-grid');
        category.combos.forEach((combo) => {
          const box = el('div', 'combo');
          box.append(el('h3', null, combo.name));
          if (combo.includes) box.append(el('p', 'combo-includes', combo.includes));
          box.append(priceList(combo.options));
          grid.append(box);
        });
        body.append(grid);
      }

      section.append(title, body);
      root.append(section);

      // jump link at the top of the page
      if (jump) {
        const li = el('li');
        const link = el('a', null, category.title);
        link.href = '#' + category.id;
        li.append(link);
        jump.append(li);
      }
    });
  }

  /* ---------- Home page: a short taste of each category ---------- */
  if (preview) {
    const PREVIEW_ITEMS = 3; // how many rows to show per category

    MENU.forEach((category) => {
      let rows = [];

      if (category.items) {
        rows = category.items.slice(0, PREVIEW_ITEMS);
      } else if (category.combos) {
        // combos are shown as "from" their cheapest option
        rows = category.combos
          .filter((combo) => combo.options && combo.options.length)
          .slice(0, PREVIEW_ITEMS)
          .map((combo) => ({
            name: combo.name,
            price: 'from ' + rupees(Math.min(...combo.options.map((option) => option.price))),
          }));
      }
      if (rows.length === 0) return;

      const heading = el('h3');
      const link = el('a', null, category.title);
      link.href = 'menu.html#' + category.id;
      heading.append(link);

      const column = el('div', 'menu-preview-col');
      column.append(heading, priceList(rows));
      preview.append(column);
    });
  }
})();
