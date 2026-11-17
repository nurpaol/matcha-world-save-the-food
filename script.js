/* =========================================
   FRESHOPIA GAME ENGINE 1.0
========================================= */

const SAVE_KEY = "freshopia_game_v1";

const defaultGame = {
  coins: 500,
  level: 1,
  xp: 0,
  orders: 0,
  foodSaved: 0,
  restaurantLevel: 1,
  selectedCharacter: "sakura",
  activity: ["Welcome to Freshopia!"],
  history: [],
  ingredients: [
    { name: "Strawberries", emoji: "🍓", amount: 12 },
    { name: "Flour", emoji: "🌾", amount: 20 },
    { name: "Milk", emoji: "🥛", amount: 15 },
    { name: "Eggs", emoji: "🥚", amount: 18 },
    { name: "Matcha", emoji: "🍵", amount: 10 },
    { name: "Sugar", emoji: "🍬", amount: 20 },
    { name: "Butter", emoji: "🧈", amount: 12 },
    { name: "Apples", emoji: "🍎", amount: 14 }
  ]
};

function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    return saved ? { ...defaultGame, ...saved } : structuredClone(defaultGame);
  } catch {
    return structuredClone(defaultGame);
  }
}

let game = loadGame();

const recipes = [
  {
    id: "cake",
    name: "Strawberry Cake",
    emoji: "🍰",
    price: 90,
    xp: 25,
    ingredients: { Strawberries: 2, Flour: 2, Milk: 1, Eggs: 1 }
  },
  {
    id: "matcha",
    name: "Matcha Latte",
    emoji: "🍵",
    price: 65,
    xp: 20,
    ingredients: { Matcha: 1, Milk: 2, Sugar: 1 }
  },
  {
    id: "apple",
    name: "Apple Pie",
    emoji: "🥧",
    price: 80,
    xp: 22,
    ingredients: { Apples: 2, Flour: 2, Butter: 1, Sugar: 1 }
  }
];

const characters = [
  { id: "sakura", name: "Sakura", role: "Head Chef", level: 1, position: "0%" },
  { id: "hana", name: "Hana", role: "Organic Chef", level: 3, position: "33.333%" },
  { id: "yuki", name: "Yuki", role: "Premium Chef", level: 5, position: "66.666%" },
  { id: "mika", name: "Mika", role: "Sustainability Expert", level: 7, position: "100%" }
];

let customerIndex = 0;
const customerNames = ["Mia", "Luna", "Oliver", "Emma", "Noah"];
const customerRequests = [
  "I would love a Strawberry Cake!",
  "Can I have a Matcha Latte?",
  "Apple Pie sounds delicious!"
];

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

