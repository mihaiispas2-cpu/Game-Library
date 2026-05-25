import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: 'elden-ring-shadow',
    title: 'Elden Ring: Shadow of the Erdtree',
    coverImage: '/src/assets/images/eldenu_hero_art_1779699506867.png',
    heroImage: '/src/assets/images/eldenu_hero_art_1779699506867.png',
    shortDescription: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring. A massive expansion that adds new lands, bosses, and endless adventures.',
    longDescription: 'The Land of Shadow. A place obscured by the Erdtree. Where the goddess Marika first set foot. In these strange new lands, players discover dark secrets of the world, met by others who follow in Miquella\'s footsteps with ulterior motives.',
    genres: ['Action RPG', 'Open World', 'Fantasy'],
    platforms: ['PC', 'PS5', 'XSX'],
    rating: 94,
    metacriticScore: 96,
    userScore: 9.4,
    lowestPrice: 39.99,
    originalPrice: 59.99,
    discount: 33,
    releaseDate: 'June 21, 2024',
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    engine: 'FromSoftware Engine',
    developmentTime: '3.5 years',
    budget: '$200M+',
    gameplayDuration: '40-60 hours',
    multiplayerSupport: 'Co-op & PvP',
    modSupport: 'Limited',
    drmInfo: 'Steam DRM',
    optimizationScore: 92,
    performanceRating: 'Excellent',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 59.99,
        discountedPrice: 39.99,
        discountPercentage: 33,
        historicalLow: 39.99,
        buyUrl: 'https://store.steampowered.com'
      },
      {
        storeName: 'Epic Games',
        originalPrice: 59.99,
        discountedPrice: 42.99,
        discountPercentage: 28,
        historicalLow: 39.99,
        buyUrl: 'https://epicgames.com'
      },
      {
        storeName: 'GOG',
        originalPrice: 59.99,
        discountedPrice: 41.99,
        discountPercentage: 30,
        historicalLow: 39.99,
        buyUrl: 'https://gog.com'
      },
      {
        storeName: 'Humble Bundle',
        originalPrice: 59.99,
        discountedPrice: 44.99,
        discountPercentage: 25,
        historicalLow: 39.99,
        buyUrl: 'https://humblebundle.com'
      }
    ],
    priceHistory: [
      { date: 'June 2024 (Launch Price)', price: 59.99 },
      { date: 'August 2024 (Summer Sale)', price: 47.99 },
      { date: 'November 2024 (Black Friday)', price: 39.99 },
      { date: 'December 2024 (Winter Sale)', price: 44.99 },
      { date: 'May 2025 (Current Price)', price: 39.99 }
    ],
    reviews: [
      {
        id: 'rev-er-1',
        avatarColor: 'bg-[#0091ff]',
        username: 'ShadowGamer92',
        rating: 10,
        text: 'An absolute masterpiece. The expansion adds so much depth to an already incredible game. The new areas are breathtaking and the boss fights are some of the best FromSoftware has ever created.',
        helpfulVotes: 342,
        date: '2 days ago',
        isRecommended: true
      },
      {
        id: 'rev-er-2',
        avatarColor: 'bg-[#00c853]',
        username: 'ProPlayer_Elite',
        rating: 8,
        text: 'Challenging but fair. The difficulty spike is real, but the sense of accomplishment after defeating each boss is unmatched. Performance has improved significantly since launch.',
        helpfulVotes: 189,
        date: '1 week ago',
        isRecommended: true
      },
      {
        id: 'rev-er-3',
        avatarColor: 'bg-[#ff9100]',
        username: 'CasualGamer2024',
        rating: 10,
        text: 'Even as someone who struggled with the base game, the expansion is incredible. The new mechanics and quality of life improvements make it more accessible without losing its soul.',
        helpfulVotes: 276,
        date: '3 days ago',
        isRecommended: true
      },
      {
        id: 'rev-er-4',
        avatarColor: 'bg-[#aa00ff]',
        username: 'RPGFanatic',
        rating: 10,
        text: 'Worth every penny. 40+ hours of content, amazing lore, beautiful environments, and some of the most creative boss designs. This sets a new standard for DLC expansions.',
        helpfulVotes: 421,
        date: '5 days ago',
        isRecommended: true
      }
    ]
  },
  {
    id: 'baldurs-gate-3',
    title: 'Baldur\'s Gate 3',
    coverImage: '/src/assets/images/bg3_cover_1779699570207.png',
    heroImage: '/src/assets/images/bg3_cover_1779699570207.png',
    shortDescription: 'Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.',
    longDescription: 'Mysterious abilities are awakening within you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become the ultimate evil. From the creators of Divinity: Original Sin 2 comes a next-generation RPG, set in the world of Dungeons & Dragons.',
    genres: ['RPG', 'Tactical', 'Turn-Based'],
    platforms: ['PC', 'PS5', 'XSX'],
    rating: 96,
    metacriticScore: 96,
    userScore: 9.6,
    lowestPrice: 59.99,
    originalPrice: 59.99,
    discount: 0,
    releaseDate: 'August 3, 2023',
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    engine: 'Divinity 4.0 Engine',
    developmentTime: '6 years',
    budget: '$100M+',
    gameplayDuration: '80-120 hours',
    multiplayerSupport: 'Co-op & PvP',
    modSupport: 'Full Support',
    drmInfo: 'DRM Free',
    optimizationScore: 90,
    performanceRating: 'Excellent',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 59.99,
        discountedPrice: 59.99,
        discountPercentage: 0,
        historicalLow: 59.99,
        buyUrl: 'https://store.steampowered.com'
      }
    ],
    priceHistory: [
      { date: 'August 2023', price: 59.99 }
    ],
    reviews: [
      {
        id: 'rev-bg-1',
        avatarColor: 'bg-[#ff1744]',
        username: 'TavTheBard',
        rating: 10,
        text: 'The absolute pinnacle of modern roleplaying games. The sheer depth of choices is mind-blowing.',
        helpfulVotes: 1054,
        date: '3 months ago',
        isRecommended: true
      }
    ]
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    coverImage: '/src/assets/images/cyber_cover_1779699587025.png',
    heroImage: '/src/assets/images/cyber_cover_1779699587025.png',
    shortDescription: 'An open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.',
    longDescription: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival. Upgraded with next-gen in mind and featuring free additional content, customize your character and playstyle as you take on jobs, build a reputation, and unlock upgrades.',
    genres: ['RPG', 'Action', 'Sci-Fi'],
    platforms: ['PC', 'PS5', 'XSX'],
    rating: 86,
    metacriticScore: 86,
    userScore: 8.6,
    lowestPrice: 29.99,
    originalPrice: 59.99,
    discount: 50,
    releaseDate: 'December 10, 2020',
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt RED',
    engine: 'REDengine 4',
    developmentTime: '5 years',
    budget: '$300M+',
    gameplayDuration: '30-100 hours',
    multiplayerSupport: 'None',
    modSupport: 'Full Support',
    drmInfo: 'DRM Free',
    optimizationScore: 85,
    performanceRating: 'Excellent',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 59.99,
        discountedPrice: 29.99,
        discountPercentage: 50,
        historicalLow: 29.99,
        buyUrl: 'https://store.steampowered.com'
      }
    ],
    priceHistory: [
      { date: 'Dec 2020', price: 59.99 },
      { date: 'Nov 2024', price: 29.99 }
    ],
    reviews: [
      {
        id: 'rev-cp-1',
        avatarColor: 'bg-[#ffee58]',
        username: 'Netrunner99',
        rating: 9,
        text: 'After all the patch updates, the game is finally what it was always meant to be. Incredible performance on high-end hardware with Ray Reconstruction!',
        helpfulVotes: 940,
        date: '1 month ago',
        isRecommended: true
      }
    ]
  },
  {
    id: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    coverImage: '/src/assets/images/rdr2_cover_1779699605487.png',
    heroImage: '/src/assets/images/rdr2_cover_1779699605487.png',
    shortDescription: 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age.',
    longDescription: 'America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive.',
    genres: ['Action', 'Adventure', 'Open World'],
    platforms: ['PC', 'PS4', 'Xbox One'],
    rating: 97,
    metacriticScore: 97,
    userScore: 9.7,
    lowestPrice: 39.99,
    originalPrice: 59.99,
    discount: 33,
    releaseDate: 'October 26, 2018',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    engine: 'RAGE Engine',
    developmentTime: '7 years',
    budget: '$500M+',
    gameplayDuration: '60-150 hours',
    multiplayerSupport: 'Online Multiplayer',
    modSupport: 'Partial Support',
    drmInfo: 'Rockstar DRM',
    optimizationScore: 95,
    performanceRating: 'Excellent',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 59.99,
        discountedPrice: 39.99,
        discountPercentage: 33,
        historicalLow: 39.99,
        buyUrl: 'https://store.steampowered.com'
      }
    ],
    priceHistory: [
      { date: 'Oct 2018', price: 59.99 }
    ],
    reviews: [
      {
        id: 'rev-rd-1',
        avatarColor: 'bg-[#ff3d00]',
        username: 'ArthurBeliever',
        rating: 10,
        text: 'The best story ever told in a video game. Period. Arthur Morgan is the goat of all gaming characters.',
        helpfulVotes: 2311,
        date: '6 months ago',
        isRecommended: true
      }
    ]
  },
  {
    id: 'starfield',
    title: 'Starfield',
    coverImage: '/src/assets/images/starfield_cover_1779699623322.png',
    heroImage: '/src/assets/images/starfield_cover_1779699623322.png',
    shortDescription: 'Starfield is the first new universe in over 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4.',
    longDescription: 'In this next-generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom as you embark on an epic journey to answer humanity’s greatest mystery.',
    genres: ['Sci-Fi', 'RPG', 'Open World'],
    platforms: ['PC', 'XSX'],
    rating: 83,
    metacriticScore: 83,
    userScore: 8.3,
    lowestPrice: 69.99,
    originalPrice: 69.99,
    discount: 0,
    releaseDate: 'September 6, 2023',
    developer: 'Bethesda Game Studios',
    publisher: 'Bethesda Softworks',
    engine: 'Creation Engine 2',
    developmentTime: '7 years',
    budget: '$200M+',
    gameplayDuration: '40-100 hours',
    multiplayerSupport: 'None',
    modSupport: 'Full Support',
    drmInfo: 'Steam DRM',
    optimizationScore: 80,
    performanceRating: 'Good',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 69.99,
        discountedPrice: 69.99,
        discountPercentage: 0,
        historicalLow: 69.99,
        buyUrl: 'https://store.steampowered.com'
      }
    ],
    priceHistory: [
      { date: 'Sept 2023', price: 69.99 }
    ],
    reviews: [
      {
        id: 'rev-sf-1',
        avatarColor: 'bg-[#2979ff]',
        username: 'ConstellationLover',
        rating: 8,
        text: 'Exploration can feel disjointed sometimes with menu screens, but the ship-building and secondary storylines are stellar.',
        helpfulVotes: 441,
        date: '5 months ago',
        isRecommended: true
      }
    ]
  },
  {
    id: 'hogwarts-legacy',
    title: 'Hogwarts Legacy',
    coverImage: '/src/assets/images/hogwarts_cover_1779699641494.png',
    heroImage: '/src/assets/images/hogwarts_cover_1779699641494.png',
    shortDescription: 'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books.',
    longDescription: 'Now you can take control of the action and be at the center of your own adventure in the wizarding world. Embark on a journey through familiar and new locations as you explore and discover magical beasts, customize your character and craft potions, master spell casting, upgrade talents and become the wizard you want to be.',
    genres: ['RPG', 'Adventure', 'Fantasy'],
    platforms: ['PC', 'PS5', 'XSX', 'Switch'],
    rating: 84,
    metacriticScore: 84,
    userScore: 8.4,
    lowestPrice: 59.99,
    originalPrice: 79.99,
    discount: 25,
    releaseDate: 'February 10, 2023',
    developer: 'Avalanche Software',
    publisher: 'Warner Bros. Games',
    engine: 'Unreal Engine 4',
    developmentTime: '5 years',
    budget: '$150M+',
    gameplayDuration: '30-70 hours',
    multiplayerSupport: 'None',
    modSupport: 'None',
    drmInfo: 'Denuvo DRM',
    optimizationScore: 85,
    performanceRating: 'Good',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 79.99,
        discountedPrice: 59.99,
        discountPercentage: 25,
        historicalLow: 59.99,
        buyUrl: 'https://store.steampowered.com'
      }
    ],
    priceHistory: [
      { date: 'Feb 2023', price: 79.99 }
    ],
    reviews: [
      {
        id: 'rev-hl-1',
        avatarColor: 'bg-[#00e5ff]',
        username: 'PotterHead99',
        rating: 10,
        text: 'Living my wizard dreams! Walking around Hogwarts feels completely magical. The attention of details is stunning!',
        helpfulVotes: 618,
        date: '10 months ago',
        isRecommended: true
      }
    ]
  },
  {
    id: 'resident-evil-4',
    title: 'Resident Evil 4',
    coverImage: '/src/assets/images/re4_cover_1779699661195.png',
    heroImage: '/src/assets/images/re4_cover_1779699661195.png',
    shortDescription: 'Survival is only the beginning. Six years have passed since the biological disaster in Raccoon City. Leon S. Kennedy, one of the survivors, has been sent to rescue the president\'s kidnapped daughter.',
    longDescription: 'He tracks her to a secluded European village, where there is something terribly wrong with the locals. And the curtain rises on this story of daring rescue and grueling horror where life and death, terror and catharsis intersect.',
    genres: ['Action', 'Horror', 'Survival'],
    platforms: ['PC', 'PS5', 'XSX', 'PS4'],
    rating: 93,
    metacriticScore: 93,
    userScore: 9.3,
    lowestPrice: 49.99,
    originalPrice: 62.49,
    discount: 20,
    releaseDate: 'March 24, 2023',
    developer: 'Capcom',
    publisher: 'Capcom',
    engine: 'RE Engine',
    developmentTime: '4 years',
    budget: '$80M+',
    gameplayDuration: '15-25 hours',
    multiplayerSupport: 'Mercenaries Mode',
    modSupport: 'Full Support',
    drmInfo: 'Denuvo DRM',
    optimizationScore: 92,
    performanceRating: 'Excellent',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 62.49,
        discountedPrice: 49.99,
        discountPercentage: 20,
        historicalLow: 49.99,
        buyUrl: 'https://store.steampowered.com'
      }
    ],
    priceHistory: [
      { date: 'March 2023', price: 62.49 }
    ],
    reviews: [
      {
        id: 'rev-re-1',
        avatarColor: 'bg-[#d500f9]',
        username: 'LeonSimp',
        rating: 10,
        text: 'The best remake of a masterpiece ever created. The atmosphere, gameplay pacing, and knife parry mechanic are perfect!',
        helpfulVotes: 812,
        date: '8 months ago',
        isRecommended: true
      }
    ]
  },
  {
    id: 'the-witcher-3',
    title: 'The Witcher 3',
    coverImage: '/src/assets/images/witcher_3_cover_1779701415187.png',
    heroImage: '/src/assets/images/witcher_3_cover_1779701415187.png',
    shortDescription: 'As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.',
    longDescription: 'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
    genres: ['RPG', 'Action', 'Open World'],
    platforms: ['PC', 'PS5', 'XSX', 'Switch'],
    rating: 92,
    metacriticScore: 92,
    userScore: 9.2,
    lowestPrice: 29.99,
    originalPrice: 39.99,
    discount: 25,
    releaseDate: 'May 18, 2015',
    developer: 'CD Projekt RED',
    publisher: 'CD Projekt RED',
    engine: 'REDengine 3',
    developmentTime: '3.5 years',
    budget: '$81M+',
    gameplayDuration: '50-100 hours',
    multiplayerSupport: 'None',
    modSupport: 'Full Support',
    drmInfo: 'DRM Free',
    optimizationScore: 89,
    performanceRating: 'Excellent',
    deals: [
      {
        storeName: 'Steam',
        originalPrice: 39.99,
        discountedPrice: 29.99,
        discountPercentage: 25,
        historicalLow: 9.99,
        buyUrl: 'https://store.steampowered.com'
      }
    ],
    priceHistory: [
      { date: 'May 2015', price: 39.99 }
    ],
    reviews: [
      {
        id: 'rev-tw-1',
        avatarColor: 'bg-[#ff9100]',
        username: 'WhiteWolf',
        rating: 10,
        text: 'The best RPG ever made. Period.',
        helpfulVotes: 999,
        date: '1 year ago',
        isRecommended: true
      }
    ]
  }
];
