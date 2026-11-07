/**
 * Premium Interactive Visual Gallery & Lightbox
 * For Ayroor Kathakali Gramam
 * Supports asymmetric grid, filter tags, keyboard navigation, and touch gestures
 */

export class VisualGallery {
  constructor() {
    this.galleryData = [
      {
        src: 'assets/images/hero_paccha_dark.jpg',
        title_en: 'Paccha Vesham - The Divine Hero',
        title_ml: 'പച്ച വേഷം - സാത്വിക കഥാപാത്രം',
        category: 'vesham',
        desc_en: 'Illuminated solely by the traditional bronze oil lamp, depicting moral divinity with emerald paccha face makeup and white layered chutti.',
        desc_ml: 'ആട്ടവിളക്കിന്റെ വെളിച്ചത്തിൽ തിളങ്ങുന്ന പച്ച വേഷം, ധർമ്മത്തിന്റെയും ശാന്തതയുടെയും പ്രതീകം.'
      },
      {
        src: 'assets/images/kathi_close_crown.jpg',
        title_en: 'Kathi Vesham - The Royal Antagonist',
        title_ml: 'കത്തി വേഷം - രാവണ ഭാവം',
        category: 'vesham',
        desc_en: 'The intricate white knob (Chuttippoov) and mustache painting representing noble yet flawed heroic arrogance.',
        desc_ml: 'ഉന്നത കുലജാതനായ രാജാവിന്റെ അഹങ്കാര ഭാവങ്ങൾ വ്യക്തമാക്കുന്ന കത്തി വേഷത്തിന്റെ മുഖചമയം.'
      },
      {
        src: 'assets/images/stage_leap_lamp.jpg',
        title_en: 'The Flight of Bhima - Dynamic Leap',
        title_ml: 'ഭീമന്റെ കുതിപ്പ് - അരങ്ങിലെ വീര്യം',
        category: 'stage',
        desc_en: 'Captured mid-leap beside the sacred Aattuvilakku lamp, with billowing ivory skirts and commanding mudra.',
        desc_ml: 'ആട്ടവിളക്കിനരികിൽ വിരിഞ്ഞുനിൽക്കുന്ന ഉടുത്തുകെട്ടോടെ വായുവിൽ ഉയർന്നുനിൽക്കുന്ന വിസ്മയ നിമിഷം.'
      },
      {
        src: 'assets/images/chutti_greenroom.jpg',
        title_en: 'Aniyara - The Sacred Greenroom Transformation',
        title_ml: 'അണിയറ - സാത്വിക പരിവർത്തനം',
        category: 'vesham',
        desc_en: 'Hours of silent concentration as masters apply layers of rice paste and lime chutti to the artist reclining on straw mats.',
        desc_ml: 'മണിക്കൂറുകൾ നീളുന്ന ചുട്ടികുത്തൽ പ്രക്രിയ. പ്രകൃതിദത്ത വർണ്ണങ്ങളാൽ അരങ്ങിലെ ദേവതയായി മാറുന്ന അണിയറ ദൃശ്യം.'
      },
      {
        src: 'assets/images/paccha_minukku_scene.jpg',
        title_en: 'Nalacharitham - King Nala & Damayanthi',
        title_ml: 'നളചരിതം - നളനും ദമയന്തിയും',
        category: 'stage',
        desc_en: 'Unkown depths of romance and pathos expressed through eye gestures under the single flame of the Koothambalam vilakku.',
        desc_ml: 'ശൃംഗാരവും വിരഹവും തുളുമ്പുന്ന നളചരിതത്തിലെ അനശ്വര മുഹൂർത്തം.'
      },
      {
        src: 'assets/images/shobhayathra_procession.jpg',
        title_en: 'Mela Shobhayathra Cultural Procession',
        title_ml: 'കഥകളി മേള ശോഭയാത്ര',
        category: 'mela',
        desc_en: 'Ayroor village streets come alive with thousands of villagers celebrating their living Kathakali identity.',
        desc_ml: 'അയിരൂർ ഗ്രാമവീഥികളെ ആവേശഭരിതമാക്കുന്ന വാർഷിക കഥകളി മേള വിളംബര ശോഭയാത്ര.'
      },
      {
        src: 'assets/images/mudra_anjali_prayer.jpg',
        title_en: 'Anjali Mudra - Gesture of Reverence',
        title_ml: 'അഞ്ജലി മുദ്ര - വന്ദന ഭാവം',
        category: 'stage',
        desc_en: 'The classical prayer mudra paying homage to the divine presence, the master guru, and the learned rasikas.',
        desc_ml: 'ഗുരുവിനെയും അരങ്ങിനെയും വണങ്ങുന്ന പവിത്രമായ അഞ്ജലി മുദ്ര.'
      },
      {
        src: 'assets/images/mela_street_celebration.jpg',
        title_en: 'Festival Joy Under Sunlit Festoons',
        title_ml: 'ഉത്സവലഹരിയിൽ അയിരൂർ വീഥികൾ',
        category: 'mela',
        desc_en: 'Folk characters, Kathakali artists, and cheering crowds under thousands of hanging tender coconut leaf festoons.',
        desc_ml: 'കുരുത്തോല തോരണങ്ങൾക്കു കീഴിൽ ആർത്തുവിളിക്കുന്ന ജനക്കൂട്ടവും നൃത്തംവെയ്ക്കുന്ന വേഷങ്ങളും.'
      },
      {
        src: 'assets/images/kireedam_crowning.jpg',
        title_en: 'Kireedadharanam - The Crowning Ritual',
        title_ml: 'കിരീടധാരണം - പവിത്ര കർമ്മം',
        category: 'vesham',
        desc_en: 'Placing the sanctified gilded crown upon the head, completing the transformation from actor to immortal deity.',
        desc_ml: 'നടൻ പൂർണ്ണമായും ദേവതയായി മാറുന്ന പവിത്രമായ കിരീടധാരണ മുഹൂർത്തം.'
      },
      {
        src: 'assets/images/chuvanna_thadi_beards.jpg',
        title_en: 'Chuvanna Thadi - Ferocious Red Beards',
        title_ml: 'ചുവന്ന താടി - രൗദ്ര വേഷം',
        category: 'stage',
        desc_en: 'Tremendous sonic power and terrifying eyes depicting demonic characters like Dussasana and Bakasura.',
        desc_ml: 'ദുശ്ശാസനൻ, ബകൻ തുടങ്ങിയ രൗദ്ര കഥാപാത്രങ്ങളുടെ വിറപ്പിക്കുന്ന അവതരണം.'
      },
      {
        src: 'assets/images/kathakali_troupe_ensemble.jpg',
        title_en: 'Ayroor Troupe Ensemble',
        title_ml: 'അയിരൂർ കഥകളി ട്രൂപ്പ് സംഘം',
        category: 'stage',
        desc_en: 'The acclaimed resident troupe uniting multiple generations of performing maestros from the riverbanks of Pamba.',
        desc_ml: 'പമ്പയുടെ തീരത്തുനിന്നും ലോകവേദികളിലേക്ക് കല പകരുന്ന അയിരൂർ കഥകളി ട്രൂപ്പ്.'
      },
      {
        src: 'assets/images/mela_inauguration_lamp.webp',
        title_en: 'Deepapraveekshanam - Sacred Lamp Lighting',
        title_ml: 'ദീപപ്രോജ്ജ്വലനം - ഉദ്ഘാടന മുഹൂർത്തം',
        category: 'mela',
        desc_en: 'Eminent dignitaries and cultural patronizers igniting the central bronze lamp marking the start of the 7-day Mela.',
        desc_ml: 'ഏഴു ദിവസത്തെ കഥകളി മേളയ്ക്ക് തിരിതെളിയിക്കുന്ന മംഗള ദീപപ്രോജ്ജ്വലനം.'
      }
    ];

    this.currentIndex = 0;
    this.currentFilter = 'all';
    this.currentLang = 'en';

    this.gridContainer = document.querySelector('.gallery-asymmetric-grid');
    this.lightbox = document.querySelector('.cinematic-lightbox');
    this.lightboxImg = document.querySelector('.lightbox-image');
    this.lightboxTitle = document.querySelector('.lightbox-title');
    this.lightboxDesc = document.querySelector('.lightbox-desc');
    this.lightboxCount = document.querySelector('.lightbox-counter');

    this.initGrid();
    this.initFilters();
    this.initLightboxEvents();
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.updateCaptions();
  }

