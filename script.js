
/* =========================================================
   FRESHOPIA
   ULTIMATE ANIME COOKING & NUTRITION GAME ENGINE
   VERSION 3.0
========================================================= */


/* =========================================================
   1. GAME CONFIGURATION
========================================================= */

const GAME_KEY = "freshopiaUltimateSaveV3";

const AVATARS = [
    "👩🏻‍🍳", "👨🏻‍🍳", "👩🏼‍🍳", "👨🏼‍🍳",
    "👩🏽‍🍳", "👨🏽‍🍳", "🧑🏻‍🍳", "👩🏾‍🍳"
];

const LEVEL_TITLES = [
    "Beginner Chef",
    "Junior Chef",
    "Food Explorer",
    "Creative Chef",
    "Nutrition Expert",
    "Master Chef",
    "Super Chef",
    "Eco Chef",
    "Grand Chef",
    "Legendary Chef"
];

const LEVEL_XP = 250;

const GAME_REWARDS = {
    matching: 100,
    puzzle: 150,
    cooking: 200,
    quiz: 120,
    sorting: 130,
    challenge: 250
};

const DEFAULT_PLAYER = {
    name: "",
    avatar: "👩🏻‍🍳",
    style: "Healthy Chef",
    level: 1,
    xp: 0,
    coins: 0,
    ecoPoints: 0,
    gamesPlayed: 0,
    completedGames: 0,
    badges: [],
    completedLessons: [],
    unlockedOutfits: [],
    completedMission: false,
    soundEnabled: true,
    musicEnabled: false,
    gameHistory: []
};

let player = { ...DEFAULT_PLAYER };

let selectedAvatar = "👩🏻‍🍳";
let currentGame = null;
let currentQuestion = 0;
let gameScore = 0;
let gameTimer = null;
let gameTimeLeft = 30;
let gameFinished = false;
let gameAnswers = [];
let matchingSelection = [];
let matchedCards = [];
let sortingIndex = 0;
let cookingSelected = [];
let puzzleOrder = [];
let puzzleStep = 0;
let audioContext = null;
let musicInterval = null;


/* =========================================================
   2. INGREDIENT DATABASE
========================================================= */

