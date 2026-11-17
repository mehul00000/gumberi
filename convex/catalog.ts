/**
 * Gumberi catalog — the single source of truth for demo data.
 * This module is pure data: it is imported by Convex functions (for seeding)
 * and by the client (as the demo-mode fallback when no Convex URL is set).
 */

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ── Types ──────────────────────────────────────────────────── */

export type ColorOption = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  description: string;
  story: string;
  images: string[];
  colors: ColorOption[];
  sizes: string[];
  details: string[];
  materials: string;
  care: string[];
  badges?: string[];
  collection: string;
  rating: number;
  reviews: number;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type Collection = {
  slug: string;
  name: string;
  season: string;
  story: string;
  cover: string;
  products: string[];
};

export type JournalBlock = { type: "p" | "h2" | "quote"; text: string };

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  cover: string;
  blocks: JournalBlock[];
};

export type Store = {
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
};

export type FaqGroup = {
  title: string;
  items: { q: string; a: string }[];
};

/* ── Palettes ───────────────────────────────────────────────── */

const CLAY: ColorOption[] = [
  { name: "Terracotta", hex: "#b04a26" },
  { name: "Ivory", hex: "#efe6d4" },
  { name: "Ink", hex: "#211b13" },
];
const NATURALS: ColorOption[] = [
  { name: "Oat", hex: "#ddcfb4" },
  { name: "Sage", hex: "#5c6e56" },
  { name: "Ink", hex: "#211b13" },
];
const SILKS: ColorOption[] = [
  { name: "Midnight", hex: "#1c2233" },
  { name: "Rosewater", hex: "#d8a7a0" },
  { name: "Ivory", hex: "#efe6d4" },
];
const MONOS: ColorOption[] = [
  { name: "Ecru", hex: "#e5dbc6" },
  { name: "Charcoal", hex: "#35312c" },
];

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const MEN_SIZES = ["S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"];
const ONE_SIZE = ["One Size"];

/* ── Products ───────────────────────────────────────────────── */

