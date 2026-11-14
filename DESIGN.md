---
name: FloodLens
description: Documentary cartographic interface for reading radar flood observations with traceable evidence.
colors:
  paper: "#f4f4f2"
  panel: "#fbfbfa"
  ink: "#16232e"
  ink-soft: "#46586a"
  line: "#d4d7d3"
  reference: "#1f5fa6"
  newwater: "#0e8f9a"
  newwater-edge: "#064a52"
  ambiguous: "#8a5a00"
  noteval: "#6b7280"
  select: "#101820"
  alert: "#a03e00"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Source Sans 3 Variable, Source Sans 3, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.55
  data:
    fontFamily: "ui-monospace, SF Mono, Cascadia Mono, monospace"
    fontFeature: "tabular-nums"
rounded:
  card: "8px"
  control: "4px"
  chip: "3px"
  hair: "2px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  button-primary-hover:
    backgroundColor: "{colors.select}"
  button-outline:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
  chip-layer:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "6px 10px"
  card-evidence:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "16px"
  stamp-synthetic:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ambiguous}"
    rounded: "{rounded.chip}"
    padding: "2px 8px"
---

# Design System: FloodLens

## Overview

**Creative North Star: "The Survey Record"**

FloodLens reads like a field survey document that happens to be interactive: neutral paper grounds, hairline rules, tabular data stamps, and a map whose colors are a legend first and a picture second. Every surface behaves like a record sheet — observation dates, method notes and limitations sit next to the thing they describe, never behind it. The 3D territory is an instrument panel, not a spectacle: flat thematic masks over exaggerated relief, no waves, no simulated water advance.

Density is calm and operable. One column carries the viewer, one carries the chapter record; the chrome (top bar, legend bar) stays fixed while records scroll. Expression lives in precision — hatches, outlines, monospace stamps — not in ornament.

**Key Characteristics:**

- Neutral cool paper ground; panels a half-step lighter; hairline borders instead of shadows.
- Class colors are semantic and constant across map, legend, chips and exercises.
- Color is never the only identifier: hatches, outlines and labels accompany every class.
- Near-square corners (8/4/3/2 px); sentence case everywhere; monospace only for real data.
- Synthetic provenance is stamped on every surface that shows demonstration data.

## Colors

A documentary palette: two neutrals for ground and panel, two inks for text, one hairline, and five semantic class colors borrowed from cartographic convention.

### Primary

