/* ==========================================
   FRESHOPIA - ANIME COOKING ADVENTURE
   Restaurant, Customer, Cooking and XP System
========================================== */

const SAVE_KEY = "freshopiaCompleteSave";

const defaultGame = {
  name: "Chef",
  level: 1,
  xp: 0,
  coins: 100,
  reputation: 0,
  happyCustomers: 0,
  completedOrders: 0,
  completedRecipes: [],
  selectedCharacter: 0,
  createdRecipes: 0,
  puzzleWins: 0,
  claimedMissions: [],
  achievements: [],
  restaurantOpen: false
};

let game = { ...defaultGame };

try {
  const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
  if (saved) game = { ...defaultGame, ...saved };
} catch (error) {
  console.warn("Save data could not be loaded.");
}

const customers = [
  { name: "Mika", avatar: "👩🏻", mood: "Happy", patience: 100 },
  { name: "Hana", avatar: "👧🏻", mood: "Excited", patience: 100 },
  { name: "Yuki", avatar: "👩🏼", mood: "Calm", patience: 100 },
  { name: "Akira", avatar: "👨🏻", mood: "Hungry", patience: 100 },
  { name: "Sakura", avatar: "👩🏽", mood: "Cheerful", patience: 100 },
  { name: "Ren", avatar: "👦🏻", mood: "Hungry", patience: 100 },
  { name: "Aoi", avatar: "👩🏻‍🦰", mood: "Excited", patience: 100 },
  { name: "Emi", avatar: "👧🏼", mood: "Happy", patience: 100 }
];

const ingredients = [
  {
    id: "tomato",
    name: "Fresh Tomatoes",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"
  },
  {
    id: "pasta",
    name: "Italian Pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400"
  },
  {
    id: "basil",
    name: "Fresh Basil",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400"
  },
  {
    id: "cheese",
    name: "Mozzarella Cheese",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"
  },
  {
    id: "flour",
    name: "Wheat Flour",
    image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=400"
  },
  {
    id: "egg",
    name: "Fresh Eggs",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400"
  },
  {
    id: "lettuce",
    name: "Fresh Lettuce",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400"
  },
  {
    id: "cucumber",
    name: "Cucumber",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400"
  },
  {
    id: "carrot",
    name: "Fresh Carrots",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400"
  },
  {
    id: "chicken",
    name: "Chicken Breast",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400"
  },
  {
    id: "rice",
    name: "Sushi Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"
  },
  {
    id: "avocado",
    name: "Fresh Avocado",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400"
  },
  {
    id: "strawberry",
    name: "Strawberries",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400"
  },
  {
    id: "milk",
    name: "Fresh Milk",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
  },
  {
    id: "chocolate",
    name: "Dark Chocolate",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400"
  },
  {
    id: "potato",
    name: "Potatoes",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"
  },
  {
    id: "onion",
    name: "Onion",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400"
  },
  {
    id: "oliveoil",
    name: "Olive Oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"
  }
];

const recipes = [
  {
    id: "pasta",
    name: "Italian Tomato Pasta",
    description: "Pasta with fresh tomato sauce and basil.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700",
    ingredients: ["pasta", "tomato", "basil", "oliveoil"],
    method: "Boil, sauté and combine.",
    reward: 35,
    price: 35
  },
  {
    id: "pizza",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with mozzarella and basil.",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700",
    ingredients: ["flour", "tomato", "cheese", "basil"],
    method: "Prepare dough, add toppings and bake.",
    reward: 40,
    price: 45
  },
  {
    id: "salad",
    name: "Fresh Garden Salad",
    description: "A refreshing mix of fresh vegetables.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
    ingredients: ["lettuce", "cucumber", "carrot", "oliveoil"],
    method: "Wash, chop and mix.",
    reward: 25,
    price: 25
  },
  {
    id: "sushi",
    name: "Japanese Vegetable Sushi",
    description: "Delicate sushi rolls with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700",
    ingredients: ["rice", "avocado", "carrot", "cucumber"],
    method: "Cook rice, prepare vegetables and roll.",
    reward: 45,
    price: 50
  },
  {
    id: "cake",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with a soft texture.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
    ingredients: ["flour", "egg", "milk", "chocolate"],
    method: "Mix, pour and bake.",
    reward: 50,
    price: 55
  },
  {
    id: "smoothie",
    name: "Strawberry Smoothie",
    description: "A fresh and creamy strawberry drink.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700",
    ingredients: ["strawberry", "milk"],
    method: "Blend until smooth.",
    reward: 25,
    price: 30
  }
];

