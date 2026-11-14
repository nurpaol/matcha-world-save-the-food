/* ==========================================
   MATCHA WORLD: SAVE THE FOOD
   PREMIUM GAME ENGINE 2.0
========================================== */

// PLAYER
let selectedAvatar = "👩‍🍳";
let selectedIngredients = [];
let player = null;

// GAME DATA
let points = 0;
let satisfaction = 100;
let waste = 0;
let completedOrders = 0;

let cash = 5000;
let level = 1;
let stock = 100;
let ecoScore = 0;

// RECIPE
const correctIngredients = ["🥑", "🥬", "🍅"];
// ==========================================
// CUSTOMER DATABASE - GAME ENGINE 3.0
// ==========================================

const customers = [
    {
        name: "Emma",
        avatar: "👩‍🦰",
        type: "Regular Customer",
        recipe: "Healthy Green Bowl",
        request: "I want a fresh and balanced green bowl.",
        ingredients: ["🥑", "🥬", "🍅"],
        reward: 500
    },
    {
        name: "Oliver",
        avatar: "👨‍💼",
        type: "VIP Customer",
        recipe: "Premium Garden Bowl",
        request: "Please prepare my premium garden bowl!",
        ingredients: ["🥕", "🥒", "🥑"],
        reward: 800
    },
    {
        name: "Mia",
        avatar: "👧",
        type: "Young Customer",
        recipe: "Colorful Veggie Bowl",
        request: "I want something colorful and delicious!",
        ingredients: ["🥕", "🍅", "🥒"],
        reward: 400
    },
    {
        name: "Lucas",
        avatar: "🧑‍🍳",
        type: "Gourmet Customer",
        recipe: "Chef's Special Bowl",
        request: "I expect a perfectly balanced recipe.",
        ingredients: ["🥬", "🥒", "🥑"],
        reward: 650
    },
    {
        name: "Sophia",
        avatar: "👩‍💻",
        type: "Busy Customer",
        recipe: "Fresh Energy Bowl",
        request: "I need a fresh and nutritious meal!",
        ingredients: ["🍅", "🥬", "🥕"],
        reward: 550
    }
];

let currentCustomer = null;

// ==========================================
// GENERATE CUSTOMER ORDER
// ==========================================

function generateCustomerOrder() {
    const randomIndex = Math.floor(
        Math.random() * customers.length
    );

    currentCustomer = customers[randomIndex];

    document.getElementById("customer-avatar").textContent =
        currentCustomer.avatar;

    document.getElementById("customer-name").textContent =
        currentCustomer.name;

    document.getElementById("customer-type").textContent =
        currentCustomer.type;

    document.getElementById("recipe-name").textContent =
        currentCustomer.recipe;

    document.getElementById("customer-request").textContent =
        currentCustomer.request;

    document.getElementById("order-reward").textContent =
        "₺" + currentCustomer.reward;

    selectedIngredients = [];
    updateIngredientSelection();

    document.getElementById("game-message").textContent =
        "Prepare " + currentCustomer.name + "'s order!";
}
// SETTINGS
const INGREDIENT_COST = 3;
const ORDER_REWARD = {
    perfect: 500,
    good: 250,
    poor: 100
};

// ==========================================
// SAVE SYSTEM
// ==========================================

function saveGame() {
    const gameData = {
        points,
        satisfaction,
        waste,
        completedOrders,
        cash,
        level,
        stock,
        ecoScore
    };

    localStorage.setItem(
        "matchaGameData",
        JSON.stringify(gameData)
    );
}

function loadGame() {
    const saved = localStorage.getItem("matchaGameData");

    if (!saved) return;

    try {
        const data = JSON.parse(saved);

        points = data.points ?? 0;
        satisfaction = data.satisfaction ?? 100;
        waste = data.waste ?? 0;
        completedOrders = data.completedOrders ?? 0;
        cash = data.cash ?? 5000;
        level = data.level ?? 1;
        stock = data.stock ?? 100;
        ecoScore = data.ecoScore ?? 0;
    } catch (error) {
        console.error("Game save could not be loaded:", error);
    }
}

// ==========================================
// PLAYER AVATAR
// ==========================================