const INGREDIENTS = [

    // VEGETABLES

    {
        name: "Broccoli",
        emoji: "🥦",
        category: "vegetables",
        calories: 34,
        protein: 2.8,
        carbs: 6.6,
        fat: 0.4,
        fiber: 2.6,
        vitamin: "Vitamin C and Vitamin K",
        benefit: "Supports normal immune function and contributes to bone health.",
        storage: "Keep refrigerated in a breathable bag.",
        sustainability: "Use the florets and stems to reduce food waste."
    },
    {
        name: "Spinach",
        emoji: "🥬",
        category: "vegetables",
        calories: 23,
        protein: 2.9,
        carbs: 3.6,
        fat: 0.4,
        fiber: 2.2,
        vitamin: "Vitamin A, C and K",
        benefit: "Contains folate, iron and antioxidant compounds.",
        storage: "Store dry and refrigerated.",
        sustainability: "Use fresh leaves in salads, soups and smoothies."
    },
    {
        name: "Carrot",
        emoji: "🥕",
        category: "vegetables",
        calories: 41,
        protein: 0.9,
        carbs: 9.6,
        fat: 0.2,
        fiber: 2.8,
        vitamin: "Beta-carotene (Vitamin A precursor)",
        benefit: "Contributes to normal vision and immune function.",
        storage: "Refrigerate and remove leafy tops before storage.",
        sustainability: "Use in soups, salads and vegetable stocks."
    },
    {
        name: "Tomato",
        emoji: "🍅",
        category: "vegetables",
        calories: 18,
        protein: 0.9,
        carbs: 3.9,
        fat: 0.2,
        fiber: 1.2,
        vitamin: "Vitamin C and Potassium",
        benefit: "Contains lycopene and other antioxidant compounds.",
        storage: "Keep ripe tomatoes refrigerated if necessary.",
        sustainability: "Use ripe tomatoes in sauces and soups."
    },
    {
        name: "Cucumber",
        emoji: "🥒",
        category: "vegetables",
        calories: 15,
        protein: 0.7,
        carbs: 3.6,
        fat: 0.1,
        fiber: 0.5,
        vitamin: "Vitamin K",
        benefit: "Has a high water content.",
        storage: "Keep refrigerated and avoid freezing.",
        sustainability: "Use in salads, sandwiches and refreshing drinks."
    },
    {
        name: "Avocado",
        emoji: "🥑",
        category: "vegetables",
        calories: 160,
        protein: 2,
        carbs: 8.5,
        fat: 14.7,
        fiber: 6.7,
        vitamin: "Vitamin E, K and Folate",
        benefit: "Provides mostly unsaturated fats and dietary fiber.",
        storage: "Allow to ripen at room temperature, then refrigerate.",
        sustainability: "Use the ripe fruit promptly to avoid waste."
    },
    {
        name: "Beetroot",
        emoji: "🫜",
        category: "vegetables",
        calories: 43,
        protein: 1.6,
        carbs: 9.6,
        fat: 0.2,
        fiber: 2.8,
        vitamin: "Folate and Potassium",
        benefit: "Contains naturally occurring nitrates and betalain pigments.",
        storage: "Refrigerate in a cool and dry environment.",
        sustainability: "Use in salads, soups and vegetable purees."
    },
    {
        name: "Bell Pepper",
        emoji: "🫑",
        category: "vegetables",
        calories: 31,
        protein: 1,
        carbs: 6,
        fat: 0.3,
        fiber: 2.1,
        vitamin: "Vitamin C",
        benefit: "Provides vitamin C and colorful plant compounds.",
        storage: "Keep refrigerated.",
        sustainability: "Use in stir-fries, soups and roasted dishes."
    },
    {
        name: "Zucchini",
        emoji: "🥒",
        category: "vegetables",
        calories: 17,
        protein: 1.2,
        carbs: 3.1,
        fat: 0.3,
        fiber: 1,
        vitamin: "Vitamin C and Potassium",
        benefit: "A low-energy-density vegetable containing water and fiber.",
        storage: "Refrigerate and use while fresh.",
        sustainability: "Use the entire vegetable in soups and meals."
    },
    {
        name: "Onion",
        emoji: "🧅",
        category: "vegetables",
        calories: 40,
        protein: 1.1,
        carbs: 9.3,
        fat: 0.1,
        fiber: 1.7,
        vitamin: "Vitamin C and B6",
        benefit: "Contains sulfur compounds and flavonoids.",
        storage: "Store in a cool, dry and ventilated place.",
        sustainability: "Use in sauces, stocks and soups."
    },

    // FRUITS

    {
        name: "Strawberry",
        emoji: "🍓",
        category: "fruits",
        calories: 32,
        protein: 0.7,
        carbs: 7.7,
        fat: 0.3,
        fiber: 2,
        vitamin: "Vitamin C",
        benefit: "Provides vitamin C and antioxidant compounds.",
        storage: "Refrigerate without washing until ready to eat.",
        sustainability: "Use very ripe strawberries in smoothies."
    },
    {
        name: "Banana",
        emoji: "🍌",
        category: "fruits",
        calories: 89,
        protein: 1.1,
        carbs: 22.8,
        fat: 0.3,
        fiber: 2.6,
        vitamin: "Vitamin B6 and Potassium",
        benefit: "Provides carbohydrates and potassium.",
        storage: "Keep at room temperature until ripe.",
        sustainability: "Use ripe bananas in pancakes and smoothies."
    },
    {
        name: "Blueberry",
        emoji: "🫐",
        category: "fruits",
        calories: 57,
        protein: 0.7,
        carbs: 14.5,
        fat: 0.3,
        fiber: 2.4,
        vitamin: "Vitamin C and K",
        benefit: "Contains anthocyanins and other polyphenols.",
        storage: "Refrigerate and wash before consumption.",
        sustainability: "Freeze extra berries to prevent waste."
    },
    {
        name: "Apple",
        emoji: "🍎",
        category: "fruits",
        calories: 52,
        protein: 0.3,
        carbs: 13.8,
        fat: 0.2,
        fiber: 2.4,
        vitamin: "Vitamin C",
        benefit: "Provides dietary fiber, especially when eaten with its skin.",
        storage: "Store in a cool place or refrigerator.",
        sustainability: "Use in fruit salads and baked dishes."
    },
    {
        name: "Orange",
        emoji: "🍊",
        category: "fruits",
        calories: 47,
        protein: 0.9,
        carbs: 11.8,
        fat: 0.1,
        fiber: 2.4,
        vitamin: "Vitamin C",
        benefit: "Contributes to normal immune function.",
        storage: "Keep in a cool place or refrigerate.",
        sustainability: "Use the zest in recipes when appropriate."
    },
    {
        name: "Mango",
        emoji: "🥭",
        category: "fruits",
        calories: 60,
        protein: 0.8,
        carbs: 15,
        fat: 0.4,
        fiber: 1.6,
        vitamin: "Vitamin A and C",
        benefit: "Provides beta-carotene and vitamin C.",
        storage: "Ripen at room temperature and refrigerate when ripe.",
        sustainability: "Use ripe mango in smoothies and desserts."
    },
    {
        name: "Kiwi",
        emoji: "🥝",
        category: "fruits",
        calories: 61,
        protein: 1.1,
        carbs: 14.7,
        fat: 0.5,
        fiber: 3,
        vitamin: "Vitamin C and K",
        benefit: "Provides vitamin C and dietary fiber.",
        storage: "Refrigerate when ripe.",
        sustainability: "Use in fruit salads and breakfast bowls."
    },
    {
        name: "Pineapple",
        emoji: "🍍",
        category: "fruits",
        calories: 50,
        protein: 0.5,
        carbs: 13.1,
        fat: 0.1,
        fiber: 1.4,
        vitamin: "Vitamin C and Manganese",
        benefit: "Contains bromelain enzymes.",
        storage: "Refrigerate after cutting.",
        sustainability: "Use the fruit in smoothies and savory dishes."
    },
    {
        name: "Watermelon",
        emoji: "🍉",
        category: "fruits",
        calories: 30,
        protein: 0.6,
        carbs: 7.6,
        fat: 0.2,
        fiber: 0.4,
        vitamin: "Vitamin C and Lycopene",
        benefit: "Has a high water content.",
        storage: "Refrigerate cut watermelon.",
        sustainability: "Use leftover fruit in refreshing drinks."
    },
    {
        name: "Pear",
        emoji: "🍐",
        category: "fruits",
        calories: 57,
        protein: 0.4,
        carbs: 15.2,
        fat: 0.1,
        fiber: 3.1,
        vitamin: "Vitamin C and K",
        benefit: "Provides dietary fiber.",
        storage: "Ripen at room temperature.",
        sustainability: "Use ripe pears in oatmeal and desserts."
    },

    // PROTEINS

    {
        name: "Chicken Breast",
        emoji: "🍗",
        category: "proteins",
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        vitamin: "Vitamin B6 and Niacin",
        benefit: "Provides high-quality complete protein.",
        storage: "Keep refrigerated and cook thoroughly. Avoid cross-contamination.",
        sustainability: "Plan portions carefully to reduce leftovers."
    },
    {
        name: "Salmon",
        emoji: "🐟",
        category: "proteins",
        calories: 208,
        protein: 20,
        carbs: 0,
        fat: 13,
        fiber: 0,
        vitamin: "Vitamin D and B12",
        benefit: "Provides protein and omega-3 fatty acids.",
        storage: "Keep refrigerated and follow safe cooking guidance.",
        sustainability: "Choose responsibly sourced seafood."
    },
    {
        name: "Egg",
        emoji: "🥚",
        category: "proteins",
        calories: 155,
        protein: 13,
        carbs: 1.1,
        fat: 11,
        fiber: 0,
        vitamin: "Vitamin B12 and Choline",
        benefit: "Contains complete protein and several micronutrients.",
        storage: "Keep refrigerated in its original packaging.",
        sustainability: "Use eggs before their recommended date."
    },
    {
        name: "Lentils",
        emoji: "🫘",
        category: "proteins",
        calories: 116,
        protein: 9,
        carbs: 20,
        fat: 0.4,
        fiber: 7.9,
        vitamin: "Folate and Iron",
        benefit: "Plant-based protein and fiber source.",
        storage: "Store dried lentils in an airtight container.",
        sustainability: "Legumes can support lower-impact meal planning."
    },
    {
        name: "Chickpeas",
        emoji: "🫘",
        category: "proteins",
        calories: 164,
        protein: 8.9,
        carbs: 27.4,
        fat: 2.6,
        fiber: 7.6,
        vitamin: "Folate and Iron",
        benefit: "Provides plant protein and dietary fiber.",
        storage: "Store dried chickpeas in a dry place.",
        sustainability: "Use in soups, salads and hummus."
    },
    {
        name: "Tofu",
        emoji: "🧈",
        category: "proteins",
        calories: 76,
        protein: 8,
        carbs: 1.9,
        fat: 4.8,
        fiber: 0.3,
        vitamin: "Iron and Calcium (varies by product)",
        benefit: "A versatile plant-based protein.",
        storage: "Refrigerate and follow package instructions.",
        sustainability: "Use in stir-fries and balanced meals."
    },
    {
        name: "Turkey",
        emoji: "🍖",
        category: "proteins",
        calories: 135,
        protein: 30,
        carbs: 0,
        fat: 1,
        fiber: 0,
        vitamin: "Vitamin B6 and B12",
        benefit: "Provides lean protein.",
        storage: "Keep chilled and cook thoroughly.",
        sustainability: "Use leftovers in sandwiches and soups."
    },
    {
        name: "Tuna",
        emoji: "🐠",
        category: "proteins",
        calories: 132,
        protein: 28,
        carbs: 0,
        fat: 1,
        fiber: 0,
        vitamin: "Vitamin B12 and Selenium",
        benefit: "Provides protein and several micronutrients.",
        storage: "Refrigerate fresh tuna and follow package guidance for canned products.",
        sustainability: "Choose responsibly sourced tuna."
    },

    // GRAINS

    {
        name: "Oats",
        emoji: "🌾",
        category: "grains",
        calories: 389,
        protein: 16.9,
        carbs: 66.3,
        fat: 6.9,
        fiber: 10.6,
        vitamin: "Manganese and B Vitamins",
        benefit: "Contains beta-glucan soluble fiber.",
        storage: "Keep dry in an airtight container.",
        sustainability: "Use in breakfast bowls and homemade snacks."
    },
    {
        name: "Quinoa",
        emoji: "🍚",
        category: "grains",
        calories: 120,
        protein: 4.4,
        carbs: 21.3,
        fat: 1.9,
        fiber: 2.8,
        vitamin: "Magnesium and Folate",
        benefit: "Contains all nine essential amino acids.",
        storage: "Store dry and airtight.",
        sustainability: "Use as an alternative grain in meal planning."
    },
    {
        name: "Brown Rice",
        emoji: "🍚",
        category: "grains",
        calories: 123,
        protein: 2.7,
        carbs: 25.6,
        fat: 1,
        fiber: 1.6,
        vitamin: "Manganese and Magnesium",
        benefit: "Provides complex carbohydrates and some fiber.",
        storage: "Keep dry and airtight.",
        sustainability: "Cook suitable portions to reduce food waste."
    },
    {
        name: "Bulgur",
        emoji: "🌾",
        category: "grains",
        calories: 83,
        protein: 3.1,
        carbs: 18.6,
        fat: 0.2,
        fiber: 4.5,
        vitamin: "Manganese and Magnesium",
        benefit: "A whole-grain food rich in dietary fiber.",
        storage: "Keep in a cool, dry place.",
        sustainability: "Use in salads, soups and traditional dishes."
    },
    {
        name: "Whole Wheat Bread",
        emoji: "🍞",
        category: "grains",
        calories: 247,
        protein: 13,
        carbs: 41,
        fat: 4.2,
        fiber: 7,
        vitamin: "B Vitamins and Iron",
        benefit: "Provides whole-grain carbohydrates and fiber.",
        storage: "Keep sealed; freeze extra slices if needed.",
        sustainability: "Use stale bread in croutons or breadcrumbs."
    },
    {
        name: "Whole Wheat Pasta",
        emoji: "🍝",
        category: "grains",
        calories: 149,
        protein: 6,
        carbs: 30,
        fat: 1.5,
        fiber: 3.9,
        vitamin: "B Vitamins and Magnesium",
        benefit: "Provides carbohydrates and dietary fiber.",
        storage: "Store dry pasta in a sealed container.",
        sustainability: "Measure portions before cooking."
    },

    // DAIRY

    {
        name: "Milk",
        emoji: "🥛",
        category: "dairy",
        calories: 61,
        protein: 3.2,
        carbs: 4.8,
        fat: 3.3,
        fiber: 0,
        vitamin: "Calcium and Vitamin B12",
        benefit: "Provides calcium and complete protein.",
        storage: "Keep refrigerated and follow the expiry date.",
        sustainability: "Avoid purchasing more than you can use."
    },
    {
        name: "Greek Yogurt",
        emoji: "🥣",
        category: "dairy",
        calories: 97,
        protein: 9,
        carbs: 3.9,
        fat: 5,
        fiber: 0,
        vitamin: "Calcium and Vitamin B12",
        benefit: "Provides protein and calcium.",
        storage: "Keep refrigerated.",
        sustainability: "Use in sauces, breakfast bowls and dressings."
    },
    {
        name: "Cheese",
        emoji: "🧀",
        category: "dairy",
        calories: 402,
        protein: 25,
        carbs: 1.3,
        fat: 33,
        fiber: 0,
        vitamin: "Calcium and Vitamin B12",
        benefit: "Provides protein and calcium.",
        storage: "Keep refrigerated in suitable packaging.",
        sustainability: "Store properly to extend freshness."
    },

    // HEALTHY FATS

    {
        name: "Almonds",
        emoji: "🌰",
        category: "healthy-fats",
        calories: 579,
        protein: 21,
        carbs: 21.6,
        fat: 49.9,
        fiber: 12.5,
        vitamin: "Vitamin E and Magnesium",
        benefit: "Provides unsaturated fats and vitamin E.",
        storage: "Keep sealed in a cool and dry place.",
        sustainability: "Use measured portions in snacks and recipes."
    },
    {
        name: "Walnuts",
        emoji: "🥜",
        category: "healthy-fats",
        calories: 654,
        protein: 15.2,
        carbs: 13.7,
        fat: 65.2,
        fiber: 6.7,
        vitamin: "Copper and Manganese",
        benefit: "Contains plant-based omega-3 ALA.",
        storage: "Store airtight, preferably refrigerated for longer freshness.",
        sustainability: "Add to salads and breakfast bowls."
    },
    {
        name: "Olive Oil",
        emoji: "🫒",
        category: "healthy-fats",
        calories: 884,
        protein: 0,
        carbs: 0,
        fat: 100,
        fiber: 0,
        vitamin: "Vitamin E",
        benefit: "Rich in monounsaturated fats.",
        storage: "Keep away from light and heat.",
        sustainability: "Use appropriate quantities when cooking."
    },
    {
        name: "Chia Seeds",
        emoji: "🌱",
        category: "healthy-fats",
        calories: 486,
        protein: 16.5,
        carbs: 42.1,
        fat: 30.7,
        fiber: 34.4,
        vitamin: "Calcium and Magnesium",
        benefit: "Provides fiber, ALA omega-3 and plant protein.",
        storage: "Keep in a sealed and dry container.",
        sustainability: "Use in puddings and breakfast recipes."
    },
    {
        name: "Peanut Butter",
        emoji: "🥜",
        category: "healthy-fats",
        calories: 588,
        protein: 25,
        carbs: 20,
        fat: 50,
        fiber: 6,
        vitamin: "Vitamin E and Magnesium",
        benefit: "Provides protein and unsaturated fats.",
        storage: "Follow product storage instructions.",
        sustainability: "Check ingredient labels and use suitable portions."
    },

    // OTHER

    {
        name: "Honey",
        emoji: "🍯",
        category: "other",
        calories: 304,
        protein: 0.3,
        carbs: 82.4,
        fat: 0,
        fiber: 0,
        vitamin: "Small amounts of minerals",
        benefit: "A natural sweetener that is still mainly sugar.",
        storage: "Store sealed in a dry place.",
        sustainability: "Use moderate amounts and avoid unnecessary waste."
    },
    {
        name: "Dark Chocolate",
        emoji: "🍫",
        category: "other",
        calories: 598,
        protein: 7.8,
        carbs: 45.9,
        fat: 42.6,
        fiber: 10.9,
        vitamin: "Iron and Magnesium",
        benefit: "Contains cocoa flavanols; nutritional composition varies.",
        storage: "Store in a cool, dry place.",
        sustainability: "Choose responsibly sourced cocoa when possible."
    },
    {
        name: "Matcha",
        emoji: "🍵",
        category: "other",
        calories: 5,
        protein: 0.3,
        carbs: 1,
        fat: 0,
        fiber: 0.3,
        vitamin: "Contains catechins and small amounts of minerals",
        benefit: "Powdered green tea containing natural caffeine and catechins.",
        storage: "Keep airtight, away from light, heat and moisture.",
        sustainability: "Use the amount needed to avoid wasting this ingredient."
    },
    {
        name: "Basil",
        emoji: "🌿",
        category: "other",
        calories: 23,
        protein: 3.2,
        carbs: 2.7,
        fat: 0.6,
        fiber: 1.6,
        vitamin: "Vitamin K",
        benefit: "An aromatic herb containing plant compounds.",
        storage: "Keep fresh leaves cool and protected.",
        sustainability: "Grow fresh herbs at home when possible."
    },
    {
        name: "Flax Seeds",
        emoji: "🌾",
        category: "healthy-fats",
        calories: 534,
        protein: 18.3,
        carbs: 28.9,
        fat: 42.2,
        fiber: 27.3,
        vitamin: "Thiamin and Magnesium",
        benefit: "Provides ALA omega-3 and dietary fiber.",
        storage: "Store ground flaxseed in a sealed container in the refrigerator.",
        sustainability: "Use in oatmeal, yogurt and baking."
    },
    {
        name: "Mushrooms",
        emoji: "🍄",
        category: "vegetables",
        calories: 22,
        protein: 3.1,
        carbs: 3.3,
        fat: 0.3,
        fiber: 1,
        vitamin: "B Vitamins and Selenium",
        benefit: "Provides B vitamins and several minerals.",
        storage: "Refrigerate in breathable packaging.",
        sustainability: "Use in soups, sauces and vegetable dishes."
    },
    {
        name: "Sweet Potato",
        emoji: "🍠",
        category: "vegetables",
        calories: 86,
        protein: 1.6,
        carbs: 20.1,
        fat: 0.1,
        fiber: 3,
        vitamin: "Beta-carotene and Vitamin C",
        benefit: "Provides fiber and beta-carotene.",
        storage: "Keep in a cool, dry and dark place.",
        sustainability: "Roast and use in balanced meals."
    },
    {
        name: "Cauliflower",
        emoji: "🥦",
        category: "vegetables",
        calories: 25,
        protein: 1.9,
        carbs: 5,
        fat: 0.3,
        fiber: 2,
        vitamin: "Vitamin C and Folate",
        benefit: "Provides fiber and vitamin C.",
        storage: "Keep refrigerated.",
        sustainability: "Use florets and stems in different recipes."
    },
    {
        name: "Edamame",
        emoji: "🫛",
        category: "proteins",
        calories: 121,
        protein: 12,
        carbs: 8.9,
        fat: 5.2,
        fiber: 5.2,
        vitamin: "Folate and Vitamin K",
        benefit: "Provides plant protein and fiber.",
        storage: "Keep frozen or refrigerated according to packaging.",
        sustainability: "Use in bowls, salads and stir-fries."
    }
];


