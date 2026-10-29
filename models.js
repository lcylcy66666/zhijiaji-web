// Product data for the Models section and the color modal.
// Model names and colors are placeholders until the client confirms them.
//
// size:   "regular" or "max" (sets the drawn case proportions)
// lenses: 2 or 3 (camera layout in the drawing)
// image:  path to a real product photo for that color, e.g. "assets/models/iphone-17-pro-max-champagne.png".
//         Colors without an image are drawn as an illustration from `hex`.
window.ZJ_MODELS = [
  {
    id: "iphone-17",
    name: "iPhone 17",
    size: "regular",
    lenses: 2,
    colors: [
      { id: "obsidian-black", name: "Obsidian Black", hex: "#23201d", image: null },
      { id: "champagne", name: "Champagne", hex: "#cdb791", image: null },
      { id: "titanium-grey", name: "Titanium Grey", hex: "#8f8b85", image: null },
    ],
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    size: "regular",
    lenses: 3,
    colors: [
      { id: "obsidian-black", name: "Obsidian Black", hex: "#23201d", image: null },
      { id: "champagne", name: "Champagne", hex: "#cdb791", image: null },
      { id: "titanium-grey", name: "Titanium Grey", hex: "#8f8b85", image: null },
    ],
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    size: "max",
    lenses: 3,
    colors: [
      { id: "obsidian-black", name: "Obsidian Black", hex: "#23201d", image: null },
      { id: "champagne", name: "Champagne", hex: "#cdb791", image: null },
      { id: "titanium-grey", name: "Titanium Grey", hex: "#8f8b85", image: null },
    ],
  },
];
