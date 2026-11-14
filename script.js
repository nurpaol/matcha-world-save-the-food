// MATCHA WORLD: SAVE THE FOOD
// Main Game System - Version 1.0

let selectedAvatar = "👩‍🍳";
let selectedIngredients = [];
let points = 0;
let satisfaction = 100;
let waste = 0;
let completedOrders = 0;
let player = null;

const correctIngredients = ["🥑", "🥬", "🍅"];

// AVATAR SELECTION
function selectAvatar(button, avatar) {
    selectedAvatar = avatar;

    document.querySelectorAll(".avatar").forEach(item => {
        item.classList.remove("selected");
    });

    button.classList.add("selected");
}

// CREATE PLAYER PROFILE
function createPlayer() {
    const nickname = document.getElementById("nickname").value.trim();
    const preference = document.getElementById("preference").value;

    if (!nickname) {
        alert("Please enter your nickname!");
        return;
    }

    player = {
        nickname: nickname,
        avatar: selectedAvatar,
        preference: preference
    };

    localStorage.setItem("matchaPlayer", JSON.stringify(player));

    document.getElementById("player-welcome").textContent =
        "Welcome, " + player.avatar + " " + player.nickname + "!";

    showScreen("dashboard-screen");
    updateStats();
}

// SCREEN NAVIGATION
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}

// UPDATE GAME STATISTICS
function updateStats() {
    document.getElementById("points").textContent = points;
    document.getElementById("satisfaction").textContent =
        satisfaction + "%";
    document.getElementById("waste").textContent = waste + "%";
}

// START RESTAURANT
function startGame() {
    selectedIngredients = [];
    updateIngredientSelection();
    document.getElementById("game-message").textContent =
        "Choose three fresh ingredients for your bowl.";

    showScreen("game-screen");
}

// SELECT FOOD INGREDIENTS
function chooseIngredient(button, ingredient) {

    if (selectedIngredients.includes(ingredient)) {
        selectedIngredients = selectedIngredients.filter(
            item => item !== ingredient
        );

        button.classList.remove("selected");
    } else {
        if (selectedIngredients.length >= 3) {
            document.getElementById("game-message").textContent =
                "You can only choose three ingredients!";
            return;
        }

        selectedIngredients.push(ingredient);
        button.classList.add("selected");
    }

    updateIngredientSelection();
}

// UPDATE INGREDIENT COUNTER
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

// SERVE CUSTOMER ORDER
function serveOrder() {

    if (selectedIngredients.length !== 3) {
        document.getElementById("game-message").textContent =
            "Please select exactly three ingredients!";
        return;
    }

    const correctCount = selectedIngredients.filter(
        ingredient => correctIngredients.includes(ingredient)
    ).length;

    completedOrders++;

    if (correctCount === 3) {
        points += 100;
        satisfaction = Math.min(100, satisfaction + 5);

        document.getElementById("game-message").textContent =
            "Excellent! Your customer loved the healthy bowl. +100 points!";

        alert("Perfect service! You earned 100 points!");

    } else if (correctCount === 2) {
        points += 40;
        satisfaction = Math.max(0, satisfaction - 5);
        waste = Math.min(100, waste + 5);

        document.getElementById("game-message").textContent =
            "Good attempt! But your recipe needs improvement. +40 points.";

        alert("Your customer was partly satisfied. +40 points.");

    } else {
        points = Math.max(0, points - 30);
        satisfaction = Math.max(0, satisfaction - 15);
        waste = Math.min(100, waste + 15);

        document.getElementById("game-message").textContent =
            "Not a good choice. Try to use fresh and balanced ingredients!";

        alert("Order failed! You lost 30 points.");
    }

    // BONUS REWARD
    if (correctCount === 3 && completedOrders % 3 === 0) {
        points += 150;
        alert("BONUS REWARD! Three successful orders! +150 points!");
    }

    updateStats();

    selectedIngredients = [];
    updateIngredientSelection();
}

// RESTORE SAVED PLAYER
function loadPlayer() {
    const savedPlayer = localStorage.getItem("matchaPlayer");

    if (savedPlayer) {
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
    }
}

// INITIALIZE GAME
document.addEventListener("DOMContentLoaded", function() {
    loadPlayer();
    updateStats();
});
