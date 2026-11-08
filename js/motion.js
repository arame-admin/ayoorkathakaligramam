/**
 * Ayroor Kathakali Gramam — Unified Motion & Smooth Scroll Engine
 * Powered by Lenis 1.1.x + GSAP 3.12.x + ScrollTrigger
 * ============================================================================
 * Provides synchronized 60fps smooth scrolling, frame-accurate scrub timelines,
 * conflict-free modal scrolling, seamless anchor jumps, and cinematic
 * scroll-triggered entrance animations across all pages.
 * ============================================================================
 */

(function () {
  'use strict';

  // Environment & accessibility checks
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 860;

  let lenisInstance = null;
  let scrollTriggerRegistered = false;

  /* ==========================================================================
     1. LENIS INITIALIZATION & GSAP TICKER SYNCHRONIZATION
     ========================================================================== */

  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') {
      console.warn('[Motion] Lenis library not found on page.');
      return;
    }

    // If an instance already exists, reuse it
    if (window.lenis) {
      lenisInstance = window.lenis;
      return;
    }

    try {
      lenisInstance = new Lenis({
        duration: prefersReducedMotion ? 0.1 : (isMobile ? 1.05 : 1.25),
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.35,
        infinite: false,
        autoRaf: false // Explicitly driven by GSAP ticker or rAF loop
      });

      window.lenis = lenisInstance;
      document.documentElement.classList.add('lenis', 'lenis-smooth');

      // Coordinate with GSAP & ScrollTrigger
      if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined' && !scrollTriggerRegistered) {
          gsap.registerPlugin(ScrollTrigger);
          scrollTriggerRegistered = true;

          // Tell ScrollTrigger to recalculate whenever Lenis scrolls
          lenisInstance.on('scroll', ScrollTrigger.update);
        }

        // Drive Lenis strictly through GSAP ticker for 100% unified frame pacing
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });

        // Disable GSAP lag smoothing to ensure scrub timelines don't lag behind wheel
        gsap.ticker.lagSmoothing(0);
      } else {
        // Fallback rAF loop if GSAP is loaded asynchronously or unavailable
        function rafLoop(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(rafLoop);
        }
        requestAnimationFrame(rafLoop);
      }
    } catch (err) {
      console.warn('[Motion] Error initializing Lenis:', err);
    }
  }

  /* ==========================================================================
     2. GLOBAL SCROLL & MOTION HELPERS
     ========================================================================== */

  // Stop scrolling when modals, lightboxes, or full-canvas navigation open
  window.stopScroll = function () {
    if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
    }
    document.documentElement.classList.add('lenis-stopped');
  };

  // Resume scrolling when overlays close
  window.startScroll = function () {
    if (window.lenis && typeof window.lenis.start === 'function') {
      window.lenis.start();
    }
    document.documentElement.classList.remove('lenis-stopped');
  };

  // Refresh Lenis boundaries and ScrollTrigger markers after dynamic DOM updates
  window.refreshMotionAndScroll = function () {
    if (window.lenis && typeof window.lenis.resize === 'function') {
      window.lenis.resize();
    }
    if (typeof ScrollTrigger !== 'undefined' && typeof ScrollTrigger.refresh === 'function') {
      ScrollTrigger.refresh();
    }
  };

  /* ==========================================================================
     3. AUTOMATIC MODAL, DRAWER & INNER SCROLL ISOLATION
     ========================================================================== */

  function setupScrollIsolation() {
    // Select elements that must scroll independently without parent page scrolling
    const preventElements = [
      '.explore-modal',
      '.explore-modal-inner',
      '.explore-modal-body',
      '.citation-modal-box',
      '.citation-modal-card',
      '.citation-modal-body',
      '.supsystic-lightbox-dialog',
      '.lightbox-media-container',
      '.lightbox-thumbs-container',
      '.arch-canvas',
      '.arch-canvas-menu',
      '.nav-drawer-menu',
      '.year-scroll-stream',
      '.gallery-year-stream'
    ];

    preventElements.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.setAttribute('data-lenis-prevent', '');
      });
    });

    // Observe modal elements for 'is-open' or 'aria-hidden' attribute changes
    const modalContainers = [
      document.getElementById('exploreDetailModal'),
      document.getElementById('citationModal'),
      document.getElementById('supsysticLightbox'),
      document.getElementById('archNavCanvas')
    ].filter(Boolean);

    if (window.MutationObserver && modalContainers.length > 0) {
      const modalObserver = new MutationObserver((mutations) => {
        let anyOpen = false;
        modalContainers.forEach((m) => {
          const isOpen = m.classList.contains('is-open') || m.getAttribute('aria-hidden') === 'false';
          if (isOpen) anyOpen = true;
        });

        if (anyOpen) {
          window.stopScroll();
        } else {
          window.startScroll();
          window.refreshMotionAndScroll();
        }
      });

      modalContainers.forEach((m) => {
        modalObserver.observe(m, { attributes: true, attributeFilter: ['class', 'aria-hidden'] });
      });
    }
  }

  /* ==========================================================================
     4. UNIFIED SMOOTH ANCHOR & HASH SCROLL ENGINE
     ========================================================================== */

  function setupSmoothAnchors() {
    const HEADER_OFFSET = -76;

    // Helper: Execute frame-accurate Lenis smooth scroll to target element
    function smoothScrollToElement(targetEl, offset = HEADER_OFFSET) {
      if (!targetEl) return;
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(targetEl, {
          offset: offset,
          duration: prefersReducedMotion ? 0.1 : 1.25,
          lock: false
        });
      } else {
        const top = targetEl.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }

      // Sync explore nav pills active state if present
      const pill = document.querySelector(`.explore-nav-pill[href="#${targetEl.id}"]`);
      if (pill) {
        document.querySelectorAll('.explore-nav-pill').forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
      }
    }

    // Global delegated click listener for on-page anchor links (e.g. 'about.html#office-bearers' or '#office-bearers')
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      if (anchor.hasAttribute('data-no-scroll')) return;

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref === '#' || rawHref.length <= 1) return;

      const hashIndex = rawHref.indexOf('#');
      if (hashIndex === -1) return; // Not a hash link

      const pathPart = rawHref.substring(0, hashIndex);
      const hashPart = rawHref.substring(hashIndex + 1);
      if (!hashPart) return;

      // Current page filename comparison (e.g. 'about.html')
      const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
      const targetPath = (pathPart.split('/').pop() || '').toLowerCase();

      // Determine if link targets an element on the current page
      const isCurrentPage = !targetPath ||
                            targetPath === '' ||
                            targetPath === currentPath ||
                            ((currentPath === 'index.html' || currentPath === '') && (targetPath === 'index.html' || targetPath === ''));

      if (!isCurrentPage) return; // Cross-page navigation: let browser load the target page

      let targetEl = null;
      try {
        targetEl = document.getElementById(hashPart) || document.querySelector('#' + hashPart);
      } catch (_) {
        targetEl = null;
      }

      if (targetEl) {
        e.preventDefault();

        // Close mobile canvas drawer if open
        const canvas = document.getElementById('archNavCanvas');
        if (canvas && canvas.classList.contains('is-open')) {
          const closeBtn = document.getElementById('archCloseBtn');
          if (closeBtn) closeBtn.click();
        }

        // Close desktop dropdown menu if open
        document.querySelectorAll('.nav-item.has-dropdown.is-open').forEach(openItem => {
          openItem.classList.remove('is-open');
          const d = openItem.querySelector('.nav-dropdown');
          if (d) d.classList.remove('is-open');
          const l = openItem.querySelector('.nav-link');
          if (l) l.setAttribute('aria-expanded', 'false');
        });

        // Update URL hash cleanly without native browser jump
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#' + hashPart);
        }

        // Trigger smooth scroll via Lenis
        smoothScrollToElement(targetEl, HEADER_OFFSET);
      }
    });

    // Handle initial hash on page load (e.g., user navigated to about.html#office-bearers from another page)
    function handleInitialHash() {
      if (!window.location.hash) return;
      const hash = window.location.hash.substring(1);
      if (!hash) return;

      const targetEl = document.getElementById(hash);
      if (targetEl) {
        setTimeout(() => {
          smoothScrollToElement(targetEl, HEADER_OFFSET);
        }, 250);
      }
    }

    if (document.readyState === 'complete') {
      handleInitialHash();
    } else {
      window.addEventListener('load', handleInitialHash);
    }

    // Handle hash change events (e.g. browser back/forward buttons)
    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          smoothScrollToElement(targetEl, HEADER_OFFSET);
        }
      }
    });
  }

  /* ==========================================================================
     5. UNIVERSAL BACK TO TOP WITH DUAL LENIS SYNC
     ========================================================================== */

  function setupUniversalBackToTop() {
    const floatingBtn = document.getElementById('floatingBackToTop') || document.querySelector('.floating-btt');
    const footerBtn = document.getElementById('backToTopBtn') || document.querySelector('.footer-back-to-top');

    if (!floatingBtn && !footerBtn) return;

    const ringIndicator = floatingBtn ? floatingBtn.querySelector('.progress-ring-indicator') : null;
    const radius = 23;
    const circumference = 2 * Math.PI * radius; // ~144.51

    if (ringIndicator) {
      ringIndicator.style.strokeDasharray = `${circumference} ${circumference}`;
      ringIndicator.style.strokeDashoffset = circumference;
    }

    function updateProgress(scrollY) {
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(1, Math.max(0, scrollY / docHeight));

      if (ringIndicator) {
        ringIndicator.style.strokeDashoffset = circumference - (progress * circumference);
      }

      if (floatingBtn) {
        if (scrollY > 300) {
          floatingBtn.classList.add('visible', 'is-visible');
        } else {
          floatingBtn.classList.remove('visible', 'is-visible');
        }
      }
    }

    function onScrollUpdate() {
      const scrollY = (window.lenis && typeof window.lenis.scroll === 'number')
        ? window.lenis.scroll
        : (window.scrollY || document.documentElement.scrollTop || 0);
      updateProgress(scrollY);
    }

    // Sync with Lenis or native scroll
    if (window.lenis) {
      window.lenis.on('scroll', (e) => {
        updateProgress(e.scroll || 0);
      });
    }
    window.addEventListener('scroll', onScrollUpdate, { passive: true });
    onScrollUpdate();

    function scrollToTop(e) {
      if (e) e.preventDefault();
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0, { duration: prefersReducedMotion ? 0.1 : 1.25 });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }

    if (floatingBtn) floatingBtn.addEventListener('click', scrollToTop);
    if (footerBtn) footerBtn.addEventListener('click', scrollToTop);
  }

  /* ==========================================================================
     6. UNIVERSAL GSAP SCROLLTRIGGER ENTRANCE ANIMATIONS
     ========================================================================== */

  function setupScrollTriggerAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) {
      return;
    }

    // A. Section Headers Reveal
    const sectionHeaders = document.querySelectorAll('.section-header, .section-header-minimal');
    const vh = window.innerHeight;
    sectionHeaders.forEach((header) => {
      const overline = header.querySelector('.section-overline, .explore-badge');
      const title = header.querySelector('.section-title, h2, h3');
      const desc = header.querySelector('.section-desc, .section-subtitle, p');

      const elements = [overline, title, desc].filter(Boolean);
      if (elements.length > 0) {
        const rect = header.getBoundingClientRect();
        // Only trigger entrance tween if element is below initial viewport threshold
        if (rect.top > vh * 0.82) {
          gsap.from(elements, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: header,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          });
        }
      }
    });

    // B. Card Grids Batch Reveal (Explore Cards, Leaders, Disciplines, Faculty, Wings, Awards, Albums)
    const cardSelectors = [
      '.explore-card:not([style*="display: none"])',
      '.leader-card',
      '.discipline-item',
      '.faculty-card',
      '.institution-wing-card',
      '.award-card',
      '.gallery-album-card',
      '.mela-schedule-card',
      '.stat-card'
    ];

    const cards = Array.from(document.querySelectorAll(cardSelectors.join(',')));
    if (cards.length > 0) {
      const vh = window.innerHeight;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // If card is below current viewport, prepare entrance tween
        if (rect.top > vh * 0.85) {
          gsap.set(card, { opacity: 0, y: 28 });
        }
      });

      ScrollTrigger.batch(cards, {
        interval: 0.08,
        batchMax: 6,
        start: 'top 92%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: 'auto'
          });
        },
        once: true
      });
    }

    // C. Animated Number Counters
    const counterElements = document.querySelectorAll('.centre-stat-num, .stat-number, .awards-stat-number, .hero-stat-number');
    counterElements.forEach((el) => {
      const rawText = el.textContent.trim();
      const match = rawText.match(/(\d+)/);
      if (!match) return;

      const targetValue = parseInt(match[1], 10);
      const prefix = rawText.slice(0, match.index);
      const suffix = rawText.slice(match.index + match[0].length);

      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: targetValue,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
            }
          });
        }
      });
    });

    // D. Subtle Parallax for Media Cards & Figures
    const parallaxMedia = document.querySelectorAll('.explore-card-media, .leader-media-frame, .faculty-avatar-wrap');
    parallaxMedia.forEach((media) => {
      const img = media.querySelector('img');
      if (img) {
        gsap.to(img, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: media,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });

    // Refresh after DOM layout stabilization
    ScrollTrigger.refresh();
  }

  /* ==========================================================================
     7. UNIFIED CUSTOM CURSOR ENGINE (Consistent Across All 9 Pages)
     ========================================================================== */

  function initUnifiedCursor() {
    if (window.__ayroorCursorInitialized) return;

    // Do not run on touch / mobile devices or if reduced motion is requested
    if (window.matchMedia('(pointer: coarse)').matches || prefersReducedMotion) {
      return;
    }

    const dot = document.getElementById('customCursor');
    const follower = document.getElementById('customCursorFollower');
    if (!dot || !follower) return;

    window.__ayroorCursorInitialized = true;

    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;
    let isVisible = false;

    // Ultra-fluid position tracking
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        dot.style.opacity = '1';
        follower.style.opacity = '1';
        isVisible = true;
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      follower.style.opacity = '0';
      isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      follower.style.opacity = '1';
      isVisible = true;
    });

    // Smooth follower physics (0.18 lerp)
    function updateFollower() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(updateFollower);
    }
    requestAnimationFrame(updateFollower);

    // Delegated interactive hover states (works across static and dynamic components)
    const interactiveSelectors = 'a, button, input, select, textarea, [role="button"], .culture-card, .cta-button, .hero-btn, .explore-card, .reference-card, .laureate-card, .category-chip-btn, .view-btn, .gallery-card, .social-icon-btn, .social-svg, .filter-btn, .lexicon-tab-btn, .lexicon-mudra-header, .lexicon-action-btn, .misra-filter-btn, .back-to-top-btn, [tabindex="0"]';

    document.addEventListener('mouseover', (e) => {
      if (e.target && e.target.closest && e.target.closest(interactiveSelectors)) {
        dot.classList.add('active', 'is-hovering');
        follower.classList.add('active', 'is-hovering');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      if (e.target && e.target.closest && e.target.closest(interactiveSelectors)) {
        dot.classList.remove('active', 'is-hovering');
        follower.classList.remove('active', 'is-hovering');
      }
    }, { passive: true });
  }

  /* ==========================================================================
     8. INITIALIZATION BOOTSTRAP
     ========================================================================== */

  function initMotionCore() {
    initSmoothScroll();
    setupScrollIsolation();
    setupSmoothAnchors();
    setupUniversalBackToTop();
    setupScrollTriggerAnimations();
    initUnifiedCursor();

    // Re-synchronize after all images and fonts load
    window.addEventListener('load', () => {
      window.refreshMotionAndScroll();
    });

    // Debounced resize handler
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        window.refreshMotionAndScroll();
      }, 150);
    });
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotionCore);
  } else {
    initMotionCore();
  }

})();
