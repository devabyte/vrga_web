/* Builds the Menu page from menu-data.js.
   You should not need to edit this file. */
(() => {
  'use strict';

  const root = document.getElementById('menu-root');
  const jump = document.getElementById('menu-jump'); // category links at the top of the page
  if (!root) return;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  /* ---------- If the data file is broken, say so (and tell the owner in the console) ---------- */
  if (typeof MENU === 'undefined') {
    console.error('menu-data.js did not load. Check that the file exists and that every line in it has its quotes and commas.');
    root.replaceChildren(el('p', 'noscript-note', "Sorry, the menu couldn't load right now. Please call us to ask about items and prices."));
    return;
  }

  const rupees = (amount) => '\u20B9' + amount;

  // rows look like { name: 'Maggi', price: 60 }
  const priceList = (rows) => {
    const dl = el('dl', 'menu-list');
    rows.forEach((row) => {
      const item = el('div', 'menu-item');
      item.append(el('dt', null, row.name), el('dd', null, rupees(row.price)));
      dl.append(item);
    });
    return dl;
  };

  /* ---------- Every category in full ---------- */
  {
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
})();
