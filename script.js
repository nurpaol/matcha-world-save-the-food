/* =========================================================
   FRESHOPIA - ANIME COOKING ADVENTURE
   ULTIMATE GAME ENGINE 6.1
   Features:
   - Player profile and avatar
   - Mika anime assistant
   - Cooking orders and ingredient selection
   - XP, levels, coins and eco points
   - Daily missions and rewards
   - Achievements and unlocks
   - Background music, sound effects and voice
   - Timer, hints and progress saving
========================================================= */

"use strict";

/* =========================
   1. GAME SETTINGS
========================= */

const GAME_KEY = "freshopia_ultimate_61";

const CONFIG = {
    startingTime: 90,
    dailyRewardXP: 100,
    dailyRewardCoins: 50,
    xpPerCorrectOrder: 40,
    coinsPerCorrectOrder: 20,
    maxLevel: 20
};

const $ = id => document.getElementById(id);

const show = (id, display = "block") => {
    const el = $(id);
    if (el) {
        el.hidden = false;
        el.style.display = display;
    }
};

const hide = id => {
    const el = $(id);
    if (el) {
        el.hidden = true;
        el.style.display = "none";
    }
};

const setText = (id, value) => {
    const el = $(id);
    if (el) el.textContent = value;
};

/* =========================
   2. INGREDIENT DATABASE
========================= */

const ingredients = [
    { id: "tomato", name: "Tomato", emoji: "🍅", category: "Vegetable", eco: 2 },
    { id: "carrot", name: "Carrot", emoji: "🥕", category: "Vegetable", eco: 2 },
    { id: "lettuce", name: "Lettuce", emoji: "🥬", category: "Vegetable", eco: 2 },
    { id: "broccoli", name: "Broccoli", emoji: "🥦", category: "Vegetable", eco: 3 },
    { id: "potato", name: "Potato", emoji: "🥔", category: "Vegetable", eco: 2 },
    { id: "mushroom", name: "Mushroom", emoji: "🍄", category: "Vegetable", eco: 3 },
    { id: "avocado", name: "Avocado", emoji: "🥑", category: "Fruit", eco: 1 },
    { id: "apple", name: "Apple", emoji: "🍎", category: "Fruit", eco: 3 },
    { id: "lemon", name: "Lemon", emoji: "🍋", category: "Fruit", eco: 3 },
    { id: "strawberry", name: "Strawberry", emoji: "🍓", category: "Fruit", eco: 3 },
    { id: "banana", name: "Banana", emoji: "🍌", category: "Fruit", eco: 2 },
    { id: "rice", name: "Rice", emoji: "🍚", category: "Grain", eco: 2 },
    { id: "bread", name: "Bread", emoji: "🍞", category: "Grain", eco: 2 },
    { id: "pasta", name: "Pasta", emoji: "🍝", category: "Grain", eco: 2 },
    { id: "egg", name: "Egg", emoji: "🥚", category: "Protein", eco: 2 },
    { id: "chicken", name: "Chicken", emoji: "🍗", category: "Protein", eco: 1 },
    { id: "fish", name: "Fish", emoji: "🐟", category: "Protein", eco: 2 },
    { id: "beans", name: "Beans", emoji: "🫘", category: "Protein", eco: 4 },
    { id: "milk", name: "Milk", emoji: "🥛", category: "Dairy", eco: 1 },
    { id: "cheese", name: "Cheese", emoji: "🧀", category: "Dairy", eco: 1 },
    { id: "yogurt", name: "Yogurt", emoji: "🥣", category: "Dairy", eco: 2 },
    { id: "oliveoil", name: "Olive Oil", emoji: "🫒", category: "Pantry", eco: 3 },
    { id: "basil", name: "Basil", emoji: "🌿", category: "Herb", eco: 3 },
    { id: "oats", name: "Oats", emoji: "🌾", category: "Grain", eco: 3 }
];

/* =========================
   3. RECIPE DATABASE
========================= */