const characters = [
  { name: "Sakura", avatar: "👩🏻‍🍳", level: 1, role: "Head Chef" },
  { name: "Mika", avatar: "👩🏼", level: 1, role: "Pastry Chef" },
  { name: "Hana", avatar: "👧🏻", level: 2, role: "Kitchen Assistant" },
  { name: "Yuki", avatar: "👩🏻‍🦰", level: 3, role: "Sushi Master" },
  { name: "Akira", avatar: "👨🏻‍🍳", level: 4, role: "Pizza Chef" },
  { name: "Ren", avatar: "👦🏻", level: 5, role: "Food Artist" },
  { name: "Aoi", avatar: "👩🏽‍🍳", level: 7, role: "Master Chef" },
  { name: "Emi", avatar: "👧🏼", level: 10, role: "Royal Chef" }
];

let currentOrder = null;
let selectedIngredients = [];
let currentCookingStep = 0;
let timerInterval = null;
let remainingTime = 0;
let mealPrepared = false;
let orderExpired = false;
let completedOrderHistory = [];

let quizIndex = 0;
let quizScore = 0;
let memoryCards = [];
let memoryFirst = null;
let memoryLocked = false;
let memoryMatches = 0;
let orderSteps = [];
let orderStepIndex = 0;

const cookingInstructions = [
  "Prepare and wash all ingredients carefully.",
  "Cut and measure the ingredients.",
  "Cook the ingredients using the correct method.",
  "Arrange the meal beautifully on a plate."
];

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function showSection(sectionId) {
  document.querySelectorAll(".game-section").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(sectionId);
  if (target) target.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.toggle(
      "active",
      button.getAttribute("onclick")?.includes("'" + sectionId + "'")
    );
  });

  if (sectionId === "recipes") renderRecipes();
  if (sectionId === "characters") renderCharacters();
  if (sectionId === "missions") renderMissions();
  if (sectionId === "awards") renderAchievements();
}

function addXP(amount) {
  game.xp += amount;

  while (game.xp >= game.level * 100) {
    game.xp -= game.level * 100;
    game.level++;
    showLevelUp();
  }

  updateInterface();
  saveGame();
}

function showLevelUp() {
  const modal = document.getElementById("levelModal");
  const character = characters[game.selectedCharacter] || characters[0];

  document.getElementById("danceCharacter").textContent = character.avatar;
  document.getElementById("levelMessage").textContent =
    "Congratulations! You reached Level " + game.level + "! New adventures are waiting!";

  modal.classList.add("show");
  renderCharacters();
}

function closeLevelModal() {
  document.getElementById("levelModal").classList.remove("show");
}

