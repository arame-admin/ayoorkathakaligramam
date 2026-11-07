/**
 * Advanced Scroll Storytelling & Motion Engine
 * Powered by Lenis Smooth Scroll and GSAP ScrollTrigger
 * 
 * Implements:
 * - Expanding image containers into full-screen visuals (reference animation)
 * - Clipping mask transitions
 * - Split typography & word-by-word masked reveals
 * - Pinned storytelling sequences
 * - Multi-layered parallax depth
 * - Respects prefers-reduced-motion
 */

export class ScrollEngine {
  constructor(heroScene3D) {
    this.hero3D = heroScene3D;
    this.lenis = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initLenis();
    this.registerGSAP();
    this.initTypographySplits();
    this.initHeaderTransitions();
    this.initPortalHeroAnimation();
    this.initWorldKathakaliStorytelling();
    this.initHeritageHorizontalScroll();
    this.initMelaFestivalCinematic();
    this.initParallaxLayers();
    this.initCounterAnimations();
  }

  initLenis() {
    if (this.reducedMotion) return;

    const LenisClass = window.Lenis;
    if (typeof LenisClass !== 'undefined') {
      this.lenis = new LenisClass({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        infinite: false
      });

      if (window.ScrollTrigger) {
        this.lenis.on('scroll', () => window.ScrollTrigger.update());
        window.gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      }
    }
  }

  registerGSAP() {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }

  initTypographySplits() {
    const splitTargets = document.querySelectorAll('[data-split-words]');
    splitTargets.forEach((el) => {
      const text = el.innerText.trim();
      if (!text) return;
      const words = text.split(/\s+/);
      el.innerHTML = words.map(word => `<span class="word-mask"><span class="word-inner">${word}</span></span>`).join(' ');
    });
  }

