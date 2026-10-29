// Product data for the Models section and the color modal.
// Model names and colors are placeholders until the client confirms them.
//
// size:   "regular" or "max" (sets the drawn case proportions)
// camera: "square" (camera bump at the top left, iPhone 16 Pro) or
//         "plateau" (full-width camera plateau, iPhone 17 Pro and later); sets the case's camera window
// image:  path to a real product photo for that color, e.g. "assets/models/iphone-17-pro-max-champagne.png".
//         Colors without an image are drawn as an illustration from `hex`.
window.ZJ_MODELS = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    size: "max",
    camera: "square",
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
    camera: "plateau",
    colors: [
      { id: "obsidian-black", name: "Obsidian Black", hex: "#23201d", image: null },
      { id: "champagne", name: "Champagne", hex: "#cdb791", image: null },
      { id: "titanium-grey", name: "Titanium Grey", hex: "#8f8b85", image: null },
    ],
  },
  {
    id: "iphone-18-pro-max",
    name: "iPhone 18 Pro Max",
    size: "max",
    camera: "plateau",
    colors: [
      { id: "obsidian-black", name: "Obsidian Black", hex: "#23201d", image: null },
      { id: "champagne", name: "Champagne", hex: "#cdb791", image: null },
      { id: "titanium-grey", name: "Titanium Grey", hex: "#8f8b85", image: null },
    ],
  },
];