const recipes = [
    {
        id: "salad",
        name: "Fresh Garden Salad",
        emoji: "🥗",
        ingredients: ["tomato", "lettuce", "carrot", "oliveoil"],
        level: 1,
        fact: "Colorful vegetables provide different vitamins, minerals and dietary fiber."
    },
    {
        id: "fruitbowl",
        name: "Rainbow Fruit Bowl",
        emoji: "🍓",
        ingredients: ["apple", "banana", "strawberry", "yogurt"],
        level: 1,
        fact: "Whole fruits contain fiber as well as naturally occurring sugars."
    },
    {
        id: "sandwich",
        name: "Healthy Veggie Sandwich",
        emoji: "🥪",
        ingredients: ["bread", "tomato", "lettuce", "cheese"],
        level: 2,
        fact: "Whole-grain bread can contribute to daily fiber intake."
    },
    {
        id: "ricebowl",
        name: "Chicken Rice Bowl",
        emoji: "🍚",
        ingredients: ["rice", "chicken", "broccoli", "carrot"],
        level: 2,
        fact: "A balanced meal can combine grains, protein and vegetables."
    },
    {
        id: "pasta",
        name: "Tomato Basil Pasta",
        emoji: "🍝",
        ingredients: ["pasta", "tomato", "basil", "oliveoil"],
        level: 3,
        fact: "Herbs can add flavor without relying only on salt."
    },
    {
        id: "omelette",
        name: "Garden Omelette",
        emoji: "🍳",
        ingredients: ["egg", "mushroom", "tomato", "cheese"],
        level: 3,
        fact: "Eggs provide protein and several important nutrients."
    },
    {
        id: "fish",
        name: "Green Fish Plate",
        emoji: "🐟",
        ingredients: ["fish", "potato", "broccoli", "lemon"],
        level: 4,
        fact: "Fish can provide protein and, depending on the type, omega-3 fats."
    },
    {
        id: "oatbowl",
        name: "Berry Oat Breakfast",
        emoji: "🥣",
        ingredients: ["oats", "milk", "strawberry", "banana"],
        level: 4,
        fact: "Oats contain beta-glucan, a type of soluble fiber."
    },
    {
        id: "beanbowl",
        name: "Plant Power Bowl",
        emoji: "🫘",
        ingredients: ["beans", "rice", "avocado", "tomato"],
        level: 5,
        fact: "Beans are a plant-based source of protein and dietary fiber."
    }
];

/* =========================
   4. CUSTOMERS
========================= */

const customers = [
    { name: "Luna", avatar: "👩🏻‍🎤", message: "I would love something fresh today!" },
    { name: "Milo", avatar: "🧑🏻‍🍳", message: "Surprise me with a delicious meal!" },
    { name: "Aiko", avatar: "👧🏻", message: "Let's make something colorful!" },
    { name: "Leo", avatar: "🧑🏻", message: "I am hungry for a healthy dish!" },
    { name: "Mia", avatar: "👩🏻", message: "Can you prepare my favorite recipe?" }
];

/* =========================
   5. PLAYER DATA
========================= */

function newPlayer() {
    return {
        name: "Chef",
        avatar: "👩🏻‍🍳",
        level: 1,
        xp: 0,
        coins: 0,
        eco: 0,
        orders: 0,
        correctOrders: 0,
        failedOrders: 0,
        badges: [],
        unlockedRecipes: ["salad", "fruitbowl"],
        purchasedItems: [],
        completedMissions: [],
        missionDate: new Date().toDateString(),
        musicOn: false,
        soundOn: true,
        voiceOn: true,
        bestStreak: 0,
        streak: 0
    };
}

let player = loadPlayer();
let selectedIngredients = [];
let currentRecipe = null;
let currentCustomer = null;
let timerInterval = null;
let timeLeft = CONFIG.startingTime;
let gameRunning = false;
let audioContext = null;
let musicInterval = null;
let musicStep = 0;

/* =========================
   6. SAVE AND LOAD
========================= */

function loadPlayer() {
    try {
        const saved = JSON.parse(localStorage.getItem(GAME_KEY));
        return saved ? { ...newPlayer(), ...saved } : newPlayer();
    } catch (error) {
        console.warn("Save data could not be loaded.", error);
        return newPlayer();
    }
}

function save() {
    try {
        localStorage.setItem(GAME_KEY, JSON.stringify(player));
    } catch (error) {
        console.warn("Game progress could not be saved.", error);
    }
}

/* =========================
   7. LEVEL SYSTEM
========================= */

function requiredXP(level = player.level) {
    return 100 + (level - 1) * 50;
}

function addXP(amount) {
    player.xp += amount;

    while (
        player.level < CONFIG.maxLevel &&
        player.xp >= requiredXP()
    ) {
        player.xp -= requiredXP();
        levelUp();
    }

    updateDashboard();
    save();
}

