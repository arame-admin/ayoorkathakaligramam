/**
 * Kathakali Gramam Ayroor — Main Interaction & Animation Script
 * Features: Lenis Ultra-Smooth Scrolling, Ambient Canvas Particles,
 * Editorial Scroll Reveals & Transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initPageLoadSequence();
  initHeroMudrasSlider();
  initHeroEmbers();
  initMobileNavigation();
  initScrollSpy();
  initTopicDropdown();
  initContactForm();
  initBackToTop();
  initGalleryLightbox();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Ultra-Smooth Scrolling with Lenis
   -------------------------------------------------------------------------- */
let lenisInstance = null;

function initLenisSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  lenisInstance = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.8,
    infinite: false
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenisInstance.scrollTo(targetEl, {
          offset: 0,
          duration: 1.35,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Page Load Sequence
   -------------------------------------------------------------------------- */
function initPageLoadSequence() {
  // Trigger entrance sequence after initial paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add('page-loaded');
    }, 120);
  });
}

/* --------------------------------------------------------------------------
   3. Kathakali Mudras Showcase Slider (Smooth Transitions & Gentle Scale)
   -------------------------------------------------------------------------- */
function initHeroMudrasSlider() {
  const slides = document.querySelectorAll('.mudra-slide');
  const dots = document.querySelectorAll('.mudra-dot');
  const prevBtn = document.getElementById('mudraPrevBtn');
  const nextBtn = document.getElementById('mudraNextBtn');
  const seqEl = document.getElementById('mudraSeq');
  const titleEl = document.getElementById('mudraTitle');
  const meaningEl = document.getElementById('mudraMeaning');
  const indicatorBar = document.getElementById('mudraIndicatorBar');

  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;
  const INTERVAL = 6000;
  let isHovered = false;

  function goToSlide(index, userInitiated = false) {
    if (index === currentIndex && !userInitiated) return;

    currentIndex = (index + slides.length) % slides.length;

    // Update slides with crossfade
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update navigation dots
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });

    // Update mudra title and meaning with gentle micro-transition
    const activeSlide = slides[currentIndex];
    const mudraName = activeSlide.getAttribute('data-mudra') || '';
    const mudraMeaning = activeSlide.getAttribute('data-meaning') || '';
    const seqStr = `0${currentIndex + 1} / 0${slides.length}`;

    if (seqEl) seqEl.textContent = seqStr;

    if (titleEl && meaningEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(3px)';
      meaningEl.style.opacity = '0';

      setTimeout(() => {
        titleEl.textContent = mudraName;
        meaningEl.textContent = mudraMeaning;
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
        meaningEl.style.opacity = '1';
      }, 160);
    }

    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function resetTimer() {
    clearInterval(timer);
    if (!isHovered) {
      timer = setInterval(nextSlide, INTERVAL);
    }
  }

  // Interactive controls
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(idx, true);
    });
  });

  if (indicatorBar) {
    indicatorBar.addEventListener('mouseenter', () => {
      isHovered = true;
      clearInterval(timer);
    });
    indicatorBar.addEventListener('mouseleave', () => {
      isHovered = false;
      resetTimer();
    });
  }

  // Touch swipe support for mobile
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    let touchStartX = 0;
    let touchEndX = 0;
    heroSection.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 45) {
          if (diffX > 0) nextSlide();
          else prevSlide();
        }
      }
    }, { passive: true });
  }

  resetTimer();
}

/* --------------------------------------------------------------------------
   4. Ambient Floating Amber Embers (Tranquil Temple Light Atmosphere)
   -------------------------------------------------------------------------- */
function initHeroEmbers() {
  const canvas = document.getElementById('heroEmbers');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 38;
  let isVisible = true;
  let animationFrameId;

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 20;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.45 + 0.25;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.baseOpacity = this.opacity;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      this.pulse = Math.random() * Math.PI * 2;
      this.isGold = Math.random() > 0.3;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.pulse * 0.5) * 0.15;
      this.pulse += this.pulseSpeed;
      this.opacity = this.baseOpacity * (0.7 + 0.3 * Math.sin(this.pulse));

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      if (this.isGold) {
        grad.addColorStop(0, 'rgba(226, 201, 148, 1)');
        grad.addColorStop(0.5, 'rgba(198, 166, 106, 0.6)');
        grad.addColorStop(1, 'rgba(198, 166, 106, 0)');
      } else {
        grad.addColorStop(0, 'rgba(255, 235, 190, 1)');
        grad.addColorStop(0.6, 'rgba(226, 201, 148, 0.4)');
        grad.addColorStop(1, 'rgba(226, 201, 148, 0)');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Ember());
  }

  function loop() {
    if (isVisible) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }
    animationFrameId = requestAnimationFrame(loop);
  }
  loop();

  // Pause canvas when hero is out of view
  const heroSec = document.getElementById('hero');
  if ('IntersectionObserver' in window && heroSec) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(heroSec);
  }
}



