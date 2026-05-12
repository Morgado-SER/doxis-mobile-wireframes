# Doxis Mobile DS — Developer Reference

> **Figma source:** [❖ Mobile DS](https://www.figma.com/design/YLbWRsnUsdArvuZkX95iCp/%E2%9D%96-Mobile-DS)  
> **Foundation library:** Untitled UI (`NV4lkpzub5OMG5Ovk0edWx`)  
> **Last synced:** 2026-05-12  
> Storybook is the source of truth for implementation. This doc describes intent and tokens — always verify behaviour in Storybook.

---

## 1. Overview

| Principle | In practice |
|-----------|-------------|
| **Neutral by default** | Achromatic base — white surfaces, gray text, subtle borders. Colour signals brand, state, or intent — never decoration. |
| **One brand per product** | BS = teal, OCS = purple, WC = teal (same as BS). Brand appears in header gradient, active nav, and primary CTAs only. |
| **8px grid** | All spacing is a multiple of 4px; primary rhythm is 8px. Use tokens — no hardcoded values. |
| **Density is intentional** | Nav items: 36px min-height. Table rows: comfortable. Modals: 400px, single action. Drawers: 460px, complex content. |
| **Borders over shadows** | Layering via `1px border-secondary`. Shadows only on floating elements (modals, popovers, drawers). |
| **Dark mode is first-class** | Every semantic token has a dark override via `[data-theme="dark"]`. Never use raw primitives in components. |

---

## 2. Design Tokens

### 2.1 Colours

#### 2.1.1 Primitives — Gray

| Step | Light | Dark | Use |
|------|-------|------|-----|
| 25 | `#fdfdfd` | — | Subtle alt background |
| 50 | `#fafafa` | — | Secondary background |
| 100 | `#f5f5f5` | — | Tertiary background, disabled |
| 200 | `#e9eaeb` | `#373a41` | Borders (secondary) |
| 300 | `#d5d7da` | `#373a41` | Borders (primary), placeholder subtle |
| 400 | `#a4a7ae` | `#61656c` | Disabled text, fg-quaternary |
| 500 | `#717680` | `#85888e` | Placeholder, text-quaternary |
| 600 | `#535862` | `#94979c` | Text tertiary |
| 700 | `#414651` | `#cecfd2` | Text secondary |
| 800 | `#252b37` | — | Text secondary-hover |
| 900 | `#181d27` | `#f7f7f7` | Text primary |
| 950 | `#0a0d12` | — | Page overlay, bg-primary-solid |

#### 2.1.2 Primitives — Brand BS / WC (teal)

```
25   #f3f7f8    50   #e6eff1    100  #dae7ea    200  #cddfe3
300  #9bbfc7    400  #6aa0ac    500  #388090    600  #1f7082 ★
700  #066074    800  #075365    900  #094451    950  #0e323a
```

- **500** → focus-ring halo colour (`rgba(56,128,144,0.24)`)
- **600** ★ → primary action (buttons, active nav, `border-brand`)
- **700** → hover on primary actions
- **Header gradient:** `linear-gradient(45deg, #075365, #1f7082)`

#### 2.1.3 Primitives — Brand OCS (purple)

```
25   #f5f4f8    50   #eae8f1    100  #d5d2e3    200  #c1bbd6
300  #aca5c8    400  #978eba    500  #8278ac    600  #6d629e ★
700  #594b91    800  #443583    900  #2f1e75    950  #16084c
```

- **600** ★ → primary action, checkbox checked fill
- **700** → hover on primary, heading accent (`text-brand-secondary`)
- **Header gradient:** `linear-gradient(90deg, #443583, #6d629e)`

---

#### 2.1.4 Semantic — Backgrounds

Always use these tokens in components, never the raw primitives above.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--color-bg-primary` | `#ffffff` | `#0c0e12` | Cards, panels, sidebar, modal |
| `--color-bg-primary-alt` | `#ffffff` | `#0c0e12` | Alt primary (component distinction) |
| `--color-bg-primary-hover` | `#fafafa` | `#22262f` | Row/item hover |
| `--color-bg-secondary` | `#fafafa` | `#13161b` | Page body, content area |
| `--color-bg-tertiary` | `#f5f5f5` | `#22262f` | Chips, tags, input backgrounds |
| `--color-bg-quaternary` | `#e9eaeb` | `#373a41` | Dividers used as background |
| `--color-bg-disabled` | `#f5f5f5` | `#22262f` | Disabled inputs, buttons |
| `--color-bg-brand-primary` | `#e6eff1` | `#0e323a` | Active nav item background (BS) |
| `--color-bg-brand-secondary` | `#dae7ea` | `#1f7082` | Active badge background |
| `--color-bg-brand-solid` | `#1f7082` | `#1f7082` | Primary button fill |
| `--color-bg-error-primary` | `#fef3f2` | `#55160c` | Error state background |
| `--color-bg-success-primary` | `#ecfdf3` | `#053321` | Success state background |
| `--color-bg-warning-primary` | `#fffaeb` | `#4e1d09` | Warning state background |
| `--color-bg-overlay` | `rgba(15,18,28,.5)` | — | Modal backdrop |

#### 2.1.5 Semantic — Text

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--color-text-primary` | `#181d27` | `#f7f7f7` | Headings, primary content |
| `--color-text-secondary` | `#414651` | `#cecfd2` | Body text, nav labels, form labels |
| `--color-text-tertiary` | `#535862` | `#94979c` | Supporting text, descriptions |
| `--color-text-quaternary` | `#717680` | `#85888e` | Metadata, captions |
| `--color-text-placeholder` | `#717680` | `#85888e` | Input placeholder |
| `--color-text-disabled` | `#a4a7ae` | `#85888e` | Disabled labels |
| `--color-text-white` | `#ffffff` | `#ffffff` | Text on coloured/dark surfaces |
| `--color-text-brand-secondary` | `#066074` | `#cecfd2` | Active nav item text (BS) |
| `--color-text-error` | `#d92d20` | `#f97066` | Inline error messages |

#### 2.1.6 Semantic — Borders

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--color-border-primary` | `#d5d7da` | `#373a41` | Checkbox, input, card outer border |
| `--color-border-secondary` | `#e9eaeb` | `#22262f` | Dividers, subtle row separators |
| `--color-border-tertiary` | `#f5f5f5` | `#22262f` | Bottom section divider |
| `--color-border-brand` | `#388090` | `#6aa0ac` | Focus outline, brand-accented borders |
| `--color-border-disabled` | — | — | Disabled input border |
| `--color-border-disabled_subtle` | — | — | Subtle disabled border |
| `--color-border-error` | `#f04438` | `#f97066` | Error input border |
| `--color-border-error_subtle` | — | — | Subtle error border |
| `--color-border-brand_alt` | — | — | Alt brand border |
| `--color-border-brand_strong` | — | — | Strong brand border |

#### 2.1.7 Semantic — Foreground (icons, SVG strokes)

| Token | Use |
|-------|-----|
| `--color-fg-quaternary` | Default nav icon colour (resting) |
| `--color-fg-brand-primary` | Active nav icon, brand icon |
| `--color-fg-secondary` | Secondary icon |
| `--color-fg-white` | Icon on coloured/dark background |
| `--color-fg-error-primary` | Error icon |
| `--color-fg-success-secondary` | Status dot (online/active) |

#### 2.1.8 OCS-specific tokens

Used in parallel with the semantic layer for OCS product brand overrides.

```css
--color-brand-ocs-25:  #f5f4f8   /* notice block background */
--color-brand-ocs-50:  #eae8f1   /* active nav bg */
--color-brand-ocs-200: #c1bbd6   /* notice block border */
--color-brand-ocs-300: #aca5c8   /* checked row border */
--color-brand-ocs-600: #6d629e   /* primary action, checkbox fill */
--color-brand-ocs-700: #594b91   /* hover on primary, heading accent */
```

> ⚠️ OCS purple tokens do not have confirmed dark mode overrides — test manually.

---

### 2.2 Typography

**Font:** Inter (variable font) · **Smoothing:** `-webkit-font-smoothing: antialiased` always on.

#### Scale

| Token | Size | Line height | Use |
|-------|------|------------|-----|
| `--font-size-xs` | 12px | 18px | Section labels, captions, nav group headers |
| `--font-size-sm` | 14px | 20px | **Primary UI text** — nav labels, table cells, buttons, form inputs |
| `--font-size-md` | 16px | 24px | Modal titles, body copy, card headings |
| `--font-size-lg` | 18px | 28px | Drawer headers |
| `--font-size-display-xs` | 24px | 32px | Page titles |
| `--font-size-display-sm` | 30px | 38px | Section hero text |

#### Weights

| Token | Value | Use |
|-------|-------|-----|
| `--font-weight-regular` | 400 | Supporting text, descriptions |
| `--font-weight-medium` | 500 | **Default UI text** — nav labels, table data, form values |
| `--font-weight-semibold` | 600 | Headings, button labels, active nav items, section group labels |
| `--font-weight-bold` | 700 | Avatar initials, strong emphasis |

#### Usage rules

- Nav item labels → `sm/medium` at rest, `sm/semibold` when active
- Section group headers → `xs/semibold`, `text-placeholder`, uppercase + letter-spacing
- Page titles → `display-xs/semibold`, `text-primary`
- Drawer headers → `lg/semibold`, `text-primary`
- Modal titles → `md/semibold`, `text-primary`
- Supporting/description text → `sm/regular`, `text-tertiary`
- Table primary cell → `sm/medium`, `text-primary`
- Table secondary cell → `sm/regular`, `text-secondary`

---

### 2.3 Spacing

8px base, 4px steps. Every measurement maps to a token.

| Token | Value | Common use |
|-------|-------|-----------|
| `--spacing-none` | 0px | — |
| `--spacing-xxs` | 2px | Checkbox label offset, tight item gap |
| `--spacing-xs` | 4px | Gap between list rows, badge padding-y |
| `--spacing-sm` | 6px | Nav item padding-y, small element gaps |
| `--spacing-md` | 8px | Section padding, icon-to-text gap, card internal gap |
| `--spacing-lg` | 12px | Checkbox-to-label gap, nav item padding-x |
| `--spacing-xl` | 16px | Footer action gap, standard button gap |
| `--spacing-2xl` | 20px | — |
| `--spacing-3xl` | 24px | Page content padding, modal padding, drawer padding |
| `--spacing-4xl` | 32px | Drawer top padding, header inner padding |
| `--spacing-5xl` | 40px | Child nav item indent |
| `--spacing-6xl` | 48px | — |
| `--spacing-7xl` | 64px | — |

---

### 2.4 Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-none` | 0px | — |
| `--radius-xxs` | 2px | — |
| `--radius-xs` | 4px | Small chips |
| `--radius-sm` | 6px | Nav items, icon buttons, checkboxes |
| `--radius-md` | 8px | **Standard** — buttons, inputs, badges, dropdowns, role rows |
| `--radius-lg` | 10px | — |
| `--radius-xl` | 12px | Modals, cards, org switcher popover |
| `--radius-2xl` | 16px | Large cards |
| `--radius-full` | 9999px | Avatars, pills, status dots, scrollbar thumb |

---

### 2.5 Elevation / Shadows

| Token | CSS value | Use |
|-------|-----------|-----|
| `--shadow-xs` | `0 1px 2px rgba(10,13,18,.05)` | Subtle lift, button default |
| `--shadow-sm` | `0 1px 3px rgba(…) + 0 1px 2px rgba(…)` | Dropdown menus |
| `--shadow-md` | `0 12px 16px -4px rgba(…)` | Floating cards |
| `--shadow-xl` | `0 20px 24px -4px rgba(…)` | Org switcher popover |
| `--shadow-2xl` | `0 24px 48px -12px rgba(…)` | Modals |
| `--shadow-3xl` | `0 32px 64px -12px rgba(…)` | Full-screen overlays |

Additional named shadow levels in Figma: `shadow-xs`, `shadow-sm_01`, `shadow-sm_02`, `shadow-md_02`, `shadow-lg_01`, `shadow-lg_03`, `shadow-xl_02`.

#### Skeuomorphic button shadow

Applied to all primary and secondary buttons:

```css
--shadow-xs-skeuomorphic:
  0 0 0 1px rgba(10,13,18,.18),          /* outer border */
  0 1px 2px -1px rgba(10,13,18,.14),     /* drop shadow */
  inset 0 -2px 0 rgba(10,13,18,.05),     /* bottom bevel */
  inset 0 1px 0 rgba(255,255,255,.12);   /* top highlight */
```

#### Focus ring

```css
--shadow-focus-ring:
  0 0 0 4px rgba(56,128,144,.24),  /* brand halo (BS/WC) */
  0 0 0 2px rgba(255,255,255,1);   /* white inner ring */
```

Dark mode: inner ring becomes `rgba(12,14,18,1)` instead of white.

#### Modal / drawer backdrop

```css
/* Modal */
background: rgba(15, 18, 28, 0.5);

/* Drawer */
background: rgba(15, 18, 28, 0.4);
```

---

### 2.6 Focus Rings

Figma effect styles — apply via `box-shadow` in code.

| Style name | Use case |
|-----------|----------|
| `focus-ring` | Toggles, checkboxes |
| `focus-ring-error` | Destructive / error states |
| `focus-ring-shadow-xs` | Buttons, tabs (with elevation) |
| `focus-ring-shadow-sm` | Medium elevated elements |
| `focus-ring-error-shadow-xs` | Destructive button error state |
| `focus-ring-shadow-xs-skeuomorphic` | Optional — adds 3D depth. Annotated in Figma: *"can be replaced with focus-ring-shadow-xs if you prefer flat"* |
| `focus-ring-error-shadow-xs-skeuomorphic` | Optional — error variant of above |

> Focus rings are mandatory for keyboard navigation. Never suppress `outline` without replacing it with an equivalent focus-ring style.

---

## 3. Brands

| Product | ID | Primary | Hover | Gradient |
|---------|-----|---------|-------|----------|
| Business Studio | `bs` | `#1f7082` | `#066074` | `linear-gradient(45deg, #075365, #1f7082)` |
| One Cloud Studio | `ocs` | `#6d629e` | `#594b91` | `linear-gradient(90deg, #443583, #6d629e)` |
| WebCube | `wc` | `#1f7082` | `#066074` | Same as BS |

**Brand colour appears on:**
- Header gradient background
- Primary button fill and hover
- Active nav item (text + icon)
- Checkbox checked state
- Focus ring halo
- Brand-tinted info notices

**Brand colour never appears on:**
- Body text or table data
- Secondary actions
- Decorative elements

---

## 4. Components

Components are sourced from the **❖ Mobile DS** Figma library. The file also references ❖ Klippa Foundations, ❖ Untitled UI (Templates + In work), Phosphor Icons, and Iconic Pro Icons.

> **⚠️ Updated 2026-05-12** — components marked with this flag were recently changed; verify current behaviour in Figma or Storybook before implementing.

---

### 4.1 Buttons

#### Button (primary)

The main CTA button. Three visual treatments based on context.

| Property | Values |
|----------|--------|
| **Variant** | Primary, Ghost/Cancel |
| **Size** | sm (36px height), md, lg |
| **State** | default, hover, focus, pressed, disabled, loading |
| **Icon** | leading, trailing, none |

**Primary specs:**
```
background:    --color-bg-brand-solid  (#1f7082 BS / #6d629e OCS)
color:         --color-text-white
hover:         --color-bg-brand-solid-hover
shadow:        --shadow-xs-skeuomorphic
radius:        --radius-md
height:        36px (dialog size)
padding:       0 16px
font:          sm/semibold
```

**Ghost / Cancel specs:**
```
background:    transparent
border:        1px --color-border-primary
color:         --color-text-secondary
hover bg:      --color-bg-secondary
```

---

#### Button destructive

Danger variant. Uses brand colour — **not red** (red = error states only, per copy rules).

| Property | Values |
|----------|--------|
| **Size** | sm, md, lg |
| **State** | default, hover, focus, pressed, disabled |
| **Focus ring** | `focus-ring-error-shadow-xs` |

---

#### Button utility

Secondary icon-driven action. Lighter visual weight than primary.

| Property | Values |
|----------|--------|
| **Size** | sm, md, lg |
| **State** | default, hover, focus, pressed, disabled |

---

#### Button close X

Dismiss / close button. Used in modals, drawers, toasts.

```
Size:     28×28 (modal header), 32×32 (drawer header)
Radius:   --radius-sm
```

| Property | Values |
|----------|--------|
| **Size** | sm, md |
| **State** | default, hover, focus, pressed, disabled |

---

#### Button loading icon

Animated spinner used within loading state of buttons.

| Property | Values |
|----------|--------|
| **Size** | sm, md, lg |
| **Animation** | spinning, stopped |

---

#### Button group

Composite: wraps two or more buttons in a horizontal row.

---

#### Social button / Social button groups

Authentication buttons (Google, Apple, etc.). Used in sign-in flows.

> ⚠️ Verify exact providers and variant structure in Figma — spec not in DESIGN.md.

---

### 4.2 Navigation

#### Nav item button / Nav item base / Nav item dropdown base

Core nav row components used inside `Sidebar navigation` and `Search menu navbar`.

```
min-height:   36px
padding:      6px 12px  (--spacing-sm --spacing-lg)
radius:       --radius-sm
gap:          8px (icon → label)
icon:         20×20, --color-fg-quaternary (rest)
chevron:      16×16, --color-fg-quaternary, right-aligned
font:         sm/medium (rest) → sm/semibold (active)
```

**Active state — BS/WC:**
```css
background: var(--color-bg-brand-primary);     /* #e6eff1 */
color:      var(--color-text-brand-secondary); /* #066074 */
icon color: var(--color-fg-brand-primary);    /* #1f7082 */
```

**Active state — OCS:**
```css
background: var(--color-brand-ocs-50);  /* #eae8f1 */
color:      var(--color-brand-ocs-700); /* #594b91 */
icon color: var(--color-brand-ocs-600); /* #6d629e */
```

Section group label:
```css
font-size:   12px  (--font-size-xs)
font-weight: 600   (--font-weight-semibold)
color:       --color-text-placeholder
padding:     4px 8px
text-transform: uppercase; letter-spacing: ...;
```

| Property | Values |
|----------|--------|
| **State** | default, hover, active, disabled |
| **Has chevron** | true, false |
| **External link** | false (chevron) → true (`link-external-02` icon, 16px) |
| **Child indent** | 40px (`--spacing-5xl`) |

---

#### Application nav menu button

Top-level nav trigger (hamburger / app-switcher area).

> ⚠️ Spec not in DESIGN.md — verify in Figma.

---

#### Sidebar navigation ⚠️ Updated 2026-05-12

Full left-hand navigation panel.

```
Width:         260px (expanded) → 60px (collapsed)
Background:    --color-bg-primary
Border-right:  1px --color-border-secondary
Collapse:      width 0.2s ease — labels/chevrons/section headers hidden, icons centred
```

| Property | Values |
|----------|--------|
| **State** | expanded, collapsed |
| **Has header** | true, false |
| **Has footer** | true, false |

---

#### Search menu navbar

Search-triggered nav overlay.

> ⚠️ Spec not in DESIGN.md — verify in Figma.

---

#### Breadcrumbs

Page location trail.

> ⚠️ Spec not in DESIGN.md — verify in Figma or Storybook.

---

#### Pagination

Page navigation control.

> ⚠️ Spec not in DESIGN.md — verify in Figma or Storybook.

---

### 4.3 Cards

#### Nav account card / Nav featured card ⚠️ Updated 2026-05-12

User/account summary card shown in the nav panel. Recently updated.

> ⚠️ Spec not in DESIGN.md — verify variant properties in Figma.

---

#### Nav account card menu item

Individual menu row inside a nav account card.

---

#### Card header

Reusable header slot for card-type surfaces.

> ⚠️ Spec not in DESIGN.md — verify in Figma.

---

#### Focus ring card

Helper component — wraps content with a focus ring treatment for card-level focus states. **Not a consumer component.**

---

### 4.4 Forms

#### Input field ⚠️ Updated 2026-05-12

Standard single-line text input.

| Property | Values |
|----------|--------|
| **Size** | sm, md, lg |
| **State** | default, hover, focus, disabled, error, success |
| **Leading icon** | true, false |
| **Trailing icon** | true, false |
| **Label** | visible, hidden |
| **Helper text** | none, hint, error |

Token usage:
```
bg:             --color-bg-tertiary (default) → --color-bg-primary (focus)
border:         --color-border-primary (default) → --color-border-brand (focus) → --color-border-error (error)
placeholder:    --color-text-placeholder
text:           --color-text-primary
radius:         --radius-md
focus ring:     focus-ring-shadow-xs
```

---

#### Textarea input field ⚠️ Updated 2026-05-12

Multi-line text area. Same token usage as Input field.

| Property | Values |
|----------|--------|
| **Size** | md, lg |
| **State** | default, hover, focus, disabled, error |
| **Resize** | vertical, none |

---

#### Verification code input field

OTP / PIN entry. Single character per box.

| Property | Values |
|----------|--------|
| **State** | default, focus, filled, error, completed |
| **Input type** | numeric, alphanumeric |

> Digit count (4/6/8): verify in Figma — not confirmed in DESIGN.md.

---

#### Dropdown

Selection trigger + overlay list.

| Property | Values |
|----------|--------|
| **State** | closed, open, disabled |
| **Size** | sm, md, lg |

> Detailed variant properties: verify in Figma.

---

#### Radio group

Grouped radio inputs.

| Property | Values |
|----------|--------|
| **State** | default, selected, disabled |
| **Orientation** | vertical, horizontal |

> ⚠️ Spec not in DESIGN.md — verify in Figma.

---

#### _Command input ⚠️ Internal

Internal command palette input. **Not for consumer use.** Prefixed with `_` indicating a private/helper component.

---

### 4.5 Overlays

#### Modal ⚠️ Updated 2026-05-12

Centered overlay. Used for confirmation dialogs (delete, remove, unassign).

```
Width:       400px (max-width: 100%)
Padding:     24px
Radius:      --radius-xl (12px)
Shadow:      0 8px 32px rgba(15,18,28,.2), 0 2px 8px rgba(15,18,28,.1)
Backdrop:    rgba(15,18,28,.5), z-index 10000
```

| Property | Values |
|----------|--------|
| **Size** | sm, md, lg |
| **Has header** | true, false |
| **Has footer** | true, false |

Anatomy:
- **Header:** title (`md/semibold`) + close `×` button (28×28, `--radius-sm`)
- **Body:** description (`sm/regular`, `text-secondary`), 16px bottom margin
- **Footer:** `justify-content: flex-end`, Cancel + action button

**Animations:**
```
Backdrop: opacity 0.15s ease
Card:     opacity + scale 0.95→1, 0.18s cubic-bezier(0.34, 1.4, 0.64, 1)  /* slight overshoot */
Exit:     0.12s (faster than enter)
```

> **Copy rule:** Destructive CTA uses brand colour, not red. Red = error states only.

---

### 4.6 Tabs

#### Horizontal tabs ⚠️ Updated 2026-05-12

Standard tab bar. Used in the Page Section area of the content shell.

```
Placement:   below Page Header, above Page Content
padding:     16px / 24px horizontal (~68px height block)
```

| Property | Values |
|----------|--------|
| **State** | default, active, disabled |
| **Size** | sm, md |

> ⚠️ Detailed spec not in DESIGN.md — verify tab underline/indicator treatment in Figma.

---

#### Vertical tabs ⚠️ Updated 2026-05-12

Side-aligned tab navigation.

> ⚠️ Spec not in DESIGN.md — verify in Figma.

---

### 4.7 Content Structure

#### Section header ⚠️ Updated 2026-05-12

Top of a content section. Typically title + optional action/count.

| Property | Values |
|----------|--------|
| **Has action** | true, false |
| **Has count** | true, false |

---

#### Section footer

Bottom of a content section. Typically pagination or summary row.

---

#### Content divider

Horizontal rule between sections.

| Property | Values |
|----------|--------|
| **Style** | solid, dashed |
| **Spacing** | sm, md, lg |

---

### 4.8 Icons & Helpers

#### Icon library

**Source:** Untitled UI · **Size:** 20×20 · **Stroke:** `currentColor`, `stroke-width: 1.67`

Rendered via `DsIcon.vue` — always pass `name` (IconName) and `:size`. Never inline raw `<svg>` for known icons.

Icon colour is always inherited via `currentColor`.

**Common roles:**

| Position | Icon | Size |
|----------|------|------|
| Nav item icon | product-specific | 20px |
| Expand chevron | `chevron-down` / `chevron-up` | 16px |
| External link | `link-external-02` | 16px |
| Collapse menu | `layout-left` | 20px |
| Modal/drawer close | `×` path | 20px |

---

#### Navigation pointer icons

`navigation-pointer-01`, `navigation-pointer-02`, `navigation-pointer-off-01`, `navigation-pointer-off-02`

Compass/map direction indicators. Use `-off-` variants for inactive state.

---

#### Menu icons

`menu-01` through `menu-05` — hamburger navigation icons (horizontal lines, varying weight/gap).

---

#### Credit card icons (15 variants)

Icon-only components. Not interactive UI components.

`credit-card-01/02/x/down/up/plus/minus/check/edit/lock/search/upload/download/shield/refresh`

---

#### Keyboard icons

`keyboard-01`, `keyboard-02` — keyboard/controller metaphor icons.

---

#### Internal helpers ⚠️ Not for consumer use

| Component | Purpose |
|-----------|---------|
| `_Avatar add button` | Internal avatar upload trigger |
| `_Command input` | Internal command palette input |
| `text-input` | Base text input primitive |
| `line-height` | Rich text editor line-height control |

---

## 5. Layout

### Page shell (`PrototypePage.vue`)

```
Total frame:    1440 × 1024px
Background:     --color-bg-secondary

AppHeader:      1440 × 64px  — brand gradient
CloudMenu:      260px × 960px — bg-primary, 1px border-secondary right
Content area:   1180px, flex-column, bg-secondary
```

### Content area structure (always this order)

1. **Page Header** — `padding: 24px / 16px bottom` (~100px)
   - Breadcrumbs → title + description + actions → divider
2. **Page Section** — `padding: 16px / 24px horizontal` (~68px)
   - Horizontal tab bar
3. **Page Content** — `padding: 24px`
   - Tables, grids, cards

### Z-index stack

| Layer | Z-index |
|-------|---------|
| Base content | 0 |
| CloudMenu | auto |
| Org switcher | 300–301 |
| Drawers | 9999 |
| Modals | 10000 |

### Side drawer

Right-panel overlay for multi-field forms and complex selection.

```
Width:       460px (max-width: 90vw)
Height:      100vh
Backdrop:    rgba(15,18,28,.4), z-index 9999
Shadow:      -12px 0 40px rgba(15,18,28,.18)
```

Anatomy:
- **Header:** `20px 24px` padding, `border-bottom: 1px border-secondary`, title (`lg/semibold`) + subtitle (`sm/tertiary`) + close (32×32)
- **Body:** `flex: 1`, `overflow-y: auto`, `20px 24px` padding, `24px` gap between sections
- **Footer:** `16px 24px` padding, `border-top: 1px border-secondary`, Cancel + primary action

**Animations:**
```
Backdrop: opacity 0.18s ease
Slide:    translateX(100%)→0, 0.22s cubic-bezier(0.2, 0.8, 0.3, 1)
Exit:     0.12s (faster than enter)
```

---

## 6. Dark Mode

Activated via `[data-theme="dark"]` on `<html>` or `<body>`.

### Key shifts

| Element | Light | Dark |
|---------|-------|------|
| Page background | `#fafafa` | `#13161b` |
| Panel / sidebar | `#ffffff` | `#0c0e12` |
| Border (primary) | `#d5d7da` | `#373a41` |
| Border (secondary) | `#e9eaeb` | `#22262f` |
| Text primary | `#181d27` | `#f7f7f7` |
| Text secondary | `#414651` | `#cecfd2` |
| Brand solid button | `#1f7082` | `#1f7082` (unchanged) |
| Shadows | `rgba(10,13,18,...)` | `rgba(0,0,0,...)` higher opacity |
| Focus ring inner | `rgba(255,255,255,1)` | `rgba(12,14,18,1)` |

### Rules

- Always use semantic tokens — they automatically flip in dark mode.
- Never use raw primitives (e.g., `--color-gray-200`) in components.
- OCS purple brand tokens (`--color-brand-ocs-*`) do not have confirmed dark overrides — test manually.
- Shadows use higher opacity in dark mode to compensate for dark surfaces reducing contrast.

---

## 7. Animation

| Pattern | Duration | Easing |
|---------|----------|--------|
| Modal backdrop fade | `0.15s` | `ease` |
| Modal card pop (enter) | `0.18s` | `cubic-bezier(0.34, 1.4, 0.64, 1)` — slight overshoot |
| Drawer backdrop fade | `0.18s` | `ease` |
| Drawer slide-in | `0.22s` | `cubic-bezier(0.2, 0.8, 0.3, 1)` — fast deceleration |
| Nav hover / active | `0.12s` | — |
| Button hover | `0.1s` | — |
| Org switcher pop | `0.15s` | `ease` + `translateY(-6px) scale(0.97)` enter |
| Menu collapse | `0.2s` | `ease` — 260px → 60px |

Exit animations are always faster than enter (typically `0.12s` vs `0.18–0.22s`).

---

## 8. Copy Guidelines

- **Destructive confirmations** — use the action verb, not "Are you sure?": *"Delete 3 users?"*, *"Remove user?"*
- **Remove vs Delete** — "Remove" = revoke access (reversible). "Delete" = permanent from org.
- **Bulk actions** — describe scope: *"Add to 4 users"*, *"Delete 3 users"*
- **Empty state notice** — first person plural: *"No users have been added yet."*
- **Section labels** — ALL CAPS, letter-spaced, no punctuation: `DOXIS CONTENT SERVICE BUS`
- **Placeholder text** — sentence case, no period: *"Search by name or email"*
- **Button labels** — imperative verb: *"Save"*, *"Apply roles"*, *"Cancel"*, *"Remove"*
- **Brand colour on destructive CTA** — use brand colour, not red. Red is reserved for error states only.

---

## 9. Accessibility

### Focus management

- Focus rings are **mandatory** for keyboard navigation. Never suppress `outline` without a replacement.
- Two style tiers available:
  - **Flat:** `focus-ring` / `focus-ring-error` — recommended default
  - **Skeuomorphic:** `focus-ring-shadow-xs-skeuomorphic` — optional, annotated in Figma as replaceable with flat
- Error states use `-error` ring variants (`focus-ring-error`, `focus-ring-error-shadow-xs`)
- Dark mode: focus ring inner ring shifts from `rgba(255,255,255,1)` → `rgba(12,14,18,1)`

### Colour contrast

- Semantic tokens are designed to maintain WCAG AA contrast in both light and dark mode.
- Never reach for raw primitives in components — semantic tokens are the safe path.
- OCS purple token dark mode behaviour is unverified — check contrast manually before shipping dark-mode OCS screens.
- The BS teal ramp at 600 (`#1f7082`) against white text meets AA on primary buttons.

### Semantic HTML

- Use `DsIcon.vue` for icons — it handles `aria-hidden` correctly for decorative icons.
- Destructive confirmation modals should use `role="alertdialog"` and manage focus trap.
- Nav items marked as external links (with `link-external-02` icon) should include `aria-label` noting the external destination.

---

## 10. Changelog

| Date | Version | Change | Author |
|------|---------|--------|--------|
| 2026-05-12 | 1.0.0 | Initial documentation generated from Figma ❖ Mobile DS + DESIGN.md | — |

---

*Generated from Figma file [❖ Mobile DS](https://www.figma.com/design/YLbWRsnUsdArvuZkX95iCp/%E2%9D%96-Mobile-DS) and project `DESIGN.md`. Token values sourced from `DESIGN.md`. Component catalog sourced from Figma MCP. Storybook is the implementation source of truth.*
