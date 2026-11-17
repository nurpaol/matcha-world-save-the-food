<script src="characters.js" defer></script>
<script src="script.js" defer></script>/* =========================================================
   FRESHOPIA — PROFESSIONAL GAME ENGINE 3.0
   Anime Cooking Adventure + Restaurant Simulator
========================================================= */

"use strict";

/* =========================================================
   1. GAME CONFIGURATION
========================================================= */

const GAME_KEY = "freshopiaProfessional6";

const $ = id => document.getElementById(id);

const moneyFormat = value =>
  "$" + Number(value || 0).toFixed(2);

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

const escapeHTML = value =>
  String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);

const imageURL = (id, width = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;


/* =========================================================
   2. ANIME CHARACTER DATA
========================================================= */

const avatarOptions = [
  {
    id: "sakura",
    name: "Sakura",
    emoji: "👩🏻‍🍳",
    description: "Creative and cheerful chef",
    color: "#f5dce7"
  },
  {
    id: "hana",
    name: "Hana",
    emoji: "👩🏼‍🍳",
    description: "Master of fresh ingredients",
    color: "#e5ead7"
  },
  {
    id: "yuki",
    name: "Yuki",
    emoji: "👩🏽‍🍳",
    description: "Expert in elegant cuisine",
    color: "#e6def6"
  },
  {
    id: "mika",
    name: "Mika",
    emoji: "👩🏻‍🍳",
    description: "Sustainable cooking specialist",
    color: "#f7e8d3"
  }
];


/* =========================================================
   3. INGREDIENT DATABASE
========================================================= */

const ingredientData = [
  {
    id: "tomato",
    name: "Fresh Tomatoes",
    category: "vegetable",
    unit: "kg",
    price: 3.5,
    stock: 12,
    freshness: 5,
    image: "photo-1546094096-0df4bcaaa337",
    description: "Juicy locally sourced tomatoes.",
    quality: "Local"
  },
  {
    id: "lettuce",
    name: "Organic Lettuce",
    category: "vegetable",
    unit: "kg",
    price: 4,
    stock: 10,
    freshness: 4,
    image: "photo-1556801712-76c8eb07bbc9",
    description: "Fresh green lettuce leaves.",
    quality: "Organic"
  },
  {
    id: "carrot",
    name: "Fresh Carrots",
    category: "vegetable",
    unit: "kg",
    price: 2.8,
    stock: 10,
    freshness: 5,
    image: "photo-1445282768818-728615cc910a",
    description: "Sweet and crunchy carrots.",
    quality: "Local"
  },
  {
    id: "potato",
    name: "Potatoes",
    category: "vegetable",
    unit: "kg",
    price: 2.5,
    stock: 15,
    freshness: 6,
    image: "photo-1518977676601-b53f82aba655",
    description: "Versatile fresh potatoes.",
    quality: "Local"
  },
  {
    id: "onion",
    name: "Red Onions",
    category: "vegetable",
    unit: "kg",
    price: 2.2,
    stock: 10,
    freshness: 7,
    image: "photo-1518977676601-b53f82aba655",
    description: "Aromatic red onions.",
    quality: "Local"
  },
  {
    id: "spinach",
    name: "Baby Spinach",
    category: "vegetable",
    unit: "kg",
    price: 4.5,
    stock: 7,
    freshness: 3,
    image: "photo-1576045057995-568f588f82fb",
    description: "Tender baby spinach leaves.",
    quality: "Organic"
  },
  {
    id: "broccoli",
    name: "Fresh Broccoli",
    category: "vegetable",
    unit: "kg",
    price: 4.2,
    stock: 7,
    freshness: 4,
    image: "photo-1459411621453-7b03977f4bfc",
    description: "Nutrient-rich green broccoli.",
    quality: "Organic"
  },
  {
    id: "lemon",
    name: "Fresh Lemons",
    category: "fruit",
    unit: "kg",
    price: 3,
    stock: 8,
    freshness: 7,
    image: "photo-1518736114810-3f3bedfec66a",
    description: "Bright citrus lemons.",
    quality: "Local"
  },
  {
    id: "strawberry",
    name: "Strawberries",
    category: "fruit",
    unit: "kg",
    price: 6,
    stock: 5,
    freshness: 3,
    image: "photo-1464965911861-746a04b4bca6",
    description: "Sweet seasonal strawberries.",
    quality: "Seasonal"
  },
  {
    id: "apple",
    name: "Green Apples",
    category: "fruit",
    unit: "kg",
    price: 3.8,
    stock: 8,
    freshness: 7,
    image: "photo-1560806887-1e4cd0b6cbd6",
    description: "Crisp green apples.",
    quality: "Local"
  },
  {
    id: "milk",
    name: "Fresh Milk",
    category: "dairy",
    unit: "L",
    price: 2.5,
    stock: 10,
    freshness: 4,
    image: "photo-1563636619-e9143da7973b",
    description: "Fresh dairy milk.",
    quality: "Fresh"
  },
  {
    id: "cheese",
    name: "Mozzarella Cheese",
    category: "dairy",
    unit: "kg",
    price: 8,
    stock: 5,
    freshness: 5,
    image: "photo-1486297678162-eb2a19b0a32d",
    description: "Creamy mozzarella cheese.",
    quality: "Fresh"
  },
  {
    id: "egg",
    name: "Free Range Eggs",
    category: "other",
    unit: "pcs",
    price: 0.5,
    stock: 30,
    freshness: 10,
    image: "photo-1506976785307-8732e854ad03",
    description: "Farm fresh free-range eggs.",
    quality: "Organic"
  },
  {
    id: "chicken",
    name: "Chicken Breast",
    category: "protein",
    unit: "kg",
    price: 9,
    stock: 6,
    freshness: 3,
    image: "photo-1604503468506-a8da13d82791",
    description: "Fresh lean chicken breast.",
    quality: "Fresh"
  },
  {
    id: "salmon",
    name: "Fresh Salmon",
    category: "protein",
    unit: "kg",
    price: 17,
    stock: 3,
    freshness: 2,
    image: "photo-1467003909585-2f8a72700288",
    description: "Premium fresh salmon.",
    quality: "Premium"
  },
  {
    id: "rice",
    name: "Basmati Rice",
    category: "grain",
    unit: "kg",
    price: 3.2,
    stock: 12,
    freshness: 30,
    image: "photo-1586201375761-83865001e31c",
    description: "Long-grain aromatic rice.",
    quality: "Pantry"
  },
  {
    id: "pasta",
    name: "Italian Pasta",
    category: "grain",
    unit: "kg",
    price: 3.5,
    stock: 10,
    freshness: 30,
    image: "photo-1551462147-ff29053bfc14",
    description: "Traditional Italian pasta.",
    quality: "Pantry"
  },
  {
    id: "flour",
    name: "Wheat Flour",
    category: "grain",
    unit: "kg",
    price: 2,
    stock: 10,
    freshness: 30,
    image: "photo-1627485937980-221c88ac04f9",
    description: "Fine baking flour.",
    quality: "Pantry"
  },
  {
    id: "oliveoil",
    name: "Extra Virgin Olive Oil",
    category: "other",
    unit: "L",
    price: 9,
    stock: 5,
    freshness: 90,
    image: "photo-1474979266404-7eaacbcd87c5",
    description: "Cold-pressed olive oil.",
    quality: "Premium"
  },
  {
    id: "mushroom",
    name: "Fresh Mushrooms",
    category: "vegetable",
    unit: "kg",
    price: 6,
    stock: 5,
    freshness: 3,
    image: "photo-1504545102780-26774c1bb073",
    description: "Fresh earthy mushrooms.",
    quality: "Fresh"
  }
];


/* =========================================================
   4. RECIPE DATABASE
========================================================= */

const recipeData = [
  {
    id: "garden-salad",
    name: "Fresh Garden Salad",
    category: "Healthy",
    difficulty: "Easy",
    time: 8,
    price: 16,
    xp: 30,
    image: "photo-1512621776951-a57141f2eefd",
    description: "A colorful salad made with fresh seasonal vegetables.",
    ingredients: {
      tomato: 1,
      lettuce: 1,
      carrot: 1,
      lemon: 0.2,
      oliveoil: 0.1
    }
  },
  {
    id: "tomato-pasta",
    name: "Mediterranean Tomato Pasta",
    category: "Main Course",
    difficulty: "Easy",
    time: 15,
    price: 22,
    xp: 40,
    image: "photo-1473093295043-cdd812d0e601",
    description: "Italian pasta with fresh tomatoes and olive oil.",
    ingredients: {
      pasta: 1,
      tomato: 2,
      oliveoil: 0.2,
      onion: 0.3
    }
  },
  {
    id: "chicken-bowl",
    name: "Healthy Chicken Bowl",
    category: "Healthy",
    difficulty: "Medium",
    time: 20,
    price: 28,
    xp: 55,
    image: "photo-1547592180-85f173990554",
    description: "A balanced bowl with chicken, rice and vegetables.",
    ingredients: {
      chicken: 0.25,
      rice: 0.2,
      carrot: 0.2,
      broccoli: 0.2
    }
  },
  {
    id: "salmon-plate",
    name: "Premium Salmon Plate",
    category: "Premium",
    difficulty: "Hard",
    time: 25,
    price: 42,
    xp: 85,
    image: "photo-1467003909585-2f8a72700288",
    description: "A premium salmon dish with fresh vegetables.",
    ingredients: {
      salmon: 0.25,
      potato: 0.3,
      lemon: 0.2,
      oliveoil: 0.1
    }
  },
  {
    id: "mushroom-risotto",
    name: "Creamy Mushroom Risotto",
    category: "Main Course",
    difficulty: "Medium",
    time: 25,
    price: 30,
    xp: 65,
    image: "photo-1476124369491-e7addf5db371",
    description: "Creamy rice with fresh mushrooms.",
    ingredients: {
      rice: 0.3,
      mushroom: 0.25,
      cheese: 0.1,
      onion: 0.2
    }
  },
  {
    id: "strawberry-dessert",
    name: "Strawberry Dessert",
    category: "Dessert",
    difficulty: "Easy",
    time: 12,
    price: 19,
    xp: 45,
    image: "photo-1464305795204-6f5bbfc7fb81",
    description: "A delicate seasonal strawberry dessert.",
    ingredients: {
      strawberry: 0.3,
      milk: 0.2,
      flour: 0.1,
      egg: 1
    }
  }
];


/* =========================================================
   5. SUPPLIERS
========================================================= */

const suppliers = [
  {
    id: "green-farm",
    name: "Green Farm",
    type: "Organic Vegetables",
    icon: "🌱",
    description: "Local organic vegetables and seasonal produce.",
    discount: 5
  },
  {
    id: "fresh-market",
    name: "Fresh Market",
    type: "Fresh Produce",
    icon: "🥬",
    description: "Daily fresh fruit and vegetable deliveries.",
    discount: 0
  },
  {
    id: "dairy-house",
    name: "Dairy House",
    type: "Dairy Products",
    icon: "🥛",
    description: "Fresh milk, cheese and dairy products.",
    discount: 3
  },
  {
    id: "ocean-foods",
    name: "Ocean Foods",
    type: "Seafood",
    icon: "🐟",
    description: "Premium seafood and fresh fish.",
    discount: 2
  }
];


/* =========================================================
   6. DEFAULT PLAYER DATA
========================================================= */

function createDefaultPlayer() {
  return {
    nickname: "Fresh Chef",
    avatar: "sakura",
    level: 1,
    xp: 0,
    money: 500,
    day: 1,
    totalOrders: 0,
    totalCooked: 0,
    totalRevenue: 0,
    totalSpent: 0,
    wasteReduced: 0,
    sustainability: 50,
    reputation: 50,
    inventory: ingredientData.map(item => ({
      id: item.id,
      quantity: item.stock,
      freshness: item.freshness
    })),
    completedAchievements: [],
    completedObjectives: [],
    orders: [],
    activities: [],
    customIngredients: [],
    finance: {
      revenue: 0,
      expenses: 0,
      profit: 0
    }
  };
}

function loadPlayer() {
  try {
    const saved = localStorage.getItem(GAME_KEY);
    if (!saved) return createDefaultPlayer();

    const parsed = JSON.parse(saved);
    const defaults = createDefaultPlayer();

    return {
      ...defaults,
      ...parsed,
      finance: {
        ...defaults.finance,
        ...(parsed.finance || {})
      },
      inventory: Array.isArray(parsed.inventory)
        ? parsed.inventory
        : defaults.inventory,
      orders: Array.isArray(parsed.orders)
        ? parsed.orders
        : [],
      activities: Array.isArray(parsed.activities)
        ? parsed.activities
        : [],
      completedAchievements: Array.isArray(parsed.completedAchievements)
        ? parsed.completedAchievements
        : [],
      completedObjectives: Array.isArray(parsed.completedObjectives)
        ? parsed.completedObjectives
        : [],
      customIngredients: Array.isArray(parsed.customIngredients)
        ? parsed.customIngredients
        : []
    };
  } catch (error) {
    console.error("Save data could not be loaded:", error);
    return createDefaultPlayer();
  }
}

let player = loadPlayer();

let selectedRecipe = null;
let selectedIngredients = [];
let currentFilter = "all";

function saveGame() {
  try {
    localStorage.setItem(GAME_KEY, JSON.stringify(player));
  } catch (error) {
    console.error("Save failed:", error);
    notify("Unable to save game progress.", "error");
  }
}


/* =========================================================
   7. DATA HELPERS
========================================================= */

function allIngredients() {
  return [...ingredientData, ...player.customIngredients];
}

function getIngredient(id) {
  return allIngredients().find(item => item.id === id);
}

function getStock(id) {
  const item = player.inventory.find(entry => entry.id === id);
  return item ? Number(item.quantity) : 0;
}

function changeStock(id, amount) {
  let item = player.inventory.find(entry => entry.id === id);

  if (!item) {
    item = { id, quantity: 0, freshness: 5 };
    player.inventory.push(item);
  }

  item.quantity = Math.max(0, Number(item.quantity) + amount);
}

function ingredientCost(id, quantity) {
  const ingredient = getIngredient(id);
  return ingredient ? ingredient.price * quantity : 0;
}

function addActivity(message, icon = "🌿") {
  player.activities.unshift({
    message,
    icon,
    day: player.day
  });

  player.activities = player.activities.slice(0, 20);
}

function notify(message, type = "success") {
  const container = $("notification-container");
  if (!container) return;

  const element = document.createElement("div");
  element.className = "notification";
  element.textContent = message;

  if (type === "error") {
    element.style.background = "#a94d4d";
  }

  container.appendChild(element);

  setTimeout(() => element.remove(), 3200);
}


/* =========================================================
   8. LEVEL AND EXPERIENCE SYSTEM
========================================================= */

function xpRequired(level) {
  return 100 + (level - 1) * 60;
}

function addXP(amount) {
  player.xp += amount;

  let leveledUp = false;

  while (player.xp >= xpRequired(player.level)) {
    player.xp -= xpRequired(player.level);
    player.level++;
    player.money += 100;
    leveledUp = true;
  }

  if (leveledUp) {
    showLevelUp();
    addActivity(`Reached level ${player.level}!`, "⭐");
  }

  saveGame();
}

function showLevelUp() {
  const overlay = document.createElement("div");
  overlay.className = "level-up-overlay";

  const avatar = avatarOptions.find(
    item => item.id === player.avatar
  ) || avatarOptions[0];

  overlay.innerHTML = `
    <div class="level-up-content">
      <div style="font-size:55px;">✨🏆✨</div>
      <h2>LEVEL UP!</h2>
      <img alt="Anime chef" src="${avatarEmojiImage(avatar.emoji)}">
      <h3>Congratulations, ${escapeHTML(player.nickname)}!</h3>
      <p>You reached Level ${player.level}!</p>
      <p>Reward: $100</p>
      <br>
      <button class="secondary-btn" id="level-up-close">
        Continue Adventure
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  $("level-up-close").addEventListener("click", () => {
    overlay.remove();
  });
}

function avatarEmojiImage(emoji) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
      <rect width="180" height="180" rx="90" fill="#f5e4ed"/>
      <text x="50%" y="58%" font-size="100" text-anchor="middle">${emoji}</text>
    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg);
}


/* =========================================================
   9. INGREDIENT INVENTORY
========================================================= */

function renderInventory() {
  const container = $("inventory-list");
  if (!container) return;

  const search = ($("inventory-search")?.value || "")
    .toLowerCase();

  const category = $("inventory-category")?.value || "all";

  const items = allIngredients().filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search);
    const matchesCategory =
      category === "all" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  const total = player.inventory.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const low = player.inventory.filter(
    item => item.quantity > 0 && item.quantity <= 3
  ).length;

  const value = player.inventory.reduce((sum, entry) => {
    return sum + ingredientCost(entry.id, entry.quantity);
  }, 0);

  if ($("inventory-total")) $("inventory-total").textContent =
    player.inventory.length;

  if ($("inventory-fresh")) $("inventory-fresh").textContent =
    total.toFixed(1);

  if ($("inventory-low")) $("inventory-low").textContent = low;

  if ($("inventory-value")) $("inventory-value").textContent =
    moneyFormat(value);

  if ($("inventory-summary")) {
    $("inventory-summary").innerHTML = `
      <p style="margin-bottom:16px;color:var(--muted);font-size:12px;">
        Total stock quantity: ${total.toFixed(1)}
      </p>
    `;
  }

  container.innerHTML = items.map(item => {
    const quantity = getStock(item.id);
    const status = quantity <= 3 ? "Low Stock" : "Available";

    return `
      <article class="ingredient-card">
        <img
          src="${imageURL(item.image, 450)}"
          alt="${escapeHTML(item.name)}"
          loading="lazy"
        >

        <div class="ingredient-info">
          <h4>${escapeHTML(item.name)}</h4>
          <p>${escapeHTML(item.description)}</p>

          <p class="ingredient-price">
            ${moneyFormat(item.price)} / ${escapeHTML(item.unit)}
          </p>

          <span class="stock-badge ${quantity <= 3 ? "stock-low" : ""}">
            ${status}: ${quantity.toFixed(1)} ${escapeHTML(item.unit)}
          </span>

          <br><br>

          <button class="primary-btn"
            data-buy="${escapeHTML(item.id)}">
            Buy Stock
          </button>
        </div>
      </article>
    `;
  }).join("") || `<div class="empty-state">No ingredients found.</div>`;
}

function buyIngredient(id, amount = 5) {
  const item = getIngredient(id);
  if (!item) return;

  const cost = item.price * amount;

  if (player.money < cost) {
    notify("Not enough money!", "error");
    return;
  }

  player.money -= cost;
  player.totalSpent += cost;
  player.finance.expenses += cost;

  changeStock(id, amount);

  addActivity(`Purchased ${amount} ${item.unit} of ${item.name}.`, "🛒");

  saveGame();
  renderAll();
  notify(`${item.name} added to inventory!`);
}


/* =========================================================
   10. ADD CUSTOM INGREDIENT
========================================================= */

function openAddIngredientModal() {
  const modal = $("modal-container");
  const body = $("modal-body");

  if (!modal || !body) return;

  body.innerHTML = `
    <h2 style="font-family:'Playfair Display',serif;margin-bottom:18px;">
      Add New Ingredient
    </h2>

    <div class="form-group">
      <label>Ingredient Name</label>
      <input id="new-ingredient-name" placeholder="Example: Fresh Basil">
    </div>

    <div class="form-group">
      <label>Category</label>
      <select id="new-ingredient-category">
        <option value="vegetable">Vegetable</option>
        <option value="fruit">Fruit</option>
        <option value="dairy">Dairy</option>
        <option value="protein">Protein</option>
        <option value="grain">Grain</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div class="form-group">
      <label>Unit Price ($)</label>
      <input id="new-ingredient-price" type="number" min="0.01" step="0.01" value="3">
    </div>

    <div class="form-group">
      <label>Initial Quantity</label>
      <input id="new-ingredient-quantity" type="number" min="0" value="5">
    </div>

    <div class="form-group">
      <label>Unit</label>
      <select id="new-ingredient-unit">
        <option value="kg">kg</option>
        <option value="L">L</option>
        <option value="pcs">pcs</option>
      </select>
    </div>

    <div style="display:flex;gap:10px;">
      <button class="primary-btn" id="save-new-ingredient">
        Add Ingredient
      </button>
      <button class="secondary-btn" onclick="closeModal()">
        Cancel
      </button>
    </div>
  `;

  modal.classList.add("active");

  $("save-new-ingredient").addEventListener("click", addNewIngredient);
}

function addNewIngredient() {
  const name = $("new-ingredient-name")?.value.trim();
  const category = $("new-ingredient-category")?.value;
  const price = Number($("new-ingredient-price")?.value);
  const quantity = Number($("new-ingredient-quantity")?.value);
  const unit = $("new-ingredient-unit")?.value;

  if (!name || !Number.isFinite(price) || price <= 0 ||
      !Number.isFinite(quantity) || quantity < 0) {
    notify("Please enter valid ingredient details.", "error");
    return;
  }

  const id = "custom-" + Date.now();

  player.customIngredients.push({
    id,
    name,
    category,
    price,
    unit,
    stock: 0,
    freshness: 5,
    quality: "Custom",
    image: "photo-1542838132-92c53300491e",
    description: "Custom restaurant ingredient."
  });

  player.inventory.push({
    id,
    quantity,
    freshness: 5
  });

  addActivity(`Added new ingredient: ${name}`, "🥬");

  saveGame();
  closeModal();
  renderAll();
  notify("New ingredient added!");
}

function closeModal() {
  $("modal-container")?.classList.remove("active");
}


/* =========================================================
   11. RECIPE BOOK
========================================================= */

function renderRecipes() {
  const container = $("recipe-list");
  if (!container) return;

  const search = ($("recipe-search")?.value || "")
    .toLowerCase();

  const recipes = recipeData.filter(recipe =>
    recipe.name.toLowerCase().includes(search)
  );

  container.innerHTML = recipes.map(recipe => {
    const ready = Object.entries(recipe.ingredients).every(
      ([id, quantity]) => getStock(id) >= quantity
    );

    const cost = Object.entries(recipe.ingredients).reduce(
      (sum, [id, quantity]) =>
        sum + ingredientCost(id, quantity), 0
    );

    return `
      <article class="recipe-card">
        <img
          src="${imageURL(recipe.image, 650)}"
          alt="${escapeHTML(recipe.name)}"
          loading="lazy"
        >

        <div class="recipe-content">
          <span class="category-badge">
            ${escapeHTML(recipe.category)}
          </span>

          <h3>${escapeHTML(recipe.name)}</h3>

          <p class="recipe-description">
            ${escapeHTML(recipe.description)}
          </p>

          <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span>⭐ ${recipe.xp} XP</span>
          </div>

          <p style="font-size:12px;margin:8px 0;">
            Difficulty: ${escapeHTML(recipe.difficulty)}
          </p>

          <p style="font-size:12px;color:var(--muted);">
            Cost: ${moneyFormat(cost)}
            · Price: ${moneyFormat(recipe.price)}
          </p>

          <br>

          <button
            class="${ready ? "primary-btn" : "secondary-btn"}"
            data-cook="${escapeHTML(recipe.id)}"
            ${ready ? "" : "disabled"}
          >
            ${ready ? "Cook This Dish" : "Missing Ingredients"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}


/* =========================================================
   12. COOKING SYSTEM
========================================================= */

function cookRecipe(id) {
  const recipe = recipeData.find(item => item.id === id);
  if (!recipe) return;

  const missing = Object.entries(recipe.ingredients).filter(
    ([ingredientId, quantity]) => getStock(ingredientId) < quantity
  );

  if (missing.length) {
    notify("Some ingredients are missing!", "error");
    return;
  }

  selectedRecipe = recipe;

  const station = $("cooking-station");

  if (station) {
    station.innerHTML = `
      <h3>🍳 Preparing ${escapeHTML(recipe.name)}</h3>
      <p>${escapeHTML(recipe.description)}</p>

      <div class="cooking-progress">
        <span id="cooking-progress-fill"></span>
      </div>

      <p id="cooking-status">Preparing ingredients...</p>

      <button class="primary-btn" id="finish-cooking">
        Complete Cooking
      </button>
    `;
  }

  notify("Your dish is ready to prepare!");
}

function finishCooking() {
  if (!selectedRecipe) return;

  const recipe = selectedRecipe;

  for (const [id, quantity] of Object.entries(recipe.ingredients)) {
    if (getStock(id) < quantity) {
      notify("Not enough ingredients!", "error");
      selectedRecipe = null;
      return;
    }
  }

  Object.entries(recipe.ingredients).forEach(([id, quantity]) => {
    changeStock(id, -quantity);
  });

  player.totalCooked++;

  addXP(recipe.xp);

  addActivity(`Prepared ${recipe.name}.`, "🍳");

  selectedRecipe = null;

  if ($("cooking-station")) {
    $("cooking-station").innerHTML = `
      <h3>✨ Dish Successfully Prepared!</h3>
      <p>Your ${escapeHTML(recipe.name)} is ready.</p>
      <button class="primary-btn" onclick="showPage('customers')">
        View Customer Orders
      </button>
    `;
  }

  saveGame();
  renderAll();
  checkAchievements();

  notify(`${recipe.name} prepared successfully!`);
}


/* =========================================================
   13. CUSTOMER SYSTEM
========================================================= */

const customerNames = [
  "Emma", "Oliver", "Sophia", "Lucas",
  "Mia", "Noah", "Lily", "Ethan",
  "Amelia", "Leo", "Ava", "Mason"
];

const customerEmojis = [
  "👩🏻", "👨🏻", "👩🏽", "👨🏽",
  "👩🏼", "👨🏼", "🧑🏻", "👩🏾"
];

function createOrder() {
  const available = recipeData.filter(recipe =>
    Object.entries(recipe.ingredients).every(
      ([id, quantity]) => getStock(id) >= quantity
    )
  );

  if (!available.length) {
    notify("You need more ingredients to accept an order.", "error");
    return;
  }

  const recipe = available[
    Math.floor(Math.random() * available.length)
  ];

  const name = customerNames[
    Math.floor(Math.random() * customerNames.length)
  ];

  const avatar = customerEmojis[
    Math.floor(Math.random() * customerEmojis.length)
  ];

  player.orders.push({
    id: Date.now(),
    customer: name,
    avatar,
    recipeId: recipe.id,
    status: "pending",
    day: player.day,
    price: recipe.price
  });

  addActivity(`${name} placed an order for ${recipe.name}.`, "🛎️");

  saveGame();
  renderAll();
  notify("New customer order received!");
}

function renderCustomers() {
  const area = $("customer-area");
  const orders = $("order-list");

  if (area) {
    const pending = player.orders.filter(
      order => order.status === "pending"
    );

    area.innerHTML = `
      <div class="customer-card">
        <div class="customer-avatar">😊</div>
        <h3>Customer Service</h3>
        <p>Pending orders: ${pending.length}</p>
        <br>
        <button class="primary-btn" id="new-customer-order">
          + Receive New Order
        </button>
      </div>

      <div class="customer-card">
        <div class="customer-avatar">⭐</div>
        <h3>Restaurant Reputation</h3>
        <p>${player.reputation}/100 reputation points</p>
      </div>

      <div class="customer-card">
        <div class="customer-avatar">🌿</div>
        <h3>Customer Promise</h3>
        <p>Fresh ingredients and responsible food service.</p>
      </div>
    `;
  }

  if (!orders) return;

  orders.innerHTML = player.orders.slice().reverse().map(order => {
    const recipe = recipeData.find(
      item => item.id === order.recipeId
    );

    return `
      <article class="order-card">
        <div class="customer-avatar">${order.avatar}</div>

        <h3>${escapeHTML(order.customer)}</h3>

        <p>${escapeHTML(recipe?.name || "Unknown Dish")}</p>

        <p style="margin:8px 0;">
          ${moneyFormat(order.price)}
        </p>

        <span class="order-status">
          ${escapeHTML(order.status)}
        </span>

        ${
          order.status === "pending"
            ? `<br><br>
              <button class="primary-btn" data-serve="${order.id}">
                Serve Order
              </button>`
            : ""
        }
      </article>
    `;
  }).join("") || `<div class="empty-state">No orders yet.</div>`;
}

function serveOrder(id) {
  const order = player.orders.find(
    item => item.id === Number(id)
  );

  if (!order || order.status !== "pending") return;

  const recipe = recipeData.find(
    item => item.id === order.recipeId
  );

  if (!recipe) return;

  const missing = Object.entries(recipe.ingredients).filter(
    ([ingredientId, quantity]) => getStock(ingredientId) < quantity
  );

  if (missing.length) {
    notify("Missing ingredients. Restock before serving!", "error");
    return;
  }

  Object.entries(recipe.ingredients).forEach(([ingredientId, quantity]) => {
    changeStock(ingredientId, -quantity);
  });

  order.status = "completed";

  player.money += order.price;
  player.finance.revenue += order.price;
  player.finance.profit += order.price;
  player.totalRevenue += order.price;
  player.totalOrders++;
  player.totalCooked++;

  player.reputation = clamp(player.reputation + 2, 0, 100);
  player.sustainability = clamp(player.sustainability + 1, 0, 100);
  player.wasteReduced += 1;

  addXP(recipe.xp);

  addActivity(`Served ${recipe.name} to ${order.customer}.`, "🍽️");

  saveGame();
  renderAll();
  checkAchievements();

  notify("Order completed! You earned " + moneyFormat(order.price));
}


/* =========================================================
   14. DAILY OBJECTIVES
========================================================= */

function getObjectives() {
  return [
    {
      id: "cook",
      title: "Prepare 1 delicious dish",
      description: "Cook any recipe in your kitchen.",
      icon: "🍳",
      progress: player.totalCooked > 0 ? 1 : 0,
      target: 1,
      reward: 30
    },
    {
      id: "order",
      title: "Serve a customer",
      description: "Complete one customer order.",
      icon: "🛎️",
      progress: player.totalOrders > 0 ? 1 : 0,
      target: 1,
      reward: 40
    },
    {
      id: "level",
      title: "Gain experience",
      description: "Reach at least 50 total XP.",
      icon: "⭐",
      progress: player.level > 1 || player.xp >= 50 ? 1 : 0,
      target: 1,
      reward: 25
    }
  ];
}

function renderObjectives() {
  const container = $("daily-objectives");
  if (!container) return;

  container.innerHTML = getObjectives().map(objective => {
    const completed = objective.progress >= objective.target;

    const alreadyClaimed =
      player.completedObjectives.includes(
        `${player.day}-${objective.id}`
      );

    return `
      <div class="objective-item">
        <div>
          <strong>${objective.icon} ${escapeHTML(objective.title)}</strong>
          <p style="color:var(--muted);font-size:11px;">
            ${escapeHTML(objective.description)}
          </p>
          <small>Reward: ${objective.reward} XP</small>
        </div>

        <button
          class="${completed && !alreadyClaimed ? "primary-btn" : "secondary-btn"}"
          data-objective="${objective.id}"
          ${!completed || alreadyClaimed ? "disabled" : ""}
        >
          ${alreadyClaimed ? "Claimed" : completed ? "Claim" : "In Progress"}
        </button>
      </div>
    `;
  }).join("");
}

function claimObjective(id) {
  const objective = getObjectives().find(
    item => item.id === id
  );

  if (!objective) return;

  const key = `${player.day}-${id}`;

  if (player.completedObjectives.includes(key)) return;

  if (objective.progress < objective.target) return;

  player.completedObjectives.push(key);

  addXP(objective.reward);

  saveGame();
  renderAll();

  notify("Daily reward claimed!");
}


/* =========================================================
   15. ACHIEVEMENTS
========================================================= */

const achievements = [
  {
    id: "first-cook",
    name: "First Dish",
    icon: "🍳",
    description: "Prepare your first dish.",
    condition: () => player.totalCooked >= 1
  },
  {
    id: "first-order",
    name: "First Customer",
    icon: "😊",
    description: "Serve your first customer.",
    condition: () => player.totalOrders >= 1
  },
  {
    id: "five-orders",
    name: "Popular Restaurant",
    icon: "🏆",
    description: "Serve five orders.",
    condition: () => player.totalOrders >= 5
  },
  {
    id: "ten-dishes",
    name: "Master Chef",
    icon: "👩‍🍳",
    description: "Prepare ten dishes.",
    condition: () => player.totalCooked >= 10
  },
  {
    id: "eco-chef",
    name: "Eco Warrior",
    icon: "🌍",
    description: "Reach 70 sustainability points.",
    condition: () => player.sustainability >= 70
  },
  {
    id: "level-five",
    name: "Rising Star",
    icon: "⭐",
    description: "Reach level five.",
    condition: () => player.level >= 5
  }
];

function checkAchievements() {
  achievements.forEach(achievement => {
    if (
      !player.completedAchievements.includes(achievement.id) &&
      achievement.condition()
    ) {
      player.completedAchievements.push(achievement.id);
      player.money += 50;

      addActivity(`Unlocked achievement: ${achievement.name}!`, "🏆");

      notify(`Achievement unlocked: ${achievement.name}!`);
    }
  });

  saveGame();
}

function renderAchievements() {
  const container = $("achievement-list");
  if (!container) return;

  container.innerHTML = achievements.map(item => {
    const unlocked =
      player.completedAchievements.includes(item.id);

    return `
      <div class="achievement-card ${unlocked ? "" : "locked"}">
        <div class="achievement-icon">${item.icon}</div>
        <h4>${escapeHTML(item.name)}</h4>
        <p style="font-size:11px;color:var(--muted);margin-top:6px;">
          ${escapeHTML(item.description)}
        </p>
        <br>
        <span class="stock-badge">
          ${unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>
    `;
  }).join("");
}


/* =========================================================
   16. SUPPLIERS
========================================================= */

function renderSuppliers() {
  const container = $("supplier-list");
  if (!container) return;

  container.innerHTML = suppliers.map(supplier => `
    <article class="supplier-card">
      <div style="font-size:35px;margin-bottom:12px;">
        ${supplier.icon}
      </div>

      <h3>${escapeHTML(supplier.name)}</h3>

      <p style="font-size:11px;color:var(--muted);margin:8px 0;">
        ${escapeHTML(supplier.type)}
      </p>

      <p style="font-size:12px;">
        ${escapeHTML(supplier.description)}
      </p>

      <br>

      <span class="stock-badge">
        ${supplier.discount}% discount
      </span>
    </article>
  `).join("");
}


/* =========================================================
   17. FINANCE
========================================================= */

function renderFinance() {
  const container = $("finance-dashboard");
  if (!container) return;

  const balance = player.money;
  const revenue = player.finance.revenue;
  const expenses = player.finance.expenses;
  const profit = revenue - expenses;

  container.innerHTML = `
    <div class="finance-grid">

      <div class="finance-card">
        <p>Available Balance</p>
        <strong>${moneyFormat(balance)}</strong>
      </div>

      <div class="finance-card">
        <p>Total Revenue</p>
        <strong>${moneyFormat(revenue)}</strong>
      </div>

      <div class="finance-card">
        <p>Total Expenses</p>
        <strong>${moneyFormat(expenses)}</strong>
      </div>

    </div>

    <div class="card" style="margin-top:20px;">
      <h3>Financial Performance</h3>

      <p>Net recorded result:
        <strong>${moneyFormat(profit)}</strong>
      </p>

      <p style="color:var(--muted);font-size:12px;margin-top:8px;">
        This report tracks recorded sales and ingredient purchases.
      </p>
    </div>
  `;
}


/* =========================================================
   18. SUSTAINABILITY
========================================================= */

function renderSustainability() {
  const container = $("sustainability-dashboard");
  if (!container) return;

  container.innerHTML = `
    <div class="sustainability-grid">

      <div class="sustainability-card">
        <div style="font-size:30px;">🌱</div>
        <p>Sustainability Score</p>
        <strong>${player.sustainability}/100</strong>
      </div>

      <div class="sustainability-card">
        <div style="font-size:30px;">♻️</div>
        <p>Waste Reduction Points</p>
        <strong>${player.wasteReduced}</strong>
      </div>

      <div class="sustainability-card">
        <div style="font-size:30px;">🌍</div>
        <p>Eco Restaurant Level</p>
        <strong>${player.sustainability >= 70 ? "Advanced" : "Growing"}</strong>
      </div>

    </div>

    <div class="card" style="margin-top:20px;">
      <h3>How to Improve Your Sustainability</h3>
      <p>• Use fresh seasonal ingredients.</p>
      <p>• Buy local products when possible.</p>
      <p>• Manage stock carefully.</p>
      <p>• Reduce unnecessary food waste.</p>
      <p>• Prepare dishes using available ingredients.</p>
    </div>
  `;
}


/* =========================================================
   19. CHARACTER PROFILE
========================================================= */

function renderCharacter() {
  const avatar = avatarOptions.find(
    item => item.id === player.avatar
  ) || avatarOptions[0];

  const progress = player.xp / xpRequired(player.level) * 100;

  const profileHTML = `
    <div style="text-align:center;padding:12px;">

      <div style="
        width:105px;height:105px;margin:auto;
        display:grid;place-items:center;
        background:${avatar.color};
        border-radius:50%;font-size:58px;
      ">
        ${avatar.emoji}
      </div>

      <h3 style="margin-top:12px;">
        ${escapeHTML(player.nickname)}
      </h3>

      <p style="color:var(--muted);font-size:12px;">
        ${escapeHTML(avatar.name)} · ${escapeHTML(avatar.description)}
      </p>

      <h2 style="margin-top:15px;color:var(--forest);">
        Level ${player.level}
      </h2>

      <div class="xp-bar">
        <div class="xp-bar-fill" style="width:${progress}%"></div>
      </div>

      <p style="font-size:11px;">
        ${player.xp} / ${xpRequired(player.level)} XP
      </p>

      <button class="secondary-btn" onclick="showPage('character')"
        style="margin-top:15px;">
        Customize Character
      </button>

    </div>
  `;

  if ($("character-profile")) {
    $("character-profile").innerHTML = profileHTML;
  }

  if ($("character-page-profile")) {
    $("character-page-profile").innerHTML = `
      ${profileHTML}

      <div style="margin-top:25px;">
        <h3>Choose Your Chef</h3>

        <div class="avatar-grid">
          ${avatarOptions.map(option => `
            <button
              class="avatar-option ${player.avatar === option.id ? "selected" : ""}"
              data-avatar="${option.id}"
              title="${escapeHTML(option.name)}"
            >
              ${option.emoji}
            </button>
          `).join("")}
        </div>

        <div class="form-group" style="margin-top:20px;">
          <label>Chef Nickname</label>
          <input id="nickname-input" maxlength="20"
            value="${escapeHTML(player.nickname)}">
        </div>

        <button class="primary-btn" id="save-profile">
          Save Character
        </button>
      </div>
    `;
  }
}

function chooseAvatar(id) {
  if (!avatarOptions.some(item => item.id === id)) return;

  player.avatar = id;
  saveGame();
  renderCharacter();
  notify("Chef avatar updated!");
}

function saveProfile() {
  const input = $("nickname-input");
  if (!input) return;

  const name = input.value.trim();

  if (!name || name.length > 20) {
    notify("Enter a nickname between 1 and 20 characters.", "error");
    return;
  }

  player.nickname = name;

  saveGame();
  renderCharacter();
  notify("Character profile saved!");
}


/* =========================================================
   20. RESTAURANT ACTIVITY
========================================================= */

function renderRestaurantManagement() {
  const container = $("restaurant-management");
  if (!container) return;

  container.innerHTML = `
    <div class="finance-grid">

      <div class="finance-card">
        <strong>${player.totalOrders}</strong>
        <p>Completed Orders</p>
      </div>

      <div class="finance-card">
        <strong>${player.totalCooked}</strong>
        <p>Dishes Prepared</p>
      </div>

      <div class="finance-card">
        <strong>${player.reputation}/100</strong>
        <p>Reputation</p>
      </div>

    </div>
  `;
}

function renderActivity() {
  const container = $("activity-feed");
  if (!container) return;

  container.innerHTML = player.activities.length
    ? player.activities.slice(0, 8).map(item => `
      <div class="objective-item">
        <span>${item.icon} ${escapeHTML(item.message)}</span>
        <small>Day ${item.day}</small>
      </div>
    `).join("")
    : `<p style="color:var(--muted);font-size:12px;">
        Your restaurant story starts today!
      </p>`;
}


/* =========================================================
   21. DAILY GAME SYSTEM
========================================================= */

function nextDay() {
  player.day++;

  player.completedObjectives = player.completedObjectives.filter(
    item => !item.startsWith(`${player.day - 1}-`)
  );

  player.inventory.forEach(item => {
    const ingredient = getIngredient(item.id);

    if (!ingredient) return;

    if (ingredient.category === "vegetable" ||
        ingredient.category === "fruit" ||
        ingredient.category === "dairy" ||
        ingredient.category === "protein") {
      item.freshness = Math.max(0, item.freshness - 1);
    }
  });

  const expired = player.inventory.filter(
    item => item.freshness <= 0 && item.quantity > 0
  );

  expired.forEach(item => {
    item.quantity = 0;
    player.wasteReduced = Math.max(0, player.wasteReduced);
    player.sustainability = clamp(player.sustainability - 1, 0, 100);
  });

  addActivity(`Welcome to Day ${player.day}!`, "🌅");

  saveGame();
  renderAll();

  notify(`A new day has begun! Day ${player.day}`);
}


/* =========================================================
   22. NAVIGATION
========================================================= */

function showPage(page) {
  document.querySelectorAll("[data-page]").forEach(section => {
    section.classList.toggle(
      "active",
      section.dataset.page === page
    );
  });

  document.querySelectorAll("[data-nav]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.nav === page
    );
  });

  const titles = {
    dashboard: "Dashboard",
    restaurant: "My Restaurant",
    kitchen: "Professional Kitchen",
    inventory: "Ingredient Inventory",
    recipes: "Recipe Book",
    customers: "Customers & Orders",
    suppliers: "Supplier Network",
    finance: "Financial Management",
    sustainability: "Sustainability Center",
    achievements: "Achievements",
    character: "My Anime Chef"
  };

  if ($("page-title")) {
    $("page-title").textContent = titles[page] || "Freshopia";
  }

  $("sidebar")?.classList.remove("open");

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (page === "character") renderCharacter();
  if (page === "inventory") renderInventory();
  if (page === "recipes") renderRecipes();
  if (page === "customers") renderCustomers();
}


