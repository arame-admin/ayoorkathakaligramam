/**
 * Ayroor Kathakali Gramam — Architectural & Contemporary Navigation System
 * ============================================================================
 * Vanilla JS Component implementing the full 8-Group Architectural Hierarchy
 * based on the official BRD Sitemap.
 *
 * Capabilities:
 * - 8 Architectural Navigation Groups (01 to 08)
 * - Layer 1: Cultural Identity Brand Rail
 * - Layer 2: Architectural Navigation Panel with Expandable Submenus
 * - Layer 3: Contextual Visual Panel with Smooth Transitions & Metadata
 * - Desktop Horizontal Quick Nav with Dropdown Panels
 * - Architectural Footer Navigation Generator
 * - Bilingual Language Switching (EN / മലയാളം) with In-Place Updates
 * - Full Keyboard & ARIA Accessibility (Escape to close, Tab trapping, focus handling)
 * - Scroll-reactive Header Styling
 * ============================================================================
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentLang: (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 
                 (typeof document !== 'undefined' && document.documentElement.lang) || 'en',
    currentPath: (typeof window !== 'undefined' && window.location && window.location.pathname) ? 
                 (window.location.pathname.split('/').pop() || 'index.html').toLowerCase() : 'index.html',
    isCanvasOpen: false,
    activeGroupId: 'organization',
    expandedSubmenus: {},
    reducedMotion: typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  };

  /**
   * Helper: Get localized text from config item
   */
  function t(item, field) {
    if (!item) return '';
    const key = state.currentLang === 'ml' ? field + 'Ml' : field + 'En';
    return item[key] || item[field + 'En'] || item[field] || '';
  }

  /**
   * Helper: Route active check
   */
  function isActiveRoute(href) {
    if (!href) return false;
    const cleanHref = href.split('#')[0].split('/').pop().toLowerCase();
    if (!cleanHref) return false;
    if (state.currentPath === cleanHref) return true;
    if (state.currentPath === '' && (cleanHref === 'index.html' || cleanHref === '')) return true;
    return false;
  }

  /**
   * Safe RequestAnimationFrame fallback
   */
  const raf = (typeof window !== 'undefined' && window.requestAnimationFrame) ? 
              window.requestAnimationFrame.bind(window) : 
              function (cb) { setTimeout(cb, 16); };

  /**
   * Build Desktop Horizontal Quick Nav (in Fixed Header)
   */
  function buildDesktopNav() {
    const config = typeof window !== 'undefined' ? window.NAV_CONFIG : null;
    if (!config || !config.groups) return '';

    let html = '<ul class="nav-links" role="menubar" aria-label="Main Navigation">';

    config.groups.forEach(group => {
      const isGroupActive = group.items.some(item => {
        if (isActiveRoute(item.href)) return true;
        if (item.children) return item.children.some(c => isActiveRoute(c.href));
        return false;
      });

      // If group has a single item without children
      if (group.items.length === 1 && !group.items[0].hasChildren && !group.items[0].children) {
        const item = group.items[0];
        const active = isActiveRoute(item.href);
        html += `
          <li class="nav-item" role="none">
            <a href="${item.href}" class="nav-link ${active ? 'is-active' : ''}" role="menuitem" data-nav-id="${item.id}">
              <span class="nav-label">${t(item, 'label')}</span>
            </a>
          </li>
        `;
      } else {
        // Group has children or multiple items -> dropdown
        const firstItem = group.items[0];
        const hasChildren = firstItem.children && firstItem.children.length > 0;
        const mainHref = firstItem.href;

        html += `
          <li class="nav-item has-dropdown ${isGroupActive ? 'is-active-parent' : ''}" data-nav-id="${group.id}" role="none">
            <a href="${mainHref}" class="nav-link ${isGroupActive ? 'is-active' : ''}" aria-expanded="false" aria-haspopup="true" role="menuitem">
              <span class="nav-label">${t(group, 'label')}</span>
              <svg class="nav-chevron" viewBox="0 0 12 12" aria-hidden="true">
                <polyline points="2 4 6 8 10 4"></polyline>
              </svg>
            </a>
            <div class="nav-dropdown" role="menu" aria-label="${t(group, 'label')}">
              <ul class="dropdown-menu-list">
        `;

        if (hasChildren) {
          // Render parent itself as first choice
          html += `
            <li role="none">
              <a href="${firstItem.href}" class="dropdown-item-link ${isActiveRoute(firstItem.href) ? 'is-active' : ''}" role="menuitem" data-nav-id="${firstItem.id}">
                <span class="dropdown-item-title">${t(firstItem, 'label')}</span>
                <span class="dropdown-item-desc">${t(firstItem, 'desc')}</span>
              </a>
            </li>
          `;
          firstItem.children.forEach(child => {
            html += `
              <li role="none">
                <a href="${child.href}" class="dropdown-item-link ${isActiveRoute(child.href) ? 'is-active' : ''}" role="menuitem" data-nav-id="${child.id}">
                  <span class="dropdown-item-title">${t(child, 'label')}</span>
                  <span class="dropdown-item-desc">${t(child, 'desc')}</span>
                </a>
              </li>
            `;
          });
        } else {
          // Group has multiple direct items
          group.items.forEach(child => {
            html += `
              <li role="none">
                <a href="${child.href}" class="dropdown-item-link ${isActiveRoute(child.href) ? 'is-active' : ''}" role="menuitem" data-nav-id="${child.id}">
                  <span class="dropdown-item-title">${t(child, 'label')}</span>
                  <span class="dropdown-item-desc">${t(child, 'desc')}</span>
                </a>
              </li>
            `;
          });
        }

        html += `
              </ul>
            </div>
          </li>
        `;
      }
    });

    html += '</ul>';
    return html;
  }

  /**
   * Build Layer 1: Cultural Identity Brand Rail
   */
  function buildArchRail() {
    const config = typeof window !== 'undefined' ? window.NAV_CONFIG : null;
    if (!config) return '';

    const brand = config.brand;
    const isMl = state.currentLang === 'ml';

    return `
      <div class="arch-rail-top">
        <a href="${brand.href}" class="arch-rail-logo-link" aria-label="${brand.title} ${brand.subtitle} Home">
          <img src="${brand.logoSrc}" alt="${brand.logoAlt}" class="arch-rail-logo" width="48" height="58">
        </a>
        <button id="archCloseBtn" class="arch-close-btn" type="button" aria-label="Close Architectural Navigation Menu">
          <span class="arch-close-icon" aria-hidden="true">✕</span>
          <span>${isMl ? 'അടയ്ക്കുക' : 'CLOSE'}</span>
        </button>
      </div>

      <div class="arch-rail-center" aria-hidden="true">
        <span class="arch-rail-wordmark">${brand.title} • ${brand.subtitle}</span>
      </div>

      <div class="arch-rail-bottom">
        <div class="arch-rail-coords">
          <div>${isMl ? brand.locationMl : brand.locationEn}</div>
          <div>${brand.coordinates}</div>
        </div>
        <button class="lang-toggle-btn arch-rail-lang-btn" type="button" aria-label="Toggle language">
          ${isMl ? '<span class="lang-active">മലയാളം</span> / <span>ഇംഗ്ലീഷ്</span>' : '<span class="lang-active">EN</span> / <span>ML</span>'}
        </button>
      </div>
    `;
  }

  /**
   * Build Layer 2: 8-Group Navigation Architecture
   */
  function buildArchNavPanel() {
    const config = typeof window !== 'undefined' ? window.NAV_CONFIG : null;
    if (!config || !config.groups) return '';

    const isMl = state.currentLang === 'ml';

    const totalGroupsStr = String(config.groups.length).padStart(2, '0');

    let html = `
      <div class="arch-nav-header">
        <div class="arch-nav-headline">
          <span>${isMl ? 'നാട്യ രൂപരേഖ' : 'NAVIGATION ARCHITECTURE'}</span>
          <span class="arch-nav-headline-kicker">01 — ${totalGroupsStr}</span>
        </div>
        <div class="arch-nav-subhead">
          ${isMl ? 'പമ്പാതീരത്തെ കഥകളി സങ്കേതം' : 'Sanctuary of Classical Kerala Dance-Theatre'}
        </div>
      </div>

      <div class="arch-groups-grid" role="navigation" aria-label="Architectural Navigation Sections">
    `;

    config.groups.forEach(group => {
      const isCurrentGroup = group.id === state.activeGroupId;
      const isGroupActiveRoute = group.items.some(item => {
        if (isActiveRoute(item.href)) return true;
        if (item.children) return item.children.some(c => isActiveRoute(c.href));
        return false;
      });

      html += `
        <article class="arch-group ${isCurrentGroup ? 'is-focused' : ''} ${isGroupActiveRoute ? 'is-active-group' : ''}" 
                 data-group-id="${group.id}" 
                 tabindex="0"
                 role="region"
                 aria-label="Section ${group.num} ${t(group, 'label')}">
          
          <div class="arch-group-meta">
            <span class="arch-group-num">${group.num}</span>
            <span class="arch-group-kicker">${t(group, 'kicker')}</span>
          </div>

          <h3 class="arch-group-title">${t(group, 'label')}</h3>

          <ul class="arch-group-links">
      `;

      group.items.forEach(item => {
        const isItemActive = isActiveRoute(item.href);
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = !!state.expandedSubmenus[item.id] || isItemActive;

        html += `
          <li class="arch-page-item">
            <div class="arch-page-row">
              <a href="${item.href}" class="arch-page-link ${isItemActive ? 'is-current-page' : ''}" data-nav-id="${item.id}">
                ${t(item, 'label')}
              </a>
        `;

        if (hasChildren) {
          html += `
              <button type="button" 
                      class="arch-expand-btn" 
                      data-parent-id="${item.id}" 
                      aria-expanded="${isExpanded ? 'true' : 'false'}" 
                      aria-label="Toggle submenu for ${t(item, 'label')}">
                <svg class="arch-expand-icon" viewBox="0 0 12 12" aria-hidden="true">
                  <polyline points="2 4 6 8 10 4"></polyline>
                </svg>
              </button>
          `;
        }

        html += `</div>`;

        if (hasChildren) {
          html += `<ul class="arch-submenu ${isExpanded ? 'is-expanded' : ''}" id="submenu-${item.id}">`;
          item.children.forEach(child => {
            const isChildActive = isActiveRoute(child.href);
            html += `
              <li class="arch-subpage-item">
                <a href="${child.href}" class="arch-subpage-link ${isChildActive ? 'is-current-page' : ''}" data-nav-id="${child.id}">
                  ${t(child, 'label')}
                </a>
              </li>
            `;
          });
          html += `</ul>`;
        }

        html += `</li>`;
      });

      html += `
          </ul>
        </article>
      `;
    });

    html += `</div>`;
    return html;
  }

  /**
   * Build Streamlined Mobile Navigation View (< 1024px)
   * Resolves mobile confusion: clear, numbered 1-to-9 page listing with direct sub-links
   */
  function buildArchMobileNavPanel() {
    const isMl = state.currentLang === 'ml';

    const mobileRoutes = [
      {
        id: 'home',
        num: '01',
        titleEn: 'Home',
        titleMl: 'ഹോം',
        descEn: 'Ayroor Kathakali Gramam Heritage Portal',
        descMl: 'അയ്രൂർ കഥകളി ഗ്രാമം',
        href: 'index.html'
      },
      {
        id: 'about',
        num: '02',
        titleEn: 'About Us',
        titleMl: 'ഞങ്ങളെക്കുറിച്ച്',
        descEn: 'Heritage, History & Apex Custodians',
        descMl: 'ചരിത്രവും ഭരണസമിതിയും',
        href: 'about.html',
        children: [
          {
            id: 'office-bearers',
            titleEn: 'Office Bearers & Trustees',
            titleMl: 'ഭരണസമിതി ഭാരവാഹികൾ',
            href: 'about.html#office-bearers'
          },
          {
            id: 'centre',
            titleEn: 'Natyabharathi Kalari Centre',
            titleMl: 'നാട്യഭാരതി കളരി കേന്ദ്രം',
            href: 'about.html#centre'
          },
          {
            id: 'institutions',
            titleEn: 'Institutions & Wings',
            titleMl: 'അനുബന്ധ സ്ഥാപനങ്ങൾ',
            href: 'about.html#institutions'
          }
        ]
      },
      {
        id: 'mela',
        num: '03',
        titleEn: 'Kathakali Mela',
        titleMl: 'കഥകളി മേള',
        descEn: 'Annual 7-Night Pamba Convergence',
        descMl: 'വാർഷിക കഥകളി നാട്യോത്സവം',
        href: 'mela.html',
        children: [
          {
            id: 'upcoming',
            titleEn: 'Festival Schedule & Events',
            titleMl: 'മേളയുടെ അരങ്ങുകളും പരിപാടികളും',
            href: 'mela.html#upcoming'
          }
        ]
      },
      {
        id: 'awards',
        num: '04',
        titleEn: 'Natyabharathi Awards',
        titleMl: 'നാട്യഭാരതി പുരസ്കാരങ്ങൾ',
        descEn: 'Living Legends & Laureates',
        descMl: 'പ്രതിഭാ പുരസ്കാര ജേതാക്കൾ',
        href: 'awards.html'
      },
      {
        id: 'gallery',
        num: '05',
        titleEn: 'Festival Gallery',
        titleMl: 'ചിത്രശാല',
        descEn: 'Year-Wise High-Definition Archives',
        descMl: 'വർഷം തിരിച്ചുള്ള ഫോട്ടോ ഗാലറി',
        href: 'gallery.html'
      },
      {
        id: 'mudras',
        num: '06',
        titleEn: 'Kathakali Mudras',
        titleMl: 'കഥകളി മുദ്രകൾ',
        descEn: '24 Root & 68 Misra Mudras Lexicon',
        descMl: '24 അടിസ്ഥാന & മിശ്ര മുദ്രകൾ',
        href: 'mudras.html'
      },
      {
        id: 'characters',
        num: '07',
        titleEn: 'Kathakali Characters',
        titleMl: 'കഥകളി വേഷങ്ങൾ',
        descEn: 'Paccha, Kathi, Minukku, Kari, Thadi',
        descMl: 'പ്രധാന കഥാപാത്ര വേഷങ്ങൾ',
        href: 'characters.html'
      },
      {
        id: 'instruments',
        num: '08',
        titleEn: 'Traditional Instruments',
        titleMl: 'കഥകളി വാദ്യങ്ങൾ',
        descEn: 'Chenda, Maddalam, Chengila, Ilathalam',
        descMl: 'മേളവാദ്യങ്ങളും സംഗീതോപകരണങ്ങളും',
        href: 'instruments.html'
      },
      {
        id: 'contact',
        num: '09',
        titleEn: 'Contact & Location',
        titleMl: 'ബന്ധപ്പെടുക',
        descEn: 'Cherukolpuzha Pamba Amphitheater',
        descMl: 'ചെറുകോൽപുഴ മണൽപ്പുറം, പത്തനംതിട്ട',
        href: 'contact.html'
      }
    ];

    let itemsHtml = '';
    mobileRoutes.forEach(item => {
      const isCurrent = isActiveRoute(item.href);
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = !!state.expandedSubmenus[item.id] || isCurrent;

      itemsHtml += `
        <li class="mobile-menu-item ${isCurrent ? 'is-active' : ''} ${hasChildren ? 'has-sub' : ''}">
          <div class="mobile-menu-row">
            <a href="${item.href}" class="mobile-menu-link ${isCurrent ? 'is-current-page' : ''}" data-nav-id="${item.id}">
              <span class="mobile-menu-badge">${item.num}</span>
              <div class="mobile-menu-text-wrap">
                <span class="mobile-menu-title">${isMl ? item.titleMl : item.titleEn}</span>
                <span class="mobile-menu-desc">${isMl ? item.descMl : item.descEn}</span>
              </div>
            </a>
            ${hasChildren ? `
              <button type="button" 
                      class="mobile-menu-expand-btn ${isExpanded ? 'is-open' : ''}" 
                      data-parent-id="${item.id}"
                      aria-expanded="${isExpanded ? 'true' : 'false'}"
                      aria-label="Toggle submenu for ${isMl ? item.titleMl : item.titleEn}">
                <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true" class="mobile-chevron-svg">
                  <polyline points="2 4 6 8 10 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
                </svg>
              </button>
            ` : ''}
          </div>
          ${hasChildren ? `
            <ul class="mobile-menu-submenu ${isExpanded ? 'is-open' : ''}" id="submenu-${item.id}">
              ${item.children.map(child => {
                const isChildActive = isActiveRoute(child.href);
                return `
                  <li class="mobile-menu-subitem">
                    <a href="${child.href}" class="mobile-menu-sublink ${isChildActive ? 'is-current-subpage' : ''}" data-nav-id="${child.id}">
                      <span class="mobile-sublink-bullet">✦</span>
                      <span>${isMl ? child.titleMl : child.titleEn}</span>
                    </a>
                  </li>
                `;
              }).join('')}
            </ul>
          ` : ''}
        </li>
      `;
    });

    return `
      <div class="mobile-nav-container">
        <!-- Mobile Header Bar -->
        <div class="mobile-nav-top-bar">
          <div class="mobile-nav-kicker">
            <span>${isMl ? 'നാവിഗേഷൻ മെനു' : 'EXPLORE AYROOR'}</span>
            <span class="mobile-nav-kicker-dot">•</span>
            <span>01 — 09</span>
          </div>
        </div>

        <!-- Clean Menu Items List -->
        <ul class="mobile-menu-list" role="menu">
          ${itemsHtml}
        </ul>

        <!-- Mobile Drawer Quick Connect Hub -->
        <div class="mobile-menu-footer-hub">
          <div class="mobile-menu-location">
            <span class="mobile-menu-loc-icon">📍</span>
            <span>${isMl ? 'ചെറുകോൽപുഴ മണൽപ്പുറം, അയ്രൂർ, പത്തനംതിട്ട' : 'Cherukolpuzha Pamba Sandbanks, Ayroor, Kerala'}</span>
          </div>
          <div class="mobile-menu-action-buttons">
            <a href="https://wa.me/919446538553" target="_blank" rel="noopener noreferrer" class="mobile-wa-pill-btn">
              <span>💬 ${isMl ? 'വാട്സാപ്പ്' : 'WhatsApp'}</span>
            </a>
            <a href="contact.html" class="mobile-contact-pill-btn">
              <span>${isMl ? 'ബന്ധപ്പെടുക' : 'Contact Us'} →</span>
            </a>
          </div>
          <div class="mobile-menu-social-icons">
            <a href="https://www.youtube.com/watch?v=nwiLwsgicno" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/></svg></a>
            <a href="https://www.instagram.com/ayroorkathakaligramam" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
            <a href="https://www.facebook.com/ayroorkathakaligramam" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            <a href="https://x.com/ayroorkathakali" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor" class="social-svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="https://maps.google.com/?q=Ayroor+Kathakali+Gramam+Cherukolpuzha+Kerala" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Location"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"></circle></svg></a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Build Layer 3: Contextual Visual Panel
   */
  function buildArchVisualPanel(groupId) {
    const config = typeof window !== 'undefined' ? window.NAV_CONFIG : null;
    if (!config || !config.groups) return '';

    const group = config.groups.find(g => g.id === groupId) || config.groups[0];
    const isMl = state.currentLang === 'ml';

    const totalGroupsStr = String(config.groups.length).padStart(2, '0');

    return `
      <div class="arch-visual-frame">
        <img src="${group.image}" alt="${group.imageAlt}" class="arch-visual-img" id="archVisualImg" loading="lazy">
        <div class="arch-visual-overlay"></div>
        <div class="arch-visual-num-badge">${group.num} / ${totalGroupsStr}</div>
      </div>

      <div class="arch-visual-details" id="archVisualDetails">
        <div class="arch-visual-kicker">${t(group, 'kicker')}</div>
        <h2 class="arch-visual-title">${isMl ? group.labelMl : group.labelEn}</h2>
        <p class="arch-visual-desc">${t(group, 'desc')}</p>
        <div class="arch-visual-coords">
          ${group.coordinates}
        </div>
      </div>
    `;
  }

  /**
   * Build Architectural Footer Navigation (8 Groups)
   */
  function buildFooterNav() {
    const config = typeof window !== 'undefined' ? window.NAV_CONFIG : null;
    if (!config || !config.groups) return '';

    const isMl = state.currentLang === 'ml';

    let html = `
      <div class="footer-arch-section" role="navigation" aria-label="Footer Architecture Navigation">
        <div class="footer-arch-headline">
          <span>${isMl ? 'നാട്യ രൂപരേഖാ നാവിഗേഷൻ' : 'Architectural Directory'}</span>
        </div>
        <div class="footer-arch-grid">
    `;

    config.groups.forEach(group => {
      html += `
        <div class="footer-arch-group">
          <span class="footer-arch-group-num">${group.num}</span>
          <h4 class="footer-arch-group-title">${t(group, 'label')}</h4>
          <ul class="footer-arch-links">
      `;

      group.items.forEach(item => {
        html += `
          <li>
            <a href="${item.href}" class="footer-arch-link" data-nav-id="${item.id}">
              ${t(item, 'label')}
            </a>
          </li>
        `;
        if (item.children) {
          item.children.forEach(child => {
            html += `
              <li>
                <a href="${child.href}" class="footer-arch-link footer-arch-sublink" data-nav-id="${child.id}">
                  ${t(child, 'label')}
                </a>
              </li>
            `;
          });
        }
      });

      html += `
          </ul>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
    return html;
  }

  /**
   * Update Contextual Visual Panel with Smooth Transition
   */
  function updateVisualPanel(groupId) {
    if (state.activeGroupId === groupId) return;
    state.activeGroupId = groupId;

    const panel = document.getElementById('archVisualPanel');
    if (!panel) return;

    const config = window.NAV_CONFIG;
    if (!config) return;

    const group = config.groups.find(g => g.id === groupId);
    if (!group) return;

    const img = document.getElementById('archVisualImg');
    const details = document.getElementById('archVisualDetails');

    if (img && details) {
      img.style.opacity = '0.35';
      img.style.transform = 'scale(0.98)';
      
      setTimeout(() => {
        img.src = group.image;
        img.alt = group.imageAlt;
        const badge = panel.querySelector('.arch-visual-num-badge');
        if (badge) badge.textContent = `${group.num} / 08`;

        details.innerHTML = `
          <div class="arch-visual-kicker">${t(group, 'kicker')}</div>
          <h2 class="arch-visual-title">${group.labelEn}</h2>
          <div class="arch-visual-title-ml">${group.labelMl}</div>
          <p class="arch-visual-desc">${t(group, 'desc')}</p>
          <div class="arch-visual-coords">
            ${group.coordinates}
          </div>
        `;

        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
      }, 150);
    } else {
      panel.innerHTML = buildArchVisualPanel(groupId);
    }

    // Update active highlight class in nav panel
    document.querySelectorAll('.arch-group').forEach(el => {
      if (el.getAttribute('data-group-id') === groupId) {
        el.classList.add('is-focused');
      } else {
        el.classList.remove('is-focused');
      }
    });
  }

  /**
   * Open Architectural Canvas
   */
  function openCanvas() {
    const canvas = document.getElementById('archNavCanvas');
    const trigger = document.getElementById('archMenuBtn');
    if (!canvas) return;

    state.isCanvasOpen = true;
    canvas.classList.add('is-open');
    canvas.setAttribute('aria-hidden', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    document.body.style.overflow = 'hidden';
    if (typeof window.stopScroll === 'function') {
      window.stopScroll();
    } else if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
    }

    // Focus close button
    const closeBtn = document.getElementById('archCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  /**
   * Close Architectural Canvas
   */
  function closeCanvas() {
    const canvas = document.getElementById('archNavCanvas');
    const trigger = document.getElementById('archMenuBtn');
    if (!canvas) return;

    state.isCanvasOpen = false;
    canvas.classList.remove('is-open');
    canvas.setAttribute('aria-hidden', 'true');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }

    document.body.style.overflow = '';
    if (typeof window.startScroll === 'function') {
      window.startScroll();
    } else if (window.lenis && typeof window.lenis.start === 'function') {
      window.lenis.start();
    }
  }

  /**
   * Toggle Language between English and Malayalam
   */
  function toggleLanguage() {
    const nextLang = state.currentLang === 'en' ? 'ml' : 'en';
    if (typeof window !== 'undefined' && window.AyroorI18n && typeof window.AyroorI18n.setLanguage === 'function') {
      window.AyroorI18n.setLanguage(nextLang);
    } else {
      setLanguage(nextLang, false);
    }
  }

  /**
   * Set Specific Language
   */
  function setLanguage(lang, skipMainSync) {
    if (lang !== 'en' && lang !== 'ml') return;
    state.currentLang = lang;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ayroor_lang', lang);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('lang', lang);
    }

    // Delegate to central i18n engine
    if (!skipMainSync && typeof window !== 'undefined' && window.AyroorI18n && typeof window.AyroorI18n.setLanguage === 'function') {
      window.AyroorI18n.setLanguage(lang, true);
    } else if (typeof window !== 'undefined' && window.AyroorI18n && typeof window.AyroorI18n.updateDomTranslations === 'function') {
      window.AyroorI18n.updateDomTranslations();
    }

    // Dynamic search input placeholder update
    const searchInput = document.getElementById('exploreSearchInput');
    if (searchInput) {
      if (document.getElementById('mudrasGrid')) {
        searchInput.placeholder = lang === 'ml' ? '24 കഥകളി മുദ്രകൾ, അർത്ഥം എന്നിവ തിരയുക...' : 'Search 24 mudras, meaning, tags (e.g. Flag, King, Arrow)...';
      } else if (document.getElementById('charactersGrid')) {
        searchInput.placeholder = lang === 'ml' ? 'കഥകളി വേഷങ്ങൾ, ഭാവങ്ങൾ തിരയുക...' : 'Search character, archetype, traits (e.g. Paccha, Ravana, Hanuman)...';
      } else if (document.getElementById('instrumentsGrid')) {
        searchInput.placeholder = lang === 'ml' ? 'കഥകളി വാദ്യങ്ങൾ, മേളപ്പെരുക്കം തിരയുക...' : 'Search instrument, role, tala (e.g. Chenda, Maddalam, Chengila)...';
      } else if (document.getElementById('gallery-grid')) {
        searchInput.placeholder = lang === 'ml' ? 'ചിത്രശാല തിരയുക...' : 'Search visuals, performances, artists...';
      }
    }

    // Re-render UI elements in-place
    renderAll();

    // Notify other components if needed
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('ayroor:languageChanged', { detail: { lang } });
      window.dispatchEvent(event);

      if (!skipMainSync && typeof window.applyLanguage === 'function') {
        window.applyLanguage(lang);
      }
    }
  }

  /**
   * Render or Re-render All Navigation Components
   */
  function renderAll() {
    if (typeof document === 'undefined' || typeof document.getElementById !== 'function') return;

    // 1. Desktop Nav
    const desktopNav = document.getElementById('desktopNav');
    if (desktopNav) {
      desktopNav.innerHTML = buildDesktopNav();
    }

    // 2. Architectural Canvas Panels
    const rail = document.getElementById('archRail');
    if (rail) rail.innerHTML = buildArchRail();

    const navPanel = document.getElementById('archNavPanel');
    if (navPanel) {
      navPanel.innerHTML = `
        <div class="arch-desktop-nav-content">
          ${buildArchNavPanel()}
        </div>
        <div class="arch-mobile-nav-content">
          ${buildArchMobileNavPanel()}
        </div>
      `;
    }

    const visualPanel = document.getElementById('archVisualPanel');
    if (visualPanel) visualPanel.innerHTML = buildArchVisualPanel(state.activeGroupId);

    // 3. Language button texts in header
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      const isMl = state.currentLang === 'ml';
      langBtn.innerHTML = isMl
        ? '<span class="lang-active">മലയാളം</span> / <span>EN</span>'
        : '<span>മലയാളം</span> / <span class="lang-active">EN</span>';
    }

    // 4. Menu button text
    document.querySelectorAll('[data-arch-menu-text]').forEach(menuBtnText => {
      menuBtnText.textContent = state.currentLang === 'ml' ? 'മെനു' : 'MENU';
    });

    // 5. Architectural Footer Navigation
    const footerContainer = document.querySelector('.footer-container');
    if (footerContainer) {
      let footerArch = document.getElementById('footerArchNav');
      if (!footerArch) {
        footerArch = document.createElement('div');
        footerArch.id = 'footerArchNav';
        const footerBottom = footerContainer.querySelector('.footer-bottom');
        if (footerBottom) {
          footerContainer.insertBefore(footerArch, footerBottom);
        } else {
          footerContainer.appendChild(footerArch);
        }
      }
      footerArch.innerHTML = buildFooterNav();
    }

    bindEvents();
  }

  /**
   * Bind DOM Events & Delegations
   */
  function bindEvents() {
    if (typeof document === 'undefined' || typeof document.getElementById !== 'function') return;

    // Menu trigger button
    const trigger = document.getElementById('archMenuBtn');
    if (trigger && !trigger._archBound) {
      trigger._archBound = true;
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.isCanvasOpen) closeCanvas();
        else openCanvas();
      });
    }

    // Close button
    const closeBtn = document.getElementById('archCloseBtn');
    if (closeBtn && !closeBtn._archBound) {
      closeBtn._archBound = true;
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeCanvas();
      });
    }

    // Language Toggle Buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      if (!btn._langToggleBound && !btn._archBound) {
        btn._langToggleBound = true;
        btn._archBound = true;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleLanguage();
        });
      }
    });

    // Central i18n language change synchronization
    if (typeof window !== 'undefined' && !window._ayroorNavLangBound) {
      window._ayroorNavLangBound = true;
      window.addEventListener('ayroor:languageChanged', (e) => {
        if (e.detail && e.detail.lang && e.detail.lang !== state.currentLang) {
          state.currentLang = e.detail.lang;
          renderAll();
        }
      });
    }

    // Group hover and focus events (Layer 2 -> Layer 3 sync)
    document.querySelectorAll('.arch-group').forEach(groupEl => {
      const gId = groupEl.getAttribute('data-group-id');
      if (!groupEl._archBound) {
        groupEl._archBound = true;
        groupEl.addEventListener('mouseenter', () => updateVisualPanel(gId));
        groupEl.addEventListener('focusin', () => updateVisualPanel(gId));
      }
    });

    // Submenu expander buttons (supports both desktop and mobile drawer)
    document.querySelectorAll('.arch-expand-btn, .mobile-menu-expand-btn').forEach(btn => {
      if (!btn._archBound) {
        btn._archBound = true;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const parentId = btn.getAttribute('data-parent-id');
          const submenu = document.getElementById(`submenu-${parentId}`);
          if (!submenu) return;

          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          const nextExpanded = !isExpanded;

          btn.setAttribute('aria-expanded', String(nextExpanded));
          btn.classList.toggle('is-open', nextExpanded);
          if (nextExpanded) {
            submenu.classList.add('is-open', 'is-expanded');
            state.expandedSubmenus[parentId] = true;
          } else {
            submenu.classList.remove('is-open', 'is-expanded');
            delete state.expandedSubmenus[parentId];
          }
        });
      }
    });

    // Close canvas when an internal link is clicked
    const canvas = document.getElementById('archNavCanvas');
    if (canvas && !canvas._archLinkBound) {
      canvas._archLinkBound = true;
      canvas.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href')) {
          closeCanvas();
        }
      });
    }

    // Desktop Nav Dropdown hover intent, focus management & touch stability
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    const allNavPeers = document.querySelectorAll('.nav-item, .arch-menu-btn, .lang-toggle-btn, .brand-link');

    const closeAllDropdownsImmediate = (exceptItem = null) => {
      dropdownItems.forEach(item => {
        if (item === exceptItem) return;
        if (item._archCloseTimer) {
          clearTimeout(item._archCloseTimer);
          item._archCloseTimer = null;
        }
        item.classList.remove('is-open');
        const d = item.querySelector('.nav-dropdown');
        const l = item.querySelector('.nav-link');
        if (d) d.classList.remove('is-open');
        if (l) l.setAttribute('aria-expanded', 'false');
      });
    };

    // Hovering across peer nav elements immediately dismisses any open sibling dropdowns
    allNavPeers.forEach(peer => {
      if (peer._archPeerHoverBound) return;
      peer._archPeerHoverBound = true;
      peer.addEventListener('mouseenter', () => {
        const parentDropdown = peer.closest('.nav-item.has-dropdown');
        closeAllDropdownsImmediate(parentDropdown);
      });
    });

    dropdownItems.forEach(item => {
      if (item._archDropdownBound) return;
      item._archDropdownBound = true;

      const link = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.nav-dropdown');

      const openDropdown = () => {
        // Dismiss sibling dropdowns instantly with 0ms lag
        closeAllDropdownsImmediate(item);
        if (item._archCloseTimer) {
          clearTimeout(item._archCloseTimer);
          item._archCloseTimer = null;
        }
        item.classList.add('is-open');
        if (dropdown) dropdown.classList.add('is-open');
        if (link) link.setAttribute('aria-expanded', 'true');
      };

      const closeDropdown = (delay = 100) => {
        if (item._archCloseTimer) clearTimeout(item._archCloseTimer);
        item._archCloseTimer = setTimeout(() => {
          item.classList.remove('is-open');
          if (dropdown) dropdown.classList.remove('is-open');
          if (link) link.setAttribute('aria-expanded', 'false');
          item._archCloseTimer = null;
        }, delay);
      };

      item.addEventListener('mouseenter', openDropdown);
      item.addEventListener('mouseleave', () => closeDropdown(100));
      item.addEventListener('focusin', openDropdown);
      item.addEventListener('focusout', (e) => {
        if (!item.contains(e.relatedTarget)) {
          closeDropdown(40);
        }
      });

      // Handle touch devices without proper mouse hover
      if (link) {
        link.addEventListener('click', (e) => {
          const isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
          if (isTouch) {
            const isOpen = item.classList.contains('is-open');
            if (!isOpen) {
              e.preventDefault();
              openDropdown();
            }
          }
        });
      }
    });

    // Close any open desktop dropdowns when clicking outside
    if (!document._archDocClickBound) {
      document._archDocClickBound = true;
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item.has-dropdown')) {
          document.querySelectorAll('.nav-item.has-dropdown.is-open').forEach(openItem => {
            openItem.classList.remove('is-open');
            const d = openItem.querySelector('.nav-dropdown');
            if (d) d.classList.remove('is-open');
            const l = openItem.querySelector('.nav-link');
            if (l) l.setAttribute('aria-expanded', 'false');
          });
        }
      });
    }

    // Keyboard navigation (Escape to close, Focus trapping)
    if (!document._archKeyBound) {
      document._archKeyBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isCanvasOpen) {
          closeCanvas();
        }
      });
    }

    // Scroll-reactive header
    if (!window._archScrollBound) {
      window._archScrollBound = true;
      window.addEventListener('scroll', () => {
        const header = document.getElementById('siteHeader');
        if (!header) return;
        if (window.scrollY > 30) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }, { passive: true });
    }
  }

  /**
   * Determine Initial Active Group based on Current Route
   */
  function setInitialActiveGroup() {
    const config = typeof window !== 'undefined' ? window.NAV_CONFIG : null;
    if (!config) return;
    const currentGroup = config.findGroupByRoute(state.currentPath);
    if (currentGroup) {
      state.activeGroupId = currentGroup.id;
    }
  }

  /**
   * Universal Back to Top Controller (Floating Circular Ring & Footer Button)
   * Guaranteed across all pages.
   */
  function initUniversalBackToTop() {
    const floatingBtn = document.getElementById('floatingBackToTop');
    const footerBtn = document.getElementById('backToTopBtn');
    if (!floatingBtn && !footerBtn) return;

    if (floatingBtn && floatingBtn._bttInitialized) return;
    if (floatingBtn) floatingBtn._bttInitialized = true;

    const ringIndicator = floatingBtn ? floatingBtn.querySelector('.progress-ring-indicator') : null;
    const radius = 23;
    const circumference = 2 * Math.PI * radius; // ~144.513

    if (ringIndicator) {
      ringIndicator.style.strokeDasharray = circumference.toFixed(2);
      ringIndicator.style.strokeDashoffset = circumference.toFixed(2);
    }

    let isTicking = false;

    function updateScrollState() {
      const scrollY = (window.lenis && typeof window.lenis.scroll === 'number') 
        ? window.lenis.scroll 
        : (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0);

      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const maxScroll = Math.max(1, scrollHeight - clientHeight);

      if (floatingBtn) {
        if (scrollY > 280) {
          floatingBtn.classList.add('visible');
          floatingBtn.classList.add('is-visible');
        } else {
          floatingBtn.classList.remove('visible');
          floatingBtn.classList.remove('is-visible');
        }

        if (ringIndicator) {
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          const offset = circumference * (1 - progress);
          ringIndicator.style.strokeDashoffset = offset.toFixed(2);
        }
      }
      isTicking = false;
    }

    function onScroll() {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateScrollState);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();

    function scrollToTop(e) {
      if (e) e.preventDefault();
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { duration: 1.25 });
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (floatingBtn) {
      floatingBtn.addEventListener('click', scrollToTop);
    }
    if (footerBtn) {
      footerBtn.addEventListener('click', scrollToTop);
    }
  }

  /**
   * Initialization
   */
  function init() {
    if (state.currentLang) {
      setLanguage(state.currentLang, true);
    }
    setInitialActiveGroup();
    renderAll();
    initUniversalBackToTop();
  }

  // Auto-init on DOMContentLoaded or immediate if already ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  // Expose Global Public API on window.AyroorNav
  if (typeof window !== 'undefined') {
    window.AyroorNav = {
      open: openCanvas,
      close: closeCanvas,
      toggle: function () {
        if (state.isCanvasOpen) closeCanvas();
        else openCanvas();
      },
      setLanguage: function (lang) { setLanguage(lang, false); },
      toggleLanguage: toggleLanguage,
      getLanguage: function () { return state.currentLang; },
      getState: function () { return Object.assign({}, state); },
      render: renderAll,
      refresh: function () {
        // Update current language from storage or main state if changed
        if (typeof localStorage !== 'undefined') {
          const stored = localStorage.getItem('ayroor_lang');
          if (stored && stored !== state.currentLang) {
            state.currentLang = stored;
          }
        }
        renderAll();
      }
    };
  }

  // Export for Node/test environments
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      state,
      t,
      isActiveRoute,
      buildDesktopNav,
      buildArchRail,
      buildArchNavPanel,
      buildArchVisualPanel,
      buildFooterNav
    };
  }
})();