- **Survey Ink** (#16232e): primary text, primary buttons, active chapter chip. The voice of the record.
- **Selection Black** (#101820): focus rings, selected evidence markers and selected card outline. High-contrast state, never decoration.

### Secondary

- **Reference Blue** (#1f5fa6): permanent reference water, stable across dates and chapters.
- **New Water Turquoise** (#0e8f9a) with **Sheet Edge** (#064a52) outline: possible new water. The outline is part of the class, not an effect.

### Tertiary

- **Ambiguous Amber** (#8a5a00): amber hatch for ambiguous areas; also the synthetic-data stamp and caution notes.
- **Not-Evaluated Gray** (#6b7280): gray hatch for excluded zones.
- **Alert Rust** (#a03e00): destructive actions and hard warnings only.

### Neutral

- **Paper** (#f4f4f2): page ground.
- **Panel** (#fbfbfa): cards, bars, stamps.
- **Ink Soft** (#46586a): secondary text.
- **Hairline** (#d4d7d3): borders, dividers, swatch edges.

### Named Rules

**The Legend Contract Rule.** A class color on the map must be the same value as its legend swatch and its exercise chip. If a mask renders washed out, the render order is wrong — fix the pipeline, never the legend.

**The Two-Identifier Rule.** Every thematic class carries color plus a second identifier (hatch, outline or label). Removing color must leave the map readable.

## Typography

**Display Font:** Archivo (Variable), system-ui fallback
**Body Font:** Source Sans 3 (Variable), system-ui fallback
**Data Font:** ui-monospace stack (SF Mono, Cascadia Mono)

**Character:** A grotesque record-keeping pair: Archivo sets headings with tight tracking and balance; Source Sans 3 reads long method notes without fatigue; monospace appears only where numbers are data — dates, coordinates, blend values, stamps.

### Hierarchy

- **Display** (700, cover heading, -0.015em): the product name and chapter titles; text-wrap balance.
- **Title** (600, card and section headings): evidence card titles, panel headings.
- **Body** (400, 16px, 1.55): method notes, explanations, limitations.
- **Label** (600, 12-14px): buttons, chips, legend entries; sentence case.
- **Data** (400-600, 12px, tabular-nums): acquisition dates, product ids, blend readout, provenance stamps.

### Named Rules

**The Sentence Case Rule.** Headings, nav, buttons and labels use sentence case. Title Case is a defect, not a style.

**The Real Data Rule.** Monospace is reserved for values a sensor or a file produced. Never set prose in monospace for atmosphere.

## Layout

Desktop is a fixed-viewport instrument: top bar, a two-column main (flexible viewer column + 440px record column), and a sticky legend/next bar. Each column scrolls independently; the viewer keeps its height while records scroll. Mobile stacks: viewer plate (h-64/h-80), text alternative, then the chapter record, with the legend bar sticky at the bottom. Spacing rhythm is 4/8/16/24 px; cards pad 16 px, bars pad 8-16 px. The cover is a centered two-column sheet (statement + offers/not cards left, 2D plate right) and loads no 3D.

## Elevation & Depth

Flat by default. Depth is tonal (paper vs panel) plus hairline borders; there are no card shadows. The single exception is the map evidence marker, which floats above the terrain and carries one soft ambient shadow so it reads as an instrument pin.

### Shadow Vocabulary

- **Marker pin** (`box-shadow: 0 2px 6px rgb(16 24 32 / 0.35)`): evidence markers only.

### Named Rules

**The Flat Record Rule.** Panels and cards never lift. If something needs emphasis, use the selection outline or a state color, not a shadow.

## Shapes

Near-square corners on product surfaces: cards 8 px, controls 4 px, chips 3 px, swatches and stamps 2 px. Semantic circles stay round: evidence markers and focus rings. Borders are 1 px hairline; the selected evidence card and selected marker use a 2 px selection-black outline. Hatches are 45° repeating gradients at 2 px stroke / 6 px period — a cartographic texture, not decoration.

## Components

### Buttons

- **Shape:** gently squared (4 px).
- **Primary:** survey ink ground, paper text, 6px 12px padding, 14 px label; hover deepens to selection black.
- **Outline:** panel ground, hairline border, ink text; used for mode toggles and secondary actions; pressed state fills via aria-pressed styling.
- **Focus:** 2 px selection-black ring at 2 px offset, everywhere.

### Chips

- **Layer chips:** panel ground, hairline border, 3 px radius, swatch + label; toggle visibility of a map class.
- **Chapter chips (top bar):** sentence case; active chapter fills survey ink with paper text; inactive is ink-soft text with accent hover.

### Cards / Containers

- **Evidence card:** panel ground, 8 px radius, hairline border, 16 px padding; definition list of observed / interpretation / method / limitations / sources; selected card swaps the border for a 2 px selection outline.
- **Exercise card:** same shell; radio options with visible focus; feedback lines ("Correct." / "Answer corrected.") plus why-others-unsupported block.
- **Text alternative:** collapsible record sheet under the viewer, available at every breakpoint.

### Stamps

- **Synthetic stamp:** monospace 12 px, amber text and border on panel, 3 px radius. Appears on cover plate, viewer overlay and sources screen. It is provenance, not a badge: no dots, arrows or icons.

### Navigation

- Top bar: wordmark left, chapter chips center, mode and motion toggles right; wraps to stacked rows on mobile. Bottom bar: legend left, Previous/Next right; sticky.

## Do's and Don'ts

### Do:

- **Do** keep observation dates visible wherever an observation is shown (data font, tabular figures).
- **Do** stamp synthetic provenance on every surface that renders demonstration data.
- **Do** pair every class color with a hatch, outline or label.
- **Do** use sentence case and the 8/4/3/2 px radius scale on product surfaces.
- **Do** let the journey work fully without WebGL: text alternative and HTML exercises carry the learning.

### Don't:

- **Don't** render a thematic mask under an observation texture; the legend contract outranks the render stack.
- **Don't** add taglines, helper text or secondary labels the layout should carry.
- **Don't** invent chrome on pills and stamps (no dots, arrows, icons or mono prose).
- **Don't** use shadows, gradients or dramatized motion to suggest water advance or depth.
- **Don't** present synthetic or unverified data without its label; NISAR pending is stated, never silently substituted.