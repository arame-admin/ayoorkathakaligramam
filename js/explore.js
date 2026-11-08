/**
 * Ayroor Kathakali Gramam — Explore Kathakali Controller
 * Section: 08 — Explore Kathakali (Mudras, Characters, Instruments)
 * ============================================================================
 * Handles real-time search, category filtering, interactive detail modal,
 * and bilingual language synchronization.
 * ============================================================================
 */

(function () {
  'use strict';

  // State
  const state = {
    searchQuery: '',
    activeFilter: 'all',
    currentLang: (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 
                 (typeof document !== 'undefined' && document.documentElement.lang) || 'en'
  };

  /**
   * Initialize Search & Filtering
   */
  function initFilters() {
    const searchInput = document.getElementById('exploreSearchInput');
    const clearBtn = document.getElementById('exploreSearchClear');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.explore-card');
    const counterEl = document.getElementById('exploreCountNum');
    const noResultsEl = document.getElementById('exploreNoResults');

    if (!cards.length) return;

    function applyFilters() {
      const q = state.searchQuery.trim().toLowerCase();
      const cat = state.activeFilter;
      let visibleCount = 0;

      cards.forEach(card => {
        const titleEn = (card.getAttribute('data-title-en') || '').toLowerCase();
        const titleMl = (card.getAttribute('data-title-ml') || '').toLowerCase();
        const meaning = (card.getAttribute('data-meaning') || '').toLowerCase();
        const desc = (card.getAttribute('data-desc') || '').toLowerCase();
        const tags = (card.getAttribute('data-tags') || '').toLowerCase();
        const category = card.getAttribute('data-category') || 'all';

        // Check search match
        const matchesSearch = !q || 
          titleEn.includes(q) || 
          titleMl.includes(q) || 
          meaning.includes(q) || 
          desc.includes(q) || 
          tags.includes(q);

        // Check category match
        const matchesCategory = cat === 'all' || category === cat;

        if (matchesSearch && matchesCategory) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'none';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Update counter
      if (counterEl) {
        counterEl.textContent = visibleCount;
      }

      // No results message
      if (noResultsEl) {
        if (visibleCount === 0) {
          noResultsEl.classList.add('is-visible');
        } else {
          noResultsEl.classList.remove('is-visible');
        }
      }

      // Clear button visibility
      if (clearBtn) {
        if (q.length > 0) {
          clearBtn.classList.add('is-visible');
        } else {
          clearBtn.classList.remove('is-visible');
        }
      }

      // Refresh Lenis & ScrollTrigger boundaries after filtering
      if (typeof window.refreshMotionAndScroll === 'function') {
        window.refreshMotionAndScroll();
      }
    }

    // Search input listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        applyFilters();
      });
    }

    // Clear search
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        state.searchQuery = '';
        applyFilters();
      });
    }

    // Category button listeners
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.activeFilter = btn.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });

    // Initial run
    applyFilters();
  }

  /**
   * Detail Inspection Modal Controller
   */
  function initModal() {
    const modalBackdrop = document.getElementById('exploreDetailModal');
    if (!modalBackdrop) return;

    const modalClose = modalBackdrop.querySelector('.explore-modal-close');
    const modalImg = document.getElementById('modalDetailImg');
    const modalBadge = document.getElementById('modalDetailBadge');
    const modalTitle = document.getElementById('modalDetailTitle');
    const modalTitleMl = document.getElementById('modalDetailTitleMl');
    const modalMeaning = document.getElementById('modalDetailMeaning');
    const modalDesc = document.getElementById('modalDetailDesc');
    const modalContext = document.getElementById('modalDetailContext');
    const modalVerse = document.getElementById('modalDetailVerse');
    const modalTags = document.getElementById('modalDetailTags');

    function openModal(card) {
      if (!card) return;

      const imgSrc = card.getAttribute('data-modal-img') || card.querySelector('.explore-card-img')?.src;
      const imgAlt = card.getAttribute('data-title-en') || '';
      const badge = card.getAttribute('data-badge') || '';
      const titleEn = card.getAttribute('data-title-en') || '';
      const titleMl = card.getAttribute('data-title-ml') || '';
      const meaning = card.getAttribute('data-meaning') || '';
      const desc = card.getAttribute('data-desc') || '';
      const context = card.getAttribute('data-context') || '';
      const verse = card.getAttribute('data-verse') || '';
      const tags = (card.getAttribute('data-tags') || '').split(',');

      if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
      }
      const curLang = (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 
                      (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
      const isMl = curLang === 'ml';

      if (modalBadge) {
        const badgeMl = card.getAttribute('data-badge-ml');
        modalBadge.textContent = isMl ? (badgeMl || badge) : badge;
      }

      if (modalTitle) modalTitle.textContent = isMl ? (titleMl || titleEn) : titleEn;
      if (modalTitleMl) modalTitleMl.style.display = 'none';

      if (modalMeaning) {
        const meaningMl = card.getAttribute('data-meaning-ml');
        modalMeaning.textContent = isMl ? (meaningMl || meaning) : meaning;
      }
      if (modalDesc) {
        const descMl = card.getAttribute('data-desc-ml');
        modalDesc.textContent = isMl ? (descMl || desc) : desc;
      }
      if (modalContext) {
        const contextMl = card.getAttribute('data-context-ml');
        modalContext.textContent = isMl ? (contextMl || context) : context;
      }
      if (modalVerse) {
        if (isMl) {
          modalVerse.textContent = verse;
          modalVerse.style.display = verse ? '' : 'none';
        } else {
          const verseEn = card.getAttribute('data-verse-en');
          if (verseEn) {
            modalVerse.textContent = verseEn;
            modalVerse.style.display = '';
          } else {
            modalVerse.style.display = 'none';
          }
        }
      }

      if (modalTags) {
        modalTags.innerHTML = tags.map(tag => `<span class="explore-tag">${tag.trim()}</span>`).join('');
      }

      // Dynamic Double & Single Hand Symbols rendering for Mudras
      const doubleSymbols = card.getAttribute('data-symbols-double');
      const singleSymbols = card.getAttribute('data-symbols-single');
      const totalSymbols = card.getAttribute('data-total-symbols');
      const modalDoubleWrap = document.getElementById('modalDoubleSymbolsWrap');
      const modalDoubleEl = document.getElementById('modalDoubleSymbols');
      const modalSingleWrap = document.getElementById('modalSingleSymbolsWrap');
      const modalSingleEl = document.getElementById('modalSingleSymbols');
      const modalDefaultTagsWrap = document.getElementById('modalDefaultTagsWrap');

      if (modalDoubleEl) {
        if (doubleSymbols && doubleSymbols.trim()) {
          const dList = doubleSymbols.split(',').map(s => s.trim()).filter(Boolean);
          modalDoubleEl.innerHTML = dList.map(s => `<span class="explore-tag explore-tag-double">${s}</span>`).join('');
          if (modalDoubleWrap) modalDoubleWrap.style.display = '';
        } else if (modalDoubleWrap) {
          modalDoubleWrap.style.display = 'none';
        }
      }

      if (modalSingleEl) {
        if (singleSymbols && singleSymbols.trim()) {
          const sList = singleSymbols.split(',').map(s => s.trim()).filter(Boolean);
          modalSingleEl.innerHTML = sList.map(s => `<span class="explore-tag explore-tag-single">${s}</span>`).join('');
          if (modalSingleWrap) modalSingleWrap.style.display = '';
        } else if (modalSingleWrap) {
          modalSingleWrap.style.display = 'none';
        }
      }

      if (modalDefaultTagsWrap) {
        modalDefaultTagsWrap.style.display = (doubleSymbols || singleSymbols) ? 'none' : '';
      }

      modalBackdrop.classList.add('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (typeof window.stopScroll === 'function') {
        window.stopScroll();
      } else if (window.lenis && typeof window.lenis.stop === 'function') {
        window.lenis.stop();
      }

      if (modalClose) modalClose.focus();
    }

    function closeModal() {
      modalBackdrop.classList.remove('is-open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (typeof window.startScroll === 'function') {
        window.startScroll();
      } else if (window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
    }

    // Attach click triggers to cards
    document.querySelectorAll('.explore-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent if user clicked an external link inside
        if (e.target.closest('a:not(.explore-card-cta)')) return;
        e.preventDefault();
        openModal(card);
      });

      // Keyboard support
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(card);
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  /**
   * Floating Back to Top Button Controller
   */
  function initFloatingBackToTop() {
    const btn = document.getElementById('floatingBackToTop');
    const footerBtn = document.getElementById('backToTopBtn');
    if (!btn && !footerBtn) return;

    const ringIndicator = btn ? btn.querySelector('.progress-ring-indicator') : null;
    const radius = 23;
    const circumference = 2 * Math.PI * radius;

    if (ringIndicator) {
      ringIndicator.style.strokeDasharray = `${circumference} ${circumference}`;
      ringIndicator.style.strokeDashoffset = circumference;
    }

    function onScroll() {
      const scrollY = (window.lenis && typeof window.lenis.scroll === 'number') 
        ? window.lenis.scroll 
        : (window.scrollY || document.documentElement.scrollTop || 0);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

      if (ringIndicator) {
        ringIndicator.style.strokeDashoffset = circumference - (progress * circumference);
      }

      if (btn) {
        if (scrollY > 280) {
          btn.classList.add('visible', 'is-visible');
        } else {
          btn.classList.remove('visible', 'is-visible');
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function scrollToTop(e) {
      if (e) e.preventDefault();
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { duration: 1.25 });
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (btn) btn.addEventListener('click', scrollToTop);
    if (footerBtn) footerBtn.addEventListener('click', scrollToTop);
  }

  /**
   * Custom Cursor (Matching main.js for non-homepage views)
   */
  function initCustomCursor() {
    if (window.__ayroorCursorInitialized) return;
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('customCursorFollower');
    if (!cursor || !follower || window.matchMedia('(pointer: coarse)').matches) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderFollower() {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
      follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      requestAnimationFrame(renderFollower);
    }
    requestAnimationFrame(renderFollower);

    // Interactive element hover states
    const interactiveSelectors = 'a, button, input, .explore-card, .filter-btn, .lexicon-tab-btn, .lexicon-mudra-header, .lexicon-action-btn, .misra-filter-btn, [tabindex="0"]';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('is-hovering'));
    });
  }

  /**
   * Master Mudra Lexicon Controller (24 Root Mudras, 68 Misra Mudras, Samaana, Baana)
   */
  function initMasterLexicon() {
    const section = document.getElementById('masterLexiconSection');
    if (!section) return;

    // 1. Tab Switching
    const tabBtns = section.querySelectorAll('.lexicon-tab-btn');
    const tabPanes = section.querySelectorAll('.lexicon-tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        if (!targetId) return;

        tabBtns.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanes.forEach(pane => {
          pane.classList.remove('is-active');
        });

        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('is-active');
        }
      });
    });

    // 2. Tab 1: 24 Root Mudras Accordion & Live Symbol Search
    const mudraCards = section.querySelectorAll('.lexicon-mudra-card');
    mudraCards.forEach(card => {
      const header = card.querySelector('.lexicon-mudra-header');
      if (header) {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');

        const toggleCard = () => {
          const isOpen = card.classList.toggle('is-open');
          header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        header.addEventListener('click', toggleCard);
        header.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCard();
          }
        });
      }
    });

    // Expand All / Collapse All buttons
    const expandAllBtn = document.getElementById('lexiconExpandAllBtn');
    const collapseAllBtn = document.getElementById('lexiconCollapseAllBtn');

    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        mudraCards.forEach(c => {
          c.classList.add('is-open');
          const h = c.querySelector('.lexicon-mudra-header');
          if (h) h.setAttribute('aria-expanded', 'true');
        });
      });
    }

    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', () => {
        mudraCards.forEach(c => {
          c.classList.remove('is-open');
          const h = c.querySelector('.lexicon-mudra-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Symbol Search Filter
    const symbolSearch = document.getElementById('lexiconSymbolSearch');
    const symbolClear = document.getElementById('lexiconSearchClear');
    const symbolNoResults = document.getElementById('lexiconNoResults');

    function applySymbolSearch() {
      const q = (symbolSearch ? symbolSearch.value : '').trim().toLowerCase();
      let matchCount = 0;

      if (symbolClear) {
        if (q.length > 0) {
          symbolClear.classList.add('is-visible');
        } else {
          symbolClear.classList.remove('is-visible');
        }
      }

      mudraCards.forEach(card => {
        const searchText = (card.getAttribute('data-search-text') || '').toLowerCase();
        if (!q || searchText.includes(q)) {
          card.style.display = '';
          matchCount++;
          if (q) {
            // Auto expand card when searching so matching symbols are immediately visible
            card.classList.add('is-open');
            const h = card.querySelector('.lexicon-mudra-header');
            if (h) h.setAttribute('aria-expanded', 'true');
          }
        } else {
          card.style.display = 'none';
        }
      });

      if (symbolNoResults) {
        symbolNoResults.style.display = matchCount === 0 ? 'block' : 'none';
      }
    }

    if (symbolSearch) {
      symbolSearch.addEventListener('input', applySymbolSearch);
    }

    if (symbolClear) {
      symbolClear.addEventListener('click', () => {
        if (symbolSearch) {
          symbolSearch.value = '';
          symbolSearch.focus();
        }
        applySymbolSearch();
      });
    }

    // 3. Tab 2: 68 Misra Mudras Filter & Search
    const misraSearch = document.getElementById('misraSearchInput');
    const misraClear = document.getElementById('misraSearchClear');
    const misraFilterBtns = section.querySelectorAll('.misra-filter-btn');
    const misraCards = section.querySelectorAll('.misra-card');
    const misraNoResults = document.getElementById('misraNoResults');
    let activeMisraCat = 'all';

    function applyMisraFilters() {
      const q = (misraSearch ? misraSearch.value : '').trim().toLowerCase();
      let matchCount = 0;

      if (misraClear) {
        if (q.length > 0) {
          misraClear.classList.add('is-visible');
        } else {
          misraClear.classList.remove('is-visible');
        }
      }

      misraCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || 'all';
        const cardSearchText = (card.getAttribute('data-search-text') || '').toLowerCase();

        const matchesCat = activeMisraCat === 'all' || cardCat === activeMisraCat;
        const matchesQuery = !q || cardSearchText.includes(q);

        if (matchesCat && matchesQuery) {
          card.style.display = '';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (misraNoResults) {
        misraNoResults.style.display = matchCount === 0 ? 'block' : 'none';
      }
    }

    if (misraSearch) {
      misraSearch.addEventListener('input', applyMisraFilters);
    }

    if (misraClear) {
      misraClear.addEventListener('click', () => {
        if (misraSearch) {
          misraSearch.value = '';
          misraSearch.focus();
        }
        applyMisraFilters();
      });
    }

    misraFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        misraFilterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeMisraCat = btn.getAttribute('data-cat') || 'all';
        applyMisraFilters();
      });
    });

    // 4. Update Placeholders on Language Change
    function updateLexiconPlaceholders(lang) {
      const isMl = lang === 'ml';
      if (symbolSearch) {
        symbolSearch.placeholder = isMl
          ? '406 ചിഹ്നങ്ങളിൽ തിരയുക (ഉദാ: ആന, സൂര്യൻ, രാജാവ്, ജലം, വീണ)...'
          : 'Search across all 406 symbols (e.g. Elephant, Sun, King, Water, Veena)...';
      }
      if (misraSearch) {
        misraSearch.placeholder = isMl
          ? '68 മിശ്രമുദ്രകളിൽ തിരയുക (ഉദാ: ഇന്ദ്രൻ, ശിവൻ, രാമൻ, രഥം, വാൾ)...'
          : 'Search 68 mixed mudras (e.g. Indra, Shiva, Rama, Ravana, Chariot, Sword)...';
      }
    }

    window.__updateLexiconPlaceholders = updateLexiconPlaceholders;
    const initialLang = (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 
                        (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
    updateLexiconPlaceholders(initialLang);
  }

  /**
   * Language Switcher Synchronization
   */
  function initLanguageSync() {
    function applyCurrentLanguage(lang) {
      state.currentLang = lang;
      const isMl = lang === 'ml';

      // 1. Update contact enquiry select options
      const enquiryTopic = document.getElementById('enquiryTopic');
      if (enquiryTopic) {
        Array.from(enquiryTopic.options).forEach(opt => {
          const mlText = opt.getAttribute('data-ml');
          const enText = opt.getAttribute('data-en');
          if (isMl && mlText) opt.textContent = mlText;
          else if (!isMl && enText) opt.textContent = enText;
        });
      }

      // 2. Update contact form placeholders
      const userName = document.getElementById('userName');
      if (userName) userName.placeholder = isMl ? 'നിങ്ങളുടെ പൂർണ്ണ നാമം നൽകുക' : 'Enter your full name';
      const userMessage = document.getElementById('userMessage');
      if (userMessage) userMessage.placeholder = isMl ? 'നിങ്ങളുടെ സന്ദർശനത്തിനോ ഗവേഷണത്തിനോ എന്തൊക്കെ വിവരങ്ങളാണ് വേണ്ടതെന്ന് വ്യക്തമാക്കുക...' : 'Tell us how we can assist your visit or research...';

      // 3. Update main search input placeholder if present
      const searchInput = document.getElementById('exploreSearchInput');
      if (searchInput) {
        if (document.getElementById('mudrasGrid')) {
          searchInput.placeholder = isMl ? '24 കഥകളി മുദ്രകൾ, അർത്ഥം എന്നിവ തിരയുക...' : 'Search 24 mudras, meaning, tags (e.g. Flag, King, Arrow)...';
        } else if (document.getElementById('charactersGrid')) {
          searchInput.placeholder = isMl ? 'കഥകളി വേഷങ്ങൾ, ഭാവങ്ങൾ തിരയുക...' : 'Search character, archetype, traits (e.g. Paccha, Ravana, Hanuman)...';
        } else if (document.getElementById('instrumentsGrid')) {
          searchInput.placeholder = isMl ? 'കഥകളി വാദ്യങ്ങൾ, മേളപ്പെരുക്കം തിരയുക...' : 'Search instrument, role, tala (e.g. Chenda, Maddalam, Chengila)...';
        }
      }

      if (typeof window.applyLanguage === 'function') {
        window.applyLanguage(lang);
      }
      if (typeof window.__updateLexiconPlaceholders === 'function') {
        window.__updateLexiconPlaceholders(lang);
      }
    }

    // Connect to AyroorNav if present
    if (window.AyroorNav) {
      const originalSetLanguage = window.AyroorNav.setLanguage;
      window.AyroorNav.setLanguage = function (lang) {
        originalSetLanguage(lang);
        applyCurrentLanguage(lang);
      };
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('ayroor:languageChanged', (e) => {
        if (e.detail && e.detail.lang) {
          applyCurrentLanguage(e.detail.lang);
        }
      });
    }
  }

  // Initialize on DOM Ready
  function init() {
    const initialLang = (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 
                        (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
    initFilters();
    initModal();
    initFloatingBackToTop();
    initCustomCursor();
    initMasterLexicon();
    initLanguageSync();
    if (typeof window.applyCurrentLanguage === 'function') {
      window.applyCurrentLanguage(initialLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
