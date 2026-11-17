/* =========================================================
   FRESHOPIA — ULTIMATE GAME ENGINE 5.0
   Anime • Education • Cooking • Sustainability • Progression
========================================================= */

"use strict";

/* =========================================================
   1. GAME CONFIGURATION
========================================================= */

const GAME_KEY = "freshopiaUltimateSave";

const CONFIG = {
    gameName: "Freshopia",
    characterName: "Mika",
    startingXP: 0,
    startingCoins: 100,
    startingEco: 0,
    startingLevel: 1,
    startingTime: 180,
    maxLevel: 30,
    autosaveInterval: 10000
};

const INGREDIENTS = [
    { id: "tomato", name: "Tomato", emoji: "🍅", category: "Vegetable" },
    { id: "lettuce", name: "Lettuce", emoji: "🥬", category: "Vegetable" },
    { id: "carrot", name: "Carrot", emoji: "🥕", category: "Vegetable" },
    { id: "avocado", name: "Avocado", emoji: "🥑", category: "Healthy Fat" },
    { id: "broccoli", name: "Broccoli", emoji: "🥦", category: "Vegetable" },
    { id: "mushroom", name: "Mushroom", emoji: "🍄", category: "Vegetable" },
    { id: "corn", name: "Corn", emoji: "🌽", category: "Vegetable" },
    { id: "pepper", name: "Pepper", emoji: "🫑", category: "Vegetable" },
    { id: "apple", name: "Apple", emoji: "🍎", category: "Fruit" },
    { id: "strawberry", name: "Strawberry", emoji: "🍓", category: "Fruit" },
    { id: "lemon", name: "Lemon", emoji: "🍋", category: "Fruit" },
    { id: "banana", name: "Banana", emoji: "🍌", category: "Fruit" },
    { id: "rice", name: "Rice", emoji: "🍚", category: "Grain" },
    { id: "bread", name: "Wholegrain Bread", emoji: "🍞", category: "Grain" },
    { id: "pasta", name: "Pasta", emoji: "🍝", category: "Grain" },
    { id: "egg", name: "Egg", emoji: "🥚", category: "Protein" },
    { id: "beans", name: "Beans", emoji: "🫘", category: "Protein" },
    { id: "milk", name: "Milk", emoji: "🥛", category: "Dairy" },
    { id: "cheese", name: "Cheese", emoji: "🧀", category: "Dairy" },
    { id: "oliveoil", name: "Olive Oil", emoji: "🫒", category: "Healthy Fat" }
];

const RECIPES = [
    {
        id: "rainbow-salad",
        name: "Rainbow Sustainability Salad",
        emoji: "🥗",
        ingredients: ["tomato", "lettuce", "carrot", "avocado"],
        xp: 100,
        coins: 30,
        eco: 20,
        difficulty: "Easy",
        description: "Prepare a colorful and nutritious salad."
    },
    {
        id: "green-bowl",
        name: "Green Energy Bowl",
        emoji: "🥑",
        ingredients: ["avocado", "broccoli", "rice", "lemon"],
        xp: 140,
        coins: 40,
        eco: 30,
        difficulty: "Medium",
        description: "Create a balanced plant-based meal."
    },
    {
        id: "garden-pasta",
        name: "Garden Vegetable Pasta",
        emoji: "🍝",
        ingredients: ["pasta", "tomato", "mushroom", "oliveoil"],
        xp: 150,
        coins: 45,
        eco: 25,
        difficulty: "Medium",
        description: "Cook a delicious vegetable pasta."
    },
    {
        id: "protein-toast",
        name: "Healthy Protein Toast",
        emoji: "🍞",
        ingredients: ["bread", "egg", "avocado", "cheese"],
        xp: 120,
        coins: 35,
        eco: 15,
        difficulty: "Easy",
        description: "Prepare a protein-rich breakfast."
    },
    {
        id: "fruit-dessert",
        name: "Zero-Waste Fruit Dessert",
        emoji: "🍓",
        ingredients: ["strawberry", "banana", "apple", "milk"],
        xp: 160,
        coins: 50,
        eco: 40,
        difficulty: "Hard",
        description: "Create a dessert using fresh fruits."
    },
    {
        id: "eco-rice",
        name: "Eco-Friendly Vegetable Rice",
        emoji: "🍚",
        ingredients: ["rice", "carrot", "corn", "beans"],
        xp: 180,
        coins: 55,
        eco: 45,
        difficulty: "Hard",
        description: "Make a sustainable and balanced rice dish."
    }
];

/* =========================================================
   2. LEVEL SYSTEM
========================================================= */

function xpRequired(level) {
    return 250 + (level - 1) * 150;
}

