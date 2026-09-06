---
name: Institutional Rigor
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#505f7b'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0b1b34'
  on-primary-container: '#7584a2'
  inverse-primary: '#b8c7e8'
  secondary: '#7f5700'
  on-secondary: '#ffffff'
  secondary-container: '#fdba45'
  on-secondary-container: '#6f4b00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002118'
  on-tertiary-container: '#029576'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#b8c7e8'
  on-primary-fixed: '#0b1b34'
  on-primary-fixed-variant: '#394762'
  secondary-fixed: '#ffdeae'
  secondary-fixed-dim: '#fdba45'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#85f7d3'
  tertiary-fixed-dim: '#68dab7'
  on-tertiary-fixed: '#002118'
  on-tertiary-fixed-variant: '#00513f'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  surface-canvas: '#F8FAFC'
  surface-card: '#FFFFFF'
  surface-subtle: '#F1F5F9'
  border-hairline: '#E2E8F0'
  border-strong: '#CBD5E1'
  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-muted: '#94A3B8'
  status-success: '#15803D'
  status-success-bg: '#ECFDF5'
  status-warning: '#B45309'
  status-warning-bg: '#FFFBEB'
  status-danger: '#B91C1C'
  status-danger-bg: '#FEF2F2'
  accent-gold-subtle: '#FEF3C7'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  mono-data:
    fontFamily: monospace
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  mono-badge:
    fontFamily: monospace
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 2px
  space-xs: 4px
  space-sm: 8px
  space-md: 12px
  space-lg: 16px
  space-xl: 20px
  space-2xl: 24px
  space-3xl: 32px
  screen-margin-mobile: 16px
  card-padding-mobile: 14px
  table-row-height: 44px
---

## Brand & Style

This design system delivers an institutional-grade enterprise mobile interface for mvusys (มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย). It unites the architectural precision, understated confidence, and high-density legibility of modern fintech infrastructure with the timeless dignity required of a royal educational institution.

The visual direction centers on **Fintech Rigor and Modern Institutionalism**:
- **Pristine Structural Hierarchy**: Grid-first, zero-superfluous-ornament layout model governed by 1px precision hairline boundaries.
- **Deep Navy & Subtle Regal Warmth**: Grounded in deep midnight navy (`#0B1B34`), balanced by immaculate off-white canvas tones, pure white data containers, and restrained touches of amber-gold and institutional jade.
- **Systematic Density**: Compact tabular records, monospace metadata labels, crisp segmented toggles, and compact action surfaces optimized for high-volume enterprise operations on mobile viewports.
- **Clarity over Decorum**: Information is structured for immediate operational parsing—grades, royal academic credentials, administrative orders, and financial registries are displayed with unyielding legibility and high tactile feedback.

## Colors

The palette establishes an authoritative, high-trust operational canvas.

- **Primary (`#0B1B34`)**: Deep midnight blue. Applied to dominant UI frames, critical interactive touchpoints, primary buttons, and top-tier typographic anchors.
- **Secondary (`#D99B26`)**: Restrained royal amber-gold. Used selectively for honors, high-level institutional badges, ministerial verifications, and premium active states.
- **Tertiary (`#3EB594`)**: Precision emerald teal. Used for automated system states, cleared ledger transactions, verified signatures, and active real-time services.
- **Neutral (`#64748B`)**: Slate neutral governing supporting icons, boundary lines, inactive states, and tabular metadata.

### Color Rules
1. **Background Contrast**: Backgrounds alternate between Canvas (`#F8FAFC`) and pure Container White (`#FFFFFF`). Never use raw gray fills for large body containers.
2. **Hairline Separators**: Use `#E2E8F0` at strictly 1px thickness to divide rows, segments, and card sections. Avoid shadows wherever a crisp hairline boundary communicates division.
3. **Data Indicators**: Color is functional, never decorative. Every badge, pill, and status dot maps directly to an explicit workflow state.

## Typography

The typographic engine uses **Inter** throughout all proportional scales, supplemented by system monospaced types for tabular data, registration serials, and institutional identifiers.