/* --------------------------------------------------------------------------
   4. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const overlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !overlay) return;

  function openMenu() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenisInstance) lenisInstance.stop();
  }

  function closeMenu() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Active Navigation Spy on Scroll
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], .invitation-and-footer[id]');
  const desktopLinks = document.querySelectorAll('.primary-navigation .nav-item');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop links
        desktopLinks.forEach(item => {
          const a = item.querySelector('.nav-label');
          if (a && a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          } else if (a) {
            a.classList.remove('active');
          }
        });

        // Update mobile links
        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   6. Custom Topic Dropdown Selector
   -------------------------------------------------------------------------- */
function initTopicDropdown() {
  const btn = document.getElementById('topicSelectorBtn');
  const dropdown = document.getElementById('topicDropdown');
  const textEl = document.getElementById('selectedTopicText');
  const inputEl = document.getElementById('selectedTopicInput');

  if (!btn || !dropdown) return;

  function toggleDropdown() {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    dropdown.classList.toggle('show', !isExpanded);
  }

  function closeDropdown() {
    btn.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('show');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  dropdown.querySelectorAll('.topic-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = option.getAttribute('data-value');
      textEl.textContent = val;
      if (inputEl) inputEl.value = val;

      dropdown.querySelectorAll('.topic-option').forEach(opt => {
        opt.classList.remove('active');
        opt.setAttribute('aria-selected', 'false');
      });
      option.classList.add('active');
      option.setAttribute('aria-selected', 'true');

      closeDropdown();
      btn.focus();
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdown.classList.contains('show')) {
      closeDropdown();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Contact Form Submission & Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#userName').value.trim();
    const email = form.querySelector('#userEmail').value.trim();
    const message = form.querySelector('#userMessage').value.trim();

    if (!name || !email || !message) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill in all required fields.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please provide a valid email address.';
      return;
    }

    // Success State
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = 'SENDING…';
    submitBtn.disabled = true;

    setTimeout(() => {
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Thank you for reaching out. Your enquiry has been received with reverence.';
      form.reset();
      submitBtn.querySelector('.btn-text').textContent = originalText;
      submitBtn.disabled = false;
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   8. Back to Top Smooth Scroll
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* --------------------------------------------------------------------------
   9. Gallery Lightbox Modal
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const modalCap = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const backdrop = document.getElementById('lightboxBackdrop');

  if (!modal || !modalImg) return;

  const galleryImages = document.querySelectorAll('.gallery-photo');

  function openLightbox(img) {
    const parent = img.closest('.gallery-image');
    const cap = parent ? parent.querySelector('.photograph-title') : null;
    modalImg.src = img.currentSrc || img.src;
    modalImg.alt = img.alt || '';
    modalCap.textContent = cap ? cap.textContent : '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenisInstance) lenisInstance.stop();
  }

  function closeLightbox() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenisInstance) lenisInstance.start();
  }

  galleryImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   10. Scroll-Driven Reveal & Draw Line Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // 1. Accent rules drawing across on scroll
  const rules = document.querySelectorAll('.accent-rule, .tradition-divider');
  const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('drawn');
        lineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  rules.forEach(r => lineObserver.observe(r));

  // 2. Mudra disciplines & Pathway dividers
  const itemsWithDividers = document.querySelectorAll('.discipline, .learning-pathway');
  const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        dividerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  itemsWithDividers.forEach(item => dividerObserver.observe(item));

  // 3. Staggered reveal for cards & content blocks
  const cards = document.querySelectorAll(
    '.activity-story, .mela-feature, .gesture-study, .recognition-value, .gallery-image, .learning-photograph, .contact-form-card'
  );

  cards.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  cards.forEach(el => cardObserver.observe(el));
}