const LEVEL_UNLOCKS = [
    { level: 2, title: "New Kitchen Tools", description: "Unlock advanced cooking tools." },
    { level: 3, title: "New Recipes", description: "Discover more healthy recipes." },
    { level: 4, title: "Eco Kitchen", description: "Unlock sustainability challenges." },
    { level: 5, title: "Mika's Special Outfit", description: "Unlock a new Mika character style." },
    { level: 7, title: "Advanced Restaurant", description: "Unlock advanced restaurant missions." },
    { level: 10, title: "Master Chef", description: "Unlock Master Chef challenges." },
    { level: 12, title: "Food Science Lab", description: "Unlock advanced food education." },
    { level: 15, title: "Sustainability Expert", description: "Unlock expert eco missions." },
    { level: 20, title: "Legendary Chef", description: "Unlock legendary recipes." },
    { level: 25, title: "Freshopia Champion", description: "Unlock champion challenges." },
    { level: 30, title: "Ultimate Food Hero", description: "Complete the ultimate journey." }
];

/* =========================================================
   3. BADGE SYSTEM
========================================================= */

const BADGES = [
    {
        id: "first-order",
        name: "First Order",
        emoji: "🍽️",
        description: "Complete your first customer order.",
        condition: p => p.completedOrders >= 1
    },
    {
        id: "eco-beginner",
        name: "Eco Beginner",
        emoji: "🌱",
        description: "Reach 50 Eco Points.",
        condition: p => p.ecoScore >= 50
    },
    {
        id: "food-guardian",
        name: "Food Guardian",
        emoji: "♻️",
        description: "Prevent 5 food waste incidents.",
        condition: p => p.wastePrevented >= 5
    },
    {
        id: "fast-chef",
        name: "Fast Chef",
        emoji: "⚡",
        description: "Complete 5 orders.",
        condition: p => p.completedOrders >= 5
    },
    {
        id: "knowledge-star",
        name: "Knowledge Star",
        emoji: "📚",
        description: "Answer 5 quiz questions correctly.",
        condition: p => p.correctAnswers >= 5
    },
    {
        id: "master-chef",
        name: "Master Chef",
        emoji: "👩‍🍳",
        description: "Reach level 10.",
        condition: p => p.level >= 10
    },
    {
        id: "eco-master",
        name: "Eco Master",
        emoji: "🌍",
        description: "Reach 500 Eco Points.",
        condition: p => p.ecoScore >= 500
    },
    {
        id: "dedicated-player",
        name: "Dedicated Player",
        emoji: "⭐",
        description: "Play for 30 minutes.",
        condition: p => p.totalPlayTime >= 1800
    },
    {
        id: "quiz-master",
        name: "Quiz Master",
        emoji: "🧠",
        description: "Answer 20 questions correctly.",
        condition: p => p.correctAnswers >= 20
    },
    {
        id: "freshopia-legend",
        name: "Freshopia Legend",
        emoji: "🏆",
        description: "Reach level 30.",
        condition: p => p.level >= 30
    }
];

/* =========================================================
   4. EDUCATIONAL QUIZ
========================================================= */

const QUIZ = [
    {
        question: "What is food waste?",
        options: [
            "Throwing away edible food",
            "Cooking healthy meals",
            "Recycling packaging",
            "Growing vegetables"
        ],
        answer: 0,
        explanation: "Food waste means food that could have been eaten but is discarded."
    },
    {
        question: "Which food is a good source of plant protein?",
        options: ["Candy", "Beans", "Soda", "Butter"],
        answer: 1,
        explanation: "Beans are an excellent source of plant-based protein."
    },
    {
        question: "Which action helps reduce food waste?",
        options: [
            "Buying unnecessary food",
            "Throwing leftovers away",
            "Planning meals",
            "Ignoring expiration dates"
        ],
        answer: 2,
        explanation: "Meal planning helps people buy and prepare only what they need."
    },
    {
        question: "What is a sustainable food choice?",
        options: [
            "Wasting fresh vegetables",
            "Choosing seasonal local food",
            "Buying excessive packaging",
            "Throwing away leftovers"
        ],
        answer: 1,
        explanation: "Seasonal and local foods can reduce transportation and environmental impacts."
    },
    {
        question: "Which nutrient helps build and repair muscles?",
        options: ["Protein", "Sugar", "Water only", "Salt"],
        answer: 0,
        explanation: "Protein provides amino acids needed for growth and tissue repair."
    },
    {
        question: "What does a balanced diet include?",
        options: [
            "Only carbohydrates",
            "Only vegetables",
            "Different food groups",
            "Only protein"
        ],
        answer: 2,
        explanation: "A balanced diet includes a variety of food groups and nutrients."
    },
    {
        question: "Which practice supports a circular food system?",
        options: [
            "Throwing everything away",
            "Reusing suitable food scraps",
            "Increasing unnecessary packaging",
            "Ignoring recycling"
        ],
        answer: 1,
        explanation: "Using suitable by-products and recycling resources supports circularity."
    },
    {
        question: "Why is water important in food production?",
        options: [
            "It has no environmental impact",
            "It is unnecessary",
            "It is a valuable limited resource",
            "It only matters for drinks"
        ],
        answer: 2,
        explanation: "Responsible water use is important for sustainable food production."
    },
    {
        question: "Which food is commonly rich in dietary fiber?",
        options: ["Whole grains", "Soft drinks", "Candy", "Butter"],
        answer: 0,
        explanation: "Whole grains provide dietary fiber that supports digestive health."
    },
    {
        question: "What is the best way to store food safely?",
        options: [
            "Ignore storage instructions",
            "Leave all food outside",
            "Follow suitable temperature guidelines",
            "Mix raw and cooked foods"
        ],
        answer: 2,
        explanation: "Correct storage temperatures help maintain food safety."
    }
];