function selectAvatar(button, avatar) {
    selectedAvatar = avatar;

    document.querySelectorAll(".avatar").forEach(item => {
        item.classList.remove("selected");
    });

    button.classList.add("selected");
}

// ==========================================
// CREATE PLAYER
// ==========================================

function createPlayer() {
    const nickname = document
        .getElementById("nickname")
        .value.trim();

    const preference = document
        .getElementById("preference").value;

    if (!nickname) {
        alert("Please enter your nickname!");
        return;
    }

    player = {
        nickname,
        avatar: selectedAvatar,
        preference
    };

    localStorage.setItem(
        "matchaPlayer",
        JSON.stringify(player)
    );

    document.getElementById("player-welcome").textContent =
        "Welcome, " + player.avatar + " " + player.nickname + "!";

    showScreen("dashboard-screen");
    updateStats();
}

// ==========================================
// SCREEN NAVIGATION
// ==========================================

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    }
}

// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateStats() {
    document.getElementById("points").textContent = points;

    document.getElementById("satisfaction").textContent =
        satisfaction + "%";

    document.getElementById("waste").textContent =
        waste + "%";

    updateManagementStats();
    saveGame();
}

function updateManagementStats() {
    document.getElementById("cash").textContent =
        "₺" + cash.toLocaleString("tr-TR");

    document.getElementById("level").textContent =
        level;

    document.getElementById("stock").textContent =
        stock;

    document.getElementById("eco-score").textContent =
        ecoScore;
}

// ==========================================
// LEVEL SYSTEM
// ==========================================

function updateLevel() {
    const newLevel = Math.floor(points / 500) + 1;

    if (newLevel > level) {
        level = newLevel;

        alert(
            "Congratulations! You reached Level " +
            level + "!"
        );
    }
}

// ==========================================
// START RESTAURANT
// ==========================================

function startGame() {
    selectedIngredients = [];

    generateCustomerOrder();

    showScreen("game-screen");
}

// ==========================================
// INGREDIENT SELECTION
// ==========================================

function chooseIngredient(button, ingredient) {

    if (selectedIngredients.includes(ingredient)) {
        selectedIngredients = selectedIngredients.filter(
            item => item !== ingredient
        );
    } else {

        if (selectedIngredients.length >= 3) {
            document.getElementById("game-message").textContent =
                "You can only choose three ingredients!";
            return;
        }

        selectedIngredients.push(ingredient);
    }

    updateIngredientSelection();
}

// ==========================================
// UPDATE INGREDIENT COUNTER
// ==========================================

function updateIngredientSelection() {

    document.getElementById("selected-count").textContent =
        selectedIngredients.length;

    document.querySelectorAll(".ingredient-list button").forEach(button => {

        const emoji = button.textContent.trim().split(" ")[0];

        button.classList.toggle(
            "selected",
            selectedIngredients.includes(emoji)
        );
    });
}

// ==========================================
// CUSTOMER ORDER SYSTEM
// ==========================================

