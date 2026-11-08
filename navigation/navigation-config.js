/**
 * Ayroor Kathakali Gramam — Architectural & Contemporary Navigation Configuration
 * ============================================================================
 * Single source of truth for both Desktop, Full-Screen Architectural Canvas,
 * Mobile Drawer, and Architectural Footer presentations.
 *
 * Implements the 6 Architectural Navigation Groups:
 *
 * 01 — ORGANIZATION (About Us -> Office Bearers)
 * 02 — FESTIVAL (Kathakali Mela -> Upcoming Events)
 * 03 — RECOGNITION (Awards -> Awards Gallery)
 * 04 — MEDIA & GALLERY (Gallery -> Kathakali Gallery, Media Coverage)
 * 05 — EXPLORE KATHAKALI (Kathakali Mudras, Kathakali Characters, Kathakali Instruments)
 * 06 — CONNECT (Contact Us)
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.NAV_CONFIG = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const NAV_CONFIG = {
    // Brand Identity Layer
    brand: {
      title: 'AYROOR',
      subtitle: 'KATHAKALI GRAMAM',
      logoSrc: 'assets/images/ayroor-official-logo.webp',
      logoAlt: 'Official Emblem of Ayroor Kathakali Gramam',
      href: 'index.html',
      taglineEn: 'The cultural sanctuary of classical Kerala dance-theatre',
      taglineMl: 'സജീവ കഥകളി പാരമ്പര്യത്തിന്റെ പുണ്യഭൂമി',
      identityStatementEn: 'Sacred architectural sanctuary of Kerala classical performing arts on the perennial banks of River Pamba.',
      identityStatementMl: 'പമ്പാനദിയുടെ പുണ്യതീരത്ത് സ്ഥിതിചെയ്യുന്ന കേരളത്തിന്റെ അഭിമാന ക്ലാസിക്കൽ നാട്യ സങ്കേതം.',
      locationEn: 'AYROOR • PATHANAMTHITTA • KERALA',
      locationMl: 'അയ്രൂർ • പത്തനംതിട്ട • കേരളം',
      coordinates: 'LAT 9.3789° N • LON 76.7198° E • PAMBA RIVER BASIN'
    },

    // Bilingual Selector Support
    languages: [
      { code: 'en', label: 'EN', fullLabel: 'English' },
      { code: 'ml', label: 'മലയാളം', fullLabel: 'മലയാളം' }
    ],
    // The 6 Architectural Navigation Groups (Section 01 - 06)
    groups: [
      {
        id: 'organization',
        num: '01',
        labelEn: 'Organization',
        labelMl: 'സംഘടന',
        kickerEn: 'Heritage & Custodians',
        kickerMl: 'പൈതൃകവും ഭാരവാഹികളും',
        descEn: 'Custodians, master teachers and patron trustees dedicated to preserving and transmitting Kathakali heritage.',
        descMl: 'കഥകളി പാരമ്പര്യ സംരക്ഷണത്തിനായി സമർപ്പിതമായ ഭരണസമിതിയും ആചാര്യന്മാരും.',
        image: 'assets/images/imgs/kathakali3.webp',
        imageAlt: 'Paccha vesham representing noble ethos and timeless guardianship',
        coordinates: 'NATYA PARAMPARA • HERITAGE SANCTUM',
        items: [
          {
            id: 'about',
            labelEn: 'About Us',
            labelMl: 'ഞങ്ങളെക്കുറിച്ച്',
            href: 'about.html',
            descEn: 'Identity, heritage & living tradition of Kathakali Gramam',
            descMl: 'കഥകളി ഗ്രാമത്തിന്റെ പവിത്ര ചരിത്രവും പൈതൃകവും',
            hasChildren: true,
            children: [
              {
                id: 'office-bearers',
                labelEn: 'Office Bearers',
                labelMl: 'ഭാരവാഹികൾ',
                href: 'about.html#office-bearers',
                descEn: 'Trustees, patrons & custodians guiding the cultural mission',
                descMl: 'ഗ്രാമ ഭരണസമിതിയും മുഖ്യ രക്ഷാധികാരികളും'
              },
              {
                id: 'natyabharathi-centre',
                labelEn: 'Natyabharathi Centre',
                labelMl: 'നാട്യഭാരതി കേന്ദ്രം',
                href: 'about.html#centre',
                descEn: 'Classical arts academy, Kalari disciplines & eminent Gurus',
                descMl: 'ക്ലാസിക്കൽ നാട്യവിദ്യാലയം, കളരി പഠന ശാഖകൾ & ആചാര്യന്മാർ'
              },
              {
                id: 'institutions-wings',
                labelEn: 'Institutions & Wings',
                labelMl: 'അനുബന്ധ സ്ഥാപനങ്ങൾ',
                href: 'about.html#institutions',
                descEn: 'Kalamandalam off-campus, library, resident troupe & Koothambalam',
                descMl: 'കലാമണ്ഡലം സബ് സെന്റർ, ഗ്രന്ഥശാല, ട്രൂപ്പ് & കൂത്തമ്പലം'
              }
            ]
          }
        ]
      },
      {
        id: 'festival',
        num: '02',
        labelEn: 'Festival',
        labelMl: 'കളിമേള',
        kickerEn: 'Annual Convergence',
        kickerMl: 'വാർഷിക നാട്യോത്സവം',
        descEn: 'Kerala’s iconic 7-night dusk-to-dawn open-air Kathakali confluence on the sacred sands of Ayroor.',
        descMl: 'പമ്പയുടെ മണൽപ്പുറത്ത് അരങ്ങേറുന്ന ഏഴുരാവുകളുടെ വിശ്വപ്രസിദ്ധ നാട്യവിസ്മയം.',
        image: 'assets/images/ayroor-pamba-mela.webp',
        imageAlt: 'Kathakali Mela audience and night performances on the Pamba sandbed',
        coordinates: 'ANNUAL PAMBA GATHERING • 7 DUSK-TO-DAWN NIGHTS',
        items: [
          {
            id: 'mela',
            labelEn: 'Kathakali Mela',
            labelMl: 'കഥകളി മേള',
            href: 'mela.html',
            descEn: 'Kerala’s grandest dusk-to-dawn open-air Kathakali arena',
            descMl: 'രാപ്പകൽ നീളുന്ന മഹാ നാട്യവിസ്മയം',
            hasChildren: true,
            children: [
              {
                id: 'upcoming-events',
                labelEn: 'Upcoming Events',
                labelMl: 'വരാനിരിക്കുന്ന പരിപാടികൾ',
                href: 'mela.html#upcoming',
                descEn: 'Festival schedule, performance calendar & workshops',
                descMl: 'മേളയുടെ സമ്പൂർണ്ണ പരിപാടികളും അരങ്ങുകളും'
              }
            ]
          }
        ]
      },
      {
        id: 'recognition',
        num: '03',
        labelEn: 'Recognition',
        labelMl: 'പുരസ്കാരങ്ങൾ',
        kickerEn: 'Master Honors',
        kickerMl: 'നാട്യ ബഹുമതികൾ',
        descEn: 'Prestigious natya puraskarams and lifetime honors celebrating masters of abhinaya, sangeetham and melam.',
        descMl: 'അഭിനയം, സംഗീതം, മേളം എന്നിവയിലെ കുലപതികളെ ആദരിക്കുന്ന നാട്യ പുരസ്കാരങ്ങൾ.',
        image: 'assets/images/imgs/kathakali5.webp',
        imageAlt: 'Masterful mudra pose representing artistic honor and lifetime mastery',
        coordinates: 'LIFETIME MASTERY • PURASKARAM ARCHIVE',
        items: [
          {
            id: 'awards',
            labelEn: 'Awards',
            labelMl: 'പുരസ്കാരങ്ങൾ',
            href: 'awards.html',
            descEn: 'Natya puraskarams & lifetime achievement recognitions',
            descMl: 'നാട്യ പുരസ്കാരങ്ങളും ബഹുമതികളും',
            hasChildren: true,
            children: [
              {
                id: 'awards-gallery',
                labelEn: 'Awards Gallery',
                labelMl: 'പുരസ്കാര ഗാലറി',
                href: 'awards.html#gallery',
                descEn: 'Ceremonial citations, honoree portraits & archive',
                descMl: 'പുരസ്കാര ജേതാക്കളുടെ ചിത്രങ്ങളും ചരിത്രവും'
              }
            ]
          }
        ]
      },
      {
        id: 'media-gallery',
        num: '04',
        labelEn: 'Media & Gallery',
        labelMl: 'ദൃശ്യശേഖരം',
        kickerEn: 'Visual Archives',
        kickerMl: 'ചിത്രശാലയും മാധ്യമങ്ങളും',
        descEn: 'High-resolution visual repository documenting mudra lexicons, vesham transformations and press chronicles.',
        descMl: 'മുദ്രകൾ, വേഷപ്പകർച്ചകൾ, അരങ്ങിലെ ഭാവങ്ങൾ എന്നിവയുടെ സമ്പൂർണ്ണ ദൃശ്യശേഖരം.',
        image: 'assets/images/imgs/kathakali1.webp',
        imageAlt: 'Dynamic facial expressions, navarasas and character transformations',
        coordinates: 'VISUAL CHRONICLES • PHOTO ARCHIVE',
        items: [
          {
            id: 'gallery',
            labelEn: 'Gallery',
            labelMl: 'ചിത്രശാല',
            href: 'gallery.html',
            descEn: 'Curated visual journey through Ayroor Kathakali Gramam',
            descMl: 'അയിരൂരിന്റെ വർണ്ണാഭമായ ദൃശ്യങ്ങൾ',
            hasChildren: true,
            children: [
              {
                id: 'kathakali-gallery',
                labelEn: 'Kathakali Gallery',
                labelMl: 'കഥകളി ചിത്രങ്ങൾ',
                href: 'gallery.html#kathakali',
                descEn: 'Portraits, vesham transformations & dramatic moments',
                descMl: 'വേഷപ്പകർച്ചകളും അരങ്ങിലെ ഭാവങ്ങളും'
              },
              {
                id: 'media-coverage',
                labelEn: 'Media Coverage',
                labelMl: 'മാധ്യമ വാർത്തകൾ',
                href: 'media.html',
                descEn: 'Press chronicles, national coverage & documentaries',
                descMl: 'പത്രവാർത്തകളും ഡോക്യുമെന്ററികളും'
              }
            ]
          }
        ]
      },
      {
        id: 'explore-kathakali',
        num: '05',
        labelEn: 'Explore Kathakali',
        labelMl: 'കഥകളി പരിചയം',
        kickerEn: 'Living Pedagogy & Aesthetics',
        kickerMl: 'നാട്യശാസ്ത്രവും സൗന്ദര്യശാസ്ത്രവും',
        descEn: 'Comprehensive educational guide to the codified hand gestures (Mudras), theatrical archetypes (Characters/Vesham), and sacred percussion instruments of Kathakali.',
        descMl: 'കഥകളിയുടെ പവിത്ര മുദ്രകൾ, വേഷസങ്കൽപ്പങ്ങൾ, താളവാദ്യങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള സമഗ്ര പഠന സഹായി.',
        image: 'assets/images/imgs/kathakali5.webp',
        imageAlt: 'Dynamic Kathakali mudra and performance expression',
        coordinates: 'HASTHA LAKSHANA DEEPIKA • AHARYA & VADHYA',
        items: [
          {
            id: 'kathakali-mudras',
            labelEn: 'Kathakali Mudras',
            labelMl: 'കഥകളി മുദ്രകൾ',
            href: 'mudras.html',
            descEn: 'Codified hand gestures of Hastalakshana Deepika with meanings & usage',
            descMl: 'ഹസ്തലക്ഷണ ദീപികയിലെ 24 അടിസ്ഥാന മുദ്രകളും അർത്ഥങ്ങളും'
          },
          {
            id: 'kathakali-characters',
            labelEn: 'Kathakali Characters',
            labelMl: 'കഥകളി വേഷങ്ങൾ',
            href: 'characters.html',
            descEn: 'Classical Vesham archetypes: Paccha, Kathi, Thadi, Kari & Minukku',
            descMl: 'പച്ച, കത്തി, താടി, കരി, മിനുക്ക് വേഷസങ്കൽപ്പങ്ങൾ'
          },
          {
            id: 'kathakali-instruments',
            labelEn: 'Kathakali Instruments',
            labelMl: 'കഥകളി വാദ്യങ്ങൾ',
            href: 'instruments.html',
            descEn: 'Sacred percussion ensemble: Chenda, Maddalam, Chengila, Ilathalam & Idakka',
            descMl: 'ചെണ്ട, മദ്ദളം, ചെങ്ങില, ഇലത്താളം, ഇടയ്ക്ക വാദ്യങ്ങൾ'
          }
        ]
      },
      {
        id: 'connect',
        num: '06',
        labelEn: 'Connect',
        labelMl: 'സമ്പർക്കം',
        kickerEn: 'Destination & Access',
        kickerMl: 'യാത്രാ വിവരങ്ങൾ',
        descEn: 'Travel coordinates, riverfront directions, academy bookings and visitor guidance to Ayroor village.',
        descMl: 'യാത്രാ മാർഗ്ഗങ്ങൾ, സന്ദർശന വിവരങ്ങൾ, കേന്ദ്ര ഏകോപന കാര്യാലയം.',
        image: 'assets/images/imgs/kathakali4.webp',
        imageAlt: 'Scenic Ayroor village and Kathakali sanctuary destination',
        coordinates: 'PATHANAMTHITTA • RIVER PAMBA BASIN',
        items: [
          {
            id: 'contact',
            labelEn: 'Contact Us',
            labelMl: 'ബന്ധപ്പെടുക',
            href: 'contact.html',
            isCta: true,
            descEn: 'Location, visitor guidance, bookings & official office',
            descMl: 'സന്ദർശനം, ബുക്കിംഗ്, ഗ്രാമ ഏകോപന കേന്ദ്രം'
          }
        ]
      }
    ]
  };

  // Build flattened items array for backwards compatibility
  NAV_CONFIG.items = [];
  NAV_CONFIG.groups.forEach(group => {
    group.items.forEach(item => {
      NAV_CONFIG.items.push(item);
    });
  });

  // Desktop grouping compatibility alias
  NAV_CONFIG.desktopGrouping = null;

  // Helper method to find group by item href or id
  NAV_CONFIG.findGroupByRoute = function (route) {
    if (!route) return NAV_CONFIG.groups[0];
    const cleanRoute = route.split('#')[0].split('/').pop().toLowerCase();
    for (let g of NAV_CONFIG.groups) {
      for (let item of g.items) {
        const itemClean = item.href.split('#')[0].split('/').pop().toLowerCase();
        if (itemClean && cleanRoute === itemClean) return g;
        if (item.children) {
          for (let child of item.children) {
            const childClean = child.href.split('#')[0].split('/').pop().toLowerCase();
            if (childClean && cleanRoute === childClean) return g;
          }
        }
      }
    }
    return NAV_CONFIG.groups[0];
  };

  return NAV_CONFIG;
}));