function levelUp() {
    player.level++;
    player.coins += 30;

    unlockRecipes();

    const modal = $("levelModal");

    if (modal) {
        show("levelModal", "flex");
    }

    setText("levelValue", player.level);
    setText("mikaMessage", `Amazing, ${player.name}! You reached Level ${player.level}! Keep cooking!`);

    speak(`Congratulations! You reached level ${player.level}!`);
    playSound("level");

    checkBadges();
    save();
}

function unlockRecipes() {
    recipes.forEach(recipe => {
        if (
            player.level >= recipe.level &&
            !player.unlockedRecipes.includes(recipe.id)
        ) {
            player.unlockedRecipes.push(recipe.id);
            showToast(`New recipe unlocked: ${recipe.name}!`);
        }
    });

    renderUnlocks();
}

/* =========================
   8. DASHBOARD
========================= */

function updateDashboard() {
    setText("levelValue", player.level);
    setText("xpValue", `${player.xp} / ${requiredXP()}`);
    setText("coinValue", player.coins);
    setText("ecoValue", player.eco);
    setText("badgeCount", player.badges.length);
    setText("orderCount", player.correctOrders);

    const fill = $("xpFill");

    if (fill) {
        fill.style.width =
            `${Math.min(100, player.xp / requiredXP() * 100)}%`;
    }

    renderBadges();
    renderUnlocks();
    renderDailyMissions();
}

/* =========================
   9. START GAME
========================= */

function startGame() {
    const nameInput = $("playerName");

    if (nameInput && nameInput.value.trim()) {
        player.name = nameInput.value.trim().slice(0, 18);
    }

    const avatarInput = document.querySelector(
        '[data-avatar].selected, .avatar-option.selected'
    );

    if (avatarInput) {
        player.avatar =
            avatarInput.dataset.avatar ||
            avatarInput.textContent.trim() ||
            player.avatar;
    }

    save();

    hide("welcomeScreen");
    show("gameScreen");

    updateDashboard();
    generateOrder();

    if (player.musicOn) startMusic();

    speak(`Welcome back, Chef ${player.name}! Let's cook!`);
}

/* =========================
   10. GENERATE ORDER
========================= */

function generateOrder() {
    clearInterval(timerInterval);

    const available = recipes.filter(recipe =>
        player.level >= recipe.level
    );

    const pool = available.length ? available : recipes.slice(0, 2);

    currentRecipe = pool[Math.floor(Math.random() * pool.length)];
    currentCustomer =
        customers[Math.floor(Math.random() * customers.length)];

    selectedIngredients = [];
    gameRunning = true;
    timeLeft = CONFIG.startingTime;

    setText("recipeName", currentRecipe.name);
    setText("recipeEmoji", currentRecipe.emoji);
    setText("customerName", currentCustomer.name);
    setText("customerAvatar", currentCustomer.avatar);
    setText("customerMessage", currentCustomer.message);
    setText("timer", timeLeft);

    setText(
        "mikaMessage",
        `Let's prepare ${currentRecipe.name}! Choose the correct ingredients.`
    );

    setText("feedback", "");
    setText("mikaCharacter", "👩🏻‍🍳");

    renderIngredients();
    updateSelectedIngredients();

    startTimer();
}

/* =========================
   11. INGREDIENT DISPLAY
========================= */

function renderIngredients() {
    const grid = $("ingredientGrid");
    if (!grid) return;

    grid.innerHTML = "";

    const availableIngredients = ingredients.filter(item => {
        const neededByUnlockedRecipe = recipes.some(recipe =>
            player.level >= recipe.level &&
            recipe.ingredients.includes(item.id)
        );

        return neededByUnlockedRecipe;
    });

    availableIngredients.forEach(item => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "ingredient-card";
        button.dataset.id = item.id;

        button.innerHTML = `
            <span class="ingredient-emoji">${item.emoji}</span>
            <span class="ingredient-name">${item.name}</span>
        `;

        button.addEventListener("click", () => {
            selectIngredient(item.id);
        });

        grid.appendChild(button);
    });
}

