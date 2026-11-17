
/* =====================================================
   FRESHOPIA - ANIME COOKING ADVENTURE
   Main Game System
===================================================== */

/* ---------- GAME DATA ---------- */

const SAVE_KEY = "freshopiaCompleteSave";

const defaultGame = {
  level: 1,
  xp: 0,
  coins: 100,
  reputation: 0,
  happyCustomers: 0,
  completedOrders: 0,
  completedRecipes: [],
  selectedCharacter: "Mika",
  claimedMissions: [],
  achievements: [],
  puzzleWins: 0
};

let game = { ...defaultGame };

try {
  const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
  if (saved) game = { ...defaultGame, ...saved };
} catch (error) {
  console.warn("Save data could not be loaded.", error);
}

let currentOrder = null;
let selectedIngredients = [];
let cookingStepIndex = 0;
let restaurantOpen = false;
let orderTimer = null;
let remainingTime = 100;
let orderHistory = [];
let currentRecipe = null;
let puzzleMemoryCards = [];
let memoryFirstCard = null;
let memoryLocked = false;

/* ---------- INGREDIENTS ---------- */

const ingredients = [
  {
    id: "tomato",
    name: "Fresh Tomato",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400"
  },
  {
    id: "pasta",
    name: "Italian Pasta",
    category: "Grain",
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400"
  },
  {
    id: "basil",
    name: "Fresh Basil",
    category: "Herb",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400"
  },
  {
    id: "oliveOil",
    name: "Olive Oil",
    category: "Oil",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400"
  },
  {
    id: "cheese",
    name: "Mozzarella Cheese",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400"
  },
  {
    id: "dough",
    name: "Pizza Dough",
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=400"
  },
  {
    id: "lettuce",
    name: "Fresh Lettuce",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=400"
  },
  {
    id: "cucumber",
    name: "Cucumber",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400"
  },
  {
    id: "carrot",
    name: "Carrot",
    category: "Vegetable",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400"
  },
  {
    id: "rice",
    name: "Sushi Rice",
    category: "Grain",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400"
  },
  {
    id: "seaweed",
    name: "Nori Seaweed",
    category: "Seafood",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400"
  },
  {
    id: "avocado",
    name: "Avocado",
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400"
  },
  {
    id: "flour",
    name: "Wheat Flour",
    category: "Baking",
    image: "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=400"
  },
  {
    id: "sugar",
    name: "Sugar",
    category: "Baking",
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400"
  },
  {
    id: "egg",
    name: "Fresh Egg",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400"
  },
  {
    id: "chocolate",
    name: "Dark Chocolate",
    category: "Baking",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400"
  },
  {
    id: "milk",
    name: "Fresh Milk",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
  },
  {
    id: "strawberry",
    name: "Strawberry",
    category: "Fruit",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400"
  },
  {
    id: "yogurt",
    name: "Natural Yogurt",
    category: "Dairy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
  }
];

/* ---------- RECIPES ---------- */

const recipes = [
  {
    id: "pasta",
    name: "Italian Tomato Pasta",
    description: "Classic Italian pasta with fresh tomato and basil.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700",
    ingredients: ["pasta", "tomato", "basil", "oliveOil"],
    steps: [
      "Boil water in a large pot.",
      "Cook the pasta until tender.",
      "Prepare the fresh tomato sauce.",
      "Add olive oil and fresh basil.",
      "Mix the pasta with the sauce."
    ],
    reward: 35,
    xp: 30
  },
  {
    id: "pizza",
    name: "Margherita Pizza",
    description: "A traditional pizza with tomato, mozzarella and basil.",
    image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700",
    ingredients: ["dough", "tomato", "cheese", "basil"],
    steps: [
      "Prepare the pizza dough.",
      "Spread tomato sauce over the dough.",
      "Add mozzarella cheese.",
      "Decorate with fresh basil.",
      "Bake until golden and crispy."
    ],
    reward: 45,
    xp: 35
  },
  {
    id: "salad",
    name: "Fresh Garden Salad",
    description: "A colorful and refreshing vegetable salad.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
    ingredients: ["lettuce", "tomato", "cucumber", "carrot", "oliveOil"],
    steps: [
      "Wash all vegetables carefully.",
      "Chop the lettuce and tomato.",
      "Slice the cucumber and carrot.",
      "Place the vegetables in a bowl.",
      "Finish with olive oil."
    ],
    reward: 30,
    xp: 25
  },
  {
    id: "sushi",
    name: "Japanese Vegetable Sushi",
    description: "Fresh sushi rolls with rice and colorful vegetables.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700",
    ingredients: ["rice", "seaweed", "cucumber", "carrot", "avocado"],
    steps: [
      "Cook and cool the sushi rice.",
      "Place seaweed on a bamboo mat.",
      "Spread rice over the seaweed.",
      "Add cucumber, carrot and avocado.",
      "Roll carefully and slice."
    ],
    reward: 50,
    xp: 40
  },
  {
    id: "cake",
    name: "Chocolate Cake",
    description: "A soft chocolate cake made with fresh ingredients.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700",
    ingredients: ["flour", "sugar", "egg", "chocolate", "milk"],
    steps: [
      "Preheat the oven.",
      "Mix flour and sugar.",
      "Add eggs and fresh milk.",
      "Melt the chocolate and mix it in.",
      "Bake until the cake is ready."
    ],
    reward: 55,
    xp: 45
  },
  {
    id: "smoothie",
    name: "Strawberry Smoothie",
    description: "A creamy smoothie with strawberries and yogurt.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=700",
    ingredients: ["strawberry", "yogurt", "milk"],
    steps: [
      "Wash the strawberries.",
      "Remove the strawberry leaves.",
      "Add strawberries to the blender.",
      "Add yogurt and milk.",
      "Blend until smooth."
    ],
    reward: 25,
    xp: 20
  }
];

