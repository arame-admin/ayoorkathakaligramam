/**
 * Ayroor Kathakali Gramam — Main JavaScript Application
 * Vanilla JS, no external libraries or build tools.
 * High performance canvas scrollytelling, progressive preloading,
 * accessible interactive controls and multilingual switching.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentLang: localStorage.getItem('ayroor_lang') || 'en',
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isMobile: window.innerWidth < 860,
    currentScene: 0,
    sceneAutoplayTimer: null
  };

  /* ==========================================================================
     1. LENIS SMOOTH SCROLLING (Synchronized with GSAP)
     ========================================================================== */

  let lenis = null;

  function initLenisSmoothScroll() {
    if (window.lenis) {
      lenis = window.lenis;
      return;
    }

    if (typeof Lenis === 'undefined') {
      console.warn('Lenis library not loaded');
      return;
    }

    try {
      lenis = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: false
      });

      // Expose globally for verification & programmatic access
      window.lenis = lenis;

      // Synchronize Lenis with GSAP ScrollTrigger via GSAP ticker
      if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);
          lenis.on('scroll', ScrollTrigger.update);
        }
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      // Intercept anchor links for ultra-smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (!targetId || targetId === '#') return;
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -76, duration: 1.25 });
          }
        });
      });
    } catch (err) {
      console.warn('Lenis smooth scrolling fallback:', err);
    }
  }

  /* ==========================================================================
     2. HERO GOLDEN DUST & EMBER CANVAS PARTICLES (60FPS)
     ========================================================================== */

  class HeroParticleSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas || state.reducedMotion) return;

      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.particles = [];
      this.particleCount = state.isMobile ? 35 : 75;
      this.width = 0;
      this.height = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.mouseX = -1000;
      this.mouseY = -1000;
      this.speedFactor = 1.0;
      this.animationFrameId = null;
      this.isActive = true;

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });

      // Track mouse position on hero
      const heroSection = document.getElementById('heroSection');
      if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
          const rect = this.canvas.getBoundingClientRect();
          this.mouseX = (e.clientX - rect.left) * this.dpr;
          this.mouseY = (e.clientY - rect.top) * this.dpr;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
          this.mouseX = -1000;
          this.mouseY = -1000;
        });
      }

      // Visibility optimization via IntersectionObserver
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isActive = entry.isIntersecting;
            if (this.isActive && !this.animationFrameId) {
              this.loop();
            }
          });
        }, { threshold: 0.05 });
        obs.observe(this.canvas);
      }

      this.createParticles();
      this.loop();
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width * this.dpr;
      this.height = rect.height * this.dpr;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    createParticles() {
      this.particles = [];
      const colors = [
        'rgba(229, 193, 88, ',  // Bright Gold
        'rgba(197, 160, 89, ',  // Antique Gold
        'rgba(245, 237, 225, ', // Warm Ivory
        'rgba(255, 215, 0, '    // Vivid Gold
      ];

      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * (this.width || 1200),
          y: Math.random() * (this.height || 800),
          radius: (Math.random() * 2.2 + 1.0) * this.dpr,
          baseAlpha: Math.random() * 0.55 + 0.25,
          alpha: 0,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.45 * this.dpr,
          vy: -(Math.random() * 0.75 + 0.35) * this.dpr,
          colorPrefix: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    setSpeedFactor(factor) {
      this.speedFactor = factor;
    }

    loop() {
      if (!this.isActive) {
        this.animationFrameId = null;
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      const mouseRepelRadius = 140 * this.dpr;
      const mouseRepelForce = 1.2 * this.dpr;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        p.phase += p.pulseSpeed;
        p.alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(p.phase));

        // Upward floating with scroll multiplier
        p.y += p.vy * this.speedFactor;
        p.x += p.vx + Math.sin(p.phase * 0.5) * 0.3 * this.dpr;

        // Mouse breeze interaction
        const dx = p.x - this.mouseX;
        const dy = p.y - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRepelRadius && dist > 0) {
          const force = (1 - dist / mouseRepelRadius) * mouseRepelForce;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Screen wrap-around
        if (p.y < -20) {
          p.y = this.height + 20;
          p.x = Math.random() * this.width;
        }
        if (p.x < -20) p.x = this.width + 20;
        if (p.x > this.width + 20) p.x = -20;

        // Draw glowing particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.colorPrefix + p.alpha + ')';
        this.ctx.shadowColor = 'rgba(229, 193, 88, 0.4)';
        this.ctx.shadowBlur = p.radius * 2.5;
        this.ctx.fill();
      }

      this.animationFrameId = requestAnimationFrame(() => this.loop());
    }
  }

  /* ==========================================================================
     3. MOUSE-FOLLOWING 3D PERSPECTIVE & PARALLAX
     ========================================================================== */

  function initHeroParallax() {
    if (state.reducedMotion || state.isMobile) return;

    const heroSection = document.getElementById('heroSection');
    const stage3d = document.getElementById('performer3dStage');
    const rays = document.getElementById('heroVolumetricRays');
    if (!heroSection || !stage3d) return;

    let targetRotX = 0, targetRotY = 0;
    let currRotX = 0, currRotY = 0;
    let targetRaysX = 0, targetRaysY = 0;
    let currRaysX = 0, currRaysY = 0;
    let isHovering = false;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotY = nx * 14;      // Rotate Y (-7deg to +7deg)
      targetRotX = -ny * 10;     // Rotate X (-5deg to +5deg)
      targetRaysX = -nx * 40;    // Counter parallax on background rays
      targetRaysY = -ny * 30;
      isHovering = true;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetRotX = 0;
      targetRotY = 0;
      targetRaysX = 0;
      targetRaysY = 0;
      isHovering = false;
    });

    function updateParallax() {
      // Butter-smooth lerp
      currRotX += (targetRotX - currRotX) * 0.08;
      currRotY += (targetRotY - currRotY) * 0.08;
      currRaysX += (targetRaysX - currRaysX) * 0.06;
      currRaysY += (targetRaysY - currRaysY) * 0.06;

      if (isHovering || Math.abs(currRotX) > 0.01 || Math.abs(currRotY) > 0.01) {
        stage3d.style.transform = `perspective(1400px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg) translateZ(30px)`;
      }

      if (rays && (isHovering || Math.abs(currRaysX) > 0.01)) {
        rays.style.transform = `translate(${currRaysX.toFixed(1)}px, ${currRaysY.toFixed(1)}px)`;
      }

      requestAnimationFrame(updateParallax);
    }

    requestAnimationFrame(updateParallax);
  }

  /* ==========================================================================
     4. MAGNETIC ACTION BUTTONS
     ========================================================================== */

  function initMagneticButtons() {
    if (state.reducedMotion || state.isMobile || typeof gsap === 'undefined') return;

    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' });

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        // Attract button up to 14px toward mouse
        xTo(relX * 0.35);
        yTo(relY * 0.35);
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ==========================================================================
     5. HERO 3-SCENE SLIDER CONTROLLER (Requirement 8)
     ========================================================================== */

  const HERO_SCENES = [
    {
      title1En: 'Where Expressions',
      accentEn: 'Become Stories',
      descEn: "Discover the timeless beauty, traditions, and expressive storytelling of Kerala's legendary Kathakali art — nurtured on the historic sandbanks of River Pamba.",
      titleMl: 'ഭാവങ്ങൾ കഥകളാകുന്ന പുണ്യഭൂമി'
    },
    {
      title1En: 'A Legacy Beyond',
      accentEn: 'Generations',
      descEn: 'Explore centuries of culture, devotion, and artistic excellence — where every sacred ornament, mudra, and beat preserves an unbroken heritage.',
      titleMl: 'തലമുറകൾ കൈമാറിയ പവിത്ര പൈതൃകം'
    },
    {
      title1En: 'Experience The Magic',
      accentEn: 'Of Kathakali',
      descEn: 'Witness storytelling through intense expressions, divine rhythm, and sacred theater under the incandescent glow of the traditional brass lamp.',
      titleMl: 'അരങ്ങിലെ ഭാവതാള വിസ്മയം'
    }
  ];

  function switchHeroScene(sceneIndex) {
    if (sceneIndex === state.currentScene) return;
    state.currentScene = sceneIndex;

    // Update active tab buttons
    document.querySelectorAll('.hero-scene-tab').forEach((tab) => {
      const idx = parseInt(tab.getAttribute('data-scene'), 10);
      const isActive = idx === sceneIndex;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Crossfade performer visual layers
    document.querySelectorAll('.performer-layer').forEach((layer) => {
      const idx = parseInt(layer.getAttribute('data-scene-layer'), 10);
      layer.classList.toggle('active', idx === sceneIndex);
    });

    // Synchronize hero atmosphere and halo aura with active scene
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
      heroSection.setAttribute('data-active-scene', sceneIndex);
    }

    // Animate text transition smoothly
    const scene = HERO_SCENES[sceneIndex];
    const headline = document.getElementById('heroHeadline');
    const description = document.getElementById('heroDescription');
    const headlineMl = document.querySelector('.hero-headline-ml');

    if (typeof gsap !== 'undefined' && !state.reducedMotion) {
      gsap.to([headline, description, headlineMl], {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          updateSceneText(scene);
          gsap.to([headline, description, headlineMl], {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            stagger: 0.08
          });
        }
      });
    } else {
      updateSceneText(scene);
    }
  }

  function updateSceneText(scene) {
    const isMl = state.currentLang === 'ml';
    const line1 = document.querySelector('.hero-line-1');
    const lineAccent = document.querySelector('.hero-line-accent');
    const desc = document.getElementById('heroDescription');
    const mlTitle = document.querySelector('.hero-headline-ml');

    if (line1) line1.textContent = scene.title1En;
    if (lineAccent) lineAccent.textContent = scene.accentEn;
    if (desc) desc.textContent = scene.descEn;
    if (mlTitle) mlTitle.textContent = scene.titleMl;
  }

  function initHeroSceneSwitcher() {
    const tabs = document.querySelectorAll('.hero-scene-tab');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(tab.getAttribute('data-scene'), 10);
        switchHeroScene(idx);
        restartSceneAutoplay();
      });
    });

    // Gentle auto-rotation every 9s
    startSceneAutoplay();

    // Pause on hover
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => clearInterval(state.sceneAutoplayTimer));
      heroSection.addEventListener('mouseleave', () => startSceneAutoplay());
    }
  }

  function startSceneAutoplay() {
    clearInterval(state.sceneAutoplayTimer);
    state.sceneAutoplayTimer = setInterval(() => {
      const nextIdx = (state.currentScene + 1) % HERO_SCENES.length;
      switchHeroScene(nextIdx);
    }, 9000);
  }

  function restartSceneAutoplay() {
    clearInterval(state.sceneAutoplayTimer);
    startSceneAutoplay();
  }

  /* ==========================================================================
     6. GSAP SCROLL PARALLAX CINEMATIC HERO (NATURAL CONTINUOUS SCROLL)
     ========================================================================== */

  function initHeroScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || state.reducedMotion) return;

    const heroSection = document.getElementById('heroSection');
    const performerStage = document.getElementById('performer3dStage');
    const rays = document.getElementById('heroVolumetricRays');
    const scrollIndicator = document.getElementById('heroScrollIndicator');

    if (!heroSection) return;

    // Subtle 3D Performer parallax depth without pinning or hiding text content
    if (performerStage) {
      gsap.to(performerStage, {
        y: 60,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Volumetric rays subtle parallax
    if (rays) {
      gsap.to(rays, {
        y: -40,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Scroll indicator gently fades out as user scrolls
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: 20,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '30% top',
          scrub: true
        }
      });
    }

    // Refresh ScrollTrigger once everything is mounted
    ScrollTrigger.refresh();
  }

  /* ==========================================================================
     7. PRELOADER & CINEMATIC STAGGERED ENTRANCE ANIMATION
     ========================================================================== */

  async function initializePreloader(onComplete) {
    const preloaderEl = document.getElementById('sitePreloader');
    const progressBar = document.getElementById('preloaderProgressBar');
    const counterText = document.getElementById('preloaderCounter');

    const heroImagesToPreload = [
      'assets/images/imgs/kathakali3.webp',
      'assets/images/imgs/kathakali2.webp',
      'assets/images/imgs/kathakali5.webp'
    ];

    let loaded = 0;
    const total = heroImagesToPreload.length;

    // Safety fallback timer (max 2.5s)
    const fallbackTimer = setTimeout(() => {
      finishPreloader();
    }, 2500);

    function updatePreloaderProgress(percent) {
      if (progressBar) progressBar.style.width = percent + '%';
      if (counterText) counterText.textContent = Math.round(percent) + '%';
    }

    function finishPreloader() {
      clearTimeout(fallbackTimer);
      updatePreloaderProgress(100);

      setTimeout(() => {
        if (preloaderEl) preloaderEl.classList.add('fade-out');
        document.body.classList.add('page-loaded');
        if (onComplete) onComplete();
      }, 350);
    }

    // Preload essential hero images in parallel
    const preloadPromises = heroImagesToPreload.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          updatePreloaderProgress((loaded / total) * 90);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          resolve();
        };
        img.src = src;
      });
    });

    await Promise.all(preloadPromises);
    finishPreloader();
  }

  function playHeroEntranceAnimation() {
    if (typeof gsap === 'undefined' || state.reducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge-wrap', {
      y: -20,
      opacity: 0,
      duration: 0.8
    })
    .from('.hero-headline-line', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1.0
    }, '-=0.5')
    .from('.hero-headline-ml', {
      y: 15,
      opacity: 0,
      duration: 0.7
    }, '-=0.6')
    .from('.hero-description', {
      y: 20,
      opacity: 0,
      duration: 0.85
    }, '-=0.5')
    .from('.hero-cta-group, .hero-scene-nav', {
      y: 20,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8
    }, '-=0.5')
    .from('#performer3dStage', {
      scale: 0.9,
      opacity: 0,
      duration: 1.3
    }, '-=1.0')
    .from('#heroVolumetricRays', {
      opacity: 0,
      scale: 0.85,
      duration: 1.8
    }, '-=1.2');
  }

  /* ==========================================================================
     REVEAL ANIMATIONS (Intersection Observer)
     ========================================================================== */

  function setupIntersectionReveals() {
    if (state.reducedMotion) return;

    const revealElements = document.querySelectorAll('.reveal-mask');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     CUSTOM CURSOR (Subtle, Desktop Only)
     ========================================================================== */

  function setupCustomCursor() {
    if (window.__ayroorCursorInitialized) return;
    if (!window.matchMedia('(pointer: fine)').matches || state.reducedMotion) {
      return;
    }

    const dot = document.getElementById('customCursor');
    const follower = document.getElementById('customCursorFollower');
    if (!dot || !follower) return;

    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        dot.style.opacity = '1';
        follower.style.opacity = '1';
        isVisible = true;
      }
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      follower.style.opacity = '0';
      isVisible = false;
    });

    // Lerp follower loop
    function updateCursor() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Hover effect over interactive elements
    const hoverSelectors = 'a, button, input, [role="button"], .culture-card, .cta-button';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelectors)) {
        dot.classList.add('active');
        follower.classList.add('active');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelectors)) {
        dot.classList.remove('active');
        follower.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     HEADER & NAVIGATION
     ========================================================================== */

  function setupNavigation() {
    // If dedicated AyroorNav system is active, it handles header scroll and mobile drawer
    if (window.AyroorNav) {
      return;
    }

    const header = document.getElementById('siteHeader');
    const mobileToggle = document.getElementById('mobileNavToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');

    // Header scroll background
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile nav toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileToggle.classList.toggle('open');
        mobileDrawer.classList.toggle('open', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on drawer link click
      mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileToggle.classList.remove('open');
          mobileDrawer.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on ESC
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          mobileToggle.classList.remove('open');
          mobileDrawer.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* ==========================================================================
     BACK TO TOP CONTROLLER (FLOATING WITH CIRCULAR PROGRESS & FOOTER PILL)
     ========================================================================== */

  function initBackToTop() {
    const floatingBtn = document.getElementById('floatingBackToTop');
    const footerBtn = document.getElementById('backToTopBtn');
    if (!floatingBtn && !footerBtn) return;

    const progressIndicator = floatingBtn ? floatingBtn.querySelector('.progress-ring-indicator') : null;
    const radius = 23;
    const circumference = 2 * Math.PI * radius; // ~144.513

    if (progressIndicator) {
      progressIndicator.style.strokeDasharray = circumference.toFixed(2);
      progressIndicator.style.strokeDashoffset = circumference.toFixed(2);
    }

    let isTicking = false;

    function updateScrollState() {
      const scrollY = window.lenis ? window.lenis.scroll : (window.scrollY || document.documentElement.scrollTop || 0);
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const maxScroll = Math.max(1, scrollHeight - clientHeight);

      if (floatingBtn) {
        if (scrollY > 280) {
          floatingBtn.classList.add('visible', 'is-visible');
        } else {
          floatingBtn.classList.remove('visible', 'is-visible');
        }

        if (progressIndicator) {
          const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
          const offset = circumference * (1 - progress);
          progressIndicator.style.strokeDashoffset = offset.toFixed(2);
        }
      }
      isTicking = false;
    }

    function requestScrollUpdate() {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updateScrollState);
      }
    }

    function scrollToTop(e) {
      if (e) e.preventDefault();
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    if (floatingBtn) {
      floatingBtn.addEventListener('click', scrollToTop);
    }

    if (footerBtn) {
      footerBtn.addEventListener('click', scrollToTop);
    }

    // Bind scroll listeners
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    if (window.lenis) {
      window.lenis.on('scroll', requestScrollUpdate);
    }

    // Initial update
    updateScrollState();
  }

  /* ==========================================================================
     MULTILINGUAL SWITCHER (EN / മലയാളം)
     ========================================================================== */

  function applyLanguage(lang) {
    state.currentLang = lang;
    localStorage.setItem('ayroor_lang', lang);

    document.documentElement.setAttribute('lang', lang);

    const langToggleBtn = document.getElementById('langToggleBtn');
    const mobileLangToggleBtn = document.getElementById('mobileLangToggleBtn');

    const labelHtml = (lang === 'ml')
      ? '<span class="lang-active">മലയാളം</span> / <span>EN</span>'
      : '<span>മലയാളം</span> / <span class="lang-active">EN</span>';
    if (langToggleBtn) langToggleBtn.innerHTML = labelHtml;
    if (mobileLangToggleBtn) mobileLangToggleBtn.innerHTML = labelHtml;

    // Update translated elements
    if (window.AyroorI18n && typeof window.AyroorI18n.updateDomTranslations === 'function') {
      window.AyroorI18n.updateDomTranslations();
    }

    const translatableElements = document.querySelectorAll('[data-i18n-key]');
    const dict = (CONFIG.i18n && CONFIG.i18n[lang]) || (CONFIG.i18n && CONFIG.i18n.en) || {};

    translatableElements.forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      if (dict && dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update navigation items
    const navLinks = document.querySelectorAll('[data-nav-id]');
    navLinks.forEach(link => {
      const id = link.getAttribute('data-nav-id');
      const item = CONFIG.navigation.find(n => n.id === id);
      if (item) {
        link.textContent = lang === 'ml' ? (item.labelMl || item.label) : item.label;
      }
    });

    // Refresh dynamic instruments carousel language
    if (typeof window.refreshInstrumentsLanguage === 'function') {
      window.refreshInstrumentsLanguage();
    }

    // Refresh dynamic navigation component if initialized
    if (window.AyroorNav && typeof window.AyroorNav.refresh === 'function') {
      window.AyroorNav.refresh();
    }
  }

  // Export applyLanguage to window for navigation system synchronization
  window.applyLanguage = applyLanguage;

  function setupLanguageSwitcher() {
    const langToggleBtn = document.getElementById('langToggleBtn');
    const mobileLangToggleBtn = document.getElementById('mobileLangToggleBtn');

    function toggle() {
      const nextLang = state.currentLang === 'en' ? 'ml' : 'en';
      applyLanguage(nextLang);
    }

    if (langToggleBtn) langToggleBtn.addEventListener('click', toggle);
    if (mobileLangToggleBtn) mobileLangToggleBtn.addEventListener('click', toggle);

    // Initial language application
    applyLanguage(state.currentLang);
  }

  /* ==========================================================================
     MUDRA SLIDER CONTROLLER
     ========================================================================== */

  function initMudraSlider() {
    const slider = document.getElementById('mudraSlider');
    const track = document.getElementById('mudraSliderTrack');
    const viewport = document.getElementById('mudraSliderViewport');
    if (!slider || !track || !viewport) return;

    const slides = Array.from(track.querySelectorAll('.mudra-slide'));
    if (slides.length === 0) return;

    const prevBtn = document.getElementById('mudraPrevBtn');
    const nextBtn = document.getElementById('mudraNextBtn');
    const playPauseBtn = document.getElementById('mudraPlayPauseBtn');
    const pauseIcon = document.getElementById('mudraPauseIcon');
    const playIcon = document.getElementById('mudraPlayIcon');
    const currentNumEl = document.getElementById('mudraCurrentNum');
    const progressBar = document.getElementById('mudraProgressBar');
    const ribbonTabs = Array.from(document.querySelectorAll('.mudra-tab-btn'));

    let currentIndex = 0;
    const totalSlides = slides.length;
    let isPlaying = true;
    const slideDuration = 6000; // 6 seconds per slide
    let progressStartTime = null;
    let progressAnimFrame = null;

    function updateSlide(newIndex, animate = true) {
      if (newIndex < 0) {
        newIndex = totalSlides - 1;
      } else if (newIndex >= totalSlides) {
        newIndex = 0;
      }
      currentIndex = newIndex;

      // Update track translation
      track.style.transition = animate ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update slide active states
      slides.forEach((slide, idx) => {
        const isActive = idx === currentIndex;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      // Update counter
      if (currentNumEl) {
        currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
      }

      // Update ribbon buttons
      ribbonTabs.forEach((tab, idx) => {
        const isActive = idx === currentIndex;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Keep active tab visible in ribbon horizontally without scrolling the browser page
      const ribbonContainer = document.getElementById('mudraRibbon');
      const activeTab = ribbonTabs[currentIndex];
      if (ribbonContainer && activeTab && ribbonContainer.scrollWidth > ribbonContainer.clientWidth) {
        const cRect = ribbonContainer.getBoundingClientRect();
        const tRect = activeTab.getBoundingClientRect();
        const scrollDelta = (tRect.left - cRect.left) - (cRect.width / 2) + (tRect.width / 2);
        ribbonContainer.scrollBy({ left: scrollDelta, behavior: 'smooth' });
      }

      // Reset and restart autoplay animation
      resetAutoplay();
    }

    function stepProgress(timestamp) {
      if (!isPlaying) return;
      if (!progressStartTime) progressStartTime = timestamp;
      const elapsed = timestamp - progressStartTime;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);

      if (progressBar) {
        progressBar.style.width = pct + '%';
      }

      if (elapsed < slideDuration) {
        progressAnimFrame = requestAnimationFrame(stepProgress);
      } else {
        updateSlide(currentIndex + 1);
      }
    }

    function startProgress() {
      if (!isPlaying) return;
      cancelAnimationFrame(progressAnimFrame);
      progressStartTime = null;
      progressAnimFrame = requestAnimationFrame(stepProgress);
    }

    function pauseProgress() {
      cancelAnimationFrame(progressAnimFrame);
      progressStartTime = null;
    }

    function resetAutoplay() {
      pauseProgress();
      if (progressBar) {
        progressBar.style.width = '0%';
      }
      if (isPlaying) {
        startProgress();
      }
    }

    function setPlayingState(playing) {
      isPlaying = playing;
      if (isPlaying) {
        if (pauseIcon) pauseIcon.style.display = 'block';
        if (playIcon) playIcon.style.display = 'none';
        if (playPauseBtn) playPauseBtn.setAttribute('aria-label', 'Pause Auto-advance');
        startProgress();
      } else {
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'block';
        if (playPauseBtn) playPauseBtn.setAttribute('aria-label', 'Play Slideshow');
        pauseProgress();
      }
    }

    // Button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
    }
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => setPlayingState(!isPlaying));
    }

    // Ribbon tab buttons
    ribbonTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-slide-index'), 10);
        if (!isNaN(idx)) {
          updateSlide(idx);
        }
      });
    });

    // Pause on hover and focus
    slider.addEventListener('mouseenter', () => {
      if (isPlaying) pauseProgress();
    });
    slider.addEventListener('mouseleave', () => {
      if (isPlaying) startProgress();
    });
    slider.addEventListener('focusin', () => {
      if (isPlaying) pauseProgress();
    });
    slider.addEventListener('focusout', () => {
      if (isPlaying) startProgress();
    });

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateSlide(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateSlide(currentIndex + 1);
      }
    });

    // Touch & Swipe gestures
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isSwiping = false;

    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX;
        isSwiping = true;
        if (isPlaying) pauseProgress();
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (!isSwiping || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = touchStartX - currentX;
      const diffY = touchStartY - currentY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        touchEndX = currentX;
      }
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = touchStartX - touchEndX;
      const threshold = 40;
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          updateSlide(currentIndex + 1);
        } else {
          updateSlide(currentIndex - 1);
        }
      } else if (isPlaying) {
        startProgress();
      }
      touchStartX = 0;
      touchEndX = 0;
    });

    // Initial setup
    updateSlide(0, false);
    if (isPlaying) {
      startProgress();
    }
  }

  /* ==========================================================================
     AYROOR 2027 PROGRAM STACKED-CARDS-CAROUSEL CONTROLLER
     ========================================================================== */

  function initStackedCardsCarousel() {
    const carousel = document.getElementById('stackedCardsCarousel');
    const list = document.getElementById('stackedCardsList');
    if (!carousel || !list) return;

    const cards = Array.from(list.querySelectorAll('.stacked-card-item'));
    if (cards.length === 0) return;

    const pills = Array.from(document.querySelectorAll('.day-pill-btn'));
    const prevBtn = document.getElementById('programPrevBtn');
    const nextBtn = document.getElementById('programNextBtn');
    const currentDayEl = document.getElementById('programCurrentDay');

    let currentIndex = 0;
    const totalCards = cards.length;

    function adjustContainerHeight() {
      let maxH = 0;
      cards.forEach((card) => {
        const box = card.querySelector('.stacked-card-box') || card;
        if (box && box.offsetHeight > maxH) {
          maxH = box.offsetHeight;
        }
      });
      if (maxH > 0) {
        const finalH = Math.max(maxH + 30, 680);
        carousel.style.minHeight = finalH + 'px';
        list.style.minHeight = finalH + 'px';
      }
    }

    function updateCards(targetIdx, animate = true) {
      if (targetIdx < 0) targetIdx = totalCards - 1;
      if (targetIdx >= totalCards) targetIdx = 0;
      currentIndex = targetIdx;

      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      const spacingX = isMobile ? 32 : (isTablet ? 65 : 95);
      const spacingY = isMobile ? 6 : 10;
      const rotateStep = isMobile ? 2 : 3.5;

      cards.forEach((card, i) => {
        let offset = i - currentIndex;
        if (offset > totalCards / 2) offset -= totalCards;
        if (offset < -totalCards / 2) offset += totalCards;

        card.style.transition = animate ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s var(--ease-primary), filter 0.65s var(--ease-primary), box-shadow 0.65s var(--ease-primary)' : 'none';

        if (offset === 0) {
          // Center active card
          card.style.transform = 'translate(-50%, 0) scale(1) rotate(0deg)';
          card.style.zIndex = 25;
          card.style.opacity = '1';
          card.style.filter = 'brightness(1) contrast(1)';
          card.style.pointerEvents = 'auto';
          card.style.visibility = 'visible';
          card.classList.add('is-active');
          card.classList.remove('is-side', 'is-hidden');
          card.setAttribute('aria-hidden', 'false');
        } else {
          const absOffset = Math.abs(offset);
          if (absOffset <= 3) {
            const scale = Math.max(0.72, 1 - absOffset * 0.08);
            const transX = offset * spacingX;
            const transY = absOffset * spacingY;
            const rotZ = offset * rotateStep;
            const opacity = Math.max(0.3, 1 - absOffset * 0.22);
            const zIndex = 20 - absOffset * 3;

            card.style.transform = `translate(calc(-50% + ${transX}px), ${transY}px) scale(${scale}) rotate(${rotZ}deg)`;
            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.style.filter = `brightness(${0.88 - absOffset * 0.12}) contrast(0.95)`;
            card.style.pointerEvents = absOffset <= 2 ? 'auto' : 'none';
            card.style.visibility = 'visible';
            card.classList.add('is-side');
            card.classList.remove('is-active', 'is-hidden');
            card.setAttribute('aria-hidden', 'true');
          } else {
            card.style.transform = 'translate(-50%, 30px) scale(0.68) rotate(0deg)';
            card.style.zIndex = 1;
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
            card.style.visibility = 'hidden';
            card.classList.add('is-hidden');
            card.classList.remove('is-active', 'is-side');
            card.setAttribute('aria-hidden', 'true');
          }
        }
      });

      // Update counter
      if (currentDayEl) {
        currentDayEl.textContent = 'DAY ' + String(currentIndex + 1).padStart(2, '0');
      }

      // Synchronize section background atmosphere with active day performance artwork
      const backdropImage = document.getElementById('programBackdropImage');
      const activeCard = cards[currentIndex];
      if (backdropImage && activeCard) {
        const activeImg = activeCard.querySelector('.stacked-card-image-wrap img');
        if (activeImg) {
          const imgSrc = activeImg.getAttribute('src') || activeImg.src;
          if (imgSrc) {
            backdropImage.style.backgroundImage = `url('${imgSrc}')`;
          }
        }
      }

      // Update pills
      pills.forEach((pill, idx) => {
        const isActive = idx === currentIndex;
        pill.classList.toggle('active', isActive);
        pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Keep active pill visible horizontally within the nav pills bar WITHOUT scrolling the page
      const pillsContainer = document.getElementById('programDaysPills');
      const activePill = pills[currentIndex];
      if (pillsContainer && activePill && pillsContainer.scrollWidth > pillsContainer.clientWidth) {
        const cRect = pillsContainer.getBoundingClientRect();
        const pRect = activePill.getBoundingClientRect();
        const scrollDelta = (pRect.left - cRect.left) - (cRect.width / 2) + (pRect.width / 2);
        pillsContainer.scrollBy({ left: scrollDelta, behavior: 'smooth' });
      }

      // Adjust height
      adjustContainerHeight();
    }

    // Prev / Next button listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCards(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCards(currentIndex + 1);
      });
    }

    // Day pills click
    pills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(pill.getAttribute('data-day-index'), 10);
        if (!isNaN(idx)) {
          updateCards(idx);
        }
      });
    });

    // Clicking any stacked card directly brings it to center
    cards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(idx) && idx !== currentIndex) {
          updateCards(idx);
        }
      });
    });

    // Keyboard navigation (Left / Right Arrow)
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateCards(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateCards(currentIndex + 1);
      }
    });

    // Touch & Swipe gestures
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isSwiping = false;

    carousel.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchEndX = touchStartX;
        isSwiping = true;
      }
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
      if (!isSwiping || e.touches.length !== 1) return;
      const curX = e.touches[0].clientX;
      const curY = e.touches[0].clientY;
      const diffX = touchStartX - curX;
      const diffY = touchStartY - curY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        touchEndX = curX;
      }
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = touchStartX - touchEndX;
      const threshold = 40;
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          updateCards(currentIndex + 1);
        } else {
          updateCards(currentIndex - 1);
        }
      }
      touchStartX = 0;
      touchEndX = 0;
    });

    window.addEventListener('resize', () => {
      updateCards(currentIndex, false);
    }, { passive: true });

    // Initial draw
    updateCards(0, false);
    setTimeout(adjustContainerHeight, 200);
  }

  /* ==========================================================================
     YOUTUBE LIVE STREAM CONTROLLER
     ========================================================================== */

  function normalizeYouTubeEmbedUrl(rawUrl) {
    if (!rawUrl) return '';
    let videoId = '';
    const youtuMatch = rawUrl.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    const watchMatch = rawUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    const embedMatch = rawUrl.match(/\/embed\/([a-zA-Z0-9_-]+)/);

    if (youtuMatch) {
      videoId = youtuMatch[1];
    } else if (watchMatch) {
      videoId = watchMatch[1];
    } else if (embedMatch) {
      videoId = embedMatch[1];
    }

    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`;
    }
    return rawUrl;
  }

  function initLiveStreamController() {
    const section = document.getElementById('liveStreamSection');
    if (!section) return;

    const iframe = document.getElementById('liveStreamIframe');
    const feedCards = Array.from(section.querySelectorAll('.live-feed-card'));
    const feedLabelEl = document.getElementById('currentFeedLabel');
    const feedTitleEl = document.getElementById('currentFeedTitle');

    if (!iframe || feedCards.length === 0) return;

    // Ensure initial iframe URL is clean and normalized
    if (iframe.src) {
      iframe.src = normalizeYouTubeEmbedUrl(iframe.src);
    }

    function updatePlayerMeta(card) {
      if (!card) return;
      const curLang = (typeof window !== 'undefined' && window.AyroorI18n && typeof window.AyroorI18n.getLanguage === 'function')
        ? window.AyroorI18n.getLanguage()
        : (document.documentElement.lang || 'en');
      const isMl = curLang === 'ml';

      const label = isMl 
        ? (card.getAttribute('data-feed-label-ml') || card.getAttribute('data-feed-label'))
        : card.getAttribute('data-feed-label');
      const title = isMl 
        ? (card.getAttribute('data-feed-title-ml') || card.getAttribute('data-feed-title'))
        : card.getAttribute('data-feed-title');

      if (feedLabelEl && label) feedLabelEl.textContent = label;
      if (feedTitleEl && title) feedTitleEl.textContent = title;
    }

    feedCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active class
        feedCards.forEach(c => {
          const isActive = c === card;
          c.classList.toggle('active', isActive);
          c.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update video URL with normalization
        const rawUrl = card.getAttribute('data-video-url');
        const cleanUrl = normalizeYouTubeEmbedUrl(rawUrl);
        if (cleanUrl && iframe.src !== cleanUrl) {
          iframe.src = cleanUrl;
        }

        // Update labels
        updatePlayerMeta(card);
      });
    });

    // Re-sync player meta on language toggle
    window.addEventListener('ayroor:languageChanged', () => {
      const activeCard = section.querySelector('.live-feed-card.active') || feedCards[0];
      updatePlayerMeta(activeCard);
    });
  }

  /* ==========================================================================
     SACRED INSTRUMENTS SHOWCASE SLIDER (DRIBBLE MORPHING EXPANDING CONTROLLER)
     ========================================================================== */

  function initInstrumentsCarousel() {
    const section = document.getElementById('instrumentsSection');
    if (!section || !CONFIG.instruments || CONFIG.instruments.length === 0) return;

    const instruments = CONFIG.instruments;
    const track = document.getElementById('instrumentsSliderTrack');
    const viewport = document.getElementById('instrumentsSliderViewport');
    const cards = Array.from(section.querySelectorAll('.instrument-slide-card'));
    const dots = Array.from(section.querySelectorAll('.instruments-dot'));
    const currentIdxEl = document.getElementById('instrumentsCurrentIdx');
    const ringPrev = document.getElementById('instrumentsRingPrev');
    const ringNext = document.getElementById('instrumentsRingNext');
    const backdrop = document.getElementById('instrumentsAmbientBackdrop');
    const prevBtn = document.getElementById('instrumentsPrevBtn');
    const nextBtn = document.getElementById('instrumentsNextBtn');
    const autoplayBtn = document.getElementById('instrumentsAutoplayBtn');
    const autoplayLabel = document.getElementById('instrumentsAutoplayLabel');
    const modal = document.getElementById('instrumentsModal');
    const modalOverlay = document.getElementById('instrumentsModalOverlay');
    const modalClose = document.getElementById('instrumentsModalClose');
    const modalContent = document.getElementById('instrumentsModalContent');

    let currentIndex = 0;
    let progressTimer = null;
    let isPaused = false;
    let isModalOpen = false;
    const AUTOPLAY_INTERVAL = 6800;
    let progressStartTime = 0;

    // Ambient backdrops matching the four instruments
    const ambientGradients = [
      'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(197, 160, 89, 0.22) 0%, rgba(220, 38, 38, 0.09) 55%, transparent 100%)',
      'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(234, 88, 12, 0.18) 0%, rgba(21, 128, 61, 0.12) 55%, transparent 100%)',
      'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(217, 119, 6, 0.22) 0%, rgba(229, 193, 88, 0.12) 55%, transparent 100%)',
      'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.1) 55%, transparent 100%)'
    ];

    function updateCardLanguage() {
      const isMl = state.currentLang === 'ml';
      cards.forEach((card, i) => {
        const item = instruments[i];
        if (!item) return;

        const badgeEl = card.querySelector('[data-role="badge"]');
        const taglineEl = card.querySelector('[data-role="tagline"]');
        const descEl = card.querySelector('[data-role="desc"]');
        const readMoreBtn = card.querySelector('.btn-label');
        const img = card.querySelector('.slide-img');

        if (badgeEl) badgeEl.textContent = isMl ? item.roleBadgeMl : item.roleBadgeEn;
        if (taglineEl) taglineEl.textContent = isMl ? item.taglineMl : item.taglineEn;
        if (descEl) descEl.textContent = isMl ? item.descMl : item.descEn;
        if (readMoreBtn) readMoreBtn.textContent = isMl ? 'വിശദാംശങ്ങൾ' : 'Read more';
        if (img) img.alt = isMl ? item.altMl : item.altEn;
      });
    }

    function updateSliderLayout() {
      if (!viewport || !track || cards.length === 0) return;

      const activeCard = cards[currentIndex];
      if (!activeCard) return;

      const viewportWidth = viewport.clientWidth;
      const cardOffset = activeCard.offsetLeft;
      const activeWidth = activeCard.offsetWidth;

      // Position active card with leading context
      let desiredLeft = 24;
      if (viewportWidth > 860) {
        if (currentIndex === 0) {
          desiredLeft = 28;
        } else if (currentIndex === cards.length - 1) {
          desiredLeft = Math.max(30, viewportWidth - activeWidth - 28);
        } else {
          desiredLeft = Math.min(240, Math.max(30, (viewportWidth - activeWidth) * 0.38));
        }
      } else if (viewportWidth > 540) {
        desiredLeft = currentIndex === 0 ? 20 : (currentIndex === cards.length - 1 ? Math.max(20, viewportWidth - activeWidth - 20) : 36);
      } else {
        desiredLeft = currentIndex === 0 ? 12 : 18;
      }

      let targetX = -(cardOffset - desiredLeft);
      const maxScroll = -(track.scrollWidth - viewportWidth);
      if (maxScroll < 0) {
        targetX = Math.max(maxScroll, Math.min(0, targetX));
      }

      track.style.transform = `translate3d(${targetX}px, 0, 0)`;

      // Position Prev Ring (left seam of active card)
      if (ringPrev) {
        if (currentIndex > 0) {
          ringPrev.classList.remove('is-hidden');
          const seamLeft = targetX + cardOffset - 14;
          const clampedLeft = Math.max(38, Math.min(viewportWidth - 38, seamLeft));
          ringPrev.style.left = `${clampedLeft}px`;
        } else {
          ringPrev.classList.add('is-hidden');
        }
      }

      // Position Next Ring (right seam of active card, always clamped inside viewport)
      if (ringNext) {
        const seamRight = targetX + cardOffset + activeWidth + 14;
        const clampedRight = Math.max(38, Math.min(viewportWidth - 38, seamRight));
        ringNext.style.left = `${clampedRight}px`;

        const isLast = currentIndex === cards.length - 1;
        const arrow = ringNext.querySelector('.ring-arrow');
        if (arrow) {
          arrow.style.transform = isLast ? 'rotate(180deg)' : 'rotate(0deg)';
        }
        ringNext.setAttribute('aria-label', isLast ? 'Return to First Instrument' : 'Next Instrument Slide');
      }
    }

    let layoutAnimId = null;
    function animateSliderLayout() {
      cancelAnimationFrame(layoutAnimId);
      const startTime = performance.now();
      const duration = 720; // continuously update throughout CSS width transition

      function tick(now) {
        updateSliderLayout();
        if (now - startTime < duration) {
          layoutAnimId = requestAnimationFrame(tick);
        } else {
          updateSliderLayout();
        }
      }
      layoutAnimId = requestAnimationFrame(tick);
    }

    function renderSlide(idx, animate = true) {
      currentIndex = (idx + instruments.length) % instruments.length;
      section.setAttribute('data-active-instrument', currentIndex);

      // Toggle active states on cards
      cards.forEach((card, i) => {
        const isActive = i === currentIndex;
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          card.removeAttribute('tabindex');
        } else {
          card.setAttribute('tabindex', '0');
        }
      });

      // Update counter
      if (currentIdxEl) {
        currentIdxEl.textContent = String(currentIndex + 1).padStart(2, '0');
      }

      // Update dots pagination
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        const progress = dot.querySelector('.dot-progress');
        if (progress) {
          progress.style.width = isActive ? '0%' : '0%';
        }
      });

      // Update dynamic backdrop ambient aura
      if (backdrop && ambientGradients[currentIndex]) {
        backdrop.style.background = ambientGradients[currentIndex];
      }

      // Smoothly animate track and rings throughout card expansion
      if (animate) {
        animateSliderLayout();
      } else {
        updateSliderLayout();
      }

      resetAutoplayProgress();
    }

    function resetAutoplayProgress() {
      cancelAnimationFrame(progressTimer);
      if (isPaused || isModalOpen) return;

      const activeDot = dots[currentIndex];
      const activeProgressBar = activeDot ? activeDot.querySelector('.dot-progress') : null;
      if (!activeProgressBar) return;

      progressStartTime = performance.now();

      function step(now) {
        if (isPaused || isModalOpen) return;
        const elapsed = now - progressStartTime;
        const pct = Math.min(100, (elapsed / AUTOPLAY_INTERVAL) * 100);
        activeProgressBar.style.width = pct + '%';

        if (elapsed < AUTOPLAY_INTERVAL) {
          progressTimer = requestAnimationFrame(step);
        } else {
          goToNext();
        }
      }
      progressTimer = requestAnimationFrame(step);
    }

    function goToIndex(idx) {
      renderSlide(idx, true);
    }

    function goToNext() {
      goToIndex(currentIndex + 1);
    }

    function goToPrev() {
      goToIndex(currentIndex - 1);
    }

    // Modal Details Popup
    function openInstrumentDetail(idx) {
      const item = instruments[idx];
      if (!item || !modalContent || !modal) return;

      isModalOpen = true;
      cancelAnimationFrame(progressTimer);

      const isMl = state.currentLang === 'ml';
      const badgeClass = idx === 0 ? 'badge-asura' : idx === 1 ? 'badge-deva' : idx === 2 ? 'badge-ghana' : 'badge-sopana';

      modalContent.innerHTML = `
        <div class="modal-hero-banner">
          <img src="${item.imageWebp || item.imagePng}" alt="${isMl ? item.altMl : item.altEn}" class="modal-hero-img" loading="eager">
        </div>
        <div class="modal-header-lockup">
          <div class="modal-badge-row">
            <span class="modal-badge ${badgeClass}">${isMl ? item.roleBadgeMl : item.roleBadgeEn}</span>
            <span class="modal-category-text">${isMl ? item.categoryMl : item.categoryEn}</span>
          </div>
          <div class="modal-title-row">
            <h3 class="modal-title-en" id="instrumentsModalTitle">${item.nameEn}</h3>
            <span class="modal-title-ml">${item.nameMl}</span>
          </div>
          <p class="modal-tagline">${isMl ? item.taglineMl : item.taglineEn}</p>
        </div>
        <div class="modal-narrative">
          <p>${isMl ? item.descMl : item.descEn}</p>
        </div>
        <div class="modal-specs-grid">
          <div class="modal-spec-col">
            <span class="modal-spec-label">${isMl ? 'രംഗ ധർമ്മം' : 'Stage Role'}</span>
            <span class="modal-spec-val">${isMl ? item.roleMl : item.roleEn}</span>
          </div>
          <div class="modal-spec-col">
            <span class="modal-spec-label">${isMl ? 'നിർമ്മാണം' : 'Craftsmanship'}</span>
            <span class="modal-spec-val">${isMl ? item.materialMl : item.materialEn}</span>
          </div>
          <div class="modal-spec-col">
            <span class="modal-spec-label">${isMl ? 'പ്രധാന താളങ്ങൾ' : 'Core Talas'}</span>
            <span class="modal-spec-val">${isMl ? item.rhythmMl : item.rhythmEn}</span>
          </div>
        </div>
        <blockquote class="modal-quote">
          ${isMl ? item.quoteMl : item.quoteEn}
        </blockquote>
      `;

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (modalClose) modalClose.focus();
    }

    function closeInstrumentDetail() {
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      isModalOpen = false;
      resetAutoplayProgress();
    }

    // Attach Click and Drag Listeners to Cards
    cards.forEach((card, idx) => {
      // Inactive card click expands that card
      card.addEventListener('click', (e) => {
        // If clicking the read-more button, let that handler process
        if (e.target.closest('[data-action="open-detail"]')) {
          return;
        }
        if (idx !== currentIndex) {
          e.preventDefault();
          goToIndex(idx);
        }
      });

      card.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && idx !== currentIndex) {
          e.preventDefault();
          goToIndex(idx);
        }
      });

      // Read more button
      const readMoreBtn = card.querySelector('[data-action="open-detail"]');
      if (readMoreBtn) {
        readMoreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openInstrumentDetail(idx);
        });
      }
    });

    // Floating Ring clicks
    if (ringPrev) {
      ringPrev.addEventListener('click', (e) => {
        e.preventDefault();
        goToPrev();
      });
    }

    if (ringNext) {
      ringNext.addEventListener('click', (e) => {
        e.preventDefault();
        goToNext();
      });
    }

    // Prev / Next buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToPrev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToNext();
      });
    }

    // Dots pagination clicks
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToIndex(idx);
      });
    });

    // Autoplay toggle
    if (autoplayBtn) {
      autoplayBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isPaused = !isPaused;
        autoplayBtn.classList.toggle('paused', isPaused);
        if (autoplayLabel) {
          autoplayLabel.textContent = isPaused ? 'PAUSED' : 'AUTO';
        }
        if (!isPaused) {
          resetAutoplayProgress();
        } else {
          cancelAnimationFrame(progressTimer);
        }
      });
    }

    // Pause on hover
    if (viewport) {
      viewport.addEventListener('mouseenter', () => {
        if (!autoplayBtn || !autoplayBtn.classList.contains('paused')) {
          isPaused = true;
          cancelAnimationFrame(progressTimer);
        }
      });

      viewport.addEventListener('mouseleave', () => {
        if (!isModalOpen && (!autoplayBtn || !autoplayBtn.classList.contains('paused'))) {
          isPaused = false;
          resetAutoplayProgress();
        }
      });
    }

    // Touch & Pointer Drag Gestures
    let isDragging = false;
    let dragStartX = 0;
    let dragDeltaX = 0;

    function onPointerDown(clientX) {
      isDragging = true;
      dragStartX = clientX;
      dragDeltaX = 0;
      isPaused = true;
      cancelAnimationFrame(progressTimer);
    }

    function onPointerMove(clientX) {
      if (!isDragging) return;
      dragDeltaX = clientX - dragStartX;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;

      if (Math.abs(dragDeltaX) > 45) {
        if (dragDeltaX < 0) {
          goToNext();
        } else {
          goToPrev();
        }
      } else {
        if (!isModalOpen && (!autoplayBtn || !autoplayBtn.classList.contains('paused'))) {
          isPaused = false;
          resetAutoplayProgress();
        }
      }
      dragDeltaX = 0;
    }

    // Touch events on track
    if (track) {
      track.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) onPointerDown(e.touches[0].clientX);
      }, { passive: true });

      track.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) onPointerMove(e.touches[0].clientX);
      }, { passive: true });

      track.addEventListener('touchend', () => {
        onPointerUp();
      }, { passive: true });

      // Mouse drag events on track
      track.addEventListener('mousedown', (e) => {
        // Only left mouse click
        if (e.button === 0) {
          onPointerDown(e.clientX);
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (isDragging) onPointerMove(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) onPointerUp();
      });
    }

    // Keyboard Arrow Navigation
    section.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    });

    // Modal Close Events
    if (modalClose) {
      modalClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeInstrumentDetail();
      });
    }

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        closeInstrumentDetail();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeInstrumentDetail();
      }
    });

    // Resize recalculation
    let resizeDebounce = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(updateSliderLayout, 100);
    });

    // Expose language refresh hook
    window.refreshInstrumentsLanguage = () => {
      updateCardLanguage();
      if (isModalOpen) {
        openInstrumentDetail(currentIndex);
      }
    };

    // Initial setup
    updateCardLanguage();
    renderSlide(0, false);
  }

  /* ==========================================================================
     INITIALIZATION BOOTSTRAP
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup global UI
    setupNavigation();
    setupLanguageSwitcher();
    setupCustomCursor();
    setupIntersectionReveals();

    // 2. Initialize Mudras Slider
    initMudraSlider();

    // 3. Initialize Stacked Cards Carousel
    initStackedCardsCarousel();

    // 4. Initialize YouTube Live Stream Webcast
    initLiveStreamController();

    // 5. Initialize Sacred Instruments Showcase Slider
    initInstrumentsCarousel();

    // 6. Initialize Lenis Smooth Scrolling & Back To Top
    initLenisSmoothScroll();
    initBackToTop();

    // 7. Initialize Hero Particle Canvas & Mouse 3D Interactions
    window.heroParticleSystem = new HeroParticleSystem('heroParticleCanvas');
    initHeroParallax();
    initMagneticButtons();
    initHeroSceneSwitcher();

    // 8. Start preloader & entrance animation
    initializePreloader(() => {
      playHeroEntranceAnimation();
      initHeroScroll();
    });
  });

})();