/* =========================================================
   3. BADGE DATABASE
========================================================= */

const BADGES = [
    {
        id: "first-game",
        name: "First Adventure",
        emoji: "🎮",
        description: "Complete your first game."
    },
    {
        id: "food-explorer",
        name: "Food Explorer",
        emoji: "🥑",
        description: "Discover your first ingredient."
    },
    {
        id: "nutrition-master",
        name: "Nutrition Master",
        emoji: "🧠",
        description: "Complete three quizzes."
    },
    {
        id: "eco-warrior",
        name: "Eco Warrior",
        emoji: "🌱",
        description: "Earn 100 Eco Points."
    },
    {
        id: "chef-master",
        name: "Chef Master",
        emoji: "👩🏻‍🍳",
        description: "Complete five games."
    },
    {
        id: "level-five",
        name: "Rising Star",
        emoji: "⭐",
        description: "Reach Level 5."
    },
    {
        id: "academy-graduate",
        name: "Academy Graduate",
        emoji: "📚",
        description: "Complete three lessons."
    },
    {
        id: "speed-chef",
        name: "Speed Chef",
        emoji: "⚡",
        description: "Complete the Speed Chef challenge."
    }
];


/* =========================================================
   4. EDUCATIONAL LESSONS
========================================================= */

const LESSONS = {

    nutrition: {
        title: "Nutrition Basics 🥦",
        content: `
            <h2>Understanding Nutrition</h2>
            <p>Nutrition is the process through which the body obtains and uses nutrients from food.</p>

            <h3>Macronutrients</h3>
            <ul>
                <li><b>Carbohydrates:</b> An important source of energy.</li>
                <li><b>Proteins:</b> Help build and repair body tissues.</li>
                <li><b>Fats:</b> Provide energy and support cell functions.</li>
            </ul>

            <h3>Micronutrients</h3>
            <p>Vitamins and minerals are needed in smaller quantities and support many body functions.</p>

            <h3>Did You Know?</h3>
            <p>Dietary fiber supports normal digestive function and is found in plant foods.</p>
        `
    },

    safety: {
        title: "Food Safety 🧼",
        content: `
            <h2>Food Safety in the Kitchen</h2>
            <p>Food safety helps prevent foodborne illness and contamination.</p>

            <h3>Important Rules</h3>
            <ul>
                <li>Wash hands before handling food.</li>
                <li>Keep raw meat separate from ready-to-eat foods.</li>
                <li>Use clean utensils and cutting boards.</li>
                <li>Refrigerate perishable foods promptly.</li>
                <li>Cook foods to safe internal temperatures.</li>
            </ul>

            <h3>Cross-Contamination</h3>
            <p>Cross-contamination occurs when harmful microorganisms or allergens transfer between foods, surfaces or equipment.</p>

            <h3>Remember!</h3>
            <p>Cleaning and sanitizing are important steps in a safe kitchen.</p>
        `
    },

    sustainability: {
        title: "Food Sustainability ♻️",
        content: `
            <h2>Protecting Our Planet</h2>
            <p>Sustainable food choices consider environmental, social and economic impacts.</p>

            <h3>How Can We Help?</h3>
            <ul>
                <li>Plan meals before shopping.</li>
                <li>Use leftovers safely.</li>
                <li>Choose seasonal ingredients when practical.</li>
                <li>Reduce unnecessary packaging.</li>
                <li>Store ingredients correctly.</li>
            </ul>

            <h3>Food Waste</h3>
            <p>Food waste occurs when edible food is discarded or lost.</p>

            <h3>Eco Tip</h3>
            <p>Turn suitable vegetable scraps into homemade vegetable stock.</p>
        `
    },

    "healthy-eating": {
        title: "Healthy Eating 🍎",
        content: `
            <h2>Building Balanced Meals</h2>
            <p>A balanced eating pattern includes a variety of foods and appropriate portions.</p>

            <h3>Build Your Plate</h3>
            <ul>
                <li>Include plenty of vegetables and fruits.</li>
                <li>Add whole grains.</li>
                <li>Include a suitable protein source.</li>
                <li>Choose unsaturated fats more often.</li>
                <li>Drink enough water.</li>
            </ul>

            <h3>Food Variety</h3>
            <p>Eating different foods helps provide a wider range of nutrients.</p>
        `
    },

    ingredients: {
        title: "Food Ingredients 🌾",
        content: `
            <h2>Understanding Ingredients</h2>
            <p>Ingredients have different nutritional, functional and sensory properties.</p>

            <h3>Examples</h3>
            <ul>
                <li>Oats: Provide beta-glucan fiber.</li>
                <li>Eggs: Help bind and structure food.</li>
                <li>Olive oil: Provides fat and flavor.</li>
                <li>Yogurt: Adds moisture and acidity.</li>
                <li>Herbs: Improve aroma and flavor.</li>
            </ul>

            <h3>Food Labels</h3>
            <p>Always check ingredient lists, allergen declarations and nutrition information.</p>
        `
    },

    "eco-kitchen": {
        title: "Eco-Friendly Kitchen 🌍",
        content: `
            <h2>Creating a Sustainable Kitchen</h2>
            <p>A sustainable kitchen aims to reduce resource use and food waste.</p>

            <h3>Smart Kitchen Habits</h3>
            <ul>
                <li>Use reusable storage containers.</li>
                <li>Measure ingredients carefully.</li>
                <li>Use energy-efficient cooking methods.</li>
                <li>Separate recyclable waste.</li>
                <li>Buy only what you need.</li>
            </ul>

            <h3>Food Storage</h3>
            <p>Proper storage helps maintain quality and can reduce spoilage.</p>
        `
    }
};