/* ---------- CUSTOMERS ---------- */

const customers = [
  { name: "Emily", avatar: "👩🏻", mood: "Happy", request: "I'd love something delicious!" },
  { name: "Oliver", avatar: "👨🏻", mood: "Hungry", request: "I'm really hungry today!" },
  { name: "Luna", avatar: "👧🏻", mood: "Excited", request: "Surprise me with a tasty meal!" },
  { name: "Sophie", avatar: "👩🏼", mood: "Cheerful", request: "I want something fresh and beautiful!" },
  { name: "Noah", avatar: "🧑🏻", mood: "Hungry", request: "I can't wait to try your food!" },
  { name: "Mia", avatar: "👩🏽", mood: "Excited", request: "Your restaurant looks lovely!" }
];

/* ---------- CHARACTERS ---------- */

const characters = [
  { name: "Mika", emoji: "🎀", role: "Your Cooking Guide", description: "Friendly, cheerful and always ready to help." },
  { name: "Sakura", emoji: "🌸", role: "Dessert Specialist", description: "She loves creating beautiful desserts." },
  { name: "Hana", emoji: "🌷", role: "Healthy Food Expert", description: "She makes colorful and healthy meals." },
  { name: "Yuki", emoji: "❄️", role: "Sushi Master", description: "A talented Japanese cuisine specialist." },
  { name: "Akira", emoji: "🔥", role: "Pizza Chef", description: "He makes delicious Italian dishes." },
  { name: "Ren", emoji: "🍀", role: "Restaurant Manager", description: "He helps your restaurant grow." }
];

/* ---------- GENERAL HELPERS ---------- */

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}

function getElement(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = getElement(id);
  if (element) element.textContent = value;
}

function showToast(message) {
  const toast = getElement("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

/* ---------- NAVIGATION ---------- */

function showSection(sectionId) {
  document.querySelectorAll(".game-section").forEach(section => {
    section.classList.remove("active");
  });

  const selected = getElement(sectionId);
  if (selected) selected.classList.add("active");

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");
    if (button.getAttribute("onclick")?.includes(sectionId)) {
      button.classList.add("active");
    }
  });

  if (sectionId === "restaurant") {
    guideSay("Welcome to your restaurant! Open the doors and let's welcome your customers.", "Your Restaurant");
  } else if (sectionId === "recipes") {
    guideSay("Here you can discover recipes from different cuisines. Choose a recipe to learn more!", "Recipe Academy");
  } else if (sectionId === "characters") {
    guideSay("Meet your anime friends! Each character has a special talent.", "Your Team");
  } else if (sectionId === "missions") {
    guideSay("Complete your daily missions to earn rewards and experience points!", "Daily Missions");
  } else if (sectionId === "puzzles") {
    guideSay("Let's train your chef skills with fun food puzzles!", "Puzzle Time");
  }
}

/* ---------- PLAYER INTERFACE ---------- */

function updateInterface() {
  setText("playerLevel", game.level);
  setText("playerCoins", game.coins);
  setText("restaurantCoins", game.coins);
  setText("restaurantReputation", game.reputation);
  setText("happyCustomers", game.happyCustomers);

  const xpNeeded = game.level * 100;
  const progress = Math.min(100, (game.xp / xpNeeded) * 100);

  const progressBar = getElement("xpProgress");
  if (progressBar) progressBar.style.width = progress + "%";

  setText("xpText", `${game.xp} / ${xpNeeded} XP`);

  renderMissions();
  renderAchievements();
  saveGame();
}

