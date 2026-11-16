"use strict";

/* =========================================================
   MATCHA WORLD: SAVE THE FOOD
   ULTIMATE GAME ENGINE 5.0
   English Edition | Restaurant Simulation
   ========================================================= */

/* =========================================================
   01. CONFIGURATION
========================================================= */

const GAME_KEY = "matchaUltimateSave";
const GAME_VERSION = "5.0.0";

const CONFIG = {
    startingCash: 1500,
    startingStock: 30,
    startingEcoScore: 75,
    startingLevel: 1,
    startingSatisfaction: 100,
    maxSatisfaction: 100,
    maxEcoScore: 100,
    xpPerLevel: 250,
    autosaveInterval: 15000,
    maxOrderQueue: 5,
    currency: "$"
};

const $ = id => document.getElementById(id);

const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const pick = array =>
    array[Math.floor(Math.random() * array.length)];

const formatMoney = value =>
    CONFIG.currency + Number(value || 0).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });

const escapeHTML = value =>
    String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);

/* =========================================================
   02. GAME DATA
========================================================= */

const INGREDIENTS = [
    { id: "avocado", name: "Avocado", emoji: "🥑", price: 8, stock: 8, category: "Fresh" },
    { id: "lettuce", name: "Lettuce", emoji: "🥬", price: 4, stock: 8, category: "Fresh" },
    { id: "tomato", name: "Tomato", emoji: "🍅", price: 5, stock: 8, category: "Fresh" },
    { id: "carrot", name: "Carrot", emoji: "🥕", price: 3, stock: 8, category: "Fresh" },
    { id: "rice", name: "Rice", emoji: "🍚", price: 5, stock: 8, category: "Grains" },
    { id: "broccoli", name: "Broccoli", emoji: "🥦", price: 6, stock: 8, category: "Fresh" },
    { id: "mushroom", name: "Mushroom", emoji: "🍄", price: 6, stock: 8, category: "Fresh" },
    { id: "corn", name: "Corn", emoji: "🌽", price: 4, stock: 8, category: "Fresh" },
    { id: "lemon", name: "Lemon", emoji: "🍋", price: 3, stock: 8, category: "Fresh" },
    { id: "cucumber", name: "Cucumber", emoji: "🥒", price: 4, stock: 8, category: "Fresh" },
    { id: "cheese", name: "Cheese", emoji: "🧀", price: 7, stock: 8, category: "Dairy" },
    { id: "herbs", name: "Fresh Herbs", emoji: "🌿", price: 5, stock: 8, category: "Fresh" }
];

const RECIPES = [
    {
        id: "green_bowl",
        name: "Green Goddess Bowl",
        description: "A nutritious bowl of fresh green ingredients.",
        ingredients: ["avocado", "lettuce", "tomato"],
        price: 85,
        reward: 50,
        difficulty: "Easy",
        emoji: "🥗"
    },
    {
        id: "veggie_rice",
        name: "Garden Rice Bowl",
        description: "Fresh vegetables served with nutritious rice.",
        ingredients: ["rice", "carrot", "broccoli"],
        price: 95,
        reward: 60,
        difficulty: "Easy",
        emoji: "🍚"
    },
    {
        id: "mushroom_bowl",
        name: "Forest Mushroom Bowl",
        description: "A seasonal mushroom and herb combination.",
        ingredients: ["mushroom", "rice", "herbs"],
        price: 110,
        reward: 70,
        difficulty: "Medium",
        emoji: "🍄"
    },
    {
        id: "fresh_salad",
        name: "Fresh Market Salad",
        description: "A refreshing seasonal vegetable salad.",
        ingredients: ["lettuce", "cucumber", "lemon"],
        price: 75,
        reward: 45,
        difficulty: "Easy",
        emoji: "🥬"
    },
    {
        id: "rainbow_bowl",
        name: "Rainbow Harvest Bowl",
        description: "A colorful combination of garden vegetables.",
        ingredients: ["carrot", "corn", "tomato"],
        price: 90,
        reward: 55,
        difficulty: "Medium",
        emoji: "🌈"
    },
    {
        id: "broccoli_delight",
        name: "Broccoli Delight",
        description: "A warm and balanced vegetable meal.",
        ingredients: ["broccoli", "cheese", "herbs"],
        price: 105,
        reward: 65,
        difficulty: "Medium",
        emoji: "🥦"
    },
    {
        id: "avocado_rice",
        name: "Avocado Rice Plate",
        description: "Creamy avocado with freshly prepared rice.",
        ingredients: ["avocado", "rice", "lemon"],
        price: 100,
        reward: 65,
        difficulty: "Medium",
        emoji: "🥑"
    },
    {
        id: "market_special",
        name: "Market Special Bowl",
        description: "A chef's special seasonal creation.",
        ingredients: ["mushroom", "tomato", "cucumber"],
        price: 120,
        reward: 80,
        difficulty: "Hard",
        emoji: "🍽️"
    }
];

const CUSTOMERS = [
    { name: "Olivia", avatar: "👩", type: "Healthy Food Lover", patience: 100 },
    { name: "James", avatar: "👨", type: "Busy Professional", patience: 85 },
    { name: "Sophia", avatar: "👩🏻", type: "Eco-conscious Customer", patience: 110 },
    { name: "Lucas", avatar: "🧑", type: "Food Explorer", patience: 90 },
    { name: "Emma", avatar: "👩🏽", type: "Vegetarian Guest", patience: 105 },
    { name: "Noah", avatar: "👨🏻", type: "Regular Customer", patience: 120 },
    { name: "Ava", avatar: "👩🏾", type: "Sustainable Food Fan", patience: 100 },
    { name: "Ethan", avatar: "👨🏽", type: "Curious Foodie", patience: 90 }
];

const STAFF_ROLES = [
    { id: "chef", name: "Head Chef", emoji: "👨‍🍳", cost: 350, salary: 45 },
    { id: "assistant", name: "Kitchen Assistant", emoji: "🧑‍🍳", cost: 200, salary: 25 },
    { id: "waiter", name: "Waiter", emoji: "🧑‍💼", cost: 180, salary: 20 },
    { id: "eco", name: "Sustainability Manager", emoji: "🌱", cost: 400, salary: 35 },
    { id: "cashier", name: "Cashier", emoji: "💼", cost: 160, salary: 18 }
];