/* =========================================================
   5. DOM HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [...document.querySelectorAll(selector)];

function showElement(element) {
    if (element) element.classList.remove("hidden");
}

function hideElement(element) {
    if (element) element.classList.add("hidden");
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


/* =========================================================
   6. SAVE AND LOAD SYSTEM
========================================================= */

function saveGame() {
    try {
        localStorage.setItem(GAME_KEY, JSON.stringify(player));
    } catch (error) {
        console.error("Unable to save game:", error);
        showToast("Progress could not be saved on this device.");
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem(GAME_KEY);

        if (!saved) return false;

        const parsed = JSON.parse(saved);

        if (!parsed || typeof parsed !== "object") return false;

        player = {
            ...DEFAULT_PLAYER,
            ...parsed,
            badges: Array.isArray(parsed.badges) ? parsed.badges : [],
            completedLessons: Array.isArray(parsed.completedLessons)
                ? parsed.completedLessons : [],
            unlockedOutfits: Array.isArray(parsed.unlockedOutfits)
                ? parsed.unlockedOutfits : [],
            gameHistory: Array.isArray(parsed.gameHistory)
                ? parsed.gameHistory : []
        };

        return Boolean(player.name);

    } catch (error) {
        console.error("Save data could not be loaded:", error);
        player = { ...DEFAULT_PLAYER };
        return false;
    }
}


