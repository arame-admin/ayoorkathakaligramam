/**
 * DISTRICT KATHAKALI CLUB (ജില്ലാ കഥകളി ക്ലബ്ബ്, പത്തനംതിട്ട)
 * Year-wise Award Archive & Interactive Portal Controller
 * ============================================================================
 * Official Archive Data: 2000 — 2026
 * Features:
 *   - Real-time search by Recipient (ML/EN), Award, Discipline, Year
 *   - Category & Discipline Multi-Filters
 *   - Quick-Jump Year Navigation & Decade Tabs
 *   - Year-wise Grouped Grid, Chronological Timeline & Compact Ledger views
 *   - Royal Kerala Ceremonial Citation Modal (ആദരപത്രം)
 *   - Strict Bilingual Synchronization (English & Malayalam)
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 1. HISTORICAL ARCHIVE DATASET (44 CONFERRED CITATIONS) ---
  const AWARDS_DATA = [
    // 2000
    {
      id: "award-2000-1",
      year: 2000,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Padmashree Dr. Kalamandalam Gopi",
      recipientMl: "പത്മശ്രീ ഡോ. കലാമണ്ഡലം ഗോപി",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Legendary maestro of Paccha vesham, renowned for peerless depictions of Nala, Karna, and Arjuna across six decades of unbroken stage glory.",
      citationMl: "പച്ച വേഷത്തിലെ അനശ്വര ഇതിഹാസം; നളൻ, കർണ്ണൻ, അർജ്ജുനൻ തുടങ്ങിയ വേഷപ്പകർച്ചകളിലൂടെ ആറ് പതിറ്റാണ്ടിലേറെയായി അരങ്ങ് വാഴുന്ന കുലപതി.",
      icon: "kireedam"
    },
    // 2001
    {
      id: "award-2001-1",
      year: 2001,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Mankombu Sivasankara Pillai",
      recipientMl: "മങ്കൊമ്പ് ശിവശങ്കരപ്പിള്ള",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Doyen of Southern (Thekkan) Kalari style, celebrated for majestic portrayals of Kathi and Paccha characters and dazzling manodharma.",
      citationMl: "തെക്കൻ കളരി സമ്പ്രദായത്തിന്റെ പ്രഗത്ഭ ആചാര്യൻ; കത്തി, പച്ച വേഷങ്ങളിലെ ഗാംഭീര്യവും മനോധർമ്മ വിലാസവും കൊണ്ട് അനുഗ്രഹീതൻ.",
      icon: "kireedam"
    },
    // 2002
    {
      id: "award-2002-1",
      year: 2002,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Gothreeswaran",
      recipientMl: "കലാമണ്ഡലം ഗോത്രീശ്വരൻ",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Honored for technical perfection, aesthetic discipline, and masterly portrayals of noble and heroic characters.",
      citationMl: "അരങ്ങിലെ സാങ്കേതിക പൂർണ്ണതയും ലാസ്യ-താണ്ഡവ ഭാവങ്ങളുടെ കൃത്യതയും കൊണ്ട് ആസ്വാദകരെ വിസ്മയിപ്പിച്ച കഥകളി ആചാര്യൻ.",
      icon: "kireedam"
    },
    // 2003
    {
      id: "award-2003-1",
      year: 2003,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Haiderali",
      recipientMl: "കലാമണ്ഡലം ഹൈദരാലി",
      disciplineEn: "Sangeetham (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Revolutionary voice of Kathakali who infused lyrical sweetness, deep bhava, and secular devotional beauty into stage music.",
      citationMl: "കഥകളി സംഗീതത്തെ ജനകീയമാക്കുകയും രാഗഭാവങ്ങളുടെ അനുപമ മാധുര്യം കൊണ്ട് ആസ്വാദകഹൃദയങ്ങളെ കവർന്ന വിപ്ലവ ഗായകൻ.",
      icon: "swaram"
    },
    // 2004
    {
      id: "award-2004-1",
      year: 2004,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Thonnakkal Peethambaran",
      recipientMl: "തൊന്നയ്ക്കൽ പീതാംബരൻ",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Master exponent of Southern style Kathakali with extraordinary abhinaya depth and stage dynamism.",
      citationMl: "തെക്കൻ ചിട്ടയുടെ കരുത്തും സ്വാഭാവിക അഭിനയ പ്രതിഭയും ഒത്തിണങ്ങിയ പ്രഗത്ഭ നടന വിസ്മയം.",
      icon: "kireedam"
    },
    // 2005
    {
      id: "award-2005-1",
      year: 2005,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Ramankutty Nair",
      recipientMl: "കലാമണ്ഡലം രാമൻകുട്ടി നായർ",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Legendary monarch of Kathi and Thadi veshams whose Ravana, Duryodhana, and Hanuman set the golden standard for centuries.",
      citationMl: "കത്തി, വെള്ളത്താടി വേഷങ്ങളുടെ ചക്രവർത്തി; രാവണൻ, കീചകൻ, ഹനുമാൻ തുടങ്ങിയ വേഷപ്പകർച്ചകളിലെ അതുല്യ നാട്യഗുരു.",
      icon: "kireedam"
    },
    // 2006
    {
      id: "award-2006-1",
      year: 2006,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Pathiyoor Sankarankutty",
      recipientMl: "പത്തിയൂർ ശങ്കരൻകുട്ടി",
      disciplineEn: "Sangeetham (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Foremost contemporary vocalist of Kathakali renowned for sonorous vocal clarity, emotional resonance, and raga perfection.",
      citationMl: "അരങ്ങിന്റെ നാദസൗകുമാര്യവും സാഹിത്യ ശുദ്ധിയും മുറുകിയ രാഗതാള വിന്യാസവും കൊണ്ട് തിളങ്ങുന്ന പ്രമുഖ കഥകളി ഗായകൻ.",
      icon: "swaram"
    },
    // 2007
    {
      id: "award-2007-1",
      year: 2007,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Thiruvalla Gopikuttan Nair",
      recipientMl: "തിരുവല്ല ഗോപിക്കുട്ടൻ നായർ",
      disciplineEn: "Sangeetham (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Renowned Kathakali vocalist whose sweet diction and deep grounding in Sopanam tradition enriched Travancore stages.",
      citationMl: "മദ്ധ്യതിരുവിതാംകൂറിലെ സജീവ സംഗീത സാന്നിധ്യം; പദങ്ങളുടെ ലാവണ്യവും ഭാവതീവ്രതയും തെളിഞ്ഞുനിന്ന ഗായക പ്രമുഖൻ.",
      icon: "swaram"
    },
    // 2008
    {
      id: "award-2008-1",
      year: 2008,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Pallom Madhu",
      recipientMl: "പള്ളം മധു",
      disciplineEn: "Samagra Sambhavana (Lifetime Contribution)",
      disciplineMl: "സമഗ്രസംഭാവന",
      disciplineKey: "samagra",
      citationEn: "Conferred for monumental lifelong contributions to Kathakali research, training, and institutional patronship.",
      citationMl: "കഥകളി പ്രസ്ഥാനത്തിനും പാരമ്പര്യ കലാരംഗത്തിനും നൽകിയ സമഗ്രവും അമൂല്യവുമായ ആയുഷ്കാല സംഭാവനകളെ മാനിച്ച്.",
      icon: "garland"
    },
    // 2009
    {
      id: "award-2009-1",
      year: 2009,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Nelliyodu Vasudevan Namboodiri",
      recipientMl: "നെല്ലിയോട് വാസുദേവൻ നമ്പൂതിരി",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "The undisputed emperor of Chuvanna Thadi (Red Beard) and demonic characterization, unmatched in frightening majestic fury.",
      citationMl: "ചുവന്ന താടി, കരി വേഷങ്ങളുടെ അതികായൻ; അസുര ഭാവങ്ങളുടെ രൗദ്രസൗന്ദര്യത്തെ അരങ്ങിൽ പൂർണ്ണതയിലെത്തിച്ച കലാകാരൻ.",
      icon: "kireedam"
    },
    // 2010
    {
      id: "award-2010-1",
      year: 2010,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Radhakrishnan",
      recipientMl: "കലാമണ്ഡലം രാധാകൃഷ്ണൻ",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Distinguished practitioner praised for exquisite mudra precision, expressive abhinaya, and dedication to Kathakali pedagogy.",
      citationMl: "മുദ്രകളുടെയും പദവിന്യാസങ്ങളുടെയും ശുദ്ധി കാത്തുസൂക്ഷിച്ചുകൊണ്ട് സാത്വിക-രാജസ വേഷങ്ങളെ അവിസ്മരണീയമാക്കിയ നടൻ.",
      icon: "kireedam"
    },
    // 2011
    {
      id: "award-2011-1",
      year: 2011,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Mathoor Govindankutty",
      recipientMl: "മാത്തൂർ ഗോവിന്ദൻകുട്ടി",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Celebrated master of Minukku and female veshams, whose tender grace and psychological subtlety defined feminine character portrayals.",
      citationMl: "മിനുക്ക്, സ്ത്രീവേഷങ്ങളിൽ അരങ്ങിന് ചാരുതയേകിയ ലാവണ്യ പ്രതിഭ; കുന്തി, ദമയന്തി, മോഹിനി എന്നീ വേഷങ്ങളിലെ കുലപതി.",
      icon: "kireedam"
    },
    // 2012
    {
      id: "award-2012-1",
      year: 2012,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Krishnankutty",
      recipientMl: "കലാമണ്ഡലം കൃഷ്ണൻകുട്ടി",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Venerable actor praised for his portrayal of noble heroes and strict adherence to classical grammar.",
      citationMl: "ശാന്ത-സാത്വിക വേഷപ്പകർച്ചകളിലും ശാസ്ത്രീയ അഭിനയ മുറകളിലും പതിറ്റാണ്ടുകളുടെ പരിചയസമ്പത്തുള്ള പ്രതിഭ.",
      icon: "kireedam"
    },
    // 2013
    {
      id: "award-2013-1",
      year: 2013,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Balasubrahmanian",
      recipientMl: "കലാമണ്ഡലം ബാലസുബ്രഹ്മണ്യൻ",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Leading exponent of northern kalari tradition, acclaimed for dynamic footwork and expressive eyes in major roles.",
      citationMl: "വടക്കൻ കളരി ചിട്ടയുടെ ആഴമേറിയ അഭിനയ വിലാസവും പച്ച-കത്തി വേഷങ്ങളിലെ ചടുലതയും കൊണ്ട് പ്രശസ്തനായ നടൻ.",
      icon: "kireedam"
    },
    {
      id: "award-2013-2",
      year: 2013,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Dr. P. Venugopalan",
      recipientMl: "ഡോ. പി. വേണുഗോപാലൻ",
      disciplineEn: "Literature (Classical Theatre Scholarship)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Eminent Sanskrit scholar, author, and researcher awarded for seminal critical commentaries on Attakkatha literature.",
      citationMl: "ആട്ടക്കഥാ സാഹിത്യത്തിലും സംസ്കൃത നാട്യശാസ്ത്രത്തിലും മൗലികമായ ഗവേഷണ പഠനങ്ങൾ നടത്തിയ പണ്ഡിത ശ്രേഷ്ഠൻ.",
      icon: "leaf"
    },
    // 2014
    {
      id: "award-2014-1",
      year: 2014,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kottakkal Madhu",
      recipientMl: "കോട്ടയ്ക്കൽ മധു",
      disciplineEn: "Sangeetham (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Acclaimed chief vocalist of PSV Natyasangham Kottakkal, renowned for microtonal precision and soulful bhava.",
      citationMl: "പി.എസ്.വി. നാട്യസംഘം കോട്ടയ്ക്കലിന്റെ പ്രഥമ ഗായകൻ; രാഗങ്ങളുടെ ശുദ്ധിയും ആലാപനത്തിലെ സൗന്ദര്യവും കൊണ്ട് പ്രശസ്തൻ.",
      icon: "swaram"
    },
    {
      id: "award-2014-2",
      year: 2014,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "P. Kaladharan",
      recipientMl: "പി. കലാധരൻ",
      disciplineEn: "Literature (Art Criticism & Cultural Essays)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Prominent art critic and writer recognized for incisive documentation and aesthetic evaluation of Kathakali performances.",
      citationMl: "കഥകളി നിരൂപണ രംഗത്തും ദൃശ്യകലാ പഠനങ്ങളിലും ശ്രദ്ധേയമായ സംഭാവനകൾ അർപ്പിച്ച പ്രമുഖ കലാ നിരൂപകൻ.",
      icon: "leaf"
    },
    // 2015
    {
      id: "award-2015-1",
      year: 2015,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Achuthanandan",
      recipientMl: "കലാമണ്ഡലം അച്യുതാനന്ദൻ",
      disciplineEn: "Maddalam (Classical Drum Accompaniment)",
      disciplineMl: "മദ്ദളം",
      disciplineKey: "maddalam",
      citationEn: "Virtuoso Maddalam exponent whose resonant strokes and rhythmic synergy elevated countless performances across Kerala.",
      citationMl: "മേളക്കരുത്തും മാധുര്യവും സമന്വയിപ്പിച്ച മദ്ദള വാദ്യ പ്രവീണൻ; അരങ്ങിന് താളഭദ്രതയും ഗാംഭീര്യവും നൽകിയ ആചാര്യൻ.",
      icon: "drum"
    },
    {
      id: "award-2015-2",
      year: 2015,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Dr. Vellinezhi Achuthankutty",
      recipientMl: "ഡോ. വെള്ളിനേഴി അച്യുതൻകുട്ടി",
      disciplineEn: "Literature (Classical Theatre Scholarship)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Honored for profound scholarship in Kerala classical theatre, playwriting, and authoritative historical treatises.",
      citationMl: "കേരളീയ രംഗകലാ ചരിത്രത്തിലും നാട്യശാസ്ത്ര തത്ത്വങ്ങളിലും ആഴത്തിലുള്ള ഗ്രന്ഥരചനകൾ നടത്തിയ ഗവേഷകൻ.",
      icon: "leaf"
    },
    // 2016
    {
      id: "award-2016-1",
      year: 2016,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Unnikrishnan",
      recipientMl: "കലാമണ്ഡലം ഉണ്ണികൃഷ്ണൻ",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Veteran Kathakali actor acclaimed for classical poise, expressive eye movements, and adherence to tradition.",
      citationMl: "ശാസ്ത്രീയതയും ഭാവതീവ്രതയും ഒത്തിണങ്ങിയ അഭിനയത്തിലൂടെ ശ്രദ്ധേയനായ മുതിർന്ന കഥകളി നടൻ.",
      icon: "kireedam"
    },
    {
      id: "award-2016-2",
      year: 2016,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Subhadra (Deepa Namboodirippad)",
      recipientMl: "സുഭദ്ര (ദീപ നമ്പൂതിരിപ്പാട്)",
      disciplineEn: "Literature (Attakkatha Playwriting & Poetry)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Celebrated playwright and poet recognized for new lyrical Attakkathas enriching the classical repertory.",
      citationMl: "പുതിയ ആട്ടക്കഥാ രചനകളിലൂടെയും നാട്യ സാഹിത്യ സംഭാവനകളിലൂടെയും കഥകളി വേദിയെ സമ്പന്നമാക്കിയ സാഹിത്യകാരി.",
      icon: "leaf"
    },
    {
      id: "award-2016-3",
      year: 2016,
      awardEn: "Thonnakkal Sangeetharatnam Award",
      awardMl: "തൊന്നയ്ക്കൽ സംഗീതരത്നം അവാർഡ്",
      awardKey: "sangeetharatnam",
      recipientEn: "Vanchiyoor M. K. Sankaran Namboodiri",
      recipientMl: "വഞ്ചിയൂർ എം. കെ. ശങ്കരൻ നമ്പൂതിരി",
      disciplineEn: "Music (Classical Kathakali & Carnatic Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Distinguished Carnatic and Kathakali vocal maestro recognized for melodic depth, raga purity, and devotion.",
      citationMl: "ക്ലാസിക്കൽ സംഗീതത്തിലും കഥകളി ഗാനശാഖയിലും ഒരുപോലെ പ്രാഗത്ഭ്യം തെളിയിച്ച പ്രശസ്ത സംഗീതജ്ഞൻ.",
      icon: "swaram"
    },
    // 2017
    {
      id: "award-2017-1",
      year: 2017,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Peesappilly Rajeevan",
      recipientMl: "പീസാപ്പള്ളി രാജീവൻ",
      disciplineEn: "Chutti (Facial Makeup Architecture & Aharya)",
      disciplineMl: "ചുട്ടി",
      disciplineKey: "chutti",
      citationEn: "Master artist of Chutti and Aharya, crafting three-dimensional rice-paste facial architecture that defines characters.",
      citationMl: "കഥകളിയുടെ ആഹാര്യ സൗന്ദര്യത്തിന്റെ ശില്പി; ചുട്ടി കുത്തുന്നതിലെ സൂക്ഷ്മതയും പൂർണ്ണതയും കൊണ്ട് പ്രശസ്തനായ വിദഗ്ദ്ധൻ.",
      icon: "brush"
    },
    {
      id: "award-2017-2",
      year: 2017,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "V. R. Vimalraj",
      recipientMl: "വി. ആർ. വിമൽരാജ്",
      disciplineEn: "Literature (Theatre Documentation & Critique)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Awarded for comprehensive literary analysis, historical chronicles, and essays on Kerala dance-drama.",
      citationMl: "കഥകളി ഗ്രന്ഥങ്ങളിലൂടെയും ലേഖനങ്ങളിലൂടെയും ക്ലാസിക്കൽ നാട്യപാരമ്പര്യത്തെ വിശകലനം ചെയ്ത എഴുത്തുകാരൻ.",
      icon: "leaf"
    },
    {
      id: "award-2017-3",
      year: 2017,
      awardEn: "Thonnakkal Sangeetharatnam Award",
      awardMl: "തൊന്നയ്ക്കൽ സംഗീതരത്നം അവാർഡ്",
      awardKey: "sangeetharatnam",
      recipientEn: "Adoor Biju",
      recipientMl: "അടൂർ ബിജു",
      disciplineEn: "Music (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Gifted young vocal talent renowned for evocative rendition of classical padams and stage synchronization.",
      citationMl: "ഭാവഗാംഭീര്യമുള്ള ആലാപന ശൈലികൊണ്ട് ശ്രദ്ധേയനായ പ്രമുഖ യുവ കഥകളി സംഗീത പ്രതിഭ.",
      icon: "swaram"
    },
    // 2018
    {
      id: "award-2018-1",
      year: 2018,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Inakkad Sivasankara Pillai",
      recipientMl: "ഇണക്കോട് ശിവശങ്കരൻ പിള്ള",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Venerable actor from Central Travancore celebrated for authentic Southern kalari grammar and profound devotion.",
      citationMl: "മദ്ധ്യതിരുവിതാംകൂറിന്റെ കഥകളി പെരുമ കാത്തുസൂക്ഷിച്ച മുതിർന്ന നടൻ; ഭക്തിസാന്ദ്രമായ വേഷങ്ങളിലെ ആചാര്യൻ.",
      icon: "kireedam"
    },
    {
      id: "award-2018-2",
      year: 2018,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Dr. N. P. Vijayakrishnan",
      recipientMl: "ഡോ. എൻ. പി. വിജയകൃഷ്ണൻ",
      disciplineEn: "Literature (Kathakali Aesthetics & Criticism)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Distinguished academic and author who has authored foundational works on Kathakali aesthetics and dramaturgy.",
      citationMl: "കഥകളി സൗന്ദര്യശാസ്ത്രത്തിലും രംഗഭാഷയിലും വിലപ്പെട്ട സംഭാവനകൾ നൽകിയ സാഹിത്യ ഗവേഷകൻ.",
      icon: "leaf"
    },
    {
      id: "award-2018-3",
      year: 2018,
      awardEn: "Thonnakkal Sangeetharatnam Award",
      awardMl: "തൊന്നയ്ക്കൽ സംഗീതരത്നം അവാർഡ്",
      awardKey: "sangeetharatnam",
      recipientEn: "Manjula V. Sreekumar",
      recipientMl: "മഞ്ജുള വി. ശ്രീകുമാർ",
      disciplineEn: "Music (Classical Sopanam & Stage Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Pioneering female vocalist recognized for musical excellence, lyrical purity, and dedication to the art form.",
      citationMl: "കഥകളി സംഗീത രംഗത്ത് വ്യക്തിമുദ്ര പതിപ്പിച്ച പ്രഗത്ഭ വനിതാ സംഗീതജ്ഞ; ശ്രുതിശുദ്ധമായ ആലാപന ശൈലി.",
      icon: "swaram"
    },
    // 2019
    {
      id: "award-2019-1",
      year: 2019,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Jayaprakash",
      recipientMl: "കലാമണ്ഡലം ജയപ്രകാശ്",
      disciplineEn: "Sangeetham (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Master vocalist from Kerala Kalamandalam whose rich voice and expressive nuance guide actors seamlessly through navarasas.",
      citationMl: "കേരള കലാമണ്ഡലത്തിലെ പ്രമുഖ അധ്യാപകനും ഗായകനും; പദങ്ങളിലെ ഭാവതീവ്രത അരങ്ങിൽ പകർന്നു നൽകുന്ന ആചാര്യൻ.",
      icon: "swaram"
    },
    {
      id: "award-2019-2",
      year: 2019,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "K. B. Rajanand",
      recipientMl: "കെ. ബി. രാജാനന്ദ്",
      disciplineEn: "Literature (Playwriting & Historiography)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Honored for creative Attakkatha writing, scriptual adaptations of classical epics, and theatre research.",
      citationMl: "ആട്ടക്കഥാ സാഹിത്യ ശാഖയിലെ സർഗ്ഗാത്മക രചനകൾക്കും സാംസ്കാരിക പഠനങ്ങൾക്കുമായി നൽകിയ അംഗീകാരം.",
      icon: "leaf"
    },
    {
      id: "award-2019-3",
      year: 2019,
      awardEn: "Thonnakkal Sangeetharatnam Award",
      awardMl: "തൊന്നയ്ക്കൽ സംഗീതരത്നം അവാർഡ്",
      awardKey: "sangeetharatnam",
      recipientEn: "Ananthu V. Sreenivasan",
      recipientMl: "അനന്തു വി. ശ്രീനിവാസൻ",
      disciplineEn: "Music (Classical Stage Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Accomplished vocalist acclaimed for sweet resonance, raga mastery, and dynamic support to classical abhinaya.",
      citationMl: "രാഗഭാവങ്ങളുടെ മനോഹരമായ ആവിഷ്കാരത്തിലൂടെ കഥകളി അരങ്ങുകളിൽ പ്രശംസ നേടിയ യുവ സംഗീതജ്ഞൻ.",
      icon: "swaram"
    },
    // 2020
    {
      id: "award-2020-1",
      year: 2020,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Unnikrishnan",
      recipientMl: "കലാമണ്ഡലം ഉണ്ണികൃഷ്ണൻ",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Conferred for sustained mastery in classical role interpretations and lifetime service to training disciples.",
      citationMl: "കഥകളി രംഗത്തെ അവിസ്മരണീയമായ വേഷപ്പകർച്ചകൾക്കും ശിഷ്യപരമ്പരയെ വാർത്തെടുത്തതിനും നൽകിയ പരമോന്നത ആദരം.",
      icon: "kireedam"
    },
    {
      id: "award-2020-2",
      year: 2020,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Dr. Manoj Kurur",
      recipientMl: "ഡോ. മനോജ് കുറൂർ",
      disciplineEn: "Literature (Poetry & Classical Theatre Critique)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Celebrated poet, lyricist, and scholar honored for monumental contributions to Kerala rhythm and theatre aesthetics.",
      citationMl: "പ്രശസ്ത കവിയും സാഹിത്യകാരനും; കേരളീയ താളശാസ്ത്രത്തിലും നാട്യകലയിലും നടത്തിയ ശ്രദ്ധേയമായ ഗവേഷണങ്ങൾക്ക്.",
      icon: "leaf"
    },
    {
      id: "award-2020-3",
      year: 2020,
      awardEn: "Thonnakkal Sangeetharatnam Award",
      awardMl: "തൊന്നയ്ക്കൽ സംഗീതരത്നം അവാർഡ്",
      awardKey: "sangeetharatnam",
      recipientEn: "Kalamandalam Rajesh Menon",
      recipientMl: "കലാമണ്ഡലം രാജേഷ് മേനോൻ",
      disciplineEn: "Music (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Acclaimed singer celebrated for soulful delivery of slow padams and high-tempo dramatic climaxes.",
      citationMl: "പതിഞ്ഞ പദങ്ങളുടെ ആലക്തിക ഭാവവും മുറുകിയ സന്ദർഭങ്ങളിലെ താളസമന്വയവും സമർത്ഥമായി നിർവ്വഹിക്കുന്ന ഗായകൻ.",
      icon: "swaram"
    },
    {
      id: "award-2020-4",
      year: 2020,
      awardEn: "O. M. S. Gopalakrishnan Nair Award",
      awardMl: "ഒ.എം.എസ്. ഗോപാലകൃഷ്ണൻ നായർ അവാർഡ്",
      awardKey: "gopalakrishnan",
      recipientEn: "Dr. P. K. Rajashekharan",
      recipientMl: "ഡോ. പി. കെ. രാജശേഖരൻ",
      disciplineEn: "Literary Criticism & Journalism",
      disciplineMl: "സാഹിത്യ നിരൂപണം",
      disciplineKey: "literature",
      citationEn: "Renowned literary critic and cultural historian recognized for insightful essays on classical arts and literature.",
      citationMl: "മലയാള സാഹിത്യ നിരൂപണ രംഗത്തെ പ്രമുഖൻ; ക്ലാസിക്കൽ സംസ്കാരത്തെയും സാഹിത്യത്തെയും കുറിച്ചുള്ള ഉജ്ജ്വലമായ പഠനങ്ങൾക്ക്.",
      icon: "leaf"
    },
    // 2023
    {
      id: "award-2023-1",
      year: 2023,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Sankarankutty",
      recipientMl: "കലാമണ്ഡലം ശങ്കരൻകുട്ടി",
      disciplineEn: "Maddalam (Classical Drum Accompaniment)",
      disciplineMl: "മദ്ദളം",
      disciplineKey: "maddalam",
      citationEn: "Venerable Maddalam acharya whose rhythmic precision and tonality have elevated Kathakali stages for over four decades.",
      citationMl: "മദ്ദള വാദ്യ കലയിലെ മുതിർന്ന കുലപതി; നാദവിശുദ്ധിയും തികഞ്ഞ താളഭദ്രതയും കൊണ്ട് കഥകളി അരങ്ങുകളെ ധന്യമാക്കിയ ആചാര്യൻ.",
      icon: "drum"
    },
    {
      id: "award-2023-2",
      year: 2023,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Dr. T. S. Madhavankutty",
      recipientMl: "ഡോ. ടി. എസ്. മാധവൻകുട്ടി",
      disciplineEn: "Literature (Classical Theatre Scholarship)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Eminent scholar and author recognized for comprehensive studies on Kathakali literature and stage traditions.",
      citationMl: "കഥകളി സാഹിത്യത്തിലും രംഗപാഠങ്ങളിലും സമഗ്രമായ ഗവേഷണം നടത്തിയ പ്രമുഖ സാഹിത്യ പണ്ഡിതൻ.",
      icon: "leaf"
    },
    {
      id: "award-2023-3",
      year: 2023,
      awardEn: "Thonnakkal Sangeetharatnam Award",
      awardMl: "തൊന്നയ്ക്കൽ സംഗീതരത്നം അവാർഡ്",
      awardKey: "sangeetharatnam",
      recipientEn: "Ananthu V. S.",
      recipientMl: "അനന്തു വി. എസ്.",
      disciplineEn: "Music (Classical Stage Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Gifted young vocal master praised for rich vocal texture, emotive delivery, and lyrical articulation.",
      citationMl: "ശ്രവണസുഖമുള്ള നാദവിന്യാസവും സാഹിത്യസ്ഫുടതയും കൊണ്ട് ശ്രദ്ധേയനായ യുവ കഥകളി സംഗീതജ്ഞൻ.",
      icon: "swaram"
    },
    {
      id: "award-2023-4",
      year: 2023,
      awardEn: "O. M. S. Gopalakrishnan Nair Award",
      awardMl: "ഒ.എം.എസ്. ഗോപാലകൃഷ്ണൻ നായർ അവാർഡ്",
      awardKey: "gopalakrishnan",
      recipientEn: "K. K. Jayakumar",
      recipientMl: "കെ. കെ. ജയകുമാർ",
      disciplineEn: "Cultural Contribution & Leadership",
      disciplineMl: "സാംസ്കാരിക സംഭാവന",
      disciplineKey: "samagra",
      citationEn: "Honored for dedicated leadership, arts patronship, and tireless promotion of traditional Kerala cultural heritage.",
      citationMl: "കേരളീയ പാരമ്പര്യ കലകളുടെ പ്രചാരണത്തിനും സാംസ്കാരിക പ്രവർത്തനങ്ങൾക്കും നൽകിയ മാതൃകാപരമായ സംഭാവനകൾക്ക്.",
      icon: "garland"
    },
    // 2024
    {
      id: "award-2024-1",
      year: 2024,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Harikadakom Trivikraman",
      recipientMl: "ഹരികടകം ത്രിവിക്രമൻ",
      disciplineEn: "Chutti (Facial Makeup Architecture & Aharya)",
      disciplineMl: "ചുട്ടി",
      disciplineKey: "chutti",
      citationEn: "Master craftsman of facial ridge geometry and traditional makeup, sculpting the iconic character expressions on the green room mat.",
      citationMl: "കഥകളി അണിയറയിലെ അത്ഭുത ശില്പി; ചുട്ടിയിടലിലെ അളവുകോലുകളുടെ കൃത്യതയും ചാരുതയും കൊണ്ട് വേറിട്ടുനിൽക്കുന്ന ആചാര്യൻ.",
      icon: "brush"
    },
    {
      id: "award-2024-2",
      year: 2024,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Mini Subhash",
      recipientMl: "മിനി സുഭാഷ്",
      disciplineEn: "Literature (Classical Writing & Critique)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Conferred for valuable contributions to Kathakali literature, theatrical documentation, and cultural journalism.",
      citationMl: "കഥകളി സാഹിത്യത്തിനും ആട്ടക്കഥാ ഗവേഷണങ്ങൾക്കും വിലപ്പെട്ട സംഭാവനകൾ അർപ്പിച്ച എഴുത്തുകാരി.",
      icon: "leaf"
    },
    // 2025
    {
      id: "award-2025-1",
      year: 2025,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Sadanam Bhasi",
      recipientMl: "സദനം ഭാസി",
      disciplineEn: "Vesham (Acting & Classical Performance)",
      disciplineMl: "വേഷം",
      disciplineKey: "vesham",
      citationEn: "Master actor of the Sadanam Kalari school, widely celebrated for intricate rasa-abhinaya, noble Paccha, and nuanced Kathi portrayals.",
      citationMl: "സദനം ചിട്ടയുടെ കരുത്തുറ്റ വക്താവ്; രസാഭിനയത്തിലും മുദ്രാശുദ്ധിയിലും അതുല്യമായ പ്രാഗത്ഭ്യം തെളിയിച്ച പ്രമുഖ നടൻ.",
      icon: "kireedam"
    },
    {
      id: "award-2025-2",
      year: 2025,
      awardEn: "Thonnakkal Kochupillai Award",
      awardMl: "തൊന്നയ്ക്കൽ കൊച്ചുപിള്ള അവാർഡ്",
      awardKey: "kochupillai",
      recipientEn: "Pallippuram Unnikrishnan",
      recipientMl: "പള്ളിപ്പുറം ഉണ്ണികൃഷ്ണൻ",
      disciplineEn: "Literature (Attakkatha Studies & Documentation)",
      disciplineMl: "സാഹിത്യം",
      disciplineKey: "literature",
      citationEn: "Honored for lifelong dedication to classical arts writing, critical reviews, and preservation of the historic Kathakali heritage.",
      citationMl: "കഥകളി പഠനങ്ങളിലൂടെയും ആട്ടക്കഥാ വ്യാഖ്യാനങ്ങളിലൂടെയും കലാരംഗത്തിന് നൽകിയ സ്തുത്യർഹമായ സാഹിത്യ സംഭാവനകൾക്ക്.",
      icon: "leaf"
    },
    // 2026
    {
      id: "award-2026-1",
      year: 2026,
      awardEn: "Natyabharathi Award",
      awardMl: "നാട്യഭാരതി അവാർഡ്",
      awardKey: "natyabharathi",
      recipientEn: "Kalamandalam Vinod",
      recipientMl: "കലാമണ്ഡലം വിനോദ്",
      disciplineEn: "Sangeetham (Kathakali Classical Vocals)",
      disciplineMl: "സംഗീതം",
      disciplineKey: "sangeetham",
      citationEn: "Eminent front-rank vocalist celebrated for mesmerizing raga aesthetics, immaculate tala control, and uplifting dramatic delivery.",
      citationMl: "സമകാലിക കഥകളി സംഗീതത്തിലെ മുൻനിര ഗായകൻ; രാഗഭാവങ്ങളുടെ മനോഹാരിതയും അരങ്ങിന്റെ ഊർജ്ജവും പ്രതിഫലിപ്പിക്കുന്ന സ്വരമാധുര്യം.",
      icon: "swaram"
    }
  ];

  // --- 2. APPLICATION STATE ---
  const state = {
    searchQuery: '',
    selectedYear: 'all',
    selectedCategory: 'all',
    selectedDiscipline: 'all',
    sortOrder: 'asc', // 'asc': 2000 -> 2026, 'desc': 2026 -> 2000
    viewMode: 'grid', // 'grid', 'timeline', 'table'
    currentLang: (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 
                 (typeof document !== 'undefined' && document.documentElement.lang) || 'en'
  };

  // Distinct Years in Chronological Order
  const ALL_YEARS = Array.from(new Set(AWARDS_DATA.map(d => d.year))).sort((a, b) => a - b);

  // SVG Discipline Icons
  function getDisciplineIconSvg(type) {
    switch (type) {
      case 'vesham':
      case 'kireedam':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><circle cx="12" cy="19" r="2"/></svg>`;
      case 'sangeetham':
      case 'swaram':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
      case 'maddalam':
      case 'drum':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="10" ry="4"/><path d="M2 7v10c0 2.2 4.5 4 10 4s10-1.8 10-4V7"/><path d="M2 12c0 2.2 4.5 4 10 4s10-1.8 10-4"/></svg>`;
      case 'chutti':
      case 'brush':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z"/><path d="M9 8c-2 3-4 3.5-7 4l8 8c.5-3 1-5 4-7"/></svg>`;
      case 'literature':
      case 'leaf':
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
      case 'samagra':
      case 'garland':
      default:
        return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
    }
  }

  // Award Category Badge Class
  function getAwardBadgeClass(key) {
    switch (key) {
      case 'natyabharathi':
        return 'award-badge-natyabharathi';
      case 'kochupillai':
        return 'award-badge-kochupillai';
      case 'sangeetharatnam':
        return 'award-badge-sangeetharatnam';
      case 'gopalakrishnan':
        return 'award-badge-gopalakrishnan';
      default:
        return 'award-badge-natyabharathi';
    }
  }

  // --- 3. FILTERING & SEARCH LOGIC ---
  function getFilteredAwards() {
    const q = state.searchQuery.trim().toLowerCase();
    const cat = state.selectedCategory;
    const disc = state.selectedDiscipline;
    const year = state.selectedYear;

    return AWARDS_DATA.filter(item => {
      // Search matching (Recipient ML/EN, Award, Discipline, Year, Citations)
      const matchesSearch = !q ||
        item.recipientEn.toLowerCase().includes(q) ||
        item.recipientMl.toLowerCase().includes(q) ||
        item.awardEn.toLowerCase().includes(q) ||
        item.awardMl.toLowerCase().includes(q) ||
        item.disciplineEn.toLowerCase().includes(q) ||
        item.disciplineMl.toLowerCase().includes(q) ||
        item.year.toString().includes(q) ||
        item.citationEn.toLowerCase().includes(q) ||
        item.citationMl.toLowerCase().includes(q);

      // Category matching
      const matchesCategory = cat === 'all' || item.awardKey === cat;

      // Discipline matching
      const matchesDiscipline = disc === 'all' || item.disciplineKey === disc;

      // Year matching
      const matchesYear = year === 'all' || item.year === parseInt(year, 10);

      return matchesSearch && matchesCategory && matchesDiscipline && matchesYear;
    }).sort((a, b) => {
      if (state.sortOrder === 'desc') {
        return b.year - a.year || b.id.localeCompare(a.id);
      }
      return a.year - b.year || a.id.localeCompare(b.id);
    });
  }

  // --- 4. RENDERERS ---

  /**
   * Render Year Stream & Quick Jump Pills
   */
  function renderYearNavigation() {
    const stream = document.getElementById('yearScrollStream');
    const dropdown = document.getElementById('yearSelectDropdown');
    if (!stream && !dropdown) return;
    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');

    if (stream) {
      const allText = isMl ? 'എല്ലാം' : 'All';
      let html = `<button type="button" class="year-pill-btn ${state.selectedYear === 'all' ? 'is-active' : ''}" data-year="all">${allText}</button>`;
      ALL_YEARS.forEach(y => {
        const isActive = state.selectedYear === y.toString();
        html += `<button type="button" class="year-pill-btn ${isActive ? 'is-active' : ''}" data-year="${y}">${y}</button>`;
      });
      stream.innerHTML = html;

      stream.querySelectorAll('.year-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const y = btn.getAttribute('data-year');
          state.selectedYear = y;
          if (dropdown) dropdown.value = y;
          renderYearNavigation();
          renderArchive();

          if (y !== 'all') {
            const targetEl = document.getElementById(`year-section-${y}`);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    }

    if (dropdown) {
      let dHtml = `<option value="all" ${state.selectedYear === 'all' ? 'selected' : ''}>${isMl ? 'എല്ലാ വർഷങ്ങളും (2000 — 2026)' : 'All Years (2000 — 2026)'}</option>`;
      ALL_YEARS.forEach(y => {
        dHtml += `<option value="${y}" ${state.selectedYear === y.toString() ? 'selected' : ''}>${isMl ? `വർഷം ${y}` : `Year ${y}`}</option>`;
      });
      dropdown.innerHTML = dHtml;

      dropdown.addEventListener('change', (e) => {
        state.selectedYear = e.target.value;
        renderYearNavigation();
        renderArchive();

        if (e.target.value !== 'all') {
          const targetEl = document.getElementById(`year-section-${e.target.value}`);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }
  }

  /**
   * Render Laureate Card HTML
   */
  function buildCardHtml(item) {
    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');
    const badgeClass = getAwardBadgeClass(item.awardKey);
    const discIcon = getDisciplineIconSvg(item.disciplineKey);
    const awardText = isMl ? item.awardMl : item.awardEn;
    const discCleanEn = item.disciplineEn.split('(')[0].trim();
    const discText = isMl ? item.disciplineMl : discCleanEn;
    const recipientName = isMl ? item.recipientMl : item.recipientEn;
    const citation = isMl ? item.citationMl : item.citationEn;
    const yearStamp = isMl ? `വർഷം ${item.year}` : `YEAR ${item.year}`;
    const btnLabel = isMl ? 'ആദരപത്രം കാണുക' : 'View Citation';
    const ariaLabel = isMl ? `${item.recipientMl} - ആദരപത്രം കാണുക` : `View citation for ${item.recipientEn}`;

    return `
      <article class="laureate-card" data-award-id="${item.id}" tabindex="0" role="button" aria-label="${ariaLabel}">
        <div>
          <!-- Badges -->
          <div class="card-badges-top">
            <span class="award-badge ${badgeClass}">
              <span>${awardText}</span>
            </span>
            <span class="discipline-badge">
              <span class="disc-icon">${discIcon}</span>
              <span>${discText}</span>
            </span>
          </div>

          <!-- Recipient Name -->
          <div class="card-recipient-wrap">
            <h3 class="${isMl ? 'card-recipient-ml' : 'card-recipient-en'}">${recipientName}</h3>
          </div>

          <!-- Citation Excerpt -->
          <p class="card-citation-text">
            ${citation}
          </p>
        </div>

        <!-- Action Row -->
        <div class="card-action-row">
          <span class="card-year-stamp">${yearStamp}</span>
          <button type="button" class="card-view-citation-btn">
            <span>${btnLabel}</span>
            <span class="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </article>
    `;
  }

  /**
   * Render Year Grouped Grid View
   */
  function renderGridView(filtered) {
    const container = document.getElementById('awardsArchiveContainer');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = '';
      return;
    }

    // Group items by year
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.year]) groups[item.year] = [];
      groups[item.year].push(item);
    });

    const years = Object.keys(groups).map(Number).sort((a, b) => {
      return state.sortOrder === 'desc' ? b - a : a - b;
    });

    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');
    let html = '';
    years.forEach(year => {
      const items = groups[year];
      const countLabel = isMl
        ? (items.length === 1 ? '1 പുരസ്കാരം' : `${items.length} പുരസ്കാരങ്ങൾ`)
        : (items.length === 1 ? '1 Laureate' : `${items.length} Laureates`);
      const editionLabel = isMl ? 'ജില്ലാ കഥകളി ക്ലബ്ബ്' : 'District Kathakali Club';
      const yearTitle = isMl ? `വർഷം ${year}` : `Year ${year}`;

      html += `
        <section id="year-section-${year}" class="year-group-section" aria-labelledby="heading-year-${year}">
          <header class="year-milestone-banner">
            <div class="year-banner-left">
              <span id="heading-year-${year}" class="year-banner-num">${year}</span>
              <span class="year-banner-ml">${yearTitle}</span>
              <span class="year-banner-edition">${editionLabel}</span>
            </div>
            <div class="year-banner-count">
              <span>${countLabel}</span>
            </div>
          </header>

          <div class="year-cards-grid">
            ${items.map(buildCardHtml).join('')}
          </div>
        </section>
      `;
    });

    container.innerHTML = html;
  }

  /**
   * Render Chronological Timeline View
   */
  function renderTimelineView(filtered) {
    const container = document.getElementById('awardsArchiveContainer');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = '';
      return;
    }

    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');
    let html = '<div class="timeline-view-wrap">';
    filtered.forEach((item, idx) => {
      const isLeft = idx % 2 === 0;
      const sideClass = isLeft ? 'timeline-left' : 'timeline-right';
      const badgeClass = getAwardBadgeClass(item.awardKey);
      const discIcon = getDisciplineIconSvg(item.disciplineKey);
      const awardText = isMl ? item.awardMl : item.awardEn;
      const discCleanEn = item.disciplineEn.split('(')[0].trim();
      const discText = isMl ? item.disciplineMl : discCleanEn;
      const recipientName = isMl ? item.recipientMl : item.recipientEn;
      const citation = isMl ? item.citationMl : item.citationEn;
      const yearStamp = isMl ? `സമർപ്പണം ${item.year}` : `CONFERRED IN ${item.year}`;
      const btnLabel = isMl ? 'ആദരപത്രം' : 'View Citation';

      html += `
        <div class="timeline-item ${sideClass}">
          <div class="timeline-node-dot" aria-hidden="true">✦</div>
          <div class="timeline-year-node-badge">${item.year}</div>

          <article class="laureate-card" data-award-id="${item.id}" tabindex="0" role="button">
            <div>
              <div class="card-badges-top">
                <span class="award-badge ${badgeClass}">
                  <span>${awardText}</span>
                </span>
                <span class="discipline-badge">
                  <span class="disc-icon">${discIcon}</span>
                  <span>${discText}</span>
                </span>
              </div>

              <div class="card-recipient-wrap">
                <h3 class="${isMl ? 'card-recipient-ml' : 'card-recipient-en'}">${recipientName}</h3>
              </div>

              <p class="card-citation-text">
                ${citation}
              </p>
            </div>

            <div class="card-action-row">
              <span class="card-year-stamp">${yearStamp}</span>
              <button type="button" class="card-view-citation-btn">
                <span>${btnLabel}</span>
                <span class="btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  }

  /**
   * Render Compact Archival Ledger Table View
   */
  function renderTableView(filtered) {
    const container = document.getElementById('awardsArchiveContainer');
    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = '';
      return;
    }

    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');
    const thYear = isMl ? 'വർഷം' : 'Year';
    const thRecipient = isMl ? 'പുരസ്കാര ജേതാവ്' : 'Laureate / Recipient';
    const thAward = isMl ? 'പുരസ്കാരം' : 'Conferred Award';
    const thDiscipline = isMl ? 'ശാഖ' : 'Discipline';
    const thAction = isMl ? 'ആദരപത്രം' : 'Citation Dossier';

    let html = `
      <div class="table-view-wrap">
        <table class="archival-table" aria-label="District Kathakali Club Awards Archive Ledger">
          <thead>
            <tr>
              <th scope="col">${thYear}</th>
              <th scope="col">${thRecipient}</th>
              <th scope="col">${thAward}</th>
              <th scope="col">${thDiscipline}</th>
              <th scope="col">${thAction}</th>
            </tr>
          </thead>
          <tbody>
    `;

    filtered.forEach(item => {
      const badgeClass = getAwardBadgeClass(item.awardKey);
      const recipientName = isMl ? item.recipientMl : item.recipientEn;
      const awardText = isMl ? item.awardMl : item.awardEn;
      const discCleanEn = item.disciplineEn.split('(')[0].trim();
      const discText = isMl ? item.disciplineMl : discCleanEn;
      const viewLabel = isMl ? 'കാണുക' : 'View';

      html += `
        <tr data-award-id="${item.id}" style="cursor: pointer;">
          <td class="table-year-cell">${item.year}</td>
          <td>
            <span class="${isMl ? 'table-recipient-ml' : 'table-recipient-en'}">${recipientName}</span>
          </td>
          <td>
            <span class="award-badge ${badgeClass}" style="font-size: 0.7rem;">
              ${awardText}
            </span>
          </td>
          <td>
            <span class="discipline-badge" style="font-size: 0.7rem;">
              ${discText}
            </span>
          </td>
          <td>
            <button type="button" class="card-view-citation-btn" data-award-id="${item.id}">
              <span>${viewLabel}</span> →
            </button>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  /**
   * Primary Render Orchestrator
   */
  function renderArchive() {
    const filtered = getFilteredAwards();
    const noResultsEl = document.getElementById('awardsNoResults');

    // Toggle No Results Placeholder
    if (noResultsEl) {
      if (filtered.length === 0) {
        noResultsEl.classList.add('is-visible');
      } else {
        noResultsEl.classList.remove('is-visible');
      }
    }

    // Render corresponding view
    if (state.viewMode === 'timeline') {
      renderTimelineView(filtered);
    } else if (state.viewMode === 'table') {
      renderTableView(filtered);
    } else {
      renderGridView(filtered);
    }

    // Attach click events for modal inspection
    attachCardModalListeners();

    // Refresh Lenis boundaries & ScrollTrigger markers
    if (typeof window.refreshMotionAndScroll === 'function') {
      window.refreshMotionAndScroll();
    }
  }

  // --- 5. CEREMONIAL CITATION MODAL (ROYAL KERALA PONNADA & CERTIFICATE) ---
  function openCitationModal(awardId) {
    const item = AWARDS_DATA.find(d => d.id === awardId);
    if (!item) return;

    const modal = document.getElementById('citationModal');
    if (!modal) return;
    const isMl = state.currentLang === 'ml' || (typeof document !== 'undefined' && document.documentElement.lang === 'ml');

    const awardMlEl = document.getElementById('certAwardTitleMl');
    const awardEnEl = document.getElementById('certAwardTitleEn');
    const awardEl = document.getElementById('certAwardTitle');
    const recMlEl = document.getElementById('certRecipientMl');
    const recEnEl = document.getElementById('certRecipientEn');
    const recEl = document.getElementById('certRecipient');
    const discEl = document.getElementById('certDisciplineText');
    const yearEl = document.getElementById('certYearText');
    const yearElMl = document.getElementById('certYearTextMl');
    const citeMlEl = document.getElementById('certCitationBodyMl');
    const citeEnEl = document.getElementById('certCitationBodyEn');
    const citeEl = document.getElementById('certCitationBody');

    if (awardEl) awardEl.textContent = isMl ? item.awardMl : item.awardEn;
    else {
      if (awardMlEl) awardMlEl.textContent = item.awardMl;
      if (awardEnEl) awardEnEl.textContent = item.awardEn;
    }

    if (recEl) recEl.textContent = isMl ? item.recipientMl : item.recipientEn;
    else {
      if (recMlEl) recMlEl.textContent = item.recipientMl;
      if (recEnEl) recEnEl.textContent = item.recipientEn;
    }

    if (discEl) {
      discEl.textContent = isMl ? item.disciplineMl : item.disciplineEn.split('(')[0].trim();
    }
    if (yearEl) yearEl.textContent = item.year;
    if (yearElMl) yearElMl.textContent = item.year;

    if (citeEl) citeEl.textContent = isMl ? item.citationMl : item.citationEn;
    else {
      if (citeMlEl) citeMlEl.textContent = item.citationMl;
      if (citeEnEl) citeEnEl.textContent = item.citationEn;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (typeof window.stopScroll === 'function') {
      window.stopScroll();
    } else if (window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
    }

    const closeBtn = modal.querySelector('.citation-modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeCitationModal() {
    const modal = document.getElementById('citationModal');
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (typeof window.startScroll === 'function') {
      window.startScroll();
    } else if (window.lenis && typeof window.lenis.start === 'function') {
      window.lenis.start();
    }
  }

  function attachCardModalListeners() {
    document.querySelectorAll('[data-award-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-award-id');
        if (id) openCitationModal(id);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = el.getAttribute('data-award-id');
          if (id) openCitationModal(id);
        }
      });
    });
  }

  // --- 6. EVENT CONTROLLERS INITIALIZATION ---
  function initControls() {
    // Search Input
    const searchInput = document.getElementById('awardsSearchInput');
    const clearBtn = document.getElementById('searchClearBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (clearBtn) {
          if (e.target.value.length > 0) clearBtn.classList.add('is-visible');
          else clearBtn.classList.remove('is-visible');
        }
        renderArchive();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        state.searchQuery = '';
        clearBtn.classList.remove('is-visible');
        renderArchive();
      });
    }

    // Category Filter Chips
    document.querySelectorAll('[data-category-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-category-filter]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.selectedCategory = btn.getAttribute('data-category-filter') || 'all';
        renderArchive();
      });
    });

    // Discipline Filter Chips
    document.querySelectorAll('[data-discipline-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-discipline-filter]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.selectedDiscipline = btn.getAttribute('data-discipline-filter') || 'all';
        renderArchive();
      });
    });

    // Sort Order Toggle
    const sortBtn = document.getElementById('sortToggleBtn');
    if (sortBtn) {
      sortBtn.addEventListener('click', () => {
        if (state.sortOrder === 'asc') {
          state.sortOrder = 'desc';
          sortBtn.querySelector('.sort-label-en').textContent = '2026 → 2000 (Latest First)';
          sortBtn.querySelector('.sort-label-ml').textContent = 'പുതിയത് ആദ്യം';
        } else {
          state.sortOrder = 'asc';
          sortBtn.querySelector('.sort-label-en').textContent = '2000 → 2026 (From Inception)';
          sortBtn.querySelector('.sort-label-ml').textContent = 'ആരംഭം മുതൽ';
        }
        renderArchive();
      });
    }

    // View Mode Switcher
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.viewMode = btn.getAttribute('data-view') || 'grid';
        renderArchive();
      });
    });

    // Modal Close Triggers
    const modal = document.getElementById('citationModal');
    if (modal) {
      const closeBtn = modal.querySelector('.citation-modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeCitationModal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCitationModal();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
          closeCitationModal();
        }
      });
    }
  }

  // --- 7. FLOATING BACK TO TOP & CUSTOM CURSOR ---
  function initFloatingBackToTop() {
    const btn = document.getElementById('floatingBackToTop');
    const footerBtn = document.getElementById('backToTopBtn');

    if (btn) {
      const ringIndicator = btn.querySelector('.progress-ring-indicator');
      const radius = 23;
      const circumference = 2 * Math.PI * radius;

      if (ringIndicator) {
        ringIndicator.style.strokeDasharray = `${circumference} ${circumference}`;
        ringIndicator.style.strokeDashoffset = circumference;
      }

      function onScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;

        if (ringIndicator) {
          ringIndicator.style.strokeDashoffset = circumference - (progress * circumference);
        }

        if (scrollY > 280) {
          btn.classList.add('visible', 'is-visible');
        } else {
          btn.classList.remove('visible', 'is-visible');
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (footerBtn) {
      footerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initCustomCursor() {
    if (window.__ayroorCursorInitialized) return;
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('customCursorFollower');
    if (!cursor || !follower || window.matchMedia('(pointer: coarse)').matches) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderFollower() {
      posX += (mouseX - posX) * 0.15;
      posY += (mouseY - posY) * 0.15;
      follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(renderFollower);
      }
    }
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(renderFollower);
    }

    // Interactive element hover states
    const interactiveSelectors = 'a, button, input, select, .laureate-card, .category-chip-btn, .view-btn, [tabindex="0"]';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => follower.classList.remove('is-hovering'));
    });
  }

  // --- 8. BILINGUAL SYNCHRONIZATION ---
  function updateLanguage(lang) {
    if (lang !== 'en' && lang !== 'ml') return;
    state.currentLang = lang;

    // 1. Dynamic search input placeholder update
    const searchInput = document.getElementById('awardsSearchInput');
    if (searchInput) {
      searchInput.placeholder = lang === 'ml' 
        ? 'പുരസ്കാര ജേതാവ്, അവാർഡ്, ശാഖ, വർഷം എന്നിവ തിരയുക...' 
        : 'Search laureate name (e.g. Kalamandalam Gopi), award, discipline, or year...';
    }

    // 2. Sort toggle button text
    const sortBtn = document.getElementById('sortToggleBtn');
    if (sortBtn) {
      const sortLabelEn = sortBtn.querySelector('.sort-label-en');
      const sortLabelMl = sortBtn.querySelector('.sort-label-ml');
      if (state.sortOrder === 'desc') {
        if (sortLabelEn) sortLabelEn.textContent = '2026 → 2000 (Latest First)';
        if (sortLabelMl) sortLabelMl.textContent = '2026 → 2000 (പുതിയത് ആദ്യം)';
      } else {
        if (sortLabelEn) sortLabelEn.textContent = '2000 → 2026 (From Inception)';
        if (sortLabelMl) sortLabelMl.textContent = '2000 → 2026 (ആരംഭം മുതൽ)';
      }
    }

    // 3. Re-render Year Stream & Archive Views
    renderYearNavigation();
    renderArchive();
  }

  function initLanguageSync() {
    // 1. Listen for custom event from navigation.js
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('ayroor:languageChanged', (e) => {
        if (e.detail && e.detail.lang) {
          updateLanguage(e.detail.lang);
        }
      });
    }

    // 2. Observe html lang attribute directly for instant sync
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

    // 3. Fallback on any click of language buttons
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          const l = document.documentElement.lang || (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 'en';
          updateLanguage(l);
        }, 50);
      });
    });

    // 4. Hook into AyroorNav if available
    if (window.AyroorNav && typeof window.AyroorNav.setLanguage === 'function') {
      const origSetLang = window.AyroorNav.setLanguage;
      window.AyroorNav.setLanguage = function (lang) {
        origSetLang(lang);
        updateLanguage(lang);
      };
    }
  }

  // --- 9. INITIALIZE ON DOM READY ---
  function init() {
    // Determine initial language from document root or storage
    const initialLang = (typeof document !== 'undefined' && document.documentElement.lang) ||
                        (typeof localStorage !== 'undefined' && localStorage.getItem('ayroor_lang')) || 'en';
    state.currentLang = initialLang;

    renderYearNavigation();
    initControls();
    initFloatingBackToTop();
    initCustomCursor();
    initLanguageSync();
    updateLanguage(initialLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
