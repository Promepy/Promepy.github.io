// ============================================
// Theme Engine - Full Template-Driven Styling
// State management, computed styles, appearance modal
// ============================================
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-styling';
  var SCHEMA_VERSION = 1;
  var state = null;
  var memoryFallback = false;

  // ---- Default State ----
  function defaultState() {
    return {
      global: { activeTemplate: 'default-dark', overrides: {}, source: 'default' },
      pages: {},
      lastSaved: Date.now(),
      version: SCHEMA_VERSION
    };
  }

  // ---- State Management ----
  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { state = defaultState(); return; }
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !parsed.global) {
        console.warn('[Theme] Invalid state, resetting.');
        state = defaultState();
        return;
      }
      if (parsed.version !== SCHEMA_VERSION) {
        parsed = migrateState(parsed);
      }
      state = parsed;
    } catch (e) {
      console.warn('[Theme] localStorage read failed, using memory fallback.', e);
      state = defaultState();
      memoryFallback = true;
    }
  }

  function saveState() {
    state.lastSaved = Date.now();
    if (memoryFallback) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[Theme] localStorage write failed.', e);
      memoryFallback = true;
    }
  }

  function migrateState(old) {
    // Future migrations go here
    old.version = SCHEMA_VERSION;
    return old;
  }

  // ---- Path Normalization ----
  function getCurrentPath() {
    return window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  }

  // ---- Computed Styles ----
  function getComputedStyles() {
    var path = getCurrentPath();
    var template = window.getTemplate(state.global.activeTemplate);
    var result = Object.assign({}, template);

    // Apply global overrides
    if (state.global.overrides) {
      Object.keys(state.global.overrides).forEach(function (key) {
        result[key] = state.global.overrides[key];
      });
    }

    // Apply page-specific template
    var pageState = state.pages[path];
    if (pageState) {
      if (pageState.activeTemplate && pageState.activeTemplate !== state.global.activeTemplate) {
        var pageTemplate = window.getTemplate(pageState.activeTemplate);
        result = Object.assign({}, pageTemplate);
      }
      // Apply page overrides
      if (pageState.overrides) {
        Object.keys(pageState.overrides).forEach(function (key) {
          result[key] = pageState.overrides[key];
        });
      }
    }

    return result;
  }

  // ---- Apply Styles to DOM ----
  function applyStyles() {
    var s = getComputedStyles();
    var root = document.documentElement;

    // Mode class
    root.classList.toggle('light', s.mode === 'light');

    // Core palette
    root.style.setProperty('--bg', s.bg);
    root.style.setProperty('--bg-elevated', s.bgElevated);
    root.style.setProperty('--surface', s.surface);
    root.style.setProperty('--surface-hover', s.surfaceHover);
    root.style.setProperty('--text', s.text);
    root.style.setProperty('--text-secondary', s.textSecondary);
    root.style.setProperty('--text-muted', s.textMuted);
    root.style.setProperty('--accent', s.primary);
    root.style.setProperty('--accent-hover', s.primary);
    root.style.setProperty('--green', s.secondary);
    root.style.setProperty('--border', s.border);
    root.style.setProperty('--border-strong', s.borderStrong);
    root.style.setProperty('--accent-glow', s.glowColor);

    // Typography
    root.style.setProperty('--font-body', s.fontBody);
    root.style.setProperty('--t-font-heading', s.fontHeading);
    root.style.setProperty('--t-heading-weight', s.headingWeight);
    root.style.setProperty('--t-heading-transform', s.headingTransform);
    root.style.setProperty('--t-heading-spacing', s.headingSpacing);

    // Cards
    root.style.setProperty('--radius', s.cardRadius);
    root.style.setProperty('--t-card-border', s.cardBorder);
    root.style.setProperty('--t-card-shadow', s.cardShadow);
    root.style.setProperty('--t-card-hover-shadow', s.cardHoverShadow);
    root.style.setProperty('--t-card-hover-border', s.cardHoverBorder);
    root.style.setProperty('--t-card-bg', s.cardBg);

    // Buttons
    root.style.setProperty('--radius-sm', s.btnRadius);
    root.style.setProperty('--t-btn-transform', s.btnTransform);
    root.style.setProperty('--t-btn-letter-spacing', s.btnLetterSpacing);
    root.style.setProperty('--t-btn-shadow', s.btnShadow);

    // Hero & Background
    root.style.setProperty('--gradient-hero', s.heroBg);
    root.style.setProperty('--t-bg-pattern', s.bgPattern);
    root.style.setProperty('--t-bg-image', s.bgImage);

    // Effects
    root.style.setProperty('--shadow-glow', s.accentGlow);
    root.style.setProperty('--transition', s.transitionSpeed + ' cubic-bezier(.4,0,.2,1)');
    root.style.setProperty('--t-hover-lift', s.hoverLift);

    // Load fonts
    if (window.FontLoader) {
      window.FontLoader.load(s.fontBody);
      window.FontLoader.load(s.fontHeading);
    }
  }

  // ---- Public API ----
  function setTemplate(templateId, scope) {
    if (scope === 'page') {
      var path = getCurrentPath();
      if (!state.pages[path]) state.pages[path] = { overrides: {}, source: 'user' };
      state.pages[path].activeTemplate = templateId;
    } else {
      state.global.activeTemplate = templateId;
      state.global.source = 'user';
    }
    saveState();
    applyStyles();
  }

  function setOverride(key, value, scope) {
    if (scope === 'page') {
      var path = getCurrentPath();
      if (!state.pages[path]) state.pages[path] = { overrides: {}, source: 'user' };
      state.pages[path].overrides[key] = value;
    } else {
      state.global.overrides[key] = value;
    }
    saveState();
    applyStyles();
  }

  function clearOverrides(scope) {
    if (scope === 'page') {
      var path = getCurrentPath();
      if (state.pages[path]) {
        state.pages[path].overrides = {};
      }
    } else {
      state.global.overrides = {};
    }
    saveState();
    applyStyles();
  }

  function clearPageTemplate() {
    var path = getCurrentPath();
    delete state.pages[path];
    saveState();
    applyStyles();
  }

  function resetAll() {
    state = defaultState();
    saveState();
    applyStyles();
  }

  function getState() { return state; }
  function getScope() {
    var path = getCurrentPath();
    return state.pages[path] ? 'page' : 'global';
  }
  function getActiveTemplateId(scope) {
    if (scope === 'page') {
      var path = getCurrentPath();
      var ps = state.pages[path];
      return ps && ps.activeTemplate ? ps.activeTemplate : state.global.activeTemplate;
    }
    return state.global.activeTemplate;
  }

  // ---- Appearance Modal ----
  function createModal() {
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'settingsModal';
    overlay.innerHTML = buildModalHTML();
    document.body.appendChild(overlay);

    // Event delegation
    overlay.addEventListener('click', handleModalClick);
    overlay.addEventListener('input', handleModalInput);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  function buildModalHTML() {
    var templates = window.TEMPLATES || [];
    var activeId = getActiveTemplateId('global');

    var templateCards = templates.map(function (t) {
      return '<button class="tmpl-card' + (t.id === activeId ? ' active' : '') + '" data-tmpl="' + t.id + '" title="' + t.name + '">' +
        '<div class="tmpl-preview" style="background:' + t.preview + '"></div>' +
        '<span class="tmpl-name">' + t.name + '</span>' +
        (t.id === activeId ? '<span class="tmpl-check">✓</span>' : '') +
        '</button>';
    }).join('');

    var fontOptions = Object.keys(window.FontLoader ? window.FontLoader.FONT_MAP : {}).map(function (f) {
      var name = f.replace(/'/g, '').split(',')[0].trim();
      return '<option value="' + f + '">' + name + '</option>';
    }).join('');

    return '<div class="modal modal-lg" role="dialog" aria-label="Appearance Settings">' +
      '<div class="modal-header">' +
      '<h3>Appearance</h3>' +
      '<button class="modal-close" id="closeSettings" aria-label="Close">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '</div>' +

      // Scope toggle
      '<div class="scope-toggle">' +
      '<button class="scope-btn active" data-scope="global">Global</button>' +
      '<button class="scope-btn" data-scope="page">This Page</button>' +
      '</div>' +

      // Templates
      '<div class="modal-section">' +
      '<h4 class="modal-section-title">Templates</h4>' +
      '<div class="tmpl-grid" id="tmplGrid">' + templateCards + '</div>' +
      '</div>' +

      // Customize
      '<div class="modal-section">' +
      '<h4 class="modal-section-title">Customize</h4>' +
      '<div class="custom-row">' +
      '<label>Primary Color</label>' +
      '<div class="color-input-wrap">' +
      '<input type="color" id="custPrimary" class="color-input" />' +
      '<span class="color-hex" id="custPrimaryHex"></span>' +
      '</div>' +
      '</div>' +
      '<div class="custom-row">' +
      '<label>Secondary Color</label>' +
      '<div class="color-input-wrap">' +
      '<input type="color" id="custSecondary" class="color-input" />' +
      '<span class="color-hex" id="custSecondaryHex"></span>' +
      '</div>' +
      '</div>' +
      '<div class="custom-row">' +
      '<label>Font</label>' +
      '<select class="form-select" id="custFont" style="max-width:220px;">' + fontOptions + '</select>' +
      '</div>' +
      '</div>' +

      // Actions
      '<div class="modal-actions">' +
      '<button class="btn btn-ghost" id="btnResetOverrides">Reset Customizations</button>' +
      '<button class="btn btn-ghost" style="color:var(--text-muted);" id="btnResetAll">Reset Everything</button>' +
      '</div>' +
      '</div>';
  }

  function refreshModal() {
    var overlay = document.getElementById('settingsModal');
    if (!overlay) return;
    var scopeEl = overlay.querySelector('.scope-btn.active');
    var scope = scopeEl ? scopeEl.dataset.scope : 'global';
    var activeId = getActiveTemplateId(scope);
    var computed = getComputedStyles();

    // Update template cards
    overlay.querySelectorAll('.tmpl-card').forEach(function (card) {
      var isActive = card.dataset.tmpl === activeId;
      card.classList.toggle('active', isActive);
      var check = card.querySelector('.tmpl-check');
      if (isActive && !check) {
        card.insertAdjacentHTML('beforeend', '<span class="tmpl-check">✓</span>');
      } else if (!isActive && check) {
        check.remove();
      }
    });

    // Update controls
    var primary = overlay.querySelector('#custPrimary');
    var secondary = overlay.querySelector('#custSecondary');
    var font = overlay.querySelector('#custFont');
    if (primary) {
      primary.value = computed.primary;
      overlay.querySelector('#custPrimaryHex').textContent = computed.primary;
    }
    if (secondary) {
      secondary.value = computed.secondary;
      overlay.querySelector('#custSecondaryHex').textContent = computed.secondary;
    }
    if (font) font.value = computed.fontBody;
  }

  function handleModalClick(e) {
    var overlay = document.getElementById('settingsModal');

    // Close
    if (e.target === overlay || e.target.closest('#closeSettings')) {
      closeModal();
      return;
    }

    // Scope toggle
    var scopeBtn = e.target.closest('.scope-btn');
    if (scopeBtn) {
      overlay.querySelectorAll('.scope-btn').forEach(function (b) { b.classList.remove('active'); });
      scopeBtn.classList.add('active');
      refreshModal();
      return;
    }

    // Template selection
    var tmplCard = e.target.closest('.tmpl-card');
    if (tmplCard) {
      var scopeEl = overlay.querySelector('.scope-btn.active');
      var scope = scopeEl ? scopeEl.dataset.scope : 'global';
      setTemplate(tmplCard.dataset.tmpl, scope);
      refreshModal();
      return;
    }

    // Reset overrides
    if (e.target.closest('#btnResetOverrides')) {
      var scopeEl2 = overlay.querySelector('.scope-btn.active');
      var scope2 = scopeEl2 ? scopeEl2.dataset.scope : 'global';
      if (scope2 === 'page') clearPageTemplate();
      else clearOverrides('global');
      refreshModal();
      return;
    }

    // Reset all
    if (e.target.closest('#btnResetAll')) {
      resetAll();
      refreshModal();
      return;
    }
  }

  function handleModalInput(e) {
    var overlay = document.getElementById('settingsModal');
    var scopeEl = overlay.querySelector('.scope-btn.active');
    var scope = scopeEl ? scopeEl.dataset.scope : 'global';

    if (e.target.id === 'custPrimary') {
      setOverride('primary', e.target.value, scope);
      overlay.querySelector('#custPrimaryHex').textContent = e.target.value;
    }
    if (e.target.id === 'custSecondary') {
      setOverride('secondary', e.target.value, scope);
      overlay.querySelector('#custSecondaryHex').textContent = e.target.value;
    }
    if (e.target.id === 'custFont') {
      setOverride('fontBody', e.target.value, scope);
      setOverride('fontHeading', e.target.value, scope);
    }
  }

  function openModal() {
    var modal = document.getElementById('settingsModal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      refreshModal();
    }
  }

  function closeModal() {
    var modal = document.getElementById('settingsModal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ---- Initialize ----
  loadState();
  // Apply immediately (before DOMContentLoaded) for no-flash
  if (document.documentElement) {
    var s = getComputedStyles();
    document.documentElement.classList.toggle('light', s.mode === 'light');
    document.documentElement.style.setProperty('--bg', s.bg);
    document.documentElement.style.setProperty('--text', s.text);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyStyles();
    createModal();

    // Bind settings button (from nav.js)
    document.addEventListener('click', function (e) {
      if (e.target.closest('#settingsBtn')) openModal();
    });

    // Warning badge if localStorage failed
    if (memoryFallback) {
      var btn = document.getElementById('settingsBtn');
      if (btn) {
        btn.style.position = 'relative';
        btn.insertAdjacentHTML('beforeend',
          '<span style="position:absolute;top:2px;right:2px;width:8px;height:8px;border-radius:50%;background:#F59E0B;"></span>'
        );
      }
    }
  });

  // Expose API
  window.ThemeEngine = {
    setTemplate: setTemplate,
    setOverride: setOverride,
    clearOverrides: clearOverrides,
    clearPageTemplate: clearPageTemplate,
    resetAll: resetAll,
    getState: getState,
    openModal: openModal,
    closeModal: closeModal,
    applyStyles: applyStyles
  };
})();
