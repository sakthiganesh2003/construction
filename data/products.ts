// Product Categories and Product Data for Essae Digitronics

export type ProductCategory = {
  id: string;
  label: string;
  icon: string;
  description: string;
  productCount: number;
  color: string;
  gradient: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  model: string;
  shortDescription: string;
  fullDescription: string;
  specs: string[];
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  imageGradient: string;
  imageIcon: string;
  imageSrc: string;
};

export const categories: ProductCategory[] = [
  {
    id: "all",
    label: "All Products",
    icon: "Grid",
    description: "View complete product catalog",
    productCount: 14,
    color: "#1a3a6b",
    gradient: "from-navy-800 to-navy-600",
  },
  {
    id: "industrial-scales",
    label: "Industrial Scales",
    icon: "Scale",
    description: "Heavy-duty platform, bench & counting scales for manufacturing, pharma, and logistics",
    productCount: 4,
    color: "#0a1628",
    gradient: "from-navy-900 to-navy-700",
  },
  {
    id: "weighbridges",
    label: "Weighbridges",
    icon: "Truck",
    description: "Static, portable, and dynamic weighbridge systems for vehicle & rail weighing",
    productCount: 3,
    color: "#1a3a6b",
    gradient: "from-navy-700 to-navy-500",
  },
  {
    id: "retail-pos",
    label: "Retail POS",
    icon: "ShoppingCart",
    description: "Integrated POS scales with label and receipt printing for retail & inventory",
    productCount: 2,
    color: "#f97316",
    gradient: "from-orange-600 to-orange-400",
  },
  {
    id: "milk-analysers",
    label: "Milk Analysers",
    icon: "FlaskConical",
    description: "Ultrasonic and lab-grade milk analysers for fat, SNF, and protein measurement",
    productCount: 2,
    color: "#0f2040",
    gradient: "from-navy-800 to-navy-600",
  },
  {
    id: "gps-clocks",
    label: "GPS Clocks",
    icon: "Clock",
    description: "High-precision GPS-synchronized master clocks and NTP servers",
    productCount: 2,
    color: "#1e4d8c",
    gradient: "from-navy-600 to-navy-400",
  },
  {
    id: "crane-systems",
    label: "Crane & Hoisting",
    icon: "Anchor",
    description: "Heavy-duty crane scales and custom tank/hopper weighing systems",
    productCount: 2,
    color: "#ea6c00",
    gradient: "from-orange-600 to-orange-500",
  },
];