/* =========================================================
   7. SOUND SYSTEM
========================================================= */

function playSound(frequency = 500, duration = 0.12) {
    if (!player.soundEnabled) return;

    try {
        audioContext ||= new (
            window.AudioContext || window.webkitAudioContext
        )();

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);

    } catch (error) {
        console.warn("Audio is unavailable:", error);
    }
}

function playSuccessSound() {
    playSound(523);
    setTimeout(() => playSound(659), 120);
    setTimeout(() => playSound(784), 240);
}

function toggleSound() {
    player.soundEnabled = !player.soundEnabled;
    updateSoundButton();
    saveGame();

    if (player.soundEnabled) playSuccessSound();
}

function updateSoundButton() {
    const button = $("#soundToggle");
    if (!button) return;

    button.textContent = player.soundEnabled ? "🔊" : "🔇";
    button.setAttribute("aria-label",
        player.soundEnabled ? "Mute sound" : "Enable sound");
}


/* Simple original background tone sequence.
   No external music file is required. */

function startMusic() {
    if (!player.musicEnabled || musicInterval) return;

    const notes = [392, 440, 523, 440, 349, 392, 440, 523];
    let index = 0;

    musicInterval = setInterval(() => {
        if (player.musicEnabled) {
            playSound(notes[index % notes.length], 0.22);
            index++;
        }
    }, 450);
}

function stopMusic() {
    clearInterval(musicInterval);
    musicInterval = null;
}

function toggleMusic() {
    player.musicEnabled = !player.musicEnabled;

    if (player.musicEnabled) {
        startMusic();
        showToast("Background music enabled 🎵");
    } else {
        stopMusic();
        showToast("Background music disabled.");
    }

    saveGame();
}


/* =========================================================
   8. TOAST NOTIFICATIONS
========================================================= */

function showToast(message) {
    const container = $("#toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3500);
}


/* =========================================================
   9. SCREEN NAVIGATION
========================================================= */

function showInitialScreen() {
    hideElement($("#loadingScreen"));

    if (loadGame()) {
        showElement($("#gameScreen"));
        hideElement($("#welcomeScreen"));
        hideElement($("#characterScreen"));
        refreshGame();
        showPage("dashboard");
    } else {
        showElement($("#welcomeScreen"));
        hideElement($("#characterScreen"));
        hideElement($("#gameScreen"));
    }
}

function showPage(pageName) {
    const pageNames = [
        "dashboard",
        "games",
        "ingredients",
        "academy",
        "achievements",
        "profile",
        "gameplay"
    ];

    if (!pageNames.includes(pageName)) return;

    $$(".page").forEach(page => {
        page.classList.add("hidden");
        page.classList.remove("active-page");
    });

    const page = document.getElementById(pageName + "Page");

    if (page) {
        page.classList.remove("hidden");
        page.classList.add("active-page");
    }

    $$(".nav-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );
    });

    if (pageName === "ingredients") renderIngredients();
    if (pageName === "achievements") renderBadges();
    if (pageName === "profile") renderProfile();
}

function openMainGame() {
    hideElement($("#welcomeScreen"));
    hideElement($("#characterScreen"));
    showElement($("#gameScreen"));

    refreshGame();
    showPage("dashboard");
}


/* =========================================================
   10. CHARACTER CREATION
========================================================= */

function setupAvatarSelection() {
    $$(".avatar-option").forEach(button => {
        button.addEventListener("click", () => {
            selectedAvatar = button.dataset.avatar;

            $$(".avatar-option").forEach(item =>
                item.classList.remove("selected")
            );

            button.classList.add("selected");

            setText("avatarPreview", selectedAvatar);
            setText("profileAvatar", selectedAvatar);

            updateProfilePreview();
            playSound(620);
        });
    });
}

function updateProfilePreview() {
    const name = $("#playerName")?.value.trim() || "New Chef";
    const style = $("#playerStyle")?.value || "Healthy Chef";

    setText("profileNamePreview", name);
    setText("profileStylePreview", style);
    setText("profileAvatar", selectedAvatar);
}

function createCharacter() {
    const name = $("#playerName")?.value.trim();
    const style = $("#playerStyle")?.value;

    if (!name) {
        showToast("Please enter your chef name!");
        $("#playerName")?.focus();
        return;
    }

    if (name.length < 2) {
        showToast("Your chef name must have at least 2 characters.");
        return;
    }

    player = {
        ...DEFAULT_PLAYER,
        name: name.slice(0, 16),
        avatar: selectedAvatar,
        style: style || "Healthy Chef"
    };

    saveGame();
    playSuccessSound();

    showToast("Your character has been created! 💗");

    openMainGame();
}

function editProfile() {
    const newName = prompt("Enter your new chef name:", player.name);

    if (newName === null) return;

    const cleanedName = newName.trim();

    if (cleanedName.length < 2 || cleanedName.length > 16) {
        showToast("Please use a name between 2 and 16 characters.");
        return;
    }

    player.name = cleanedName;

    saveGame();
    refreshGame();

    showToast("Profile updated successfully!");
}


/* =========================================================
   11. LEVEL & EXPERIENCE SYSTEM
========================================================= */

function getRequiredXP(level) {
    return level * LEVEL_XP;
}

function addXP(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return;

    const oldLevel = player.level;

    player.xp += amount;
    player.coins += Math.max(1, Math.floor(amount / 10));

    while (player.xp >= getRequiredXP(player.level)) {
        player.xp -= getRequiredXP(player.level);
        player.level++;
    }

    saveGame();
    refreshGame();

    if (player.level > oldLevel) {
        showLevelUp(oldLevel);
    }
}

function showLevelUp(oldLevel) {
    const modal = $("#levelUpModal");

    if (!modal) return;

    setText("newLevelNumber", player.level);
    setText("levelUpCharacter", player.avatar);

    const messages = [
        "Amazing! Your cooking skills are improving!",
        "You are becoming a talented food explorer!",
        "Your nutrition knowledge is growing!",
        "Your anime chef journey is getting exciting!",
        "You have unlocked a new level of creativity!"
    ];

    setText(
        "levelUpMessage",
        messages[Math.floor(Math.random() * messages.length)]
    );

    showElement(modal);
    playSuccessSound();

    if (player.level === 5) {
        unlockBadge("level-five");
        player.unlockedOutfits.push("Master Chef Outfit");
    }

    saveGame();
}


/* =========================================================
   12. GAME STATISTICS
========================================================= */

