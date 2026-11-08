/**
 * Ayroor Kathakali Gramam — Central Internationalization (i18n) Engine
 * Single Source of Truth for multilingual dictionaries (en, ml),
 * nested dot-notation translation keys, HTML attributes, and dynamic bindings.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ayroor_lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'ml'];

  function getStoredLang() {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && SUPPORTED_LANGS.includes(stored)) {
          return stored;
        }
      }
    } catch (e) {
      // Ignore storage restrictions
    }
    if (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) {
      const docLang = document.documentElement.lang.toLowerCase();
      if (SUPPORTED_LANGS.includes(docLang)) return docLang;
    }
    return DEFAULT_LANG;
  }

  let currentLang = getStoredLang();

  function getLocales() {
    return {
      en: (typeof window !== 'undefined' && window.AYROOR_LOCALE_EN) || {},
      ml: (typeof window !== 'undefined' && window.AYROOR_LOCALE_ML) || {}
    };
  }

  /**
   * Safe nested key lookup (e.g. "mela.heroTitle", "common.readMore", or flat "heroOverline")
   */
  function getNested(obj, path) {
    if (!obj || !path) return undefined;
    // 1. Direct key match (for flat keys)
    if (obj[path] !== undefined && obj[path] !== '') {
      return obj[path];
    }
    // 2. Dot notation traversal
    const parts = path.split('.');
    let curr = obj;
    for (let i = 0; i < parts.length; i++) {
      if (curr === undefined || curr === null) break;
      curr = curr[parts[i]];
    }
    if (curr !== undefined && curr !== '') {
      return curr;
    }
    // 3. Fallback check inside 'home' namespace if flat key didn't match top level
    if (obj.home && obj.home[path] !== undefined && obj.home[path] !== '') {
      return obj.home[path];
    }
    return undefined;
  }

  function t(key, fallback = '') {
    const locales = getLocales();
    const currentDict = locales[currentLang] || locales.en || {};
    let val = getNested(currentDict, key);
    if (val !== undefined && val !== '') {
      return val;
    }
    // Fallback to English dictionary
    const enDict = locales.en || {};
    val = getNested(enDict, key);
    if (val !== undefined && val !== '') {
      return val;
    }
    return fallback || key;
  }

  function updateDomTranslations() {
    if (typeof document === 'undefined') return;

    if (document.documentElement) {
      document.documentElement.lang = currentLang;
      document.documentElement.setAttribute('lang', currentLang);
    }

    // 1. Elements with data-i18n or data-i18n-key
    const elements = document.querySelectorAll('[data-i18n], [data-i18n-key]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-key');
      if (!key) return;

      const val = t(key);
      if (val === undefined || val === '') return;

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.setAttribute('placeholder', val);
        } else {
          el.value = val;
        }
      } else {
        if (typeof val === 'string' && (val.includes('<') && val.includes('>'))) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // 2. Specific attribute localizations: data-i18n-placeholder, data-i18n-title, data-i18n-aria
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key));
    });

    // 3. Update Language Toggle Button Text & State
    document.querySelectorAll('#langToggleBtn, .lang-toggle-btn').forEach((btn) => {
      btn.setAttribute('data-current-lang', currentLang);
      const enActive = currentLang === 'en' ? 'lang-active' : '';
      const mlActive = currentLang === 'ml' ? 'lang-active' : '';
      btn.innerHTML = `<span class="${mlActive}">മലയാളം</span> / <span class="${enActive}">EN</span>`;
    });

    // 4. Update Architectural Menu Button Text
    document.querySelectorAll('[data-arch-menu-text]').forEach((el) => {
      el.textContent = currentLang === 'ml' ? 'മെനു' : 'MENU';
    });

    // 5. Update Back-to-Top Tooltip
    document.querySelectorAll('.btt-tooltip').forEach((el) => {
      el.textContent = currentLang === 'ml' ? 'മുകളിലേക്ക്' : 'Back to Top';
    });

    // 6. Update Dynamic Page Search Placeholders
    const searchInput = document.getElementById('exploreSearchInput');
    if (searchInput) {
      if (document.getElementById('mudrasGrid')) {
        searchInput.placeholder = currentLang === 'ml' ? '24 കഥകളി മുദ്രകൾ, അർത്ഥം എന്നിവ തിരയുക...' : 'Search 24 mudras, meaning, tags (e.g. Flag, King, Arrow)...';
      } else if (document.getElementById('charactersGrid')) {
        searchInput.placeholder = currentLang === 'ml' ? 'കഥകളി വേഷങ്ങൾ, ഭാവങ്ങൾ തിരയുക...' : 'Search character, archetype, traits (e.g. Paccha, Ravana, Hanuman)...';
      } else if (document.getElementById('instrumentsGrid')) {
        searchInput.placeholder = currentLang === 'ml' ? 'കഥകളി വാദ്യങ്ങൾ, മേളപ്പെരുക്കം തിരയുക...' : 'Search instrument, role, tala (e.g. Chenda, Maddalam, Chengila)...';
      } else if (document.getElementById('gallery-grid')) {
        searchInput.placeholder = currentLang === 'ml' ? 'ചിത്രശാല തിരയുക...' : 'Search visuals, performances, artists...';
      }
    }

    const lexiconSymbolSearch = document.getElementById('lexiconSymbolSearch');
    if (lexiconSymbolSearch) {
      lexiconSymbolSearch.placeholder = currentLang === 'ml' ? '406 ചിഹ്നങ്ങളിൽ തിരയുക (ഉദാ: ആന, സൂര്യൻ, രാജാവ്, ജലം, വീണ)...' : 'Search across all 406 symbols (e.g. Elephant, Sun, King, Water, Veena)...';
    }

    const lexiconMisraSearch = document.getElementById('lexiconMisraSearch');
    if (lexiconMisraSearch) {
      lexiconMisraSearch.placeholder = currentLang === 'ml' ? '68 മിശ്രമുദ്രകളിൽ തിരയുക (ഉദാ: ഇന്ദ്രൻ, ശിവൻ, രാമൻ, രഥം, വാൾ)...' : 'Search 68 mixed mudras (e.g. Indra, Shiva, Rama, Ravana, Chariot, Sword)...';
    }

    // 7. Update Contact Form Topic Options
    const enquiryTopic = document.getElementById('enquiryTopic');
    if (enquiryTopic) {
      Array.from(enquiryTopic.options).forEach((opt) => {
        const mlText = opt.getAttribute('data-ml');
        const enText = opt.getAttribute('data-en');
        if (currentLang === 'ml' && mlText) opt.textContent = mlText;
        else if (currentLang === 'en' && enText) opt.textContent = enText;
      });
    }

    // 8. Re-sync AyroorNav if loaded
    if (typeof window !== 'undefined' && window.AyroorNav && typeof window.AyroorNav.refresh === 'function') {
      window.AyroorNav.refresh();
    }
  }

  function setLanguage(lang, silent = false) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLang = lang;

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, lang);
      }
    } catch (e) {
      // Ignore
    }

    updateDomTranslations();

    if (!silent && typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(
        new CustomEvent('ayroor:languageChanged', {
          detail: { lang: currentLang, dict: getLocales()[currentLang] }
        })
      );
    }
  }

  function registerTranslations(lang, dict) {
    if (!SUPPORTED_LANGS.includes(lang) || !dict) return;
    const locales = getLocales();
    locales[lang] = Object.assign(locales[lang] || {}, dict);
    if (window.CONFIG && window.CONFIG.i18n) {
      window.CONFIG.i18n[lang] = locales[lang];
    }
  }

  function init() {
    updateDomTranslations();

    // Attach click listener to lang toggle buttons
    if (typeof document !== 'undefined') {
      document.querySelectorAll('#langToggleBtn, .lang-toggle-btn').forEach((btn) => {
        if (!btn._langToggleBound) {
          btn._langToggleBound = true;
          btn._archBound = true;
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const next = currentLang === 'en' ? 'ml' : 'en';
            setLanguage(next);
          });
        }
      });
    }
  }

  if (typeof window !== 'undefined') {
    window.AyroorI18n = {
      t,
      getLanguage: () => currentLang,
      setLanguage,
      getLocales,
      registerTranslations,
      updateDomTranslations,
      SUPPORTED_LANGS
    };
    window.i18n = window.AyroorI18n;
    window.CONFIG = window.CONFIG || {};
    window.CONFIG.i18n = getLocales();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      t,
      setLanguage,
      getLanguage: () => currentLang,
      locales: getLocales()
    };
  }
})();