function selectIngredient(id) {
    if (!gameRunning) return;

    if (selectedIngredients.includes(id)) {
        selectedIngredients =
            selectedIngredients.filter(item => item !== id);
    } else {
        selectedIngredients.push(id);
    }

    const button = document.querySelector(
        `.ingredient-card[data-id="${id}"]`
    );

    if (button) {
        button.classList.toggle(
            "selected",
            selectedIngredients.includes(id)
        );
    }

    updateSelectedIngredients();
    playSound("click");
}

function updateSelectedIngredients() {
    const display = $("selectedIngredients");

    if (!display) return;

    display.innerHTML = "";

    selectedIngredients.forEach(id => {
        const item = ingredients.find(i => i.id === id);
        if (!item) return;

        const tag = document.createElement("span");
        tag.className = "selected-ingredient";
        tag.textContent = `${item.emoji} ${item.name}`;
        display.appendChild(tag);
    });
}

function clearIngredients() {
    selectedIngredients = [];

    document.querySelectorAll(".ingredient-card").forEach(button => {
        button.classList.remove("selected");
    });

    updateSelectedIngredients();
}

/* =========================
   12. HINT SYSTEM
========================= */

function giveHint() {
    if (!currentRecipe) return;

    const missing = currentRecipe.ingredients.filter(
        id => !selectedIngredients.includes(id)
    );

    if (!missing.length) {
        showToast("You have selected all the required ingredients!");
        return;
    }

    const item = ingredients.find(i => i.id === missing[0]);

    if (item) {
        setText(
            "feedback",
            `Mika's hint: You might need ${item.emoji} ${item.name}!`
        );

        setText(
            "mikaMessage",
            `Here's a little hint: look for ${item.name}!`
        );

        speak(`Look for ${item.name}.`);
    }
}

/* =========================
   13. SERVE ORDER
========================= */

function serveOrder() {
    if (!gameRunning || !currentRecipe) return;

    const required = [...currentRecipe.ingredients].sort();
    const selected = [...selectedIngredients].sort();

    const correct =
        required.length === selected.length &&
        required.every((item, index) => item === selected[index]);

    if (correct) {
        completeOrder();
    } else {
        setText(
            "feedback",
            "Not quite right! Check the ingredients and try again."
        );

        setText(
            "mikaMessage",
            "Don't give up! Every great chef learns by trying."
        );

        playSound("wrong");
    }
}

function completeOrder() {
    gameRunning = false;
    clearInterval(timerInterval);

    player.orders++;
    player.correctOrders++;
    player.streak++;
    player.bestStreak = Math.max(player.bestStreak, player.streak);

    const timeBonus = Math.max(0, Math.floor(timeLeft / 10));

    const xpReward = CONFIG.xpPerCorrectOrder + timeBonus;
    const coinReward = CONFIG.coinsPerCorrectOrder + 5;

    const ecoReward = currentRecipe.ingredients.reduce((sum, id) => {
        const item = ingredients.find(i => i.id === id);
        return sum + (item ? item.eco : 0);
    }, 0);

    player.coins += coinReward;
    player.eco += ecoReward;

    addXP(xpReward);

    setText(
        "feedback",
        `Perfect! +${xpReward} XP, +${coinReward} coins and +${ecoReward} Eco Points!`
    );

    setText(
        "mikaMessage",
        `Wonderful work, Chef ${player.name}! ${currentRecipe.fact}`
    );

    showResult(true, xpReward, coinReward, ecoReward);

    checkBadges();
    checkDailyMissions();
    save();

    playSound("success");
}

/* =========================
   14. FAILED ORDER
========================= */

function orderFailed() {
    if (!gameRunning) return;

    gameRunning = false;
    clearInterval(timerInterval);

    player.orders++;
    player.failedOrders++;
    player.streak = 0;

    setText("feedback", "Time is up! Let's try another recipe.");
    setText("mikaMessage", "It's okay! Practice makes progress.");

    showResult(false, 0, 0, 0);
    save();

    playSound("wrong");
}

function showResult(success, xp, coins, eco) {
    const title = $("resultTitle");
    const message = $("resultMessage");

    if (title) {
        title.textContent = success ? "Order Completed! 🎉" : "Time's Up! ⏰";
    }

    if (message) {
        message.textContent = success
            ? `You earned ${xp} XP, ${coins} coins and ${eco} Eco Points!`
            : "Keep practicing to become a Freshopia Master!";
    }

    show("resultModal", "flex");
}

