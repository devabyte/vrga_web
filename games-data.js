/* ==========================================================================
   GAME CATALOG
   This is the only file you need to edit to change the games on the website.
   Both the home page and the Games page are built from this list.

   TO ADD A GAME
     1. Put its picture in the  img  folder, for example  img/hades.jpeg
     2. Add one line to the list below, for example:
          { name: "Hades", image: "hades.jpeg" },

   TO CHANGE A GAME    Edit its name, or change the image file name.
   TO REMOVE A GAME    Delete its line (you can delete the picture too).
   TO SHOW A GAME ON THE HOME PAGE
                       Add  featured: true  to its line, for example:
          { name: "Hades", image: "hades.jpeg", featured: true },

   Games appear in the same order as this list, so new games added at the
   bottom show up on the last page.

   IMPORTANT
     - Keep the quotes " " around the name and the image file name.
     - Keep the comma at the end of every line.
     - Type the image file name exactly as it is, including capital letters
       and spaces. GitHub Pages treats "Hades.jpeg" and "hades.jpeg" as
       different files.
   ========================================================================== */

const GAME_CATALOG = {
  gamesPerPage: 10,      // how many games are shown on each page of the Games page
  imageFolder: "img/",   // the folder where the pictures live

  // Banner shown at the bottom of the last page. Change it, or set it to null to hide it.
  moreTile: { name: "And many more", image: "manymore.jpeg" },

  games: [
    // Featured on the home page
    { name: "Spider-Man: Miles Morales", image: "spiderman miles morales.jpeg", featured: true },
    { name: "God of War Ragnarök",       image: "gow rag.jpeg",                 featured: true },
    { name: "EA Sports FC 25",           image: "fc25.jpeg",                    featured: true },
    { name: "Tekken 8",                  image: "tekken 8.jpeg",                featured: true },
    { name: "Horizon Forbidden West",    image: "horizon west.jpeg",            featured: true },
    { name: "Resident Evil 4",           image: "resident evil 4.jpeg",         featured: true },

    // The rest of the library
    { name: "Lego 2K Drive",                   image: "lego.jpeg" },
    { name: "Gran Turismo 7",                  image: "gran.jpeg" },
    { name: "Need for Speed Heat",             image: "nfs.jpeg" },
    { name: "Assassin's Creed Mirage",         image: "assasin.jpeg" },
    { name: "Call of Duty: Modern Warfare II", image: "callofdutymw2.jpeg" },
    { name: "Grand Theft Auto V",              image: "gta5.jpeg" },
    { name: "Ghost of Tsushima",               image: "ghost.jpeg" },
    { name: "Mortal Kombat 1",                 image: "mortal kombat 1.jpeg" },
    { name: "Cyberpunk 2077",                  image: "cyberpunk.jpeg" },
    { name: "Red Dead Redemption 2",           image: "red dead 2.jpeg" },
    { name: "Resident Evil 2",                 image: "residen evil 2.jpeg" },
    { name: "Tekken 7",                        image: "tekken 7.jpeg" },
    { name: "God of War (2018)",               image: "gow 4.jpeg" },
    { name: "God of War III",                  image: "gow3.jpeg" },
    { name: "Black Myth wukong",               image: "black_myth_wukong.jpg" },
  ],
};