function getLevelTitle() {
    return LEVEL_TITLES[
        Math.min(player.level - 1, LEVEL_TITLES.length - 1)
    ];
}

function refreshGame() {
    const name = player.name || "Chef";
    const avatar = player.avatar || "👩🏻‍🍳";

    setText("headerPlayerName", name);
    setText("headerPlayerLevel", "Level " + player.level);
    setText("headerAvatar", avatar);

    setText("sidebarPlayerName", name);
    setText("sidebarPlayerLevel", getLevelTitle());
    setText("sidebarAvatar", avatar);

    setText("welcomePlayerName", name);
    setText("dashboardMascot", avatar + " Let's cook!");

    setText("headerXP", player.xp + " XP");
    setText("headerCoins", player.coins);

    setText("totalXP", player.xp + " XP");
    setText("totalBadges", player.badges.length);
    setText("completedGames", player.completedGames);
    setText("ecoPoints", player.ecoPoints);

    const required = getRequiredXP(player.level);
    const percentage = Math.min(100, (player.xp / required) * 100);

    const progress = $("#levelProgressBar");

    if (progress) progress.style.width = percentage + "%";

    setText("levelProgressText", Math.floor(percentage) + "%");

    updateSoundButton();
    updateMission();
}

function renderProfile() {
    setText("profilePlayerName", player.name);
    setText("profilePlayerStyle", player.style);
    setText("profileLargeAvatar", player.avatar);
    setText("profileLevel", "Level " + player.level);

    setText("profileXP", player.xp);
    setText("profileGames", player.gamesPlayed);
    setText("profileBadges", player.badges.length);
    setText("profileEcoPoints", player.ecoPoints);
}


/* =========================================================
   13. ACHIEVEMENTS
========================================================= */

function unlockBadge(badgeId) {
    const badge = BADGES.find(item => item.id === badgeId);

    if (!badge || player.badges.includes(badgeId)) return;

    player.badges.push(badgeId);

    setText("rewardTitle", "New Achievement! " + badge.emoji);
    setText("rewardDescription", badge.name + ": " + badge.description);

    showElement($("#rewardModal"));

    playSuccessSound();
    saveGame();
    refreshGame();
}

function renderBadges() {
    const container = $("#badgeGrid");
    if (!container) return;

    container.innerHTML = BADGES.map(badge => {
        const unlocked = player.badges.includes(badge.id);

        return `
            <article class="badge-card ${unlocked ? "" : "locked"}">
                <div>${badge.emoji}</div>
                <h3>${escapeHTML(badge.name)}</h3>
                <p>${escapeHTML(badge.description)}</p>
                <small>${unlocked ? "✓ Unlocked" : "🔒 Locked"}</small>
            </article>
        `;
    }).join("");

    setText("achievementCount", player.badges.length);
    setText("achievementXP", player.xp);
}


/* =========================================================
   14. DAILY MISSION
========================================================= */

function updateMission() {
    const mission = $(".mission-card");

    if (!mission) return;

    const heading = mission.querySelector("h3");
    const paragraph = mission.querySelector("p");
    const reward = mission.querySelector(".reward-label");
    const button = mission.querySelector("button");

    if (player.completedMission) {
        if (heading) heading.textContent = "Mission Completed! 🎉";
        if (paragraph) paragraph.textContent =
            "Amazing work! You completed today's learning mission.";
        if (reward) reward.textContent = "Reward collected: +100 XP";
        if (button) {
            button.textContent = "Completed ✓";
            button.disabled = true;
        }
    }
}


/* =========================================================
   15. INGREDIENT LIBRARY
========================================================= */

function renderIngredients() {
    const container = $("#ingredientGrid");
    if (!container) return;

    const search = ($("#ingredientSearch")?.value || "").toLowerCase();
    const category = $("#ingredientCategory")?.value || "all";

    const filtered = INGREDIENTS.filter(item => {
        const matchesName = item.name.toLowerCase().includes(search);
        const matchesCategory =
            category === "all" || item.category === category;

        return matchesName && matchesCategory;
    });

    container.innerHTML = filtered.length
        ? filtered.map(item => `
            <article class="ingredient-card"
                data-ingredient="${escapeHTML(item.name)}"
                tabindex="0"
                role="button"
                aria-label="View ${escapeHTML(item.name)} information">

                <div class="ingredient-image">${item.emoji}</div>
                <h3>${escapeHTML(item.name)}</h3>
                <p>${escapeHTML(item.category.replace("-", " "))}</p>

            </article>
        `).join("")
        : "<p>No ingredients found.</p>";

    $$(".ingredient-card").forEach(card => {
        const open = () => showIngredientDetail(card.dataset.ingredient);

        card.addEventListener("click", open);
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open();
            }
        });
    });
}

function showIngredientDetail(name) {
    const item = INGREDIENTS.find(ingredient => ingredient.name === name);
    if (!item) return;

    const container = $("#ingredientDetailContent");

    container.innerHTML = `
        <div style="font-size:65px">${item.emoji}</div>
        <h2>${escapeHTML(item.name)}</h2>
        <p><b>Category:</b> ${escapeHTML(item.category)}</p>

        <h3>Nutrition per 100 g</h3>
        <ul>
            <li>Energy: ${item.calories} kcal</li>
            <li>Protein: ${item.protein} g</li>
            <li>Carbohydrates: ${item.carbs} g</li>
            <li>Fat: ${item.fat} g</li>
            <li>Fiber: ${item.fiber} g</li>
        </ul>

        <h3>Vitamins and Minerals</h3>
        <p>${escapeHTML(item.vitamin)}</p>

        <h3>Nutrition Facts</h3>
        <p>${escapeHTML(item.benefit)}</p>

        <h3>Storage Tips</h3>
        <p>${escapeHTML(item.storage)}</p>

        <h3>Sustainability Tip</h3>
        <p>${escapeHTML(item.sustainability)}</p>

        <small>Approximate values per 100 g. Actual values vary by food variety and preparation.</small>
    `;

    showElement($("#ingredientDetail"));

    if (!player.badges.includes("food-explorer")) {
        unlockBadge("food-explorer");
    }

    playSound(600);
}


/* =========================================================
   16. FOOD ACADEMY
========================================================= */

