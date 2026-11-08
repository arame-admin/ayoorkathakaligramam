const fs = require('fs');

const canonicalMudras = [
  {
    idx: 1,
    nameEn: 'Pathaaka',
    meaningEn: 'Flag',
    nameMl: 'പതാക',
    total: 46,
    img: 'assets/images/mudras/pathaka.webp',
    doubleCount: 36,
    singleCount: 10,
    doubleSymbols: [
      'Sun', 'King', 'Elephant', 'Lion', 'Ox', 'Crocodile', 'Arch', 'Climbing Plant',
      'Flag', 'Series of waves', 'Path', 'Hell', 'Earth', 'Hip', 'Pot', 'Multi-storied building',
      'Evening', 'Noon', 'Cloud', 'Anthill', 'Thigh', 'Servant', 'Travel', 'Wheel',
      'Stool', "Lord Indra's weapon", 'Gate Tower', 'Rampart', 'Vehicle', 'Peaceful',
      'Crooked', 'Door', 'Pillow', 'Trench (ditch)', 'Leg', 'Bolt'
    ],
    singleSymbols: [
      'Day', 'Movement', 'Tongue', 'Forehead', 'Body', 'That thing', 'Noise', 'Messenger',
      'Sandbank', 'Sprout'
    ]
  },
  {
    idx: 2,
    nameEn: 'Mudraakhyam',
    meaningEn: 'Primal Seal',
    nameMl: 'മുദ്രാഖ്യം',
    total: 25,
    img: 'assets/images/mudras/Mudraakhyam.webp',
    doubleCount: 13,
    singleCount: 12,
    doubleSymbols: [
      'Growth', 'Movement', 'Heaven', 'Ocean', 'Thick', 'Forgetting', 'Everything',
      'Announcement', 'Thing', 'Death', 'Meditation', 'Sacred Thread', 'Straight'
    ],
    singleSymbols: [
      'Mind', 'Thought', 'Desire', 'By oneself', 'Reminding', 'Wisdom', 'Creation',
      'Life', 'Defame', 'Future', 'No', 'Fourth'
    ]
  },
  {
    idx: 3,
    nameEn: 'Katakam',
    meaningEn: 'Golden Bangle',
    nameMl: 'കടകം',
    total: 29,
    img: 'assets/images/mudras/Katakam.webp',
    doubleCount: 20,
    singleCount: 9,
    doubleSymbols: [
      'Vishnu (God)', 'Krishna (God)', 'Balaraman', 'Arrow', 'Gold', 'Silver',
      'A female demon', 'Sleep', 'Main woman', 'Goddess of wealth', 'Veena', 'Stars',
      'Chain', 'Lotus/ water', 'Demon', 'Crown', 'Weapon', 'Peculiarity / special news',
      'Chariot', 'With'
    ],
    singleSymbols: [
      'Flower', 'Mirror', 'Female', 'Offering holy materials to sacrificial fire with manthras',
      'Sweating', 'A little', 'Quiver', 'Smell', 'Which one'
    ]
  },
  {
    idx: 4,
    nameEn: 'Mushti',
    meaningEn: 'The Fist',
    nameMl: 'മുഷ്ടി',
    total: 40,
    img: 'assets/images/mudras/Mushti.webp',
    doubleCount: 25,
    singleCount: 15,
    doubleSymbols: [
      'Driver of chariot', 'Prefix', 'Beauty', 'Purity', 'Spirit of Ghost', 'Binding',
      'Qualification', 'Condition', 'Ankle', 'Pulling', 'Tail of animal (whisk)',
      'Destroyer/ Yama, god of death', 'Mud', 'Medicine', 'Curse', 'Swing',
      'Gift/ donation', 'Circumambulation', 'Digging', 'Giving up', 'Lance', 'Heroism',
      'Hot (Sun or fire)/ grieve', 'Vomiting', 'Delivery/ child birth'
    ],
    singleSymbols: [
      'In vain', 'Extremely', 'Filupon', "King's advisor", 'Crossing', 'Bearing',
      'Donation', 'Consent', 'Victory', 'Bow', 'We', 'Single sentence', 'Agedness',
      'Robbing', 'Food'
    ]
  },
  {
    idx: 5,
    nameEn: 'Kartharee Mukham',
    meaningEn: "Scissor's sharp point",
    nameMl: 'കർത്തരീമുഖം',
    total: 26,
    img: 'assets/images/mudras/Kartharimukham.webp',
    doubleCount: 16,
    singleCount: 10,
    doubleSymbols: [
      'Sin', 'Tiredness', 'Male member of Brahmin caste', 'Fame', 'Skull', 'House',
      'A religious vow', 'Purity', 'Bank', 'Dynasty, Bamboo', 'Hunger', 'Hearing',
      'Telling', 'Gathering', 'End', 'Hunting'
    ],
    singleSymbols: [
      'You', 'Word', 'Change of mood/ time', 'Gradation', 'We', 'Human being',
      'Face', 'Enmity', 'Child', 'Mongoose'
    ]
  },
  {
    idx: 6,
    nameEn: 'Sukathundam',
    meaningEn: "Parrot's beak",
    nameMl: 'ശുകതുണ്ഡം',
    total: 3,
    img: 'assets/images/mudras/Shukathundam.webp',
    doubleCount: 3,
    singleCount: 0,
    doubleSymbols: [
      'Goad', 'Bird', 'Engagement'
    ],
    singleSymbols: []
  },
  {
    idx: 7,
    nameEn: 'Kapidhakam',
    meaningEn: 'The fruit of a tree',
    nameMl: 'കപിത്ഥകം',
    total: 10,
    img: 'assets/images/mudras/Kapithakam.webp',
    doubleCount: 10,
    singleCount: 0,
    doubleSymbols: [
      'Net', 'Doubt', 'Tail feather of a peacock', 'Drinking', 'Touching',
      'Prevent', 'In the open expanse of land', 'The outer side', 'Descend', 'To step'
    ],
    singleSymbols: []
  },
  {
    idx: 8,
    nameEn: 'HamsaPaksham',
    meaningEn: "Swan's wing",
    nameMl: 'ഹംസപക്ഷം',
    total: 53,
    img: 'assets/images/mudras/Hamsapaksham.webp',
    doubleCount: 11,
    singleCount: 42,
    doubleSymbols: [
      'You', 'Sword', 'Anger', 'Now', 'I', 'In front of', 'Axe', 'Light',
      'Calling', 'Getting nearness', 'Prevent'
    ],
    singleSymbols: [
      'Moon', 'Air', 'Kamadeva', 'Gods', 'Mountain', 'Valley', 'Everyday', 'Relatives',
      'Bedding', 'Rock', 'Happiness and comfort', 'Chest', 'Female breast', 'Cloth',
      'Vehicle', 'Lie', 'Lying down', 'Falling', 'Crowd', 'Beating', 'Covering',
      'Spreading', 'Found', 'Coming', 'Salutation', 'Game', 'Sandal', 'Embrace',
      'Follow', 'Escaping', 'Reach', 'Mace', 'The cheek region', 'Shoulder', 'Hair',
      'Humility', 'Blessing', 'Saint', 'Thus', 'Fish', 'Worship', 'Tortoise'
    ]
  },
  {
    idx: 9,
    nameEn: 'Sikharam',
    meaningEn: 'Peak',
    nameMl: 'ശിഖരം',
    total: 11,
    img: 'assets/images/mudras/Sikharam.webp',
    doubleCount: 3,
    singleCount: 8,
    doubleSymbols: [
      'Garudan (a hawk in Purana)', 'Swan', 'Jatayu'
    ],
    singleSymbols: [
      'Walking', 'Legs', 'Eyes', 'Sight', 'Path', 'Search/ detection', 'Ears', 'Drinking'
    ]
  },
  {
    idx: 10,
    nameEn: 'Hamsaasyam',
    meaningEn: "Swan's beak",
    nameMl: 'ഹംസാസ്യം',
    total: 12,
    img: 'assets/images/mudras/Hamsaasyam.webp',
    doubleCount: 8,
    singleCount: 4,
    doubleSymbols: [
      'Iris', 'Smoothness', 'Dust', 'Whiteness', 'Blue colour', 'Red', 'Mercy', 'Hairs of the body'
    ],
    singleSymbols: [
      'Beginning of the rainy season', 'Hair of the head', 'The line of hair on abdomen',
      'The three folds of skin above the naval of a woman'
    ]
  },
  {
    idx: 11,
    nameEn: 'Anjaly',
    meaningEn: 'Folded hands in Salutation',
    nameMl: 'അഞ്ജലി',
    total: 17,
    img: 'assets/images/mudras/Anjali.webp',
    doubleCount: 15,
    singleCount: 2,
    doubleSymbols: [
      'Excessive rain', 'Vomiting', 'Fire', 'Horse', 'Loud noise', 'Light', 'Hair',
      'Ear-ring', 'Heat or sorrow', 'Anxiety', 'Always', 'Blood', 'River', 'Flowing'
    ],
    singleSymbols: [
      'Twigs of the tree', 'Anger'
    ]
  },
  {
    idx: 12,
    nameEn: 'Ardhachandram',
    meaningEn: 'Half moon',
    nameMl: 'അർദ്ധചന്ദ്രൻ',
    total: 13,
    img: 'assets/images/mudras/Ardhachandram.webp',
    doubleCount: 9,
    singleCount: 4,
    doubleSymbols: [
      'If', 'For what', 'Helplessness', 'Sky', 'Blessed man', 'God', 'Memory', 'Grass', 'Hair of a man'
    ],
    singleSymbols: [
      'Starting', 'Smiling', 'What (done with single or double hands)', 'Contempt'
    ]
  },
  {
    idx: 13,
    nameEn: 'Mukuram',
    meaningEn: 'Mirror',
    nameMl: 'മുകുരം',
    total: 20,
    img: 'assets/images/mudras/Mukuram.webp',
    doubleCount: 11,
    singleCount: 9,
    doubleSymbols: [
      'Tusk', 'Separation', 'Forelimb', 'Waist', 'Vedam', 'Brother', 'Pillar', 'Mortar',
      'Speedy', 'Devil', 'Growth'
    ],
    singleSymbols: [
      'Dissenting person', 'Beetle', 'Ray', 'Anger', 'Excellent', 'Bangle', 'Neck',
      'Armlet', 'Negative'
    ]
  },
  {
    idx: 14,
    nameEn: 'Bhramaram',
    meaningEn: 'Beetle',
    nameMl: 'ഭ്രമരം',
    total: 9,
    img: 'assets/images/mudras/Bhramaram.webp',
    doubleCount: 5,
    singleCount: 4,
    doubleSymbols: [
      'Wing of a bird', 'Song', 'Water', 'Umbrella', 'Ear of the elephant'
    ],
    singleSymbols: [
      'Demi-god (Gandharva)', 'Birth', 'Fear', 'Weeping'
    ]
  },
  {
    idx: 15,
    nameEn: 'Soochimukham',
    meaningEn: "Needle's sharp point",
    nameMl: 'സൂചീമുഖം',
    total: 26,
    img: 'assets/images/mudras/Soochimukham.webp',
    doubleCount: 10,
    singleCount: 16,
    doubleSymbols: [
      'Broken', 'Jumping up', 'Universe', 'Lakshmana', 'Fall', 'The other thing',
      'Month', 'Eyebrow', 'Loose', 'Tail'
    ],
    singleSymbols: [
      'One person', 'What a pity!', 'Dull', 'Another', 'Plural', 'Ear', 'A digit of the moon',
      'In olden times', 'This man', 'These people', 'Kingdom', 'A little', 'Witness', 'Give up'
    ]
  },
  {
    idx: 16,
    nameEn: 'Pallavam',
    meaningEn: 'Sprout',
    nameMl: 'പല്ലവം',
    total: 15,
    img: 'assets/images/mudras/Pallavam.webp',
    doubleCount: 9,
    singleCount: 6,
    doubleSymbols: [
      "The weapon of Lord Indra", 'Mountain peak', 'Ears of cow', 'Length of the eye',
      'Male buffalo', 'Pestle made of iron', 'Spear', 'Horn', 'Circling'
    ],
    singleSymbols: [
      'Distance', 'Pledge', 'Fume', 'Tail', 'Cane', 'Grain'
    ]
  },
  {
    idx: 17,
    nameEn: 'Thripathaaka',
    meaningEn: 'Flag with three colours',
    nameMl: 'ത്രിപതാക',
    total: 6,
    img: 'assets/images/mudras/Thripathaaka.webp',
    doubleCount: 6,
    singleCount: 0,
    doubleSymbols: [
      'Sunset', 'Commencement', "'Hey'", 'Drinking', 'Body', 'Begging'
    ],
    singleSymbols: []
  },
  {
    idx: 18,
    nameEn: 'Mrigaseersham',
    meaningEn: "Deer's head",
    nameMl: 'മൃഗശീർഷം',
    total: 2,
    img: 'assets/images/mudras/Mrigaseersham.webp',
    doubleCount: 2,
    singleCount: 0,
    doubleSymbols: [
      'Animals', 'The supreme being'
    ],
    singleSymbols: []
  },
  {
    idx: 19,
    nameEn: 'Sarpasirassu',
    meaningEn: "Serpent's head",
    nameMl: 'സർപ്പശിരസ്സ്',
    total: 15,
    img: 'assets/images/mudras/Sarpasirassu.webp',
    doubleCount: 15,
    singleCount: 0,
    doubleSymbols: [
      'Sandal', 'Snake', 'Slowness', 'Worship of god using 8 substances', 'Vomiting', 'Saint',
      "Swinging of elephant's ears", 'Escaping', 'Massage', 'Sprinkle', 'Clapping hands',
      'Breaking skull of elephant', 'Cherishing', 'Giving water to god', 'Message of wrestlers'
    ],
    singleSymbols: []
  },
  {
    idx: 20,
    nameEn: 'Vardhamanakam',
    meaningEn: 'Seedling',
    nameMl: 'വർദ്ധമാനകം',
    total: 9,
    img: 'assets/images/mudras/Vardhamanakam.webp',
    doubleCount: 6,
    singleCount: 3,
    doubleSymbols: [
      'Ear-ring of a female', 'Diamond necklace', 'Knee', 'One who practices Yoga/meditation',
      'Drawn', 'Man looking after the elephant'
    ],
    singleSymbols: [
      'Whirlpool', 'Navel', 'Well'
    ]
  },
  {
    idx: 21,
    nameEn: 'Araalam',
    meaningEn: 'Curved',
    nameMl: 'അരാളം',
    total: 5,
    img: 'assets/images/mudras/Araalam.webp',
    doubleCount: 5,
    singleCount: 0,
    doubleSymbols: [
      'Fool', 'Tree', 'Wedge', 'Bud', 'Sprout'
    ],
    singleSymbols: []
  },
  {
    idx: 22,
    nameEn: 'Oornanabham',
    meaningEn: 'Spider',
    nameMl: 'ഊർണ്ണനാഭം',
    total: 7,
    img: 'assets/images/mudras/Oornanabham.webp',
    doubleCount: 7,
    singleCount: 0,
    doubleSymbols: [
      'Horse', 'Fruit', 'Tiger', 'Butter', 'Snow', 'Plenty', 'Lotus flower'
    ],
    singleSymbols: []
  },
  {
    idx: 23,
    nameEn: 'Mukulam',
    meaningEn: 'Bud',
    nameMl: 'മുകുളം',
    total: 4,
    img: 'assets/images/mudras/Mukulam.webp',
    doubleCount: 4,
    singleCount: 0,
    doubleSymbols: [
      'Fox', 'Monkey', 'Fading', 'Forgetting'
    ],
    singleSymbols: []
  },
  {
    idx: 24,
    nameEn: 'Katakaamukham',
    meaningEn: 'Opening bracelet / bud',
    nameMl: 'കടകാമുഖം',
    total: 6,
    img: 'assets/images/mudras/Katakaamukham.webp',
    doubleCount: 6,
    singleCount: 0,
    doubleSymbols: [
      'Blouse', 'Servant', 'Hero', 'Wrestler', 'To shoot arrows', 'Arrest'
    ],
    singleSymbols: []
  }
];