export const PRODUCTS: Product[] = [
  {
    slug: "aurelia-slip-dress",
    name: "Aurelia Slip Dress",
    category: "women",
    price: 4890,
    description:
      "A bias-cut slip in washed mulberry silk that catches light the way the last hour of the day does.",
    story:
      "Cut on the bias so it moves a half-second after you do, the Aurelia is sewn from mulberry silk washed with river minerals for a lived-in hand. The straps are adjustable, the hem is rolled by hand — no machine can do it as quietly.",
    images: [img("1515372039744-b8f02a3ae446"), img("1509631179647-0177331693ae"), img("1534528741775-53994a69daeb")],
    colors: SILKS,
    sizes: APPAREL_SIZES,
    details: ["Bias-cut silhouette", "Hand-rolled hem", "Adjustable straps", "Model wears size S"],
    materials: "100% mulberry silk, washed",
    care: ["Dry clean or hand wash cold", "Do not wring", "Dry flat away from sun"],
    badges: ["Bestseller"],
    collection: "midnight-silk",
    rating: 4.8,
    reviews: 212,
  },
  {
    slug: "sahara-trench",
    name: "Sahara Trench",
    category: "women",
    price: 8990,
    compareAt: 11490,
    description:
      "An unlined trench in densely woven cotton, dyed the exact orange of a Kutch wall at noon.",
    story:
      "The Sahara is our love letter to the terracotta walls of Bhuj. Garment-dyed in small vats so no two coats match perfectly — we consider the drift a feature. Corozo buttons, deep bellows pockets, a storm flap that actually storms.",
    images: [img("1539109136881-3be0616acf4b"), img("1490481651871-ab68de25d43d"), img("1496747611176-843222e1e57c")],
    colors: CLAY,
    sizes: APPAREL_SIZES,
    details: ["Garment-dyed cotton twill", "Corozo nut buttons", "Bellows pockets", "Self-tie belt"],
    materials: "100% cotton twill, 320 gsm",
    care: ["Machine wash cold, gentle", "Line dry", "Warm iron"],
    badges: ["New"],
    collection: "terracotta-summer",
    rating: 4.9,
    reviews: 97,
  },
  {
    slug: "marigold-wrap-top",
    name: "Marigold Wrap Top",
    category: "women",
    price: 2490,
    description:
      "A quick-wrap top in breathable cotton voile, printed with hand-carved marigold blocks.",
    story:
      "Block-printed by a family workshop in Bagru, three generations deep. Each metre is stamped by hand, so the marigolds drift and repeat like conversation.",
    images: [img("1515886657613-9f3515b0c78f"), img("1524504388940-b1c1722653e1"), img("1483985988355-763728e1935b")],
    colors: [
      { name: "Marigold", hex: "#d99a2b" },
      ...NATURALS,
    ],
    sizes: APPAREL_SIZES,
    details: ["Hand block print", "Wrap silhouette with inner tie", "Three-quarter sleeves"],
    materials: "100% cotton voile",
    care: ["Hand wash cold, first wash alone", "Dry in shade"],
    collection: "ivory-hour",
    rating: 4.7,
    reviews: 143,
  },
  {
    slug: "loom-linen-coord",
    name: "Loom Linen Co-ord",
    category: "women",
    price: 5690,
    description:
      "A relaxed shirt and wide-leg trouser set in midweight European linen — the full monsoon uniform.",
    story:
      "Linen behaves best when it is allowed to crease. We cut this set generously and wash it twice at the mill, so it arrives already softened, already breaking rules.",
    images: [img("1485968579580-b6d095142e6e"), img("1445205170230-053b83016050"), img("1434389677669-e08b4cac3105")],
    colors: NATURALS,
    sizes: APPAREL_SIZES,
    details: ["Two-piece set", "Garment-washed linen", "Elastic-back trouser", "Mother-of-pearl buttons"],
    materials: "100% European flax linen, 190 gsm",
    care: ["Machine wash cold", "Tumble dry low to soften", "Iron if you must"],
    badges: ["Bestseller"],
    collection: "monsoon-linen",
    rating: 4.8,
    reviews: 311,
  },
  {
    slug: "dusk-quilted-jacket",
    name: "Dusk Quilted Jacket",
    category: "women",
    price: 7290,
    description:
      "A featherweight quilted jacket in ecru, filled with recycled kapok for shoulder-season evenings.",
    story:
      "Quilted in a diamond grid by a sixty-year-old jhat stitching collective in Gujarat. The kapok fill is reclaimed from temple-seminary bedding — warm like a secret, light like one too.",
    images: [img("1492707892479-7bc8d5a4ee93"), img("1516762689617-e1cffcef479d"), img("1556905055-8f358a7a47b2")],
    colors: MONOS,
    sizes: APPAREL_SIZES,
    details: ["Kapok-filled quilt", "Snap front", "Hidden interior pocket", "Packs into its own pouch"],
    materials: "Cotton shell, recycled kapok fill",
    care: ["Spot clean", "Air dry flat", "Do not iron quilting"],
    collection: "everyday-uniform",
    rating: 4.6,
    reviews: 88,
  },
  {
    slug: "ivory-hour-midi-skirt",
    name: "Ivory Hour Midi Skirt",
    category: "women",
    price: 3290,
    description:
      "A fluid midi skirt with a swept panel that opens when you walk and closes when you stand.",
    story:
      "Named for the hour when everything photographs well. The swept panel is a single metre of extra cloth, drafted into the side seam so the skirt turns with you.",
    images: [img("1469334031218-e382a71b716b"), img("1490481651871-ab68de25d43d"), img("1524504388940-b1c1722653e1")],
    colors: SILKS,
    sizes: APPAREL_SIZES,
    details: ["Swept side panel", "Invisible zip", "Fully lined bodice"],
    materials: "Cotton-silk blend, 145 gsm",
    care: ["Dry clean recommended", "Cool iron on reverse"],
    collection: "ivory-hour",
    rating: 4.7,
    reviews: 76,
  },
  {
    slug: "sable-silk-blouse",
    name: "Sable Silk Blouse",
    category: "women",
    price: 4290,
    description:
      "A softly tailored blouse in sandwashed silk with sleeves that pool exactly right.",
    story:
      "Sandwashed until it feels like a note passed three times across a classroom. Wear it tucked, half-tucked, or not tucked at all — it has opinions but keeps them quiet.",
    images: [img("1509631179647-0177331693ae"), img("1517841905240-472988babdf9"), img("1544441893-675973e31985")],
    colors: SILKS,
    sizes: APPAREL_SIZES,
    details: ["Sandwashed silk", "French seams", "Dropped shoulder"],
    materials: "100% silk, sandwashed",
    care: ["Hand wash cold", "Hang dry", "Cool iron"],
    collection: "midnight-silk",
    rating: 4.8,
    reviews: 129,
  },
  {
    slug: "kaveri-overshirt",
    name: "Kaveri Overshirt",
    category: "men",
    price: 4590,
    description:
      "A boxy overshirt in slubby handloom cotton that layers over everything you already own.",
    story:
      "Woven on pit looms along the Kaveri delta, where the yarn picks up a slub that no machine will copy. Cut roomy to live over a tee in March and under a coat in December.",
    images: [img("1591047139829-d91aecb6caea"), img("1507003211169-0a1dd7228f2d"), img("1503342217505-b0a15ec3261c")],
    colors: NATURALS,
    sizes: MEN_SIZES,
    details: ["Handloom cotton", "Twin chest pockets", "Boxy fit", "Double-needle seams"],
    materials: "100% handloom cotton",
    care: ["Machine wash cold", "Line dry", "Gets better unwashed"],
    badges: ["New"],
    collection: "everyday-uniform",
    rating: 4.8,
    reviews: 167,
  },
  {
    slug: "terracotta-camp-collar",
    name: "Terracotta Camp Collar Shirt",
    category: "men",
    price: 2890,
    description:
      "An open-collar vacation shirt in breathable poplin, dyed slowly in a single terracotta bath.",
    story:
      "Dyed the colour of the roof tiles in Fort Kochi at 5 p.m. The camp collar is cut on a curve so it rolls instead of folding — a small tailoring detail borrowed from 1950s resort shirts.",
    images: [img("1488161628813-04466f872be2"), img("1520975954732-35dd22299614"), img("1507003211169-0a1dd7228f2d")],
    colors: CLAY,
    sizes: MEN_SIZES,
    details: ["Camp collar", "Curved hem", "Relaxed fit"],
    materials: "100% cotton poplin",
    care: ["Machine wash cold", "Warm iron"],
    collection: "terracotta-summer",
    rating: 4.7,
    reviews: 203,
  },
  {
    slug: "wanderer-pleated-trousers",
    name: "Wanderer Pleated Trousers",
    category: "men",
    price: 3690,
    description:
      "Single-pleat trousers in tumble-finished linen that read tailoring and feel like pyjamas.",
    story:
      "The pleat is not decoration — it is stored walking room. Drafted from a 1940s Gurkha pattern with the belt tabs kept and the fussiness removed.",
    images: [img("1507680434567-5739c80be1ac"), img("1552374196-c4e7ffc6e126"), img("1541099649105-f69ad21f3246")],
    colors: MONOS,
    sizes: MEN_SIZES,
    details: ["Single pleat", "Extended waistband tab", "Side adjusters", "Tumble-finished linen"],
    materials: "100% linen",
    care: ["Machine wash cold", "Line dry", "Iron damp for a sharp crease"],
    collection: "monsoon-linen",
    rating: 4.6,
    reviews: 94,
  },
  {
    slug: "meridian-wool-blazer",
    name: "Meridian Wool Blazer",
    category: "men",
    price: 10990,
    description:
      "An unstructured merino blazer with hand-set sleeves — tailoring you can fold into a weekend bag.",
    story:
      "Half-canvassed by hand, pressed with steam only. The meridian of the name is the shoulder line: one continuous seam from collar to cuff, set without pads.",
    images: [img("1552374196-c4e7ffc6e126"), img("1507680434567-5739c80be1ac"), img("1591047139829-d91aecb6caea")],
    colors: [
      { name: "Ink", hex: "#211b13" },
      { name: "Stone", hex: "#b7ab97" },
    ],
    sizes: MEN_SIZES,
    details: ["Unstructured shoulder", "Half canvas", "Horn buttons", "Interior grosgrain trims"],
    materials: "100% merino wool suiting",
    care: ["Dry clean only", "Rest on a broad hanger"],
    badges: ["Bestseller"],
    collection: "wedding-atelier",
    rating: 4.9,
    reviews: 58,
  },
  {
    slug: "salt-denim-straight",
    name: "Salt Denim, Straight",
    category: "men",
    price: 3190,
    description:
      "A straight-leg jean in 13 oz selvedge denim, rinsed with salt water from the Arabian Sea.",
    story:
      "Woven on shuttle looms at 32 picks per minute — slow denim. The final rinse happens in tanks of sea salt, which softens the hand and sets the indigo a shade you will not find in a mall.",
    images: [img("1542272604-787c3835535d"), img("1541099649105-f69ad21f3246"), img("1567401893414-76b7b1e5a7a5")],
    colors: [
      { name: "Salt Indigo", hex: "#33415c" },
      { name: "Ecru", hex: "#e5dbc6" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    details: ["13 oz selvedge denim", "Salt-water rinse", "Chain-stitched hem", "Copper rivets"],
    materials: "100% cotton selvedge denim",
    care: ["Wash sparingly, cold", "Inside out", "Hang by the hem"],
    collection: "everyday-uniform",
    rating: 4.8,
    reviews: 246,
  },
  {
    slug: "indigo-band-tee",
    name: "Indigo Band Tee",
    category: "men",
    price: 1590,
    description:
      "A heavyweight loopwheel tee in natural indigo that fades to your own map of wear.",
    story:
      "Knitted on vintage loopwheel machines in Erode at walking pace, so the fabric has zero tension and all softness. The indigo will transfer, fade at the elbows, and become yours.",
    images: [img("1495121605193-b116b5b9c5fe"), img("1520975954732-35dd22299614"), img("1489987707025-afc232f7ea0f")],
    colors: [
      { name: "Indigo", hex: "#2c3e6b" },
      { name: "Oat", hex: "#ddcfb4" },
    ],
    sizes: MEN_SIZES,
    details: ["Loopwheel knit", "Natural indigo dye", "Ribbed collar with tape"],
    materials: "100% cotton, 220 gsm",
    care: ["Wash cold, separately first", "Do not bleach", "Fades beautifully"],
    collection: "everyday-uniform",
    rating: 4.7,
    reviews: 318,
  },
  {
    slug: "ralli-woven-tote",
    name: "Ralli Woven Tote",
    category: "accessories",
    price: 2990,
    description:
      "A roomy market tote hand-woven from leather offcuts — no two panels repeat.",
    story:
      "Our stitching room saves every offcut larger than a stamp. The Ralli is what they become: panels woven like a quilt, lined in canvas, strong enough for a week of market runs.",
    images: [img("1548036328-c9fa89d128fa"), img("1584917865442-de89df76afd3"), img("1558769132-cb1aea458c5e")],
    colors: [
      { name: "Tan", hex: "#a9683a" },
      { name: "Ink", hex: "#211b13" },
    ],
    sizes: ONE_SIZE,
    details: ["Hand-woven leather panels", "Canvas lining", "Interior zip pocket", "Magnetic close"],
    materials: "Vegetable-tanned leather offcuts",
    care: ["Wipe with a dry cloth", "Condition twice a year"],
    badges: ["New"],
    collection: "terracotta-summer",
    rating: 4.9,
    reviews: 71,
  },
  {
    slug: "silk-road-scarf",
    name: "Silk Road Scarf",
    category: "accessories",
    price: 1890,
    description:
      "A long silk scarf carrying a border motif redrawn from a 16th-century trade route map.",
    story:
      "The border is our cartographer's redraw of the Deccan silk route, printed in eight colours on crepe de chine. Hand-rolled edges, as always.",
    images: [img("1558769132-cb1aea458c5e"), img("1445205170230-053b83016050"), img("1469334031218-e382a71b716b")],
    colors: SILKS,
    sizes: ONE_SIZE,
    details: ["Hand-rolled edges", "8-colour print", "180 × 55 cm"],
    materials: "100% silk crepe de chine",
    care: ["Dry clean", "Store loosely folded"],
    collection: "midnight-silk",
    rating: 4.8,
    reviews: 64,
  },
  {
    slug: "dune-suede-cap",
    name: "Dune Suede Cap",
    category: "accessories",
    price: 1490,
    description:
      "A five-panel cap in goat suede that darkens wherever the sun touches it most.",
    story:
      "Suede is a diary. Wear the Dune through one summer and the crown will hold a sun map of your walks — darker at the brim, paler where the hair parts.",
    images: [img("1495121605193-b116b5b9c5fe"), img("1520975954732-35dd22299614"), img("1485968579580-b6d095142e6e")],
    colors: [
      { name: "Dune", hex: "#c8a97c" },
      { name: "Ink", hex: "#211b13" },
    ],
    sizes: ONE_SIZE,
    details: ["Five-panel cut", "Goat suede", "Brass slider", "Cotton twill lining"],
    materials: "Goat suede",
    care: ["Brush with a suede brush", "Keep dry"],
    collection: "everyday-uniform",
    rating: 4.5,
    reviews: 39,
  },
  {
    slug: "leather-card-folio",
    name: "Leather Card Folio",
    category: "accessories",
    price: 2190,
    description:
      "A slim folio in oak-bark-tanned leather that starts stiff and ends up suede-soft.",
    story:
      "Cut from the shoulder bend of the hide — the strongest part. Six card slots, one hidden note pocket, and edges painted in eight passes by hand.",
    images: [img("1548036328-c9fa89d128fa"), img("1584917865442-de89df76afd3"), img("1558769132-cb1aea458c5e")],
    colors: [
      { name: "Chestnut", hex: "#7c4a23" },
      { name: "Ink", hex: "#211b13" },
    ],
    sizes: ONE_SIZE,
    details: ["Six card slots", "Hidden note pocket", "Hand-painted edges"],
    materials: "Oak-bark tanned leather",
    care: ["Let it patina", "Condition sparingly"],
    collection: "ivory-hour",
    rating: 4.8,
    reviews: 112,
  },
  {
    slug: "raw-silk-belt",
    name: "Raw Silk Belt",
    category: "accessories",
    price: 1690,
    description:
      "A narrow belt of braided raw silk over a leather core, finished with a solid brass buckle.",
    story:
      "The braid is done on a wooden stand that creaks — you can hear a good belt being made. The silk is from the same reeling cooperative as our Midnight Silk collection.",
    images: [img("1558769132-cb1aea458c5e"), img("1548036328-c9fa89d128fa"), img("1524758631624-e2822e304c36")],
    colors: [
      { name: "Ivory", hex: "#efe6d4" },
      { name: "Ink", hex: "#211b13" },
      { name: "Gold", hex: "#9c7a3c" },
    ],
    sizes: ["S", "M", "L"],
    details: ["Braided raw silk", "Leather core", "Solid brass buckle"],
    materials: "Silk, leather, brass",
    care: ["Spot clean", "Keep away from rain"],
    collection: "wedding-atelier",
    rating: 4.6,
    reviews: 27,
  },
  {
    slug: "atelier-low-sneaker",
    name: "Atelier Low Sneaker",
    category: "footwear",
    price: 5490,
    description:
      "A minimalist low-top in ivory full-grain leather with a hand-stitched apron toe.",
    story:
      "The apron toe is stitched by hand at nine stitches to the inch — a shoemaker's signature flex. Cork midsole, so it moulds to your step within a week.",
    images: [img("1560343090-f0409e92791a"), img("1549298916-b41d501d3772"), img("1543163521-1bf539c55dd2")],
    colors: [
      { name: "Ivory", hex: "#efe6d4" },
      { name: "Ink", hex: "#211b13" },
    ],
    sizes: SHOE_SIZES,
    details: ["Hand-stitched apron toe", "Cork midsole", "Natural rubber outsole"],
    materials: "Full-grain leather, cork, rubber",
    care: ["Brush off dust", "Cream polish monthly"],
    badges: ["Bestseller"],
    collection: "ivory-hour",
    rating: 4.7,
    reviews: 185,
  },
  {
    slug: "monsoon-chelsea-boot",
    name: "Monsoon Chelsea Boot",
    category: "footwear",
    price: 7890,
    description:
      "A waterproofed Chelsea boot with gusseted elastic and a lug sole for flooded footpaths.",
    story:
      "Built for July in Mumbai. The leather is hydrophobic-waxed at the tannery, the elastic gussets are double-layered, and the lug sole bites wet stone. Your socks stay dry — that is the whole promise.",
    images: [img("1549298916-b41d501d3772"), img("1560343090-f0409e92791a"), img("1543163521-1bf539c55dd2")],
    colors: [
      { name: "Espresso", hex: "#3c2a1e" },
      { name: "Ink", hex: "#211b13" },
    ],
    sizes: SHOE_SIZES,
    details: ["Hydrophobic waxed leather", "Double gusset", "Lug rubber sole", "Goodyear welted"],
    materials: "Waxed leather, rubber",
    care: ["Rinse mud with water", "Dry slowly", "Re-wax seasonally"],
    collection: "monsoon-linen",
    rating: 4.8,
    reviews: 93,
  },
  {
    slug: "festival-kolhapuri-sandal",
    name: "Festival Kolhapuri Sandal",
    category: "footwear",
    price: 2790,
    description:
      "Hand-braided Kolhapuri sandals from a ninth-generation workshop, unlined and unapologetic.",
    story:
      "The braid pattern is called ghunghroo — the same one used for dancers' ankle bells. Vegetable-tanned, sole stitched (not glued) so it can be resoled forever.",
    images: [img("1560343090-f0409e92791a"), img("1549298916-b41d501d3772")],
    colors: [
      { name: "Tan", hex: "#a9683a" },
      { name: "Ox-blood", hex: "#5e1f1f" },
    ],
    sizes: SHOE_SIZES,
    details: ["Hand-braided upper", "Stitched sole", "Vegetable tanned"],
    materials: "Vegetable-tanned buffalo leather",
    care: ["Wear them in the rain once", "Oil lightly after"],
    badges: ["New"],
    collection: "terracotta-summer",
    rating: 4.6,
    reviews: 47,
  },
  {
    slug: "sunbridge-hoops",
    name: "Sunbridge Hoops",
    category: "jewellery",
    price: 2490,
    description:
      "Bold half-moon hoops in brushed brass with a gold-vermeil finish and butterfly backs.",
    story:
      "Cast from a wax model carved during a power cut, by candlelight — the asymmetry survived on purpose. Brushed, not polished, so they glow instead of glare.",
    images: [img("1611591437281-460bfbe1220a"), img("1515562141207-7a88fb7ce338"), img("1535632066927-ab7c9ab60908")],
    colors: [{ name: "Vermeil", hex: "#c9a36a" }],
    sizes: ONE_SIZE,
    details: ["Half-moon shape", "Brushed finish", "Hypoallergenic posts"],
    materials: "Brass, 2.5 micron gold vermeil",
    care: ["Last thing on, first thing off", "Store in the pouch"],
    collection: "wedding-atelier",
    rating: 4.9,
    reviews: 156,
  },
  {
    slug: "tide-stacker-rings",
    name: "Tide Stacker Rings",
    category: "jewellery",
    price: 1990,
    description:
      "A set of three skinny rings — one plain, one hammered, one beaded — meant to be worn in any tide order.",
    story:
      "Three rings, three moods. The hammered one is struck with a ball-peen by hand, so every facet is a small decision. Wear them stacked, spread across fingers, or gifted one at a time.",
    images: [img("1515562141207-7a88fb7ce338"), img("1611591437281-460bfbe1220a"), img("1617038220319-276d3cfab638")],
    colors: [{ name: "Silver", hex: "#b8bcc4" }],
    sizes: ["6", "7", "8", "9"],
    details: ["Set of three", "Hammered, plain, beaded", "Recycled sterling silver"],
    materials: "Recycled 925 sterling silver",
    care: ["Polish with the cloth provided"],
    collection: "midnight-silk",
    rating: 4.7,
    reviews: 88,
  },
  {
    slug: "chandi-chain-necklace",
    name: "Chandi Chain Necklace",
    category: "jewellery",
    price: 3590,
    description:
      "A hand-linked chandi (silver) chain with a single bezel-set moonstone at the clasp-front.",
    story:
      "Each link is soldered shut by hand — 64 of them — because a chain is only as honest as its weakest link. The moonstone sits at the front where a pendant would, hidden in plain sight.",
    images: [img("1611591437281-460bfbe1220a"), img("1515562141207-7a88fb7ce338"), img("1522312346375-d1a52e2b49b3")],
    colors: [{ name: "Silver", hex: "#b8bcc4" }],
    sizes: ONE_SIZE,
    details: ["Hand-linked chain", "Bezel-set moonstone", "45 cm length"],
    materials: "925 sterling silver, moonstone",
    care: ["Keep in the pouch", "Avoid perfume contact"],
    badges: ["New"],
    collection: "wedding-atelier",
    rating: 4.8,
    reviews: 61,
  },
];

/* ── Categories ─────────────────────────────────────────────── */

export const CATEGORIES: Category[] = [
  {
    slug: "women",
    name: "Women",
    tagline: "Slip dresses, trenches & co-ords",
    description:
      "Silhouettes drafted in-house and finished by hand — bias cuts, swept panels and garment-dyed cottons for every hour after four p.m.",
    image: img("1529139574466-a303027c1d8b"),
  },
  {
    slug: "men",
    name: "Men",
    tagline: "Overshirts, denim & tailoring",
    description:
      "Handloom overshirts, salt-rinsed selvedge and unstructured tailoring. Clothes that behave at work and misbehave after.",
    image: img("1488161628813-04466f872be2"),
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "Woven totes, silk & suede",
    description:
      "Everything we make from the pieces left over — plus silk scarves, suede caps and belts braided on a creaking wooden stand.",
    image: img("1556905055-8f358a7a47b2"),
  },
  {
    slug: "footwear",
    name: "Footwear",
    tagline: "Sneakers, boots & Kolhapuris",
    description:
      "Hand-stitched apron toes, Goodyear welts and braided ghunghroo straps. Soles stitched, never just glued.",
    image: img("1549298916-b41d501d3772"),
  },
  {
    slug: "jewellery",
    name: "Jewellery",
    tagline: "Brass, vermeil & moonstone",
    description:
      "Small-batch castings carved by hand — brushed vermeil hoops, recycled silver stackers and a moonstone hiding at the clasp.",
    image: img("1611591437281-460bfbe1220a"),
  },
];

/* ── Collections ────────────────────────────────────────────── */

export const COLLECTIONS: Collection[] = [
  {
    slug: "ivory-hour",
    name: "The Ivory Hour",
    season: "Spring '26",
    story:
      "The hour before dinner, when the light forgives everything. Loose weaves, unwashed silks and shoes you can walk home in.",
    cover: img("1441984904996-e0b6ba687e04"),
    products: ["marigold-wrap-top", "ivory-hour-midi-skirt", "atelier-low-sneaker", "leather-card-folio"],
  },
  {
    slug: "terracotta-summer",
    name: "Terracotta Summer",
    season: "Summer '26",
    story:
      "Dyed in small vats to the exact orange of a Kutch wall at noon. No two pieces match; that is the point.",
    cover: img("1490481651871-ab68de25d43d"),
    products: ["sahara-trench", "terracotta-camp-collar", "ralli-woven-tote", "festival-kolhapuri-sandal"],
  },
  {
    slug: "monsoon-linen",
    name: "Monsoon Linen",
    season: "Monsoon '26",
    story:
      "European flax, garment-washed twice so it arrives already softened. Cut generously, allowed to crease.",
    cover: img("1434389677669-e08b4cac3105"),
    products: ["loom-linen-coord", "wanderer-pleated-trousers", "monsoon-chelsea-boot"],
  },
  {
    slug: "midnight-silk",
    name: "Midnight Silk",
    season: "Festive '26",
    story:
      "Sandwashed silks in midnight and rosewater. Bias cuts, hand-rolled hems, jewellery that glows instead of glares.",
    cover: img("1515372039744-b8f02a3ae446"),
    products: ["aurelia-slip-dress", "sable-silk-blouse", "silk-road-scarf", "tide-stacker-rings"],
  },
  {
    slug: "everyday-uniform",
    name: "Everyday Uniform",
    season: "All year",
    story:
      "The twelve pieces we wear to work. Loopwheel tees, selvedge denim, overshirts that layer under everything.",
    cover: img("1567401893414-76b7b1e5a7a5"),
    products: ["dusk-quilted-jacket", "kaveri-overshirt", "salt-denim-straight", "indigo-band-tee", "dune-suede-cap"],
  },
  {
    slug: "wedding-atelier",
    name: "Wedding Atelier",
    season: "Season '26",
    story:
      "Unstructured merino tailoring, raw-silk belts and cast brass — for the long weddings, the ones that end at sunrise.",
    cover: img("1524758631624-e2822e304c36"),
    products: ["meridian-wool-blazer", "raw-silk-belt", "sunbridge-hoops", "chandi-chain-necklace"],
  },
];

/* ── Journal ────────────────────────────────────────────────── */

export const JOURNAL: JournalPost[] = [
  {
    slug: "cutting-for-the-golden-hour",
    title: "Cutting for the golden hour",
    excerpt:
      "Why our pattern room keeps a west-facing window, and how an hour of light decides the drape of everything we make.",
    category: "Behind the Seams",
    date: "2026-10-18",
    readTime: 6,
    cover: img("1509631179647-0177331693ae"),
    blocks: [
      {
        type: "p",
        text: "Every Gumberi pattern is checked under two lights: the flat white of the cutting table at noon, and the warm west-facing window at six. If a fabric only survives one of them, it does not get made.",
      },
      { type: "h2", text: "The window rule" },
      {
        type: "p",
        text: "Silk is a liar at noon. Under hard light it looks architectural; under the golden hour it goes liquid. So the Aurelia slip was cut, hung on a dress form, and photographed at 5:40 p.m. for eleven consecutive evenings before we approved the hem swing.",
      },
      {
        type: "quote",
        text: "A garment is only finished when it looks good in the light people actually live in.",
      },
      { type: "h2", text: "What this means for you" },
      {
        type: "p",
        text: "It means our colours are mixed for daylight and candlelight, never for supermarket fluorescence. It means hems are checked in motion, not on a hanger. And it means our lookbooks are always shot within the same ninety minutes of the day — the hour the brand is named for.",
      },
    ],
  },
  {
    slug: "the-dye-vat-of-kutch",
    title: "The 400-year-old dye vat of Kutch",
    excerpt:
      "We sent our dye master to Bhuj with one instruction: come back with the orange on the wall. She came back with a story.",
    category: "Craft Atlas",
    date: "2026-09-30",
    readTime: 8,
    cover: img("1558769132-cb1aea458c5e"),
    blocks: [
      {
        type: "p",
        text: "The wall in question belongs to a haveli on the outskirts of Bhuj. It has been painted, sun-baked and repainted since the 1600s, and the result is an orange that no pigment chart contains — a red holding its breath.",
      },
      { type: "h2", text: "Madder, iron, patience" },
      {
        type: "p",
        text: "The family that dyed our first Terracotta Summer run uses madder root with an iron-afterbath, in vats their great-great-grandmother commissioned. The bath is fed, not emptied. Our dye master spent nine days there and returned with 43 recipe cards, most of them annotated with weather.",
      },
      { type: "h2", text: "The drift" },
      {
        type: "p",
        text: "Small vats mean small variations. The Sahara Trench you receive may be a shade cooler than the one in the photograph. We could fix this with synthetic dye tomorrow. We choose not to. The drift is the receipt that a person, not a machine, made your coat.",
      },
    ],
  },
  {
    slug: "twelve-piece-summer-uniform",
    title: "How to build a 12-piece summer uniform",
    excerpt:
      "The entire wardrobe logic of our Everyday Uniform collection, compressed into one page you can screenshot.",
    category: "Style Notes",
    date: "2026-08-21",
    readTime: 5,
    cover: img("1485968579580-b6d095142e6e"),
    blocks: [
      {
        type: "p",
        text: "A uniform is not a capsule wardrobe. A capsule wants options; a uniform wants to end the conversation. Here is the twelve-piece summer stack our own studio wears March through June.",
      },
      { type: "h2", text: "The stack" },
      {
        type: "p",
        text: "Two loopwheel tees (oat, indigo). One camp collar shirt. One overshirt. Straight selvedge denim. Pleated linen trousers. Slip dress. Linen co-ord. Low sneakers. Kolhapuris. One suede cap. Twelve pieces, zero decisions before 9 a.m.",
      },
      { type: "h2", text: "The rule of thirds" },
      {
        type: "p",
        text: "A third of the pieces should be quiet (tees, denim). A third should be texture (linen, suede, braid). The final third earns the light: one terracotta moment, one silk moment, one brass moment. That is the whole arithmetic.",
      },
    ],
  },
  {
    slug: "inside-the-ivory-hour-lookbook",
    title: "Inside the Ivory Hour lookbook",
    excerpt:
      "Eleven looks, ninety minutes, one borrowed bungalow in Kochi. The making-of, in eleven frames.",
    category: "Lookbook",
    date: "2026-07-14",
    readTime: 4,
    cover: img("1445205170230-053b83016050"),
    blocks: [
      {
        type: "p",
        text: "We rented a defunct accounting office in Fort Kochi for a single evening. The desks stayed. The looks moved through the rooms as the sun crossed the courtyard — frame one at 4:31 p.m., frame eleven at 6:02 p.m.",
      },
      { type: "h2", text: "No steam, no retouch" },
      {
        type: "p",
        text: "The creases in the linen are real. The flyaway hair is real. We asked the photographer to shoot it like documentation, not advertising, because the whole collection is about how clothes behave in real light on real people.",
      },
      {
        type: "quote",
        text: "The bungalow smelled of old paper and tide. You can see it in the frames.",
      },
    ],
  },
  {
    slug: "linen-ironed-wrong",
    title: "Linen, ironed wrong: a confession",
    excerpt:
      "Our founder spent a decade ironing linen flat. A Kyoto laundry master took one look and laughed. Here is what she was taught.",
    category: "Care School",
    date: "2026-06-05",
    readTime: 7,
    cover: img("1434389677669-e08b4cac3105"),
    blocks: [
      {
        type: "p",
        text: "The confession: for ten years I ironed linen bone-dry, press-hard, flat as a diploma. The result was fabric with the soul pressed out of it. Then, in a two-room laundry in Kyoto, I was laughed at kindly and thoroughly.",
      },
      { type: "h2", text: "Iron damp, iron high, iron wrong-side" },
      {
        type: "p",
        text: "Linen wants to be ironed damp — actually damp, from a sprayer, not from the iron's steam sneeze. Hot iron. Wrong side. And then, the part nobody tells you: hang it, and let it finish drying on the body of the hanger, so the last moisture sets the drape instead of a crease.",
      },
      { type: "h2", text: "The 20% rule" },
      {
        type: "p",
        text: "Iron to 80% smoothness and stop. The final 20% is what makes linen look like linen instead of like paper. Our Loom Co-ord is pre-washed twice precisely so it forgives this much.",
      },
    ],
  },
  {
    slug: "the-hands-that-hem",
    title: "The hands that hem Gumberi",
    excerpt:
      "Twenty-three finishers. Four hundred and six hours a week. A roll call of the people who touch your clothes last.",
    category: "Behind the Seams",
    date: "2026-05-02",
    readTime: 9,
    cover: img("1524758631624-e2822e304c36"),
    blocks: [
      {
        type: "p",
        text: "Before a Gumberi piece ships, it passes through the finishing room — a bright loft above the cutting floor where 23 people hand-roll, bar-tack, press and inspect every piece. This is a roll call.",
      },
      { type: "h2", text: "Sarala, 31 years" },
      {
        type: "p",
        text: "Sarala has hand-rolled more silk hems than anyone we know — about 60 a week, nine stitches to the inch. She can tell you which of our silks is pretending to be sandwashed just by touching it. Nothing pretending has ever passed her table.",
      },
      { type: "h2", text: "The price of hands" },
      {
        type: "p",
        text: "Hand finishing adds 18% to our cost. We publish that number because fast fashion would subtract it. When you pay ₹4,890 for the Aurelia, ₹874 of it is the difference between a machine hem and Sarala's.",
      },
    ],
  },
];

/* ── Stores ─────────────────────────────────────────────────── */

export const STORES: Store[] = [
  {
    city: "Mumbai",
    name: "Gumberi Kala Ghoda — Flagship",
    address: "14 Ropewalk Lane, Kala Ghoda, Fort, Mumbai 400001",
    hours: "Mon–Sat, 11:00–20:00",
    phone: "+91 22 4004 1926",
    image: img("1441986300917-64674bd600d8", 900),
  },
  {
    city: "New Delhi",
    name: "Gumberi Shahpur Jat",
    address: "48A, 1st Floor, Shahpur Jat, Siri Fort, New Delhi 110049",
    hours: "Mon–Sun, 11:00–20:30",
    phone: "+91 11 4103 8842",
    image: img("1555529669-e69e7aa0ba9a", 900),
  },
  {
    city: "Bengaluru",
    name: "Gumberi Indiranagar",
    address: "90/2, 100 Feet Road, Indiranagar, Bengaluru 560038",
    hours: "Mon–Sun, 11:00–21:00",
    phone: "+91 80 4166 7035",
    image: img("1441984904996-e0b6ba687e04", 900),
  },
  {
    city: "Hyderabad",
    name: "Gumberi Jubilee Hills",
    address: "Plot 824, Road No. 45, Jubilee Hills, Hyderabad 500033",
    hours: "Mon–Sun, 11:00–20:30",
    phone: "+91 40 2354 6619",
    image: img("1489987707025-afc232f7ea0f", 900),
  },
  {
    city: "Jaipur",
    name: "Gumberi Johari Bazaar",
    address: "Haldiyon ka Rasta, Johari Bazaar, Jaipur 302003",
    hours: "Mon–Sat, 11:00–20:00",
    phone: "+91 141 402 5578",
    image: img("1567401893414-76b7b1e5a7a5", 900),
  },
  {
    city: "Pune",
    name: "Gumberi Koregaon Park",
    address: "Lane 6, North Main Road, Koregaon Park, Pune 411001",
    hours: "Mon–Sun, 11:00–21:00",
    phone: "+91 20 6729 4410",
    image: img("1524758631624-e2822e304c36", 900),
  },
  {
    city: "Chennai",
    name: "Gumberi Nungambakkam",
    address: "22/3, Khader Nawaz Khan Road, Nungambakkam, Chennai 600034",
    hours: "Mon–Sun, 11:00–20:30",
    phone: "+91 44 2833 2290",
    image: img("1556905055-8f358a7a47b2", 900),
  },
  {
    city: "Kochi",
    name: "Gumberi Fort Kochi",
    address: "1/314A, Princess Street, Fort Kochi, Kochi 682001",
    hours: "Mon–Sun, 10:30–19:30",
    phone: "+91 484 2215 776",
    image: img("1434389677669-e08b4cac3105", 900),
  },
];

/* ── FAQs ───────────────────────────────────────────────────── */

export const FAQS: FaqGroup[] = [
  {
    title: "Orders & Payment",
    items: [
      {
        q: "How do I place an order?",
        a: "Add pieces to your bag, then head to checkout. You can check out as a guest or sign in to save your details. In demo mode, no real payment is taken — the whole flow is simulated.",
      },
      {
        q: "What payment methods do you accept?",
        a: "UPI, all major credit and debit cards, net banking, and cash on delivery up to ₹10,000. When Clerk and Convex keys are connected, saved cards appear at checkout.",
      },
      {
        q: "Can I change or cancel my order?",
        a: "Within 12 hours of placing it, yes — write to hello@gumberi.in with your order number and we will edit or cancel it. After 12 hours it enters the sewing floor queue and can no longer be changed.",
      },
    ],
  },
  {
    title: "Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Metros: 2–4 working days. Everywhere else in India: 4–7 working days. Made-to-hem pieces (marked on the product page) add 3 working days.",
      },
      {
        q: "Is shipping free?",
        a: "Complimentary shipping on all orders over ₹4,999. Below that, a flat ₹99 applies across India.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes — to 24 countries. International duties are calculated at checkout and shipping takes 7–12 working days.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "14 days, no questions, free pickup. Pieces must be unworn with tags on. Sale items are final sale — the dye lots make them one-off runs.",
      },
      {
        q: "How do exchanges work?",
        a: "Request an exchange from your account's Orders page. We ship the new size the day the pickup is scanned, so you are never waiting twice.",
      },
      {
        q: "When do refunds arrive?",
        a: "Refunds are initiated within 24 hours of pickup scan and reach your original payment method in 3–5 working days.",
      },
    ],
  },
  {
    title: "Sizing & Fit",
    items: [
      {
        q: "Do Gumberi sizes run true?",
        a: "Yes, cut on standard Indian sizing. Garment-dyed pieces like the Sahara Trench shrink up to half a size — we pre-shrink twice, but if you are between sizes, take the larger.",
      },
      {
        q: "Where are the size charts?",
        a: "Every product page has a 'Size & fit' accordion with a link to the full chart, including garment measurements taken flat.",
      },
    ],
  },
  {
    title: "Care",
    items: [
      {
        q: "How do I care for indigo pieces?",
        a: "Wash cold, separately, the first two times. Natural indigo will crock slightly onto light upholstery early on — this fades and is part of the material's honesty.",
      },
      {
        q: "Can I machine wash silk?",
        a: "Our sandwashed silks can be hand washed cold. Structured silks should be dry cleaned. Each product page lists its own care ritual.",
      },
    ],
  },
];

