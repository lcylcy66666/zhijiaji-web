// Product data for the Models section and the color dialog.
// Color names are provisional until the client confirms them.
//
// Each series is one card; `cover` is its photo.
// variants: one case design per camera layout. The iPhone 17 series has two: one for
//           17 Pro Max and 17 Pro, one for iPhone 17. The 17 Pro and 18 Pro cases share a design.
// photos:   each color of a variant has a photo at assets/models/<photos>-<color>.jpg
//           (800 × 1000, case centered at 80% of the height).
window.ZJ_COLORS = {
  black: { name: "Black", hex: "#262626" },
  white: { name: "White", hex: "#ecebe7" },
  pink: { name: "Pink", hex: "#efb9b4" },
  blue: { name: "Blue", hex: "#a3c2e8" },
  orange: { name: "Orange", hex: "#ef8a32" },
  burgundy: { name: "Burgundy", hex: "#6b1d31" },
};

window.ZJ_SERIES = [
  {
    id: "iphone-16",
    name: "iPhone 16 Series",
    cover: "assets/models/series-16.jpg",
    variants: [
      { fits: ["iPhone 16 Pro Max", "iPhone 16 Pro"], photos: "case-16-pro", colors: ["black", "white", "blue", "pink"] },
    ],
  },
  {
    id: "iphone-17",
    name: "iPhone 17 Series",
    cover: "assets/models/series-17.jpg",
    variants: [
      { fits: ["iPhone 17 Pro Max", "iPhone 17 Pro"], photos: "case-17-18-pro", colors: ["orange", "blue", "pink", "white", "black"] },
      { fits: ["iPhone 17"], photos: "case-17", colors: ["white", "black", "blue", "pink", "orange"] },
    ],
  },
  {
    id: "iphone-18",
    name: "iPhone 18 Series",
    cover: "assets/models/series-18.jpg",
    variants: [
      { fits: ["iPhone 18 Pro Max", "iPhone 18 Pro"], photos: "case-17-18-pro", colors: ["burgundy", "pink", "white", "black", "blue"] },
    ],
  },
];