/* ---------- XP AND LEVEL SYSTEM ---------- */

function addXP(amount) {
  game.xp += amount;

  let levelChanged = false;

  while (game.xp >= game.level * 100) {
    game.xp -= game.level * 100;
    game.level++;
    levelChanged = true;
  }

  updateInterface();

  if (levelChanged) {
    showLevelUp();
  }
}

function showLevelUp() {
  const modal = getElement("levelModal");
  if (modal) modal.classList.add("show");

  setText("levelMessage", `Amazing! You reached Level ${game.level}! Your cooking adventure continues!`);

  guideSay(
    `WOW! You did it! You are now Level ${game.level}! Let's celebrate together, chef! 💗`,
    "LEVEL UP!"
  );

  showToast("🎉 Congratulations! New level unlocked!");
}

function closeLevelModal() {
  const modal = getElement("levelModal");
  if (modal) modal.classList.remove("show");
}

/* ---------- RESTAURANT SYSTEM ---------- */

function openRestaurant() {
  if (restaurantOpen) {
    showToast("Your restaurant is already open!");
    return;
  }

  restaurantOpen = true;

  const button = getElement("openRestaurantBtn");
  if (button) {
    button.textContent = "🟢 Restaurant is Open";
    button.disabled = true;
  }

  guideSay("The restaurant is now open! Your first customer is arriving. Get ready!", "Opening Time!");

  createCustomerOrder();
}

function createCustomerOrder() {
  if (!restaurantOpen || currentOrder) return;

  const customer = customers[Math.floor(Math.random() * customers.length)];
  const recipe = recipes[Math.floor(Math.random() * recipes.length)];

  currentOrder = {
    customer,
    recipe,
    completed: false
  };

  selectedIngredients = [];
  cookingStepIndex = 0;
  remainingTime = 100;

  renderCustomer();
  renderIngredients();
  renderSelectedIngredients();
  renderCookingSteps();

  const prepareButton = getElement("prepareMealBtn");
  const serveButton = getElement("serveMealBtn");

  if (prepareButton) prepareButton.disabled = false;
  if (serveButton) serveButton.disabled = true;

  const feedback = getElement("orderFeedback");
  if (feedback) feedback.textContent = `${customer.name} is waiting for ${recipe.name}!`;

  guideSay(
    `A customer named ${customer.name} has arrived! They ordered ${recipe.name}. Let's prepare it together!`,
    "New Customer!"
  );

  startOrderTimer();
}

function renderCustomer() {
  if (!currentOrder) return;

  const area = getElement("customerArea");
  if (area) {
    area.innerHTML = `
      <div class="customer-card">
        <div class="customer-avatar">${currentOrder.customer.avatar}</div>
        <div>
          <h3>${currentOrder.customer.name}</h3>
          <p>${currentOrder.customer.request}</p>
          <strong>😊 ${currentOrder.customer.mood}</strong>
        </div>
      </div>
    `;
  }

  setText("orderName", currentOrder.recipe.name);
  setText("orderDescription", currentOrder.recipe.description);
  setText("customerMood", `${currentOrder.customer.name} is waiting for their meal!`);

  const image = getElement("orderImage");
  if (image) image.src = currentOrder.recipe.image;
}

function startOrderTimer() {
  clearInterval(orderTimer);

  orderTimer = setInterval(() => {
    if (!currentOrder) {
      clearInterval(orderTimer);
      return;
    }

    remainingTime--;
    setText("orderTimer", `${remainingTime}s`);

    if (remainingTime <= 30) {
      setText("customerMood", "⚠️ Your customer is getting impatient!");
    }

    if (remainingTime <= 0) {
      clearInterval(orderTimer);
      customerOrderExpired();
    }
  }, 1000);
}

function customerOrderExpired() {
  if (!currentOrder) return;

  const customerName = currentOrder.customer.name;

  currentOrder = null;
  selectedIngredients = [];

  setText("orderTimer", "00:00");
  setText("customerMood", "The customer has left.");
  setText("orderFeedback", "The order time expired. Try again with the next customer!");

  const area = getElement("customerArea");
  if (area) {
    area.innerHTML = `
      <div class="empty-state">
        ⏰
        <h3>Customer left!</h3>
        <p>${customerName} ran out of patience. A new customer will arrive soon.</p>
      </div>
    `;
  }

  disableKitchen();
  guideSay("Oh no! The customer ran out of patience. Don't worry, chef. You'll do better next time!", "Try Again!");

  setTimeout(() => {
    if (restaurantOpen && !currentOrder) createCustomerOrder();
  }, 3000);
}