function updateInterface() {
  const level = document.getElementById("playerLevel");
  const coins = document.getElementById("playerCoins");
  const xpProgress = document.getElementById("xpProgress");
  const xpText = document.getElementById("xpText");

  if (level) level.textContent = game.level;
  if (coins) coins.textContent = game.coins;

  const needed = game.level * 100;
  const percent = Math.min(100, (game.xp / needed) * 100);

  if (xpProgress) xpProgress.style.width = percent + "%";
  if (xpText) xpText.textContent = game.xp + " / " + needed + " XP";

  setText("restaurantCoins", game.coins);
  setText("restaurantReputation", game.reputation);
  setText("happyCustomers", game.happyCustomers);

  const homeCharacter = document.getElementById("homeCharacter");
  if (homeCharacter) {
    homeCharacter.textContent =
      characters[game.selectedCharacter]?.avatar || "👩🏻‍🍳";
  }

  renderAchievements();
  saveGame();
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

/* ==========================================
   RESTAURANT AND CUSTOMER SYSTEM
========================================== */

function openRestaurant() {
  if (game.restaurantOpen) {
    showToast("Your restaurant is already open!");
    return;
  }

  game.restaurantOpen = true;

  const button = document.getElementById("openRestaurantBtn");
  button.textContent = "🛎️ Restaurant Open";

  showToast("Welcome! Your restaurant is now open!");
  saveGame();
  createCustomerOrder();
}

function createCustomerOrder() {
  if (!game.restaurantOpen || currentOrder) return;

  const customer = customers[
    Math.floor(Math.random() * customers.length)
  ];

  const availableRecipes = recipes.filter(recipe =>
    game.level >= 1
  );

  const recipe = availableRecipes[
    Math.floor(Math.random() * availableRecipes.length)
  ];

  currentOrder = {
    customer,
    recipe,
    time: 100,
    started: Date.now()
  };

  selectedIngredients = [];
  currentCookingStep = 0;
  mealPrepared = false;
  orderExpired = false;

  renderCustomer();
  renderOrder();
  renderIngredients();
  renderSelectedIngredients();
  renderCookingSteps();

  const feedback = document.getElementById("orderFeedback");
  if (feedback) {
    feedback.textContent =
      customer.name + " has ordered " + recipe.name + "!";
  }

  remainingTime = currentOrder.time;
  updateTimerDisplay();

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!currentOrder || orderExpired) return;

    remainingTime--;
    updateTimerDisplay();

    if (remainingTime <= 0) {
      expireOrder();
    }
  }, 1000);
}

function renderCustomer() {
  const area = document.getElementById("customerArea");

  area.innerHTML = `
    <div class="customer-card">
      <div class="customer-avatar">${currentOrder.customer.avatar}</div>
      <div>
        <h3>${currentOrder.customer.name}</h3>
        <p>${currentOrder.customer.mood} customer • Waiting for food</p>
      </div>
    </div>
  `;

  document.getElementById("currentCustomer").innerHTML = `
    <div class="customer-avatar">${currentOrder.customer.avatar}</div>
    <div>
      <h3>${currentOrder.customer.name}</h3>
      <p>"Hello chef! I would like something delicious!"</p>
    </div>
  `;
}

function renderOrder() {
  const recipe = currentOrder.recipe;

  document.getElementById("orderImage").src = recipe.image;
  document.getElementById("orderName").textContent = recipe.name;
  document.getElementById("orderDescription").textContent =
    recipe.description;
}

function updateTimerDisplay() {
  const timer = document.getElementById("orderTimer");
  if (!timer) return;

  const minutes = Math.floor(Math.max(0, remainingTime) / 60);
  const seconds = Math.max(0, remainingTime) % 60;

  timer.textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");

  const mood = document.getElementById("customerMood");

  if (mood) {
    if (remainingTime > 60) {
      mood.textContent = "😊 Customer is waiting patiently.";
    } else if (remainingTime > 25) {
      mood.textContent = "😟 Customer is getting hungry!";
    } else {
      mood.textContent = "😠 Hurry up! Customer is losing patience!";
    }
  }
}

function expireOrder() {
  if (!currentOrder) return;

  clearInterval(timerInterval);
  orderExpired = true;

  document.getElementById("orderFeedback").textContent =
    "⏰ Time is up! The customer left without their meal.";

  showToast("Customer left! Try again with the next order.");

  currentOrder = null;
  selectedIngredients = [];
  mealPrepared = false;

  renderEmptyCustomer();
  disableKitchen();

  setTimeout(() => {
    if (game.restaurantOpen && !currentOrder) {
      createCustomerOrder();
    }
  }, 3000);
}