/* =========================================================
   23. DASHBOARD
========================================================= */

function renderDashboard() {
  if ($("dashboard-money")) {
    $("dashboard-money").textContent = moneyFormat(player.money);
  }

  if ($("dashboard-stock")) {
    $("dashboard-stock").textContent =
      player.inventory.reduce((sum, item) => sum + item.quantity, 0)
        .toFixed(1);
  }

  if ($("dashboard-orders")) {
    $("dashboard-orders").textContent = player.totalOrders;
  }

  if ($("dashboard-xp")) {
    $("dashboard-xp").textContent =
      `${player.xp} XP · L${player.level}`;
  }

  renderRestaurantManagement();
  renderActivity();
  renderObjectives();
  renderCharacter();
}


/* =========================================================
   24. RENDER ALL
========================================================= */

function renderAll() {
  renderDashboard();
  renderInventory();
  renderRecipes();
  renderCustomers();
  renderSuppliers();
  renderFinance();
  renderSustainability();
  renderAchievements();
  renderCharacter();
  saveGame();
}


/* =========================================================
   25. EVENT HANDLERS
========================================================= */

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    showPage(nav.dataset.nav);
    return;
  }

  const buy = event.target.closest("[data-buy]");
  if (buy) {
    buyIngredient(buy.dataset.buy);
    return;
  }

  const cook = event.target.closest("[data-cook]");
  if (cook) {
    cookRecipe(cook.dataset.cook);
    return;
  }

  const serve = event.target.closest("[data-serve]");
  if (serve) {
    serveOrder(serve.dataset.serve);
    return;
  }

  const objective = event.target.closest("[data-objective]");
  if (objective) {
    claimObjective(objective.dataset.objective);
    return;
  }

  const avatar = event.target.closest("[data-avatar]");
  if (avatar) {
    chooseAvatar(avatar.dataset.avatar);
    return;
  }

  if (event.target.closest("#new-customer-order")) {
    createOrder();
    return;
  }

  if (event.target.closest("#finish-cooking")) {
    finishCooking();
    return;
  }

  if (event.target.closest("#save-profile")) {
    saveProfile();
  }
});

document.addEventListener("input", event => {
  if (event.target.id === "inventory-search") {
    renderInventory();
  }

  if (event.target.id === "recipe-search") {
    renderRecipes();
  }
});

document.addEventListener("change", event => {
  if (event.target.id === "inventory-category") {
    renderInventory();
  }
});

$("modal-container")?.addEventListener("click", event => {
  if (event.target.id === "modal-container") {
    closeModal();
  }
});


/* =========================================================
   26. INITIALIZATION
========================================================= */

function initializeFreshopia() {
  if (!player.activities.length) {
    addActivity("Welcome to Freshopia! Your adventure begins.", "🌿");
  }

  renderAll();

  showPage("dashboard");

  console.log("Freshopia Game Engine 3.0 initialized.");
  console.log("Player:", player.nickname);
  console.log("Level:", player.level);
  console.log("Game Day:", player.day);
}

initializeFreshopia();


/* =========================================================
   END OF FRESHOPIA GAME ENGINE 3.0
========================================================= */
