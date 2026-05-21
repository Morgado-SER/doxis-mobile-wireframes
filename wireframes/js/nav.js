/**
 * Doxis Mobile Wireframes — Navigation
 * Handles prev/next between screens + keyboard shortcuts.
 * Each screen HTML sets data-screen on <body>.
 */

const SCREENS = [
  {
    id: 'state-a',
    file: '01-state-a.html',
    title: 'State A · Enter URL',
    group: 'Entry Point',
    description: 'First launch — user enters gateway URL manually or opens QR scanner.'
  },
  {
    id: 'state-a-qr',
    file: '02-state-a-qr.html',
    title: 'State A · QR Scanner',
    group: 'Entry Point',
    description: 'Camera viewfinder to scan a Doxis gateway QR code.'
  },
  {
    id: 'state-a-qr-error',
    file: '03-state-a-qr-error.html',
    title: 'State A · QR Error',
    group: 'Entry Point',
    description: 'QR code unreadable or points to invalid gateway. Inline error, manual fallback.'
  },
  {
    id: 'state-b',
    file: '04-state-b.html',
    title: 'State B · Select Tenant',
    group: 'Entry Point',
    description: 'All saved accounts share the same URL — land directly on tenant list.'
  },
  {
    id: 'state-c',
    file: '05-state-c.html',
    title: 'State C · Select URL',
    group: 'Entry Point',
    description: 'Accounts across different URLs — pick a server first, then a tenant.'
  },
  {
    id: 'tenant',
    file: '06-tenant.html',
    title: 'Select Workspace',
    group: 'Shared Path',
    description: 'User picks a tenant on the resolved gateway. Step 1 of 4.'
  },
  {
    id: 'auth-style',
    file: '07-auth-style.html',
    title: 'Select Auth Method',
    group: 'Shared Path',
    description: 'Shown only when the tenant has more than one auth method. Skipped otherwise.'
  },
  {
    id: 'credentials',
    file: '08-credentials.html',
    title: 'Credentials (U+P)',
    group: 'Shared Path',
    description: 'Username & password entry in a bottom-sheet modal.'
  },
  {
    id: 'sso',
    file: '09-sso.html',
    title: 'SSO / IDP Redirect',
    group: 'Shared Path',
    description: 'Redirecting to external identity provider (Entra ID, Okta, etc.).'
  },
  {
    id: 'loading',
    file: '10-loading.html',
    title: 'Signing In…',
    group: 'Shared Path',
    description: 'Authentication in progress. Auto-skips auth style / role if only one option.'
  },
  {
    id: 'role',
    file: '11-role.html',
    title: 'Select Role',
    group: 'Shared Path',
    description: 'User picks a role for this session. Skipped if only one role is allowed.'
  },
  {
    id: 'home',
    file: '12-home.html',
    title: 'Home Screen',
    group: 'Destination',
    description: 'Authenticated home. Shows confirmation banner, quick actions, recent documents.'
  },
  {
    id: 'accounts',
    file: '13-accounts.html',
    title: 'Manage Accounts',
    group: 'Error Recovery',
    description: 'Accessed from a login error — switch account, edit credentials, or remove an account for the current org.'
  }
];

(function () {
  const currentFile = window.location.pathname.split('/').pop();
  const currentIdx  = SCREENS.findIndex(s => s.file === currentFile);
  const current     = SCREENS[currentIdx];

  function $(id) { return document.getElementById(id); }

  document.addEventListener('DOMContentLoaded', () => {
    /* ── Counter ─────────────────────────────────────────────────────── */
    const counter = $('nav-counter');
    if (counter && current) {
      counter.textContent = `${currentIdx + 1} / ${SCREENS.length}`;
    }

    /* ── Screen title ────────────────────────────────────────────────── */
    const titleEl = $('nav-screen-title');
    if (titleEl && current) titleEl.textContent = current.title;

    /* ── Prev / Next links ───────────────────────────────────────────── */
    const prevBtn = $('nav-prev');
    const nextBtn = $('nav-next');

    if (prevBtn) {
      if (currentIdx > 0) {
        prevBtn.href = SCREENS[currentIdx - 1].file;
        prevBtn.title = SCREENS[currentIdx - 1].title;
      } else {
        prevBtn.classList.add('disabled');
        prevBtn.removeAttribute('href');
      }
    }

    if (nextBtn) {
      if (currentIdx < SCREENS.length - 1) {
        nextBtn.href = SCREENS[currentIdx + 1].file;
        nextBtn.title = SCREENS[currentIdx + 1].title;
      } else {
        nextBtn.classList.add('disabled');
        nextBtn.removeAttribute('href');
      }
    }

    /* ── Keyboard shortcuts ──────────────────────────────────────────── */
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft'  && currentIdx > 0) {
        window.location.href = SCREENS[currentIdx - 1].file;
      }
      if (e.key === 'ArrowRight' && currentIdx < SCREENS.length - 1) {
        window.location.href = SCREENS[currentIdx + 1].file;
      }
      if (e.key === 'Escape') {
        window.location.href = '../index.html';
      }
    });
  });
})();