- **Numerics & Records**: Numerical financial data, dates, timestamps, and identification records must render with tabular figures (`font-variant-numeric: tabular-nums`) to maintain strict vertical scanning alignment.
- **Hierarchical Density**: Use medium (`500`) and semi-bold (`600`) weights sparingly to emphasize primary operational anchors; preserve normal (`400`) weight for secondary context to avoid visual noise.
- **Micro Monospace**: All tracking IDs, system status codes, Pali curriculum reference codes, and timestamps use `mono-badge` and `mono-data` to evoke fintech infrastructure rigor.

## Layout & Spacing

The layout is built on a tight, purposeful 4px base increment, maximizing mobile viewport utility while preventing claustrophobic density.

- **Mobile Viewport Structure**: Outer horizontal container margins are locked to `16px` (`screen-margin-mobile`). 
- **Card Geometry**: Internal padding for standard operational cards is fixed at `14px` vertically and `16px` horizontally, creating a crisp boundary without wasted area.
- **Vertical Rhythm**: Related elements sit `4px` or `8px` apart; distinct record sets or metadata sections sit `12px` to `16px` apart. Full screen modules are partitioned by `24px` margins.
- **Tabular Rhythms**: Data lists and transactional summaries conform to a standardized minimum touch target of `44px` per row (`table-row-height`), ensuring thumb-driven enterprise efficiency.

## Elevation & Depth

In alignment with Column-inspired architectural clarity, this system minimizes diffuse drop shadows. Visual depth is established primarily through **hairline grid containment** and **surface layering**:

- **Layer 0 (Canvas Base)**: Deep institutional canvas tone (`#F8FAFC`), entirely flat.
- **Layer 1 (Contained Surfaces)**: Pure white (`#FFFFFF`) with a 1px solid border (`#E2E8F0`). Zero ambient blur; hierarchy is achieved by border contrast against the canvas.
- **Layer 2 (Interactive Floating / Active Sheets)**: Action sheets, bottom drawers, and active popovers utilize a restrained micro-shadow: `0 4px 16px -2px rgba(11, 27, 52, 0.08)`, framed by a solid `1px` border in `#CBD5E1`.
- **Dividers**: Interior row borders within cards are strictly 1px horizontal rules in `#F1F5F9`.

## Shapes

The design system employs **Soft (Level 1)** geometric curvature. Surfaces favor disciplined squareness with slight rounding to eliminate harshness while maintaining technical rigor:

- **Base Radius (0.25rem / 4px)**: Default buttons, inputs, segmented control thumbs, and micro tags.
- **Container Radius (0.5rem / 8px)**: Primary operational cards, modals, and list clusters.
- **Status Pills (9999px)**: Full pill curvature is reserved solely for compact categorical status badges and active counters to contrast cleanly against rectangular cards.

## Components

### Buttons
- **Primary**: Solid midnight navy (`#0B1B34`) fill with crisp white text, 4px border radius, 40px height on mobile. Subtle active scale feedback (`scale(0.98)`).
- **Secondary / Outline**: Pure white background with a 1px `#CBD5E1` border, `#0F172A` text.
- **Tertiary / Ghost**: Zero fill, `#0B1B34` text with active background highlight (`#F1F5F9`).

### Input Fields & Controls
- **Text Inputs**: 40px height, 1px `#CBD5E1` border, white background, 4px radius. Focus state shifts border to `#0B1B34` with zero outer fuzzy glow.
- **Segmented Controls**: Inset container with `#F1F5F9` background, 4px padding. Active segment renders in pure white with a 1px `#E2E8F0` hairline border and deep navy text.

### Badges & Status Pills
- **Monospace Micro-Badges**: Monospace text (`10px`), uppercase, tracking `+0.04em`. 20px height, 4px radius, padded 6px horizontally.
- **Status Pills**: Fully rounded pill shapes with low-saturation backgrounds and high-contrast text (e.g., active clearance uses `#ECFDF5` background with `#15803D` text and a `#10B981` leading 6px dot).

### Cards & Data Tables
- **Cards**: Pure white surfaces bounded by a 1px `#E2E8F0` border. Headers and footers are divided from body content using 1px interior horizontal rules.
- **Dense Data Rows**: Left-aligned parameter titles in muted slate (`#475569`), right-aligned values in tabular mono or semi-bold deep slate (`#0F172A`).