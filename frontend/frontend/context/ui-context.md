# Coastal Cove | Design System (V2.0)

## Core Aesthetics: "Modern Architectural Luxury"
The project follows a "High-End Editorial" design language, balancing technical precision with artistic warmth. It draws inspiration from premium interior design firms (Melanie Hay) and modern technical platforms (City Arcade).

---

## 🎨 Color Palette: "Linen & Ink"
A sophisticated, low-contrast palette that feels organic and professional.

- **Base Background (`--bg-base`)**: `#E8E8E3` (Soft Linen - Off-white with a warm gray undertone)
- **Primary Text (`--text-primary`)**: `#1A1A1A` (Deep Ink - Soft black for high-end legibility)
- **Cream Accent (`--accent-primary`)**: `#FFEBD3` (Soft Peach/Cream - Used for luxury highlights and search buttons)
- **Muted Text (`--text-muted`)**: `#6B6B6B` (Mid-tone gray for secondary info)
- **Surface Layer (`--bg-surface`)**: `#F9F9F7` (Whiter linen for cards and overlays)
- **Glassmorphism**: `white/90` with `backdrop-blur-2xl`

---

## 🖋️ Typography: "The Editorial Pair"
A mix of technical sans-serifs and high-end serifs.

### 1. Primary Sans: **Hanken Grotesk** (`--font-hanken`)
- **Usage**: Technical headings, modern navigation, and uppercase branding.
- **Vibe**: Architectural, precise, contemporary.

### 2. Luxury Serif: **Playfair Display** (`--font-playfair`)
- **Usage**: Featured headlines, artistic accents, and italic descriptions.
- **Vibe**: Sophisticated, timeless, artistic.

### 3. UI/Body: **Inter** (`--font-inter`)
- **Usage**: General interface text, inputs, and dense information.
- **Vibe**: Neutral, legible, professional.

### 4. Technical: **Geist** (`--font-sans`)
- **Usage**: Global fallback and utility text.

---

## 📐 Layout & Components
- **Editorial Asymmetry**: Use staggered image placements and indented typography to avoid a "generic" grid feel.
- **Pill-Style Elements**: Buttons and inputs should use `rounded-full` or `rounded-3xl` for a soft, integrated feel.
- **Minimalist Elevation**: No harsh box-shadows. Use very deep, transparent shadows (`shadow-2xl shadow-black/5`) or clean border lines (`border-black/5`).
- **Technical Grids**: Use multi-column layouts with specific vertical dividers for a "digital tool" aesthetic.

---

## ✨ Motion & Interaction
- **Cinematic Entrance**: All main sections use Framer Motion with slow durations (1.5s - 2.5s) and custom easing (`[0.22, 1, 0.36, 1]`).
- **Slow Zoom**: Hero images use a `scale: 1.1` to `1.0` transition on load.
- **Subtle Highlights**: Hover states use `bg-gray-50/50` (whitish) instead of dark grays to keep the UI "luminous".

---

## 🛠️ Implementation Rules
1. **Never use placeholders**: Always use high-quality architectural or coastal imagery.
2. **Typography First**: Always lead with the Serif/Sans mix to maintain the luxury feel.
3. **White Space**: Maintain generous padding (`py-40`, `px-12`) to allow the design to "breathe".