function openLesson(lessonId) {
    const lesson = LESSONS[lessonId];

    if (!lesson) return;

    const detail = $("#lessonDetail");

    detail.innerHTML = `
        <span class="mini-label">FRESHOPIA LEARNING CENTER</span>
        <h2>${lesson.title}</h2>
        <div class="lesson-body">${lesson.content}</div>

        <button id="completeLessonBtn" class="primary-btn">
            Complete Lesson ✓
        </button>
    `;

    showElement($("#lessonContent"));

    $("#completeLessonBtn").addEventListener("click", () => {
        if (!player.completedLessons.includes(lessonId)) {
            player.completedLessons.push(lessonId);
            addXP(50);

            showToast("Lesson completed! +50 XP 📚");

            if (player.completedLessons.length >= 3) {
                unlockBadge("academy-graduate");
            }
        } else {
            showToast("You have already completed this lesson.");
        }

        saveGame();
    });

    $("#lessonContent").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/* =========================================================
   17. GAME START SYSTEM
========================================================= */

function startGame(gameType) {
    if (!GAME_REWARDS[gameType]) return;

    clearInterval(gameTimer);

    currentGame = gameType;
    currentQuestion = 0;
    gameScore = 0;
    gameFinished = false;
    gameAnswers = [];
    matchingSelection = [];
    matchedCards = [];
    sortingIndex = 0;
    cookingSelected = [];
    puzzleOrder = [];
    puzzleStep = 0;

    setText("gameplayTitle", getGameTitle(gameType));
    setText("gameplayXP", GAME_REWARDS[gameType] + " XP");

    showPage("gameplay");

    const container = $("#gameContainer");

    if (!container) return;

    switch (gameType) {
        case "matching":
            renderMatchingGame();
            break;

        case "puzzle":
            renderPuzzleGame();
            break;

        case "cooking":
            renderCookingGame();
            break;

        case "quiz":
            renderQuizGame();
            break;

        case "sorting":
            renderSortingGame();
            break;

        case "challenge":
            renderSpeedChefGame();
            break;
    }

    playSound(500);
}

function getGameTitle(type) {
    const titles = {
        matching: "Food Matching Challenge",
        puzzle: "Healthy Food Puzzle",
        cooking: "Master Chef Challenge",
        quiz: "Nutrition Knowledge Quiz",
        sorting: "Food Sorting Challenge",
        challenge: "Speed Chef Challenge"
    };

    return titles[type] || "Freshopia Challenge";
}

function renderGameHeader(title, subtitle) {
    return `
        <div class="game-question">
            <span class="mini-label">FRESHOPIA CHALLENGE</span>
            <h2>${title}</h2>
            <p>${subtitle}</p>
        </div>
    `;
}


/* =========================================================
   18. MATCHING GAME
========================================================= */

const MATCHING_PAIRS = [
    { emoji: "🥦", name: "Broccoli", group: "Vegetable" },
    { emoji: "🍓", name: "Strawberry", group: "Fruit" },
    { emoji: "🥚", name: "Egg", group: "Protein" },
    { emoji: "🌾", name: "Oats", group: "Grain" }
];

function renderMatchingGame() {
    const container = $("#gameContainer");

    const cards = shuffle(
        MATCHING_PAIRS.flatMap((item, index) => [
            { ...item, id: index, side: "food" },
            { ...item, id: index, side: "group" }
        ])
    );

    container.innerHTML = `
        ${renderGameHeader(
            "Food Matching 🧩",
            "Match each ingredient with its correct food group."
        )}

        <div class="game-progress">
            <div id="matchingProgress" class="game-progress-fill" style="width:0%"></div>
        </div>

        <div id="matchingBoard"
             class="game-options"
             style="grid-template-columns:repeat(4,minmax(0,1fr))">

            ${cards.map((card, index) => `
                <button class="game-option matching-card"
                    data-index="${index}"
                    data-pair="${card.id}"
                    data-side="${card.side}">

                    <span style="font-size:32px">❔</span>
                    <br>Tap to reveal
                </button>
            `).join("")}

        </div>

        <div id="matchingFeedback" class="game-feedback">
            Find all four pairs!
        </div>
    `;

    const board = $("#matchingBoard");

    board.querySelectorAll(".matching-card").forEach(button => {
        button.addEventListener("click", () => {
            revealMatchingCard(button, cards);
        });
    });
}

function revealMatchingCard(button, cards) {
    if (
        button.classList.contains("matched") ||
        button.classList.contains("revealed") ||
        matchingSelection.length >= 2
    ) return;

    const index = Number(button.dataset.index);
    const card = cards[index];

    button.classList.add("revealed");
    button.innerHTML = `
        <span style="font-size:30px">${card.emoji}</span>
        <br>${card.side === "food" ? escapeHTML(card.name) : escapeHTML(card.group)}
    `;

    matchingSelection.push({ button, card });

    playSound(450);

    if (matchingSelection.length === 2) {
        const [first, second] = matchingSelection;

        if (
            first.card.id === second.card.id &&
            first.card.side !== second.card.side
        ) {
            first.button.classList.add("matched");
            second.button.classList.add("matched");

            matchedCards.push(first, second);
            gameScore += 25;

            $("#matchingFeedback").textContent =
                "Correct match! Great job! ✨";

            $("#matchingProgress").style.width =
                (matchedCards.length / 8 * 100) + "%";

            matchingSelection = [];

            playSuccessSound();

            if (matchedCards.length === 8) {
                finishGame(true);
            }

        } else {
            $("#matchingFeedback").textContent =
                "Not a match. Try again!";

            const pair = [...matchingSelection];

            setTimeout(() => {
                pair.forEach(item => {
                    item.button.classList.remove("revealed");
                    item.button.innerHTML =
                        '<span style="font-size:32px">❔</span><br>Tap to reveal';
                });

                matchingSelection = [];
            }, 800);
        }
    }
}


/* =========================================================
   19. PUZZLE GAME
========================================================= */

const PUZZLE_STEPS = [
    {
        text: "Wash and prepare your vegetables.",
        emoji: "🥦"
    },
    {
        text: "Cut the vegetables safely.",
        emoji: "🔪"
    },
    {
        text: "Cook the vegetables appropriately.",
        emoji: "🍳"
    },
    {
        text: "Serve your balanced meal.",
        emoji: "🥗"
    }
];

function renderPuzzleGame() {
    const container = $("#gameContainer");

    const shuffled = shuffle(PUZZLE_STEPS);

    puzzleOrder = shuffled.map(step => PUZZLE_STEPS.indexOf(step));

    container.innerHTML = `
        ${renderGameHeader(
            "Healthy Meal Puzzle 🧩",
            "Arrange the cooking steps in the correct order."
        )}

        <p style="text-align:center;margin-bottom:20px">
            Select the steps from first to last.
        </p>

        <div id="puzzleChoices" class="game-options">
            ${shuffled.map((step, index) => `
                <button class="game-option puzzle-option"
                    data-original="${PUZZLE_STEPS.indexOf(step)}">

                    <span style="font-size:28px">${step.emoji}</span>
                    <br>${escapeHTML(step.text)}

                </button>
            `).join("")}
        </div>

        <div id="puzzleFeedback" class="game-feedback">
            Correct order: preparation → cutting → cooking → serving.
        </div>

        <button id="checkPuzzleBtn" class="primary-btn"
                style="margin-top:20px">
            Check My Puzzle
        </button>
    `;

    $("#puzzleChoices").querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            if (button.disabled) return;

            button.disabled = true;
            button.classList.add("correct");

            puzzleOrder.push(Number(button.dataset.original));
            button.dataset.selected = "true";

            button.style.opacity = ".55";
            button.style.borderColor = "#65a77b";
            button.style.transform = "scale(.96)";

            puzzleStep++;
        });
    });

    // Remove the temporary shuffled array from the answer state.
    puzzleOrder = [];

    $("#checkPuzzleBtn").addEventListener("click", () => {
        const selected = puzzleOrder;

        if (selected.length !== 4) {
            showToast("Please select all four steps first.");
            return;
        }

        const correct = selected.every(
            (value, index) => value === index
        );

        if (correct) {
            $("#puzzleFeedback").textContent =
                "Perfect! You completed the recipe puzzle! 🎉";
            gameScore = 100;
            finishGame(true);
        } else {
            $("#puzzleFeedback").textContent =
                "Not quite right! Reset and try again.";
            puzzleOrder = [];
            puzzleStep = 0;

            $$(".puzzle-option").forEach(button => {
                button.disabled = false;
                button.classList.remove("correct");
                button.style.opacity = "1";
                button.style.borderColor = "";
                button.style.transform = "";
            });
        }
    });

    // Record selections in their actual chosen order.
    $$("#puzzleChoices .puzzle-option").forEach(button => {
        button.addEventListener("click", () => {
            // The main click handler above handles disabling.
            if (button.dataset.recorded) return;
            button.dataset.recorded = "true";
        });
    });

    // Override selection tracking with a single delegated handler.
    puzzleOrder = [];
    puzzleStep = 0;

    $("#puzzleChoices").querySelectorAll("button").forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    $("#puzzleChoices").querySelectorAll("button").forEach(button => {
        button.addEventListener("click", () => {
            if (button.disabled) return;

            button.disabled = true;
            button.classList.add("correct");
            button.style.opacity = ".55";

            puzzleOrder.push(Number(button.dataset.original));
            puzzleStep++;
        });
    });
}