/* ── Styled combinations — outfit pairings ──────────────────── */

export type Combination = {
  slug: string;
  name: string;
  story: string;
  pieces: string[];
};

export const COMBINATIONS: Combination[] = [
  {
    slug: "the-ivory-hour-date",
    name: "The Ivory Hour Date",
    story:
      "Silk down low, leather on the pavement, brass catching the last light. The whole evening, decided at 4 p.m.",
    pieces: ["aurelia-slip-dress", "atelier-low-sneaker", "sunbridge-hoops"],
  },
  {
    slug: "monsoon-office-run",
    name: "Monsoon Office Run",
    story:
      "Linen that forgives humidity, boots that bite wet stone, and a tote that carries the laptop and the umbrella with equal dignity.",
    pieces: ["loom-linen-coord", "monsoon-chelsea-boot", "ralli-woven-tote"],
  },
  {
    slug: "terracotta-weekend",
    name: "Terracotta Weekend",
    story:
      "Camp collar open, selvedge straight, Kolhapuris braided and unbothered. Saturday from chai to sunset.",
    pieces: ["terracotta-camp-collar", "salt-denim-straight", "festival-kolhapuri-sandal"],
  },
  {
    slug: "wedding-season-day-two",
    name: "Wedding Season, Day Two",
    story:
      "The second function is where the real dressing happens — sandwashed silk, a swept midi, silver stacked thin.",
    pieces: ["sable-silk-blouse", "ivory-hour-midi-skirt", "tide-stacker-rings"],
  },
  {
    slug: "everyday-uniform-march",
    name: "Everyday Uniform: March",
    story:
      "Overshirt over pleats, suede on top. The twelve-piece logic compressed into one walk to work.",
    pieces: ["kaveri-overshirt", "wanderer-pleated-trousers", "dune-suede-cap"],
  },
  {
    slug: "the-long-flight",
    name: "The Long Flight",
    story:
      "Quilt for the cabin, loopwheel for the seat, folio for the passport. Fourteen hours, zero wrinkles that matter.",
    pieces: ["dusk-quilted-jacket", "indigo-band-tee", "leather-card-folio"],
  },
];