function renderEmptyCustomer() {
  document.getElementById("customerArea").innerHTML = `
    <div class="empty-state">
      <span>🪑</span>
      <h3>Waiting for the next customer...</h3>
      <p>A new guest will arrive soon.</p>
    </div>
  `;

  document.getElementById("currentCustomer").innerHTML = `
    <div class="customer-avatar">🪑</div>
    <div>
      <h3>Waiting for a customer...</h3>
      <p>Your next customer will appear here.</p>
    </div>
  `;

  document.getElementById("orderName").textContent = "No active order";
  document.getElementById("orderDescription").textContent =
    "Waiting for the next customer.";
}

function disableKitchen() {
  document.getElementById("ingredientGrid").innerHTML =
    "<p>Waiting for the next order.</p>";

  document.getElementById("selectedIngredients").textContent =
    "No ingredients selected.";

  document.getElementById("prepareMealBtn").disabled = true;
  document.getElementById("serveMealBtn").disabled = true;
  document.getElementById("cookingContent").textContent =
    "Your kitchen is waiting for a new order.";
}

/* ==========================================
   INGREDIENT SELECTION
========================================== */

function renderIngredients() {
  const grid = document.getElementById("ingredientGrid");

  if (!currentOrder) {
    grid.innerHTML = "<p>Open your restaurant to start cooking.</p>";
    return;
  }

  const correctIds = currentOrder.recipe.ingredients;

  const distractors = ingredients
    .filter(item => !correctIds.includes(item.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const available = [
    ...ingredients.filter(item => correctIds.includes(item.id)),
    ...distractors
  ].sort(() => Math.random() - 0.5);

  grid.innerHTML = available.map(item => `
    <button class="ingredient-card"
      type="button"
      data-ingredient="${item.id}"
      onclick="toggleIngredient('${item.id}')">
      <img src="${item.image}" alt="${item.name}" loading="lazy">
      <h4>${item.name}</h4>
      <small>Tap to select</small>
    </button>
  `).join("");
}

function toggleIngredient(id) {
  if (!currentOrder || mealPrepared || orderExpired) return;

  const card = document.querySelector(
    '[data-ingredient="' + id + '"]'
  );

  if (selectedIngredients.includes(id)) {
    selectedIngredients = selectedIngredients.filter(item => item !== id);
    card?.classList.remove("selected");
  } else {
    selectedIngredients.push(id);
    card?.classList.add("selected");
  }

  renderSelectedIngredients();

  const prepareButton = document.getElementById("prepareMealBtn");
  prepareButton.disabled = selectedIngredients.length === 0;
}

function renderSelectedIngredients() {
  const container = document.getElementById("selectedIngredients");

  if (!selectedIngredients.length) {
    container.textContent = "No ingredients selected yet.";
    return;
  }

  const names = selectedIngredients.map(id =>
    ingredients.find(item => item.id === id)?.name
  );

  container.textContent = names.join(" • ");
}

/* ==========================================
   COOKING PROCESS
========================================== */

function prepareMeal() {
  if (!currentOrder || mealPrepared || orderExpired) return;

  const required = currentOrder.recipe.ingredients;

  const correct =
    required.length === selectedIngredients.length &&
    required.every(id => selectedIngredients.includes(id));

  if (!correct) {
    document.getElementById("orderFeedback").textContent =
      "❌ Some ingredients are missing or incorrect. Check the recipe!";
    showToast("Check your ingredient selection!");
    return;
  }

  mealPrepared = true;
  currentCookingStep = 0;

  document.getElementById("prepareMealBtn").disabled = true;

  document.getElementById("orderFeedback").textContent =
    "✨ Perfect ingredients! Let's cook!";

  renderCookingSteps();
  showCookingStep();
}

function renderCookingSteps() {
  const container = document.getElementById("cookingSteps");

  container.innerHTML = cookingInstructions.map((step, index) => `
    <div class="cooking-step" id="cookingStep${index}">
      ${index + 1}. ${step}
    </div>
  `).join("");
}

function showCookingStep() {
  const container = document.getElementById("cookingContent");

  if (!currentOrder || !mealPrepared) return;

  if (currentCookingStep >= cookingInstructions.length) {
    container.innerHTML = `
      <div>
        <h3>🍽️ Your meal is ready!</h3>
        <img src="${currentOrder.recipe.image}" alt="Prepared meal">
        <p>Beautifully prepared by you, chef!</p>
      </div>
    `;

    document.getElementById("serveMealBtn").disabled = false;
    document.getElementById("orderFeedback").textContent =
      "🎉 Great work! Your meal is ready to serve.";
    return;
  }

  const step = cookingInstructions[currentCookingStep];

  container.innerHTML = `
    <div>
      <h3>🔥 Cooking Step ${currentCookingStep + 1}</h3>
      <p>${step}</p>
      <button class="primary-btn" onclick="nextCookingStep()">
        Continue Cooking →
      </button>
    </div>
  `;

  const active = document.getElementById(
    "cookingStep" + currentCookingStep
  );

  if (active) active.classList.add("completed");
}

function nextCookingStep() {
  if (!mealPrepared || !currentOrder || orderExpired) return;

  currentCookingStep++;
  showCookingStep();
}

/* ==========================================
   SERVING AND REWARDS
========================================== */

function serveMeal() {
  if (!currentOrder || !mealPrepared || orderExpired) return;

  clearInterval(timerInterval);

  const recipe = currentOrder.recipe;
  const customer = currentOrder.customer;

  const onTime = remainingTime > 0;
  const bonus = onTime ? 15 : 0;
  const coinsEarned = recipe.price + bonus;
  const xpEarned = recipe.reward + (onTime ? 10 : 0);

  game.coins += coinsEarned;
  game.reputation += onTime ? 5 : 2;
  game.happyCustomers++;

  game.completedOrders++;
  game.completedRecipes.push(recipe.id);

  addXP(xpEarned);

  completedOrderHistory.unshift({
    name: recipe.name,
    customer: customer.name,
    coins: coinsEarned
  });

  completedOrderHistory = completedOrderHistory.slice(0, 5);

  renderOrderHistory();

  document.getElementById("orderFeedback").textContent =
    "💖 " + customer.name + " loved your " + recipe.name + "!";

  document.getElementById("customerArea").innerHTML = `
    <div class="customer-card">
      <div class="customer-avatar">🥰</div>
      <div>
        <h3>${customer.name} is happy!</h3>
        <p>"Thank you, chef! That was delicious!"</p>
      </div>
    </div>
  `;

  showToast(
    "+" + coinsEarned + " Coins  |  +" + xpEarned + " XP"
  );

  currentOrder = null;
  selectedIngredients = [];
  mealPrepared = false;

  disableKitchen();
  updateInterface();
  saveGame();

  setTimeout(() => {
    if (game.restaurantOpen && !currentOrder) {
      createCustomerOrder();
    }
  }, 3500);
}

function renderOrderHistory() {
  const container = document.getElementById("orderHistory");

  if (!completedOrderHistory.length) {
    container.innerHTML = "<p>No completed orders yet.</p>";
    return;
  }

  container.innerHTML = completedOrderHistory.map(item => `
    <div class="history-item">
      <span>🍽️ ${item.name} — ${item.customer}</span>
      <b>+${item.coins} 💰</b>
    </div>
  `).join("");
}

/* ==========================================
   RECIPE ACADEMY
========================================== */

function renderRecipes() {
  const grid = document.getElementById("recipeGrid");
  if (!grid) return;

  grid.innerHTML = recipes.map(recipe => `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <p>⭐ ${recipe.reward} XP</p>
      <button class="primary-btn" onclick="startRecipe('${recipe.id}')">
        View Recipe
      </button>
    </article>
  `).join("");
}

function startRecipe(id) {
  const recipe = recipes.find(item => item.id === id);
  if (!recipe) return;

  const container = document.getElementById("recipeGrid");

  container.innerHTML = `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}">
      <h2>${recipe.name}</h2>
      <p>${recipe.description}</p>
      <h3>Ingredients</h3>
      <p>${recipe.ingredients.map(id =>
        ingredients.find(item => item.id === id)?.name
      ).join(", ")}</p>
      <h3>Cooking Method</h3>
      <p>${recipe.method}</p>
      <button class="primary-btn" onclick="renderRecipes()">
        Back to Recipes
      </button>
    </article>
  `;
}

/* ==========================================
   CHARACTERS
========================================== */

function renderCharacters() {
  const grid = document.getElementById("characterGrid");
  if (!grid) return;

  grid.innerHTML = characters.map((character, index) => {
    const unlocked = game.level >= character.level;
    const selected = game.selectedCharacter === index;

    return `
      <article class="character-card">
        <div class="character-avatar">
          ${unlocked ? character.avatar : "🔒"}
        </div>
        <h3>${character.name}</h3>
        <p>${character.role}</p>
        <p>Unlock at Level ${character.level}</p>
        <button
          ${!unlocked ? "disabled" : ""}
          onclick="selectCharacter(${index})">
          ${selected ? "Selected ✓" : unlocked ? "Choose Character" : "Locked"}
        </button>
      </article>
    `;
  }).join("");
}

function selectCharacter(index) {
  if (game.level < characters[index].level) {
    showToast("Reach Level " + characters[index].level + " to unlock!");
    return;
  }

  game.selectedCharacter = index;
  updateInterface();
  renderCharacters();
  showToast(characters[index].name + " is now your cooking companion!");
}

/* ==========================================
   MISSIONS
========================================== */

const missions = [
  { id: "order1", title: "Serve your first customer", target: 1, reward: 40 },
  { id: "order3", title: "Complete 3 restaurant orders", target: 3, reward: 60 },
  { id: "order5", title: "Serve 5 delicious meals", target: 5, reward: 80 },
  { id: "coins", title: "Earn 100 restaurant coins", target: 100, reward: 50 },
  { id: "puzzle", title: "Win a food puzzle", target: 1, reward: 40 }
];

function missionProgress(mission) {
  if (mission.id === "order1" || mission.id === "order3" ||
      mission.id === "order5") {
    return game.completedOrders;
  }

  if (mission.id === "coins") return game.coins;
  if (mission.id === "puzzle") return game.puzzleWins;

  return 0;
}

function renderMissions() {
  const container = document.getElementById("missionList");
  if (!container) return;

  container.innerHTML = missions.map(mission => {
    const progress = Math.min(
      mission.target,
      missionProgress(mission)
    );

    const completed = progress >= mission.target;
    const claimed = game.claimedMissions.includes(mission.id);

    return `
      <div class="mission-card">
        <h3>🎯 ${mission.title}</h3>
        <p>Progress: ${progress} / ${mission.target}</p>
        <p>Reward: ${mission.reward} XP</p>
        <button class="primary-btn"
          ${!completed || claimed ? "disabled" : ""}
          onclick="claimMission('${mission.id}')">
          ${claimed ? "Completed ✓" : completed ? "Claim Reward" : "In Progress"}
        </button>
      </div>
    `;
  }).join("");
}

function claimMission(id) {
  const mission = missions.find(item => item.id === id);
  if (!mission || game.claimedMissions.includes(id)) return;

  if (missionProgress(mission) < mission.target) {
    showToast("Complete the mission first!");
    return;
  }

  game.claimedMissions.push(id);
  addXP(mission.reward);
  showToast("Mission completed! +" + mission.reward + " XP");
  renderMissions();
}

/* ==========================================
   ACHIEVEMENTS
========================================== */

const achievements = [
  { id: "level2", name: "Rising Chef", icon: "⭐", check: () => game.level >= 2 },
  { id: "level5", name: "Kitchen Star", icon: "🌟", check: () => game.level >= 5 },
  { id: "firstOrder", name: "First Customer", icon: "🍽️", check: () => game.completedOrders >= 1 },
  { id: "orders5", name: "Restaurant Expert", icon: "🏆", check: () => game.completedOrders >= 5 },
  { id: "coins500", name: "Coin Collector", icon: "💰", check: () => game.coins >= 500 },
  { id: "level10", name: "Master Chef", icon: "👑", check: () => game.level >= 10 }
];

function renderAchievements() {
  const container = document.getElementById("achievementList");
  if (!container) return;

  container.innerHTML = achievements.map(achievement => {
    const unlocked = achievement.check();

    return `
      <div class="achievement-card">
        <span>${unlocked ? achievement.icon : "🔒"}</span>
        <h3>${achievement.name}</h3>
        <p>${unlocked ? "Unlocked!" : "Keep playing to unlock."}</p>
      </div>
    `;
  }).join("");
}

/* ==========================================
   FOOD QUIZ
========================================== */

const quizQuestions = [
  {
    question: "Which ingredient is commonly used to make pasta sauce?",
    options: ["Tomato", "Strawberry", "Chocolate"],
    answer: 0
  },
  {
    question: "Which ingredient is essential for traditional sushi rice?",
    options: ["Potato", "Rice", "Flour"],
    answer: 1
  },
  {
    question: "Which food is a good source of protein?",
    options: ["Chicken", "Sugar", "Olive oil"],
    answer: 0
  },
  {
    question: "Which ingredient helps bread dough rise?",
    options: ["Yeast", "Cucumber", "Lettuce"],
    answer: 0
  },
  {
    question: "Which ingredient is often used in a smoothie?",
    options: ["Strawberry", "Onion", "Flour"],
    answer: 0
  }
];

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById("puzzleGame");

  if (quizIndex >= quizQuestions.length) {
    container.innerHTML = `
      <h2>Quiz Completed! 🎉</h2>
      <p>Your score: ${quizScore} / ${quizQuestions.length}</p>
      <button class="primary-btn" onclick="startQuiz()">Play Again</button>
    `;

    if (quizScore >= 3) {
      game.puzzleWins++;
      addXP(30);
      showToast("Great job! You earned 30 XP!");
    }

    renderMissions();
    return;
  }

  const question = quizQuestions[quizIndex];

  container.innerHTML = `
    <h3>Question ${quizIndex + 1} / ${quizQuestions.length}</h3>
    <h2>${question.question}</h2>
    ${question.options.map((option, index) => `
      <button class="primary-btn"
        style="display:block;width:100%;margin:10px 0"
        onclick="answerQuiz(${index})">
        ${option}
      </button>
    `).join("")}
  `;
}

function answerQuiz(index) {
  if (index === quizQuestions[quizIndex].answer) {
    quizScore++;
    showToast("Correct answer! ✨");
  } else {
    showToast("Not quite! Keep learning!");
  }

  quizIndex++;
  renderQuizQuestion();
}

/* ==========================================
   FOOD MEMORY GAME
========================================== */

function startMemory() {
  const container = document.getElementById("puzzleGame");

  const items = ["🍓", "🥑", "🍅", "🥕", "🧀", "🥦"];
  memoryCards = [...items, ...items].sort(() => Math.random() - 0.5);
  memoryFirst = null;
  memoryLocked = false;
  memoryMatches = 0;

  container.innerHTML = `
    <h3>Match the food pairs!</h3>
    <div class="memory-grid" style="
      display:grid;
      grid-template-columns:repeat(4,1fr);
      gap:10px;margin-top:15px">
      ${memoryCards.map((item, index) => `
        <button id="memory${index}"
          style="padding:18px;font-size:27px;border-radius:15px;background:#f1eaff"
          onclick="flipMemory(${index})">
          ❔
        </button>
      `).join("")}
    </div>
  `;
}

function flipMemory(index) {
  if (memoryLocked) return;

  const button = document.getElementById("memory" + index);
  if (!button || button.dataset.matched === "true" ||
      button.dataset.open === "true") return;

  button.textContent = memoryCards[index];
  button.dataset.open = "true";

  if (memoryFirst === null) {
    memoryFirst = index;
    return;
  }

  if (memoryCards[memoryFirst] === memoryCards[index]) {
    button.dataset.matched = "true";
    document.getElementById("memory" + memoryFirst).dataset.matched = "true";
    memoryMatches++;
    memoryFirst = null;

    if (memoryMatches === 6) {
      game.puzzleWins++;
      addXP(30);
      showToast("All pairs matched! +30 XP");
      renderMissions();
    }
  } else {
    memoryLocked = true;
    const first = memoryFirst;

    setTimeout(() => {
      const firstButton = document.getElementById("memory" + first);
      const secondButton = document.getElementById("memory" + index);

      if (firstButton && firstButton.dataset.matched !== "true") {
        firstButton.textContent = "❔";
        firstButton.dataset.open = "false";
      }

      if (secondButton && secondButton.dataset.matched !== "true") {
        secondButton.textContent = "❔";
        secondButton.dataset.open = "false";
      }

      memoryFirst = null;
      memoryLocked = false;
    }, 800);
  }
}

/* ==========================================
   RECIPE ORDER GAME
========================================== */

function startOrder() {
  orderSteps = [
    "Wash the ingredients",
    "Cut the vegetables",
    "Prepare the sauce",
    "Cook the meal",
    "Serve the dish"
  ];

  orderSteps = orderSteps.sort(() => Math.random() - 0.5);
  orderStepIndex = 0;

  renderOrderPuzzle();
}

function renderOrderPuzzle() {
  const container = document.getElementById("puzzleGame");

  container.innerHTML = `
    <h3>Put the cooking steps in the correct order!</h3>
    <p>Choose the first step, then continue.</p>
    ${orderSteps.map((step, index) => `
      <button class="primary-btn"
        style="display:block;width:100%;margin:8px 0"
        onclick="chooseOrderStep(${index})">
        ${step}
      </button>
    `).join("")}
    <p id="orderPuzzleFeedback"></p>
  `;
}

function chooseOrderStep(index) {
  const correctSteps = [
    "Wash the ingredients",
    "Cut the vegetables",
    "Prepare the sauce",
    "Cook the meal",
    "Serve the dish"
  ];

  const selected = orderSteps[index];

  if (selected !== correctSteps[orderStepIndex]) {
    showToast("Not quite! Try again.");
    orderStepIndex = 0;
    orderSteps = [...correctSteps].sort(() => Math.random() - 0.5);
    renderOrderPuzzle();
    return;
  }

  orderStepIndex++;

  if (orderStepIndex === correctSteps.length) {
    document.getElementById("puzzleGame").innerHTML = `
      <h2>Perfect Cooking Order! 🎉</h2>
      <p>You completed the recipe challenge!</p>
      <button class="primary-btn" onclick="startOrder()">Play Again</button>
    `;

    game.puzzleWins++;
    addXP(40);
    renderMissions();
    return;
  }

  orderSteps.splice(index, 1);
  renderOrderPuzzle();
}

/* ==========================================
   INITIALIZATION
========================================== */

function initializeGame() {
  if (!localStorage.getItem("freshopiaName")) {
    const enteredName = prompt("Welcome to Freshopia! What is your chef name?");
    if (enteredName && enteredName.trim()) {
      game.name = enteredName.trim().slice(0, 24);
      localStorage.setItem("freshopiaName", game.name);
    }
  } else {
    game.name = localStorage.getItem("freshopiaName");
  }

  renderRecipes();
  renderCharacters();
  renderMissions();
  renderAchievements();
  renderOrderHistory();
  updateInterface();

  const button = document.getElementById("openRestaurantBtn");

  if (game.restaurantOpen) {
    game.restaurantOpen = false;
    if (button) button.textContent = "🍽️ Open Restaurant";
  }

  disableKitchen();

  document.addEventListener("visibilitychange", () => {
    saveGame();
  });

  window.addEventListener("beforeunload", saveGame);
}

initializeGame();