const UPGRADES = [
    {
        id: "kitchen",
        name: "Professional Kitchen",
        description: "Increase kitchen efficiency and cooking rewards.",
        emoji: "👩‍🍳",
        cost: 500,
        max: 5
    },
    {
        id: "storage",
        name: "Smart Storage",
        description: "Reduce ingredient spoilage.",
        emoji: "🧊",
        cost: 400,
        max: 5
    },
    {
        id: "decor",
        name: "Restaurant Interior",
        description: "Improve customer satisfaction.",
        emoji: "🪴",
        cost: 600,
        max: 5
    },
    {
        id: "recycling",
        name: "Recycling Station",
        description: "Improve your sustainability score.",
        emoji: "♻️",
        cost: 450,
        max: 5
    },
    {
        id: "equipment",
        name: "Energy Efficient Equipment",
        description: "Reduce energy consumption.",
        emoji: "⚡",
        cost: 550,
        max: 5
    }
];

/* =========================================================
   03. PLAYER AND GAME STATE
========================================================= */

function createDefaultGame() {
    const inventory = {};

    INGREDIENTS.forEach(item => {
        inventory[item.id] = item.stock;
    });

    return {
        version: GAME_VERSION,

        player: {
            nickname: "Chef",
            avatar: "👩‍🍳",
            preference: "Sustainable"
        },

        restaurant: {
            name: "Matcha Garden",
            day: 1,
            isOpen: false,
            reputation: 0,
            rating: 5
        },

        stats: {
            cash: CONFIG.startingCash,
            points: 0,
            xp: 0,
            level: CONFIG.startingLevel,
            satisfaction: CONFIG.startingSatisfaction,
            ecoScore: CONFIG.startingEcoScore,
            waste: 0,
            completedOrders: 0,
            failedOrders: 0,
            totalIncome: 0,
            totalExpenses: 0,
            recycling: 0,
            waterSaved: 0,
            energySaved: 0,
            streak: 0,
            bestStreak: 0
        },

        inventory,

        staff: [],

        upgrades: {
            kitchen: 0,
            storage: 0,
            decor: 0,
            recycling: 0,
            equipment: 0
        },

        quests: {
            serveOrders: 0,
            saveFood: 0,
            earnMoney: 0,
            ecoActions: 0,
            claimed: []
        },

        achievements: [],

        history: [],

        settings: {
            sound: true,
            music: false
        },

        selectedIngredients: [],
        currentCustomer: null,
        currentRecipe: null,
        orderQueue: [],

        session: {
            orders: 0,
            income: 0,
            waste: 0,
            started: false
        },

        lastSaved: null
    };
}

let game = createDefaultGame();

let selectedAvatar = "👩‍🍳";
let selectedIngredients = [];
let currentCustomer = null;
let currentRecipe = null;
let serviceInterval = null;
let dayInterval = null;
let toastTimeout = null;

/* =========================================================
   04. SAVE AND LOAD SYSTEM
========================================================= */

function saveGame() {
    try {
        game.lastSaved = new Date().toISOString();

        localStorage.setItem(
            GAME_KEY,
            JSON.stringify(game)
        );

        updateSaveIndicator();
        return true;

    } catch (error) {
        console.error("Save error:", error);
        notify("Unable to save game progress.", "error");
        return false;
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem(GAME_KEY);

        if (!saved) return false;

        const parsed = JSON.parse(saved);

        if (!parsed || typeof parsed !== "object") {
            throw new Error("Invalid save data");
        }

        const defaults = createDefaultGame();

        game = {
            ...defaults,
            ...parsed,

            player: {
                ...defaults.player,
                ...(parsed.player || {})
            },

            restaurant: {
                ...defaults.restaurant,
                ...(parsed.restaurant || {})
            },

            stats: {
                ...defaults.stats,
                ...(parsed.stats || {})
            },

            inventory: {
                ...defaults.inventory,
                ...(parsed.inventory || {})
            },

            upgrades: {
                ...defaults.upgrades,
                ...(parsed.upgrades || {})
            },

            settings: {
                ...defaults.settings,
                ...(parsed.settings || {})
            },

            quests: {
                ...defaults.quests,
                ...(parsed.quests || {})
            },

            session: {
                ...defaults.session,
                ...(parsed.session || {})
            }
        };

        game.restaurant.isOpen = false;
        game.session.started = false;

        return true;

    } catch (error) {
        console.error("Load error:", error);
        game = createDefaultGame();
        return false;
    }
}

function resetGame() {
    if (!confirm("Are you sure you want to reset all game progress?")) {
        return;
    }

    localStorage.removeItem(GAME_KEY);

    game = createDefaultGame();
    selectedIngredients = [];

    stopService();

    showScreen("welcome-screen");
    updateAll();

    notify("A new restaurant journey has started!");
}

function updateSaveIndicator() {
    const element = $("save-status");

    if (element) {
        element.textContent = "Saved ✓";
    }
}

/* =========================================================
   05. NAVIGATION SYSTEM
========================================================= */

function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = $(screenId);

    if (!target) {
        console.warn("Screen not found:", screenId);
        return;
    }

    target.classList.add("active");

    const navigation = $("bottom-nav");

    if (navigation) {
        navigation.style.display = [
            "welcome-screen",
            "profile-screen"
        ].includes(screenId) ? "none" : "flex";
    }

    updateAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function navigateTo(screenId) {
    showScreen(screenId);
}

/* =========================================================
   06. PROFILE SYSTEM
========================================================= */

