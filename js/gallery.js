/**
 * AYROOR KATHAKALI GRAMAM — YEAR-WISE GALLERY ARCHIVE & PAGINATION LIGHTBOX
 * ============================================================================
 * Features:
 *   - Year-wise Program Albums Archive (2026, 2025, 2024, 2023, 2022, 2020)
 *   - Direct Year Album Navigation & URL Synchronization (?year=2026)
 *   - Detail Page Grid with Headings ONLY (No Descriptions)
 *   - Supsystic-Style Pagination Controls (Page numbers, Prev/Next, Show All)
 *   - Supsystic-Style Fullscreen Lightbox with Bottom Thumbnail Pagination Strip
 *   - Full Keyboard & Mobile Touch Swipe Navigation
 *   - Strict Bilingual Synchronization (100% English / 100% Malayalam)
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 1. YEAR-WISE PROGRAM PHOTO DATASET ---
  const GALLERY_YEARS_DATA = [
    {
      year: 2026,
      editionEn: "24th Ayroor Kathakali Mela (2026)",
      editionMl: "24-ാം വാർഷിക അയ്രൂർ കഥകളി മേള (2026)",
      titleEn: "Annual Kathakali Mela Programs",
      titleMl: "വാർഷിക കഥകളി മേളയിലെ അരങ്ങുകൾ",
      cover: "assets/images/programs/Kalyanasougandhikam.webp",
      venueEn: "Sree Vidyadhiraja Nagar, Pamba River Sandbanks",
      venueMl: "ശ്രീ വിദ്യാധിരാജ നഗർ, പമ്പാ മണൽപ്പുറം",
      highlightsEn: "Kalyanasougandhikam, Nalacharitham, Duryodhanavadham, Karnashapatham",
      highlightsMl: "കല്യാണസൗഗന്ധികം, നളചരിതം, ദുര്യോധനവധം, കർണ്ണശപഥം",
      photos: [
        {
          id: "2026-p1",
          titleEn: "Kalyanasougandhikam — Bheema-Hanuman Encounter",
          titleMl: "കല്യാണസൗഗന്ധികം — ഭീമ-ഹനുമാൻ സമാഗമം",
          image: "assets/images/programs/Kalyanasougandhikam.webp"
        },
        {
          id: "2026-p2",
          titleEn: "Nalacharitham — Hamsa's Compassionate Love Mission",
          titleMl: "നളചരിതം ഒന്നാം ദിവസം — പൊൻഹംസത്തിന്റെ ദൂത്",
          image: "assets/images/programs/Nalacharitham.webp"
        },
        {
          id: "2026-p3",
          titleEn: "Duryodhanavadham — Epic Kurukshetra Climax",
          titleMl: "ദുര്യോധനവധം — കുരുക്ഷേത്ര യുദ്ധരംഗം",
          image: "assets/images/programs/Duryodhana-Vadham.webp"
        },
        {
          id: "2026-p4",
          titleEn: "Karnashapatham — Karna & Kunti at Ganga Sandbanks",
          titleMl: "കർണ്ണശപഥം — മാതൃസമാഗമവും ആത്മവേദനയും",
          image: "assets/images/programs/Karnashapatham.webp"
        },
        {
          id: "2026-p5",
          titleEn: "Kiratham — Lord Shiva's Pasupata Boon to Arjuna",
          titleMl: "കിരാതം — അർജ്ജുന-ശിവ സമാഗമവും വരദാനവും",
          image: "assets/images/programs/Kiratham.webp"
        },
        {
          id: "2026-p6",
          titleEn: "Dakshayagam — Veerabhadra's Sacred Fury",
          titleMl: "ദക്ഷയാഗം — വീരഭദ്രന്റെ രൗദ്രതാണ്ഡവം",
          image: "assets/images/programs/Dakshayagam.webp"
        },
        {
          id: "2026-p7",
          titleEn: "Lavanasuravadham — Reunion of Lava-Kusha & Sri Rama",
          titleMl: "ലവണാസുരവധം — പുത്രസമാഗമ രംഗം",
          image: "assets/images/programs/Lavanasuravadham.webp"
        },
        {
          id: "2026-p8",
          titleEn: "Paccha Vesham — Divine Majesty on Pamba Sandbanks",
          titleMl: "പച്ച വേഷം — പമ്പാതീരത്തെ ദിവ്യഭാവം",
          image: "assets/images/imgs/kathakali3.webp"
        },
        {
          id: "2026-p9",
          titleEn: "Aniyara — Sacred Rice-Paste Chutti Transformation",
          titleMl: "അണിയറ — ആചാരനിഷ്ഠമായ ചുട്ടികുത്തൽ",
          image: "assets/images/imgs/kathakali2.webp"
        },
        {
          id: "2026-p10",
          titleEn: "Kathi Vesham — Rajasic Grandeur of Ravana",
          titleMl: "കത്തി വേഷം — രാവണന്റെ രാജസഭാവം",
          image: "assets/images/imgs/kathakali1.webp"
        },
        {
          id: "2026-p11",
          titleEn: "Pamba Amphitheater — Connoisseurs Gathering at Dusk",
          titleMl: "പമ്പാ മണൽപ്പുറത്തെ വിശ്വോത്തര നാട്യസദസ്സ്",
          image: "assets/images/ayroor-pamba-mela.webp"
        },
        {
          id: "2026-p12",
          titleEn: "Minukku Vesham — Celestial Luster of Sita & Damayanti",
          titleMl: "മിനുക്ക് വേഷം — ലാവണ്യശോഭ തുളുമ്പുന്ന ഭാവം",
          image: "assets/images/imgs/watermark-removed-k1.webp"
        }
      ]
    },
    {
      year: 2025,
      editionEn: "23rd Ayroor Kathakali Mela (2025)",
      editionMl: "23-ാം വാർഷിക അയ്രൂർ കഥകളി മേള (2025)",
      titleEn: "Annual Kathakali Mela Programs",
      titleMl: "വാർഷിക കഥകളി മേളയിലെ അരങ്ങുകൾ",
      cover: "assets/images/programs/Kiratham.webp",
      venueEn: "Sree Vidyadhiraja Nagar, Pamba River Sandbanks",
      venueMl: "ശ്രീ വിദ്യാധിരാജ നഗർ, പമ്പാ മണൽപ്പുറം",
      highlightsEn: "Kiratham, Dakshayagam, Kalyanasougandhikam, Chuvannathadi",
      highlightsMl: "കിരാതം, ദക്ഷയാഗം, കല്യാണസൗഗന്ധികം, ചുവന്നതാടി",
      photos: [
        {
          id: "2025-p1",
          titleEn: "Kiratham — The Divine Hunter's Trial",
          titleMl: "കിരാതം — കാട്ടാള വേഷത്തിലെ പരമശിവൻ",
          image: "assets/images/programs/Kiratham.webp"
        },
        {
          id: "2025-p2",
          titleEn: "Dakshayagam — Destruction of the Yagashala",
          titleMl: "ദക്ഷയാഗം — യാഗശാല ധ്വംസനം",
          image: "assets/images/programs/Dakshayagam.webp"
        },
        {
          id: "2025-p3",
          titleEn: "Kalyanasougandhikam — Quest for the Celestial Blossom",
          titleMl: "കല്യാണസൗഗന്ധികം — സൗഗന്ധികാന്വേഷണം",
          image: "assets/images/programs/Kalyanasougandhikam.webp"
        },
        {
          id: "2025-p4",
          titleEn: "Chuvannathadi — Roar of the Demonic Archetype",
          titleMl: "ചുവന്നതാടി — രൗദ്രഭാവത്തിന്റെ അസുരതാളം",
          image: "assets/images/characters/chuvannathadi.webp"
        },
        {
          id: "2025-p5",
          titleEn: "Vellathadi — Sage Hanuman’s Devotional Serenity",
          titleMl: "വെള്ളത്താടി — ഹനുമാന്റെ സാത്വിക ഭക്തിഭാവം",
          image: "assets/images/characters/vellathadi.webp"
        },
        {
          id: "2025-p6",
          titleEn: "Aniyara — Midnight Green Room Preparations",
          titleMl: "അണിയറ — പാതിരാവിലെ ഒരുക്കങ്ങൾ",
          image: "assets/images/imgs/kathakali2.webp"
        },
        {
          id: "2025-p7",
          titleEn: "Sacred Chenda & Maddalam Melappadam",
          titleMl: "മേളപ്പദം — ചെണ്ടയും മദ്ദളവും സമന്വയിച്ച നാദം",
          image: "assets/images/instruments/chenda.webp"
        },
        {
          id: "2025-p8",
          titleEn: "Hastalakshana Mudra — Codified Hand Gestures",
          titleMl: "ഹസ്തലക്ഷണ ദീപിക — മുദ്രാഭിനയ വിസ്മയം",
          image: "assets/images/imgs/kathakali5.webp"
        },
        {
          id: "2025-p9",
          titleEn: "Pamba Riverbanks Consecration Recital",
          titleMl: "പമ്പാതീരത്തെ സാംസ്കാരിക സന്ധ്യ",
          image: "assets/images/imgs/kathakali4.webp"
        }
      ]
    },
    {
      year: 2024,
      editionEn: "22nd Ayroor Kathakali Mela (2024)",
      editionMl: "22-ാം വാർഷിക അയ്രൂർ കഥകളി മേള (2024)",
      titleEn: "Annual Kathakali Mela Programs",
      titleMl: "വാർഷിക കഥകളി മേളയിലെ അരങ്ങുകൾ",
      cover: "assets/images/programs/Nalacharitham.webp",
      venueEn: "Sree Vidyadhiraja Nagar, Pamba River Sandbanks",
      venueMl: "ശ്രീ വിദ്യാധിരാജ നഗർ, പമ്പാ മണൽപ്പുറം",
      highlightsEn: "Nalacharitham, Duryodhanavadham, Kari Vesham, Heritage Recital",
      highlightsMl: "നളചരിതം, ദുര്യോധനവധം, കരി വേഷം, പൈതൃക അരങ്ങ്",
      photos: [
        {
          id: "2024-p1",
          titleEn: "Nalacharitham — Golden Swan Messenger at Nishadha",
          titleMl: "നളചരിതം — നിഷധരാജധാനിയിലെ പൊൻഹംസം",
          image: "assets/images/programs/Nalacharitham.webp"
        },
        {
          id: "2024-p2",
          titleEn: "Duryodhanavadham — Challenge of the Kuru Dynasty",
          titleMl: "ദുര്യോധനവധം — കൗരവ സദസ്സിലെ വെല്ലുവിളി",
          image: "assets/images/programs/Duryodhana-Vadham.webp"
        },
        {
          id: "2024-p3",
          titleEn: "Paccha Vesham — Majestic Nala Portrayal",
          titleMl: "പച്ച വേഷം — നളന്റെ രാജസൗന്ദര്യം",
          image: "assets/images/characters/paccha.webp"
        },
        {
          id: "2024-p4",
          titleEn: "Kathi Vesham — Regal Duryodhana in Royal Finery",
          titleMl: "കത്തി വേഷം — ദുര്യോധനന്റെ രാജകീയ വേഷപ്പകർച്ച",
          image: "assets/images/characters/kathi.webp"
        },
        {
          id: "2024-p5",
          titleEn: "National Press Feature — India's Kathakali Village",
          titleMl: "ദേശീയ മാധ്യമ ശ്രദ്ധ നേടിയ അയ്രൂർ ഗ്രാമം",
          image: "assets/images/imgs/watermark-removed-k2.webp"
        },
        {
          id: "2024-p6",
          titleEn: "Kari Vesham — Forest Demoness Simhika",
          titleMl: "കരി വേഷം — കാട്ടുരാക്ഷസിയായ സിംഹിക",
          image: "assets/images/characters/kari.webp"
        },
        {
          id: "2024-p7",
          titleEn: "Living Heritage Documentary — The Oral Tradition",
          titleMl: "ദൃശ്യ ഡോക്യുമെന്ററി — തലമുറകളുടെ പൈതൃകം",
          image: "assets/images/imgs/watermark-removed-k4.webp"
        },
        {
          id: "2024-p8",
          titleEn: "Sacred Idakka & Sopana Sangeetham Acoustic Flow",
          titleMl: "ഇടയ്ക്കയും സോപാന സംഗീതവും",
          image: "assets/images/instruments/idakka.webp"
        }
      ]
    },
    {
      year: 2023,
      editionEn: "21st Ayroor Kathakali Mela (2023)",
      editionMl: "21-ാം വാർഷിക അയ്രൂർ കഥകളി മേള (2023)",
      titleEn: "Annual Kathakali Mela Programs",
      titleMl: "വാർഷിക കഥകളി മേളയിലെ അരങ്ങുകൾ",
      cover: "assets/images/programs/Karnashapatham.webp",
      venueEn: "Sree Vidyadhiraja Nagar, Pamba River Sandbanks",
      venueMl: "ശ്രീ വിദ്യാധിരാജ നഗർ, പമ്പാ മണൽപ്പുറം",
      highlightsEn: "Karnashapatham, Lavanasuravadham, Sandbanks Vigil, Dusk Kelikottu",
      highlightsMl: "കർണ്ണശപഥം, ലവണാസുരവധം, മണൽപ്പുറത്തെ സദസ്സ്, കേളികൊട്ട്",
      photos: [
        {
          id: "2023-p1",
          titleEn: "Karnashapatham — Karna's Heartfelt Pathos at Sunset",
          titleMl: "കർണ്ണശപഥം — സൂര്യപുത്രന്റെ ഹൃദയവേദന",
          image: "assets/images/programs/Karnashapatham.webp"
        },
        {
          id: "2023-p2",
          titleEn: "Lavanasuravadham — Capture of the Sacred Ashwamedha Horse",
          titleMl: "ലവണാസുരവധം — യാഗാശ്വത്തെ ബന്ധിക്കൽ",
          image: "assets/images/programs/Lavanasuravadham.webp"
        },
        {
          id: "2023-p3",
          titleEn: "Minukku Vesham — Sita's Devotion in Valmiki Hermitage",
          titleMl: "മിനുക്ക് വേഷം — വാത്മീകി ആശ്രമത്തിലെ സീത",
          image: "assets/images/characters/minukku.webp"
        },
        {
          id: "2023-p4",
          titleEn: "Aniyara — Adorning the Gilded Kireedam Crown",
          titleMl: "അണിയറ — കിരീടധാരണത്തിന്റെ പവിത്രത",
          image: "assets/images/imgs/kathakali1.webp"
        },
        {
          id: "2023-p5",
          titleEn: "Dusk Kelikottu — The Sacred Riverbed Calling",
          titleMl: "സന്ധ്യാ കേളികൊട്ട് — പമ്പാ മണൽപ്പുറത്തെ വിളംബരം",
          image: "assets/images/instruments/chenda.webp"
        },
        {
          id: "2023-p6",
          titleEn: "Chengila & Ilathalam Rhythmic Pulse",
          titleMl: "ചെങ്ങിലയും ഇലത്താളവും",
          image: "assets/images/instruments/chengila-and-ilathalam.webp"
        },
        {
          id: "2023-p7",
          titleEn: "Pamba Sandbed Night Vigil Confluence",
          titleMl: "പമ്പാ മണൽത്തട്ടിലെ നിശാ ജാഗരണ സദസ്സ്",
          image: "assets/images/ayroor-pamba-mela.webp"
        },
        {
          id: "2023-p8",
          titleEn: "Documentary Chronicle — Consecration of Kathakali Gramam",
          titleMl: "ചരിത്ര രേഖ — പമ്പാനദീതീരത്തെ പൈതൃക ഗ്രാമം",
          image: "assets/images/imgs/watermark-removed-k4.webp"
        }
      ]
    },
    {
      year: 2022,
      editionEn: "20th Jubilee Kathakali Mela (2022)",
      editionMl: "20-ാം വാർഷിക ജൂബിലി കഥകളി മേള (2022)",
      titleEn: "Annual Kathakali Mela Programs",
      titleMl: "വാർഷിക കഥകളി മേളയിലെ അരങ്ങുകൾ",
      cover: "assets/images/programs/Dakshayagam.webp",
      venueEn: "Sree Vidyadhiraja Nagar, Pamba River Sandbanks",
      venueMl: "ശ്രീ വിദ്യാധിരാജ നഗർ, പമ്പാ മണൽപ്പുറം",
      highlightsEn: "Kalyanasougandhikam, Kiratham, Dakshayagam, Maddalam Resonance",
      highlightsMl: "കല്യാണസൗഗന്ധികം, കിരാതം, ദക്ഷയാഗം, മദ്ദളനാദം",
      photos: [
        {
          id: "2022-p1",
          titleEn: "Kalyanasougandhikam — Bheema Searching for Saugandhika",
          titleMl: "കല്യാണസൗഗന്ധികം — സൗഗന്ധിക പുഷ്പാന്വേഷണം",
          image: "assets/images/programs/Kalyanasougandhikam.webp"
        },
        {
          id: "2022-p2",
          titleEn: "Kiratham — Lord Shiva as the Kiratha Hunter",
          titleMl: "കിരാതം — കിരാതമൂർത്തിയുടെ രംഗപ്രവേശം",
          image: "assets/images/programs/Kiratham.webp"
        },
        {
          id: "2022-p3",
          titleEn: "Dakshayagam — Sati Devi's Sacrifice",
          titleMl: "ദക്ഷയാഗം — സതീദേവിയുടെ ദേഹത്യാഗം",
          image: "assets/images/programs/Dakshayagam.webp"
        },
        {
          id: "2022-p4",
          titleEn: "Paccha Vesham — Classical Rasa Abhinaya Mastery",
          titleMl: "പച്ച വേഷം — രസാഭിനയ പൂർണ്ണത",
          image: "assets/images/imgs/kathakali3.webp"
        },
        {
          id: "2022-p5",
          titleEn: "Aniyara — Rice-Flour Sculpture on Face",
          titleMl: "അണിയറ — ചുട്ടിയിലെ ശില്പഭംഗി",
          image: "assets/images/imgs/kathakali2.webp"
        },
        {
          id: "2022-p6",
          titleEn: "Maddalam Bass Resonance in Thodayam",
          titleMl: "തോടയത്തിലെ ഗംഭീര മദ്ദള വാദനം",
          image: "assets/images/instruments/maddalam.webp"
        },
        {
          id: "2022-p7",
          titleEn: "20th Jubilee Grand Inauguration & Lamp Lighting",
          titleMl: "ജൂബിലി മേള ഉദ്ഘാടനവും ഭദ്രദീപ പ്രകാശവും",
          image: "assets/images/imgs/kathakali4.webp"
        }
      ]
    },
    {
      year: 2020,
      editionEn: "Historic Sandbanks Jubilee (2020)",
      editionMl: "ചരിത്രപ്രസിദ്ധമായ മണൽപ്പുറം മേള (2020)",
      titleEn: "Annual Kathakali Mela Programs",
      titleMl: "വാർഷിക കഥകളി മേളയിലെ അരങ്ങുകൾ",
      cover: "assets/images/programs/Duryodhana-Vadham.webp",
      venueEn: "Sree Vidyadhiraja Nagar, Pamba River Sandbanks",
      venueMl: "ശ്രീ വിദ്യാധിരാജ നഗർ, പമ്പാ മണൽപ്പുറം",
      highlightsEn: "Duryodhanavadham, Nalacharitham, Kathi Vesham, Mudras",
      highlightsMl: "ദുര്യോധനവധം, നളചരിതം, കത്തി വേഷം, മുദ്രാവിസ്മയം",
      photos: [
        {
          id: "2020-p1",
          titleEn: "Duryodhanavadham — The Epic Retribution",
          titleMl: "ദുര്യോധനവധം — പ്രതികാര പൂർത്തീകരണം",
          image: "assets/images/programs/Duryodhana-Vadham.webp"
        },
        {
          id: "2020-p2",
          titleEn: "Nalacharitham — Hamsa's Compassionate Departure",
          titleMl: "നളചരിതം — ഹംസത്തിന്റെ യാത്ര",
          image: "assets/images/programs/Nalacharitham.webp"
        },
        {
          id: "2020-p3",
          titleEn: "Kathi Vesham — Regal Defiance & Hubris",
          titleMl: "കത്തി വേഷം — രാജകീയ ഗർവ്വ്",
          image: "assets/images/imgs/kathakali1.webp"
        },
        {
          id: "2020-p4",
          titleEn: "Mudra Gesture Study in Performance",
          titleMl: "മുദ്രാവിന്യാസം — ഹസ്തലക്ഷണം",
          image: "assets/images/imgs/kathakali5.webp"
        },
        {
          id: "2020-p5",
          titleEn: "Pamba Sandbanks Open Riverbed Pavilion",
          titleMl: "പമ്പാ മണൽപ്പുറം ഓപ്പൺ എയർ ഓഡിറ്റോറിയം",
          image: "assets/images/ayroor-pamba-mela.webp"
        },
        {
          id: "2020-p6",
          titleEn: "National Feature Broadcast on Doordarshan",
          titleMl: "ദൂരദർശൻ ദേശീയ സംപ്രേക്ഷണം",
          image: "assets/images/imgs/watermark-removed-k2.webp"
        }
      ]
    }
  ];

  // --- 2. APPLICATION STATE ---
  const state = {
    view: 'albums', // 'albums' or 'detail'
    selectedYear: 2026,
    currentPage: 1,
    pageSize: 6, // 6 images per page (Supsystic pagination standard)
    activeLightboxIdx: 0,
    isLightboxOpen: false,
    isZoomed: false,
    currentLang: (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 
                 (typeof document !== 'undefined' && document.documentElement.lang) || 'en'
  };

  // Distinct Years
  const ALL_YEARS = GALLERY_YEARS_DATA.map(d => d.year).sort((a, b) => b - a);

  function getCurrentAlbum() {
    return GALLERY_YEARS_DATA.find(d => d.year === state.selectedYear) || GALLERY_YEARS_DATA[0];
  }

  // --- 3. RENDERERS ---

  /**
   * Render Sticky Year Navigation Stream
   */
  function renderYearNav() {
    const stream = document.getElementById('galleryYearStream');
    const backBtn = document.getElementById('galleryBackBtn');
    if (!stream) return;
    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');

    let html = `
      <button type="button" class="gallery-year-pill ${state.view === 'albums' ? 'is-active' : ''}" data-nav-year="all">
        <span>✦</span>
        <span>${isMl ? 'എല്ലാ വർഷങ്ങളും' : 'All Years'}</span>
      </button>
    `;

    ALL_YEARS.forEach(y => {
      const isActive = state.view === 'detail' && state.selectedYear === y;
      html += `
        <button type="button" class="gallery-year-pill ${isActive ? 'is-active' : ''}" data-nav-year="${y}">
          <span>${isMl ? `വർഷം ${y}` : `${y} Mela`}</span>
        </button>
      `;
    });

    stream.innerHTML = html;

    // Attach listeners
    stream.querySelectorAll('.gallery-year-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetYear = btn.getAttribute('data-nav-year');
        if (targetYear === 'all') {
          showAlbumsView();
        } else {
          showYearDetail(parseInt(targetYear, 10));
        }
      });
    });

    // Back to albums button
    if (backBtn) {
      if (state.view === 'detail') {
        backBtn.style.display = 'inline-flex';
        const txtEl = backBtn.querySelector('.back-btn-text');
        if (txtEl) {
          txtEl.textContent = isMl ? '← വർഷങ്ങളിലേക്ക്' : '← All Years';
        } else {
          backBtn.innerHTML = `<span class="back-btn-text">${isMl ? '← വർഷങ്ങളിലേക്ക്' : '← All Years'}</span>`;
        }
      } else {
        backBtn.style.display = 'none';
      }
    }
  }

  /**
   * Render Year-wise Program Albums (View 1)
   */
  function renderAlbumsView() {
    const container = document.getElementById('galleryMainContainer');
    if (!container) return;
    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');

    let html = `
      <div class="gallery-albums-grid">
    `;

    GALLERY_YEARS_DATA.forEach(album => {
      const countLabel = isMl ? `${album.photos.length} ചിത്രങ്ങൾ` : `${album.photos.length} Photos`;
      const exploreLabel = isMl ? 'ചിത്രങ്ങൾ കാണുക' : 'View Program Gallery';

      html += `
        <article class="album-card" data-album-year="${album.year}" tabindex="0" role="button" aria-label="Open ${album.year} Gallery">
          <div class="album-card-media">
            <img src="${album.cover}" alt="${album.year} Kathakali Mela" class="album-card-img" loading="lazy">
            <div class="album-card-overlay"></div>
            <div class="album-badge-year">${album.year}</div>
            <div class="album-badge-count">
              <span aria-hidden="true">📷</span>
              <span>${countLabel}</span>
            </div>
          </div>
          
          <div class="album-card-body">
            <span class="album-edition-kicker">${isMl ? album.editionMl : album.editionEn}</span>
            <h3 class="${isMl ? 'album-card-title-ml' : 'album-card-title'}">
              ${isMl ? album.titleMl : album.titleEn}
            </h3>
            
            <div style="font-size: 0.82rem; color: var(--color-ivory-dim); line-height: 1.5; margin-bottom: 12px;">
              <strong style="color: var(--temple-gold);">${isMl ? 'പ്രധാന അരങ്ങുകൾ: ' : 'Featured Plays: '}</strong>
              ${isMl ? album.highlightsMl : album.highlightsEn}
            </div>

            <div class="album-card-meta">
              <span>📍 ${isMl ? album.venueMl : album.venueEn}</span>
              <span class="album-card-action">
                <span>${exploreLabel}</span>
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </article>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Attach click events on album cards
    container.querySelectorAll('.album-card').forEach(card => {
      card.addEventListener('click', () => {
        const y = parseInt(card.getAttribute('data-album-year'), 10);
        showYearDetail(y);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const y = parseInt(card.getAttribute('data-album-year'), 10);
          showYearDetail(y);
        }
      });
    });
  }

  /**
   * Render Detail Page: Photo Grid with HEADINGS ONLY (No Descriptions) + Supsystic Pagination
   */
  function renderDetailView() {
    const container = document.getElementById('galleryMainContainer');
    if (!container) return;
    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');
    const album = getCurrentAlbum();
    const photos = album.photos;

    // Pagination calculations
    const totalPhotos = photos.length;
    const totalPages = Math.ceil(totalPhotos / state.pageSize) || 1;
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    const startIdx = (state.currentPage - 1) * state.pageSize;
    const pagePhotos = photos.slice(startIdx, startIdx + state.pageSize);

    let html = `
      <!-- Album Detail Header -->
      <header class="gallery-detail-header">
        <div class="gallery-detail-title-wrap">
          <div class="gallery-detail-year-tag">
            <span>🪔</span>
            <span>${isMl ? album.editionMl : album.editionEn}</span>
          </div>
          <h2 class="${isMl ? 'gallery-detail-heading-ml' : 'gallery-detail-heading'}">
            ${isMl ? `${album.year} കഥകളി മേള — ചിത്രശാല` : `${album.year} Kathakali Mela — Visual Gallery`}
          </h2>
          <div class="gallery-detail-venue">
            📍 ${isMl ? album.venueMl : album.venueEn} • ${totalPhotos} ${isMl ? 'ചിത്രങ്ങൾ' : 'Photos'}
          </div>
        </div>

        <div>
          <button type="button" class="gallery-back-albums-btn" id="inlineBackBtn">
            <span>←</span>
            <span>${isMl ? 'എല്ലാ വർഷങ്ങളും കാണുക' : 'Back to All Years'}</span>
          </button>
        </div>
      </header>

      <!-- Photos Grid: HEADINGS ONLY (No descriptions) -->
      <div class="gallery-photos-grid" id="photosGrid">
    `;

    pagePhotos.forEach((photo, idxOnPage) => {
      const globalIdx = startIdx + idxOnPage;
      const title = isMl ? photo.titleMl : photo.titleEn;

      html += `
        <article class="gallery-photo-card" data-photo-idx="${globalIdx}" tabindex="0" role="button" aria-label="Open ${title}">
          <div class="gallery-photo-media">
            <img src="${photo.image}" alt="${title}" class="gallery-photo-img" loading="lazy">
            <div class="gallery-photo-hover-overlay">
              <div class="gallery-photo-zoom-icon" aria-hidden="true">🔍</div>
            </div>
          </div>
          
          <!-- Heading ONLY — No description -->
          <div class="gallery-photo-body">
            <h3 class="${isMl ? 'gallery-photo-title-ml' : 'gallery-photo-title'}">${title}</h3>
            <span class="gallery-photo-expand-badge" aria-hidden="true">⛶</span>
          </div>
        </article>
      `;
    });

    html += `</div>`;

    // Supsystic-Style Pagination Controls
    if (totalPages > 1) {
      const prevLabel = isMl ? '« മുൻപത്തേത്' : '« Previous';
      const nextLabel = isMl ? 'അടുത്തത് »' : 'Next »';
      const isFirst = state.currentPage === 1;
      const isLast = state.currentPage === totalPages;

      html += `
        <nav class="supsystic-pagination-wrap" aria-label="Gallery Page Navigation">
          <button type="button" class="pagination-btn" id="paginationPrevBtn" ${isFirst ? 'disabled' : ''} aria-label="Previous Page">
            ${prevLabel}
          </button>
      `;

      for (let p = 1; p <= totalPages; p++) {
        const isActive = p === state.currentPage;
        html += `
          <button type="button" class="pagination-btn ${isActive ? 'is-active' : ''}" data-page="${p}" aria-label="Page ${p}" aria-current="${isActive ? 'page' : 'false'}">
            ${p}
          </button>
        `;
      }

      html += `
          <button type="button" class="pagination-btn" id="paginationNextBtn" ${isLast ? 'disabled' : ''} aria-label="Next Page">
            ${nextLabel}
          </button>
          
          <span class="pagination-info-pill">
            ${isMl ? `${totalPages}-ൽ ${state.currentPage}-ാം പേജ്` : `Page ${state.currentPage} of ${totalPages}`}
          </span>
        </nav>
      `;
    }

    container.innerHTML = html;

    // Attach photo card click listeners -> Lightbox
    container.querySelectorAll('.gallery-photo-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-photo-idx'), 10);
        openLightbox(idx);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(card.getAttribute('data-photo-idx'), 10);
          openLightbox(idx);
        }
      });
    });

    attachPaginationListeners(totalPages);
  }

  function smoothScrollTo(element, offset = -70) {
    if (!element) return;
    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
      window.lenis.scrollTo(element, { offset, duration: 1.2 });
    } else if (typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function attachPaginationListeners(totalPages) {
    const container = document.getElementById('galleryContainer');
    if (!container) return;

    // Attach Pagination Click Listeners
    container.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentPage = parseInt(btn.getAttribute('data-page'), 10);
        renderDetailView();
        const gridTop = document.getElementById('photosGrid');
        smoothScrollTo(gridTop, -80);
      });
    });

    const prevBtn = document.getElementById('paginationPrevBtn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.currentPage > 1) {
          state.currentPage--;
          renderDetailView();
          const gridTop = document.getElementById('photosGrid');
          smoothScrollTo(gridTop, -80);
        }
      });
    }

    const nextBtn = document.getElementById('paginationNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.currentPage < totalPages) {
          state.currentPage++;
          renderDetailView();
          const gridTop = document.getElementById('photosGrid');
          smoothScrollTo(gridTop, -80);
        }
      });
    }

    const inlineBack = document.getElementById('inlineBackBtn');
    if (inlineBack) {
      inlineBack.addEventListener('click', showAlbumsView);
    }
  }

  /**
   * Primary Render Switcher
   */
  function render() {
    renderYearNav();
    if (state.view === 'detail') {
      renderDetailView();
    } else {
      renderAlbumsView();
    }

    // Refresh Lenis boundaries & ScrollTrigger markers
    if (typeof window.refreshMotionAndScroll === 'function') {
      window.refreshMotionAndScroll();
    }
  }

  // --- 4. VIEW TRANSITION CONTROLLERS ---

  function showYearDetail(year) {
    state.view = 'detail';
    state.selectedYear = year;
    state.currentPage = 1;
    render();

    // Update URL history without page reload
    if (typeof history !== 'undefined' && history.pushState) {
      const newUrl = window.location.pathname + '?year=' + year;
      history.pushState({ view: 'detail', year: year }, '', newUrl);
    }

    // Scroll to top of gallery container
    const section = document.getElementById('gallerySection');
    smoothScrollTo(section, -70);
  }

  function showAlbumsView() {
    state.view = 'albums';
    render();

    // Update URL history
    if (typeof history !== 'undefined' && history.pushState) {
      const newUrl = window.location.pathname;
      history.pushState({ view: 'albums' }, '', newUrl);
    }

    const section = document.getElementById('gallerySection');
    smoothScrollTo(section, -70);
  }

  // --- 5. SUPSYSTIC-STYLE FULLSCREEN LIGHTBOX WITH THUMBNAIL PAGINATION ---

  function openLightbox(photoIdx) {
    const album = getCurrentAlbum();
    if (!album || !album.photos.length) return;

    state.activeLightboxIdx = photoIdx;
    state.isLightboxOpen = true;
    state.isZoomed = false;

    const modal = document.getElementById('supsysticLightbox');
    if (!modal) return;

    updateLightboxSlide();

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    if (document.body) document.body.style.overflow = 'hidden';
    if (typeof window.stopScroll === 'function') {
      window.stopScroll();
    } else if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
    }

    // Focus close button for keyboard trap
    const closeBtn = document.getElementById('lightboxCloseBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const modal = document.getElementById('supsysticLightbox');
    if (!modal) return;

    state.isLightboxOpen = false;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (document.body) document.body.style.overflow = '';
    if (typeof window.startScroll === 'function') {
      window.startScroll();
    } else if (window.lenis && typeof window.lenis.start === 'function') {
      window.lenis.start();
    }
  }

  function updateLightboxSlide() {
    const album = getCurrentAlbum();
    if (!album) return;
    const photos = album.photos;
    const total = photos.length;
    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');

    if (state.activeLightboxIdx >= total) state.activeLightboxIdx = 0;
    if (state.activeLightboxIdx < 0) state.activeLightboxIdx = total - 1;

    const currentPhoto = photos[state.activeLightboxIdx];
    const title = isMl ? currentPhoto.titleMl : currentPhoto.titleEn;

    // Elements
    const imgEl = document.getElementById('lightboxMainImg');
    const counterEl = document.getElementById('lightboxCounterBadge');
    const headingEl = document.getElementById('lightboxHeading');
    const thumbsContainer = document.getElementById('lightboxThumbsContainer');

    if (imgEl) {
      imgEl.src = currentPhoto.image;
      imgEl.alt = title;
      imgEl.classList.remove('is-zoomed');
    }

    if (counterEl) {
      counterEl.textContent = isMl
        ? `${total}-ൽ ${state.activeLightboxIdx + 1}`
        : `${state.activeLightboxIdx + 1} / ${total}`;
    }

    if (headingEl) {
      headingEl.textContent = title;
    }

    // Render Bottom Thumbnail Pagination Strip
    if (thumbsContainer) {
      let thumbsHtml = '';
      photos.forEach((p, idx) => {
        const isActive = idx === state.activeLightboxIdx;
        thumbsHtml += `
          <div class="lightbox-thumb-item ${isActive ? 'is-active' : ''}" data-thumb-idx="${idx}" role="button" tabindex="0" aria-label="Go to image ${idx + 1}">
            <img src="${p.image}" alt="" class="lightbox-thumb-img" loading="lazy">
          </div>
        `;
      });
      thumbsContainer.innerHTML = thumbsHtml;

      // Attach click to thumbnails
      thumbsContainer.querySelectorAll('.lightbox-thumb-item').forEach(th => {
        th.addEventListener('click', () => {
          const idx = parseInt(th.getAttribute('data-thumb-idx'), 10);
          state.activeLightboxIdx = idx;
          updateLightboxSlide();
        });
      });

      // Keep active thumbnail in view
      const activeThumb = thumbsContainer.querySelector('.lightbox-thumb-item.is-active');
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  function lightboxNext() {
    state.activeLightboxIdx++;
    updateLightboxSlide();
  }

  function lightboxPrev() {
    state.activeLightboxIdx--;
    updateLightboxSlide();
  }

  function toggleLightboxZoom() {
    const imgEl = document.getElementById('lightboxMainImg');
    if (!imgEl) return;
    state.isZoomed = !state.isZoomed;
    if (state.isZoomed) {
      imgEl.classList.add('is-zoomed');
    } else {
      imgEl.classList.remove('is-zoomed');
    }
  }

  function toggleLightboxFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function initLightboxListeners() {
    const modal = document.getElementById('supsysticLightbox');
    if (!modal) return;

    const closeBtn = document.getElementById('lightboxCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    const prevBtn = document.getElementById('lightboxPrevBtn');
    if (prevBtn) prevBtn.addEventListener('click', lightboxPrev);

    const nextBtn = document.getElementById('lightboxNextBtn');
    if (nextBtn) nextBtn.addEventListener('click', lightboxNext);

    const zoomBtn = document.getElementById('lightboxZoomBtn');
    if (zoomBtn) zoomBtn.addEventListener('click', toggleLightboxZoom);

    const fsBtn = document.getElementById('lightboxFullscreenBtn');
    if (fsBtn) fsBtn.addEventListener('click', toggleLightboxFullscreen);

    // Click backdrop to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('lightbox-stage')) {
        closeLightbox();
      }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (!state.isLightboxOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        lightboxNext();
      } else if (e.key === 'ArrowLeft') {
        lightboxPrev();
      }
    });

    // Mobile Touch Swipe Handling
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) lightboxNext(); // Swiped left -> Next
          else lightboxPrev(); // Swiped right -> Prev
        }
      }
    }, { passive: true });
  }

  // --- 6. BILINGUAL SYNCHRONIZATION ---
  function updateLanguage(lang) {
    if (lang !== 'en' && lang !== 'ml') return;
    state.currentLang = lang;
    render();
    if (state.isLightboxOpen) {
      updateLightboxSlide();
    }
  }

  function initLanguageSync() {
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('ayroor:languageChanged', (e) => {
        if (e.detail && e.detail.lang) {
          updateLanguage(e.detail.lang);
        }
      });
    }

    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.type === 'attributes' && m.attributeName === 'lang') {
            const newLang = document.documentElement.lang || 'en';
            if (newLang !== state.currentLang) {
              updateLanguage(newLang);
            }
          }
        });
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }

    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          const l = document.documentElement.lang || (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 'en';
          updateLanguage(l);
        }, 50);
      });
    });
  }

  // --- 7. INITIALIZE ON DOM READY ---
  function init() {
    // 1. Initial Language
    const initialLang = (typeof document !== 'undefined' && document.documentElement.lang) ||
                        (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 'en';
    state.currentLang = initialLang;

    // 2. Check URL Parameter for direct year landing (e.g. gallery.html?year=2026)
    if (typeof window !== 'undefined' && window.location) {
      const params = new URLSearchParams(window.location.search);
      const urlYear = params.get('year');
      if (urlYear && !isNaN(parseInt(urlYear, 10))) {
        state.view = 'detail';
        state.selectedYear = parseInt(urlYear, 10);
      }
    }

    // 3. Popstate event for Browser Back/Forward buttons
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.view === 'detail' && e.state.year) {
        state.view = 'detail';
        state.selectedYear = e.state.year;
        state.currentPage = 1;
      } else {
        state.view = 'albums';
      }
      render();
    });

    render();
    initLightboxListeners();
    initLanguageSync();
  }

  // Expose public API
  if (typeof window !== 'undefined') {
    window.AyroorGallery = {
      init,
      render,
      showYearDetail,
      showAlbumsView,
      openLightbox,
      closeLightbox,
      lightboxNext,
      lightboxPrev,
      toggleLightboxZoom,
      toggleLightboxFullscreen,
      state,
      GALLERY_YEARS_DATA
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
