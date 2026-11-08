/**
 * Ayroor Kathakali Gramam — Website Configuration
 * Plain Vanilla JS Configuration Object
 */

const CONFIG = {
  site: {
    title: 'Ayroor Kathakali Gramam',
    titleMalayalam: 'അയ്രൂർ കഥകളി ഗ്രാമം',
    tagline: 'The home of a living Kathakali tradition',
    taglineMalayalam: 'സജീവ കഥകളി പാരമ്പര്യത്തിന്റെ പുണ്യഭൂമി',
    location: 'Ayroor, Pathanamthitta District, Kerala 689611, India',
    region: 'Pamba River Basin, Central Travancore',
    copyright: '© 2026 Ayroor Kathakali Gramam. All Rights Reserved.'
  },

  // YouTube Live Stream Webcast Configuration
  liveStream: {
    enabled: true,
    channelName: 'Ayroor Kathakali Gramam Official',
    channelUrl: 'https://www.youtube.com/watch?v=nwiLwsgicno',
    streams: [
      {
        id: 'main-stage',
        title: 'Kathakali: A Timeless Dance Form',
        titleMl: 'കഥകളി: കാലാതീതമായ നാട്യവിസ്മയം',
        feedLabel: 'LIVE BROADCAST: MAIN STAGE',
        feedTitle: 'Kathakali: A Timeless Dance Form • Classical Dance Drama',
        videoUrl: 'https://www.youtube-nocookie.com/embed/nwiLwsgicno?autoplay=1&mute=1&playsinline=1&rel=0'
      },
      {
        id: 'featured-play',
        title: 'Narakasuravadham — Special Performance',
        titleMl: 'നരകാസുരവധം — വിശേഷാൽ അരങ്ങ്',
        feedLabel: 'FEATURED: NARAKASURAVADHAM',
        feedTitle: 'Narakasuravadham • Featured Kathakali Classical Drama',
        videoUrl: 'https://www.youtube-nocookie.com/embed/_DNBgVAk9GE?autoplay=1&mute=1&playsinline=1&rel=0'
      },
      {
        id: 'heritage',
        title: 'Ayroor Kathakali Gramam — Heritage',
        titleMl: 'അയ്രൂർ കഥകളി ഗ്രാമം — പൈതൃകം',
        feedLabel: 'FEED 3: AYROOR HERITAGE',
        feedTitle: 'Ayroor Kathakali Gramam • Living Heritage & Village Consecration',
        videoUrl: 'https://www.youtube-nocookie.com/embed/XSv10MlMbAA?autoplay=1&mute=1&playsinline=1&rel=0'
      }
    ]
  },

  // Sacred Kathakali Instruments Configuration
  instruments: [
    {
      id: 'chenda',
      index: '01',
      nameEn: 'Chenda',
      nameMl: 'ചെണ്ട',
      taglineEn: 'The Roar of Classical Drama',
      taglineMl: 'അസുരഭാവങ്ങളുടെ രൗദ്രതാളം',
      categoryEn: 'Avanaddha Vadhyam • Membranophone',
      categoryMl: 'അവനദ്ധ വാദ്യം • ചർമ്മവാദ്യം',
      roleBadgeEn: 'LEAD PERCUSSION',
      roleBadgeMl: 'പ്രധാന താളവാദ്യം',
      descEn: 'The undisputed monarch of Kathakali percussion. Dominating heroic (Veera), ferocious (Raudra), and fierce duel sequences, the Chenda produces dynamic, high-amplitude acoustic reverberations that command the entire amphitheater.',
      descMl: 'കഥകളിയുടെ പ്രധാന വാദ്യം. വീര-രൗദ്ര ഭാവങ്ങൾക്കും യുദ്ധരംഗങ്ങൾക്കും ജീവൻ നൽകുന്ന ഈ ചർമ്മവാദ്യം, പമ്പാതീരത്തെ രാവുകളിൽ മുഴങ്ങുന്ന പ്രൗഢമായ അസുരതാളമാണ്.',
      roleEn: 'Lead Percussion (Asura Vadhyam)',
      roleMl: 'പ്രധാന താളവാദ്യം (അസുരവാദ്യം)',
      materialEn: 'Seasoned Jackfruit Wood & Calfskin Parchment',
      materialMl: 'വരിക്കപ്ലാവിന്റെ തടിയും കാളത്തോലും',
      rhythmEn: 'Chembada, Panchari, Champa & Adantha Talas',
      rhythmMl: 'ചെമ്പട, പഞ്ചാരി, ചമ്പ, അടന്ത താളങ്ങൾ',
      quoteEn: '“When the Chenda speaks at dusk, the gods and demons awaken on the river sands.”',
      quoteMl: '“സന്ധ്യയ്ക്ക് ചെണ്ട മുഴങ്ങുമ്പോൾ, പമ്പാ മണൽത്തട്ടിൽ ഇതിഹാസ കഥാപാത്രങ്ങൾ ഉണരുന്നു.”',
      imageWebp: 'assets/images/instruments/chenda.webp',
      thumbWebp: 'assets/images/instruments/chenda-thumb.webp',
      altEn: 'Traditional Kathakali Chenda percussion drum',
      altMl: 'പരമ്പരാഗത കഥകളി ചെണ്ട'
    },
    {
      id: 'maddalam',
      index: '02',
      nameEn: 'Maddalam',
      nameMl: 'മദ്ദളം',
      taglineEn: 'The Divine Base Resonance',
      taglineMl: 'ദേവവാദ്യത്തിന്റെ ഗംഭീര നാദം',
      categoryEn: 'Upanga Vadhyam • Barrel Membranophone',
      categoryMl: 'ഉപാംഗ വാദ്യം • ശുദ്ധമദ്ദളം',
      roleBadgeEn: 'TONAL FOUNDATION',
      roleBadgeMl: 'നാദ അടിത്തറ',
      descEn: 'Tied around the waist and struck with both hands using rice-paste-hardened finger caps, the Maddalam provides the deep tonal base and intricate rhythmic cadence that grounds every abhinaya and foot movement.',
      descMl: 'അരയിൽ കെട്ടി ഇരുകൈകളാലും വായിക്കുന്ന മദ്ദളം കഥകളിക്ക് ഗംഭീരമായ നാദ അടിത്തറയേകുന്നു. വിരലുകളിൽ ചോറണി തേച്ച് ഉറപ്പിച്ച് നടത്തുന്ന വാദനം രംഗത്തിന് ദിവ്യമായ അന്തരീക്ഷം നൽകുന്നു.',
      roleEn: 'Tonal Bass Foundation (Deva Vadhyam)',
      roleMl: 'നാദ അടിത്തറ (ദേവവാദ്യം)',
      materialEn: 'Dense Jackfruit Trunk & Buffalo Hide Rings',
      materialMl: 'പ്ലാവിൻ തടിയും പോത്തിൻതോലും',
      rhythmEn: 'Keli, Maddala Keli & Thodayam Cadences',
      rhythmMl: 'കേളി, മദ്ദളക്കേളി, തോടയം',
      quoteEn: '“The Maddalam is the heartbeat that bridges the dancer’s soul with the rhythm of the cosmos.”',
      quoteMl: '“നർത്തകന്റെ ആത്മാവിനെ അരങ്ങുമായി ബന്ധിപ്പിക്കുന്ന ദിവ്യ ഹൃദയമിടിപ്പാണ് മദ്ദളം.”',
      imageWebp: 'assets/images/instruments/maddalam.webp',
      thumbWebp: 'assets/images/instruments/maddalam-thumb.webp',
      altEn: 'Kathakali Maddalam barrel percussion drum',
      altMl: 'കഥകളി ശുദ്ധമദ്ദളം'
    },
    {
      id: 'chengila-ilathalam',
      index: '03',
      nameEn: 'Chengila & Ilathalam',
      nameMl: 'ചെങ്ങിലയും ഇലത്താളവും',
      taglineEn: 'The Golden Keepers of Metric Tala',
      taglineMl: 'സംഗീതത്തിന്റെ താളപ്രമാണം',
      categoryEn: 'Ghana Vadhyam • Bell-Metal Idiophones',
      categoryMl: 'ഘനവാദ്യം • വെങ്കല വാദ്യങ്ങൾ',
      roleBadgeEn: 'METRIC GOVERNANCE',
      roleBadgeMl: 'താളനിയന്ത്രണം',
      descEn: 'The acoustic compass of Kathakali Sangeetham. The lead singer (Ponani) strikes the bell-metal Chengila gong to govern the tempo, while the secondary singer (Singidi) clashes the heavy bronze Ilathalam cymbals to reinforce the meter.',
      descMl: 'കഥകളി സംഗീതത്തിന്റെ താളനിയന്ത്രണം. പൊന്നാനി ഗായകൻ ചെങ്ങില കൊട്ടി താളഗതി നിശ്ചയിക്കുമ്പോൾ, ശിങ്കിടി ഗായകൻ ഇലത്താളം മുട്ടി പാട്ടിന്റെയും ആട്ടത്തിന്റെയും താളക്രമം നിലനിർത്തുന്നു.',
      roleEn: 'Vocal Leadership & Metric Timing',
      roleMl: 'ഗായക നേതൃത്വവും താളനിയന്ത്രണവും',
      materialEn: 'Forged Bell-Metal Bronze (Odu Alloy)',
      materialMl: 'പരമ്പരാഗത ഓട് (വെങ്കലക്കൂട്ട്)',
      rhythmEn: 'Tala Governing (Triputa, Ekathalam, Chembada)',
      rhythmMl: 'താളനിയന്ത്രണം (ത്രിപുട, ഏകതാളം, ചെമ്പട)',
      quoteEn: '“In the clear metallic resonance of the Chengila resides the destiny of every sung stanza.”',
      quoteMl: '“ചെങ്ങിലയുടെ ശുദ്ധനാദത്തിലാണ് ഓരോ പദത്തിന്റെയും ആയുസ്സ് കുടികൊള്ളുന്നത്.”',
      imageWebp: 'assets/images/instruments/chengila-and-ilathalam.webp',
      thumbWebp: 'assets/images/instruments/chengila-and-ilathalam-thumb.webp',
      altEn: 'Chengila gong and Ilathalam bronze cymbals of Kathakali',
      altMl: 'കഥകളി ചെങ്ങിലയും ഇലത്താളവും'
    },
    {
      id: 'idakka',
      index: '04',
      nameEn: 'Idakka',
      nameMl: 'ഇടയ്ക്ക',
      taglineEn: 'The Sacred Melodic Hourglass',
      taglineMl: 'സോപാന സംഗീതത്തിന്റെ നാദവിസ്മയം',
      categoryEn: 'Deva Vadhyam • Variable-Tension Hourglass Drum',
      categoryMl: 'ദേവവാദ്യം • സോപാന വാദ്യം',
      roleBadgeEn: 'LYRICAL & MELODIC',
      roleBadgeMl: 'രാഗനാദം & ലളിതം',
      descEn: 'The sanctified hourglass drum of Sopanam tradition. Replaces the Chenda during female character scenes (Sthreevesham) and lyrical, romantic sequences, capable of producing delicate vocal melody notes across two octaves.',
      descMl: 'ക്ഷേത്ര സോപാന പാരമ്പര്യത്തിന്റെ പവിത്ര വാദ്യം. സ്ത്രീവേഷങ്ങൾക്കും ശൃംഗാര-കരുണ രസങ്ങൾക്കും ചെണ്ടയ്ക്ക് പകരമായി ഇടയ്ക്ക വായിക്കുന്നു. സപ്തസ്വരങ്ങൾ പൊഴിക്കാൻ കഴിയുന്ന അപൂർവ്വ വാദ്യമാണിത്.',
      roleEn: 'Sthreevesham & Melodic Lyrical Moods',
      roleMl: 'സ്ത്രീവേഷങ്ങളും ലളിത ശൃംഗാര ഭാവങ്ങളും',
      materialEn: 'Red Sandalwood & Intestinal Skin Parchment',
      materialMl: 'രക്തചന്ദന തടിയും സൂക്ഷ്മ ചർമ്മവും',
      rhythmEn: 'Sopana Sangeetham & Sthreevesham Thalam',
      rhythmMl: 'സോപാന സംഗീതം, സ്ത്രീവേഷ താളങ്ങൾ',
      quoteEn: '“When the Idakka hums, the celestial apsaras themselves descend upon the Pamba sands.”',
      quoteMl: '“ഇടയ്ക്ക നാദമുണരുമ്പോൾ, അപ്സരസ്സുകൾ പമ്പാ മണപ്പുറത്തേക്ക് ഇറങ്ങിവരുന്നു.”',
      imageWebp: 'assets/images/instruments/idakka.webp',
      thumbWebp: 'assets/images/instruments/idakka-thumb.webp',
      altEn: 'Idakka sacred hourglass percussion instrument',
      altMl: 'പവിത്രമായ ഇടയ്ക്ക വാദ്യം'
    }
  ],

  // Navigation menu structure for the multipage website (6 Architectural Groups)
  navigation: [
    { id: 'about', label: 'About Us', labelMl: 'ഞങ്ങളെക്കുറിച്ച്', href: 'about.html' },
    { id: 'mela', label: 'Kathakali Mela', labelMl: 'കഥകളി മേള', href: 'mela.html' },
    { id: 'awards', label: 'Awards', labelMl: 'പുരസ്കാരങ്ങൾ', href: 'awards.html' },
    { id: 'gallery', label: 'Gallery', labelMl: 'ചിത്രശാല', href: 'gallery.html' },
    { id: 'explore-kathakali', label: 'Explore Kathakali', labelMl: 'കഥകളി പരിചയം', href: 'mudras.html' },
    { id: 'kathakali-mudras', label: 'Kathakali Mudras', labelMl: 'കഥകളി മുദ്രകൾ', href: 'mudras.html' },
    { id: 'kathakali-characters', label: 'Kathakali Characters', labelMl: 'കഥകളി വേഷങ്ങൾ', href: 'characters.html' },
    { id: 'kathakali-instruments', label: 'Kathakali Instruments', labelMl: 'കഥകളി വാദ്യങ്ങൾ', href: 'instruments.html' },
    { id: 'contact', label: 'Contact Us', labelMl: 'ബന്ധപ്പെടുക', href: 'contact.html' }
  ],

  // Multilingual content strings (Separated into dedicated locale files: js/locales/en.js, js/locales/ml.js via js/i18n.js)
  get i18n() {
    if (typeof window !== 'undefined' && window.AYROOR_LOCALE_EN && window.AYROOR_LOCALE_ML) {
      return {
        en: window.AYROOR_LOCALE_EN,
        ml: window.AYROOR_LOCALE_ML
      };
    }
    if (typeof window !== 'undefined' && window.CONFIG && window.CONFIG.i18n && window.CONFIG.i18n.en) {
      return window.CONFIG.i18n;
    }
    return { en: {}, ml: {} };
  }
};

// Global export for universal browser access
if (typeof window !== 'undefined') {
  window.CONFIG = Object.assign(window.CONFIG || {}, CONFIG);
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}