function notify(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function addActivity(message) {
  game.activity.unshift(message);
  game.activity = game.activity.slice(0, 6);
  saveGame();
  renderActivity();
}

function renderActivity() {
  const element = document.getElementById("activity");
  if (element) {
    element.innerHTML = game.activity
      .map(item => `<p>• ${item}</p>`)
      .join("");
  }
}

function updateDashboard() {
  document.getElementById("coins").textContent = game.coins.toLocaleString();
  document.getElementById("dash-coins").textContent = game.coins.toLocaleString();
  document.getElementById("level").textContent = game.level;
  document.getElementById("xp").textContent = `${game.xp} / 100 XP`;
  document.getElementById("orders-served").textContent = game.orders;
  document.getElementById("food-saved").textContent = `${game.foodSaved} kg`;

  const progress = document.getElementById("mission-progress");
  if (progress) progress.style.width = `${Math.min(game.orders * 20, 100)}%`;

  document.getElementById("mission-text").textContent =
    game.orders >= 5
      ? "Mission completed! Great work!"
      : `Serve ${5 - game.orders} more customers to complete your mission.`;

  renderActivity();
}

function addXP(amount) {
  game.xp += amount;

  while (game.xp >= 100) {
    game.xp -= 100;
    game.level++;
    notify(`🎉 Level Up! You are now Level ${game.level}!`);
    addActivity(`Reached Level ${game.level}!`);
  }

  updateDashboard();
  renderCharacters();
}

function showPage(pageId) {
  const page = document.getElementById(pageId);
  if (!page) return;

  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  page.classList.add("active");

  document.querySelectorAll(".nav-button").forEach(button => {
    button.classList.toggle("active", button.dataset.page === pageId);
  });

  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderInventory() {
  const container = document.getElementById("inventory-list");

  container.innerHTML = game.ingredients.map(item => `
    <article class="game-card">
      <div class="food-image">${item.emoji}</div>
      <h3>${item.name}</h3>
      <p>Stock: <strong>${item.amount}</strong></p>
    </article>
  `).join("");
}

function renderRecipes() {
  const html = recipes.map(recipe => `
    <article class="game-card">
      <div class="food-image">${recipe.emoji}</div>
      <h3>${recipe.name}</h3>
      <p>Reward: ${recipe.price} coins</p>
      <p>Experience: ${recipe.xp} XP</p>
      <button class="primary-button" onclick="cookRecipe('${recipe.id}')">
        Cook Recipe
      </button>
    </article>
  `).join("");

  document.getElementById("recipe-list").innerHTML = html;
  document.getElementById("kitchen-recipes").innerHTML = html;
}

function cookRecipe(id) {
  const recipe = recipes.find(item => item.id === id);
  if (!recipe) return;

  const missing = Object.entries(recipe.ingredients).find(([name, quantity]) => {
    const item = game.ingredients.find(ingredient => ingredient.name === name);
    return !item || item.amount < quantity;
  });

  if (missing) {
    notify(`Not enough ${missing[0]}!`);
    return;
  }

  Object.entries(recipe.ingredients).forEach(([name, quantity]) => {
    const item = game.ingredients.find(ingredient => ingredient.name === name);
    item.amount -= quantity;
  });

  game.coins += recipe.price;
  game.orders++;
  game.foodSaved += 0.2;

  document.getElementById("cooking-result").innerHTML =
    `<h2>✨ ${recipe.name} is ready!</h2><p>Your customer will love it!</p>`;

  addXP(recipe.xp);
  addActivity(`Prepared ${recipe.name} and earned ${recipe.price} coins.`);
  saveGame();
  renderInventory();
  updateDashboard();
  notify(`+${recipe.price} coins and +${recipe.xp} XP!`);
}

function renderCharacters() {
  const list = document.getElementById("character-list");
  const active = characters.find(c => c.id === game.selectedCharacter);

  document.getElementById("active-character").innerHTML = `
    <h2>Your Active Chef: ${active.name}</h2>
    <p>${active.role}</p>
  `;

  list.innerHTML = characters.map(character => {
    const unlocked = game.level >= character.level;
    const selected = game.selectedCharacter === character.id;

    return `
      <article class="character-card ${selected ? "selected-character" : ""}">
        <div class="character-picture"
          style="--position:${character.position}"></div>
        <div class="character-details">
          <h3>${character.name}</h3>
          <p>${character.role}</p>
          <p>${unlocked ? "Available" : `Unlock at Level ${character.level}`}</p>
          <button class="primary-button"
            ${unlocked ? "" : "disabled"}
            onclick="chooseCharacter('${character.id}')">
            ${selected ? "Selected ✓" : unlocked ? "Choose Chef" : "Locked"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function chooseCharacter(id) {
  const character = characters.find(c => c.id === id);
  if (!character || game.level < character.level) return;

  game.selectedCharacter = id;
  saveGame();
  renderCharacters();
  notify(`${character.name} is your new chef!`);
}

function serveCustomer() {
  const recipe = recipes[customerIndex % recipes.length];
  const customer = customerNames[customerIndex % customerNames.length];

  const missing = Object.entries(recipe.ingredients).find(([name, quantity]) => {
    const item = game.ingredients.find(ingredient => ingredient.name === name);
    return !item || item.amount < quantity;
  });

  if (missing) {
    notify(`You need more ${missing[0]}!`);
    return;
  }

  cookRecipe(recipe.id);

  game.history.unshift(`${customer} received ${recipe.name}.`);
  document.getElementById("order-history").innerHTML =
    game.history.slice(0, 8).map(item => `<p>✓ ${item}</p>`).join("");

  customerIndex++;
  document.getElementById("customer-name").textContent =
    customerNames[customerIndex % customerNames.length];

  document.getElementById("customer-request").textContent =
    customerRequests[customerIndex % customerRequests.length];

  saveGame();
}

function upgradeRestaurant() {
  if (game.coins < 100) {
    notify("Not enough coins!");
    return;
  }

  game.coins -= 100;
  game.restaurantLevel++;

  document.getElementById("upgrade-status").textContent =
    `Current level: ${game.restaurantLevel}`;

  saveGame();
  updateDashboard();
  notify("Restaurant upgraded!");
}

function renderAchievements() {
  const achievements = [
    ["First Steps", "Serve your first customer.", game.orders >= 1],
    ["Busy Kitchen", "Serve five customers.", game.orders >= 5],
    ["Rising Chef", "Reach Level 3.", game.level >= 3],
    ["Green Hero", "Save one kilogram of food.", game.foodSaved >= 1]
  ];

  document.getElementById("achievement-list").innerHTML =
    achievements.map(([name, description, done]) => `
      <article class="game-card">
        <div class="food-image">${done ? "🏆" : "🔒"}</div>
        <h3>${name}</h3>
        <p>${description}</p>
        <strong>${done ? "Completed" : "In Progress"}</strong>
      </article>
    `).join("");
}

function bindEvents() {
  document.querySelectorAll("[data-page]").forEach(button => {
    if (button.classList.contains("nav-button")) {
      button.addEventListener("click", () => showPage(button.dataset.page));
    }
  });

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.go));
  });

  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
  });

  document.getElementById("serve-customer").addEventListener("click", serveCustomer);
  document.getElementById("upgrade-button").addEventListener("click", upgradeRestaurant);
}

function startGame() {
  bindEvents();
  renderInventory();
  renderRecipes();
  renderCharacters();
  renderAchievements();
  updateDashboard();

  document.getElementById("customer-name").textContent = customerNames[0];
  document.getElementById("customer-request").textContent = customerRequests[0];

  saveGame();
}

document.addEventListener("DOMContentLoaded", startGame);