/* ---------- INGREDIENT SELECTION ---------- */

function renderIngredients() {
  const grid = getElement("ingredientGrid");
  if (!grid || !currentOrder) return;

  grid.innerHTML = "";

  ingredients.forEach(ingredient => {
    const card = document.createElement("button");
    card.className = "ingredient-card";
    card.type = "button";
    card.dataset.id = ingredient.id;

    card.innerHTML = `
      <img src="${ingredient.image}" alt="${ingredient.name}" loading="lazy">
      <h4>${ingredient.name}</h4>
      <small>${ingredient.category}</small>
    `;

    card.addEventListener("click", () => toggleIngredient(ingredient.id));
    grid.appendChild(card);
  });
}

function toggleIngredient(ingredientId) {
  if (!currentOrder) return;

  const index = selectedIngredients.indexOf(ingredientId);

  if (index >= 0) {
    selectedIngredients.splice(index, 1);
  } else {
    selectedIngredients.push(ingredientId);
  }

  renderIngredients();
  renderSelectedIngredients();
}

function renderSelectedIngredients() {
  const container = getElement("selectedIngredients");
  if (!container) return;

  if (selectedIngredients.length === 0) {
    container.textContent = "No ingredients selected.";
    return;
  }

  container.textContent = selectedIngredients
    .map(id => ingredients.find(item => item.id === id)?.name)
    .filter(Boolean)
    .join(" • ");

  document.querySelectorAll(".ingredient-card").forEach(card => {
    card.classList.toggle(
      "selected",
      selectedIngredients.includes(card.dataset.id)
    );
  });
}

/* ---------- PREPARE MEAL ---------- */

function prepareMeal() {
  if (!currentOrder) {
    showToast("Open your restaurant first!");
    return;
  }

  const required = currentOrder.recipe.ingredients;
  const chosen = selectedIngredients;

  const correct =
    required.length === chosen.length &&
    required.every(id => chosen.includes(id));

  if (!correct) {
    const missing = required.filter(id => !chosen.includes(id));
    const extra = chosen.filter(id => !required.includes(id));

    if (missing.length > 0) {
      const missingNames = missing
        .map(id => ingredients.find(item => item.id === id)?.name)
        .join(", ");

      setText("orderFeedback", `Missing ingredients: ${missingNames}`);
      guideSay(`Let's check the recipe again! You still need ${missingNames}.`, "Ingredient Tip");
    } else if (extra.length > 0) {
      setText("orderFeedback", "You selected some ingredients that are not in this recipe.");
      guideSay("Some ingredients don't belong in this recipe. Try removing the extra ingredients!", "Let's Fix It");
    }

    showToast("Check your ingredients and try again!");
    return;
  }

  clearInterval(orderTimer);

  const prepareButton = getElement("prepareMealBtn");
  if (prepareButton) prepareButton.disabled = true;

  cookingStepIndex = 0;

  setText("orderFeedback", "Perfect! All the ingredients are correct.");
  setText("cookingContent", "Great job! Follow the cooking steps below.");

  renderCookingSteps();

  guideSay("Perfect ingredient selection! Now let's cook your delicious meal step by step!", "Let's Cook!");
}

/* ---------- COOKING PROCESS ---------- */

function renderCookingSteps() {
  const stepsContainer = getElement("cookingSteps");
  if (!stepsContainer) return;

  if (!currentOrder) {
    stepsContainer.innerHTML = "";
    return;
  }

  stepsContainer.innerHTML = "";

  currentOrder.recipe.steps.forEach((step, index) => {
    const item = document.createElement("button");
    item.className = "cooking-step";
    item.type = "button";

    if (index < cookingStepIndex) {
      item.classList.add("completed");
      item.textContent = `✓ ${step}`;
    } else if (index === cookingStepIndex) {
      item.textContent = `▶ ${step}`;
      item.addEventListener("click", nextCookingStep);
    } else {
      item.textContent = `🔒 ${step}`;
      item.disabled = true;
    }

    stepsContainer.appendChild(item);
  });

  if (cookingStepIndex === 0) {
    setText("cookingContent", "Press the first cooking step to begin!");
  }
}