/* =========================
   15. TIMER
========================= */

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!gameRunning) return;

        timeLeft--;
        setText("timer", timeLeft);

        if (timeLeft <= 10) {
            const timer = $("timer");
            if (timer) timer.classList.add("timer-warning");
        }

        if (timeLeft <= 0) {
            orderFailed();
        }
    }, 1000);
}

/* =========================
   16. DAILY MISSIONS
========================= */

function resetDailyMissionsIfNeeded() {
    const today = new Date().toDateString();

    if (player.missionDate !== today) {
        player.missionDate = today;
        player.completedMissions = [];
        save();
    }
}

function getDailyMissions() {
    return [
        {
            id: "first_order",
            title: "Complete 1 cooking order",
            progress: Math.min(player.correctOrders, 1),
            target: 1
        },
        {
            id: "three_orders",
            title: "Complete 3 cooking orders",
            progress: Math.min(player.correctOrders, 3),
            target: 3
        },
        {
            id: "eco_points",
            title: "Earn 10 Eco Points",
            progress: Math.min(player.eco, 10),
            target: 10
        }
    ];
}

function checkDailyMissions() {
    resetDailyMissionsIfNeeded();

    const missions = getDailyMissions();
    let newlyCompleted = false;

    missions.forEach(mission => {
        const completed =
            mission.progress >= mission.target;

        if (
            completed &&
            !player.completedMissions.includes(mission.id)
        ) {
            player.completedMissions.push(mission.id);
            newlyCompleted = true;
            showToast(`Mission completed: ${mission.title}!`);
        }
    });

    // Daily reward: awarded only once when all three missions are complete.
    const allCompleted = missions.every(mission =>
        player.completedMissions.includes(mission.id)
    );

    if (
        allCompleted &&
        !player.completedMissions.includes("daily_bonus")
    ) {
        player.completedMissions.push("daily_bonus");

        player.coins += CONFIG.dailyRewardCoins;
        addXP(CONFIG.dailyRewardXP);

        showToast(
            `Daily missions complete! +${CONFIG.dailyRewardXP} XP and +${CONFIG.dailyRewardCoins} coins!`
        );

        speak("Amazing! You completed all daily missions!");
    }

    renderDailyMissions();
    save();
}

function renderDailyMissions() {
    resetDailyMissionsIfNeeded();

    const list = $("dailyMissionList");
    if (!list) return;

    list.innerHTML = "";

    getDailyMissions().forEach(mission => {
        const completed =
            player.completedMissions.includes(mission.id);

        const item = document.createElement("div");
        item.className = "mission-item";

        item.innerHTML = `
            <span>${completed ? "✅" : "🎯"} ${mission.title}</span>
            <span>${mission.progress}/${mission.target}</span>
        `;

        list.appendChild(item);
    });

    const allDone = getDailyMissions().every(mission =>
        player.completedMissions.includes(mission.id)
    );

    const bonus = document.createElement("div");
    bonus.className = "mission-bonus";
    bonus.textContent = allDone
        ? "Daily bonus: 100 XP + 50 coins"
        : "Complete all daily missions to earn 100 XP + 50 coins!";

    list.appendChild(bonus);
}

/* =========================
   17. BADGES
========================= */

const badgeData = [
    { id: "first_bite", name: "First Bite", emoji: "🍓", condition: () => player.correctOrders >= 1 },
    { id: "eco_hero", name: "Eco Hero", emoji: "🌱", condition: () => player.eco >= 20 },
    { id: "food_saver", name: "Food Saver", emoji: "♻️", condition: () => player.correctOrders >= 5 },
    { id: "quick_chef", name: "Quick Chef", emoji: "⚡", condition: () => player.bestStreak >= 3 },
    { id: "badge_collector", name: "Badge Collector", emoji: "🏅", condition: () => player.badges.length >= 4 },
    { id: "freshopia_master", name: "Freshopia Master", emoji: "👑", condition: () => player.level >= 10 }
];

function checkBadges() {
    badgeData.forEach(badge => {
        if (
            badge.condition() &&
            !player.badges.includes(badge.id)
        ) {
            player.badges.push(badge.id);

            showToast(`New badge unlocked: ${badge.emoji} ${badge.name}!`);
            playSound("badge");
        }
    });

    renderBadges();
    save();
}

