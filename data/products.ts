// Exact Official Essae Digitronics Products & Solutions Catalog

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
    label: "All Products & Solutions",
    icon: "Grid",
    description: "Complete Essae Digitronics product & solution catalog",
    productCount: 15,
    color: "#1a3a6b",
    gradient: "from-navy-800 to-navy-600",
  },
  {
    id: "weighbridges",
    label: "Weighbridge Systems",
    icon: "Truck",
    description: "Heavy-duty steel, concrete, tuff track, flexi, weigh pads, and weigh-in-motion systems",
    productCount: 8,
    color: "#0a1628",
    gradient: "from-navy-900 to-navy-700",
  },
  {
    id: "solutions",
    label: "Industrial Solutions",
    icon: "Anchor",
    description: "Automated weighing, crusher management, intelligent terminals, silo & wheel loader solutions",
    productCount: 7,
    color: "#f97316",
    gradient: "from-orange-600 to-orange-400",
  },
];

export const products: Product[] = [
  // --- PRODUCTS (Weighbridges & Weighing Systems) ---
  {
    id: "steel-weighbridge",
    categoryId: "weighbridges",
    name: "Steel Weighbridge",
    model: "SWB-Series",
    shortDescription: "Heavy-duty steel deck weighbridge engineered for high traffic and extreme industrial loads.",
    fullDescription:
      "Essae Steel Weighbridge is built with high-tensile structural steel modules providing maximum strength and longevity. Equipped with digital load cells, lightning protection, and seamless integration with weighbridge management software.",
    specs: ["Capacity: 20T to 150T", "Structural Steel Deck", "IP-68 Digital Load Cells", "Software Integration"],
    isBestseller: true,
    imageGradient: "from-navy-900 via-navy-800 to-slate-800",
    imageIcon: "🚛",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "concrete-weighbridge",
    categoryId: "weighbridges",
    name: "Concrete Weighbridge",
    model: "CWB-Series",
    shortDescription: "Maintenance-free concrete deck weighbridge ideal for corrosive environments and heavy usage.",
    fullDescription:
      "Essae Concrete Deck Weighbridges feature RCC platform modules designed for extreme weather and chemical resistance. Offers zero rusting, low thermal expansion, and longer operational life with minimal maintenance.",
    specs: ["Capacity: 30T to 150T", "Pre-Cast Concrete Deck", "Corrosion Resistant", "NABL Calibrated"],
    isBestseller: true,
    imageGradient: "from-navy-800 via-navy-700 to-navy-600",
    imageIcon: "🏗️",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "tuff-track-weighbridge",
    categoryId: "weighbridges",
    name: "Tuff Track Weighbridge",
    model: "TT-Series",
    shortDescription: "Ultra-rugged weighbridge designed specifically for mining, quarry, and heavy construction sites.",
    fullDescription:
      "Tuff Track Weighbridges are built for off-road haulers and ultra-heavy mining vehicles. Features reinforced side rails, heavy beam construction, and impact-resistant load cell mountings.",
    specs: ["Capacity: 60T to 150T", "Reinforced Mining Structure", "High Impact Resistance", "Mud & Dust Protected"],
    isNew: true,
    imageGradient: "from-navy-900 via-navy-800 to-navy-700",
    imageIcon: "🪨",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "weigh-pads",
    categoryId: "weighbridges",
    name: "Weigh Pads",
    model: "WP-Mobile",
    shortDescription: "Portable wheel & axle weighing pads for quick on-site vehicle load monitoring.",
    fullDescription:
      "Essae Portable Weigh Pads offer convenient axle load measurements without needing a permanent foundation. Lightweight aluminum construction with wireless touchscreen display indicator.",
    specs: ["Capacity: 10T–30T per pad", "Portable Aluminum Build", "Wireless Indicator", "Battery Operated"],
    imageGradient: "from-navy-700 via-navy-600 to-orange-600",
    imageIcon: "📡",
    imageSrc: "/industrial-scales.png",
  },
  {
    id: "flexi-weighbridge",
    categoryId: "weighbridges",
    name: "Flexi Weighbridge",
    model: "FWB-Modular",
    shortDescription: "Modular relocatable weighbridge designed for easy disassembly and multi-site deployment.",
    fullDescription:
      "The Flexi Weighbridge allows fast setup without heavy civil foundations. Perfect for seasonal industries, project sites, and temporary logistics hubs requiring rapid relocation.",
    specs: ["Modular Bolt Design", "Quick Relocation", "Low Civil Works", "Digital Terminal Included"],
    imageGradient: "from-slate-700 via-navy-700 to-navy-800",
    imageIcon: "⚙️",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "rail-weigh-in-motion",
    categoryId: "weighbridges",
    name: "Rail Weigh in Motion",
    model: "RWIM-System",
    shortDescription: "Dynamic railway wagon weighing system measuring train weights while in motion.",
    fullDescription:
      "Essae Rail Weigh In Motion (RWIM) provides automatic, high-speed dynamic weighing of train wagons and locomotives without stopping. Fully compliant with Indian Railways standards.",
    specs: ["Speed: Up to 15 km/h", "Accuracy: ±0.5%", "Automatic Wagon Identification", "Railway Certified"],
    isNew: true,
    imageGradient: "from-navy-800 via-navy-700 to-navy-600",
    imageIcon: "🚂",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "truck-weigh-in-motion",
    categoryId: "weighbridges",
    name: "Truck Weigh In Motion",
    model: "TWIM-Express",
    shortDescription: "High-throughput weigh-in-motion system for highway toll gates and logistics plazas.",
    fullDescription:
      "Truck Weigh In Motion allows automated screening of overweight vehicles at highway speeds. Integrates with ANPR cameras, traffic signals, and central monitoring software.",
    specs: ["High Throughput Speed", "Overload Enforcement", "ANPR Camera Integration", "24/7 Continuous Rating"],
    imageGradient: "from-orange-600 via-orange-500 to-orange-400",
    imageIcon: "🛣️",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "digital-weighbridge",
    categoryId: "weighbridges",
    name: "Digital Weighbridge",
    model: "DWB-Smart",
    shortDescription: "IoT-enabled smart weighbridge featuring encrypted digital load cells and cloud analytics.",
    fullDescription:
      "Digital Weighbridge utilizes end-to-end digital communication preventing signal tampering, noise interference, and fraud. Features automated ticketing, RFID scanning, and cloud management dashboard.",
    specs: ["Encrypted Digital Signal", "RFID / Gate Automation", "Cloud Dashboard", "Anti-Tamper Technology"],
    isBestseller: true,
    imageGradient: "from-navy-900 via-navy-800 to-navy-700",
    imageIcon: "💻",
    imageSrc: "/weighbridge.png",
  },

  // --- SOLUTIONS ---
  {
    id: "automatic-weighing-solution",
    categoryId: "solutions",
    name: "Automatic Weighing Solution",
    model: "AWS-Smart",
    shortDescription: "Unmanned, fully automated weighbridge system with RFID, barrier gates, and camera integration.",
    fullDescription:
      "Essae Automatic Weighing Solution eliminates human intervention and errors. Features automatic driver ticketing, boom barriers, license plate cameras, and ERP data sync.",
    specs: ["Unmanned Operation", "Boom Barrier Control", "ANPR Camera Sync", "ERP Integration"],
    isBestseller: true,
    imageGradient: "from-orange-600 via-navy-800 to-navy-900",
    imageIcon: "🤖",
    imageSrc: "/crane-scale.png",
  },
  {
    id: "crusher-production-management",
    categoryId: "solutions",
    name: "Crusher Production Management System",
    model: "CPMS-Pro",
    shortDescription: "Comprehensive weight management & batching system engineered for stone crushers & quarries.",
    fullDescription:
      "CPMS-Pro tracks raw material intake, crushing output, stock levels, and dispatch billing in real time. Generates automated reports for quarry owners and operational managers.",
    specs: ["Real-Time Output Tracking", "Dispatch Billing", "Stockpile Management", "Custom Reports"],
    imageGradient: "from-navy-900 via-orange-600 to-orange-500",
    imageIcon: "🪨",
    imageSrc: "/crane-scale.png",
  },
  {
    id: "intelligent-weighing-terminal",
    categoryId: "solutions",
    name: "Intelligent Weighing Terminal",
    model: "IWT-5000",
    shortDescription: "Touchscreen industrial terminal designed for direct weighbridge & process control.",
    fullDescription:
      "The Intelligent Weighing Terminal is a rugged industrial computer with touchscreen display, internal database, thermal printer interface, and multi-protocol network support.",
    specs: ["Industrial Touchscreen", "Local SQL Database", "Thermal Printer Ready", "RS-485 / Ethernet / Wi-Fi"],
    isNew: true,
    imageGradient: "from-navy-800 via-navy-700 to-navy-500",
    imageIcon: "🖥️",
    imageSrc: "/gps-clock.png",
  },
  {
    id: "silo-weighing-solutions",
    categoryId: "solutions",
    name: "Silo Weighing Solutions",
    model: "SWS-Level",
    shortDescription: "Precision load cell mounting kits for real-time inventory monitoring of silos, tanks, and hoppers.",
    fullDescription:
      "Essae Silo Weighing Solutions transform any storage tank or silo into an accurate inventory scale. Built-in lift-off protection and thermal expansion compensators ensure continuous accurate readings.",
    specs: ["Capacity per leg: 1T–100T", "Anti-Lift Protection", "4-20mA / MODBUS Output", "ATEX Explosion Proof"],
    imageGradient: "from-navy-700 via-navy-600 to-navy-800",
    imageIcon: "🏭",
    imageSrc: "/crane-scale.png",
  },
  {
    id: "granite-weighing-solutions",
    categoryId: "solutions",
    name: "Granite Weighing Solutions",
    model: "GWS-Heavy",
    shortDescription: "Heavy-capacity block scales built to handle massive granite & marble stone blocks.",
    fullDescription:
      "Designed specifically for granite quarries and processing yards, GWS-Heavy features impact-absorbing top decks capable of handling dropped granite blocks up to 80 tonnes.",
    specs: ["Capacity: 40T to 80T", "Impact Shock Absorbers", "Heavy Steel Construction", "Dust & Water Proof"],
    imageGradient: "from-slate-700 via-navy-700 to-navy-800",
    imageIcon: "🧱",
    imageSrc: "/weighbridge.png",
  },
  {
    id: "wheel-loader-weighing-solutions",
    categoryId: "solutions",
    name: "Wheel Loader Weighing Solutions",
    model: "WLW-Onboard",
    shortDescription: "Onboard dynamic bucket scale for front-end wheel loaders preventing truck overloading.",
    fullDescription:
      "WLW-Onboard measures load weight in the loader bucket during lifting. Helps operators load trucks to target legal capacity on the first pass, eliminating trip delays and re-weighing.",
    specs: ["Dynamic Lift Weighing", "Target Weight Alert", "In-Cab Printer", "Rugged Hydraulic Sensors"],
    isNew: true,
    imageGradient: "from-orange-500 via-orange-400 to-navy-600",
    imageIcon: "🚜",
    imageSrc: "/crane-scale.png",
  },
  {
    id: "accutrol",
    categoryId: "solutions",
    name: "AccuTrol",
    model: "AccuTrol-Batch",
    shortDescription: "Advanced weight batching & ingredient dosing controller for automated process industries.",
    fullDescription:
      "AccuTrol is a high-speed multi-ingredient batch controller for chemical, pharma, feed, and concrete batching plants. Delivers precise feed/dosing control with recipe management.",
    specs: ["Multi-Ingredient Dosing", "High Speed 400 Samples/Sec", "Recipe Memory: 100+", "PLC / SCADA Connect"],
    isBestseller: true,
    imageGradient: "from-navy-900 via-navy-800 to-navy-700",
    imageIcon: "🎛️",
    imageSrc: "/gps-clock.png",
  },
];

export const sortOptions = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "newest", label: "Newest First" },
  { value: "bestseller", label: "Bestsellers" },
];
