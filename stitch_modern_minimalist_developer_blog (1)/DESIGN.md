---
name: The Design System
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#ac3400'
  on-secondary: '#ffffff'
  secondary-container: '#fd6b36'
  on-secondary-container: '#5d1900'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59d'
  on-secondary-fixed: '#390c00'
  on-secondary-fixed-variant: '#832600'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display:
    fontFamily: Newsreader
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  h2:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  h3:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  ui-label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 24px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

The design system is anchored in the concept of "The Intellectual Engineer"—a persona that values the rigor of code as much as the clarity of thought. It moves away from the neon-and-gradient "SaaS" aesthetic, opting instead for a style influenced by mid-century architectural journals and modern broadsheets.

The visual language is rooted in **Minimalism** with a **Technical Grid** overlay. It utilizes precise alignment and generous margins to allow complex engineering concepts to breathe. The personality is sober and authoritative, yet the deliberate use of high-contrast serif typography ensures the brand feels curated and human rather than clinical.

## Colors

The palette is restricted to emphasize focus and intent. 
- **Ink (#0F172A):** The primary driver of the system. Used for almost all typography and structural elements to maintain a high-contrast, "ink-on-paper" feel.
- **Terracotta (#C2410C):** The singular accent. It is used sparingly for highlights, call-to-actions, and semantic signifiers, providing a warm, earthy counterpoint to the cool Ink.
- **Bone (#FDFCFB):** The primary background color. It is a very slightly warm off-white that reduces eye strain during long-form reading and feels more "editorial" than pure digital white.

## Typography

This design system employs a sophisticated typographic hierarchy that juxtaposes the literary quality of **Newsreader** with the utilitarian precision of **Inter**.

- **Serif (Headings):** Use Newsreader for all editorial headings. The high stroke contrast adds a sense of "prestige" to engineering deep-dives.
- **Sans-serif (Body & UI):** Inter is used for body copy and all functional UI elements. Body text should maintain a generous line height (1.6 - 1.7) to ensure maximum readability for technical documentation.
- **Labels:** Small-caps or uppercase Inter with increased letter spacing should be used for metadata and technical labels to reference blueprint annotations.

## Layout & Spacing

The layout philosophy is built on a **Fixed Grid** with an 8-column or 12-column structure depending on content density. 

Key layout signatures include:
- **Asymmetric Balance:** Main content columns should be offset to allow for wide "marginalia" (notes or code snippets) in the gutters.
- **Technical Grid Lines:** Use 1px hairline borders in a light grey (#E2E8F0) to separate sections. These lines should extend to the edge of the viewport where possible, mimicking the look of an engineer's technical drawing.
- **Vertical Rhythm:** A strict 4px/8px baseline grid ensures that even dense technical data feels organized and intentional.

## Elevation & Depth

This system rejects shadows in favor of **Tonal Layers** and **Structural Outlines**. 

Depth is communicated through:
- **Layering:** Using subtle shifts between the "Bone" background and "Surface" containers to define content areas.
- **Hairline Borders:** Elements are contained within 1px solid borders (Ink or Light Grey) rather than cast shadows. This reinforces the "blueprint" aesthetic.
- **Interaction Depth:** On hover, elements do not "lift" via shadows; instead, they may fill with a subtle tint or shift their border weight to indicate state change.

## Shapes

The design system utilizes **Sharp (0px)** corners for all primary UI elements, including buttons, input fields, and cards. This geometric rigidity reflects the precision of engineering and architectural blueprints. Softness is introduced only through typography and the occasional use of organic imagery, never through the UI containers themselves.

## Components

### Buttons
Primary buttons are solid "Ink" rectangles with white "Inter" labels in uppercase. Secondary buttons use a 1px "Ink" border with no fill. All buttons have 0px border-radius.

### Inputs
Input fields are minimalist, consisting of a 1px bottom-border only. Labels sit above the field in a small, tracked-out UI-label style. Error states utilize the Terracotta accent for both the border and the helper text.

### Cards & Containers
Cards do not have shadows. They are defined by a 1px hairline border. For featured content, cards may use an "Ink" header bar to create a strong visual anchor.

### Technical Callouts
Given the engineering focus, use a specific "Snippet" component: a light gray surface with a vertical Terracotta accent line on the left. This is used for "Pro-tips," "Warnings," or "Key Takeaways."

### Grid Pattern
A subtle background pattern of 1px dots spaced at 24px intervals can be used on large empty sections to reinforce the "engineering grid" metaphor without distracting from the content.