function serveOrder() {

    const message = document.getElementById("game-message");

    if (!currentCustomer) {
        message.textContent = "No customer order found!";
        return;
    }

    if (selectedIngredients.length !== 3) {
        message.textContent =
            "Please select exactly three ingredients!";
        return;
    }

    const totalCost = selectedIngredients.length * INGREDIENT_COST;

    if (stock < totalCost) {
        message.textContent =
            "Not enough stock! Restock your restaurant first.";
        return;
    }

    stock -= totalCost;
    completedOrders++;

    const correctCount = selectedIngredients.filter(
        ingredient =>
            currentCustomer.ingredients.includes(ingredient)
    ).length;

    const customerName = currentCustomer.name;

    if (correctCount === 3) {

        const reward = currentCustomer.reward;

        points += 100;
        cash += reward;
        satisfaction = Math.min(100, satisfaction + 5);
        ecoScore += 20;

        message.textContent =
            "PERFECT ORDER! " + customerName +
            " is happy! +100 points and +₺" + reward;

    } else if (correctCount === 2) {

        const reward = 250;

        points += 40;
        cash += reward;
        satisfaction = Math.max(0, satisfaction - 3);
        waste = Math.min(100, waste + 5);
        ecoScore += 5;

        message.textContent =
            "GOOD ORDER! +40 points and +₺250";

    } else {

        points = Math.max(0, points - 30);
        cash += 100;
        satisfaction = Math.max(0, satisfaction - 12);
        waste = Math.min(100, waste + 15);
        ecoScore = Math.max(0, ecoScore - 5);

        message.textContent =
            "POOR ORDER! " + customerName +
            " was not satisfied. +₺100";
    }

    if (correctCount === 3 && completedOrders % 3 === 0) {
        points += 150;
        cash += 300;
        message.textContent +=
            " BONUS! +150 points and +₺300";
    }

    updateLevel();

    selectedIngredients = [];
    updateIngredientSelection();
    updateStats();

    // LOAD NEXT CUSTOMER
    generateCustomerOrder();
}

    const totalCost = selectedIngredients.length * INGREDIENT_COST;

    if (stock < totalCost) {
        message.textContent =
            "Not enough food stock! Restock your restaurant first.";
        return;
    }

    // CONSUME INGREDIENTS
    stock -= totalCost;

    const correctCount = selectedIngredients.filter(
        ingredient => correctIngredients.includes(ingredient)
    ).length;

    completedOrders++;

    // PERFECT ORDER
    if (correctCount === 3) {

        points += 100;
        cash += ORDER_REWARD.perfect;

        satisfaction = Math.min(
            100,
            satisfaction + 5
        );

        ecoScore += 20;

        message.textContent =
            "Excellent! Perfect healthy bowl! +100 points, +₺500 and +20 Eco Score.";

    }

    // GOOD ORDER
    else if (correctCount === 2) {

        points += 40;
        cash += ORDER_REWARD.good;

        satisfaction = Math.max(
            0,
            satisfaction - 3
        );

        waste = Math.min(
            100,
            waste + 5
        );

        ecoScore += 5;

        message.textContent =
            "Good attempt! +40 points and +₺250. Try to reduce food waste.";

    }

    // POOR ORDER
    else {

        points = Math.max(
            0,
            points - 30
        );

        cash += ORDER_REWARD.poor;

        satisfaction = Math.max(
            0,
            satisfaction - 12
        );

        waste = Math.min(
            100,
            waste + 15
        );

        ecoScore = Math.max(
            0,
            ecoScore - 5
        );

        message.textContent =
            "The customer was not satisfied. +₺100. Improve your recipe!";
    }

    // BONUS REWARD
    if (
        correctCount === 3 &&
        completedOrders % 3 === 0
    ) {
        points += 150;
        cash += 300;

        message.textContent +=
            " BONUS! Three successful orders! +150 points and +₺300.";
    }

    // UPDATE LEVEL
    updateLevel();

    // RESET INGREDIENTS
    selectedIngredients = [];

    updateIngredientSelection();

    // UPDATE ALL STATISTICS
    updateStats();
}

// ==========================================
// RESTOCK SYSTEM
// ==========================================

function restockFood() {

    const restockCost = 300;
    const restockAmount = 30;

    if (cash < restockCost) {
        alert("Not enough money to restock!");
        return;
    }

    if (stock >= 100) {
        alert("Your stock is already full!");
        return;
    }

    cash -= restockCost;

    stock = Math.min(
        100,
        stock + restockAmount
    );

    updateStats();

    alert("Food stock replenished!");
}

// ==========================================
// RESTORE PLAYER
// ==========================================

function loadPlayer() {

    const savedPlayer = localStorage.getItem("matchaPlayer");

    if (!savedPlayer) return;

    try {
        player = JSON.parse(savedPlayer);

        document.getElementById("nickname").value =
            player.nickname;

        document.getElementById("preference").value =
            player.preference;

        selectedAvatar = player.avatar;

        document.querySelectorAll(".avatar").forEach(button => {
            button.classList.toggle(
                "selected",
                button.textContent.trim() === selectedAvatar
            );
        });

        document.getElementById("player-welcome").textContent =
            "Welcome, " + player.avatar + " " + player.nickname + "!";

    } catch (error) {
        console.error("Player data could not be loaded:", error);
    }
}

// ==========================================
// INITIALIZE GAME
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    loadPlayer();
    loadGame();

    updateStats();

    console.log("MATCHA WORLD GAME ENGINE 2.0 READY");
});
