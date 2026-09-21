(() => {
  'use strict';

  /* ==========================================================================
     EDIT THE MENU HERE
     - Change a price: edit the number.
     - Add an item: copy a line like { name: 'Maggi', price: 60 } and edit it.
     - Add a category: copy a whole { id, title, items } block.
     - Combos: each combo has a name and a list of options. Add an optional
       line  includes: 'what is in the combo'  under a combo's name to show it.
     ========================================================================== */
  const MENU = [
    {
      id: 'snacks',
      title: 'Snacks',
      items: [
        { name: 'Maggi', price: 60 },
        { name: 'Popcorn', price: 50 },
        { name: 'Fries', price: 100 },
        { name: 'Sandwich', price: 100 },
        { name: 'Munchies', price: 50 },
      ],
    },
    {
      id: 'hot-drinks',
      title: 'Hot drinks',
      items: [
        { name: 'Tea', price: 25 },
        { name: 'Coffee', price: 40 },
      ],
    },
    {
      id: 'cold-drinks',
      title: 'Cold drinks',
      items: [
        { name: 'Cold Coffee', price: 80 },
        { name: 'Cold Drink 750 ml', price: 40 },
        { name: 'Monster', price: 125 },
        { name: 'Water', price: 10 },
      ],
    },
    {
      id: 'combos',
      title: 'Combos',
      combos: [
        {
          name: 'Mini Mission',
          options: [
            { name: 'Thumbs Up 250 ml', price: 120 },
            { name: 'Plus: Thumbs Up 750 ml', price: 140 },
            { name: 'Cold Coffee', price: 160 },
          ],
        },
        {
          name: 'Gamer Fuel',
          options: [
            { name: 'Thumbs Up 250 ml', price: 160 },
            { name: 'Plus: Thumbs Up 250 ml', price: 180 },
            { name: 'Cold Coffee', price: 200 },
          ],
        },
        {
          name: 'MVP Bundle',
          options: [
            { name: 'Thumbs Up 750 ml', price: 200 },
            { name: 'Plus: Thumbs Up 250 ml', price: 220 },
            { name: 'Cold Coffee', price: 240 },
          ],
        },
        {
          name: 'Power Duo Pack',
          options: [
            { name: 'Thumbs Up 750 ml', price: 200 },
            { name: 'Cold Coffee', price: 280 },
          ],
        },
        {
          name: 'Squad Snack Pack',
          options: [
            { name: 'Thumbs Up 1 l', price: 300 },
            { name: 'Cold Coffee', price: 460 },
          ],
        },
      ],
    },
  ];

  /* ==========================================================================
     Rendering (no need to edit below this line)
     ========================================================================== */
  const root = document.getElementById('menu-root');
  const jump = document.getElementById('menu-jump');
  if (!root) return;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const rupees = (amount) => '\u20B9' + amount;

  const priceList = (rows) => {
    const dl = el('dl', 'menu-list');
    rows.forEach((row) => {
      const item = el('div', 'menu-item');
      item.append(el('dt', null, row.name), el('dd', null, rupees(row.price)));
      dl.append(item);
    });
    return dl;
  };

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
})();