export const combinationBySlug = (slug: string) =>
  COMBINATIONS.find((c) => c.slug === slug);

/* ── Home-page imagery & game tiles ─────────────────────────── */

export const HERO = {
  images: [
    img("1490481651871-ab68de25d43d", 1800),
    img("1515372039744-b8f02a3ae446", 1800),
    img("1445205170230-053b83016050", 1800),
  ],
  craft: {
    cut: img("1556905055-8f358a7a47b2", 1400),
    dye: img("1558769132-cb1aea458c5e", 1400),
    stitch: img("1524758631624-e2822e304c36", 1400),
  },
  lookbook: img("1515886657613-9f3515b0c78f", 1800),
};

export const GAME_TILES: { id: string; image: string; label: string }[] = [
  { id: "aurelia", image: img("1515372039744-b8f02a3ae446", 500), label: "Aurelia Slip" },
  { id: "sahara", image: img("1539109136881-3be0616acf4b", 500), label: "Sahara Trench" },
  { id: "hoops", image: img("1611591437281-460bfbe1220a", 500), label: "Sunbridge Hoops" },
  { id: "tote", image: img("1548036328-c9fa89d128fa", 500), label: "Ralli Tote" },
  { id: "overshirt", image: img("1591047139829-d91aecb6caea", 500), label: "Kaveri Overshirt" },
  { id: "sneaker", image: img("1560343090-f0409e92791a", 500), label: "Atelier Low" },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const byCategory = (category: string) =>
  category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);
export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);
export const postBySlug = (slug: string) => JOURNAL.find((p) => p.slug === slug);