function nextCookingStep() {
  if (!currentOrder) return;

  if (cookingStepIndex >= currentOrder.recipe.steps.length) return;

  const stepText = currentOrder.recipe.steps[cookingStepIndex];

  cookingStepIndex++;

  setText("cookingContent", `👩‍🍳 ${stepText} ✓`);

  renderCookingSteps();

  if (cookingStepIndex < currentOrder.recipe.steps.length) {
    guideSay("Great work! Follow the next cooking instruction. You're doing amazing!", "Cooking Time");
  } else {
    finishCooking();
  }
}

function finishCooking() {
  setText("cookingContent", "✨ Your meal is ready! Beautifully prepared!");

  const serveButton = getElement("serveMealBtn");
  if (serveButton) serveButton.disabled = false;

  setText("orderFeedback", "Your dish is ready. Serve it to your customer!");

  guideSay("It looks delicious! Your meal is ready. Now tap Serve Customer!", "Meal Ready!");
}

/* ---------- SERVE CUSTOMER ---------- */

function serveMeal() {
  if (!currentOrder) return;

  if (cookingStepIndex < currentOrder.recipe.steps.length) {
    showToast("Complete all cooking steps first!");
    return;
  }

  clearInterval(orderTimer);

  const completedRecipe = currentOrder.recipe;
  const customerName = currentOrder.customer.name;

  game.coins += completedRecipe.reward;
  game.reputation += 1;
  game.happyCustomers += 1;
  game.completedOrders += 1;

  if (!game.completedRecipes.includes(completedRecipe.id)) {
    game.completedRecipes.push(completedRecipe.id);
  }

  const history = getElement("orderHistory");
  if (history) {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <span>🍽️ ${completedRecipe.name} — ${customerName}</span>
      <strong>+${completedRecipe.reward} coins</strong>
    `;

    if (history.textContent.includes("No completed orders yet.")) {
      history.innerHTML = "";
    }

    history.prepend(item);
  }

  setText("orderFeedback", `🎉 ${customerName} loved your meal!`);
  showToast(`+${completedRecipe.reward} coins and +${completedRecipe.xp} XP!`);

  updateInterface();
  addXP(completedRecipe.xp);
  checkAchievements();

  currentOrder = null;
  selectedIngredients = [];
  cookingStepIndex = 0;

  disableKitchen();

  const area = getElement("customerArea");
  if (area) {
    area.innerHTML = `
      <div class="empty-state">
        💗
        <h3>Happy Customer!</h3>
        <p>${customerName} loved your ${completedRecipe.name}!</p>
      </div>
    `;
  }

  setText("orderName", "Order completed!");
  setText("orderDescription", "Your customer is happy. A new order is coming soon!");
  setText("orderTimer", "✓");
  setText("customerMood", "😊 Customer satisfied!");

  guideSay(
    `Amazing job, chef! ${customerName} loved your ${completedRecipe.name}. You earned ${completedRecipe.reward} coins!`,
    "Wonderful Work!"
  );

  setTimeout(() => {
    if (restaurantOpen && !currentOrder) {
      createCustomerOrder();
    }
  }, 3500);
}

function disableKitchen() {
  const prepareButton = getElement("prepareMealBtn");
  const serveButton = getElement("serveMealBtn");

  if (prepareButton) prepareButton.disabled = true;
  if (serveButton) serveButton.disabled = true;

  const grid = getElement("ingredientGrid");
  if (grid) grid.innerHTML = "<p>Waiting for the next order...</p>";

  setText("selectedIngredients", "No ingredients selected.");
  setText("cookingContent", "Waiting for your next cooking adventure!");
  setText("cookingSteps", "");
}

/* ---------- RECIPE ACADEMY ---------- */

function renderRecipes() {
  const grid = getElement("recipeGrid");
  if (!grid) return;

  grid.innerHTML = "";

  recipes.forEach(recipe => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <p>⭐ ${recipe.xp} XP • 💰 ${recipe.reward} coins</p>
      <button class="primary-btn" type="button">View Recipe</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      viewRecipe(recipe.id);
    });

    grid.appendChild(card);
  });
}

function viewRecipe(recipeId) {
  const recipe = recipes.find(item => item.id === recipeId);
  if (!recipe) return;

  const grid = getElement("recipeGrid");
  if (!grid) return;

  const ingredientNames = recipe.ingredients
    .map(id => ingredients.find(item => item.id === id)?.name)
    .filter(Boolean);

  grid.innerHTML = `
    <article class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <h4>Ingredients</h4>
      <p>${ingredientNames.join(" • ")}</p>
      <h4>Cooking Instructions</h4>
      <ol>${recipe.steps.map(step => `<li>${step}</li>`).join("")}</ol>
      <button class="primary-btn" onclick="renderRecipes()">← Back to Recipes</button>
    </article>
  `;

  guideSay(`Let's learn about ${recipe.name}! You can find its ingredients and cooking instructions here.`, "Recipe Lesson");
}

/* ---------- ANIME CHARACTERS ---------- */

function renderCharacters() {
  const grid = getElement("characterGrid");
  if (!grid) return;

  grid.innerHTML = "";

  characters.forEach(character => {
    const card = document.createElement("article");
    card.className = "character-card";

    card.innerHTML = `
      <div class="character-avatar">${character.emoji}</div>
      <h3>${character.name}</h3>
      <p><strong>${character.role}</strong></p>
      <p>${character.description}</p>
      <button type="button">${game.selectedCharacter === character.name ? "Selected ✓" : "Choose Character"}</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      game.selectedCharacter = character.name;
      renderCharacters();
      saveGame();
      showToast(`${character.name} is now your companion!`);
    });

    grid.appendChild(card);
  });
}

/* ---------- MISSIONS ---------- */

function renderMissions() {
  const list = getElement("missionList");
  if (!list) return;

  const missions = [
    {
      id: "first-order",
      title: "First Customer",
      description: "Complete your first restaurant order.",
      reward: 30,
      done: game.completedOrders >= 1
    },
    {
      id: "three-orders",
      title: "Busy Restaurant",
      description: "Complete 3 customer orders.",
      reward: 60,
      done: game.completedOrders >= 3
    },
    {
      id: "five-happy",
      title: "Customer Favorite",
      description: "Make 5 customers happy.",
      reward: 80,
      done: game.happyCustomers >= 5
    },
    {
      id: "three-recipes",
      title: "Recipe Explorer",
      description: "Prepare 3 different recipes.",
      reward: 75,
      done: game.completedRecipes.length >= 3
    }
  ];

  list.innerHTML = "";

  missions.forEach(mission => {
    const claimed = game.claimedMissions.includes(mission.id);

    const card = document.createElement("div");
    card.className = "mission-card";

    card.innerHTML = `
      <h3>${mission.done ? "✅" : "🎯"} ${mission.title}</h3>
      <p>${mission.description}</p>
      <p>Reward: 💰 ${mission.reward} coins</p>
      <button class="primary-btn" ${!mission.done || claimed ? "disabled" : ""}>
        ${claimed ? "Reward Claimed ✓" : mission.done ? "Claim Reward" : "In Progress"}
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      claimMission(mission);
    });

    list.appendChild(card);
  });
}