export const products: Product[] = [
  // Industrial Scales
  {
    id: "si-850",
    categoryId: "industrial-scales",
    name: "Bench & System Scale",
    model: "SI-850",
    shortDescription: "Versatile bench scale designed for chemical, engineering, and food processing industries.",
    fullDescription:
      "The SI-850 is a robust bench scale built for demanding industrial environments. Features an RS-232 interface for seamless data integration and an IP-rated enclosure for protection against dust and moisture.",
    specs: ["Capacity: 6kg–150kg", "Resolution: 0.1g", "RS-232 Interface", "IP-54 Protection"],
    isBestseller: true,
    imageGradient: "from-navy-900 via-navy-800 to-navy-700",
    imageIcon: "⚖️",
    imageSrc: "/industrial-scales.png",
  },
  {
    id: "ds-410",
    categoryId: "industrial-scales",
    name: "Heavy-Duty Platform Scale",
    model: "DS-410",
    shortDescription: "Stainless steel platform scale engineered for harsh industrial environments.",
    fullDescription:
      "The DS-410 series is designed with a stainless steel platform for chemical and food industry compliance. IP-68 rated and compatible with ERP and production management software.",
    specs: ["Capacity: 60kg–3000kg", "Stainless Steel Platform", "IP-68 Rated", "ERP Compatible"],
    imageGradient: "from-navy-800 via-navy-700 to-navy-600",
    imageIcon: "🏭",
    imageSrc: "/industrial-scales.png",
  },
  {
    id: "dc-810",
    categoryId: "industrial-scales",
    name: "High-Precision Counting Scale",
    model: "DC-810",
    shortDescription: "Advanced counting scale for precise component counting in manufacturing and logistics.",
    fullDescription:
      "The DC-810 series delivers exceptional counting accuracy using advanced sensor technology. Ideal for quality control, logistics, and parts inventory management.",
    specs: ["Accuracy: ±0.01g", "Piece Count Memory", "USB / RS-232 / RS-485", "OIML Approved"],
    isNew: true,
    imageGradient: "from-navy-700 via-navy-600 to-navy-500",
    imageIcon: "🔢",
    imageSrc: "/industrial-scales.png",
  },
  {
    id: "fs-series",
    categoryId: "industrial-scales",
    name: "Floor Scale Series",
    model: "FS-Series",
    shortDescription: "Low-profile floor scales for pallet and bulk material weighing in warehouses.",
    fullDescription:
      "The FS Series floor scales feature a low deck height and high-capacity load cells for accurate pallet and bulk material weighing in logistics and manufacturing.",
    specs: ["Capacity: 300kg–5000kg", "Low Profile Deck", "Forklift Compatible", "Anti-Slip Surface"],
    imageGradient: "from-slate-700 via-navy-700 to-navy-800",
    imageIcon: "📦",
    imageSrc: "/industrial-scales.png",
  },

  // Weighbridges
  {
    id: "ewb-static",
    categoryId: "weighbridges",
    name: "Static Electronic Weighbridge",
    model: "EWB-150",
    shortDescription: "High-capacity static weighbridge for standard vehicle weighing operations.",
    fullDescription:
      "The EWB-150 static electronic weighbridge handles trucks and heavy vehicles up to 150 tonnes. Modular design allows easy installation and expansion.",
    specs: ["Capacity: Up to 150T", "Modular Design", "NABL Calibrated", "Remote Display"],
    isBestseller: true,
    imageGradient: "from-navy-900 via-navy-800 to-slate-800",
    imageIcon: "🚛",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "rwim",
    categoryId: "weighbridges",
    name: "Rail Weigh-in-Motion",
    model: "RWIM-Pro",
    shortDescription: "Dynamic weighing system for accurate rail car and locomotive weight measurement.",
    fullDescription:
      "The RWIM-Pro system provides real-time dynamic weighing of rail cars in motion. Compliant with Indian Railways standards and integrates with central control systems.",
    specs: ["Speed: Up to 15 km/h", "Accuracy: ±0.5%", "IR Sensor Integration", "Railway Compliant"],
    isNew: true,
    imageGradient: "from-navy-800 via-navy-700 to-navy-600",
    imageIcon: "🚂",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "paw",
    categoryId: "weighbridges",
    name: "Portable Axle Weighbridge",
    model: "PAW-40",
    shortDescription: "Mobile axle weighing system for on-site vehicle weight enforcement.",
    fullDescription:
      "The PAW-40 portable axle weighbridge is a compact, battery-powered solution for field vehicle weighing. Ideal for highway enforcement and field operations.",
    specs: ["Capacity: 20T per axle", "Battery Powered", "Wireless Data Transfer", "Portable Setup"],
    imageGradient: "from-navy-700 via-navy-600 to-orange-600",
    imageIcon: "📡",
    imageSrc: "/weighbridge.png",
  },

  // Retail POS
  {
    id: "eps-30",
    categoryId: "retail-pos",
    name: "POS Label Printing Scale",
    model: "EPS-30",
    shortDescription: "Integrated POS scale with high-speed thermal label printing for retail operations.",
    fullDescription:
      "The EPS-30 combines precision weighing with high-speed thermal label printing. It supports barcode and QR code printing, PLU management, and connects directly to POS software.",
    specs: ["PLU Memory: 5000+", "Thermal Label Printer", "Barcode / QR Support", "Touch Display"],
    isBestseller: true,
    badge: "Popular",
    imageGradient: "from-orange-600 via-orange-500 to-orange-400",
    imageIcon: "🏪",
    imageSrc: "/retail-pos.png",
  },
  {
    id: "ds-688",
    categoryId: "retail-pos",
    name: "Receipt Printing Scale",
    model: "DS-688",
    shortDescription: "Multi-function retail scale with dual display and receipt printing for supermarkets.",
    fullDescription:
      "The DS-688 is ideal for supermarket checkout counters. Features dual customer and operator displays, built-in receipt printer, and support for departmental pricing.",
    specs: ["Capacity: 15kg / 30kg", "Dual Display", "Built-in Printer", "Department Pricing"],
    imageGradient: "from-orange-500 via-orange-400 to-navy-600",
    imageIcon: "🧾",
    imageSrc: "/retail-pos.png",
  },

  // Milk Analysers
  {
    id: "milkotest-pro",
    categoryId: "milk-analysers",
    name: "Milk Analyser",
    model: "MILKOTEST Pro",
    shortDescription: "Ultrasonic milk analyser measuring fat, SNF, protein, density, and temperature.",
    fullDescription:
      "The MILKOTEST Pro uses ultrasonic technology to deliver rapid, accurate milk quality analysis. Measures up to 9 parameters in under 60 seconds. Widely used in dairy cooperatives and collection centres.",
    specs: ["Parameters: Fat, SNF, Protein, Density", "Result Time: <60 seconds", "Sample Volume: 10ml", "AGMARK Approved"],
    isBestseller: true,
    imageGradient: "from-navy-800 via-navy-700 to-navy-600",
    imageIcon: "🥛",
    imageSrc: "/milk-analyser.png",
  },
  {
    id: "milkotest-ultra",
    categoryId: "milk-analysers",
    name: "Lab-Grade Milk Analyser",
    model: "MILKOTEST Ultra",
    shortDescription: "High-accuracy lab-grade analyser for multi-parameter milk quality testing.",
    fullDescription:
      "The MILKOTEST Ultra provides laboratory-grade accuracy for dairy quality control labs. Supports 12+ parameters and connects to LIMS systems for automated data management.",
    specs: ["12+ Parameters", "Accuracy: ±0.03% Fat", "LIMS Integration", "Auto-Cleaning"],
    isNew: true,
    imageGradient: "from-navy-900 via-navy-800 to-navy-700",
    imageIcon: "🔬",
    imageSrc: "/milk-analyser.png",
  },

  // GPS Clocks
  {
    id: "gps-100",
    categoryId: "gps-clocks",
    name: "GPS Master Clock",
    model: "GPS-100",
    shortDescription: "High-precision GPS-synchronized master clock for industrial and institutional use.",
    fullDescription:
      "The GPS-100 Master Clock provides GPS-disciplined time synchronization with accuracy better than 1 microsecond. Powers a network of secondary clocks across large facilities.",
    specs: ["Accuracy: <1 μs", "GPS Disciplined", "Supports 100+ Slaves", "SNTP / NTP Output"],
    imageGradient: "from-navy-800 via-navy-700 to-navy-500",
    imageIcon: "🛰️",
    imageSrc: "/gps-clock.png",
  },
  {
    id: "gps-200",
    categoryId: "gps-clocks",
    name: "Network Time Server",
    model: "GPS-200",
    shortDescription: "Enterprise NTP server with GPS sync for mission-critical time infrastructure.",
    fullDescription:
      "The GPS-200 is an enterprise-grade NTP server with GPS and GLONASS synchronization. Provides Stratum 1 time accuracy for banking, telecom, and industrial networks.",
    specs: ["Stratum 1 Accuracy", "GPS + GLONASS", "Dual Ethernet", "SNMP Management"],
    isNew: true,
    imageGradient: "from-navy-700 via-navy-600 to-navy-800",
    imageIcon: "🕐",
    imageSrc: "/gps-clock.png",
  },

  // Crane Systems
  {
    id: "cw-500",
    categoryId: "crane-systems",
    name: "Heavy-Duty Crane Scale",
    model: "CW-500",
    shortDescription: "Industrial crane scale for accurate hanging load measurement in heavy industries.",
    fullDescription:
      "The CW-500 crane scale is rated for loads up to 500 tonnes. Features wireless display, overload protection, and a stainless steel enclosure for use in steel, cement, and port operations.",
    specs: ["Capacity: Up to 500T", "Wireless Display", "IP-65 Enclosure", "Overload Protection"],
    imageGradient: "from-orange-600 via-navy-800 to-navy-900",
    imageIcon: "🏗️",
    imageSrc: "/crane-scale.png",
  },
  {
    id: "tank-weigh",
    categoryId: "crane-systems",
    name: "Tank & Hopper Weighing",
    model: "TWS-Pro",
    shortDescription: "Custom-engineered load cell systems for tanks, hoppers, and silos.",
    fullDescription:
      "The TWS-Pro is a complete weighing solution for tanks and hoppers. Uses compression or tension load cells and integrates with process control systems for automated batching.",
    specs: ["Custom Capacity Range", "Process Control Integration", "Multi-Zone Support", "ATEX Available"],
    imageGradient: "from-navy-900 via-orange-600 to-orange-500",
    imageIcon: "⚙️",
    imageSrc: "/crane-scale.png",
  },
];

export const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "newest", label: "Newest First" },
  { value: "bestseller", label: "Bestsellers" },
];
