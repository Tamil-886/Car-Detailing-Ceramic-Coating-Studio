# APEX OBSIDIAN — Bespoke Car Detailing & Ceramic Coating Studio

> **Project #46**: Production-Grade, Luxury Automotive Detailing Studio & Customer Dashboard Suite.
> Designed with Obsidian Dark & Liquid Gold aesthetics, ISO Class 10,000 Cleanroom engineering, 7-Stage Live Telemetry Tracking, Interactive Before/After Sliders, Paint Correction Simulators, 48-Point Ultrasonic Vehicle Inspectors, Dynamic Custom Package Builders, and Multi-Spectrum Bay Cameras.

---

## 🌟 Project Highlights & Luxury Enhancements

1. **Complete 27-Page Standalone Architecture**:
   - **12 Main Website Pages**: Landing 1 (Detailing Studio), Landing 2 (10H Ceramic Focus), About Us, Services Menu (11 Services + Sizing Calculator), Service Details (6-Step Cleanroom Process), Packages & Pricing (Comparison Matrix), Package Details, Showroom Gallery (Lightbox), Before/After Sliders, Detailing Journal, Technical Article Deep-Dive, and Studio Locations (Beverly Hills, Scottsdale, Miami).
   - **3 Authentication Pages**: Login with 1-click demo accounts (*Alexander Vance - VIP / Marcus Vance - Master Detailer*), Register with garage pre-entry, and Password Recovery.
   - **9 Customer Dashboard Pages** (`dashboard/`): Overview, Live 7-Stage Service Tracker, My Bookings, Personal Photo Vault, Apex Gloss Club Loyalty Store, Invoices & E-Warranties, Garage Profile, and Settings.
   - **3 Utility Pages**: `404.html`, `coming-soon.html`, `maintenance.html`.

2. **🔬 Interactive Paint Correction & Ceramic Coating Simulator**:
   - Real-time HTML5 Canvas paint defect visualizer with realistic metallic flake layers.
   - Switch between 5 defect types: *Spiderweb Swirls, Buffer Holograms, 2000-Grit Scratches, Acid Etching, UV Oxidation*.
   - Run 3-stage cleanroom correction: *Rotary Wool Cut → Dual-Action Polish → 10H Nanoceramic Infusion*.
   - Live Optical Gloss Meter (elevates from `42 GU` to `99.8 GU`) and paint clear coat thickness gauge (`μm`).

3. **🚗 Interactive 48-Point Ultrasonic Paint Depth Blueprint**:
   - Interactive SVG vehicle blueprint schematic (Hood, Roof, Fenders, Doors, Quarter Arches, Bumpers).
   - Dynamic cross-section paint layer stack (*Substrate, Primer, Basecoat, Clearcoat, Cured 10H Ceramic Matrix*).
   - Real-time diagnostic readouts and recommended machine correction intensity.

4. **⚡ Dynamic Custom Detailing Package Configurator & Instant Quote Engine**:
   - Step 1: Vehicle Footprint Multiplier (*Coupe, Sedan, Mid SUV, Full SUV, Exotic Hypercar*).
   - Step 2: Base Cleanroom Core Treatment (*Essential Detail, 10H Ceramic Pro, Concours Correction, Full PPF*).
   - Step 3: Bespoke Add-ons (*Hydrophobic Glass Matrix, Wheel & Caliper Shield, Leather Barrier Balm, Cleanroom Engine Bay Detail, Medical Ozone Sterilization, Underbody Anti-Corrosion Spray*).
   - Real-time itemized price conversion across `$ USD`, `€ EUR`, `£ GBP`, `₹ INR` and cleanroom duration estimation.

5. **💰 Ceramic Coating Longevity & Financial ROI Engine**:
   - Interactive 1-to-10 year projection slider comparing traditional waxing vs. 10H Ceramic Coating.
   - Highlights net cash savings ($3,980+), wash time saved (190+ hours), and vehicle resale equity retention.

6. **📹 Multi-Spectrum Live Cleanroom Bay Camera (Customer Dashboard)**:
   - **Optical HD Cam**: Crisp showroom cleanroom view.
   - **Thermal Infrared (IR) Cam**: Real-time curing heat map at 65°C.
   - **UV Flaw Inspector Cam**: Fluorescent blacklight coating uniformity check.
   - Sensor telemetry HUD: Ambient temp, humidity, ISO Class 10,000 particle air purity (99.99%).

7. **📜 Gold-Foil Transferable Digital Warranty Certificate Generator**:
   - High-end gold-foil embossed certificate card (`WAR-10H-99824`) with animated metallic seal, dynamic VIN, batch number, QR code verification, and 1-click printable receipt format.

8. **⌨️ Global Command Palette (`Ctrl + K` / `Cmd + K`)**:
   - Spotlight search overlay to quickly navigate to any service, package, simulator, or dashboard tool.
   - Quick action shortcuts for instant theme toggle, cleanroom audio toggle, and currency switching.