function claimMission(mission) {
  if (game.claimedMissions.includes(mission.id)) return;

  game.claimedMissions.push(mission.id);
  game.coins += mission.reward;

  updateInterface();
  showToast(`Mission completed! +${mission.reward} coins!`);
  guideSay("You completed a mission! Keep going, chef. You're building an amazing restaurant!", "Mission Complete!");
}

/* ---------- ACHIEVEMENTS ---------- */

function renderAchievements() {
  const list = getElement("achievementList");
  if (!list) return;

  const achievements = [
    {
      id: "starter",
      icon: "🍳",
      title: "First Steps",
      description: "Complete your first order.",
      unlocked: game.completedOrders >= 1
    },
    {
      id: "chef",
      icon: "👩‍🍳",
      title: "Growing Chef",
      description: "Reach Level 3.",
      unlocked: game.level >= 3
    },
    {
      id: "popular",
      icon: "💗",
      title: "Customer Favorite",
      description: "Make 5 customers happy.",
      unlocked: game.happyCustomers >= 5
    },
    {
      id: "explorer",
      icon: "📖",
      title: "Recipe Explorer",
      description: "Cook 3 different recipes.",
      unlocked: game.completedRecipes.length >= 3
    },
    {
      id: "puzzle",
      icon: "🧩",
      title: "Puzzle Master",
      description: "Win a food puzzle.",
      unlocked: game.puzzleWins >= 1
    }
  ];

  list.innerHTML = "";

  achievements.forEach(item => {
    const card = document.createElement("article");
    card.className = "achievement-card";

    card.innerHTML = `
      <span>${item.unlocked ? item.icon : "🔒"}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <strong>${item.unlocked ? "UNLOCKED ✓" : "LOCKED"}</strong>
    `;

    list.appendChild(card);
  });
}

function checkAchievements() {
  renderAchievements();
}

/* ---------- FOOD QUIZ ---------- */

