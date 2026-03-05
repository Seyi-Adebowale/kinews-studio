import matteBlack from "../assets/frame1.jpg";
import glossBlack from "../assets/frame2.jpg";
import galleryWhite from "../assets/frame3.webp";
import museumBlack from "../assets/frame4.avif";
import naturalOak from "../assets/frame5.jpg";
import aluminium from "../assets/frame6.avif";

export const packages = [
  {
    id: 1,
    name: "Essential",
    price: "£ xxxx",
    tagline: "Perfect for intimate events and compact coverage.",
  },
  {
    id: 2,
    name: "Signature",
    price: "£ xxxx",
    tagline: "Balanced coverage for most celebrations and weddings.",
  },
  {
    id: 3,
    name: "Premier",
    price: "£ xxxx",
    tagline: "Full-day storytelling with maximum flexibility.",
  },
];

export const frames = [
  {
    id: "frame-01",
    name: "Matte Black Frame",
    price: 25,
    color: "Black",
    finish: "Matte",
    sizes: ["A4", "A3", "A2"],
    featured: true,
    image: matteBlack,
    description:
      "A clean, non-reflective finish that keeps attention on the photograph.",
  },
  {
    id: "frame-02",
    name: "Gloss Black Frame",
    price: 28,
    color: "Black",
    finish: "Gloss",
    sizes: ["A4", "A3", "A2"],
    image: glossBlack,
    description:
      "Smooth and polished with a subtle shine for a modern presentation.",
  },
  {
    id: "frame-03",
    name: "Gallery White Frame",
    price: 28,
    color: "White",
    finish: "Matte",
    sizes: ["A4", "A3", "A2"],
    image: galleryWhite,
    description:
      "Minimal and bright, ideal for contemporary interiors and light imagery.",
  },
  {
    id: "frame-04",
    name: "Museum Black Frame",
    price: 35,
    color: "Black",
    finish: "Matte",
    sizes: ["A4", "A3", "A2"],
    image: museumBlack,
    description:
      "Deep-toned and refined, inspired by classic gallery exhibitions.",
  },
  {
    id: "frame-05",
    name: "Natural Oak Frame",
    price: 40,
    color: "Oak",
    finish: "Natural",
    sizes: ["A4", "A3"],
    image: naturalOak,
    description:
      "Warm wood tones that add softness and character to any photograph.",
  },
  {
    id: "frame-06",
    name: "Slim Aluminium Frame",
    price: 38,
    color: "Silver",
    finish: "Satin",
    sizes: ["A4", "A3", "A2"],
    image: aluminium,
    description:
      "Lightweight and modern with a sleek profile for a refined finish.",
  },
];