function renderBadges() {
    const list = $("badgeList");
    if (!list) return;

    list.innerHTML = "";

    badgeData.forEach(badge => {
        const unlocked = player.badges.includes(badge.id);

        const item = document.createElement("div");
        item.className = unlocked ? "badge-item unlocked" : "badge-item locked";

        item.innerHTML = `
            <span>${unlocked ? badge.emoji : "🔒"}</span>
            <span>${badge.name}</span>
        `;

        list.appendChild(item);
    });
}

/* =========================
   18. UNLOCKS
========================= */

function renderUnlocks() {
    const list = $("unlockList");
    if (!list) return;

    list.innerHTML = "";

    recipes.forEach(recipe => {
        const unlocked = player.level >= recipe.level;

        const item = document.createElement("div");
        item.className = unlocked ? "unlock-item unlocked" : "unlock-item locked";

        item.textContent = unlocked
            ? `${recipe.emoji} ${recipe.name}`
            : `🔒 Level ${recipe.level} - ${recipe.name}`;

        list.appendChild(item);
    });
}

/* =========================
   19. SHOP
========================= */

const shopItems = [
    { id: "pink_apron", name: "Pink Chef Apron", emoji: "🎀", price: 80 },
    { id: "magic_spoon", name: "Magic Spoon", emoji: "🥄", price: 120 },
    { id: "golden_hat", name: "Golden Chef Hat", emoji: "👑", price: 200 }
];

function renderShop() {
    const list = $("shopList");
    if (!list) return;

    list.innerHTML = "";

    shopItems.forEach(item => {
        const bought = player.purchasedItems.includes(item.id);

        const card = document.createElement("div");
        card.className = "shop-item";

        const title = document.createElement("span");
        title.textContent = `${item.emoji} ${item.name} - ${item.price} coins`;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = bought ? "Owned" : "Buy";
        button.disabled = bought || player.coins < item.price;

        button.addEventListener("click", () => purchaseItem(item.id));

        card.append(title, button);
        list.appendChild(card);
    });
}

function purchaseItem(id) {
    const item = shopItems.find(product => product.id === id);

    if (!item || player.purchasedItems.includes(id)) return;

    if (player.coins < item.price) {
        showToast("Not enough coins!");
        return;
    }

    player.coins -= item.price;
    player.purchasedItems.push(id);

    showToast(`${item.name} purchased!`);
    updateDashboard();
    renderShop();
    save();

    playSound("success");
}

/* =========================
   20. MUSIC SYSTEM
========================= */

function getAudioContext() {
    if (!audioContext) {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (AudioContextClass) {
            audioContext = new AudioContextClass();
        }
    }

    if (audioContext && audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}

function playTone(frequency, duration = 0.15, volume = 0.04) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
}

const melody = [
    523.25, 659.25, 783.99, 659.25,
    587.33, 698.46, 880.00, 698.46,
    523.25, 659.25, 783.99, 1046.50,
    880.00, 783.99, 659.25, 587.33
];

function startMusic() {
    if (musicInterval) return;

    player.musicOn = true;
    updateAudioButtons();

    getAudioContext();

    musicInterval = setInterval(() => {
        if (!player.musicOn) return;

        playTone(melody[musicStep % melody.length], 0.42, 0.012);
        musicStep++;
    }, 430);

    save();
}

function stopMusic() {
    clearInterval(musicInterval);
    musicInterval = null;

    player.musicOn = false;
    updateAudioButtons();
    save();
}

function toggleMusic() {
    if (player.musicOn) {
        stopMusic();
    } else {
        startMusic();
    }
}

function updateAudioButtons() {
    const music = $("musicToggle");
    const sound = $("soundToggle");
    const voice = $("voiceToggle");

    if (music) music.textContent = player.musicOn ? "🎵 Music: ON" : "🎵 Music: OFF";
    if (sound) sound.textContent = player.soundOn ? "🔊 Sound: ON" : "🔇 Sound: OFF";
    if (voice) voice.textContent = player.voiceOn ? "🗣️ Voice: ON" : "🗣️ Voice: OFF";
}

/* =========================
   21. SOUND EFFECTS
========================= */

function playSound(type) {
    if (!player.soundOn) return;

    const sounds = {
        click: [440],
        success: [523, 659, 784],
        wrong: [220, 180],
        level: [523, 659, 784, 1046],
        badge: [784, 988, 1175]
    };

    const notes = sounds[type] || [440];

    notes.forEach((note, index) => {
        setTimeout(() => playTone(note, 0.16, 0.035), index * 110);
    });
}