/* =========================================================
   5. PLAYER DATA
========================================================= */

function createPlayer() {
    return {
        nickname: "Chef",
        level: CONFIG.startingLevel,
        xp: CONFIG.startingXP,
        coins: CONFIG.startingCoins,
        ecoScore: CONFIG.startingEco,

        completedOrders: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        wastePrevented: 0,

        totalPlayTime: 0,
        sessionTime: 0,

        badges: [],
        unlockedFeatures: [],
        completedMissions: [],
        usedQuizQuestions: [],

        selectedAvatar: "👩‍🍳",
        musicEnabled: true,
        voiceEnabled: true,
        soundEnabled: true,

        lastPlayed: null,
        started: false
    };
}

function loadPlayer() {
    try {
        const saved = localStorage.getItem(GAME_KEY);
        if (!saved) return createPlayer();

        const data = JSON.parse(saved);

        return {
            ...createPlayer(),
            ...data,
            badges: Array.isArray(data.badges) ? data.badges : [],
            unlockedFeatures: Array.isArray(data.unlockedFeatures) ? data.unlockedFeatures : [],
            completedMissions: Array.isArray(data.completedMissions) ? data.completedMissions : [],
            usedQuizQuestions: Array.isArray(data.usedQuizQuestions) ? data.usedQuizQuestions : []
        };
    } catch (error) {
        console.warn("Save data could not be loaded:", error);
        return createPlayer();
    }
}

let player = loadPlayer();

let selectedIngredients = [];
let currentRecipe = null;
let remainingTime = CONFIG.startingTime;
let gameInterval = null;
let clockInterval = null;
let audioContext = null;
let backgroundOscillators = [];
let quizIndex = null;
let quizAnswered = false;
let audioStarted = false;

/* =========================================================
   6. DOM HELPERS
========================================================= */

const $ = id => document.getElementById(id);

function setText(id, value) {
    const element = $(id);
    if (element) element.textContent = value;
}

function showElement(id) {
    const element = $(id);
    if (element) element.hidden = false;
}