function selectAvatar(button) {
    if (!button) return;

    document.querySelectorAll(".avatar").forEach(item => {
        item.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedAvatar = button.textContent.trim();
}

function createPlayer() {
    const nicknameInput = $("nickname");
    const preferenceInput = $("preference");

    const nickname = nicknameInput?.value.trim() || "Chef";

    if (nickname.length < 2) {
        if ($("profile-message")) {
            $("profile-message").textContent =
                "Please enter a name with at least 2 characters.";
        }
        return;
    }

    game.player.nickname = nickname;
    game.player.avatar = selectedAvatar;
    game.player.preference = preferenceInput?.value || "Sustainable";

    saveGame();

    showScreen("dashboard-screen");

    notify("Welcome to Matcha World, " + nickname + "!");

    checkAchievements();
}

function updateProfile() {
    setText("player-welcome", game.player.nickname);
    setText("dashboard-avatar", game.player.avatar);
}

/* =========================================================
   07. RESTAURANT LOBBY
========================================================= */

function updateRestaurantLobby() {
    updateProfile();

    setText("level", game.stats.level);
    setText("header-level", game.stats.level);

    setText("points", game.stats.points);
    setText("cash", formatMoney(game.stats.cash));

    setText("satisfaction", game.stats.satisfaction);
    setText("waste", game.stats.waste);

    setText("eco-score", game.stats.ecoScore);
    setText("stock", getTotalStock());

    setText("completed-orders", game.stats.completedOrders);

    const xpNeeded = getXPNeeded();
    const xpProgress = clamp(
        (game.stats.xp / xpNeeded) * 100,
        0,
        100
    );

    setText(
        "experience-text",
        game.stats.xp + " / " + xpNeeded + " XP"
    );

    setStyle(
        "experience-progress",
        "width",
        xpProgress + "%"
    );

    setText("inventory-total", getTotalStock());

    const totalStock = getTotalStock();

    setText("restaurant-stock", totalStock);
}

function getTotalStock() {
    return Object.values(game.inventory)
        .reduce((total, amount) => total + Number(amount || 0), 0);
}

function getXPNeeded() {
    return game.stats.level * CONFIG.xpPerLevel;
}

/* =========================================================
   08. CUSTOMER GENERATION
========================================================= */

function generateCustomer() {
    const customer = pick(CUSTOMERS);
    const recipe = pick(RECIPES);

    currentCustomer = {
        ...customer,
        id: Date.now(),
        patience: customer.patience,
        originalPatience: customer.patience
    };

    currentRecipe = recipe;

    game.currentCustomer = currentCustomer;
    game.currentRecipe = currentRecipe;

    selectedIngredients = [];
    game.selectedIngredients = [];

    return currentCustomer;
}

function updateCustomerDisplay() {
    if (!currentCustomer || !currentRecipe) return;

    setText("customer-avatar", currentCustomer.avatar);
    setText("customer-name", currentCustomer.name);
    setText("customer-type", currentCustomer.type);

    setText("recipe-name", currentRecipe.name);
    setText("customer-request", currentRecipe.description);

    setText("order-reward", "+" + currentRecipe.reward + " Points");

    setText("selected-count", selectedIngredients.length);

    const avatar = $("customer-avatar");

    if (avatar) {
        avatar.textContent = currentCustomer.avatar;
    }

    renderOrderQueue();
}

function renderOrderQueue() {
    const container = $("order-queue");

    if (!container) return;

    container.innerHTML = game.orderQueue.map((order, index) => `
        <div class="queue-item">
            <span>${escapeHTML(order.avatar)}</span>
            <strong>${escapeHTML(order.name)}</strong>
            <small>${escapeHTML(order.recipe.name)}</small>
            <span>#${index + 1}</span>
        </div>
    `).join("");
}

/* =========================================================
   09. SERVICE MANAGEMENT
========================================================= */

function startGame() {
    if (game.stats.cash < 0) {
        notify("Your restaurant needs positive cash to operate.", "error");
        return;
    }

    stopService();

    game.restaurant.isOpen = true;
    game.session.started = true;

    game.session.orders = 0;
    game.session.income = 0;
    game.session.waste = 0;

    generateCustomer();
    updateCustomerDisplay();

    showScreen("game-screen");

    notify("Restaurant service has started!");

    startPatienceSystem();
    saveGame();
}

function stopService() {
    if (serviceInterval) {
        clearInterval(serviceInterval);
        serviceInterval = null;
    }

    game.restaurant.isOpen = false;
    game.session.started = false;
}

function startPatienceSystem() {
    if (serviceInterval) {
        clearInterval(serviceInterval);
    }

    serviceInterval = setInterval(() => {
        if (!currentCustomer || !game.session.started) return;

        currentCustomer.patience -= 5;

        if (currentCustomer.patience <= 0) {
            failOrder("The customer left because of the waiting time.");
        }

        updatePatienceDisplay();

    }, 5000);
}

function updatePatienceDisplay() {
    const percentage = clamp(
        currentCustomer?.patience || 0,
        0,
        currentCustomer?.originalPatience || 100
    );

    setText("customer-patience", percentage);

    setStyle(
        "patience-progress",
        "width",
        percentage + "%"
    );
}

/* =========================================================
   10. INGREDIENT SELECTION
========================================================= */

function chooseIngredient(buttonOrIngredient, ingredientValue) {
    let emoji;

    if (typeof buttonOrIngredient === "string") {
        emoji = buttonOrIngredient;
    } else {
        emoji = ingredientValue;

        if (!emoji && buttonOrIngredient) {
            emoji = buttonOrIngredient.textContent.trim();
        }
    }

    const ingredient = INGREDIENTS.find(item =>
        item.emoji === emoji
    );

    if (!ingredient) return;

    if (selectedIngredients.includes(ingredient.id)) {
        selectedIngredients = selectedIngredients.filter(
            id => id !== ingredient.id
        );

        if (buttonOrIngredient?.classList) {
            buttonOrIngredient.classList.remove("selected");
        }

    } else {
        if (selectedIngredients.length >= 3) {
            notify("You can select only 3 ingredients.", "error");
            return;
        }

        if (game.inventory[ingredient.id] <= 0) {
            notify(ingredient.name + " is out of stock!", "error");
            return;
        }

        selectedIngredients.push(ingredient.id);

        if (buttonOrIngredient?.classList) {
            buttonOrIngredient.classList.add("selected");
        }
    }

    game.selectedIngredients = [...selectedIngredients];

    setText("selected-count", selectedIngredients.length);

    const message = $("game-message");

    if (message) {
        message.textContent =
            selectedIngredients.length + " of 3 ingredients selected.";
    }
}

/* =========================================================
   11. RECIPE VALIDATION
========================================================= */

function validateRecipe() {
    if (!currentRecipe) return false;

    if (selectedIngredients.length !== 3) {
        notify("Please select exactly 3 ingredients.", "error");
        return false;
    }

    const correct = [...currentRecipe.ingredients].sort();
    const selected = [...selectedIngredients].sort();

    return correct.every((id, index) => id === selected[index]);
}

/* =========================================================
   12. ORDER SERVING ENGINE
========================================================= */

function serveOrder() {
    if (!currentCustomer || !currentRecipe) {
        notify("No active customer order.", "error");
        return;
    }

    if (selectedIngredients.length !== 3) {
        notify("Select 3 ingredients before serving.", "error");
        return;
    }

    const ingredientsAvailable = selectedIngredients.every(id =>
        game.inventory[id] > 0
    );

    if (!ingredientsAvailable) {
        notify("Not enough ingredients in stock.", "error");
        return;
    }

    if (!validateRecipe()) {
        failOrder("Incorrect ingredients! The customer was disappointed.");
        return;
    }

    completeOrder();
}

function completeOrder() {
    const recipe = currentRecipe;

    let bonus = 0;

    const staffBonus = game.staff.some(
        staff => staff.id === "chef"
    ) ? 10 : 0;

    const upgradeBonus = game.upgrades.kitchen * 5;

    const ecoBonus = game.upgrades.recycling * 3;

    bonus += staffBonus + upgradeBonus + ecoBonus;

    const reward = recipe.reward + bonus;

    const income = recipe.price;

    recipe.ingredients.forEach(id => {
        game.inventory[id]--;
    });

    game.stats.points += reward;
    game.stats.cash += income;
    game.stats.totalIncome += income;

    game.stats.completedOrders++;
    game.stats.satisfaction = clamp(
        game.stats.satisfaction + 2,
        0,
        CONFIG.maxSatisfaction
    );

    game.stats.streak++;
    game.stats.bestStreak = Math.max(
        game.stats.bestStreak,
        game.stats.streak
    );

    game.stats.xp += 40 + upgradeBonus;

    game.restaurant.reputation += 2;

    game.session.orders++;
    game.session.income += income;

    game.quests.serveOrders++;
    game.quests.earnMoney += income;

    game.stats.ecoScore = clamp(
        game.stats.ecoScore + 1,
        0,
        100
    );

    game.stats.waterSaved += 1;
    game.stats.energySaved += 1;

    addHistory("income", "Order: " + recipe.name, income);

    awardXP(40 + upgradeBonus);
    checkDailyQuests();
    checkAchievements();

    saveGame();

    notify(
        "Order completed! +" +
        reward + " points | +" + formatMoney(income),
        "success"
    );

    clearIngredientSelection();

    updateAll();

    setTimeout(() => {
        if (game.session.started) {
            generateCustomer();
            updateCustomerDisplay();
            updateIngredientButtons();
        }
    }, 900);
}

function failOrder(reason) {
    game.stats.failedOrders++;

    game.stats.streak = 0;

    game.stats.satisfaction = clamp(
        game.stats.satisfaction - 8,
        0,
        100
    );

    game.stats.points = Math.max(
        0,
        game.stats.points - 10
    );

    game.stats.ecoScore = clamp(
        game.stats.ecoScore - 1,
        0,
        100
    );

    game.stats.waste += 1;
    game.session.waste += 1;

    game.quests.saveFood += 0;

    addHistory("expense", "Failed order / food waste", 5);

    game.stats.cash = Math.max(0, game.stats.cash - 5);
    game.stats.totalExpenses += 5;

    notify(reason, "error");

    selectedIngredients = [];
    game.selectedIngredients = [];

    updateAll();

    setTimeout(() => {
        if (game.session.started) {
            generateCustomer();
            updateCustomerDisplay();
            updateIngredientButtons();
        }
    }, 1000);

    saveGame();
}

function clearIngredientSelection() {
    selectedIngredients = [];
    game.selectedIngredients = [];

    document.querySelectorAll(".ingredient-list button").forEach(button => {
        button.classList.remove("selected");
    });

    setText("selected-count", 0);
    setText("game-message", "");
}

function updateIngredientButtons() {
    const buttons = document.querySelectorAll(".ingredient-list button");

    buttons.forEach(button => {
        button.classList.remove("selected");
        button.disabled = false;
    });
}

/* =========================================================
   13. XP AND LEVEL SYSTEM
========================================================= */

function awardXP(amount) {
    game.stats.xp += amount;

    while (game.stats.xp >= getXPNeeded()) {
        game.stats.xp -= getXPNeeded();
        game.stats.level++;

        const reward = game.stats.level * 150;

        game.stats.cash += reward;
        game.stats.totalIncome += reward;

        notify(
            "LEVEL UP! You are now level " +
            game.stats.level + "! Reward: " + formatMoney(reward),
            "success"
        );

        addHistory("income", "Level up reward", reward);
    }
}

/* =========================================================
   14. MARKET AND SUPPLY SYSTEM
========================================================= */

function renderMarket() {
    const screen = $("market-screen");
    const card = screen?.querySelector(".feature-card");

    if (!card) return;

    let container = $("market-products");

    if (!container) {
        container = document.createElement("div");
        container.id = "market-products";
        card.appendChild(container);
    }

    container.innerHTML = `
        <h3>Fresh Ingredient Market</h3>
        <p>Purchase supplies from sustainable local producers.</p>
        <div class="market-grid">
            ${INGREDIENTS.map(item => `
                <div class="market-item">
                    <span>${item.emoji}</span>
                    <strong>${escapeHTML(item.name)}</strong>
                    <small>${formatMoney(item.price)} / unit</small>
                    <small>Stock: ${game.inventory[item.id]}</small>
                    <button class="secondary-btn"
                        onclick="buyIngredients('${item.id}', 5)">
                        Buy 5
                    </button>
                </div>
            `).join("")}
        </div>
    `;

    setText("market-cash", formatMoney(game.stats.cash));
}

function buyIngredients(ingredientId, quantity = 5) {
    const ingredient = INGREDIENTS.find(
        item => item.id === ingredientId
    );

    if (!ingredient) return;

    const totalCost = ingredient.price * quantity;

    if (game.stats.cash < totalCost) {
        notify("Not enough money to purchase this supply.", "error");
        return;
    }

    game.stats.cash -= totalCost;
    game.stats.totalExpenses += totalCost;

    game.inventory[ingredientId] += quantity;

    game.quests.ecoActions++;

    addHistory(
        "expense",
        "Purchased " + ingredient.name,
        totalCost
    );

    saveGame();
    updateAll();

    notify(
        quantity + " " + ingredient.name + " added to inventory.",
        "success"
    );
}

function buyAllSupplies() {
    INGREDIENTS.forEach(item => {
        if (game.stats.cash >= item.price * 5) {
            buyIngredients(item.id, 5);
        }
    });
}

/* =========================================================
   15. INVENTORY MANAGEMENT
========================================================= */

function renderInventory() {
    const container = $("inventory-list");

    if (!container) return;

    container.innerHTML = INGREDIENTS.map(item => {
        const stock = game.inventory[item.id] || 0;

        const percentage = clamp(stock * 5, 0, 100);

        return `
            <div class="inventory-item">
                <div>
                    <span>${item.emoji}</span>
                    <strong>${escapeHTML(item.name)}</strong>
                </div>
                <strong>${stock} units</strong>
                <div class="progress-track">
                    <div class="progress-fill"
                         style="width:${percentage}%"></div>
                </div>
                <small>${stock <= 3 ? "Low stock" : "Available"}</small>
            </div>
        `;
    }).join("");
}

function checkInventory() {
    const lowStock = INGREDIENTS.filter(item =>
        game.inventory[item.id] <= 3
    );

    if (lowStock.length > 0) {
        console.info(
            "Low stock:",
            lowStock.map(item => item.name)
        );
    }
}

function spoilageSystem() {
    INGREDIENTS.forEach(item => {
        const reduction = Math.max(
            0,
            2 - game.upgrades.storage
        );

        if (reduction > 0 && game.inventory[item.id] > 0) {
            const spoiled = Math.min(
                reduction,
                game.inventory[item.id]
            );

            game.inventory[item.id] -= spoiled;

            game.stats.waste += spoiled;
            game.session.waste += spoiled;

            game.stats.ecoScore = clamp(
                game.stats.ecoScore - spoiled,
                0,
                100
            );
        }
    });

    saveGame();
    updateAll();
}

/* =========================================================
   16. STAFF MANAGEMENT
========================================================= */

function hireStaff(roleId) {
    const role = STAFF_ROLES.find(
        item => item.id === roleId
    );

    if (!role) return;

    if (game.staff.some(item => item.id === roleId)) {
        notify("This position is already occupied.", "error");
        return;
    }

    if (game.stats.cash < role.cost) {
        notify("Not enough money to hire this employee.", "error");
        return;
    }

    game.stats.cash -= role.cost;
    game.stats.totalExpenses += role.cost;

    game.staff.push({
        ...role,
        hiredAt: Date.now(),
        performance: 100
    });

    addHistory(
        "expense",
        "Hired " + role.name,
        role.cost
    );

    notify(role.name + " has joined your team!", "success");

    saveGame();
    updateAll();
}

function fireStaff(roleId) {
    const index = game.staff.findIndex(
        staff => staff.id === roleId
    );

    if (index === -1) return;

    const employee = game.staff[index];

    game.staff.splice(index, 1);

    notify(employee.name + " has left the restaurant.");

    saveGame();
    updateAll();
}

function renderStaff() {
    const container = $("staff-list");

    if (!container) return;

    container.innerHTML = `
        <h3>Current Team</h3>
        ${game.staff.length === 0
            ? "<p>No employees hired yet.</p>"
            : game.staff.map(staff => `
                <div class="staff-item">
                    <span>${staff.emoji}</span>
                    <strong>${escapeHTML(staff.name)}</strong>
                    <small>Salary: ${formatMoney(staff.salary)} / day</small>
                    <button class="secondary-btn"
                        onclick="fireStaff('${staff.id}')">
                        Remove
                    </button>
                </div>
            `).join("")
        }

        <h3>Available Positions</h3>

        ${STAFF_ROLES.map(role => {
            const hired = game.staff.some(
                staff => staff.id === role.id
            );

            return `
                <div class="staff-item">
                    <span>${role.emoji}</span>
                    <strong>${escapeHTML(role.name)}</strong>
                    <small>Hiring: ${formatMoney(role.cost)}</small>
                    <small>Daily salary: ${formatMoney(role.salary)}</small>
                    <button class="secondary-btn"
                        ${hired ? "disabled" : ""}
                        onclick="hireStaff('${role.id}')">
                        ${hired ? "Hired" : "Hire Employee"}
                    </button>
                </div>
            `;
        }).join("")}
    `;
}

/* =========================================================
   17. UPGRADE SYSTEM
========================================================= */

function purchaseUpgrade(upgradeId) {
    const upgrade = UPGRADES.find(
        item => item.id === upgradeId
    );

    if (!upgrade) return;

    const currentLevel = game.upgrades[upgradeId] || 0;

    if (currentLevel >= upgrade.max) {
        notify("Maximum upgrade level reached.", "error");
        return;
    }

    const cost = upgrade.cost * (currentLevel + 1);

    if (game.stats.cash < cost) {
        notify("Not enough cash for this upgrade.", "error");
        return;
    }

    game.stats.cash -= cost;
    game.stats.totalExpenses += cost;

    game.upgrades[upgradeId]++;

    addHistory(
        "expense",
        "Purchased " + upgrade.name,
        cost
    );

    game.stats.ecoScore = clamp(
        game.stats.ecoScore +
        (upgradeId === "recycling" ? 5 : 1),
        0,
        100
    );

    notify(
        upgrade.name + " upgraded to level " +
        game.upgrades[upgradeId] + "!",
        "success"
    );

    saveGame();
    updateAll();
}

function renderUpgrades() {
    const screen = $("upgrades-screen");
    const card = screen?.querySelector(".feature-card");

    if (!card) return;

    let container = $("upgrade-list");

    if (!container) {
        container = document.createElement("div");
        container.id = "upgrade-list";
        card.appendChild(container);
    }

    container.innerHTML = UPGRADES.map(upgrade => {
        const level = game.upgrades[upgrade.id] || 0;
        const cost = upgrade.cost * (level + 1);

        return `
            <div class="upgrade-item">
                <span>${upgrade.emoji}</span>
                <h3>${escapeHTML(upgrade.name)}</h3>
                <p>${escapeHTML(upgrade.description)}</p>
                <small>Level: ${level} / ${upgrade.max}</small>
                <button class="secondary-btn"
                    ${level >= upgrade.max ? "disabled" : ""}
                    onclick="purchaseUpgrade('${upgrade.id}')">
                    ${level >= upgrade.max
                        ? "MAX LEVEL"
                        : "Upgrade - " + formatMoney(cost)}
                </button>
            </div>
        `;
    }).join("");
}

/* =========================================================
   18. FINANCIAL ENGINE
========================================================= */

function addHistory(type, description, amount) {
    game.history.unshift({
        type,
        description,
        amount,
        date: new Date().toISOString()
    });

    game.history = game.history.slice(0, 100);
}

function payDailySalaries() {
    const totalSalary = game.staff.reduce(
        (total, employee) => total + employee.salary,
        0
    );

    if (totalSalary <= 0) return;

    game.stats.cash -= totalSalary;
    game.stats.totalExpenses += totalSalary;

    addHistory(
        "expense",
        "Daily staff salaries",
        totalSalary
    );

    if (game.stats.cash < 0) {
        game.stats.satisfaction = clamp(
            game.stats.satisfaction - 5,
            0,
            100
        );

        notify("Warning: Your restaurant has negative cash!", "error");
    }
}

function renderFinance() {
    const stats = game.stats;

    setText("finance-cash", formatMoney(stats.cash));
    setText("total-income", formatMoney(stats.totalIncome));
    setText("total-expenses", formatMoney(stats.totalExpenses));

    setText(
        "net-profit",
        formatMoney(stats.totalIncome - stats.totalExpenses)
    );

    const history = $("finance-history");

    if (history) {
        history.innerHTML = game.history.length
            ? game.history.map(item => `
                <div class="history-item">
                    <strong>${escapeHTML(item.description)}</strong>
                    <span>${item.type === "income" ? "+" : "-"}${formatMoney(item.amount)}</span>
                    <small>${new Date(item.date).toLocaleString("en-US")}</small>
                </div>
            `).join("")
            : "<p>No transactions yet.</p>";
    }
}

/* =========================================================
   19. SUSTAINABILITY ENGINE
========================================================= */

function recycleFood(amount = 1) {
    if (game.stats.waste <= 0) {
        notify("There is no food waste to recycle.");
        return;
    }

    const recycled = Math.min(
        amount,
        game.stats.waste
    );

    game.stats.waste -= recycled;
    game.stats.recycling += recycled;

    game.stats.ecoScore = clamp(
        game.stats.ecoScore + recycled * 3,
        0,
        100
    );

    game.quests.ecoActions++;

    notify(
        recycled + " waste units recycled successfully!",
        "success"
    );

    saveGame();
    updateAll();
}

function saveWater(amount = 5) {
    game.stats.waterSaved += amount;

    game.stats.ecoScore = clamp(
        game.stats.ecoScore + 2,
        0,
        100
    );

    game.quests.ecoActions++;

    notify("Water conservation action completed!", "success");

    saveGame();
    updateAll();
}

function saveEnergy(amount = 5) {
    game.stats.energySaved += amount;

    game.stats.ecoScore = clamp(
        game.stats.ecoScore + 2,
        0,
        100
    );

    game.quests.ecoActions++;

    notify("Energy conservation action completed!", "success");

    saveGame();
    updateAll();
}

function updateSustainability() {
    setText("eco-dashboard-score", game.stats.ecoScore);
    setText("eco-waste", game.stats.waste);

    setText("recycling-score", game.stats.recycling);
    setText("water-score", game.stats.waterSaved);
    setText("energy-score", game.stats.energySaved);

    setText("recycling-progress", game.stats.recycling);
}

/* =========================================================
   20. DAILY QUESTS
========================================================= */

const DAILY_QUESTS = [
    {
        id: "serveOrders",
        name: "Perfect Service",
        description: "Complete 3 customer orders.",
        target: 3,
        reward: 100,
        type: "points"
    },
    {
        id: "saveFood",
        name: "Food Guardian",
        description: "Keep food waste below 5 units.",
        target: 5,
        reward: 75,
        type: "waste"
    },
    {
        id: "earnMoney",
        name: "Smart Business",
        description: "Earn $200 from restaurant orders.",
        target: 200,
        reward: 125,
        type: "money"
    },
    {
        id: "ecoActions",
        name: "Green Champion",
        description: "Complete 3 sustainability actions.",
        target: 3,
        reward: 100,
        type: "eco"
    }
];

function checkDailyQuests() {
    const container = $("quests-screen");

    if (!container) return;

    renderQuests();
}

function renderQuests() {
    const screen = $("quests-screen");
    const card = screen?.querySelector(".feature-card");

    if (!card) return;

    let container = $("daily-quest-list");

    if (!container) {
        container = document.createElement("div");
        container.id = "daily-quest-list";
        card.appendChild(container);
    }

    container.innerHTML = DAILY_QUESTS.map(quest => {
        const current = quest.type === "waste"
            ? game.stats.waste
            : game.quests[quest.id];

        const progress = quest.type === "waste"
            ? Math.max(0, quest.target - current)
            : current;

        const completed = quest.type === "waste"
            ? current < quest.target
            : progress >= quest.target;

        const claimed = game.quests.claimed.includes(quest.id);

        return `
            <div class="quest-item">
                <h3>${escapeHTML(quest.name)}</h3>
                <p>${escapeHTML(quest.description)}</p>
                <small>Progress: ${quest.type === "waste"
                    ? (completed ? "Completed" : "Not completed")
                    : Math.min(progress, quest.target) + " / " + quest.target
                }</small>
                <small>Reward: ${quest.reward} points</small>
                <button class="secondary-btn"
                    ${!completed || claimed ? "disabled" : ""}
                    onclick="claimQuest('${quest.id}')">
                    ${claimed ? "Claimed ✓" : "Claim Reward"}
                </button>
            </div>
        `;
    }).join("");
}

function claimQuest(questId) {
    const quest = DAILY_QUESTS.find(
        item => item.id === questId
    );

    if (!quest || game.quests.claimed.includes(questId)) {
        return;
    }

    const current = quest.type === "waste"
        ? game.stats.waste
        : game.quests[questId];

    const completed = quest.type === "waste"
        ? current < quest.target
        : current >= quest.target;

    if (!completed) {
        notify("Complete the quest first.", "error");
        return;
    }

    game.quests.claimed.push(questId);

    if (quest.type === "money") {
        game.stats.cash += quest.reward;
    } else {
        game.stats.points += quest.reward;
    }

    notify("Quest completed! Reward claimed.", "success");

    checkAchievements();
    saveGame();
    updateAll();
}

/* =========================================================
   21. ACHIEVEMENTS
========================================================= */

const ACHIEVEMENTS = [
    {
        id: "first_order",
        name: "First Service",
        description: "Complete your first customer order.",
        emoji: "🍽️",
        condition: () => game.stats.completedOrders >= 1,
        reward: 50
    },
    {
        id: "ten_orders",
        name: "Restaurant Rising",
        description: "Complete 10 customer orders.",
        emoji: "🏅",
        condition: () => game.stats.completedOrders >= 10,
        reward: 150
    },
    {
        id: "eco_master",
        name: "Eco Master",
        description: "Reach 90 eco score.",
        emoji: "🌍",
        condition: () => game.stats.ecoScore >= 90,
        reward: 200
    },
    {
        id: "level_five",
        name: "Rising Chef",
        description: "Reach level 5.",
        emoji: "👩‍🍳",
        condition: () => game.stats.level >= 5,
        reward: 250
    },
    {
        id: "millionaire",
        name: "Smart Entrepreneur",
        description: "Earn $5,000 in total income.",
        emoji: "💰",
        condition: () => game.stats.totalIncome >= 5000,
        reward: 300
    }
];

function checkAchievements() {
    ACHIEVEMENTS.forEach(achievement => {
        const alreadyUnlocked = game.achievements.some(
            item => item.id === achievement.id
        );

        if (!alreadyUnlocked && achievement.condition()) {
            game.achievements.push({
                id: achievement.id,
                name: achievement.name,
                unlockedAt: new Date().toISOString()
            });

            game.stats.points += achievement.reward;

            notify(
                "Achievement unlocked: " + achievement.name,
                "success"
            );
        }
    });
}

function renderAchievements() {
    const screen = $("quests-screen");
    const card = screen?.querySelector(".feature-card");

    if (!card) return;

    let container = $("achievement-list");

    if (!container) {
        container = document.createElement("div");
        container.id = "achievement-list";
        card.appendChild(container);
    }

    container.innerHTML = `
        <h3>Achievements</h3>
        ${ACHIEVEMENTS.map(item => {
            const unlocked = game.achievements.some(
                achievement => achievement.id === item.id
            );

            return `
                <div class="achievement-item">
                    <span>${item.emoji}</span>
                    <strong>${escapeHTML(item.name)}</strong>
                    <small>${escapeHTML(item.description)}</small>
                    <span>${unlocked ? "UNLOCKED ✓" : "LOCKED 🔒"}</span>
                </div>
            `;
        }).join("")}
    `;
}

/* =========================================================
   22. DAILY RESTAURANT OPERATIONS
========================================================= */

function endRestaurantDay() {
    if (!confirm("Close your restaurant for today?")) {
        return;
    }

    stopService();

    payDailySalaries();
    spoilageSystem();

    game.restaurant.day++;

    game.quests.serveOrders = 0;
    game.quests.saveFood = 0;
    game.quests.earnMoney = 0;
    game.quests.ecoActions = 0;
    game.quests.claimed = [];

    game.session.started = false;

    saveGame();
    updateAll();

    notify("Day completed! Welcome to Day " + game.restaurant.day);
}

function openRestaurantDay() {
    game.restaurant.isOpen = true;
    game.session.started = true;

    generateCustomer();
    updateCustomerDisplay();

    notify("Your restaurant is open!");

    showScreen("game-screen");
}

/* =========================================================
   23. RANDOM EVENTS
========================================================= */

const RANDOM_EVENTS = [
    {
        name: "Local Harvest Festival",
        description: "Local suppliers offer a special discount!",
        effect: () => {
            INGREDIENTS.forEach(item => {
                game.inventory[item.id] += 1;
            });
            notify("Harvest Festival! You received extra ingredients.");
        }
    },
    {
        name: "Eco Awareness Day",
        description: "Your sustainability reputation increases.",
        effect: () => {
            game.stats.ecoScore = clamp(
                game.stats.ecoScore + 5,
                0,
                100
            );
            notify("Eco Awareness Day! +5 eco score.");
        }
    },
    {
        name: "Busy Lunch Hour",
        description: "Your restaurant receives extra attention.",
        effect: () => {
            game.stats.satisfaction = clamp(
                game.stats.satisfaction + 5,
                0,
                100
            );
            notify("Busy Lunch Hour! Customer satisfaction increased.");
        }
    },
    {
        name: "Food Donation Opportunity",
        description: "Share resources with your local community.",
        effect: () => {
            game.stats.points += 40;
            game.stats.ecoScore = clamp(
                game.stats.ecoScore + 3,
                0,
                100
            );
            notify("Donation completed! +40 points.");
        }
    }
];

function triggerRandomEvent() {
    const event = pick(RANDOM_EVENTS);

    event.effect();

    saveGame();
    updateAll();

    return event;
}

/* =========================================================
   24. REPORTS AND ANALYTICS
========================================================= */

function renderReports() {
    setText("report-orders", game.stats.completedOrders);
    setText("report-points", game.stats.points);
    setText("report-satisfaction", game.stats.satisfaction);
    setText("report-eco", game.stats.ecoScore);

    setText(
        "report-revenue",
        formatMoney(game.stats.totalIncome)
    );

    setText(
        "report-profit",
        formatMoney(game.stats.totalIncome - game.stats.totalExpenses)
    );

    setText("report-waste", game.stats.waste);
    setText("report-level", game.stats.level);
    setText("report-day", game.restaurant.day);
}

/* =========================================================
   25. SETTINGS
========================================================= */

function updateSettings() {
    const sound = $("sound-toggle");
    const music = $("music-toggle");

    if (sound) {
        sound.checked = game.settings.sound;
    }

    if (music) {
        music.checked = game.settings.music;
    }
}

function initializeSettings() {
    const sound = $("sound-toggle");
    const music = $("music-toggle");

    if (sound) {
        sound.addEventListener("change", event => {
            game.settings.sound = event.target.checked;
            saveGame();
        });
    }

    if (music) {
        music.addEventListener("change", event => {
            game.settings.music = event.target.checked;
            saveGame();
        });
    }
}

/* =========================================================
   26. USER INTERFACE HELPERS
========================================================= */

function setText(id, value) {
    const element = $(id);

    if (element) {
        element.textContent = value;
    }
}

function setStyle(id, property, value) {
    const element = $(id);

    if (element) {
        element.style[property] = value;
    }
}

function notify(message, type = "info") {
    let toast = $("game-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "game-toast";
        toast.setAttribute("role", "status");
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className = "game-toast " + type;
    toast.style.display = "block";

    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
        toast.style.display = "none";
    }, 3500);
}

/* =========================================================
   27. DYNAMIC MARKET / STAFF / UPGRADE UI
========================================================= */

function renderRecipes() {
    const container = $("recipe-list");

    if (!container) return;

    container.innerHTML = RECIPES.map(recipe => `
        <div class="recipe-item">
            <span>${recipe.emoji}</span>
            <strong>${escapeHTML(recipe.name)}</strong>
            <p>${escapeHTML(recipe.description)}</p>
            <small>Difficulty: ${recipe.difficulty}</small>
            <small>Price: ${formatMoney(recipe.price)}</small>
            <small>Ingredients: ${
                recipe.ingredients.map(id =>
                    INGREDIENTS.find(item => item.id === id)?.name || id
                ).join(", ")
            }</small>
        </div>
    `).join("");
}

function renderKitchen() {
    const container = $("kitchen-orders");

    if (!container) return;

    container.innerHTML = `
        <h3>Kitchen Performance</h3>
        <p>Orders completed: ${game.stats.completedOrders}</p>
        <p>Current streak: ${game.stats.streak}</p>
        <p>Kitchen upgrade: ${game.upgrades.kitchen}/5</p>
    `;
}

/* =========================================================
   28. RESTAURANT PERFORMANCE
========================================================= */

function calculateRestaurantRating() {
    const satisfaction = game.stats.satisfaction;
    const eco = game.stats.ecoScore;
    const orders = game.stats.completedOrders;

    const rating = (
        satisfaction * 0.45 +
        eco * 0.35 +
        Math.min(orders * 2, 100) * 0.20
    ) / 20;

    game.restaurant.rating = Math.round(
        clamp(rating, 0, 5) * 10
    ) / 10;

    setText("restaurant-rating", game.restaurant.rating + " / 5");

    return game.restaurant.rating;
}

function updateRestaurantPerformance() {
    calculateRestaurantRating();

    setText("restaurant-day", game.restaurant.day);
    setText("restaurant-reputation", game.restaurant.reputation);
}

/* =========================================================
   29. COMPLETE UI REFRESH
========================================================= */

function updateAll() {
    updateRestaurantLobby();

    updateProfile();

    updateCustomerDisplayIfNeeded();

    renderInventory();
    renderMarket();
    renderStaff();
    renderUpgrades();

    renderFinance();
    updateSustainability();

    renderQuests();
    renderAchievements();
    renderRecipes();
    renderKitchen();

    renderReports();

    updateSettings();
    updateRestaurantPerformance();

    checkInventory();
}

function updateCustomerDisplayIfNeeded() {
    if (!currentCustomer || !currentRecipe) return;

    if ($("customer-name")) {
        setText("customer-name", currentCustomer.name);
        setText("recipe-name", currentRecipe.name);
        setText("customer-avatar", currentCustomer.avatar);
    }
}

/* =========================================================
   30. AUTOMATIC SAVE AND LIFECYCLE
========================================================= */

function initializeAutosave() {
    setInterval(() => {
        saveGame();
    }, CONFIG.autosaveInterval);

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            saveGame();
        }
    });

    window.addEventListener("pagehide", saveGame);
}

