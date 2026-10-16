# ☕ The Smoke Shop — AAA Side-Scrolling Adaptive Website

> **"Your Daily Sparks & Sips — Welcome to the Chill Hub."**  
> An adaptive, retro-cartoon side-scrolling experience crafted for **The Smoke Shop**. Featuring satisfying soft-stop inertia scrolling, interactive promotions with a live QR-code game link, and an automatic product slideshow.

---

## 🌟 Key Features

### 1. Section 1: Home / About Us
- **Retro Bubble Aesthetics**: Matches the official brand mockup with chunky drop-shadow typography, window chrome details, and vintage 1930s cartoon warmth.
- **Interactive Walking Mascot**: Animated walking coffee cup mascot with boots and steam curls. Click him for a celebratory bounce, sound pop, and floating steam hearts!
- **Cozy Smoke Cloud Waves**: Layered SVG smoke puffs billowing smoothly along the bottom edge.
- **Interactive Story Modal**: Learn about The Smoke Shop's story, fair-trade bean roasting, and community hangout vibe.

### 2. Section 2: Promotions & The Coffee Game
- **Interactive Arcade Spotlight**: Direct integration with the official coffee game:  
  👉 **[https://coffee-zeta-weld.vercel.app/](https://coffee-zeta-weld.vercel.app/)**
- **Dynamic Crisp QR Code**: Generated on-screen so desktop users can scan with their phone camera to play on mobile instantly.
- **Interactive Promo Codes**:
  - `CHILLHUB20` — 20% off drinks for game players scoring 1,000+ points!
  - `GAMENIGHT` — Free espresso upgrade during Thursday board game night!
  - `EARLYBIRD` — $2 Espresso shots on weekday mornings!
- **Confetti & Tactile Sound**: One-click code copying triggers a burst of celebratory confetti.

### 3. Section 3: Menu & Automatic Product Slideshow
- **Automatic Product Slideshow**: Automatically rotates through our handcrafted menu items with an animated real-time progress bar:
  - **☕ Signature Drinks**:
    1. **Espresso Shot** ($3.00) — *Bold, intense, and full-bodied! Velvety golden crema.*
    2. **Coffee Freeza** ($5.50) — *Frosty blended delight with whipped cream and sweet chocolate drizzle.*
    3. **Cappuccino** ($4.50) — *A warm hug in a cup with a cocoa heart dusting.*
    4. **Pumpkin Spice Latte** ($5.75) — *Autumn favorite blended with real pumpkin and spices.*
  - **🍩 Fresh Artisan Bakery**:
    5. **The Chocolate Deal** ($4.50) — *Double chocolate doughnut, dark chocolate crumbs & handcrafted chocolate heart.*
    6. **Red Velvet Doughnut** ($4.75) — *Fluffy red velvet, luscious cream cheese glaze & deep-red cake crumbs.*
    7. **Birthday Doughnut** ($4.50) — *Fresh-glazed doughnut with rainbow sprinkles, vanilla buttercream & tiny birthday candle.*
- **Category Filter Tabs**: Jump between *All Sips & Bites*, *Hot Espresso*, *Frosty Freezas*, *Artisan Doughnuts*, and *Autumn Specials*.
- **Controls**: Pause/Resume, Previous/Next buttons, and direct thumbnail dot navigation.
- **Interactive Customizer**: Choose milk types (Whole, Oat, Almond) and sweetness for drinks, or serving temperature (*Warm from Oven*, *Room Temp*) and packaging (*Bakery Pouch*, *Gift Box*) for doughnuts!
- **Grid View Toggle**: Switch between the cinema slideshow view and a quick-browse menu card grid.

### 4. Satisfying Soft-Stop Scrolling Mechanics
- **Mouse Wheel / Trackpad Conversion**: Vertical wheel scrolling translates smoothly to horizontal panning.
- **Soft Inertial Magnetic Snap**: As scrolling slows down, the viewport gently and smoothly glides to a soft stop centered on the nearest section.
- **Desktop Drag-to-Scroll**: Click and drag horizontally with elastic momentum.
- **Keyboard Navigation**: Use `[←]` / `[→]` arrows or numeric keys `[1]`, `[2]`, `[3]`.
- **Bottom Navigation Dock**: Floating pill dock with section indicators and a real-time progress bar with a mini moving coffee cup.
- **Full Mobile Adaptation**: Touch swipe gestures with momentum snap on iOS Safari and Android Chrome.

---

## 🚀 GitHub & Vercel Workflow

This project is optimized for automated CI/CD deployments using **GitHub** and **Vercel**.

### Step 1: Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) named `smokeshop-landing-page`.
2. In your terminal, run the following commands:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: AAA side-scrolling website for Smoke Shop"

# Rename default branch to main
git branch -M main

# Link your remote GitHub repository (replace with your repo URL)
git remote add origin https://github.com/<your-username>/smokeshop-landing-page.git

# Push code to GitHub
git push -u origin main
```

---

### Step 2: Deploy on Vercel

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** ➔ **"Project"**.
3. Select your GitHub account and click **"Import"** next to `smokeshop-landing-page`.
4. Vercel will automatically detect the settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

Within ~20 seconds, your website will be live worldwide with:
- Global CDN caching for instant image loading.
- Free SSL certificate (`https://`).
- Automatic preview deployments for every Git branch or pull request.
- Automatic redeployment whenever you push to `main`.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Retro Themes & Animations
- **Motion & Physics**: Framer Motion
- **Micro-Interactions**: Web Audio API (tactile pops and chimes)
- **Icons**: Lucide React
- **QR Code**: `qrcode.react`
- **Celebration Effects**: `canvas-confetti`