function hideElement(id) {
    const element = $(id);
    if (element) element.hidden = true;
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

/* =========================================================
   7. SAVE SYSTEM
========================================================= */

function saveGame() {
    player.lastPlayed = new Date().toISOString();

    try {
        localStorage.setItem(GAME_KEY, JSON.stringify(player));
    } catch (error) {
        console.warn("Unable to save game:", error);
    }
}

function resetGame() {
    const confirmed = confirm("Are you sure you want to reset all Freshopia progress?");

    if (!confirmed) return;

    stopGame();
    localStorage.removeItem(GAME_KEY);

    player = createPlayer();
    selectedIngredients = [];
    currentRecipe = null;
    remainingTime = CONFIG.startingTime;

    renderAll();
    showMika("A new adventure begins! Let's save the planet together!");
}

/* =========================================================
   8. MIKA — ANIME CHARACTER
========================================================= */

const MIKA_MESSAGES = {
    welcome: [
        "Welcome to Freshopia! Let's cook something amazing!",
        "Hello Chef! Are you ready for a new adventure?",
        "Let's make healthy food and protect our planet!"
    ],

    correct: [
        "Amazing work, Chef!",
        "That looks delicious!",
        "You're becoming a fantastic chef!",
        "The planet thanks you!"
    ],

    wrong: [
        "Don't give up! Every chef learns by practicing.",
        "Let's try again together!",
        "Mistakes help us become better!"
    ],

    levelUp: [
        "WOW! You leveled up! I'm so proud of you!",
        "Incredible! Your cooking adventure continues!",
        "Congratulations! A new chapter begins!"
    ],

    eco: [
        "Great eco-friendly choice!",
        "You're helping reduce food waste!",
        "Small actions make a big difference!"
    ]
};

function showMika(message) {
    setText("mikaMessage", message);

    const character = $("mikaCharacter");

    if (character) {
        character.classList.remove("mika-excited");
        void character.offsetWidth;
        character.classList.add("mika-excited");
    }
}

function speakMika(message) {
    if (!player.voiceEnabled || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "en-US";
    speech.rate = 1.03;
    speech.pitch = 1.35;
    speech.volume = 0.9;

    const voices = window.speechSynthesis.getVoices();

    const englishVoice = voices.find(v => v.lang.startsWith("en"));

    if (englishVoice) speech.voice = englishVoice;

    window.speechSynthesis.speak(speech);
}

function mika(message, voice = true) {
    showMika(message);

    if (voice) speakMika(message);
}

/* =========================================================
   9. SOUND AND BACKGROUND MUSIC
========================================================= */

function initializeAudio() {
    if (audioStarted) return;

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    audioContext = new AudioContextClass();
    audioStarted = true;

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    if (player.musicEnabled) startBackgroundMusic();
}

function playTone(frequency = 440, duration = 0.15, type = "sine") {
    if (!player.soundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = type;
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
}

function startBackgroundMusic() {
    if (!audioContext || backgroundOscillators.length) return;

    const melody = [261.63, 329.63, 392, 329.63, 293.66, 349.23];

    melody.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        gain.gain.value = 0.012;

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        backgroundOscillators.push({ oscillator, gain, index });
    });

    let note = 0;

    window.freshopiaMusicTimer = setInterval(() => {
        if (!player.musicEnabled || !audioContext) return;

        const item = backgroundOscillators[note % backgroundOscillators.length];

        item.gain.gain.setTargetAtTime(
            0.025,
            audioContext.currentTime,
            0.15
        );

        setTimeout(() => {
            if (audioContext && item.gain) {
                item.gain.gain.setTargetAtTime(
                    0.008,
                    audioContext.currentTime,
                    0.2
                );
            }
        }, 350);

        note++;
    }, 500);
}

function stopBackgroundMusic() {
    clearInterval(window.freshopiaMusicTimer);
    window.freshopiaMusicTimer = null;

    backgroundOscillators.forEach(item => {
        try {
            item.oscillator.stop();
        } catch (error) {
            // Already stopped.
        }
    });

    backgroundOscillators = [];
}

function toggleMusic() {
    player.musicEnabled = !player.musicEnabled;

    if (player.musicEnabled) {
        initializeAudio();
        startBackgroundMusic();
    } else {
        stopBackgroundMusic();
    }

    updateSettings();
    saveGame();
}

function toggleVoice() {
    player.voiceEnabled = !player.voiceEnabled;

    if (!player.voiceEnabled && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    updateSettings();
    saveGame();
}

function toggleSound() {
    player.soundEnabled = !player.soundEnabled;
    updateSettings();
    saveGame();
}

/* =========================================================
   10. GAME INTERFACE
========================================================= */

function updateSettings() {
    const music = $("musicToggle");
    const voice = $("voiceToggle");
    const sound = $("soundToggle");

    if (music) music.checked = player.musicEnabled;
    if (voice) voice.checked = player.voiceEnabled;
    if (sound) sound.checked = player.soundEnabled;
}

function updateStats() {
    setText("levelValue", player.level);
    setText("xpValue", player.xp);
    setText("coinValue", player.coins);
    setText("ecoValue", player.ecoScore);
    setText("badgeCount", player.badges.length);

    const required = xpRequired(player.level);
    const progress = Math.min(100, (player.xp / required) * 100);

    const xpFill = $("xpFill");

    if (xpFill) {
        xpFill.style.width = `${progress}%`;
    }

    setText("levelProgressText", `${player.xp} / ${required} XP`);
}

function renderIngredients() {
    const grid = $("ingredientGrid");
    if (!grid) return;

    grid.innerHTML = "";

    INGREDIENTS.forEach(ingredient => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "ingredient-card";
        button.dataset.id = ingredient.id;

        const selected = selectedIngredients.includes(ingredient.id);

        button.classList.toggle("selected", selected);

        button.innerHTML = `
            <span class="ingredient-emoji">${ingredient.emoji}</span>
            <span class="ingredient-name">${ingredient.name}</span>
            <span class="ingredient-category">${ingredient.category}</span>
        `;

        button.addEventListener("click", () => {
            selectIngredient(ingredient.id);
        });

        grid.appendChild(button);
    });
}

function renderBadges() {
    const list = $("badgeList");
    if (!list) return;

    list.innerHTML = "";

    BADGES.forEach(badge => {
        const unlocked = player.badges.includes(badge.id);

        const item = document.createElement("div");
        item.className = `badge-item ${unlocked ? "unlocked" : "locked"}`;

        item.innerHTML = `
            <span>${badge.emoji}</span>
            <strong>${badge.name}</strong>
            <small>${unlocked ? "Unlocked" : "Locked"}</small>
            <p>${badge.description}</p>
        `;

        list.appendChild(item);
    });
}

function renderUnlocks() {
    const list = $("unlockList");
    if (!list) return;

    list.innerHTML = "";

    LEVEL_UNLOCKS.forEach(unlock => {
        const unlocked = player.level >= unlock.level;

        const item = document.createElement("div");
        item.className = `unlock-item ${unlocked ? "unlocked" : "locked"}`;

        item.innerHTML = `
            <strong>${unlocked ? "🔓" : "🔒"} ${unlock.title}</strong>
            <small>Level ${unlock.level}</small>
            <p>${unlock.description}</p>
        `;

        list.appendChild(item);
    });
}

function renderMission() {
    const mission = $("mission");
    if (!mission) return;

    mission.textContent =
        player.completedOrders >= 5
            ? "Daily Mission Completed! 🌟"
            : `Daily Mission: Complete 5 orders (${player.completedOrders}/5)`;
}

function renderAll() {
    updateStats();
    updateSettings();
    renderIngredients();
    renderBadges();
    renderUnlocks();
    renderMission();
}

/* =========================================================
   11. ORDER SYSTEM
========================================================= */

function startGame() {
    initializeAudio();

    if (player.started && gameInterval) return;

    player.started = true;

    const startButton = $("startButton");

    if (startButton) {
        startButton.textContent = "Game Running";
        startButton.disabled = true;
    }

    if (!clockInterval) {
        clockInterval = setInterval(() => {
            player.totalPlayTime++;
            player.sessionTime++;

            checkTimeUnlocks();
            checkBadges();

            if (player.sessionTime % 30 === 0) saveGame();
        }, 1000);
    }

    generateOrder();
    mika(randomItem(MIKA_MESSAGES.welcome));

    saveGame();
}

function generateOrder() {
    stopGame();

    const availableRecipes = RECIPES.filter(recipe => {
        if (player.level >= 10) return true;
        return recipe.difficulty !== "Hard";
    });

    currentRecipe = randomItem(availableRecipes);

    selectedIngredients = [];
    remainingTime = CONFIG.startingTime;

    setText("timer", formatTime(remainingTime));
    setText("feedback", "");
    setText("currentRecipeName", currentRecipe.name);
    setText("recipeName", currentRecipe.name);
    setText("recipeDescription", currentRecipe.description);
    setText("recipeEmoji", currentRecipe.emoji);

    renderIngredients();

    if ($("timer")) $("timer").classList.remove("timer-danger");

    gameInterval = setInterval(() => {
        remainingTime--;

        setText("timer", formatTime(remainingTime));

        if (remainingTime <= 30 && $("timer")) {
            $("timer").classList.add("timer-danger");
        }

        if (remainingTime <= 0) {
            orderTimeout();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function stopGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
}

function selectIngredient(id) {
    if (!player.started || !currentRecipe) {
        setText("feedback", "Press Start Game first!");
        return;
    }

    if (selectedIngredients.includes(id)) {
        selectedIngredients = selectedIngredients.filter(item => item !== id);
    } else if (selectedIngredients.length < 6) {
        selectedIngredients.push(id);
    } else {
        setText("feedback", "You can select up to 6 ingredients.");
        return;
    }

    renderIngredients();
    playTone(520, 0.1);
}

function clearIngredients() {
    selectedIngredients = [];
    renderIngredients();
    setText("feedback", "Ingredients cleared!");
}

function serveOrder() {
    if (!currentRecipe || !player.started) {
        setText("feedback", "Start the game first!");
        return;
    }

    const correct = currentRecipe.ingredients;
    const missing = correct.filter(id => !selectedIngredients.includes(id));
    const extra = selectedIngredients.filter(id => !correct.includes(id));

    if (missing.length === 0 && extra.length === 0) {
        completeOrder();
    } else {
        player.wastePrevented++;
        player.wrongAnswers++;

        setText(
            "feedback",
            `Not quite right! Check your ingredients. Missing: ${missing.length}, Extra: ${extra.length}.`
        );

        mika(randomItem(MIKA_MESSAGES.wrong));
        playTone(180, 0.25, "triangle");

        checkBadges();
        saveGame();
    }
}

function completeOrder() {
    stopGame();

    player.completedOrders++;

    const timeBonus = Math.max(0, Math.floor(remainingTime / 10));

    const xpReward = currentRecipe.xp + timeBonus;
    const coinReward = currentRecipe.coins + Math.floor(timeBonus / 2);

    addXP(xpReward);

    player.coins += coinReward;
    player.ecoScore += currentRecipe.eco;

    setText(
        "feedback",
        `Perfect Order! +${xpReward} XP | +${coinReward} Coins | +${currentRecipe.eco} Eco Points`
    );

    mika(randomItem(MIKA_MESSAGES.correct));

    playTone(660, 0.2);
    setTimeout(() => playTone(880, 0.25), 180);

    updateStats();
    renderMission();
    checkBadges();

    showResult(
        "Order Completed!",
        `${currentRecipe.emoji} ${currentRecipe.name}`,
        `+${xpReward} XP • +${coinReward} Coins • +${currentRecipe.eco} Eco Points`
    );

    saveGame();
}

function orderTimeout() {
    stopGame();

    setText("feedback", "Time is up! Try another order.");
    mika("Don't worry! Every great chef needs practice.");

    saveGame();
}

/* =========================================================
   12. XP AND LEVEL PROGRESSION
========================================================= */

function addXP(amount) {
    player.xp += amount;

    while (
        player.xp >= xpRequired(player.level) &&
        player.level < CONFIG.maxLevel
    ) {
        player.xp -= xpRequired(player.level);
        player.level++;

        levelUp();
    }

    updateStats();
    renderUnlocks();
}

function levelUp() {
    const reward = player.level * 25;

    player.coins += reward;

    const message = `LEVEL ${player.level}! Mika is proud of you! You earned ${reward} bonus coins!`;

    mika(randomItem(MIKA_MESSAGES.levelUp));

    showResult(
        `LEVEL ${player.level} UNLOCKED!`,
        "🌟 Congratulations, Chef!",
        message
    );

    playTone(784, 0.25);
    setTimeout(() => playTone(988, 0.25), 200);
    setTimeout(() => playTone(1174, 0.4), 400);

    checkUnlocks();
    checkBadges();
    renderAll();
}

function checkUnlocks() {
    LEVEL_UNLOCKS.forEach(unlock => {
        if (
            player.level >= unlock.level &&
            !player.unlockedFeatures.includes(unlock.title)
        ) {
            player.unlockedFeatures.push(unlock.title);

            showResult(
                "NEW FEATURE UNLOCKED!",
                `🔓 ${unlock.title}`,
                unlock.description
            );

            mika(`Amazing! You unlocked ${unlock.title}!`);
        }
    });
}

/* =========================================================
   13. TIME-BASED FEATURE UNLOCKS
========================================================= */

const TIME_UNLOCKS = [
    {
        seconds: 60,
        id: "quick-challenge",
        title: "Quick Challenges",
        description: "New timed challenges are now available!"
    },
    {
        seconds: 180,
        id: "knowledge-zone",
        title: "Knowledge Zone",
        description: "Play educational food and sustainability quizzes."
    },
    {
        seconds: 300,
        id: "daily-bonus",
        title: "Daily Bonus",
        description: "Your dedication has unlocked a special bonus."
    },
    {
        seconds: 600,
        id: "advanced-training",
        title: "Advanced Training",
        description: "Unlock advanced food education challenges."
    },
    {
        seconds: 900,
        id: "eco-expert",
        title: "Eco Expert Zone",
        description: "Take on special sustainability missions."
    }
];

function checkTimeUnlocks() {
    TIME_UNLOCKS.forEach(unlock => {
        if (
            player.sessionTime >= unlock.seconds &&
            !player.unlockedFeatures.includes(unlock.id)
        ) {
            player.unlockedFeatures.push(unlock.id);

            showResult(
                "TIME REWARD UNLOCKED!",
                `⏳ ${unlock.title}`,
                unlock.description
            );

            mika(`You've unlocked ${unlock.title}! Keep going!`);

            saveGame();
        }
    });
}

/* =========================================================
   14. BADGE REWARDS
========================================================= */

function checkBadges() {
    BADGES.forEach(badge => {
        if (
            !player.badges.includes(badge.id) &&
            badge.condition(player)
        ) {
            player.badges.push(badge.id);
            player.coins += 50;

            showResult(
                "NEW BADGE!",
                `${badge.emoji} ${badge.name}`,
                `${badge.description} +50 Coins!`
            );

            mika(`Congratulations! You earned the ${badge.name} badge!`);

            renderBadges();
        }
    });

    updateStats();
}

/* =========================================================
   15. QUIZ AND MIDTERM EDUCATIONAL MODE
========================================================= */

function createQuizInterface() {
    if ($("freshopiaQuiz")) return;

    const section = document.createElement("section");

    section.id = "freshopiaQuiz";
    section.className = "quiz-section";

    section.innerHTML = `
        <div class="quiz-header">
            <span>📚</span>
            <h2>Freshopia Knowledge Academy</h2>
            <p>Test your knowledge of food, health and sustainability!</p>
        </div>

        <div class="quiz-stats">
            <span>Correct Answers: <strong id="quizCorrect">0</strong></span>
            <span>Questions: <strong id="quizTotal">0</strong></span>
        </div>

        <div id="quizContent">
            <p>Ready to test your knowledge?</p>
            <button type="button" id="startQuizButton">Start Quiz</button>
        </div>
    `;

    document.body.appendChild(section);

    $("startQuizButton").addEventListener("click", startQuiz);
}

function startQuiz() {
    createQuizInterface();

    quizAnswered = false;

    const unused = QUIZ.map((_, index) => index)
        .filter(index => !player.usedQuizQuestions.includes(index));

    if (unused.length === 0) {
        player.usedQuizQuestions = [];
    }

    const available = QUIZ.map((_, index) => index)
        .filter(index => !player.usedQuizQuestions.includes(index));

    quizIndex = randomItem(available);

    const question = QUIZ[quizIndex];

    const content = $("quizContent");

    content.innerHTML = `
        <h3>${question.question}</h3>
        <div class="quiz-options">
            ${question.options.map((option, index) => `
                <button type="button" class="quiz-option" data-answer="${index}">
                    ${option}
                </button>
            `).join("")}
        </div>
        <p id="quizFeedback"></p>
    `;

    content.querySelectorAll(".quiz-option").forEach(button => {
        button.addEventListener("click", () => {
            answerQuiz(Number(button.dataset.answer));
        });
    });
}

function answerQuiz(answer) {
    if (quizAnswered || quizIndex === null) return;

    quizAnswered = true;

    const question = QUIZ[quizIndex];
    const correct = answer === question.answer;

    player.usedQuizQuestions.push(quizIndex);

    const buttons = document.querySelectorAll(".quiz-option");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        } else if (index === answer) {
            button.classList.add("incorrect");
        }
    });

    const feedback = $("quizFeedback");

    if (correct) {
        player.correctAnswers++;

        addXP(50);
        player.coins += 15;
        player.ecoScore += 5;

        feedback.textContent = `Correct! ${question.explanation}`;

        mika("Brilliant! That's the correct answer!");
        playTone(880, 0.2);
    } else {
        player.wrongAnswers++;

        feedback.textContent = `Not quite! ${question.explanation}`;

        mika("Keep learning! You'll get the next one!");
    }

    setText("quizCorrect", player.correctAnswers);
    setText("quizTotal", player.correctAnswers + player.wrongAnswers);

    checkBadges();
    updateStats();
    saveGame();

    const next = document.createElement("button");

    next.type = "button";
    next.textContent = "Next Question";
    next.className = "quiz-next";

    next.addEventListener("click", startQuiz);

    $("quizContent").appendChild(next);
}

/* =========================================================
   16. MIKA DAILY MISSIONS
========================================================= */

function getDailyMission() {
    const missions = [
        {
            id: "daily-orders",
            title: "Complete 3 Orders",
            reward: 100,
            condition: () => player.completedOrders >= 3
        },
        {
            id: "daily-eco",
            title: "Earn 50 Eco Points",
            reward: 100,
            condition: () => player.ecoScore >= 50
        },
        {
            id: "daily-quiz",
            title: "Answer 3 Questions Correctly",
            reward: 100,
            condition: () => player.correctAnswers >= 3
        }
    ];

    return missions;
}

function checkDailyMissions() {
    getDailyMission().forEach(mission => {
        if (
            mission.condition() &&
            !player.completedMissions.includes(mission.id)
        ) {
            player.completedMissions.push(mission.id);
            player.coins += mission.reward;

            mika(`Daily mission completed! You earned ${mission.reward} coins!`);

            showResult(
                "DAILY MISSION COMPLETED!",
                mission.title,
                `+${mission.reward} Coins`
            );
        }
    });

    saveGame();
}

/* =========================================================
   17. HINT SYSTEM
========================================================= */

function giveHint() {
    if (!currentRecipe) {
        setText("feedback", "Start a game to receive a hint.");
        return;
    }

    if (player.coins < 10) {
        setText("feedback", "You need 10 coins for a hint.");
        return;
    }

    player.coins -= 10;

    const missing = currentRecipe.ingredients.filter(
        id => !selectedIngredients.includes(id)
    );

    if (missing.length === 0) {
        setText("feedback", "All required ingredients are selected!");
    } else {
        const ingredient = INGREDIENTS.find(
            item => item.id === missing[0]
        );

        setText(
            "feedback",
            `Mika's Hint: Try adding ${ingredient.emoji} ${ingredient.name}!`
        );

        mika(`I think ${ingredient.name} would be a great choice!`);
    }

    updateStats();
    saveGame();
}

/* =========================================================
   18. RESULT MODAL
========================================================= */

function showResult(title, subtitle, description) {
    const modal = $("resultModal");

    if (modal) {
        const titleElement = modal.querySelector("h2");
        const subtitleElement = modal.querySelector("h3");
        const descriptionElement = modal.querySelector("p");

        if (titleElement) titleElement.textContent = title;
        if (subtitleElement) subtitleElement.textContent = subtitle;
        if (descriptionElement) descriptionElement.textContent = description;

        modal.hidden = false;
        modal.classList.add("active");

        return;
    }

    // Fallback if the HTML does not include a result modal.
    const fallback = document.createElement("div");

    fallback.className = "freshopia-notification";

    fallback.innerHTML = `
        <strong>${title}</strong>
        <p>${subtitle}</p>
        <small>${description}</small>
    `;

    document.body.appendChild(fallback);

    setTimeout(() => fallback.remove(), 3500);
}

function closeResult() {
    const modal = $("resultModal");

    if (modal) {
        modal.hidden = true;
        modal.classList.remove("active");
    }
}

/* =========================================================
   19. LEVEL MODAL
========================================================= */

function closeLevelModal() {
    const modal = $("levelModal");

    if (modal) {
        modal.hidden = true;
        modal.classList.remove("active");
    }
}

/* =========================================================
   20. CHARACTER INTERACTION
========================================================= */

function repeatMika() {
    const message = $("mikaMessage");

    speakMika(
        message && message.textContent
            ? message.textContent
            : "Welcome to Freshopia!"
    );
}

/* =========================================================
   21. PLAYER PROFILE
========================================================= */

function setNickname(name) {
    const cleanName = String(name).trim().slice(0, 20);

    if (!cleanName) return;

    player.nickname = cleanName;

    saveGame();

    mika(`Welcome, ${cleanName}! Let's create something wonderful!`);
}

function changeAvatar(avatar) {
    player.selectedAvatar = avatar;

    const character = $("mikaCharacter");

    if (character) {
        character.textContent = avatar;
    }

    saveGame();
}

/* =========================================================
   22. PROGRESS SUMMARY
========================================================= */

function getProgressSummary() {
    return {
        player: player.nickname,
        level: player.level,
        xp: player.xp,
        coins: player.coins,
        ecoScore: player.ecoScore,
        completedOrders: player.completedOrders,
        correctAnswers: player.correctAnswers,
        badges: player.badges.length,
        playTime: formatTime(player.totalPlayTime)
    };
}

function showProgressReport() {
    const report = getProgressSummary();

    showResult(
        "YOUR FRESHOPIA REPORT",
        `Level ${report.level} | ${report.player}`,
        `XP: ${report.xp} | Coins: ${report.coins} | Eco: ${report.ecoScore} | Orders: ${report.completedOrders} | Quiz: ${report.correctAnswers} | Badges: ${report.badges} | Play Time: ${report.playTime}`
    );
}

/* =========================================================
   23. EVENT LISTENERS
========================================================= */

function bindEvents() {
    const events = [
        ["startButton", "click", startGame],
        ["serveButton", "click", serveOrder],
        ["clearButton", "click", clearIngredients],
        ["hintButton", "click", giveHint],
        ["musicToggle", "change", toggleMusic],
        ["voiceToggle", "change", toggleVoice],
        ["soundToggle", "change", toggleSound],
        ["repeatMika", "click", repeatMika]
    ];

    events.forEach(([id, event, callback]) => {
        const element = $(id);

        if (element) {
            element.addEventListener(event, callback);
        }
    });

    const quizButton = $("quizButton");

    if (quizButton) {
        quizButton.addEventListener("click", () => {
            createQuizInterface();

            $("freshopiaQuiz").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    }

    const closeResultButton = $("closeResult");
    if (closeResultButton) {
        closeResultButton.addEventListener("click", closeResult);
    }

    const closeLevelButton = $("closeLevelModal");
    if (closeLevelButton) {
        closeLevelButton.addEventListener("click", closeLevelModal);
    }

    const reportButton = $("reportButton");
    if (reportButton) {
        reportButton.addEventListener("click", showProgressReport);
    }

    const resetButton = $("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", resetGame);
    }

    window.addEventListener("beforeunload", saveGame);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            saveGame();
        }
    });
}

/* =========================================================
   24. GAME INITIALIZATION
========================================================= */

function initializeFreshopia() {
    console.log("Freshopia Ultimate Engine 5.0 initialized.");

    bindEvents();

    createQuizInterface();

    renderAll();

    if (player.sessionTime >= 180) {
        player.unlockedFeatures.push("knowledge-zone");
    }

    checkUnlocks();
    checkBadges();

    if (player.selectedAvatar && $("mikaCharacter")) {
        $("mikaCharacter").textContent = player.selectedAvatar;
    }

    mika(
        `Welcome back, ${player.nickname}! Your Freshopia adventure continues!`,
        false
    );

    setInterval(saveGame, CONFIG.autosaveInterval);

    setText("quizCorrect", player.correctAnswers);
    setText("quizTotal", player.correctAnswers + player.wrongAnswers);

    console.log("Player data:", getProgressSummary());
}

/* =========================================================
   25. START ENGINE
========================================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFreshopia);
} else {
    initializeFreshopia();
}

/* =========================================================
   END OF FRESHOPIA ULTIMATE GAME ENGINE 5.0
========================================================= */
