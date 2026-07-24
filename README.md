# Wyze Security Bundle Builder

A highly polished, responsive, and robust **Wyze Home Security Bundle Builder** web application built using **React 19**, **TypeScript**, **Vite**, **Zustand**, and **Tailwind CSS v4**.

This application enables customers to build their customized security system in a step-by-step accordion builder, with live pricing calculations and order summary updates synchronizing instantly.

---

## 🛠️ Tech Stack & Key Choices

1. **React 19 & TypeScript:** Leverage the latest React features and strict, type-safe API patterns with type-only import enforcement (`verbatimModuleSyntax`).
2. **Vite:** High-performance, fast-reloading dev server and build tool.
3. **Tailwind CSS v4:** Utilizes the new `@tailwindcss/vite` compiler. Theme styles and color variables are defined natively using `@theme` CSS declarations, ensuring zero configuration friction.
4. **Zustand:** Standard client state management. Solves e-commerce synchronizations without triggering unnecessary re-renders or prop-drilling.
5. **Lucide React:** Responsive and lightweight vector icons.

---

## 📁 Architecture & Folder Structure

The project implements a **feature-based folder structure** that groups logic, styles, and UI elements into domain-specific modules, maintaining clear separations of concern:

```text
src/
├── app/                  # Application initialization & layouts
│   └── App.tsx           # Global routing layout and navbar
├── components/           # UI Components sorted by domain
│   ├── accordion/        # Accordion wrapper & Step headers
│   │   ├── Accordion.tsx
│   │   └── AccordionStep.tsx
│   ├── product/          # Product card elements & stepper bindings
│   │   ├── ProductCard.tsx
│   │   ├── ProductImage.tsx
│   │   ├── QuantityStepper.tsx
│   │   └── VariantSelector.tsx
│   ├── review/           # Review panel rows & summary boxes
│   │   ├── ReviewPanel.tsx
│   │   ├── ReviewRow.tsx
│   │   └── Totals.tsx
│   └── ui/               # Reusable atomic design system tokens
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Divider.tsx
│       ├── Price.tsx
│       └── Typography.tsx
├── data/                 # JSON file databases
│   └── products.json     # Product list & variants metadata
├── lib/                  # Helper utilities and styles
│   └── utils.ts          # Conditional class merger helper (cn)
├── store/                # Zustand State Stores
│   └── useBundleStore.ts # Central store, mutual exclusion plans, & hub rules
├── types/                # Strict TypeScript interface declarations
│   ├── product.ts
│   └── store.ts
├── utils/                # Pure utility functions
│   └── pricing.ts        # Dynamic subtotal & discount math
├── index.css             # Tailwind v4 theme variables
└── main.tsx              # Main entrypoint mount
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `npm` installed.

### 1. Install Dependencies
In the root directory of the project, run:
```bash
npm install
```

### 2. Run the Development Server
Launch the local Vite server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 3. Build for Production
To compile and build the production-ready static bundles:
```bash
npm run build
```
The compiled code will be generated inside the `/dist` folder.

---

## ⚡ Key Core Business Rules

- **Variant-Specific Quantity Isolation:** Camera variants (e.g. White, Grey, Black) manage their quantities independently. Switching variants on a card does not overwrite other variants' quantities.
- **Mutual Exclusion for Plans:** Selecting one security plan automatically deselects other plan tiers in the step category.
- **Required Sensor Hub Logic:** If a user selects any sensor, the `Wyze Sense Hub` is automatically added to the bundle at quantity 1 with a locked/disabled stepper. If sensors are cleared, the Hub is removed.
- **Derived Pricing:** Totals (original price, actual subtotal, monthly payment, savings) are dynamically derived from selected items to prevent state synchronization bugs.
- **LocalStorage Sync:** Selection state, active accordion steps, and variants are saved and automatically restored when clicking "Save my system for later" and reloading the page.

---

## ⚖️ Tradeoffs & Design Decisions

### 1. Figma Mockup Pricing Typo
In the Figma mockup, the row for `Wyze Cam Pan v3` with `qty 2` lists `$57.98` (original) and `$47.98` (actual). Mathematically, however:
- The unit price on the card is `$34.98` (compare price `$39.98`).
- The sum of actual prices for all items in the mockup (using `$47.98` for the camera row) adds up to exactly `$187.89` (the shown Subtotal), and the sum of original prices adds up to exactly `$238.81`.
- If we multiply the unit price by quantity for `Wyze Cam Pan v3` (`$34.98 * 2`), we get `$69.96` (original `$39.98 * 2 = $79.96`).
- **Tradeoff Choice:** We implemented **mathematically correct pricing calculations** based on the unit prices. This ensures that the quantity stepper works consistently:
  - `Wyze Cam Pan v3` unit price = `$34.98` (compare `$39.98`).
  - For Qty = 2, row price will be `$69.96` (original `$79.96`).
  - The subtotal and original price totals will update mathematically (`Subtotal = $209.87`, `Original = $260.79`).
  - Crucially, the total **Savings** will still remain exactly **`$50.92`**! This preserves the layout's stated discount and makes the calculator work dynamically as the user changes quantities.

### 2. High-Performance SVG Component Drawings
To make the application fully self-contained and visually premium without risking broken external image assets, we drew custom vector illustrations directly inside the React components. When the user switches variants (e.g. from White to Grey or Black), the illustration dynamically recolors instantly.

---

## 🔮 Future Improvements

1. **Add to Cart Integration:** Connect the builder to a Shopify/Commerce API checkout flow.
2. **Dynamic Bundle Recommendations:** Implement an AI recommendation block suggesting matching accessories based on selected items (e.g., suggesting a Window Mount if the Wyze Cam v4 is added).
3. **Advanced Variant Images:** Expand the SVG/Image matrix to support different camera angles for variants.
4. **Interactive 3D Preview:** Embed a 3D model viewer (using Three.js/React Three Fiber) allowing users to see their home security setup inside a virtual layout.