const misraMudrasList = [
  { id: 1, nameEn: 'Indra (King of Gods)', nameMl: 'ഇന്ദ്രൻ', h1: 'Sikharam (ശിഖരം)', h2: 'Mushti (മുഷ്ടി)', cat: 'deities' },
  { id: 2, nameEn: 'Sivan / Lord Shiva', nameMl: 'ശിവൻ', h1: 'Mrigaseersham (മൃഗശീർഷം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'deities' },
  { id: 3, nameEn: 'Lord Vishnu / Narayana', nameMl: 'വിഷ്ണു', h1: 'Katakam (കടകം)', h2: 'Mudraakhyam (മുദ്രാഖ്യം)', cat: 'deities' },
  { id: 4, nameEn: 'Lord Brahma (Creator)', nameMl: 'ബ്രഹ്മാവ്', h1: 'Mudraakhyam (മുദ്രാഖ്യം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'deities' },
  { id: 5, nameEn: 'Goddess Saraswathi', nameMl: 'സരസ്വതി', h1: 'Katakam (കടകം)', h2: 'Mukulam (മുകുളം)', cat: 'deities' },
  { id: 6, nameEn: 'Goddess Lakshmi', nameMl: 'ലക്ഷ്മി', h1: 'Katakam (കടകം)', h2: 'Kapithakam (കപിത്ഥകം)', cat: 'deities' },
  { id: 7, nameEn: 'Lord Ganapathi (Ganesha)', nameMl: 'ഗണപതി', h1: 'Kapithakam (കപിത്ഥകം)', h2: 'Katakam (കടകം)', cat: 'deities' },
  { id: 8, nameEn: 'Lord Subrahmanya (Murugan)', nameMl: 'സുബ്രഹ്മണ്യൻ', h1: 'Sikharam (ശിഖരം)', h2: 'Soochimukham (സൂചീമുഖം)', cat: 'deities' },
  { id: 9, nameEn: 'Sri Rama (Maryada Purushottama)', nameMl: 'ശ്രീരാമൻ', h1: 'Sikharam (ശിഖരം)', h2: 'Mushti (മുഷ്ടി)', cat: 'deities' },
  { id: 10, nameEn: 'Sri Krishna (Cowherd Lord)', nameMl: 'ശ്രീകൃഷ്ണൻ', h1: 'Katakam (കടകം)', h2: 'Mrigaseersham (മൃഗശീർഷം)', cat: 'deities' },
  { id: 11, nameEn: 'Balarama (Bearer of Plough)', nameMl: 'ബലരാമൻ', h1: 'Mushti (മുഷ്ടി)', h2: 'Katakam (കടകം)', cat: 'deities' },
  { id: 12, nameEn: 'Lord Hanuman (Vayuputra)', nameMl: 'ഹനുമാൻ', h1: 'Mukulam (മുകുളം)', h2: 'Mushti (മുഷ്ടി)', cat: 'deities' },
  { id: 13, nameEn: 'Surya (Sun God)', nameMl: 'സൂര്യൻ', h1: 'Pathaaka (പതാക)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'deities' },
  { id: 14, nameEn: 'Chandra (Moon God)', nameMl: 'ചന്ദ്രൻ', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Ardhachandram (അർദ്ധചന്ദ്രൻ)', cat: 'deities' },
  { id: 15, nameEn: 'Agni (Fire God)', nameMl: 'അഗ്നി', h1: 'Thripathaaka (ത്രിപതാക)', h2: 'Mudraakhyam (മുദ്രാഖ്യം)', cat: 'deities' },
  { id: 16, nameEn: 'Yama (God of Death)', nameMl: 'യമൻ', h1: 'Mushti (മുഷ്ടി)', h2: 'Soochimukham (സൂചീമുഖം)', cat: 'deities' },
  { id: 17, nameEn: 'Varuna (God of Waters)', nameMl: 'വരുണൻ', h1: 'Pathaaka (പതാക)', h2: 'Sikharam (ശിഖരം)', cat: 'deities' },
  { id: 18, nameEn: 'Vayu (God of Wind)', nameMl: 'വായു', h1: 'Araalam (അരാളം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'deities' },
  { id: 19, nameEn: 'Kubera (God of Wealth)', nameMl: 'കുബേരൻ', h1: 'Mushti (മുഷ്ടി)', h2: 'Katakam (കടകം)', cat: 'deities' },
  { id: 20, nameEn: 'Kamadeva (God of Love)', nameMl: 'കാമദേവൻ', h1: 'Katakam (കടകം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'deities' },
  { id: 21, nameEn: 'Garuda (Divine Eagle)', nameMl: 'ഗരുഡൻ', h1: 'Sikharam (ശിഖരം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'deities' },
  { id: 22, nameEn: 'Jatayu (King of Birds)', nameMl: 'ജടായു', h1: 'Sikharam (ശിഖരം)', h2: 'Shukathundam (ശുകതുണ്ഡം)', cat: 'deities' },
  { id: 23, nameEn: 'Ravana (Lanka Sovereign)', nameMl: 'രാവണൻ', h1: 'Mushti (മുഷ്ടി)', h2: 'Sikharam (ശിഖരം)', cat: 'deities' },
  { id: 24, nameEn: 'Vibhishana (Righteous Sovereign)', nameMl: 'വിഭീഷണൻ', h1: 'Anjali (അഞ്ജലി)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'deities' },
  { id: 25, nameEn: 'Kumbhakarna (Sleeping Titan)', nameMl: 'കുംഭകർണ്ണൻ', h1: 'Mushti (മുഷ്ടി)', h2: 'Vardhamanakam (വർദ്ധമാനകം)', cat: 'deities' },
  { id: 26, nameEn: 'King / Sovereign Monarch', nameMl: 'രാജാവ്', h1: 'Pathaaka (പതാക)', h2: 'Mushti (മുഷ്ടി)', cat: 'kinship' },
  { id: 27, nameEn: 'Queen / Royal Consort', nameMl: 'റാണി', h1: 'Katakam (കടകം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'kinship' },
  { id: 28, nameEn: 'Sage / Forest Hermit (Rishi)', nameMl: 'ഋഷി', h1: 'Mudraakhyam (മുദ്രാഖ്യം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'kinship' },
  { id: 29, nameEn: 'Guru / Master Teacher', nameMl: 'ഗുരു', h1: 'Mudraakhyam (മുദ്രാഖ്യം)', h2: 'Pathaaka (പതാക)', cat: 'kinship' },
  { id: 30, nameEn: 'Sanyasi / Ascetic Seeker', nameMl: 'സന്യാസി', h1: 'Mudraakhyam (മുദ്രാഖ്യം)', h2: 'Sikharam (ശിഖരം)', cat: 'kinship' },
  { id: 31, nameEn: 'Mother (Mathavu)', nameMl: 'മാതാവ്', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Katakam (കടകം)', cat: 'kinship' },
  { id: 32, nameEn: 'Father (Pithavu)', nameMl: 'പിതാവ്', h1: 'Sikharam (ശിഖരം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'kinship' },
  { id: 33, nameEn: 'Brother (Sahodaran)', nameMl: 'സഹോദരൻ', h1: 'Mukuram (മുകുരം)', h2: 'Sikharam (ശിഖരം)', cat: 'kinship' },
  { id: 34, nameEn: 'Sister (Sahodari)', nameMl: 'സഹോദരി', h1: 'Katakam (കടകം)', h2: 'Mukuram (മുകുരം)', cat: 'kinship' },
  { id: 35, nameEn: 'Husband (Bharthavu)', nameMl: 'ഭർത്താവ്', h1: 'Sikharam (ശിഖരം)', h2: 'Mushti (മുഷ്ടി)', cat: 'kinship' },
  { id: 36, nameEn: 'Wife (Bharya)', nameMl: 'ഭാര്യ', h1: 'Katakam (കടകം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'kinship' },
  { id: 37, nameEn: 'Friend / Companion (Mithram)', nameMl: 'മിത്രം', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'kinship' },
  { id: 38, nameEn: 'Enemy / Adversary (Sathru)', nameMl: 'ശത്രു', h1: 'Karthareemukham (കർത്തരീമുഖം)', h2: 'Mushti (മുഷ്ടി)', cat: 'kinship' },
  { id: 39, nameEn: 'Chariot (Radham)', nameMl: 'രഥം', h1: 'Katakam (കടകം)', h2: 'Mushti (മുഷ്ടി)', cat: 'weapons' },
  { id: 40, nameEn: 'Bow & Arrow (Dhanurbana)', nameMl: 'ധനുർബാണങ്ങൾ', h1: 'Mushti (മുഷ്ടി)', h2: 'Katakam (കടകം)', cat: 'weapons' },
  { id: 41, nameEn: 'Sword & Shield (Kripana)', nameMl: 'വാളും പരിചയും', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Mushti (മുഷ്ടി)', cat: 'weapons' },
  { id: 42, nameEn: 'Mace / War Club (Gadha)', nameMl: 'ഗദ', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Mushti (മുഷ്ടി)', cat: 'weapons' },
  { id: 43, nameEn: 'Lotus Flower (Kamala)', nameMl: 'താമര', h1: 'Katakam (കടകം)', h2: 'Oornanabham (ഊർണ്ണനാഭം)', cat: 'weapons' },
  { id: 44, nameEn: 'Garland (Mala)', nameMl: 'മാല', h1: 'Katakam (കടകം) in both hands', h2: 'Interwoven gesture', cat: 'weapons' },
  { id: 45, nameEn: 'Mirror & Bangle (Adarsha & Kataka)', nameMl: 'കണ്ണാടിയും വളയും', h1: 'Mukuram (മുകുരം)', h2: 'Katakam (കടകം)', cat: 'weapons' },
  { id: 46, nameEn: 'Veena / Classical Lute', nameMl: 'വീണ', h1: 'Katakam (കടകം) in both hands', h2: 'Strumming configuration', cat: 'weapons' },
  { id: 47, nameEn: 'Sacred Temple (Kshethram)', nameMl: 'ക്ഷേത്രം', h1: 'Sikharam (ശിഖരം) in both hands', h2: 'Opposing pinnacles', cat: 'weapons' },
  { id: 48, nameEn: 'Mountain / Highland (Parvatham)', nameMl: 'പർവ്വതം', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Sikharam (ശിഖരം)', cat: 'nature' },
  { id: 49, nameEn: 'River / Sacred Stream (Nadhi)', nameMl: 'നദി', h1: 'Pathaaka (പതാക)', h2: 'Sarpasirassu (സർപ്പശിരസ്സ്)', cat: 'nature' },
  { id: 50, nameEn: 'Ocean / Deep Sea (Samudram)', nameMl: 'സമുദ്രം', h1: 'Mudraakhyam (മുദ്രാഖ്യം)', h2: 'Pathaaka (പതാക)', cat: 'nature' },
  { id: 51, nameEn: 'Dense Forest (Kaadu)', nameMl: 'കാട്', h1: 'Araalam (അരാളം)', h2: 'Pathaaka (പതാക)', cat: 'nature' },
  { id: 52, nameEn: 'Sacred Fire (Agni Jwala)', nameMl: 'അഗ്നിജ്വാല', h1: 'Anjaly (അഞ്ജലി)', h2: 'Thripathaaka (ത്രിപതാക)', cat: 'nature' },
  { id: 53, nameEn: 'Gentle Wind (Kaattu)', nameMl: 'കാറ്റ്', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Araalam (അരാളം)', cat: 'nature' },
  { id: 54, nameEn: 'Elephant / Tusker (Aana)', nameMl: 'ആന', h1: 'Pathaaka (പതാക)', h2: 'Mushti (മുഷ്ടി)', cat: 'nature' },
  { id: 55, nameEn: 'Lion / Forest King (Simham)', nameMl: 'സിംഹം', h1: 'Pathaaka (പതാക)', h2: 'Oornanabham (ഊർണ്ണനാഭം)', cat: 'nature' },
  { id: 56, nameEn: 'Tiger (Kaduva)', nameMl: 'കടുവ', h1: 'Oornanabham (ഊർണ്ണനാഭം)', h2: 'Mushti (മുഷ്ടി)', cat: 'nature' },
  { id: 57, nameEn: 'Spotted Deer (Maan)', nameMl: 'മാൻ', h1: 'Mrigaseersham (മൃഗശീർഷം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'nature' },
  { id: 58, nameEn: 'Peacock (Mayil)', nameMl: 'മയിൽ', h1: 'Kapithakam (കപിത്ഥകം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'nature' },
  { id: 59, nameEn: 'Golden Swan (Hamsam)', nameMl: 'ഹംസം', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Sikharam (ശിഖരം)', cat: 'nature' },
  { id: 60, nameEn: 'Serpent / Cobra (Paampu)', nameMl: 'പാമ്പ്', h1: 'Sarpasirassu (സർപ്പശിരസ്സ്)', h2: 'Araalam (അരാളം)', cat: 'nature' },
  { id: 61, nameEn: 'Fish / Aquatic Life (Matsyam)', nameMl: 'മത്സ്യം', h1: 'Hamsapaksham (ഹംസപക്ഷം) in both hands', h2: 'Crossed fin motion', cat: 'nature' },
  { id: 62, nameEn: 'Tortoise (Koormam)', nameMl: 'കൂർമ്മം', h1: 'Hamsapaksham (ഹംസപക്ഷം)', h2: 'Mushti (മുഷ്ടി) dome', cat: 'nature' },
  { id: 63, nameEn: 'Wild Bird (Pakshi)', nameMl: 'പക്ഷി', h1: 'Shukathundam (ശുകതുണ്ഡം)', h2: 'Hamsapaksham (ഹംസപക്ഷം)', cat: 'nature' },
  { id: 64, nameEn: 'Hovering Bee (Vandu)', nameMl: 'വണ്ട്', h1: 'Bhramaram (ഭ്രമരം)', h2: 'Katakam (കടകം)', cat: 'nature' },
  { id: 65, nameEn: 'Great Tree (Vriksham)', nameMl: 'വൃക്ഷം', h1: 'Araalam (അരാളം)', h2: 'Mudraakhyam (മുദ്രാഖ്യം)', cat: 'nature' },
  { id: 66, nameEn: 'Blooming Flower (Poovu)', nameMl: 'പൂവ്', h1: 'Katakam (കടകം)', h2: 'Mukulam (മുകുളം)', cat: 'nature' },
  { id: 67, nameEn: 'Ripe Fruit (Pazham)', nameMl: 'പഴം', h1: 'Oornanabham (ഊർണ്ണനാഭം)', h2: 'Mukulam (മുകുളം)', cat: 'nature' },
  { id: 68, nameEn: 'Lightning / Forked Flash (Minnal)', nameMl: 'മിന്നൽ', h1: 'Karthareemukham (കർത്തരീമുഖം)', h2: 'Pallavam (പല്ലവം)', cat: 'nature' }
];

// Generate Tab 1 HTML: 24 Root Mudras Cards
let tab1Cards = '';
canonicalMudras.forEach(m => {
  const padIdx = String(m.idx).padStart(2, '0');
  const dPills = m.doubleSymbols.map((s, i) =>
    `<span class="symbol-pill"><span class="symbol-pill-num">${i+1}.</span> ${s}</span>`
  ).join('');

  const sPills = m.singleSymbols.length
    ? m.singleSymbols.map((s, i) =>
        `<span class="symbol-pill"><span class="symbol-pill-num">${i+1}.</span> ${s}</span>`
      ).join('')
    : '<span class="symbol-pill symbol-pill-na">No exclusive single-hand symbols codified (Primarily Samyukta / Mixed usage)</span>';

  const allSymbolsSearchText = (m.doubleSymbols.join(' ') + ' ' + m.singleSymbols.join(' ')).toLowerCase();

  tab1Cards += `
    <div class="lexicon-mudra-card ${m.idx <= 2 ? 'is-open' : ''}" data-mudra-idx="${m.idx}" data-search-text="${m.nameEn.toLowerCase()} ${m.nameMl} ${m.meaningEn.toLowerCase()} ${allSymbolsSearchText}">
      <div class="lexicon-mudra-header" role="button" tabindex="0" aria-expanded="${m.idx <= 2 ? 'true' : 'false'}">
        <div class="lexicon-mudra-title-wrap">
          <img src="${m.img}" alt="${m.nameEn} sketch" class="lexicon-mudra-thumb" loading="lazy">
          <div>
            <div class="lexicon-mudra-index-kicker">#${padIdx} • ROOT MUDRA</div>
            <h3 class="lexicon-mudra-name">
              ${m.nameEn} <span class="lexicon-mudra-meaning">(${m.meaningEn})</span>
              <span class="lexicon-name-ml">• ${m.nameMl}</span>
            </h3>
          </div>
        </div>
        <div class="lexicon-mudra-badge-wrap">
          <span class="lexicon-badge">${m.doubleCount} Double</span>
          ${m.singleCount > 0 ? `<span class="lexicon-badge">${m.singleCount} Single</span>` : ''}
          <span class="lexicon-badge lexicon-badge-gold">Total: ${m.total}</span>
          <span class="lexicon-toggle-icon" aria-hidden="true">▾</span>
        </div>
      </div>
      <div class="lexicon-mudra-body">
        <div class="symbols-subheading">
          <span>Double Hand Symbols (സംയുത ചിഹ്നങ്ങൾ)</span>
          <span class="symbols-count-chip">${m.doubleCount} Symbols</span>
        </div>
        <div class="symbols-numbered-grid">
          ${dPills}
        </div>

        <div class="symbols-subheading">
          <span>Single Hand Symbols (അസംയുത ചിഹ്നങ്ങൾ)</span>
          <span class="symbols-count-chip">${m.singleCount} Symbols</span>
        </div>
        <div class="symbols-numbered-grid">
          ${sPills}
        </div>
      </div>
    </div>
  `;
});

// Generate Tab 2 HTML: 68 Misra Mudras Cards
let tab2Cards = '';
misraMudrasList.forEach(m => {
  const padId = String(m.id).padStart(2, '0');
  tab2Cards += `
    <div class="misra-card" data-category="${m.cat}" data-search-text="${m.id} ${m.nameEn.toLowerCase()} ${m.nameMl} ${m.h1.toLowerCase()} ${m.h2.toLowerCase()}">
      <div class="misra-card-top">
        <span class="misra-card-num">#${padId}</span>
        <span class="misra-category-pill">${m.cat.toUpperCase()}</span>
      </div>
      <h4 class="misra-card-title">${m.nameEn}</h4>
      <div class="misra-card-title-ml">${m.nameMl}</div>
      <div class="misra-hands-grid">
        <div class="misra-hand-item">
          <span class="misra-hand-label">Hand 1 (Right):</span>
          <span class="misra-hand-name">${m.h1}</span>
        </div>
        <div class="misra-hand-item">
          <span class="misra-hand-label">Hand 2 (Left):</span>
          <span class="misra-hand-name">${m.h2}</span>
        </div>
      </div>
    </div>
  `;
});

const completeSectionHtml = `
    <!-- Section 4: Comprehensive Master Mudra Lexicon (24 Root Mudras, Samaana, 68 Misra Mudras, Baana) -->
    <section class="explore-reference-section" id="masterLexiconSection" aria-labelledby="masterLexiconHeading">
      <div class="explore-reference-box">
        
        <!-- Header -->
        <header class="explore-reference-header">
          <div class="explore-badge">
            <span class="explore-badge-icon">✦</span>
            <span data-lang="en">CANONICAL LEXICON OF HASTHALAKSHANA DEEPIKA</span>
            <span data-lang="ml">ഹസ്തലക്ഷണ ദീപികയിലെ പ്രാമാണിക വിന്യാസം</span>
          </div>
          <h2 id="masterLexiconHeading" class="explore-reference-title">
            <span data-lang="en">The Complete Kathakali Mudra Directory: 24 Root Mudras, Samaana, & 68 Misra Mudras</span>
            <span data-lang="ml">സമ്പൂർണ്ണ കഥകളി മുദ്രാ നിഘണ്ടു: 24 അടിസ്ഥാന മുദ്രകൾ, സമാന മുദ്രകൾ, 68 മിശ്ര മുദ്രകൾ</span>
          </h2>
          <p class="explore-reference-desc" data-lang="en">
            Codified from the sacred treatise <em>Hasthalakshana Deepika</em>. Explore the definitive 24 Root Mudras with all 406 Double Hand and Single Hand symbols, the functional grammar of Samaana Mudras, the Baana Mudra derivative, the addressing rule, and the complete directory of 68 Mixed Mudras (Misra Hasthas).
          </p>
          <p class="explore-reference-desc" data-lang="ml">
            ഹസ്തലക്ഷണ ദീപികയെ ആധാരമാക്കിയുള്ള സമ്പൂർണ്ണ നാട്യനിഘണ്ടു. 24 അടിസ്ഥാന മുദ്രകളിലെ 406 സംയുത-അസംയുത പ്രയോഗങ്ങളും, സമാന മുദ്രകളും, ബാണ മുദ്രയും, സംബോധനാ നിയമവും, 68 മിശ്ര മുദ്രകളുടെ സമ്പൂർണ്ണ ക്രമവും ഇവിടെ വിശദമായി പഠിക്കാം.
          </p>
        </header>

        <!-- Navigation Tabs -->
        <div class="lexicon-tabs-nav" role="tablist" aria-label="Mudra Lexicon Directory Tabs">
          <button type="button" class="lexicon-tab-btn is-active" data-tab="tab-root-mudras" role="tab" aria-selected="true" aria-controls="tab-root-mudras">
            <span data-lang="en">24 Root Mudras & Symbols List (406 Signs)</span>
            <span data-lang="ml">24 അടിസ്ഥാന മുദ്രകളും ചിഹ്നങ്ങളും (406 എണ്ണം)</span>
          </button>
          <button type="button" class="lexicon-tab-btn" data-tab="tab-misra-mudras" role="tab" aria-selected="false" aria-controls="tab-misra-mudras">
            <span data-lang="en">68 Misra Mudras (Mixed Mudras List)</span>
            <span data-lang="ml">68 മിശ്ര മുദ്രകളുടെ സമ്പൂർണ്ണ പട്ടിക</span>
          </button>
          <button type="button" class="lexicon-tab-btn" data-tab="tab-samaana-mudras" role="tab" aria-selected="false" aria-controls="tab-samaana-mudras">
            <span data-lang="en">Samaana Mudras (Same Mudras)</span>
            <span data-lang="ml">സമാന മുദ്രകൾ</span>
          </button>
          <button type="button" class="lexicon-tab-btn" data-tab="tab-special-rules" role="tab" aria-selected="false" aria-controls="tab-special-rules">
            <span data-lang="en">Baana Mudra & Addressing Rule</span>
            <span data-lang="ml">ബാണ മുദ്ര & സംബോധനാ നിയമം</span>
          </button>
        </div>

        <!-- ====================================================================
             TAB 1: 24 ROOT MUDRAS WITH FULL DOUBLE & SINGLE HAND SYMBOLS
             ==================================================================== -->
        <div id="tab-root-mudras" class="lexicon-tab-pane is-active" role="tabpanel" aria-labelledby="tab-root-mudras">
          
          <!-- Filter & Controls Toolbar -->
          <div class="lexicon-toolbar-wrap">
            <div class="lexicon-search-wrap">
              <svg class="explore-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="lexiconSymbolSearch" class="lexicon-search-input" placeholder="Search across all 406 symbols (e.g. Elephant, Sun, King, Water, Veena)..." aria-label="Search Mudra Symbols">
              <button type="button" id="lexiconSearchClear" class="lexicon-search-clear" aria-label="Clear symbol search">✕</button>
            </div>
            <div class="lexicon-actions-wrap">
              <button type="button" id="lexiconExpandAllBtn" class="lexicon-action-btn">▼ Expand All</button>
              <button type="button" id="lexiconCollapseAllBtn" class="lexicon-action-btn">▲ Collapse All</button>
            </div>
          </div>

          <!-- Mudras Accordion List -->
          <div class="lexicon-mudras-container" id="lexiconMudrasContainer">
            ${tab1Cards}
          </div>

          <div id="lexiconNoResults" class="lexicon-no-results" style="display: none;">
            <p>No matching symbols found. Try searching for "King", "Flower", "Cloud", "God", or "River".</p>
          </div>
        </div>

        <!-- ====================================================================
             TAB 2: 68 MISRA MUDRAS (MIXED MUDRAS)
             ==================================================================== -->
        <div id="tab-misra-mudras" class="lexicon-tab-pane" role="tabpanel" aria-labelledby="tab-misra-mudras">
          
          <!-- Overview Box -->
          <div class="misra-overview-box">
            <div class="reference-card-num">COMPOSITE ANGIKA GRAMMAR • മിശ്ര ഹസ്തം</div>
            <h3 class="misra-overview-title">
              <span data-lang="en">What are Misra Mudras (Mixed Mudras)?</span>
              <span data-lang="ml">എന്താണ് മിശ്ര മുദ്രകൾ?</span>
            </h3>
            <p class="misra-overview-text" data-lang="en">
              In Kathakali, certain mythological archetypes, celestial deities, relationships, weapons, and cosmic natural elements cannot be depicted with a single hand gesture. They require two different Mudras executed simultaneously across both hands. There are strictly <strong>68 Codified Mixed Mudras (മിശ്ര മുദ്രകൾ)</strong> in classical Kathakali tradition.
            </p>
            <p class="misra-overview-text" data-lang="ml">
              കഥകളിയിൽ ചില ദേവി-ദേവന്മാർ, വിശേഷ ബന്ധങ്ങൾ, ആയുധങ്ങൾ, പ്രകൃതിഭാവങ്ങൾ എന്നിവയെ ഒറ്റക്കൈ കൊണ്ട് പ്രകടിപ്പിക്കാൻ സാധ്യമല്ല. ഇത്തരം സന്ദർഭങ്ങളിൽ രണ്ടു കൈകളിലും രണ്ട് വ്യത്യസ്ത മുദ്രകൾ ഒരേസമയം കാണിക്കുന്നു. ഇപ്രകാരം ചിട്ടപ്പെടുത്തിയിട്ടുള്ള <strong>68 മിശ്ര മുദ്രകളുടെ</strong> സമ്പൂർണ്ണ പട്ടിക താഴെ നൽകുന്നു.
            </p>
          </div>

          <!-- Filter & Search Toolbar -->
          <div class="misra-toolbar-wrap">
            <div class="lexicon-search-wrap">
              <svg class="explore-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="misraSearchInput" class="lexicon-search-input" placeholder="Search 68 mixed mudras (e.g. Indra, Shiva, Rama, Ravana, Chariot, Sword)..." aria-label="Search Misra Mudras">
              <button type="button" id="misraSearchClear" class="lexicon-search-clear" aria-label="Clear search">✕</button>
            </div>
            <div class="misra-filters-wrap" role="group" aria-label="Misra Categories">
              <button type="button" class="misra-filter-btn is-active" data-cat="all">All (68)</button>
              <button type="button" class="misra-filter-btn" data-cat="deities">Deities & Epics (25)</button>
              <button type="button" class="misra-filter-btn" data-cat="kinship">Royalty & Kinship (13)</button>
              <button type="button" class="misra-filter-btn" data-cat="weapons">Weapons & Objects (9)</button>
              <button type="button" class="misra-filter-btn" data-cat="nature">Nature & Animals (21)</button>
            </div>
          </div>

          <!-- Misra Cards Grid -->
          <div class="misra-cards-grid" id="misraCardsGrid">
            ${tab2Cards}
          </div>

          <div id="misraNoResults" class="lexicon-no-results" style="display: none;">
            <p>No matching mixed mudras found. Try searching for "Indra", "Shiva", "Vishnu", or "Chariot".</p>
          </div>
        </div>

        <!-- ====================================================================
             TAB 3: SAMAANA MUDRAS (SAME MUDRAS)
             ==================================================================== -->
        <div id="tab-samaana-mudras" class="lexicon-tab-pane" role="tabpanel" aria-labelledby="tab-samaana-mudras">
          <div class="samaana-hero-card">
            <div class="reference-card-num">FUNCTIONAL GRAMMAR • സമാന മുദ്രകൾ</div>
            <h3 class="samaana-hero-title">
              <span data-lang="en">Samaana Mudras (Same Mudras) Explained</span>
              <span data-lang="ml">സമാന മുദ്രകൾ — തത്വം & പ്രയോഗം</span>
            </h3>
            <p class="samaana-hero-desc" data-lang="en">
              In Kathakali, <strong>Samaana Mudras (Same Mudras)</strong> refer to hand gestures where the identical physical formation is used to denote two or more completely divergent symbols. The distinction between the meanings is brought alive through facial expressions (Mukhaja Abhinaya), eye glances (Drishti Bhedas), breathing pauses, and the cadence of the percussion (Tala).
            </p>
            <p class="samaana-hero-desc" data-lang="ml">
              ഒരേ കൈവിന്യാസം തന്നെ തികച്ചും വ്യത്യസ്തമായ രണ്ട് അർത്ഥങ്ങളെ അല്ലെങ്കിൽ ഭാവങ്ങളെ കുറിക്കാൻ ഉപയോഗിക്കുന്നതിനെയാണ് <strong>സമാന മുദ്രകൾ</strong> എന്ന് പറയുന്നത്. നേത്രാഭിനയം (ദൃഷ്ടിഭേദം), മുഖഭാവം, താളത്തിന്റെ വേഗത എന്നിവയിലൂടെയാണ് ഈ അർത്ഥവ്യത്യാസം കാണികൾക്ക് വ്യക്തമാക്കിക്കൊടുക്കുന്നത്.
            </p>
          </div>

          <div class="samaana-examples-grid">
            
            <!-- Canonical Example: Karthareemukham -->
            <div class="samaana-card samaana-card-highlight">
              <div class="samaana-badge">CANONICAL SAMAANA EXAMPLE • പ്രഥമ ഉദാഹരണം</div>
              <h4 class="samaana-title">Karthareemukham (കർത്തരീമുഖം)</h4>
              <p class="samaana-lead">
                The Mudra <em>Karthareemukham</em> (Scissor's Face) is famously codified to represent both:
              </p>
              <div class="samaana-duo-grid">
                <div class="samaana-duo-item">
                  <span class="samaana-duo-label">Symbol A</span>
                  <div class="samaana-duo-name">"Time" (കാലം)</div>
                  <p class="samaana-duo-desc">
                    Performed with an expansive, sustained horizontal movement of the wrist and an introspective, distant gaze denoting eternity or chronological passage.
                  </p>
                </div>
                <div class="samaana-duo-item">
                  <span class="samaana-duo-label">Symbol B</span>
                  <div class="samaana-duo-name">"Near / Vicinity" (സമീപം)</div>
                  <p class="samaana-duo-desc">
                    Executed with a sharp, localized flick of the index and little fingers brought close to the torso accompanied by focused, direct eye contact.
                  </p>
                </div>
              </div>
            </div>

            <!-- Example 2: Mushti -->
            <div class="samaana-card">
              <div class="samaana-badge">SAMAANA MUDRA EXAMPLE • ഉദാഹരണം 2</div>
              <h4 class="samaana-title">Mushti (മുഷ്ടി — The Fist)</h4>
              <p class="samaana-lead">
                The clenched fist of <em>Mushti</em> depicts divergent concepts depending on height and tension:
              </p>
              <div class="samaana-duo-grid">
                <div class="samaana-duo-item">
                  <span class="samaana-duo-label">Symbol A</span>
                  <div class="samaana-duo-name">Charioteer / Strength (സാരഥി / വീര്യം)</div>
                  <p class="samaana-duo-desc">Held firmly at shoulder level with chest expanded and assertive gaze.</p>
                </div>
                <div class="samaana-duo-item">
                  <span class="samaana-duo-label">Symbol B</span>
                  <div class="samaana-duo-name">Curse / Death / Mud (ശാപം / മണ്ണ്)</div>
                  <p class="samaana-duo-desc">Inverted downwards with grim sorrow or intense wrath.</p>
                </div>
              </div>
            </div>

            <!-- Example 3: Hamsapaksham -->
            <div class="samaana-card">
              <div class="samaana-badge">SAMAANA MUDRA EXAMPLE • ഉദാഹരണം 3</div>
              <h4 class="samaana-title">Hamsapaksham (ഹംസപക്ഷം — Swan's Wing)</h4>
              <p class="samaana-lead">
                The versatile swan wing hand conveys over 53 concepts with opposing emotional valences:
              </p>
              <div class="samaana-duo-grid">
                <div class="samaana-duo-item">
                  <span class="samaana-duo-label">Symbol A</span>
                  <div class="samaana-duo-name">Sword / Anger (വാൾ / ക്രോധം)</div>
                  <p class="samaana-duo-desc">Double hand slicing forward with red-hot Raudra Rasa.</p>
                </div>
                <div class="samaana-duo-item">
                  <span class="samaana-duo-label">Symbol B</span>
                  <div class="samaana-duo-name">Salutation / Moon / Calm (നമസ്കാരം / ചന്ദ്രൻ)</div>
                  <p class="samaana-duo-desc">Single hand gently ascending with serene Shanta Rasa.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ====================================================================
             TAB 4: SPECIAL DERIVATIONS (BAANA MUDRA & ADDRESSING RULE)
             ==================================================================== -->
        <div id="tab-special-rules" class="lexicon-tab-pane" role="tabpanel" aria-labelledby="tab-special-rules">
          <div class="special-rules-grid">
            
            <!-- Baana Mudra Card -->
            <div class="special-rule-card">
              <div class="reference-card-num">SPECIAL DERIVATION • ബാണ മുദ്ര</div>
              <h3 class="special-rule-title">Baana Mudra (ബാണ മുദ്ര)</h3>
              <div class="special-rule-sub">Derivative of Mushti with Straightened Little Finger</div>
              <div class="special-rule-body">
                <p class="special-rule-text" data-lang="en">
                  In the root gesture <strong>"Mushti"</strong>, when all four fingers are tightly curled into the palm, straightening the <strong>small finger (little finger / കനിഷ്ഠിക)</strong> upright creates the specialized <strong>"Baana" (ബാണ) Mudra</strong>.
                </p>
                <p class="special-rule-text" data-lang="ml">
                  നാലു വിരലുകളും ഉള്ളംകൈയിലേക്ക് മടക്കി തള്ളവിരൽ കൊണ്ട് അമർത്തിപ്പിടിക്കുന്ന <strong>"മുഷ്ടി"</strong> മുദ്രയിൽ, <strong>ചെറുവിരൽ മാത്രം കുത്തനെ നിവർത്തുമ്പോൾ</strong> ലഭിക്കുന്ന വിശേഷാൽ മുദ്രയാണ് <strong>"ബാണ" മുദ്ര</strong>.
                </p>

                <div class="symbols-subheading">Codified Significations of Baana Mudra</div>
                <div class="baana-symbols-grid">
                  <div class="baana-symbol-item">
                    <span class="baana-symbol-bullet">✦</span>
                    <div>
                      <strong>Oppose / Resist (തടയുക / എതിർക്കുക):</strong> Used in duel confrontations and disputations.
                    </div>
                  </div>
                  <div class="baana-symbol-item">
                    <span class="baana-symbol-bullet">✦</span>
                    <div>
                      <strong>Stop!! (നിൽക്കൂ!! / ആജ്ഞ):</strong> Forceful command commanding an enemy or chariot to halt immediately.
                    </div>
                  </div>
                  <div class="baana-symbol-item">
                    <span class="baana-symbol-bullet">✦</span>
                    <div>
                      <strong>Coming / Arrival (വരവ് / ആഗമനം):</strong> Signaling an imminent approach or entrance onto the scene.
                    </div>
                  </div>
                  <div class="baana-symbol-item">
                    <span class="baana-symbol-bullet">✦</span>
                    <div>
                      <strong>Future (ഭാവി / വരാനിരിക്കുന്നത്):</strong> Delineating chronological prophecy or forthcoming destiny.
                    </div>
                  </div>
                  <div class="baana-symbol-item">
                    <span class="baana-symbol-bullet">✦</span>
                    <div>
                      <strong>Piercing Arrow (ശരം / മൂർച്ചയേറിയ അസ്ത്രം):</strong> Directing an arrow towards its target.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Addressing Rule Card -->
            <div class="special-rule-card">
              <div class="reference-card-num">STAGE CONVENTION • സംബോധനാ നിയമം</div>
              <h3 class="special-rule-title">Addressing Anyone (സംബോധന)</h3>
              <div class="special-rule-sub">Codified Theatrical Rule of Hamsapaksham</div>
              <div class="special-rule-body">
                <p class="special-rule-text" data-lang="en">
                  In classical Kathakali acting pedagogy codified in the <em>Hasthalakshana Deepika</em>, the theatrical convention of <strong>"Addressing" (സംബോധന)</strong>—calling out to or speaking directly to any person, deity, sage, or character—is mandatorily and exclusively performed using the Mudra <strong>Hamsapaksham (ഹംസപക്ഷം)</strong>.
                </p>
                <p class="special-rule-text" data-lang="ml">
                  കഥകളി നാട്യശാസ്ത്ര നിയമപ്രകാരം രംഗത്ത് മറ്റേതൊരു വ്യക്തിയെയോ, ദേവനെയോ, അസുരനെയോ, കഥാപാത്രത്തെയോ <strong>"സംബോധന"</strong> ചെയ്യുന്നതിന് (വിളിക്കുന്നതിനോ അഭിസംബോധന ചെയ്യുന്നതിനോ) നിഷ്കർഷിച്ചിട്ടുള്ളത് <strong>ഹംസപക്ഷം</strong> എന്ന മുദ്രയാണ്.
                </p>

                <div class="addressing-features-box">
                  <div class="addressing-feature-row">
                    <span class="addressing-feature-icon">🪔</span>
                    <div>
                      <strong>Execution:</strong> The hand is raised gracefully forward with the palm open and fingers straight, slightly curved upward like a swan's wing, directing the focus toward the addressed character.
                    </div>
                  </div>
                  <div class="addressing-feature-row">
                    <span class="addressing-feature-icon">👁️</span>
                    <div>
                      <strong>Eye Synchronization:</strong> The actor's eye pupils lock firmly onto the character being addressed before the hand sweeps gracefully to begin the dialogue.
                    </div>
                  </div>
                  <div class="addressing-feature-row">
                    <span class="addressing-feature-icon">📜</span>
                    <div>
                      <strong>Universal Scope:</strong> Whether addressing a king, a consort, a rival warrior, or a celestial god, Hamsapaksham establishes the bridge of communication.
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
`;

// Replace Section 4 in mudras.html
let html = fs.readFileSync('mudras.html', 'utf8');
const startTag = '<!-- Section 4: Codification Reference';
const endTag = '</main>';
const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(endTag, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx) + completeSectionHtml.trim() + '\n\n  ' + html.substring(endIdx);
  fs.writeFileSync('mudras.html', html, 'utf8');
  console.log('Successfully replaced Section 4 with Master Mudra Lexicon in mudras.html!');
} else {
  console.error('Could not find start/end tags for Section 4 in mudras.html');
}
