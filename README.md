# Doxis Mobile — Authentication Flow Wireframes

Interactive HTML wireframes for the Doxis Mobile app authentication flow. 12 screens covering all entry states, QR paths, and the shared sign-in journey.

---

## Quickstart

### Option A — Claude Code (recommended)

Open this folder in **Claude Code**. The server starts automatically via `.claude/launch.json`.

Then open: **http://localhost:3456**

---

### Option B — Terminal (no Claude Code)

You need Node.js installed. Run this from the project root:

```bash
npx serve -l 3456 wireframes
```

Then open: **http://localhost:3456**

> `npx serve` downloads itself on first run (~2 seconds). No `npm install` needed.

---

### Option C — Open directly in browser (no server)

Double-click `wireframes/index.html` in Finder and open it in your browser. CSS and navigation work fine with `file://` — no server required for local browsing.

---

## Navigation

| Action | Result |
|--------|--------|
| Click any card on the index | Opens that screen |
| `←` / `→` arrow keys | Previous / next screen |
| `Esc` | Back to index |
| "All screens" link (top-left of any screen) | Back to index |

---

## File Structure

```
project root/
├── README.md                   ← you are here
├── Mobile-DS.md                ← design system reference (tokens, components)
├── wireframes.html             ← original monolith (superseded, kept for reference)
│
└── wireframes/                 ← live wireframe set
    ├── index.html              ← hub — card gallery of all 12 screens
    ├── css/
    │   ├── tokens.css          ← all design tokens (colours, spacing, type, shadows)
    │   └── ui.css              ← all component styles
    ├── js/
    │   └── nav.js              ← keyboard nav + prev/next wiring
    └── screens/
        ├── 01-state-a.html     ← Entry: Enter URL (first launch)
        ├── 02-state-a-qr.html  ← Entry: QR Scanner
        ├── 03-state-a-qr-error.html ← Entry: QR Error state
        ├── 04-state-b.html     ← Entry: Known tenants (single URL)
        ├── 05-state-c.html     ← Entry: Multi-server list
        ├── 06-tenant.html      ← Shared: Select Workspace (step 1/4)
        ├── 07-auth-style.html  ← Shared: Select Auth Method (step 2/4)
        ├── 08-credentials.html ← Shared: Username + Password (step 3/4)
        ├── 09-sso.html         ← Shared: SSO / IDP Redirect (step 3/4)
        ├── 10-loading.html     ← Shared: Signing In… (step 3→4)
        ├── 11-role.html        ← Shared: Select Role (step 4/4)
        └── 12-home.html        ← Destination: Home Screen
```

---

## Screen Map

```
State A (new user)          State B (one URL saved)     State C (multi-URL)
01 Enter URL ──────────┐    04 Tenant List ──────┐      05 Server List ──┐
02 QR Scanner ─────────┤                         │                       │
03 QR Error   ─────────┘                         │                       │
                        ↓                        ↓                       ↓
                    06 Select Workspace  ←────────────────────────────────
                        ↓
                    07 Auth Method  (skipped if only 1 method)
                      ↙         ↘
              08 Credentials    09 SSO / IDP
                      ↘         ↙
                    10 Signing In…
                        ↓
                    11 Select Role  (skipped if only 1 role)
                        ↓
                    12 Home Screen  ✓
```

### Auto-skip rules
- **Screen 07** is skipped when the tenant has exactly one auth method configured.
- **Screen 11** is skipped when the user has exactly one role assigned.
- Both skips route through **screen 10** (loading) so the transition isn't abrupt.
- A QR code containing URL + account info skips screen 06 (tenant selection) entirely.

---

## Design System

All visual styles come from `DESIGN.md` (in this folder if present) via the shared CSS:

| File | What's inside |
|------|---------------|
| `wireframes/css/tokens.css` | CSS custom properties — colours, spacing, radius, shadows, typography |
| `wireframes/css/ui.css` | Component styles — device frame, buttons, lists, modals, home screen |
| `Mobile-DS.md` | Full developer reference — token tables, component specs, brand rules |

Brand: **Business Studio / WebCube** = teal `#1f7082` · **OCS** = purple `#6d629e`

---

## Editing Screens

Each screen is a self-contained HTML file in `wireframes/screens/`. To add or change a screen:

1. Copy the closest existing screen as a starting point.
2. Update the `href` values in the `<header>` nav (Prev / Next links).
3. Add the screen to the `SCREENS` array in `wireframes/js/nav.js` so keyboard navigation includes it.
4. Add a card to `wireframes/index.html` in the appropriate group.

The CSS custom properties in `tokens.css` map 1-to-1 to the Figma `❖ Mobile DS` variable names — any token used in a screen file can be looked up in `Mobile-DS.md`.