9. **🔊 Pure Web Audio API Studio Soundscape & Haptic Feedback**:
   - Ambient cleanroom acoustics, rotary polisher spin audio, ceramic laser cure chime, and tactile UI button feedback (toggleable on/off with audio icon).

---

## 📁 Complete File Tree Structure

```text
Car Detailing & Ceramic Coating Studio/
│
├── index.html                  # Home Page 1 - Detailing Studio Landing & Simulator
├── home-2.html                 # Home Page 2 - Ceramic Coating Focus & ROI Engine
├── about.html                  # About Us - Cleanroom Heritage & Master Detailers
├── services.html               # Detailing Services Grid & Custom Package Builder
├── service-details.html        # Individual Service Deep-Dive & 48-Point Inspector
├── packages.html               # Detailing Packages & Comparison Matrix
├── package-details.html        # Package Breakdown & Add-on Customizer
├── gallery.html                # Filterable Showroom Gallery with Lightbox
├── before-after.html           # Interactive Draggable Split Sliders
├── blog.html                   # Detailing Science Journal & Guides
├── blog-details.html           # Technical Deep-Dive Article
├── contact.html                # Studio Locations (Beverly Hills, Scottsdale, Miami)
│
├── login.html                  # Customer Sign In (Demo Logins Included)
├── register.html               # Customer & Garage Pre-Registration
├── forgot-password.html        # Password Recovery Flow
│
├── 404.html                    # Luxury Automotive 404 Error Page
├── coming-soon.html            # Las Vegas Hypercar Cleanroom Expansion Countdown
├── maintenance.html            # Cleanroom Calibration Notice
│
├── dashboard/
│   ├── index.html              # Customer Dashboard Overview
│   ├── bookings.html           # My Bookings & Filter Tabs
│   ├── booking-details.html    # Booking Telemetry & Assigned Bay
│   ├── services-status.html    # 7-Stage Tracker & Multi-Spectrum Bay Cam
│   ├── before-after.html       # Client's Personal Vehicle Photo Vault
│   ├── loyalty-points.html     # Apex Gloss Club Balance & Voucher Store
│   ├── invoices.html           # Invoices, Receipts & Gold-Foil E-Warranties
│   ├── profile.html            # Customer Profile & Fleet Garage Manager
│   └── settings.html           # Notification Channels & Security
│
└── assets/
    ├── css/
    │   ├── style.css           # Core Design Tokens, Typography, Badges & Sliders
    │   ├── simulator.css       # Simulators, Blueprint Maps, Bay Cam & Warranty Styles
    │   ├── responsive.css      # Mobile, Tablet, and Desktop Breakpoints
    │   ├── dark-mode.css       # Dark / Light Theme & High-Contrast Overrides
    │   └── dashboard.css       # Collapsible Sidebar, Stat Cards, Telemetry Timeline
    │
    └── js/
        ├── theme.js            # Theme Switcher (Dark/Light), RTL, & Currency Converter
        ├── navigation.js       # Sticky Navbar & Mobile Drawer Menu
        ├── main.js             # Toast Alerts, Draggable Before/After Sliders, Counters
        ├── audio-feedback.js   # Pure Web Audio API Sound Effects & Haptics
        ├── simulator.js        # Paint Correction Simulator, 48-Point Map & ROI Calculator
        ├── package-builder.js  # Dynamic Package Configurator & Instant Quote Engine
        ├── command-palette.js  # Global Ctrl+K Spotlight Search & Quick Actions
        ├── services.js         # 11 Detailing Services Data & Dynamic Sizing Calculator
        ├── packages.js         # 4 Package Tiers & Comparison Matrix Engine
        ├── gallery.js          # Filterable Supercar Showroom & Lightbox Viewer
        ├── booking.js          # Studio Bay Reservation Form & Dashboard Sync
        ├── dashboard.js        # 7-Stage Service Tracker Engine & Simulator
        ├── loyalty.js          # Apex Gloss Club Loyalty Balance & Voucher Engine
        ├── invoices.js         # Invoices, Printable Receipts & E-Warranty Generator
        └── forms.js            # Contact Form, Newsletter, & Review Submissions
```

---

## 🚀 How to Run & View

1. **Direct File Open**:
   - Double-click `index.html` or open any HTML file directly in any modern browser (Chrome, Edge, Safari, Firefox).
   - Zero installation, zero Node.js / NPM build tools, and zero local server requirements.

2. **Customer Portal Demo Accounts**:
   - Navigate to [`login.html`](login.html) and click either:
     - **VIP Client Demo**: *Alexander Vance* (Instant access to Porsche 911 GT3 RS live 7-stage tracker, photo vault, and 2,450 loyalty points).
     - **Master Detailer Demo**: *Marcus Vance* (Cleanroom technician diagnostics).
