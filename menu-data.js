/* ==========================================================================
   MENU
   This is the only file you need to edit to change food and drink items or
   prices. The Menu page is built from this list.

   TO CHANGE A PRICE     Edit the number.
   TO ADD AN ITEM        Copy a line like  { name: "Maggi", price: 60 },  and edit it.
   TO REMOVE AN ITEM     Delete its line.
   TO ADD A CATEGORY     Copy a whole  { id, title, items }  block.
                         (the id is just a short label with no spaces)

   COMBOS   Each combo has a name and a list of options with prices.
            Add an optional line under a combo's name to say what is inside:
                includes: "Maggi and a cold drink",

   Keep the quotes " " around names and the comma at the end of every line.
   ========================================================================== */

const MENU = [
  {
    id: "snacks",
    title: "Snacks",
    items: [
      { name: "Maggi", price: 60 },
      { name: "Popcorn", price: 50 },
      { name: "Fries", price: 100 },
      { name: "Sandwich", price: 100 },
      { name: "Munchies", price: 50 },
    ],
  },
  {
    id: "hot-drinks",
    title: "Hot drinks",
    items: [
      { name: "Tea", price: 25 },
      { name: "Coffee", price: 40 },
    ],
  },
  {
    id: "cold-drinks",
    title: "Cold drinks",
    items: [
      { name: "Cold Coffee", price: 80 },
      { name: "Cold Drink 750 ml", price: 40 },
      { name: "Monster", price: 125 },
      { name: "Water", price: 10 },
    ],
  },
  {
    id: "combos",
    title: "Combos",
    combos: [
      {
        name: "Mini Mission",
        options: [
          { name: "Thumbs Up 250 ml", price: 120 },
          { name: "Plus: Thumbs Up 750 ml", price: 140 },
          { name: "Cold Coffee", price: 160 },
        ],
      },
      {
        name: "Gamer Fuel",
        options: [
          { name: "Thumbs Up 250 ml", price: 160 },
          { name: "Plus: Thumbs Up 250 ml", price: 180 },
          { name: "Cold Coffee", price: 200 },
        ],
      },
      {
        name: "MVP Bundle",
        options: [
          { name: "Thumbs Up 750 ml", price: 200 },
          { name: "Plus: Thumbs Up 250 ml", price: 220 },
          { name: "Cold Coffee", price: 240 },
        ],
      },
      {
        name: "Power Duo Pack",
        options: [
          { name: "Thumbs Up 750 ml", price: 200 },
          { name: "Cold Coffee", price: 280 },
        ],
      },
      {
        name: "Squad Snack Pack",
        options: [
          { name: "Thumbs Up 1 l", price: 300 },
          { name: "Cold Coffee", price: 460 },
        ],
      },
    ],
  },
];