  initHeaderTransitions() {
    const header = document.querySelector('.site-header');
    if (!header || !window.ScrollTrigger) return;

    window.ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 120) {
          header.classList.add('header-scrolled');
        } else if (self.scroll() <= 120) {
          header.classList.remove('header-scrolled');
        }
      }
    });
  }

  initPortalHeroAnimation() {
    const heroSection = document.querySelector('#hero-section');
    const heroTypography = document.querySelector('#hero-monumental-typography');
    const eyebrowBadge = document.querySelector('.hero-eyebrow-badge');
    const leftFlank = document.querySelector('.hero-mono-flank--left');
    const rightFlank = document.querySelector('.hero-mono-flank--right');
    const masterWrap = document.querySelector('.hero-master-wrap');
    const stageLight = document.querySelector('.stage-ambient-light');
    const heroDock = document.querySelector('#hero-bottom-dock');
    const manifestoLayer = document.querySelector('#portal-expanded-manifesto');
    const manifestoBadge = document.querySelector('.manifesto-pill-badge');
    const manifestoHeading = document.querySelector('.portal-manifesto-heading');
    const manifestoText = document.querySelector('.portal-manifesto-text');
    const statsCards = document.querySelectorAll('.portal-stat-card');
    const ctaAction = document.querySelector('.portal-cta-action');

    if (!heroSection || !masterWrap || !window.gsap) return;

    // Mouse-based subtle 3D tilt on the cutout
    if (!this.reducedMotion) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        window.gsap.to(masterWrap, {
          x: x * 18,
          y: y * 12,
          rotationY: x * 4.5,
          rotationX: -y * 2.5,
          duration: 1.2,
          ease: 'power2.out'
        });
      }, { passive: true });
    }

    if (this.reducedMotion) {
      if (manifestoLayer) {
        manifestoLayer.style.opacity = '1';
        manifestoLayer.style.pointerEvents = 'auto';
      }
      if (leftFlank) leftFlank.style.display = 'none';
      if (rightFlank) rightFlank.style.display = 'none';
      return;
    }

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (this.hero3D && typeof this.hero3D.updateScroll === 'function') {
            this.hero3D.updateScroll(self.progress);
          }
        }
      }
    });

    // 0. Bottom Dock & Eyebrow fade out smoothly
    if (heroDock) {
      tl.to(heroDock, {
        y: 40,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.22
      }, 0);
    }

    if (eyebrowBadge) {
      tl.to(eyebrowBadge, {
        y: -30,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.2
      }, 0);
    }

    // 1. Monumental Flanking typography slides outward & dissolves
    if (leftFlank) {
      tl.to(leftFlank, {
        xPercent: -35,
        opacity: 0,
        scale: 0.94,
        ease: 'power2.inOut',
        duration: 0.28
      }, 0);
    }

    if (rightFlank) {
      tl.to(rightFlank, {
        xPercent: 35,
        opacity: 0,
        scale: 0.94,
        ease: 'power2.inOut',
        duration: 0.28
      }, 0);
    }

    // 2. Cutout Zoom in theatrical space (smooth cinematic scale)
    tl.to(masterWrap, {
      scale: 1.34,
      y: -25,
      opacity: 0.18,
      filter: 'blur(4px) drop-shadow(0 40px 90px rgba(0,0,0,1))',
      ease: 'power2.inOut',
      duration: 0.58
    }, 0);

    if (stageLight) {
      tl.to(stageLight, {
        scale: 1.35,
        opacity: 0.28,
        ease: 'power2.inOut',
        duration: 0.55
      }, 0);
    }

    // 3. Manifesto Reveal inside the expanded stage
    if (manifestoLayer) {
      tl.to(manifestoLayer, {
        opacity: 1,
        pointerEvents: 'auto',
        ease: 'power2.out',
        duration: 0.24
      }, 0.22);
    }

    if (manifestoBadge) {
      tl.fromTo(manifestoBadge, {
        y: 25,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        duration: 0.18
      }, 0.25);
    }

    if (manifestoHeading) {
      tl.fromTo(manifestoHeading, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        duration: 0.20
      }, 0.28);
    }

    if (manifestoText) {
      tl.fromTo(manifestoText, {
        y: 25,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        duration: 0.20
      }, 0.31);
    }

    if (statsCards.length > 0) {
      tl.fromTo(statsCards, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        ease: 'power2.out',
        duration: 0.20
      }, 0.34);
    }

    if (ctaAction) {
      tl.fromTo(ctaAction, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        duration: 0.20
      }, 0.38);
    }

    // 4. Generous hold for visitor to absorb the manifesto
    tl.to({}, { duration: 0.35 });
  }

  initWorldKathakaliStorytelling() {
    const worldSec = document.querySelector('#world-of-kathakali');
    const slides = document.querySelectorAll('.pillar-story-slide');
    const indicators = document.querySelectorAll('.pillar-nav-item');

    if (!worldSec || slides.length === 0 || !window.gsap) return;

    if (this.reducedMotion) {
      slides.forEach(s => s.classList.add('active'));
      return;
    }

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: worldSec,
        start: 'top top',
        end: `+=${slides.length * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            slides.length - 1,
            Math.floor(self.progress * slides.length)
          );
          indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === stepIndex);
          });
        }
      }
    });

    slides.forEach((slide, i) => {
      if (i > 0) {
        const prevSlide = slides[i - 1];
        const currContent = slide.querySelector('.pillar-slide-content');

        tl.to(prevSlide, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.inOut'
        })
        .fromTo(slide, {
          opacity: 0,
          scale: 1.08,
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        }, {
          opacity: 1,
          scale: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: 'power2.inOut'
        }, '<');

        if (currContent) {
          tl.fromTo(currContent, {
            y: 40,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4');
        }
      }
    });
  }

  initHeritageHorizontalScroll() {
    const section = document.querySelector('#cultural-heritage');
    const scrollContainer = document.querySelector('.institutions-track');
    
    if (!section || !scrollContainer || window.innerWidth < 1025 || !window.gsap) return;
    if (this.reducedMotion) return;

    const totalWidth = scrollContainer.scrollWidth - window.innerWidth + 120;
    if (totalWidth <= 0) return;

    window.gsap.to(scrollContainer, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalWidth}`,
        pin: true,
        scrub: 1.1,
        anticipatePin: 1
      }
    });
  }

  initMelaFestivalCinematic() {
    const melaSec = document.querySelector('#kathakali-mela');
    const melaBackdrop = document.querySelector('.mela-cinematic-bg');
    const melaOverlay = document.querySelector('.mela-atmosphere-overlay');
    const melaHeading = document.querySelector('.mela-heading-block');

    if (!melaSec || !melaBackdrop || !window.gsap) return;
    if (this.reducedMotion) return;

    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: melaSec,
        start: 'top 80%',
        end: 'bottom top',
        scrub: true
      }
    });

    tl.fromTo(melaBackdrop, {
      scale: 1.25,
      filter: 'brightness(0.6) contrast(1.1)'
    }, {
      scale: 1.0,
      filter: 'brightness(0.9) contrast(1.2)',
      ease: 'none'
    });

    if (melaOverlay) {
      tl.fromTo(melaOverlay, { opacity: 0.8 }, { opacity: 0.35, ease: 'none' }, 0);
    }

    if (melaHeading) {
      const revealLines = melaHeading.querySelectorAll('.reveal-line');
      if (revealLines.length > 0) {
        window.gsap.from(revealLines, {
          scrollTrigger: {
            trigger: melaSec,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          stagger: 0.18,
          duration: 1.1,
          ease: 'power3.out'
        });
      }
    }
  }

  initParallaxLayers() {
    if (this.reducedMotion || !window.gsap) return;

    const floatingElements = document.querySelectorAll('[data-parallax-speed]');
    floatingElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
      window.gsap.to(el, {
        y: -150 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    const revealCards = document.querySelectorAll('.editorial-card-visual');
    revealCards.forEach((card) => {
      const img = card.querySelector('img');
      if (img) {
        window.gsap.fromTo(img, {
          y: -40,
          scale: 1.15
        }, {
          y: 40,
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });
  }

  initCounterAnimations() {
    if (!window.ScrollTrigger || !window.gsap) return;

    const counters = document.querySelectorAll('.stat-number');
    counters.forEach((el) => {
      const targetText = el.innerText.trim();
      const numMatch = targetText.match(/\d+/);
      if (!numMatch) return;
      const targetNum = parseInt(numMatch[0], 10);
      const suffix = targetText.replace(/\d+/, '');

      window.ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          let countObj = { val: 0 };
          window.gsap.to(countObj, {
            val: targetNum,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => {
              el.innerText = Math.floor(countObj.val).toLocaleString() + suffix;
            }
          });
        }
      });
    });
  }
}
