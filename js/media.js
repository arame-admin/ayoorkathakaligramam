/**
 * AYROOR KATHAKALI GRAMAM — MEDIA COVERAGE & PRESS CHRONICLES CONTROLLER
 * ============================================================================
 * Features:
 *   - 15 Authentic Newspaper Clippings & Press Articles Dataset
 *   - Live Multi-Category Filtering (All, National Press, Regional Dailies, Honors)
 *   - Live Keyword Search Filtering
 *   - Fullscreen Lightbox Modal with Zoom, Fullscreen, Keyboard & Touch Nav
 *   - Thumbnail Pagination Strip with Auto-Centering
 *   - Centralized Bilingual Localization (en / ml) Synchronization
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 1. MEDIA ARTICLES DATASET ---
  const MEDIA_ARTICLES = [
    {
      id: 1,
      image: "assets/images/media/nw1.webp",
      sourceKey: "media.sourceManorama",
      titleKey: "media.article1Title",
      descKey: "media.article1Desc",
      category: "regional"
    },
    {
      id: 2,
      image: "assets/images/media/nw2.webp",
      sourceKey: "media.sourceMathrubhumi",
      titleKey: "media.article2Title",
      descKey: "media.article2Desc",
      category: "regional"
    },
    {
      id: 3,
      image: "assets/images/media/nw3.webp",
      sourceKey: "media.sourceNationalExpress",
      titleKey: "media.article3Title",
      descKey: "media.article3Desc",
      category: "national"
    },
    {
      id: 4,
      image: "assets/images/media/nw4.webp",
      sourceKey: "media.sourceKeralaKaumudi",
      titleKey: "media.article4Title",
      descKey: "media.article4Desc",
      category: "honors"
    },
    {
      id: 5,
      image: "assets/images/media/nw5.webp",
      sourceKey: "media.sourceDeshabhimani",
      titleKey: "media.article5Title",
      descKey: "media.article5Desc",
      category: "regional"
    },
    {
      id: 6,
      image: "assets/images/media/nw6.webp",
      sourceKey: "media.sourceMathrubhumi",
      titleKey: "media.article6Title",
      descKey: "media.article6Desc",
      category: "regional"
    },
    {
      id: 7,
      image: "assets/images/media/nw7.webp",
      sourceKey: "media.sourceManorama",
      titleKey: "media.article7Title",
      descKey: "media.article7Desc",
      category: "honors"
    },
    {
      id: 8,
      image: "assets/images/media/nw8.webp",
      sourceKey: "media.sourceKeralaKaumudi",
      titleKey: "media.article8Title",
      descKey: "media.article8Desc",
      category: "regional"
    },
    {
      id: 9,
      image: "assets/images/media/nw9.webp",
      sourceKey: "media.sourceMathrubhumi",
      titleKey: "media.article9Title",
      descKey: "media.article9Desc",
      category: "regional"
    },
    {
      id: 10,
      image: "assets/images/media/nw10.webp",
      sourceKey: "media.sourceDeshabhimani",
      titleKey: "media.article10Title",
      descKey: "media.article10Desc",
      category: "regional"
    },
    {
      id: 11,
      image: "assets/images/media/nw11.webp",
      sourceKey: "media.sourceManorama",
      titleKey: "media.article11Title",
      descKey: "media.article11Desc",
      category: "honors"
    },
    {
      id: 12,
      image: "assets/images/media/nw12.webp",
      sourceKey: "media.sourcePressRelease",
      titleKey: "media.article12Title",
      descKey: "media.article12Desc",
      category: "regional"
    },
    {
      id: 13,
      image: "assets/images/media/nw13.webp",
      sourceKey: "media.sourceTimesOfIndia",
      titleKey: "media.article13Title",
      descKey: "media.article13Desc",
      category: "national"
    },
    {
      id: 14,
      image: "assets/images/media/nw14.webp",
      sourceKey: "media.sourceMathrubhumi",
      titleKey: "media.article14Title",
      descKey: "media.article14Desc",
      category: "honors"
    },
    {
      id: 15,
      image: "assets/images/media/nw15.webp",
      sourceKey: "media.sourceNationalExpress",
      titleKey: "media.article15Title",
      descKey: "media.article15Desc",
      category: "national"
    }
  ];

  // --- 2. STATE CONTROLLER ---
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let activeLightboxIndex = 0;
  let isZoomed = false;

  function t(key, defaultVal = '') {
    if (window.AyroorI18n && typeof window.AyroorI18n.t === 'function') {
      return window.AyroorI18n.t(key) || defaultVal;
    }
    return defaultVal;
  }

  // --- 3. FILTERING & RENDERING ---
  function getFilteredArticles() {
    return MEDIA_ARTICLES.filter(item => {
      const matchCategory = currentCategory === 'all' || item.category === currentCategory;
      if (!matchCategory) return false;

      if (!currentSearchQuery) return true;

      const q = currentSearchQuery.toLowerCase();
      const title = t(item.titleKey, '').toLowerCase();
      const desc = t(item.descKey, '').toLowerCase();
      const source = t(item.sourceKey, '').toLowerCase();

      return title.includes(q) || desc.includes(q) || source.includes(q);
    });
  }

  function renderGrid() {
    const gridEl = document.getElementById('mediaGrid');
    const countEl = document.getElementById('mediaCountDisplay');
    if (!gridEl) return;

    const filtered = getFilteredArticles();

    if (countEl) {
      countEl.textContent = `${filtered.length} / ${MEDIA_ARTICLES.length}`;
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--arch-ivory-dim);">
          <div style="font-size: 2.4rem; margin-bottom: 12px; opacity: 0.6;">📰</div>
          <p style="font-size: 1.1rem; color: var(--arch-ivory-muted);">No press articles match your filter criteria.</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered.map((item) => {
      const globalIndex = MEDIA_ARTICLES.findIndex(a => a.id === item.id);
      return `
        <article class="media-card" data-article-id="${item.id}" data-category="${item.category}">
          <div class="media-card-media" onclick="window.AyroorMedia.openLightbox(${globalIndex})">
            <img src="${item.image}" alt="${t(item.titleKey)}" class="media-card-img" loading="lazy">
            <span class="media-card-badge">${t(item.sourceKey)}</span>
            <div class="media-card-zoom-overlay">
              <span class="media-zoom-btn">
                <span>🔍</span>
                <span data-i18n="media.viewClipping">${t('media.viewClipping', 'View Article')}</span>
              </span>
            </div>
          </div>
          <div class="media-card-body">
            <div class="media-card-source">${t(item.sourceKey)}</div>
            <h3 class="media-card-title">${t(item.titleKey)}</h3>
            <p class="media-card-desc">${t(item.descKey)}</p>
            <div class="media-card-footer">
              <button type="button" class="media-view-link" onclick="window.AyroorMedia.openLightbox(${globalIndex})">
                <span data-i18n="media.viewClipping">${t('media.viewClipping', 'View Full Article')}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- 4. LIGHTBOX MODAL ---
  function openLightbox(index) {
    if (index < 0 || index >= MEDIA_ARTICLES.length) return;
    activeLightboxIndex = index;
    isZoomed = false;

    const lightbox = document.getElementById('mediaLightbox');
    if (!lightbox) return;

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    updateLightboxView();
    renderLightboxStrip();
  }

  function closeLightbox() {
    const lightbox = document.getElementById('mediaLightbox');
    if (!lightbox) return;

    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    isZoomed = false;
  }

  function nextArticle() {
    activeLightboxIndex = (activeLightboxIndex + 1) % MEDIA_ARTICLES.length;
    isZoomed = false;
    updateLightboxView();
    syncStripActive();
  }

  function prevArticle() {
    activeLightboxIndex = (activeLightboxIndex - 1 + MEDIA_ARTICLES.length) % MEDIA_ARTICLES.length;
    isZoomed = false;
    updateLightboxView();
    syncStripActive();
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    const imgWrap = document.getElementById('mediaLightboxImgWrap');
    if (imgWrap) {
      imgWrap.style.transform = isZoomed ? 'scale(1.5)' : 'scale(1)';
      imgWrap.style.cursor = isZoomed ? 'zoom-out' : 'zoom-in';
    }
  }

  function toggleFullscreen() {
    const lightbox = document.getElementById('mediaLightbox');
    if (!lightbox) return;

    if (!document.fullscreenElement) {
      lightbox.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  function updateLightboxView() {
    const item = MEDIA_ARTICLES[activeLightboxIndex];
    if (!item) return;

    const img = document.getElementById('mediaLightboxImg');
    const badge = document.getElementById('mediaLightboxBadge');
    const title = document.getElementById('mediaLightboxTitle');
    const counter = document.getElementById('mediaLightboxCounter');

    if (img) {
      img.src = item.image;
      img.alt = t(item.titleKey);
    }
    if (badge) badge.textContent = t(item.sourceKey);
    if (title) title.textContent = t(item.titleKey);
    if (counter) counter.textContent = `${activeLightboxIndex + 1} / ${MEDIA_ARTICLES.length}`;

    const imgWrap = document.getElementById('mediaLightboxImgWrap');
    if (imgWrap) {
      imgWrap.style.transform = 'scale(1)';
      imgWrap.style.cursor = 'zoom-in';
    }
  }

  function renderLightboxStrip() {
    const strip = document.getElementById('mediaLightboxStrip');
    if (!strip) return;

    strip.innerHTML = MEDIA_ARTICLES.map((item, idx) => `
      <div class="media-thumb-item ${idx === activeLightboxIndex ? 'is-active' : ''}" 
           onclick="window.AyroorMedia.openLightbox(${idx})" 
           title="${t(item.titleKey)}">
        <img src="${item.image}" alt="" class="media-thumb-img" loading="lazy">
      </div>
    `).join('');

    syncStripActive();
  }

  function syncStripActive() {
    const strip = document.getElementById('mediaLightboxStrip');
    if (!strip) return;

    const thumbs = strip.querySelectorAll('.media-thumb-item');
    thumbs.forEach((th, idx) => {
      if (idx === activeLightboxIndex) {
        th.classList.add('is-active');
        th.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        th.classList.remove('is-active');
      }
    });
  }

  // --- 5. EVENT BINDINGS ---
  function initEvents() {
    // Filter Pills
    document.querySelectorAll('[data-media-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('[data-media-filter]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentCategory = btn.getAttribute('data-media-filter') || 'all';
        renderGrid();
      });
    });

    // Search Input
    const searchInput = document.getElementById('mediaSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.trim();
        renderGrid();
      });
    }

    // Lightbox Controls
    const closeBtn = document.getElementById('mediaLightboxClose');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    const prevBtn = document.getElementById('mediaLightboxPrev');
    if (prevBtn) prevBtn.addEventListener('click', prevArticle);

    const nextBtn = document.getElementById('mediaLightboxNext');
    if (nextBtn) nextBtn.addEventListener('click', nextArticle);

    const zoomBtn = document.getElementById('mediaLightboxZoom');
    if (zoomBtn) zoomBtn.addEventListener('click', toggleZoom);

    const fullBtn = document.getElementById('mediaLightboxFull');
    if (fullBtn) fullBtn.addEventListener('click', toggleFullscreen);

    const imgWrap = document.getElementById('mediaLightboxImgWrap');
    if (imgWrap) imgWrap.addEventListener('click', toggleZoom);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('mediaLightbox');
      if (!lightbox || !lightbox.classList.contains('is-open')) return;

      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') nextArticle();
      else if (e.key === 'ArrowLeft') prevArticle();
    });

    // Language Change Synchronizer
    window.addEventListener('ayroor:languageChanged', () => {
      renderGrid();
      const lightbox = document.getElementById('mediaLightbox');
      if (lightbox && lightbox.classList.contains('is-open')) {
        updateLightboxView();
      }
    });
  }

  // --- 6. INITIALIZATION ---
  function init() {
    renderGrid();
    initEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.AyroorMedia = {
    openLightbox,
    closeLightbox,
    nextArticle,
    prevArticle,
    toggleZoom,
    renderGrid
  };
})();