const quizQuestions = [
  {
    question: "Which ingredient is commonly used to make pesto?",
    answers: ["Basil", "Chocolate", "Strawberry"],
    correct: 0
  },
  {
    question: "Which country is famous for sushi?",
    answers: ["Italy", "Japan", "France"],
    correct: 1
  },
  {
    question: "Which ingredient helps bread dough rise?",
    answers: ["Yeast", "Lettuce", "Cucumber"],
    correct: 0
  },
  {
    question: "Which ingredient is essential for a classic Margherita pizza?",
    answers: ["Mozzarella", "Avocado", "Yogurt"],
    correct: 0
  }
];

function startQuiz() {
  const area = getElement("puzzleGame");
  if (!area) return;

  const question = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];

  area.innerHTML = `
    <h3>🧠 Food Quiz</h3>
    <p>${question.question}</p>
    <div class="quiz-answers">
      ${question.answers.map((answer, index) =>
        `<button class="primary-btn" onclick="answerQuiz(${index},${question.correct})">${answer}</button>`
      ).join("")}
    </div>
  `;

  guideSay("Choose the correct answer! Let's see what you've learned about food.", "Food Quiz");
}

function answerQuiz(answer, correct) {
  const area = getElement("puzzleGame");
  if (!area) return;

  if (answer === correct) {
    area.innerHTML = "<h3>🎉 Correct Answer!</h3><p>You're becoming a food expert!</p><button class='primary-btn' onclick='startQuiz()'>Play Again</button>";
    game.puzzleWins++;
    game.coins += 15;
    addXP(15);
    updateInterface();
    guideSay("That's correct! You're so clever, chef!", "Amazing!");
  } else {
    area.innerHTML = "<h3>💗 Not quite!</h3><p>Try another question and keep learning.</p><button class='primary-btn' onclick='startQuiz()'>Try Again</button>";
    guideSay("Don't worry! Learning is part of the adventure. Try again!", "Keep Going!");
  }
}

/* ---------- MEMORY PUZZLE ---------- */

function startMemory() {
  const area = getElement("puzzleGame");
  if (!area) return;

  const pairs = ["🍓", "🥑", "🍅", "🥕"];
  puzzleMemoryCards = shuffleArray([...pairs, ...pairs]);
  memoryFirstCard = null;
  memoryLocked = false;

  area.innerHTML = `
    <h3>🍓 Food Memory</h3>
    <p>Find all matching ingredient pairs!</p>
    <div class="memory-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:15px;">
      ${puzzleMemoryCards.map((emoji, index) =>
        `<button class="memory-card" data-index="${index}" data-value="${emoji}" style="font-size:27px;min-height:65px;border-radius:13px;background:#f1eaff;">❔</button>`
      ).join("")}
    </div>
    <p id="memoryStatus">Find the matching pairs.</p>
  `;

  area.querySelectorAll(".memory-card").forEach(card => {
    card.addEventListener("click", () => flipMemoryCard(card));
  });

  guideSay("Let's test your memory! Find two matching food ingredients.", "Memory Challenge");
}

function flipMemoryCard(card) {
  if (memoryLocked || card.dataset.matched === "true" || card.textContent !== "❔") return;

  card.textContent = card.dataset.value;

  if (!memoryFirstCard) {
    memoryFirstCard = card;
    return;
  }

  if (memoryFirstCard.dataset.value === card.dataset.value) {
    memoryFirstCard.dataset.matched = "true";
    card.dataset.matched = "true";
    memoryFirstCard = null;

    const remaining = document.querySelectorAll(".memory-card:not([data-matched='true'])");

    if (remaining.length === 0) {
      setText("memoryStatus", "🎉 You matched every ingredient!");
      game.puzzleWins++;
      game.coins += 20;
      addXP(20);
      updateInterface();
      guideSay("You found every pair! What a wonderful memory!", "Puzzle Completed!");
    }
  } else {
    memoryLocked = true;
    const first = memoryFirstCard;
    memoryFirstCard = null;

    setTimeout(() => {
      first.textContent = "❔";
      card.textContent = "❔";
      memoryLocked = false;
    }, 800);
  }
}

/* ---------- RECIPE ORDER PUZZLE ---------- */

