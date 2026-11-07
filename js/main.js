/**
 * Ayroor Kathakali Gramam - Main Frontend Application
 * Orchestrates 3D Hero, Scroll Engine, Bilingual Translation,
 * Cinematic Intro, Awards System, Mobile Nav, and Modals.
 */

import { translations, awardsData } from './translations.js';
import { HeroScene3D } from './scene3d.js';
import { ScrollEngine } from './scrollAnimations.js';
import { VisualGallery } from './gallery.js';
import { VideoShowcase } from './videoPlayer.js';
import './soundscape.js';

class KathakaliApp {
  constructor() {
    this.currentLang = 'en';
    this.currentAwardTab = 'natyabharathi';
    this.hero3D = null;
    this.scrollEngine = null;
    this.gallery = null;
    this.videoShowcase = null;

    this.init();
  }

  init() {
    this.initIntroSequence();
    this.init3DScene();
    this.initScrollEngine();
    this.initGallery();
    this.initVideo();
    this.initAwards();
    this.initLanguageSwitcher();
    this.initMobileNavigation();
    this.initContactModal();
    this.initBackToTop();
  }

  /* -------------------------------------------------------------
     SECTION 01: CINEMATIC INTRO SEQUENCE
     ------------------------------------------------------------- */
  initIntroSequence() {
    const introOverlay = document.querySelector('#cinematic-intro');
    const skipBtn = document.querySelector('.intro-skip-btn');
    if (!introOverlay) return;

    let dismissed = false;
    const dismissIntro = () => {
      if (dismissed) return;
      dismissed = true;
      introOverlay.classList.add('intro-fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
        document.body.classList.remove('intro-active');
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 900);
    };

    if (skipBtn) {
      skipBtn.addEventListener('click', dismissIntro);
    }

    // Auto dismiss after 4.2 seconds
    setTimeout(() => {
      dismissIntro();
    }, 4200);
  }

  /* -------------------------------------------------------------
     SECTION 03: THREE.JS 3D SCENE
     ------------------------------------------------------------- */
  init3DScene() {
    const canvasContainer = document.querySelector('#hero-3d-canvas-container');
    if (canvasContainer) {
      this.hero3D = new HeroScene3D(canvasContainer);
    }
  }

  /* -------------------------------------------------------------
     SCROLL ENGINE & GSAP
     ------------------------------------------------------------- */
  initScrollEngine() {
    this.scrollEngine = new ScrollEngine(this.hero3D);
  }

  /* -------------------------------------------------------------
     SECTION 10: GALLERY
     ------------------------------------------------------------- */
  initGallery() {
    this.gallery = new VisualGallery();
  }

  /* -------------------------------------------------------------
     SECTION 09: VIDEO SHOWCASE
     ------------------------------------------------------------- */
  initVideo() {
    this.videoShowcase = new VideoShowcase();
  }

  /* -------------------------------------------------------------
     SECTION 08: AWARDS & RECOGNITION TABS
     ------------------------------------------------------------- */
  initAwards() {
    const tabButtons = document.querySelectorAll('.award-tab-btn');
    const awardsContainer = document.querySelector('.awards-grid-container');

    const renderAwards = (tabKey) => {
      if (!awardsContainer) return;
      this.currentAwardTab = tabKey;
      const list = awardsData[tabKey] || [];
      awardsContainer.innerHTML = '';

      list.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'award-card';
        card.style.animationDelay = `${index * 0.05}s`;

        const recipient = this.currentLang === 'ml' ? item.recipient_ml : item.recipient_en;
        const category = this.currentLang === 'ml' ? item.category_ml : item.category_en;

        card.innerHTML = `
          <div class="award-card-inner">
            <div class="award-year-badge">${item.year}</div>
            <div class="award-details">
              <h4 class="award-recipient">${recipient}</h4>
              <span class="award-discipline">${category}</span>
            </div>
            <div class="award-crest-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
              </svg>
            </div>
          </div>
        `;
        awardsContainer.appendChild(card);
      });
    };

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        renderAwards(tab);
      });
    });

    renderAwards('natyabharathi');
  }

  /* -------------------------------------------------------------
     SECTION 08 & GLOBAL: BILINGUAL TRANSLATION SYSTEM
     ------------------------------------------------------------- */
  initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        this.switchLanguage(selectedLang);
      });
    });
  }

  switchLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-malayalam', lang === 'ml');

    // Update active state on buttons
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    // Update all i18n text nodes
    const transObj = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (transObj[key]) {
        el.innerHTML = transObj[key];
      }
    });

    // Update Gallery and Awards
    if (this.gallery) {
      this.gallery.setLanguage(lang);
    }
    this.updateAwardsLanguage();

    if (window.ScrollTrigger) {
      setTimeout(() => window.ScrollTrigger.refresh(), 200);
    }
  }

  updateAwardsLanguage() {
    const awardsContainer = document.querySelector('.awards-grid-container');
    if (!awardsContainer) return;
    const list = awardsData[this.currentAwardTab] || [];
    const cards = awardsContainer.querySelectorAll('.award-card');
    
    cards.forEach((card, index) => {
      const item = list[index];
      if (item) {
        const recEl = card.querySelector('.award-recipient');
        const catEl = card.querySelector('.award-discipline');
        if (recEl) recEl.textContent = this.currentLang === 'ml' ? item.recipient_ml : item.recipient_en;
        if (catEl) catEl.textContent = this.currentLang === 'ml' ? item.category_ml : item.category_en;
      }
    });
  }

  /* -------------------------------------------------------------
     MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------- */
  initMobileNavigation() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const links = document.querySelectorAll('.mobile-nav-link');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('active');
      toggleBtn.classList.toggle('active', !isOpen);
      drawer.classList.toggle('active', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* -------------------------------------------------------------
     ENQUIRY & CONTACT MODAL (BRD 3.16)
     ------------------------------------------------------------- */
  initContactModal() {
    const modal = document.querySelector('#contact-modal');
    const triggerBtns = document.querySelectorAll('[data-open-contact]');
    const closeBtn = document.querySelector('.modal-close-btn');
    const form = document.querySelector('#contact-enquiry-form');
    const feedback = document.querySelector('.form-feedback-msg');

    if (!modal) return;

    triggerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (feedback) feedback.style.display = 'none';
      if (form) form.reset();
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
          if (feedback) {
            feedback.className = 'form-feedback-msg error';
            feedback.textContent = this.currentLang === 'ml' 
              ? 'ദയവായി എല്ലാ കോളങ്ങളും പൂരിപ്പിക്കുക.' 
              : 'Please fill out all required fields.';
            feedback.style.display = 'block';
          }
          return;
        }

        if (feedback) {
          feedback.className = 'form-feedback-msg success';
          feedback.textContent = this.currentLang === 'ml'
            ? 'നന്ദി! നിങ്ങളുടെ സന്ദേശം ലഭിച്ചു. ഞങ്ങൾ ഉടൻ ബന്ധപ്പെടുന്നതാണ്.'
            : 'Thank you! Your enquiry has been received. We will get in touch shortly.';
          feedback.style.display = 'block';
        }
        form.reset();
        setTimeout(() => closeModal(), 2800);
      });
    }
  }

  /* -------------------------------------------------------------
     BACK TO TOP
     ------------------------------------------------------------- */
  initBackToTop() {
    const backBtn = document.querySelector('.back-to-top-btn');
    if (!backBtn) return;

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.scrollEngine && this.scrollEngine.lenis) {
        this.scrollEngine.lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// Boot up once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.kathakaliApp = new KathakaliApp();
});