/* =========================================================
   20. COOKING GAME
========================================================= */

const COOKING_CHALLENGES = [
    {
        title: "Prepare a Balanced Power Bowl",
        description: "Select a grain, a protein, vegetables and a healthy fat.",
        correct: [
            "Quinoa",
            "Chicken Breast",
            "Broccoli",
            "Olive Oil"
        ],
        choices: [
            "Quinoa",
            "Chicken Breast",
            "Broccoli",
            "Olive Oil",
            "Dark Chocolate",
            "Honey",
            "Strawberry",
            "Milk"
        ]
    },
    {
        title: "Create a Plant-Based Bowl",
        description: "Select a plant protein, a grain, vegetables and healthy fat.",
        correct: [
            "Chickpeas",
            "Brown Rice",
            "Spinach",
            "Avocado"
        ],
        choices: [
            "Chickpeas",
            "Brown Rice",
            "Spinach",
            "Avocado",
            "Honey",
            "Cheese",
            "Dark Chocolate",
            "Banana"
        ]
    }
];

let cookingChallenge = null;

function renderCookingGame() {
    const container = $("#gameContainer");

    cookingChallenge = COOKING_CHALLENGES[
        Math.floor(Math.random() * COOKING_CHALLENGES.length)
    ];

    container.innerHTML = `
        ${renderGameHeader(
            "Master Chef Challenge 👩🏻‍🍳",
            cookingChallenge.description
        )}

        <div class="game-feedback">
            <h3>${cookingChallenge.title}</h3>
            Select four ingredients for your meal.
        </div>

        <div class="game-options" id="cookingChoices"
             style="margin-top:20px">

            ${cookingChallenge.choices.map(name => {
                const item = INGREDIENTS.find(i => i.name === name);

                return `
                    <button class="game-option cooking-option"
                        data-name="${escapeHTML(name)}">

                        <span style="font-size:27px">${item?.emoji || "🍽️"}</span>
                        <br>${escapeHTML(name)}
                    </button>
                `;
            }).join("")}

        </div>

        <div id="cookingFeedback" class="game-feedback">
            Selected: 0 / 4
        </div>

        <button id="submitCookingBtn" class="primary-btn"
                style="margin-top:20px">
            Serve My Meal 🍽️
        </button>
    `;

    $$(".cooking-option").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;

            if (cookingSelected.includes(name)) {
                cookingSelected = cookingSelected.filter(x => x !== name);
                button.classList.remove("correct");
            } else if (cookingSelected.length < 4) {
                cookingSelected.push(name);
                button.classList.add("correct");
            }

            setText(
                "cookingFeedback",
                "Selected: " + cookingSelected.length + " / 4"
            );

            playSound(420);
        });
    });

    $("#submitCookingBtn").addEventListener("click", () => {
        if (cookingSelected.length !== 4) {
            showToast("Please select exactly four ingredients.");
            return;
        }

        const correct = cookingChallenge.correct;
        const matches = cookingSelected.filter(item =>
            correct.includes(item)
        ).length;

        gameScore = matches * 25;

        $("#cookingFeedback").textContent =
            `You selected ${matches} out of 4 suitable ingredients!`;

        if (matches === 4) {
            finishGame(true);
        } else {
            finishGame(false, matches);
        }
    });
}


/* =========================================================
   21. QUIZ DATABASE
========================================================= */

const QUIZ_QUESTIONS = [
    {
        question: "Which nutrient is important for building and repairing tissues?",
        options: ["Protein", "Water", "Vitamin C", "Fiber"],
        answer: "Protein",
        explanation: "Protein provides amino acids used for tissue growth and repair."
    },
    {
        question: "Which food is a good source of beta-carotene?",
        options: ["Carrot", "Milk", "Chicken", "Olive Oil"],
        answer: "Carrot",
        explanation: "Carrots contain beta-carotene, which the body can convert into vitamin A."
    },
    {
        question: "Which nutrient provides 9 kcal per gram?",
        options: ["Fat", "Protein", "Carbohydrate", "Fiber"],
        answer: "Fat",
        explanation: "Fat provides approximately 9 kcal per gram."
    },
    {
        question: "What is cross-contamination?",
        options: [
            "Transfer of harmful microorganisms or allergens",
            "Cooking vegetables",
            "Freezing food",
            "Washing fruit"
        ],
        answer: "Transfer of harmful microorganisms or allergens",
        explanation: "Cross-contamination can occur through hands, utensils, surfaces and food."
    },
    {
        question: "Which food contains beta-glucan?",
        options: ["Oats", "Orange", "Egg", "Tomato"],
        answer: "Oats",
        explanation: "Oats contain beta-glucan, a type of soluble dietary fiber."
    },
    {
        question: "Which practice helps reduce food waste?",
        options: [
            "Planning meals",
            "Buying unnecessary food",
            "Ignoring expiry information",
            "Throwing away leftovers immediately"
        ],
        answer: "Planning meals",
        explanation: "Meal planning helps people buy appropriate quantities."
    },
    {
        question: "Which vitamin is abundant in many citrus fruits?",
        options: ["Vitamin C", "Vitamin D", "Vitamin B12", "Vitamin K"],
        answer: "Vitamin C",
        explanation: "Oranges and other citrus fruits provide vitamin C."
    },
    {
        question: "Which is a plant-based protein source?",
        options: ["Lentils", "Butter", "Honey", "Olive Oil"],
        answer: "Lentils",
        explanation: "Lentils provide plant protein and dietary fiber."
    },
    {
        question: "Which storage practice is safest for perishable foods?",
        options: [
            "Refrigerate promptly",
            "Leave out overnight",
            "Store in direct sunlight",
            "Keep near a hot oven"
        ],
        answer: "Refrigerate promptly",
        explanation: "Perishable foods should be refrigerated promptly."
    },
    {
        question: "Which fat is prominent in olive oil?",
        options: [
            "Monounsaturated fat",
            "Trans fat",
            "No fat",
            "Only saturated fat"
        ],
        answer: "Monounsaturated fat",
        explanation: "Olive oil is rich in monounsaturated fatty acids."
    },
    {
        question: "What does dietary fiber support?",
        options: [
            "Normal digestive function",
            "Food spoilage",
            "Cross-contamination",
            "Food coloring"
        ],
        answer: "Normal digestive function",
        explanation: "Dietary fiber supports normal digestive function."
    },
    {
        question: "Which kitchen habit helps prevent allergen cross-contact?",
        options: [
            "Using properly cleaned separate equipment",
            "Sharing unclean utensils",
            "Mixing all ingredients",
            "Ignoring allergen labels"
        ],
        answer: "Using properly cleaned separate equipment",
        explanation: "Proper cleaning and separation help prevent allergen cross-contact."
    }
];

let quizQuestions = [];

function renderQuizGame() {
    quizQuestions = shuffle(QUIZ_QUESTIONS).slice(0, 5);
    currentQuestion = 0;
    gameScore = 0;

    renderQuizQuestion();
}

func
