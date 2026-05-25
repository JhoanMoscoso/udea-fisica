# Web Design and Style Guide

This guide establishes the visual, structural, and interaction foundations to ensure consistency, readability, and professionalism in the development of the user interface.

---

## 1. Color Palette

To maintain a modern, immersive, and high-impact aesthetic, a palette with sharp contrasts for dark backgrounds and vibrant accent elements has been defined.

### Base and Interface Colors
* **Deep Twilight (Main Background / Dark Mode)**
    * **HEX:** `#090040`
    * **HSL:** `hsla(248, 100%, 13%, 1)`
    * **Usage:** Primary page backgrounds, massive canvas areas, and structural blocks for dark mode.
* **Indigo (Secondary Elements / Structure)**
    * **HEX:** `#471396`
    * **HSL:** `hsla(264, 78%, 33%, 1)`
    * **Usage:** Navigation bars, secondary components, divider borders, cards, and depth gradients.

### Accent and State Colors
* **Lime Green (Primary Action / Success)**
    * **HEX:** `#68ff00`
    * **HSL:** `hsla(96, 100%, 50%, 1)`
    * **Usage:** Primary Call to Action (CTA) buttons, "active" state indicators, success messages, and high-priority highlights.
* **Bright Amber (Alerts / Notifications)**
    * **HEX:** `#ffcc00`
    * **HSL:** `hsla(48, 100%, 50%, 1)`
    * **Usage:** Attention points, warnings, badges, pending notifications, or key quantitative elements.

---

## 2. Typography

A three-font system that separates display, body, and monospace concerns for maximum clarity and editorial character.

* **Display Font: Playfair Display (Weight: 500–700) — `--font-primary`**
    * **Scope:** Headings only — `<h1>` to `<h3>`, hero names, section titles, page titles, and the nav brand logo.
    * **Purpose:** High-contrast editorial serif with strong vertical rhythm. Use weight 600 for section titles and 700 for the hero name. Do NOT use for body copy, nav links, or buttons.
* **Body Font: Work Sans (Weight: 400–600) — `--font-body`**
    * **Scope:** All body text — paragraphs, nav links, buttons, badges, labels, captions, form inputs, timeline descriptions, and any running text that is not a heading.
    * **Purpose:** A clean geometric sans-serif optimized for screen readability. Provides contrast to Playfair Display without competing for attention.
* **Mono Font: Fira Code (Weight: 400–500) — `--font-mono`**
    * **Scope:** Code blocks, technical labels, section eyebrow labels, timestamps, tech stack tags, and any element requiring monospaced alignment.
    * **Purpose:** Ensures characters share exact horizontal width, facilitating quick visual scanning of structured or technical data.

---

## 3. Shapes, Borders, and Structure

Extremes (rigid right angles or fully circular curves) are avoided in favor of slightly rounded corners (*Soft Corners*), which provide a modern and clean look.

* **Small Components (Inputs, Buttons, Badges, Tooltips):**
    * `border-radius: 6px;`
* **Medium and Large Components (Cards, Panels, Modals, Sections):**
    * `border-radius: 8px;`

---

## 4. Textures and Visual Effects (Glassmorphism)

For the creation of panels, dropdown menus, or floating cards over the `Deep Twilight` background, the frosted glass technique will be used to simulate depth and information layers:

```css
.panel-glass {
  background: rgba(9, 0, 64, 0.6); /* Semi-transparent Deep Twilight base */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08); /* Subtle border reflection */
}
```

---

## 5. Spacing System (8px Scale)

To ensure mathematical harmony and visual consistency in paddings and margins, a system based on a foundational 8px increment is adopted:

| Variable / Token | Measurement | Common Usage |
| :--- | :--- | :--- |
| `space-xs` | **4px** | Very tight internal spacing (e.g., between text and icon). |
| `space-s` | **8px** | Spacing between internal form elements or inputs. |
| `space-m` | **16px** | Standard padding for cards and spacing between paragraphs. |
| `space-l` | **24px** | Margins between adjacent element groups or components. |
| `space-xl` | **32px** | Spacing between main interface blocks or sections. |
| `space-xxl` | **48px / 64px** | Massive separations (e.g., top margins of full pages). |

---

## 6. Interaction States (Components)

### Primary Button (Base: Lime Green)
* **Normal:** `background-color: #68ff00; color: #090040; font-family: 'Work Sans', sans-serif; font-weight: bold;` *(Uses dark background text for accessible contrast)*.
* **Hover:** `background-color: #55cc00;` *(Subtle darkening of the green)* + `cursor: pointer;`.
* **Active:** `background-color: #449900; transform: scale(0.98);` *(Physical pressure feedback)*.
* **Focus:** `outline: 2px solid #ffffff; outline-offset: 2px;` *(Keyboard navigation guarantee)*.
* **Disabled:** `background-color: #00d527; opacity: 0.4; cursor: not-allowed;`.

### Secondary Button / Interactive Containers (Base: Indigo)
* **Normal:** `background-color: #471396; color: #ffffff;`
* **Hover:** `background-color: #360e73;`
* **Active:** `background-color: #270a54;`

---

## 7. Shadows and Elevation (Box Shadows)

On dark backgrounds like `Deep Twilight`, shadows must be denser and darker to be perceived, helping to identify which elements are "above" others:

* **Level 1 (Static Cards / Embedded Elements):**
    `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);`
* **Level 2 (Floating Menus, Modals, Dropdowns):**
    `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.4);`

---

## 8. Iconography

* **Required Style:** **Solid (Filled)**.
* **Golden Rule:** All icons integrated into the interface (e.g., FontAwesome Solid, Lucide Filled, or Bootstrap Icons Filled) must exclusively use their solid variant. This ensures strong visual weight consistent with the editorial tone of *Playfair Display* headings and prevents the visual fatigue caused by mixing thin outline styles with compact dark elements.
* **Standard Size:** `16px` for buttons/text lines; `24px` for card headers or descriptive blocks.

---

## 9. Accessibility and Contrast (WCAG Criteria)

To avoid visual fatigue and comply with readability standards (minimum contrast ratio of 4.5:1):

* **Text on Dark Background (Deep Twilight / Indigo):** Exclusively use White (`#ffffff`) or Very Light Gray (`#e2e8f0`) text. Avoid using dark fonts.
* **Text on Vibrant Background (Lime Green / Bright Amber):** Mandatory use of dark text (`#090040`). Using white text on lime green or bright amber backgrounds destroys contrast and drastically reduces readability.