  initGrid() {
    if (!this.gridContainer) return;
    this.gridContainer.innerHTML = '';

    const filtered = this.currentFilter === 'all' 
      ? this.galleryData 
      : this.galleryData.filter(item => item.category === this.currentFilter);

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      // Create asymmetric masonry spans
      const spanClass = (index % 5 === 0 || index % 7 === 0) ? 'gallery-item--wide' : 
                        (index % 3 === 0) ? 'gallery-item--tall' : '';
      card.className = `gallery-item ${spanClass}`;
      card.setAttribute('data-category', item.category);

      const title = this.currentLang === 'ml' ? item.title_ml : item.title_en;
      
      card.innerHTML = `
        <div class="gallery-item-inner" data-index="${this.galleryData.indexOf(item)}">
          <div class="gallery-img-wrapper">
            <img src="${item.src}" alt="${title}" loading="lazy" class="gallery-thumb">
            <div class="gallery-hover-overlay">
              <span class="gallery-zoom-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </span>
              <div class="gallery-card-meta">
                <h4 class="gallery-card-title">${title}</h4>
                <span class="gallery-card-category">${item.category.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        const trueIndex = this.galleryData.indexOf(item);
        this.openLightbox(trueIndex);
      });

      this.gridContainer.appendChild(card);
    });
  }

  initFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.initGrid();
      });
    });
  }

  openLightbox(index) {
    if (!this.lightbox) return;
    this.currentIndex = index;
    this.updateLightboxContent();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.galleryData.length;
    this.updateLightboxContent();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.galleryData.length) % this.galleryData.length;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const item = this.galleryData[this.currentIndex];
    if (!item || !this.lightboxImg) return;

    this.lightboxImg.style.opacity = '0';
    this.lightboxImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      this.lightboxImg.src = item.src;
      this.lightboxTitle.textContent = this.currentLang === 'ml' ? item.title_ml : item.title_en;
      this.lightboxDesc.textContent = this.currentLang === 'ml' ? item.desc_ml : item.desc_en;
      if (this.lightboxCount) {
        this.lightboxCount.textContent = `${this.currentIndex + 1} / ${this.galleryData.length}`;
      }
      this.lightboxImg.style.opacity = '1';
      this.lightboxImg.style.transform = 'scale(1)';
    }, 150);
  }

  updateCaptions() {
    // Update grid card titles
    const cards = document.querySelectorAll('.gallery-item-inner');
    cards.forEach(card => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      const item = this.galleryData[idx];
      if (item) {
        const titleEl = card.querySelector('.gallery-card-title');
        if (titleEl) {
          titleEl.textContent = this.currentLang === 'ml' ? item.title_ml : item.title_en;
        }
      }
    });

    if (this.lightbox && this.lightbox.classList.contains('active')) {
      this.updateLightboxContent();
    }
  }

  initLightboxEvents() {
    if (!this.lightbox) return;

    const closeBtn = this.lightbox.querySelector('.lightbox-close-btn');
    const nextBtn = this.lightbox.querySelector('.lightbox-next-btn');
    const prevBtn = this.lightbox.querySelector('.lightbox-prev-btn');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextImage());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevImage());

    // Backdrop click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox || e.target.classList.contains('lightbox-backdrop')) {
        this.closeLightbox();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowRight') this.nextImage();
      if (e.key === 'ArrowLeft') this.prevImage();
    });

    // Touch swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;
    this.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        this.nextImage(); // swipe left
      } else if (touchEndX - touchStartX > 50) {
        this.prevImage(); // swipe right
      }
    }, { passive: true });
  }
}