function toggleSound() {
    player.soundOn = !player.soundOn;
    updateAudioButtons();
    save();

    if (player.soundOn) playSound("click");
}

/* =========================
   22. ANIME VOICE
========================= */

function speak(message) {
    if (!player.voiceOn || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 1.02;
    utterance.pitch = 1.25;
    utterance.volume = 0.85;

    window.speechSynthesis.speak(utterance);
}

function toggleVoice() {
    player.voiceOn = !player.voiceOn;

    if (!player.voiceOn && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

    updateAudioButtons();
    save();
}

/* =========================
   23. TOAST MESSAGE
========================= */

function showToast(message) {
    const toast = $("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* =========================
   24. MODAL CONTROLS
========================= */

function closeResult() {
    hide("resultModal");
    generateOrder();
}

function closeLevelModal() {
    hide("levelModal");
}

function continueGame() {
    hide("resultModal");
    generateOrder();
}

function playAgain() {
    hide("resultModal");
    generateOrder();
}

function repeatMika() {
    if (currentRecipe) {
        speak(`Let's make ${currentRecipe.name}! You can do it, Chef!`);
    } else {
        speak(`Hello ${player.name}! Welcome to Freshopia!`);
    }
}

/* =========================
   25. AVATAR SELECTION
========================= */

function setupAvatarSelection() {
    document.querySelectorAll("[data-avatar], .avatar-option").forEach(option => {
        option.addEventListener("click", () => {
            document.querySelectorAll("[data-avatar], .avatar-option")
                .forEach(item => item.classList.remove("selected"));

            option.classList.add("selected");

            player.avatar =
                option.dataset.avatar ||
                option.textContent.trim();

            save();
        });
    });
}

/* =========================
   26. BUTTON EVENTS
========================= */

function bindEvents() {
    $("startButton")?.addEventListener("click", startGame);
    $("serveButton")?.addEventListener("click", serveOrder);
    $("clearButton")?.addEventListener("click", clearIngredients);
    $("hintButton")?.addEventListener("click", giveHint);

    $("musicToggle")?.addEventListener("click", toggleMusic);
    $("soundToggle")?.addEventListener("click", toggleSound);
    $("voiceToggle")?.addEventListener("click", toggleVoice);

    $("repeatMika")?.addEventListener("click", repeatMika);
    $("closeResult")?.addEventListener("click", closeResult);
    $("continueButton")?.addEventListener("click", continueGame);
    $("playAgainButton")?.addEventListener("click", playAgain);
    $("closeLevelModal")?.addEventListener("click", closeLevelModal);

    $("reportButton")?.addEventListener("click", () => {
        const report = [
            "FRESHOPIA GAME REPORT",
            `Player: ${player.name}`,
            `Level: ${player.level}`,
            `XP: ${player.xp}`,
            `Coins: ${player.coins}`,
            `Eco Points: ${player.eco}`,
            `Completed Orders: ${player.correctOrders}`,
            `Badges: ${player.badges.length}`
        ].join("\n");

        const blob = new Blob([report], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "Freshopia-Game-Report.txt";
        link.click();

        URL.revokeObjectURL(url);
    });

    $("resetButton")?.addEventListener("click", () => {
        const confirmed = confirm(
            "Are you sure you want to reset all game progress?"
        );

        if (!confirmed) return;

        localStorage.removeItem(GAME_KEY);
        location.reload();
    });
}

/* =========================
   27. INITIALIZATION
========================= */

function initializeFreshopia() {
    resetDailyMissionsIfNeeded();

    if ($("playerName")) {
        $("playerName").value =
            player.name === "Chef" ? "" : player.name;
    }

    setupAvatarSelection();
    bindEvents();

    updateDashboard();
    renderIngredients();
    renderShop();
    renderBadges();
    renderUnlocks();
    renderDailyMissions();
    updateAudioButtons();

    const avatar = $("mikaCharacterVisual");
    if (avatar) avatar.textContent = "👩🏻‍🍳";

    if ($("welcomeScreen")) {
        show("welcomeScreen");
        hide("gameScreen");
    }

    if (player.musicOn) {
        // Music starts after the player interacts with the page.
        player.musicOn = false;
        save();
        updateAudioButtons();
    }

    console.log("Freshopia Ultimate 6.1 initialized successfully!");
}

document.addEventListener("DOMContentLoaded", initializeFreshopia);
