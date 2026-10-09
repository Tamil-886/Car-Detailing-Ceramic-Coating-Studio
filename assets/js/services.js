/**
 * APEX OBSIDIAN | 20 Bespoke Detailing Services Engine & Multi-Filter Suite
 * assets/js/services.js
 */

(function () {
  'use strict';

  const SIZE_KEY = 'apex_vehicle_size';
  const SERVICES_DATA = [
  {
    "id": "premium-exterior-detailing",
    "slug": "premium-exterior-detailing",
    "fileName": "premium-exterior-detailing.html",
    "title": "Premium Exterior Detailing",
    "category": "Exterior",
    "categorySlug": "exterior",
    "tagline": "Multi-Stage pH-Neutral Citrus Decon Wash & High-Gloss Fluoropolymer Seal",
    "shortDesc": "Complete exterior transformation featuring 3-bucket snow foam wash, iron fallout dissolution, synthetic clay bar glide, wheel barrel scrub, and 6-month synthetic paint sealant.",
    "longDesc": "Our Premium Exterior Detailing goes far beyond a conventional car wash. We utilize a surgical, scratch-free multi-stage decontamination process designed to eliminate traffic film, tree sap, industrial fallout, and brake dust without introducing micro-marring into your factory clearcoat.",
    "prices": {
      "hatchback": 2999,
      "sedan": 3499,
      "suv": 4299,
      "luxury": 5499,
      "sports": 5999
    },
    "duration": "3 to 4 Hours",
    "warranty": "6-Month Studio Shield",
    "badge": "Exterior Signature",
    "rating": 4.9,
    "reviewsCount": 128,
    "popularity": 98,
    "createdDate": "2024-03-01",
    "image": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "High-foaming citrus pre-wash & snow foam bath",
      "Two-bucket scratch-free wash with micro-chenille mitts & grit guards",
      "Chemical iron fallout dissolution & organic tar removal",
      "Fine-grade synthetic clay bar treatment on all painted surfaces",
      "Deep alloy wheel face, inner barrel, and caliper detailing",
      "Touchless filtered warm-air drying of crevices & door jambs",
      "6-Month fluoropolymer synthetic gloss sealant application",
      "Satin UV-resistant tyre dressing & exterior trim restoration"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Citrus Pre-Wash & Foam",
        "desc": "Lifting surface grit safely with pH-neutral snow foam before touch contact."
      },
      {
        "num": 2,
        "title": "Chemical Decontamination",
        "desc": "Dissolving embedded iron brake dust particles and asphalt tar spots."
      },
      {
        "num": 3,
        "title": "Clay Bar Treatment",
        "desc": "Mechanical shearing of sub-surface impurities for glass-smooth clearcoat."
      },
      {
        "num": 4,
        "title": "Sealant & Trim Dressing",
        "desc": "Infusing durable hydrophobic fluoropolymer seal with high-depth gloss."
      }
    ],
    "faqs": [
      {
        "q": "How often should I get Premium Exterior Detailing done?",
        "a": "For daily driven vehicles, we recommend every 3 to 4 months to maintain paint slickness, prevent clearcoat oxidation, and protect against environmental contaminants."
      },
      {
        "q": "Does this service remove scratches and swirl marks?",
        "a": "Exterior detailing enhances gloss and removes light surface haze. For 90%+ scratch and swirl removal, we recommend our Multi-Stage Paint Correction service."
      },
      {
        "q": "Will this wash strip my existing ceramic coating or wax?",
        "a": "No, all our shampoos and decontamination agents are 100% pH-neutral and specifically formulated to be safe for ceramic coatings, PPF, and waxes."
      }
    ],
    "relatedIds": [
      "ceramic-coating",
      "paint-correction",
      "alloy-wheel-detailing"
    ]
  },
  {
    "id": "interior-deep-cleaning",
    "slug": "interior-deep-cleaning",
    "fileName": "interior-deep-cleaning.html",
    "title": "Interior Deep Cleaning",
    "category": "Interior",
    "categorySlug": "interior",
    "tagline": "180°C Dry Vapor Steam Extraction & Medical-Grade Cabin Sanitization",
    "shortDesc": "Hospital-grade steam extraction of upholstery, leather conditioning, AC vent disinfection, deep carpet shampoo, and non-greasy factory matte UV dressing.",
    "longDesc": "Restore your vehicle cabin to pristine showroom condition. Our Interior Deep Cleaning eradicates embedded dust mites, allergens, stubborn stains, and bacteria using high-pressure 180°C dry vapor steam and Swissvax natural nourishment agents.",
    "prices": {
      "hatchback": 3499,
      "sedan": 3999,
      "suv": 4799,
      "luxury": 5999,
      "sports": 6499
    },
    "duration": "4 to 5 Hours",
    "warranty": "Anti-Bacterial Shield",
    "badge": "Sanitized Cabin",
    "rating": 4.9,
    "reviewsCount": 142,
    "popularity": 96,
    "createdDate": "2024-03-02",
    "image": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "High-velocity compressed air purge of seat seams, crevices & air ducts",
      "180°C Dry vapor steam sterilization of HVAC vents and dashboard panels",
      "Deep hot-water injection extraction on all carpet flooring and floor mats",
      "Gentle pH-balanced leather scrub with horsehair brushes",
      "Swissvax natural lipid leather conditioning & anti-dye transfer barrier",
      "Headliner spot cleaning & sun visor de-greasing",
      "Crystal-clear interior glass streak-free cleaning",
      "Natural fragrance neutralizer leaving a fresh, authentic clean scent"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Air Purge & Deep Vacuum",
        "desc": "Evacuating sand and debris from deep carpet fibers and seat seams."
      },
      {
        "num": 2,
        "title": "180°C Vapor Steam Sanitization",
        "desc": "Thermal sterilization of air vents, cup holders, and high-touch areas."
      },
      {
        "num": 3,
        "title": "Hot Water Extraction",
        "desc": "Injecting heated enzyme shampoo and vacuuming deep ground-in dirt."
      },
      {
        "num": 4,
        "title": "Leather Feed & UV Dressing",
        "desc": "Nourishing hides with matte non-greasy lipids and UV blockers."
      }
    ],
    "faqs": [
      {
        "q": "Will my seats remain wet after the interior cleaning?",
        "a": "No, our commercial extraction equipment removes 95% of moisture, and heated air movers ensure seats are completely dry within 1 hour."
      },
      {
        "q": "Can this service remove severe smoke or pet odors?",
        "a": "Yes, our steam extraction and antibacterial treatment eliminate the source of odors. For extreme cases, we also offer our dedicated Ozone Odor Removal Treatment."
      },
      {
        "q": "Are your cleaning chemicals safe for children and pets?",
        "a": "Yes, we use 100% biodegradable, non-toxic, and hypoallergenic enzymatic cleaners."
      }
    ],
    "relatedIds": [
      "leather-cleaning-conditioning",
      "fabric-upholstery-cleaning",
      "odor-removal-treatment"
    ]
  },
  {
    "id": "full-car-detailing",
    "slug": "full-car-detailing",
    "fileName": "full-car-detailing.html",
    "title": "Full Car Detailing",
    "category": "Detailing",
    "categorySlug": "detailing",
    "tagline": "Complete 360° Studio Transformation: Exterior Jewelling, Interior Spa & Engine Bay",
    "shortDesc": "The ultimate bumper-to-bumper reset combining multi-stage exterior decontamination, single-stage gloss enhancement polish, deep interior steam spa, and engine bay detailing.",
    "longDesc": "Experience complete automotive rejuvenation. Full Car Detailing unites our signature exterior machine polish, complete interior upholstery & leather extraction, and engine bay aesthetics into a single, comprehensive cleanroom service.",
    "prices": {
      "hatchback": 6999,
      "sedan": 7999,
      "suv": 9499,
      "luxury": 11999,
      "sports": 13499
    },
    "duration": "7 to 9 Hours",
    "warranty": "1-Year Gloss Protection",
    "badge": "Complete Reset",
    "rating": 5,
    "reviewsCount": 215,
    "popularity": 99,
    "createdDate": "2024-03-03",
    "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "Complete 48-point exterior decontamination & clay bar treatment",
      "Single-stage DA rotary jewelling polish to boost gloss and remove light haze",
      "Full interior 180°C steam extraction, carpet shampoo & leather nutrition",
      "Optical cleanroom engine bay degreasing and satin component dress",
      "Wheels-on deep barrel scrub, iron dissolve & caliper detail",
      "Exhaust tip stainless steel metal polishing",
      "12-Month fluoropolymer hydrophobic ceramic spray sealant",
      "Complete interior glass and panoramic roof clarity treatment"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Exterior Decon & Engine Bay",
        "desc": "Thorough foam wash, iron dissolve, claying, and safe engine bay cleaning."
      },
      {
        "num": 2,
        "title": "Machine Jewelling Polish",
        "desc": "Rotary refinement removing micro-swirls and restoring deep reflection."
      },
      {
        "num": 3,
        "title": "Interior Vapor Spa",
        "desc": "Deep extraction shampoo on carpets, steam cleaning, and leather feed."
      },
      {
        "num": 4,
        "title": "Protection & Final Inspection",
        "desc": "Applying durable paint sealant, tyre dressing, and 48-point audit."
      }
    ],
    "faqs": [
      {
        "q": "How long does a Full Car Detailing take?",
        "a": "Typically 7 to 9 hours of dedicated cleanroom work by a team of two certified master detailers."
      },
      {
        "q": "Is this suitable for brand new cars?",
        "a": "Absolutely. Dealership delivery often includes swirl marks and transport fallout; this service establishes the perfect baseline protection."
      }
    ],
    "relatedIds": [
      "ceramic-coating",
      "interior-deep-cleaning",
      "paint-correction"
    ]
  },
  {
    "id": "ceramic-coating",
    "slug": "ceramic-coating",
    "fileName": "ceramic-coating.html",
    "title": "Ceramic Coating",
    "category": "Protection",
    "categorySlug": "protection",
    "tagline": "10H Hardness Inorganic Liquid Glass Matrix with 7-Year Transferable Warranty",
    "shortDesc": "Permanent covalent bond over factory clearcoat providing diamond-hard 10H scratch resistance, 118° hydrophobic water beading, and mirror liquid gloss.",
    "longDesc": "The gold standard in automotive paint protection. Our 10H Nanoceramic Glass Matrix chemically bonds at a molecular level with your vehicle clearcoat, producing a hardened sacrificial glass shield impervious to UV rays, acid rain, bird droppings, and chemical fallout.",
    "prices": {
      "hatchback": 15999,
      "sedan": 18999,
      "suv": 22999,
      "luxury": 27999,
      "sports": 31999
    },
    "duration": "2 to 3 Days",
    "warranty": "7-Year Certified",
    "badge": "10H Flagship",
    "rating": 5,
    "reviewsCount": 310,
    "popularity": 100,
    "createdDate": "2024-03-04",
    "image": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "Multi-stage paint correction to achieve 95%+ optically flat clearcoat",
      "Isopropanol solvent wipe-down to sterilize paint surface",
      "Dual-layer 10H nanoceramic inorganic SiO2 basecoat application",
      "118° Hydrophobic fluoropolymer topcoat for maximum water beading",
      "Infrared short-wave heat baking at 65°C on every panel",
      "All glass & windshield fluoropolymer rain repellent coating",
      "Wheel faces and brake caliper ceramic infusion",
      "Official registered 7-Year Transferable Digital E-Warranty certificate"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Paint Correction Polish",
        "desc": "Eliminating clearcoat defects and leveling surface to 99.8 GU gloss."
      },
      {
        "num": 2,
        "title": "Nanoceramic Base Application",
        "desc": "Applying 10H SiO2 matrix in cross-hatch strokes with micro-leveling."
      },
      {
        "num": 3,
        "title": "Hydrophobic Topcoat",
        "desc": "Layering slick fluoropolymer coat for extreme self-cleaning performance."
      },
      {
        "num": 4,
        "title": "Infrared Lamp Curing",
        "desc": "Thermal baking under short-wave IR lamps for permanent crystal hardness."
      }
    ],
    "faqs": [
      {
        "q": "How does ceramic coating protect my car?",
        "a": "It forms a permanent, glass-like quartz layer that prevents micro-scratching, chemical etching from bird droppings, UV oxidation, and makes washing effortless."
      },
      {
        "q": "How do I maintain a ceramic-coated car?",
        "a": "Simply wash with pH-neutral shampoo and use clean microfiber towels. We also recommend an annual Ceramic Maintenance Treatment."
      }
    ],
    "relatedIds": [
      "paint-correction",
      "graphene-coating",
      "ceramic-maintenance-treatment"
    ]
  },
  {
    "id": "paint-correction",
    "slug": "paint-correction",
    "fileName": "paint-correction.html",
    "title": "Paint Correction",
    "category": "Paint Care",
    "categorySlug": "paint-care",
    "tagline": "Surgical Clearcoat Leveling Eliminating 95%+ Swirls, Scratches & Buffer Holograms",
    "shortDesc": "Multi-stage rotary and dual-action compounding with diminishing micro-abrasives under 96+ CRI Scangrip inspection lighting to achieve optical mirror reflection.",
    "longDesc": "Transform dull, swirled paint into a breathtaking liquid mirror. Our multi-stage paint correction surgically levels microscopic clearcoat imperfections, removing spiderweb scratches, wash marring, sanding marks, and oxidation while preserving clearcoat thickness.",
    "prices": {
      "hatchback": 7499,
      "sedan": 8499,
      "suv": 10499,
      "luxury": 12999,
      "sports": 14499
    },
    "duration": "1 to 2 Days",
    "warranty": "99.8 GU Gloss Level",
    "badge": "95%+ Defect Removal",
    "rating": 4.9,
    "reviewsCount": 184,
    "popularity": 97,
    "createdDate": "2024-03-05",
    "image": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "48-Point ultrasonic clearcoat thickness audit across all panels",
      "Stage 1: Heavy compounding to eliminate deep wash swirls & water etching",
      "Stage 2: Medium micro-abrasive polishing to eliminate compounding haze",
      "Stage 3: Ultra-fine jewelling pass to achieve maximum gloss depth (99.8 GU)",
      "Scangrip 96+ CRI multi-spectrum lighting verification during every pass",
      "Edge masking of all rubber moldings, trim, and badges with Japanese tape",
      "Pure isopropanol solvent wash to inspect true bare finish without fillers",
      "Application of high-grade synthetic gloss sealant or ceramic primer"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Ultrasonic Depth Mapping",
        "desc": "Digital mil-gauge audit ensuring safe clearcoat threshold preservation."
      },
      {
        "num": 2,
        "title": "Heavy Compounding Cut",
        "desc": "Leveling ridges and eliminating 90%+ of spiderweb swirls and scratches."
      },
      {
        "num": 3,
        "title": "Refining Polish",
        "desc": "Clearing micro-marring and compounding haze with open-cell foam pads."
      },
      {
        "num": 4,
        "title": "Jewelling Finish",
        "desc": "Ultra-fine finishing pass producing 3D optical clarity and depth."
      }
    ],
    "faqs": [
      {
        "q": "Will paint correction make my clearcoat too thin?",
        "a": "No, we measure paint thickness digitally before polishing. Our technique removes only 1.5 to 2.5 microns of clearcoat, leaving factory integrity intact."
      },
      {
        "q": "Should I get Ceramic Coating after Paint Correction?",
        "a": "Yes, once paint is optically corrected, applying Ceramic Coating or PPF locks in the flawless finish permanently."
      }
    ],
    "relatedIds": [
      "ceramic-coating",
      "scratch-swirl-removal",
      "paint-protection-film"
    ]
  },
  {
    "id": "paint-protection-film",
    "slug": "paint-protection-film",
    "fileName": "paint-protection-film.html",
    "title": "Paint Protection Film (PPF)",
    "category": "Protection",
    "categorySlug": "protection",
    "tagline": "Self-Healing 8-Mil Polyurethane Armor Protecting Against Highway Rock Chips",
    "shortDesc": "Optically clear thermoplastic polyurethane (TPU) film with instant heat-activated self-healing topcoat, computer CAD templated and edge-wrapped.",
    "longDesc": "The ultimate physical shield for high-impact zones. Our 8-mil TPU Paint Protection Film absorbs heavy gravel strikes, key scratches, road salt, and bug acid, self-healing scratches within seconds when exposed to engine heat or sunlight.",
    "prices": {
      "hatchback": 38000,
      "sedan": 45000,
      "suv": 55000,
      "luxury": 68000,
      "sports": 75000
    },
    "duration": "3 to 4 Days",
    "warranty": "10-Year Anti-Yellowing",
    "badge": "Self-Healing 8mil",
    "rating": 5,
    "reviewsCount": 165,
    "popularity": 95,
    "createdDate": "2024-03-06",
    "image": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "Precision CAD digital computer cutting tailored to exact body panels",
      "Wrapped edge installation around hoods, doors, and fenders for invisible seams",
      "Self-healing elastomeric topcoat (scratches vanish under hot water/sun)",
      "Non-yellowing optical grade adhesive resistant to extreme UV radiation",
      "Full front clip coverage (Hood, Bumper, Fenders, Headlights & Mirrors)",
      "Hydrophobic ceramic topcoat applied over installed film",
      "Cleanroom bay installation at ISO Class 10,000 dust-free standards",
      "10-Year manufacturer anti-cracking and anti-delamination warranty"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Cleanroom Prep & Decon",
        "desc": "Sterilizing body panels in positive-pressure cleanroom bay."
      },
      {
        "num": 2,
        "title": "CAD Digital Templating",
        "desc": "Precision plotting patterns with wrapped margins for zero knife-on-paint."
      },
      {
        "num": 3,
        "title": "Gel Slip & Squeegee Laydown",
        "desc": "Positioning 8-mil TPU film and locking optical adhesive with squeegee."
      },
      {
        "num": 4,
        "title": "Edge Tucking & Heat Lock",
        "desc": "Wrapping edges into panel seams and post-heating at 90°C."
      }
    ],
    "faqs": [
      {
        "q": "How does self-healing PPF work?",
        "a": "The elastomeric polyurethane topcoat has shape memory. When scratched, ambient heat or warm water allows the polymers to flow back together, eliminating the scratch."
      },
      {
        "q": "Can PPF be removed without damaging factory paint?",
        "a": "Yes, our high-grade acrylic adhesives allow clean removal without residue or clearcoat delamination."
      }
    ],
    "relatedIds": [
      "ceramic-coating",
      "graphene-coating",
      "paint-correction"
    ]
  },
  {
    "id": "graphene-coating",
    "slug": "graphene-coating",
    "fileName": "graphene-coating.html",
    "title": "Graphene Coating",
    "category": "Protection",
    "categorySlug": "protection",
    "tagline": "Next-Gen Carbon Allotrope Matrix with Superior Thermal & Anti-Spotting Defense",
    "shortDesc": "Advanced reduced graphene oxide (rGO) nanotechnology delivering extreme 120° contact angle, electrical conductivity to repel dust, and 900°C heat dissipation.",
    "longDesc": "Next-generation nanotech protection. Graphene Coatings utilize a 2D honeycomb carbon crystal lattice that reduces surface heat absorption, drastically reduces water spotting, and repels road dust via anti-static conductivity.",
    "prices": {
      "hatchback": 21999,
      "sedan": 24999,
      "suv": 29999,
      "luxury": 35999,
      "sports": 39999
    },
    "duration": "2 to 3 Days",
    "warranty": "8-Year Certified",
    "badge": "Next-Gen Graphene",
    "rating": 5,
    "reviewsCount": 112,
    "popularity": 94,
    "createdDate": "2024-03-07",
    "image": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "Multi-stage surgical paint correction pass to 99.8 GU gloss",
      "Dual-layer reduced Graphene Oxide (rGO) liquid application",
      "High thermal dissipation preventing clearcoat water spot etching",
      "Anti-static electrical conductivity repelling dust and brake particles",
      "120° Contact angle for effortless water shedding",
      "Windshield, wheels, and trim infused with graphene matrix",
      "Infrared curing at 70°C for maximum carbon molecular density",
      "8-Year Transferable Digital Certificate and studio registration"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Paint Perfection",
        "desc": "Eliminating all swirl defects to create a flawless foundation."
      },
      {
        "num": 2,
        "title": "rGO Graphene Infusion",
        "desc": "Hand-applying graphene oxide matrix with lint-free suede microfibers."
      },
      {
        "num": 3,
        "title": "Carbon Matrix Curing",
        "desc": "Infrared baking to cross-link carbon bonds into an ultra-tough lattice."
      },
      {
        "num": 4,
        "title": "Hydrophobic Hydro-Audit",
        "desc": "Contact angle verification ensuring 120° water slide off."
      }
    ],
    "faqs": [
      {
        "q": "How is Graphene better than traditional Ceramic Coating?",
        "a": "Graphene has superior heat dissipation which reduces water spotting, has a lower sliding angle for water, and anti-static properties that keep the car cleaner longer."
      }
    ],
    "relatedIds": [
      "ceramic-coating",
      "paint-protection-film",
      "paint-correction"
    ]
  },
  {
    "id": "car-wax-sealant",
    "slug": "car-wax-sealant.html",
    "fileName": "car-wax-sealant.html",
    "title": "Car Wax & Sealant",
    "category": "Maintenance",
    "categorySlug": "maintenance",
    "tagline": "Grade-1 Brazilian Carnauba Wax + Synthetic Polymer Hydrophobic Defense",
    "shortDesc": "Deep warm liquid glow using pure Brazilian carnauba paste wax layered over a synthetic polymer sealant for 4 to 6 months of gloss and protection.",
    "longDesc": "The classic concours finish. We combine organic Grade-1 yellow Brazilian carnauba wax with advanced cross-linking synthetic fluoropolymers to deliver rich color depth, intense warm reflection, and slick water-beading performance.",
    "prices": {
      "hatchback": 1999,
      "sedan": 2499,
      "suv": 2999,
      "luxury": 3999,
      "sports": 4499
    },
    "duration": "2 Hours",
    "warranty": "6-Month Hydro Shield",
    "badge": "Concours Wax",
    "rating": 4.8,
    "reviewsCount": 94,
    "popularity": 88,
    "createdDate": "2024-03-08",
    "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "Two-bucket scratch-free decontamination hand wash",
      "Clay bar glide removing surface bonded contaminants",
      "Hand-applied pure Grade-1 Brazilian Carnauba paste wax",
      "Machine buffing with ultra-plush 600 GSM edgeless microfibers",
      "Fluoropolymer sealant top layer extending wax durability to 6 months",
      "Tyre satin dressing & exterior glass streak-free cleaning"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Decontamination Wash",
        "desc": "Removing dirt, road film, and old wax residue."
      },
      {
        "num": 2,
        "title": "Clay Bar Treatment",
        "desc": "Smoothing the paint surface for maximum wax adhesion."
      },
      {
        "num": 3,
        "title": "Wax & Sealant Application",
        "desc": "Layering carnauba and synthetic cross-linking polymers."
      },
      {
        "num": 4,
        "title": "Microfiber Buffing",
        "desc": "Hand-buffing to a warm, iridescent showroom mirror shine."
      }
    ],
    "faqs": [
      {
        "q": "How long does this wax and sealant treatment last?",
        "a": "Our dual-layer carnauba + polymer sealant lasts 4 to 6 months with regular maintenance washes."
      }
    ],
    "relatedIds": [
      "premium-exterior-detailing",
      "ceramic-maintenance-treatment",
      "scratch-swirl-removal"
    ]
  },
  {
    "id": "engine-bay-detailing",
    "slug": "engine-bay-detailing.html",
    "fileName": "engine-bay-detailing.html",
    "title": "Engine Bay Detailing",
    "category": "Detailing",
    "categorySlug": "detailing",
    "tagline": "Non-Conductive Dry Vapor Degreasing, Carbon Fiber Dress & Dielectric Seal",
    "shortDesc": "Meticulous cleaning of all engine components, intake runners, hoses, and carbon fiber covers with moisture-free dry steam and high-temperature matte dressing.",
    "longDesc": "A pristine engine bay is the mark of a truly cared-for vehicle. We utilize moisture-free dry vapor steam, sensitive electrical component masking, and non-conductive dielectric dressings to restore engine covers and carbon fiber to factory aesthetic blueprint standards.",
    "prices": {
      "hatchback": 1799,
      "sedan": 2199,
      "suv": 2699,
      "luxury": 3499,
      "sports": 3999
    },
    "duration": "2 to 3 Hours",
    "warranty": "Heat Shield Dressing",
    "badge": "Bay Blueprint",
    "rating": 4.9,
    "reviewsCount": 86,
    "popularity": 87,
    "createdDate": "2024-03-09",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "Waterproof masking of alternator, fuse box, ECU, and exposed sensors",
      "180°C Dry vapor steam degreasing of grease, oil, and road grit",
      "Agitation of hard-to-reach brackets with chemical-resistant horsehair brushes",
      "Touchless high-pressure warm-air drying of all connectors",
      "OEM matte silicone-free dressing on rubber hoses and plastic shrouds",
      "Carbon fiber airbox and intake tube single-stage hand polish",
      "Under-hood painted surfaces cleaning and spray sealant"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Electrical Masking",
        "desc": "Protecting sensitive electronics, ECU, and intake filters."
      },
      {
        "num": 2,
        "title": "Dry Steam Degrease",
        "desc": "Breaking down baked-on oil and road grime with pressurized vapor."
      },
      {
        "num": 3,
        "title": "Air Evacuation",
        "desc": "Blowing out moisture from harness plugs with warm compressed air."
      },
      {
        "num": 4,
        "title": "OEM Matte Dressing",
        "desc": "Sealing plastics and hoses with non-greasy, dust-repellent finish."
      }
    ],
    "faqs": [
      {
        "q": "Is engine bay cleaning safe for modern luxury cars?",
        "a": "Yes, we use moisture-free dry vapor steam (less than 5% water content) and mask all sensitive electronics to ensure 100% safety."
      }
    ],
    "relatedIds": [
      "full-car-detailing",
      "underbody-cleaning",
      "steam-car-cleaning"
    ]
  },
  {
    "id": "headlight-restoration",
    "slug": "headlight-restoration.html",
    "fileName": "headlight-restoration.html",
    "title": "Headlight Restoration",
    "category": "Restoration",
    "categorySlug": "restoration",
    "tagline": "5-Stage Wet Sanding & Optical Clearcoat Ceramic UV Infusion",
    "shortDesc": "Eliminate yellowing, oxidation, and cloudy micro-scratches from polycarbonate headlight lenses with multi-stage wet sanding and permanent UV ceramic seal.",
    "longDesc": "Restore crystal-clear night visibility and factory front-end aesthetics. We wet-sand yellowed, sun-damaged polycarbonate lenses through 1000, 1500, 2000, 2500, and 3000 grit micro-abrasives before compounding and locking in UV resistance with a ceramic quartz barrier.",
    "prices": {
      "hatchback": 1499,
      "sedan": 1799,
      "suv": 1999,
      "luxury": 2499,
      "sports": 2799
    },
    "duration": "1.5 Hours",
    "warranty": "2-Year Clarity Guarantee",
    "badge": "Crystal Clarity",
    "rating": 4.9,
    "reviewsCount": 156,
    "popularity": 91,
    "createdDate": "2024-03-10",
    "image": "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "Paint masking around headlight housings with dual-layer protective tape",
      "5-Stage sequential wet-sanding (1000 through 3000 grit) to remove oxidation",
      "Heavy rotary compounding to eliminate sanding micro-grooves",
      "Ultra-fine optical polishing pass for 100% transparency",
      "Permanent UV-blocking ceramic coating infusion",
      "Light output beam lumen verification test",
      "2-Year clarity and anti-yellowing studio warranty"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Panel Masking",
        "desc": "Protecting surrounding bumper and fender paint."
      },
      {
        "num": 2,
        "title": "Wet Sanding Oxidation",
        "desc": "Sanding away yellowed, degraded outer polycarbonate layer."
      },
      {
        "num": 3,
        "title": "Optical Clarity Polish",
        "desc": "Compounding lens back to transparent diamond clarity."
      },
      {
        "num": 4,
        "title": "Ceramic UV Seal",
        "desc": "Baking a permanent UV-absorbent ceramic coating over lens."
      }
    ],
    "faqs": [
      {
        "q": "Will the headlights turn yellow again?",
        "a": "Our ceramic UV coating prevents yellowing for over 2 years, backed by our studio warranty."
      }
    ],
    "relatedIds": [
      "scratch-swirl-removal",
      "paint-correction",
      "windshield-glass-treatment"
    ]
  },
  {
    "id": "leather-cleaning-conditioning",
    "slug": "leather-cleaning-conditioning.html",
    "fileName": "leather-cleaning-conditioning.html",
    "title": "Leather Cleaning & Conditioning",
    "category": "Interior",
    "categorySlug": "interior",
    "tagline": "Swissvax Natural Lipid Nourishment & Anti-Dye Transfer Ceramic Shield",
    "shortDesc": "pH-balanced cleaning of fine Connolly, Nappa, and semi-aniline hides followed by deep natural lipid feeding to prevent cracking, stiffness, and jeans dye transfer.",
    "longDesc": "Treat fine automotive leather to the luxury care it deserves. We deeply cleanse pores using horsehair brushes and pH-neutral foam before infusing essential natural lipids and anti-dye barriers that restore supple softness and factory matte elegance.",
    "prices": {
      "hatchback": 2399,
      "sedan": 2899,
      "suv": 3499,
      "luxury": 4499,
      "sports": 4999
    },
    "duration": "2 to 3 Hours",
    "warranty": "Matte Factory Touch",
    "badge": "Swissvax Leather",
    "rating": 5,
    "reviewsCount": 134,
    "popularity": 92,
    "createdDate": "2024-03-11",
    "image": "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "pH-balanced foaming leather deep pore cleansing",
      "Gentle agitation with natural boar and horsehair detailing brushes",
      "Microfiber steam wipe-down to open pores for nourishment",
      "Swissvax Elephant Leather natural lipid conditioning massage",
      "Matte ceramic leather barrier preventing denim dye transfer and UV fading",
      "Steering wheel, armrest, and door card leather treatment",
      "Perforated seat cooling vent clearing"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Foam Pore Cleansing",
        "desc": "Lifting body oils, sweat, and grime from leather grain."
      },
      {
        "num": 2,
        "title": "Pore Steam Extraction",
        "desc": "Opening hide fibers with gentle temperature-controlled vapor."
      },
      {
        "num": 3,
        "title": "Natural Lipid Conditioning",
        "desc": "Massaging rich natural oils deep into hides to prevent cracking."
      },
      {
        "num": 4,
        "title": "Matte Ceramic Shield",
        "desc": "Applying breathable barrier protecting against blue jeans dye transfer."
      }
    ],
    "faqs": [
      {
        "q": "Will the leather feel shiny or greasy afterwards?",
        "a": "Never. True clean leather has a soft, supple, factory-matte finish. We use zero silicones or artificial gloss agents."
      }
    ],
    "relatedIds": [
      "interior-deep-cleaning",
      "fabric-upholstery-cleaning",
      "odor-removal-treatment"
    ]
  },
  {
    "id": "fabric-upholstery-cleaning",
    "slug": "fabric-upholstery-cleaning.html",
    "fileName": "fabric-upholstery-cleaning.html",
    "title": "Fabric & Upholstery Cleaning",
    "category": "Interior",
    "categorySlug": "interior",
    "tagline": "Deep Heated Extraction of Seats, Carpets & Alcantara Fibers",
    "shortDesc": "Eliminate stubborn coffee, food, and water stains with hot-water injection extraction, antimicrobial enzyme treatment, and hydrophobic fabric shield.",
    "longDesc": "Deep cleanse vehicle fabric, floor mats, and headliners. We utilize commercial heated injection-extraction machines and biological enzyme spotters to flush out deep ground-in grime, followed by hydrophobic fabric guard application.",
    "prices": {
      "hatchback": 1999,
      "sedan": 2499,
      "suv": 2999,
      "luxury": 3899,
      "sports": 4299
    },
    "duration": "2 to 3 Hours",
    "warranty": "Stain Repel Guard",
    "badge": "Deep Extraction",
    "rating": 4.8,
    "reviewsCount": 79,
    "popularity": 85,
    "createdDate": "2024-03-12",
    "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "High-power extraction vacuuming of loose debris and grit",
      "Targeted enzymatic pre-treatment for coffee, oil, and food stains",
      "Hot-water injection extraction with commercial heated wand",
      "Alcantara & suede specialized gentle fiber grooming",
      "Antibacterial sanitization eliminating mildew spores",
      "Hydrophobic fabric barrier spray preventing future liquid spills from soaking",
      "High-velocity warm air drying"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Enzyme Pre-Spray",
        "desc": "Breaking down organic proteins and stubborn drink stains."
      },
      {
        "num": 2,
        "title": "Rotary Brush Agitation",
        "desc": "Lifting ground-in dirt from deep inside upholstery weave."
      },
      {
        "num": 3,
        "title": "Heated Extraction",
        "desc": "Injecting heated solution and vacuuming out dark contaminated water."
      },
      {
        "num": 4,
        "title": "Fabric Guard Seal",
        "desc": "Coating fibers with fluoropolymer liquid repellent."
      }
    ],
    "faqs": [
      {
        "q": "Can this remove old coffee or water stains?",
        "a": "Yes, our heated enzyme extraction removes 95%+ of deep-set stains from fabric seats and carpets."
      }
    ],
    "relatedIds": [
      "interior-deep-cleaning",
      "leather-cleaning-conditioning",
      "odor-removal-treatment"
    ]
  },
  {
    "id": "odor-removal-treatment",
    "slug": "odor-removal-treatment.html",
    "fileName": "odor-removal-treatment.html",
    "title": "Odor Removal Treatment",
    "category": "Interior",
    "categorySlug": "interior",
    "tagline": "10,000 mg/hr Corona Discharge Ozone Cycle & HVAC Fogging",
    "shortDesc": "Completely eliminate cigarette smoke, pet odors, food spills, and mold at a molecular level with high-output medical ozone generator and HVAC fogging.",
    "longDesc": "Permanent odor eradication without artificial perfume masking. Ozone (O3) gas penetrates deep into seat foam, headliners, and AC evaporator coils, oxidizing and destroying volatile organic odor molecules at a molecular level.",
    "prices": {
      "hatchback": 1499,
      "sedan": 1899,
      "suv": 2199,
      "luxury": 2799,
      "sports": 2999
    },
    "duration": "2 Hours",
    "warranty": "Odor-Free Guarantee",
    "badge": "Medical Ozone",
    "rating": 4.9,
    "reviewsCount": 92,
    "popularity": 86,
    "createdDate": "2024-03-13",
    "image": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "Targeted identification and localized enzyme neutralization of odor source",
      "Full cabin 10,000 mg/hr corona discharge ozone shock treatment",
      "Recirculation mode air conditioning duct and evaporator coil sterilization",
      "Antibacterial thermal fogging with active botanicals",
      "Complete fresh air purge and ventilation cycle",
      "Cabin air filter inspection & deodorization"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Source Neutralization",
        "desc": "Cleaning and treating the original biological source of the smell."
      },
      {
        "num": 2,
        "title": "Ozone Shock Cycle",
        "desc": "Sealing cabin and running commercial ozone generator for 45 minutes."
      },
      {
        "num": 3,
        "title": "HVAC Fogging",
        "desc": "Circulating antimicrobial mist through air conditioning system."
      },
      {
        "num": 4,
        "title": "Fresh Air Purge",
        "desc": "Evacuating all residual ozone with high-output cleanroom blowers."
      }
    ],
    "faqs": [
      {
        "q": "Does ozone permanently remove cigarette smoke smell?",
        "a": "Yes. Ozone alters the chemical structure of smoke molecules and bacteria, permanently destroying the smell."
      }
    ],
    "relatedIds": [
      "interior-deep-cleaning",
      "steam-car-cleaning",
      "fabric-upholstery-cleaning"
    ]
  },
  {
    "id": "scratch-swirl-removal",
    "slug": "scratch-swirl-removal.html",
    "fileName": "scratch-swirl-removal.html",
    "title": "Scratch & Swirl Removal",
    "category": "Paint Care",
    "categorySlug": "paint-care",
    "tagline": "Targeted Clearcoat Leveling for Isolated Deep Scratches & Spiderweb Swirls",
    "shortDesc": "Precision micro-sanding and dual-action compounding targeting key scratches, branch rubs, and heavy swirl zones without repainting the panel.",
    "longDesc": "Restore damaged panels without costly, mismatched body shop repainting. Our spot clearcoat leveling technique targets isolated deep scratches, branch scratches, fingernail door cup marks, and automated wash spiderwebs with surgical precision.",
    "prices": {
      "hatchback": 4299,
      "sedan": 4999,
      "suv": 5999,
      "luxury": 7499,
      "sports": 8299
    },
    "duration": "4 to 6 Hours",
    "warranty": "OEM Clearcoat Retained",
    "badge": "Spot Correction",
    "rating": 4.9,
    "reviewsCount": 167,
    "popularity": 93,
    "createdDate": "2024-03-14",
    "image": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "Ultrasonic paint thickness testing before and after repair",
      "Targeted 2500 & 3000 grit micro-abrasive dry sanding of deep scratch ridges",
      "Rotary heavy compounding to level clearcoat plane",
      "Dual-action micro-polishing to restore optical mirror clarity",
      "Scangrip 96+ CRI multi-angle defect verification",
      "Protective ceramic quartz sealant applied over corrected zone",
      "Door cup fingernail scratch eradication on all 4 handles"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Scratch Depth Audit",
        "desc": "Testing if scratch has breached basecoat using ultrasonic gauge."
      },
      {
        "num": 2,
        "title": "Precision Sanding",
        "desc": "Smoothing sharp scratch edges with 3000-grit micro-abrasive discs."
      },
      {
        "num": 3,
        "title": "Compounding & Blend",
        "desc": "Buffing out sanding marks and blending clearcoat seamlessly."
      },
      {
        "num": 4,
        "title": "High-Gloss Seal",
        "desc": "Protecting the refined surface with ceramic nano-sealant."
      }
    ],
    "faqs": [
      {
        "q": "Can you fix scratches that have gone down to the white primer?",
        "a": "Scratches down to primer or metal require touch-up paint before wet-sanding and leveling, which we can provide as a custom atelier add-on."
      }
    ],
    "relatedIds": [
      "paint-correction",
      "ceramic-coating",
      "paint-protection-film"
    ]
  },
  {
    "id": "alloy-wheel-detailing",
    "slug": "alloy-wheel-detailing.html",
    "fileName": "alloy-wheel-detailing.html",
    "title": "Alloy Wheel Detailing",
    "category": "Restoration",
    "categorySlug": "restoration",
    "tagline": "Wheels-Off Deep Iron Decontamination & 800°C High-Heat Ceramic Barrier",
    "shortDesc": "Intensive wheel barrels and caliper scrub, iron fallout chemical dissolution, machine lip polishing, and high-temperature 800°C ceramic coating.",
    "longDesc": "Wheels and brake calipers endure extreme heat and corrosive metallic brake dust. Our Alloy Wheel Detailing removes baked-on iron deposits from spoke backs and barrels before sealing them with an 800°C heat-resistant ceramic quartz barrier.",
    "prices": {
      "hatchback": 1799,
      "sedan": 2299,
      "suv": 2799,
      "luxury": 3699,
      "sports": 4199
    },
    "duration": "2 Hours",
    "warranty": "800°C Heat Shield",
    "badge": "Ceramic Calipers",
    "rating": 4.9,
    "reviewsCount": 118,
    "popularity": 90,
    "createdDate": "2024-03-15",
    "image": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "Acid-free pH-neutral wheel face and deep barrel cleaning",
      "Chemical iron fallout dissolution (color-changing reactive purple decon)",
      "Brake caliper deep scrub and road tar removal",
      "Polishing of diamond-cut and chrome wheel lips",
      "800°C High-temperature ceramic quartz protective coating on 4 wheels",
      "Wheel arch liners deep clean and hydrophobic dressing",
      "Satin non-greasy UV tyre dressing"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Iron Fallout Dissolution",
        "desc": "Spraying color-changing reactive decon to melt sintered brake dust."
      },
      {
        "num": 2,
        "title": "Barrel & Caliper Scrub",
        "desc": "Reaching deep into inner barrels with soft woolly brushes."
      },
      {
        "num": 3,
        "title": "Lip Polishing",
        "desc": "Hand-polishing polished alloy or chrome lips to bright mirror reflection."
      },
      {
        "num": 4,
        "title": "800°C Ceramic Seal",
        "desc": "Coating faces and calipers with high-heat ceramic quartz."
      }
    ],
    "faqs": [
      {
        "q": "Will ceramic wheel coating make brake dust easier to clean?",
        "a": "Yes! Sintered brake dust cannot burn into the ceramic glass layer and washes off effortlessly with a simple water rinse."
      }
    ],
    "relatedIds": [
      "tyre-cleaning-dressing",
      "underbody-cleaning",
      "ceramic-coating"
    ]
  },
  {
    "id": "tyre-cleaning-dressing",
    "slug": "tyre-cleaning-dressing.html",
    "fileName": "tyre-cleaning-dressing.html",
    "title": "Tyre Cleaning & Dressing",
    "category": "Exterior",
    "categorySlug": "exterior",
    "tagline": "Rubber Anti-Browning Degrease & Zero-Sling Hydrophobic Satin Seal",
    "shortDesc": "Deep citrus scrubbing to strip antiozonant brown bloom oxidation, followed by SiO2 ceramic-infused satin black dressing with zero wheel sling.",
    "longDesc": "Say goodbye to brown, chalky tyres. We strip stubborn antiozonant blooming and road oils using citrus degreasers before locking in a deep, factory-fresh satin black finish infused with SiO2 ceramic UV blockers that will not sling onto body panels.",
    "prices": {
      "hatchback": 999,
      "sedan": 1299,
      "suv": 1599,
      "luxury": 1999,
      "sports": 2199
    },
    "duration": "1 Hour",
    "warranty": "Zero-Sling Finish",
    "badge": "Deep Satin Black",
    "rating": 4.8,
    "reviewsCount": 84,
    "popularity": 82,
    "createdDate": "2024-03-16",
    "image": "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "High-potency rubber degreasing stripping antiozonant brown bloom",
      "Stiff-bristle tire sidewall agitation and bead cleaning",
      "Complete high-pressure rinse and warm air dehydration",
      "SiO2 Ceramic-infused satin black tire dressing application",
      "Non-greasy dry-to-the-touch formula preventing body panel sling",
      "UV ozone protection preventing sidewall dry rot and cracking"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Citrus Rubber Scrub",
        "desc": "Stripping brown oxidation until foam turns completely white."
      },
      {
        "num": 2,
        "title": "Dehydration",
        "desc": "Blow-drying rubber completely to ensure deep dressing penetration."
      },
      {
        "num": 3,
        "title": "SiO2 Satin Dressing",
        "desc": "Applying ceramic-infused satin black dressing evenly with contour pad."
      },
      {
        "num": 4,
        "title": "Buffing & Cure",
        "desc": "Dry-buffing to ensure 100% zero sling during highway driving."
      }
    ],
    "faqs": [
      {
        "q": "Will this dressing sling onto my car paint when driving?",
        "a": "No, our formula is dry-to-the-touch, silicone-free, and contains no sling-prone petroleum distillates."
      }
    ],
    "relatedIds": [
      "alloy-wheel-detailing",
      "premium-exterior-detailing",
      "underbody-cleaning"
    ]
  },
  {
    "id": "windshield-glass-treatment",
    "slug": "windshield-glass-treatment.html",
    "fileName": "windshield-glass-treatment.html",
    "title": "Windshield & Glass Treatment",
    "category": "Exterior",
    "categorySlug": "exterior",
    "tagline": "Cerium Oxide Glass Polish & 2-Year Hydrophobic Fluoropolymer Shield",
    "shortDesc": "Eliminate wiper arc haze, mineral water spots, and road film with cerium oxide glass polish, sealed with a 118° hydrophobic rain-repellent coating.",
    "longDesc": "Crystal-clear optical visibility in the heaviest downpours. We mechanically polish windshield and side glass using cerium oxide paste to eliminate wiper micro-scratches and hard water mineral etching before curing a 2-year hydrophobic rain repellent.",
    "prices": {
      "hatchback": 1599,
      "sedan": 1999,
      "suv": 2399,
      "luxury": 2999,
      "sports": 3299
    },
    "duration": "1.5 Hours",
    "warranty": "2-Year Rain Repel",
    "badge": "Optic Clarity",
    "rating": 4.9,
    "reviewsCount": 147,
    "popularity": 89,
    "createdDate": "2024-03-17",
    "image": "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "Chemical glass mineral deposit and acid rain water spot dissolution",
      "Cerium oxide machine polishing removing wiper scratches & glass haze",
      "Isopropanol sterilization of all exterior window surfaces",
      "2-Year Fluoropolymer hydrophobic rain repellent coating on all glass",
      "Wiper blade rubber cleaning and graphite silicone conditioning",
      "Interior glass streak-free optical clarity wipe-down"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Water Spot Dissolution",
        "desc": "Dissolving stubborn mineral and calcium deposits on glass."
      },
      {
        "num": 2,
        "title": "Cerium Oxide Polish",
        "desc": "Rotary glass jewelling eliminating wiper track scratches."
      },
      {
        "num": 3,
        "title": "Sterilization",
        "desc": "Purging all polishing oils with pure alcohol prep."
      },
      {
        "num": 4,
        "title": "Hydrophobic Coating",
        "desc": "Layering fluoropolymer rain shield causing water to fly off at 45 km/h."
      }
    ],
    "faqs": [
      {
        "q": "At what speed does water fly off the windshield?",
        "a": "Rain droplets bead up and slide off effortlessly above 45-50 km/h, dramatically reducing wiper usage and improving night safety."
      }
    ],
    "relatedIds": [
      "premium-exterior-detailing",
      "headlight-restoration",
      "ceramic-coating"
    ]
  },
  {
    "id": "underbody-cleaning",
    "slug": "underbody-cleaning.html",
    "fileName": "underbody-cleaning.html",
    "title": "Underbody Cleaning",
    "category": "Exterior",
    "categorySlug": "exterior",
    "tagline": "High-Pressure Inverted Chassis Wash & Anti-Corrosion Subframe Seal",
    "shortDesc": "High-pressure chassis wash removing road salts, caked mud, and winter road chemicals, sealed with a durable anti-corrosion barrier.",
    "longDesc": "Protect your vehicle subframe and suspension from premature rust and corrosion. We hoist the vehicle to blast away road salt, mud, and road grime from chassis rails, suspension arms, and wheel wells before applying an anti-corrosion barrier.",
    "prices": {
      "hatchback": 2199,
      "sedan": 2799,
      "suv": 3499,
      "luxury": 4299,
      "sports": 4799
    },
    "duration": "2 Hours",
    "warranty": "Anti-Rust Barrier",
    "badge": "Chassis Armor",
    "rating": 4.8,
    "reviewsCount": 71,
    "popularity": 81,
    "createdDate": "2024-03-18",
    "image": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "Inverted multi-nozzle 2500 PSI high-pressure chassis wash",
      "Heavy degreaser agitation on suspension arms, differentials, and subframe",
      "Wheel arch liners deep scrub and stone ejection",
      "Exhaust piping and heat shield road grime purge",
      "Corrosion inhibitor spray application over exposed metal joints",
      "Brake line and fuel line visual integrity inspection"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Chassis Pressure Blast",
        "desc": "Loosening thick caked mud, salt, and road debris."
      },
      {
        "num": 2,
        "title": "Suspension Degrease",
        "desc": "Scrubbing control arms, sway bars, and steering linkages."
      },
      {
        "num": 3,
        "title": "Underbody Rinse",
        "desc": "Flushing frame rails with high-volume filtered water."
      },
      {
        "num": 4,
        "title": "Anti-Corrosion Seal",
        "desc": "Applying penetrating hydrophobic rust inhibitor."
      }
    ],
    "faqs": [
      {
        "q": "Why is underbody cleaning important?",
        "a": "Road salt, mud, and moisture accumulate in subframe pockets, causing hidden rust, squeaky bushings, and premature suspension wear."
      }
    ],
    "relatedIds": [
      "engine-bay-detailing",
      "alloy-wheel-detailing",
      "premium-exterior-detailing"
    ]
  },
  {
    "id": "steam-car-cleaning",
    "slug": "steam-car-cleaning.html",
    "fileName": "steam-car-cleaning.html",
    "title": "Steam Car Cleaning",
    "category": "Detailing",
    "categorySlug": "detailing",
    "tagline": "180°C High-Pressure Dry Vapor Sanitization Across Interior & Exterior Details",
    "shortDesc": "Thermal sanitization utilizing 180°C pressurized dry vapor steam on air vents, door jambs, seat crevices, headliners, and delicate components without excess moisture.",
    "longDesc": "The ultimate eco-friendly sanitization technology. High-pressure 180°C dry vapor steam penetrates deep into AC vents, seat seams, door jambs, and headliners, dissolving grease and killing 99.9% of bacteria and viruses on contact.",
    "prices": {
      "hatchback": 2799,
      "sedan": 3299,
      "suv": 3999,
      "luxury": 4999,
      "sports": 5499
    },
    "duration": "3 Hours",
    "warranty": "99.9% Bacteria Free",
    "badge": "Eco Dry Steam",
    "rating": 4.9,
    "reviewsCount": 103,
    "popularity": 89,
    "createdDate": "2024-03-19",
    "image": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": false,
    "inclusions": [
      "180°C Dry vapor steam sterilization of dashboard, console & door cards",
      "Deep steam purging of air conditioning vents and heater cores",
      "Door jambs, boot shut, and fuel flap steam cleaning and degrease",
      "Headliner stain removal with low-moisture steam bonnet",
      "Seat belt webbing deep steam sterilization and degrease",
      "Pedal box and footwell deep thermal extraction",
      "Antibacterial mist finish leaving cabin hospital-grade sanitized"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Dry Vapor Vent Clean",
        "desc": "Blowing 180°C steam through HVAC ducts to kill bacteria and mold."
      },
      {
        "num": 2,
        "title": "Door Jambs & Shut Purge",
        "desc": "Blasting grease and grime from hinges and rubber weatherstrips."
      },
      {
        "num": 3,
        "title": "Seat & Belt Sterilization",
        "desc": "Sanitizing upholstery without over-saturating fabrics."
      },
      {
        "num": 4,
        "title": "Air Filtration Audit",
        "desc": "Inspecting cabin filter and purifying ambient cabin air."
      }
    ],
    "faqs": [
      {
        "q": "Can steam damage vehicle electronics or leather?",
        "a": "No, our equipment uses dry vapor steam containing less than 5% water, specifically calibrated for automotive interiors and sensitive electronics."
      }
    ],
    "relatedIds": [
      "interior-deep-cleaning",
      "odor-removal-treatment",
      "engine-bay-detailing"
    ]
  },
  {
    "id": "ceramic-maintenance-treatment",
    "slug": "ceramic-maintenance-treatment.html",
    "fileName": "ceramic-maintenance-treatment.html",
    "title": "Ceramic Maintenance Treatment",
    "category": "Maintenance",
    "categorySlug": "maintenance",
    "tagline": "Decontamination Wash, Mineral Dissolution & SiO2 Hydrophobic Topcoat Reload",
    "shortDesc": "Restore 118° water beading and gloss on ceramic-coated vehicles with pH-neutral decon wash, mineral water spot removal, and SiO2 booster reload.",
    "longDesc": "Keep your ceramic coating performing like day one. Over time, road film and mineral deposits clog nanoceramic pores. Our Ceramic Maintenance Treatment chemically unblocks the coating and reloads active SiO2 polymers to restore maximum gloss and hydrophobicity.",
    "prices": {
      "hatchback": 3799,
      "sedan": 4499,
      "suv": 5299,
      "luxury": 6499,
      "sports": 7199
    },
    "duration": "3 to 4 Hours",
    "warranty": "1-Year Topcoat Boost",
    "badge": "Coating Rejuvenate",
    "rating": 5,
    "reviewsCount": 178,
    "popularity": 94,
    "createdDate": "2024-03-20",
    "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    "hasBeforeAfter": true,
    "inclusions": [
      "pH-Neutral decontamination snow foam wash",
      "Mild chemical iron fallout dissolution preserving ceramic coating",
      "Specialized mineral deposit remover clearing water spot scale",
      "SiO2 / Reduced Graphene Oxide ceramic topcoat reload application",
      "Glass fluoropolymer rain repellent top-up",
      "Wheel ceramic coating inspection and booster wipe",
      "48-Point coating thickness & hydrophobicity contact angle audit",
      "Warranty logbook digital stamp and validation"
    ],
    "processSteps": [
      {
        "num": 1,
        "title": "Coating Decontamination",
        "desc": "Unclogging microscopic ceramic pores from traffic film and iron."
      },
      {
        "num": 2,
        "title": "Mineral Scale Removal",
        "desc": "Dissolving calcium and lime scale without harming basecoat."
      },
      {
        "num": 3,
        "title": "SiO2 Topcoat Reload",
        "desc": "Infusing fresh layer of sacrificial liquid quartz for slickness."
      },
      {
        "num": 4,
        "title": "Water Beading Audit",
        "desc": "Verifying 118° water contact angle and updating digital warranty."
      }
    ],
    "faqs": [
      {
        "q": "How often should I get Ceramic Maintenance done?",
        "a": "We recommend once every 6 to 12 months to maintain the warranty and keep the coating performing at peak hydrophobic levels."
      }
    ],
    "relatedIds": [
      "ceramic-coating",
      "graphene-coating",
      "premium-exterior-detailing"
    ]
  }
];

  let activeCategory = 'all';
  let activeVehicleType = 'all';
  let activePriceRange = 'all';
  let activeSortBy = 'popular';

  function getVehicleSize() {
    return localStorage.getItem(SIZE_KEY) || 'sedan';
  }

  function setVehicleSize(size) {
    localStorage.setItem(SIZE_KEY, size);
    updateSizePills();
    renderAllServices();
  }

  function updateSizePills() {
    const currentSize = getVehicleSize();
    document.querySelectorAll('.btn-size, .vehicle-size-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-size') === currentSize);
    });
  }

  /**
   * Filter and Sort the 20 services dynamically
   */
  function getFilteredServices() {
    const size = getVehicleSize();

    return SERVICES_DATA.filter(s => {
      // Category filter
      if (activeCategory !== 'all' && s.categorySlug !== activeCategory) {
        return false;
      }

      // Vehicle Type filter
      if (activeVehicleType !== 'all') {
        const validPrice = s.prices[activeVehicleType];
        if (!validPrice) return false;
      }

      // Price Range filter
      const price = s.prices[size] || s.prices.sedan;
      if (activePriceRange === 'under-2000' && price >= 2000) return false;
      if (activePriceRange === '2000-5000' && (price < 2000 || price > 5000)) return false;
      if (activePriceRange === '5000-10000' && (price < 5000 || price > 10000)) return false;
      if (activePriceRange === 'above-10000' && price < 10000) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.prices[size] || a.prices.sedan;
      const priceB = b.prices[size] || b.prices.sedan;

      if (activeSortBy === 'price-low') return priceA - priceB;
      if (activeSortBy === 'price-high') return priceB - priceA;
      if (activeSortBy === 'rating') return b.rating - a.rating;
      if (activeSortBy === 'newest') return new Date(b.createdDate) - new Date(a.createdDate);
      return b.popularity - a.popularity; // default: popular
    });
  }

  /**
   * Renders the 20 Service Cards onto #all-services-grid
   */
  function renderAllServices() {
    const grid = document.getElementById('all-services-grid');
    if (!grid) return;

    const filtered = getFilteredServices();
    const countEl = document.getElementById('services-count-badge');
    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${SERVICES_DATA.length} Services`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;" class="glass-card">
          <i class="ri-search-eye-line text-gold" style="font-size: 3rem; display: block; margin-bottom: 15px;"></i>
          <h3 style="font-size: 1.5rem; margin-bottom: 8px;">No Services Found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 20px;">Try adjusting your category, price range, or vehicle type filters.</p>
          <button class="btn btn-gold" onclick="resetAllFilters()"><i class="ri-refresh-line"></i> Reset Filters</button>
        </div>
      `;
      return;
    }

    const size = getVehicleSize();
    grid.innerHTML = filtered.map(s => {
      const price = s.prices[size] || s.prices.sedan;

      return `
        <div class="service-card glass-card service-item" data-category="${s.categorySlug}" style="border-radius: 18px; overflow: hidden; display: flex; flex-direction: column;">
          <div style="position: relative;">
            <img src="${s.image}" alt="${s.title}" onerror="this.src='https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'" style="width: 100%; height: 210px; object-fit: cover;">
            <span class="service-image-badge" style="position: absolute; top: 12px; right: 12px; font-size: 0.76rem; font-weight: 700; background: rgba(10, 12, 18, 0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); color: #ffc837; border: 1px solid rgba(212, 175, 55, 0.75); padding: 5px 12px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.6); letter-spacing: 0.3px; display: inline-flex; align-items: center; gap: 5px; z-index: 2;">
              <i class="ri-sparkling-fill" style="color: #ffc837; font-size: 0.85rem;"></i> ${s.badge}
            </span>
            <span class="service-rating-badge" style="position: absolute; top: 12px; left: 12px; font-size: 0.76rem; font-weight: 700; background: rgba(10, 12, 18, 0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); padding: 5px 12px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.6); letter-spacing: 0.3px; display: inline-flex; align-items: center; gap: 5px; z-index: 2;">
              <i class="ri-star-fill" style="color: #ffc837; font-size: 0.85rem;"></i> ${s.rating}
            </span>
          </div>
          <div style="padding: 22px; flex-grow: 1; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <span style="font-size: 0.75rem; color: var(--primary-gold); text-transform: uppercase; font-weight: 700;">${s.category}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="ri-time-line"></i> ${s.duration}</span>
            </div>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px; font-family: var(--font-heading); color: var(--text-primary);">${s.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; margin-bottom: 20px; flex-grow: 1;">
              ${s.shortDesc}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 16px; margin-top: auto; gap: 10px; flex-wrap: wrap;">
              <div>
                <span style="font-size: 0.72rem; color: var(--text-muted); display: block; text-transform: uppercase; font-weight: 600;">From:</span>
                <strong class="text-gold" style="font-size: 1.35rem; font-weight: 800;">₹${price.toLocaleString()}</strong>
              </div>
              <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                <button type="button" class="btn btn-sm btn-gold add-service-to-cart-btn" onclick="window.addServiceToCart('${s.id}')" title="Add ${s.title} to Cart">
                  <i class="ri-shopping-bag-3-line"></i> Add to Cart
                </button>
                <a href="${s.fileName}" class="btn btn-sm btn-outline">
                  View Details <i class="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Adds an individual service to the shopping cart
   */
  window.addServiceToCart = function (serviceId) {
    const service = SERVICES_DATA.find(s => s.id === serviceId);
    if (!service) return;

    const size = getVehicleSize();
    const basePrice = service.prices[size] || service.prices.sedan;

    const item = {
      id: 'srv-' + service.id,
      name: service.title,
      tier: service.badge || 'Studio Service',
      price: basePrice,
      size: size,
      image: service.image,
      duration: service.duration,
      warranty: service.warranty || 'Studio Guarantee'
    };

    if (window.ApexCart && typeof window.ApexCart.addItem === 'function') {
      window.ApexCart.addItem(item);
    } else {
      try {
        const cart = JSON.parse(localStorage.getItem('apex_cart') || '[]');
        const idx = cart.findIndex(i => i.id === item.id && (i.size || 'sedan') === size);
        if (idx > -1) {
          cart[idx].quantity = (cart[idx].quantity || 1) + 1;
        } else {
          item.quantity = 1;
          cart.push(item);
        }
        localStorage.setItem('apex_cart', JSON.stringify(cart));
        if (window.showToast) window.showToast(`${service.title} added to cart!`);
      } catch (e) {
        console.error('Failed to add service to cart', e);
      }
    }
  };

  window.resetAllFilters = function () {
    activeCategory = 'all';
    activeVehicleType = 'all';
    activePriceRange = 'all';
    activeSortBy = 'popular';

    document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === 'all'));
    
    const vehSelect = document.getElementById('filter-vehicle-type');
    const priceSelect = document.getElementById('filter-price-range');
    const sortSelect = document.getElementById('filter-sort-by');
    if (vehSelect) vehSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'popular';

    // Reset Custom Dropdown UI Labels and Selected States
    const vehDd = document.getElementById('dropdown-filter-vehicle-type');
    if (vehDd) {
      const lbl = vehDd.querySelector('.custom-dropdown-label');
      if (lbl) lbl.textContent = 'All Vehicles';
      vehDd.querySelectorAll('.custom-dropdown-option').forEach(o => o.classList.toggle('selected', o.getAttribute('data-value') === 'all'));
    }

    const priceDd = document.getElementById('dropdown-filter-price-range');
    if (priceDd) {
      const lbl = priceDd.querySelector('.custom-dropdown-label');
      if (lbl) lbl.textContent = 'All Prices';
      priceDd.querySelectorAll('.custom-dropdown-option').forEach(o => o.classList.toggle('selected', o.getAttribute('data-value') === 'all'));
    }

    const sortDd = document.getElementById('dropdown-filter-sort-by');
    if (sortDd) {
      const lbl = sortDd.querySelector('.custom-dropdown-label');
      if (lbl) lbl.textContent = 'Most Popular';
      sortDd.querySelectorAll('.custom-dropdown-option').forEach(o => o.classList.toggle('selected', o.getAttribute('data-value') === 'popular'));
    }

    renderAllServices();
  };

  /**
   * Initializes custom luxury dropdown components & synchronization with selects
   */
  function initCustomDropdowns() {
    const dropdowns = document.querySelectorAll('.custom-dropdown');
    dropdowns.forEach(dropdown => {
      const btn = dropdown.querySelector('.custom-dropdown-btn');
      const label = dropdown.querySelector('.custom-dropdown-label');
      const options = dropdown.querySelectorAll('.custom-dropdown-option');
      const select = dropdown.querySelector('select');

      if (!btn || !select) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        dropdowns.forEach(d => d.classList.remove('open'));
        if (!isOpen) {
          dropdown.classList.add('open');
        }
      });

      options.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = opt.getAttribute('data-value');
          select.value = val;
          if (label) {
            label.textContent = opt.textContent.trim();
          }
          options.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          dropdown.classList.remove('open');

          // Trigger change event to trigger existing filtering logic
          select.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });

    document.addEventListener('click', () => {
      dropdowns.forEach(d => d.classList.remove('open'));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach(d => d.classList.remove('open'));
      }
    });
  }

  function initFilterListeners() {
    // 1. Category Filter Tabs
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.getAttribute('data-cat') || 'all';
        renderAllServices();
      });
    });

    // 2. Vehicle Type Filter Dropdown
    const vehSelect = document.getElementById('filter-vehicle-type');
    if (vehSelect) {
      vehSelect.addEventListener('change', function () {
        activeVehicleType = this.value;
        if (this.value !== 'all') {
          setVehicleSize(this.value);
        } else {
          renderAllServices();
        }
      });
    }

    // 3. Price Range Filter Dropdown
    const priceSelect = document.getElementById('filter-price-range');
    if (priceSelect) {
      priceSelect.addEventListener('change', function () {
        activePriceRange = this.value;
        renderAllServices();
      });
    }

    // 4. Sort By Dropdown
    const sortSelect = document.getElementById('filter-sort-by');
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        activeSortBy = this.value;
        renderAllServices();
      });
    }

    // 5. Vehicle Size Pill Buttons
    document.querySelectorAll('.btn-size, .vehicle-size-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const size = this.getAttribute('data-size');
        if (size) setVehicleSize(size);
      });
    });

    // Read URL Category Parameter if present
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam) {
      const matchBtn = document.querySelector(`.category-filter-btn[data-cat="${catParam}"]`);
      if (matchBtn) matchBtn.click();
    }
  }

  window.SERVICES_DATA = SERVICES_DATA;
  window.getVehicleSize = getVehicleSize;
  window.setVehicleSize = setVehicleSize;
  window.renderAllServices = renderAllServices;

  document.addEventListener('DOMContentLoaded', () => {
    updateSizePills();
    renderAllServices();
    initCustomDropdowns();
    initFilterListeners();
  });
})();