/* =========================================================
   31. GAME INITIALIZATION
========================================================= */

function initializeGame() {
    const loaded = loadGame();

    selectedAvatar = game.player.avatar || "👩‍🍳";

    selectedIngredients = [];

    currentCustomer = null;
    currentRecipe = null;

    initializeSettings();
    initializeAutosave();

    updateAll();

    if (loaded && game.player.nickname !== "Chef") {
        showScreen("dashboard-screen");

        notify(
            "Welcome back, " + game.player.nickname + "!"
        );

    } else {
        showScreen("welcome-screen");
    }

    console.log(
        "%c MATCHA WORLD: SAVE THE FOOD ",
        "background:#173D32;color:#fff;padding:10px;font-weight:bold;"
    );

    console.log("Game Engine:", GAME_VERSION);
    console.log("Game initialized successfully.");
}

/* =========================================================
   32. GLOBAL GAME API
========================================================= */

window.showScreen = showScreen;
window.navigateTo = navigateTo;

window.selectAvatar = selectAvatar;
window.createPlayer = createPlayer;

window.startGame = startGame;
window.openRestaurantDay = openRestaurantDay;
window.endRestaurantDay = endRestaurantDay;

window.chooseIngredient = chooseIngredient;
window.serveOrder = serveOrder;

window.buyIngredients = buyIngredients;
window.buyAllSupplies = buyAllSupplies;

window.hireStaff = hireStaff;
window.fireStaff = fireStaff;

window.purchaseUpgrade = purchaseUpgrade;

window.recycleFood = recycleFood;
window.saveWater = saveWater;
window.saveEnergy = saveEnergy;

window.claimQuest = claimQuest;
window.triggerRandomEvent = triggerRandomEvent;

window.saveGame = saveGame;
window.loadGame = loadGame;
window.resetGame = resetGame;

/* =========================================================
   33. START ENGINE
========================================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGame);
} else {
    initializeGame();
}

/* =========================================================
   END OF MATCHA WORLD GAME ENGINE 5.0
========================================================= */