function startOrderPuzzle() {
  const area = getElement("puzzleGame");
  if (!area) return;

  const recipe = recipes[Math.floor(Math.random() * recipes.length)];
  const shuffled = shuffleArray(recipe.steps);
  let selected = [];

  function drawPuzzle() {
    area.innerHTML = `
      <h3>👩‍🍳 Recipe Order Challenge</h3>
      <p>Arrange the cooking steps in the correct order for ${recipe.name}.</p>
      <div id="recipeStepOptions"></div>
      <p id="recipeStepProgress">Selected: ${selected.length} / ${recipe.steps.length}</p>
    `;

    const options = getElement("recipeStepOptions");

    shuffled.forEach(step => {
      if (selected.includes(step)) return;

      const button = document.createElement("button");
      button.className = "primary-btn";
      button.style.margin = "5px 0";
      button.textContent = step;

      button.addEventListener("click", () => {
        selected.push(step);

        if (step !== recipe.steps[selected.length - 1]) {
          area.innerHTML = `
            <h3>Almost there!</h3>
            <p>That step was not in the right position. Try the challenge again.</p>
            <button class="primary-btn" onclick="startOrderPuzzle()">Try Again</button>
          `;
          return;
        }

        if (selected.length === recipe.steps.length) {
          area.innerHTML = `
            <h3>🎉 Perfect Order!</h3>
            <p>You arranged all the cooking steps correctly!</p>
            <button class="primary-btn" onclick="startOrderPuzzle()">Play Again</button>
          `;

          game.puzzleWins++;
          game.coins += 20;
          addXP(20);
          updateInterface();
          guideSay("Perfect! You know exactly how to prepare this recipe!", "Fantastic Chef!");
          return;
        }

        drawPuzzle();
      });

      options.appendChild(button);
    });
  }

  drawPuzzle();
  guideSay("Put the cooking instructions in the correct order. You can do it!", "Recipe Challenge");
}

/* ---------- MIKA ANIME GUIDE ---------- */

const mikaIntroMessages = [
  {
    title: "Welcome, Chef!",
    message: "Hi! I'm Mika, your cooking guide. Welcome to Freshopia! I'm so excited to start this adventure with you!",
    button: "Next →"
  },
  {
    title: "Your Mission",
    message: "Your goal is to build a successful restaurant. Welcome customers, prepare their orders and earn rewards!",
    button: "Next →"
  },
  {
    title: "Choose Ingredients",
    message: "Every recipe needs the correct ingredients. Select them carefully before preparing your meal!",
    button: "Next →"
  },
  {
    title: "Let's Start Cooking!",
    message: "Follow the cooking instructions one by one. When your meal is ready, serve your customer!",
    button: "Start Playing! 💗"
  }
];

let mikaIntroIndex = 0;
let mikaTimer = null;

function guideSay(message, title = "Mika's Tip") {
  const bubble = getElement("mikaBubble");
  const character = getElement("mikaAssistant");

  if (!bubble || !character) return;

  setText("mikaTitle", title);
  setText("mikaMessage", message);

  bubble.style.display = "block";
  character.classList.remove("hidden");

  clearTimeout(mikaTimer);

  mikaTimer = setTimeout(() => {
    bubble.style.display = "none";
  }, 12000);
}

function mikaNext() {
  if (mikaIntroIndex < mikaIntroMessages.length) {
    const item = mikaIntroMessages[mikaIntroIndex];

    setText("mikaTitle", item.title);
    setText("mikaMessage", item.message);
    setText("mikaNext", item.button);

    mikaIntroIndex++;

    if (mikaIntroIndex === mikaIntroMessages.length) {
      const button = getElement("mikaNext");
      if (button) button.textContent = "Let's Play! 💗";
    }
  } else {
    closeMika();
    showSection("restaurant");
  }

  const bubble = getElement("mikaBubble");
  if (bubble) bubble.style.display = "block";

  clearTimeout(mikaTimer);
}

function toggleMika() {
  const bubble = getElement("mikaBubble");
  if (!bubble) return;

  if (bubble.style.display === "none") {
    guideSay("Hi, chef! Need some help? I'm always here for you!", "Mika is Here!");
  } else {
    closeMika();
  }
}

function closeMika() {
  const bubble = getElement("mikaBubble");
  if (bubble) bubble.style.display = "none";
  clearTimeout(mikaTimer);
}

function startMikaIntroduction() {
  mikaIntroIndex = 0;

  const bubble = getElement("mikaBubble");
  if (bubble) bubble.style.display = "block";

  const first = mikaIntroMessages[0];

  setText("mikaTitle", first.title);
  setText("mikaMessage", first.message);
  setText("mikaNext", first.button);

  mikaIntroIndex = 1;
}

/* ---------- INITIALIZATION ---------- */

function initializeGame() {
  updateInterface();
  renderRecipes();
  renderCharacters();
  renderMissions();
  renderAchievements();

  setText("orderTimer", "--:--");

  const cookingArea = getElement("cookingContent");
  if (cookingArea) {
    cookingArea.textContent = "Your kitchen is ready!";
  }

  startMikaIntroduction();
}

document.addEventListener("DOMContentLoaded", initializeGame);
