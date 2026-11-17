// ========================================
// FRESHOPIA - ANIME COOKING ADVENTURE
// ========================================

const $ = (id) => document.getElementById(id);

let player = {
  level: 1,
  xp: 0,
  coins: 100,
  reputation: 0,
  happyCustomers: 0,
  completedOrders: 0
};

let currentOrder = null;
let selectedItems = [];
let restaurantOpen = false;
let orderTime = 60;
let orderTimerInterval = null;
let cookingReady = false;
let voiceEnabled = true;
let mikaStep = 0;
let currentPuzzleAnswer = null;

const ingredients = [
  {
    id: "bread",
    name: "Burger Bun",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
  },
  {
    id: "beef",
    name: "Beef Patty",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300"
  },
  {
    id: "cheese",
    name: "Cheese",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300"
  },
  {
    id: "lettuce",
    name: "Lettuce",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300"
  },
  {
    id: "tomato",
    name: "Tomato",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300"
  },
  {
    id: "pasta",
    name: "Pasta",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300"
  },
  {
    id: "basil",
    name: "Fresh Basil",
    image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=300"
  },
  {
    id: "cream",
    name: "Cream",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300"
  },
  {
    id: "chicken",
    name: "Chicken",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300"
  },
  {
    id: "rice",
    name: "Rice",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300"
  },
  {
    id: "carrot",
    name: "Carrot",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300"
  },
  {
    id: "potato",
    name: "Potato",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300"
  }
];

const recipes = [
  {
    id: "burger",
    name: "Classic Burger",
    description: "A juicy burger with cheese and fresh vegetables.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    ingredients: ["bread", "beef", "cheese", "lettuce", "tomato"],
    reward: 35
  },
  {
    id: "pasta",
    name: "Creamy Basil Pasta",
    description: "Creamy pasta with fresh basil.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
    ingredients: ["pasta", "basil", "cream"],
    reward: 40
  },
  {
    id: "chicken",
    name: "Chicken Rice Bowl",
    description: "Chicken served with rice and carrots.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500",
    ingredients: ["chicken", "rice", "carrot"],
    reward: 45
  }
];

const customers = [
  { name: "Emma", avatar: "👩🏻", mood: "😊", message: "I'm hungry! Can you cook for me?" },
  { name: "Oliver", avatar: "👨🏻", mood: "😋", message: "I can't wait to taste your food!" },
  { name: "Luna", avatar: "👧🏻", mood: "🥰", message: "I love this little restaurant!" },
  { name: "Mia", avatar: "👩🏽", mood: "🤩", message: "Surprise me with something delicious!" },
  { name: "Noah", avatar: "🧑🏻", mood: "🙂", message: "I hope my order is ready soon!" }
];

const mikaMessages = [
  {
    title: "Welcome, Chef! 🌸",
    message: "Hi! I'm Mika, your cooking guide. Welcome to Freshopia! Let's build the cutest restaurant together!"
  },
  {
    title: "Your first mission 🍓",
    message: "Your mission is simple: choose ingredients, prepare a delicious meal and serve your customer!"
  },
  {
    title: "Choose ingredients 🥬",
    message: "Tap the ingredients you need. Try to match the customer's recipe!"
  },
  {
    title: "Let's cook! 🍳",
    message: "When your ingredients are ready, press Prepare Meal. Then serve your delicious creation!"
  },
  {
    title: "Let's begin! 💗",
    message: "You're ready, Chef! Open your restaurant and let's welcome our first customer!"
  }
];

const missions = [
  { id: 1, title: "Serve your first customer", target: 1, progress: 0, reward: 30 },
  { id: 2, title: "Prepare 3 delicious meals", target: 3, progress: 0, reward: 60 },
  { id: 3, title: "Earn 100 coins", target: 100, progress: 0, reward: 50 }
];

const achievements = [
  { id: 1, title: "First Customer", description: "Serve your first customer.", unlocked: false },
  { id: 2, title: "Little Chef", description: "Complete 5 orders.", unlocked: false },
  { id: 3, title: "Rising Star", description: "Reach level 3.", unlocked: false }
];

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener("DOMContentLoaded", initializeGame);

function initializeGame() {
  loadPlayer();
  updatePlayerDisplay();
  renderIngredients();
  renderRecipes();
  renderCharacters();
  renderMissions();
  renderAchievements();
  renderPuzzle();
  updateCustomerArea();
  startMikaIntroduction();
  showToast("Welcome to Freshopia! 🌸");
}

function loadPlayer() {
  try {
    const saved = localStorage.getItem("freshopiaPlayer");
    if (saved) {
      const data = JSON.parse(saved);
      player = { ...player, ...data };
    }
  } catch (error) {
    console.log("Starting a new Freshopia game.");
  }
}

function savePlayer() {
  try {
    localStorage.setItem("freshopiaPlayer", JSON.stringify(player));
  } catch (error) {
    console.log("Progress could not be saved.");
  }
}

// ========================================
// NAVIGATION
// ========================================

function showSection(sectionId) {
  document.querySelectorAll(".game-section").forEach(section => {
    section.classList.remove("active");
  });

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");
  });

  const target = $(sectionId);
  if (target) target.classList.add("active");

  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach(button => {
    if (button.getAttribute("onclick")?.includes(sectionId)) {
      button.classList.add("active");
    }
  });

  if (sectionId === "restaurant" && !restaurantOpen) {
    guideSay("Ready to cook? Press Open Restaurant to welcome your first customer!", "Mika's Tip 💗");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========================================
// PLAYER AND LEVEL SYSTEM
// ========================================

function updatePlayerDisplay() {
  setText("playerLevel", player.level);
  setText("homeLevel", player.level);
  setText("playerCoins", player.coins);
  setText("homeCoins", player.coins);
  setText("restaurantCoins", player.coins);
  setText("restaurantReputation", player.reputation);
  setText("happyCustomers", player.happyCustomers);

  const xpNeeded = player.level * 100;
  const percent = Math.min(100, (player.xp / xpNeeded) * 100);

  if ($("xpProgress")) $("xpProgress").style.width = percent + "%";
  setText("xpText", `${player.xp} / ${xpNeeded} XP`);

  savePlayer();
}

function setText(id, value) {
  const element = $(id);
  if (element) element.textContent = value;
}

function addXP(amount) {
  player.xp += amount;

  while (player.xp >= player.level * 100) {
    player.xp -= player.level * 100;
    player.level++;
    showLevelUp();
  }

  updatePlayerDisplay();
  checkAchievements();
}

function addCoins(amount) {
  player.coins += amount;
  updatePlayerDisplay();
  updateMissionProgress(3, amount);
}

function showLevelUp() {
  setText("levelMessage", `You reached Level ${player.level}! New adventures are waiting!`);

  if ($("levelModal")) $("levelModal").classList.add("show");

  mikaDance();
  guideSay(`Amazing! You reached level ${player.level}! I'm so proud of you, Chef! Let's dance!`, "LEVEL UP! 🎉");
  speakMika(`Amazing! You reached level ${player.level}! Congratulations, Chef!`);
}

function closeLevelModal() {
  if ($("levelModal")) $("levelModal").classList.remove("show");
  stopMikaDance();
}

function mikaDance() {
  if ($("mikaAssistant")) {
    $("mikaAssistant").classList.add("mika-dancing");
    setTimeout(stopMikaDance, 3500);
  }
}

function stopMikaDance() {
  if ($("mikaAssistant")) {
    $("mikaAssistant").classList.remove("mika-dancing");
  }
}

// ========================================
// MIKA ASSISTANT
// ========================================

function startMikaIntroduction() {
  mikaStep = 0;
  showMikaMessage();
  if ($("mikaBubble")) $("mikaBubble").classList.add("show");
}

function showMikaMessage() {
  const item = mikaMessages[mikaStep];
  if (!item) return;

  setText("mikaTitle", item.title);
  setText("mikaMessage", item.message);
  setText("mikaNextButton", mikaStep === mikaMessages.length - 1 ? "Let's Go! →" : "Next →");
}

function mikaNext() {
  if (mikaStep < mikaMessages.length - 1) {
    mikaStep++;
    showMikaMessage();
    const item = mikaMessages[mikaStep];
    speakMika(item.message);
  } else {
    closeMika();
    showSection("restaurant");
    guideSay("Let's open your restaurant and welcome our first customer!", "Ready, Chef? 🌸");
  }
}

function guideSay(message, title = "Mika 💗") {
  setText("mikaTitle", title);
  setText("mikaMessage", message);

  if ($("mikaBubble")) $("mikaBubble").classList.add("show");

  if (voiceEnabled) speakMika(message);
}

function closeMika() {
  if ($("mikaBubble")) $("mikaBubble").classList.remove("show");
}

function toggleMika() {
  if (!$("mikaBubble")) return;
  $("mikaBubble").classList.toggle("show");

  if ($("mikaBubble").classList.contains("show")) {
    speakMika($("mikaMessage")?.textContent || "Hello, Chef!");
  }
}

function toggleMikaVoice() {
  voiceEnabled = !voiceEnabled;

  if (!voiceEnabled && "speechSynthesis" in window) {
    speechSynthesis.cancel();
  }

  showToast(voiceEnabled ? "Mika voice is ON 🔊" : "Mika voice is OFF 🔇");

  if (voiceEnabled) {
    speakMika("Hello, Chef! My voice is on!");
  }
}

function speakMika(message) {
  if (!voiceEnabled || !("speechSynthesis" in window)) return;

  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-US";
  speech.rate = 0.95;
  speech.pitch = 1.25;
  speech.volume = 1;

  speechSynthesis.speak(speech);
}

// ========================================
// RESTAURANT AND CUSTOMERS
// ========================================

function openRestaurant() {
  if (restaurantOpen) {
    showToast("Your restaurant is already open!");
    return;
  }

  restaurantOpen = true;

  const button = $("openRestaurantBtn");
  if (button) {
    button.textContent = "Restaurant Open ✓";
    button.disabled = true;
  }

  guideSay("Your restaurant is open! Look, our first customer is here!", "Welcome! 🌸");
  startNextOrder();
}

function startNextOrder() {
  clearInterval(orderTimerInterval);

  const recipe = recipes[Math.floor(Math.random() * recipes.length)];
  const customer = customers[Math.floor(Math.random() * customers.length)];

  currentOrder = {
    recipe,
    customer,
    completed: false
  };

  selectedItems = [];
  cookingReady = false;
  orderTime = 60;

  setText("orderName", recipe.name);
  setText("orderDescription", recipe.description);
  setText("orderTimer", orderTime);
  setText("customerMood", "😊 Waiting");
  setText("orderFeedback", "");

  const image = $("orderImage");
  if (image) {
    image.src = recipe.image;
    image.alt = recipe.name;
  }

  if ($("prepareMealBtn")) $("prepareMealBtn").disabled = false;
  if ($("serveMealBtn")) $("serveMealBtn").disabled = true;

  setText("cookingSteps", "Choose the ingredients for this recipe.");
  setText("cookingContent", "");

  updateCustomerArea();
  renderIngredients();
  renderSelectedIngredients();

  orderTimerInterval = setInterval(() => {
    orderTime--;
    setText("orderTimer", orderTime);

    if (orderTime <= 20) {
      setText("customerMood", "😟 Getting impatient...");
    }

    if (orderTime <= 0) {
      clearInterval(orderTimerInterval);
      setText("customerMood", "😢 Customer left");
      setText("orderFeedback", "Oh no! The customer ran out of patience.");
      if ($("prepareMealBtn")) $("prepareMealBtn").disabled = true;
      if ($("serveMealBtn")) $("serveMealBtn").disabled = true;
      showToast("Customer left. Try again with the next order!");
      setTimeout(startNextOrder, 2500);
    }
  }, 1000);
}

function updateCustomerArea() {
  const area = $("customerArea");
  if (!area) return;

  if (!currentOrder) {
    area.innerHTML = `
      <h2>Waiting for customers...</h2>
      <p>Open your restaurant to welcome your first guest!</p>
    `;
    return;
  }

  area.innerHTML = `
    <div class="customer-avatar">${currentOrder.customer.avatar}</div>
    <h2>${currentOrder.customer.name} is here!</h2>
    <p>${currentOrder.customer.message}</p>
  `;
}

// ========================================
// INGREDIENT SELECTION
// ========================================

function renderIngredients() {
  const grid = $("ingredientGrid");
  if (!grid) return;

  grid.innerHTML = "";

  ingredients.forEach(ingredient => {
    const selected = selectedItems.includes(ingredient.id);

    const card = document.createElement("div");
    card.className = "ingredient-card" + (selected ? " selected" : "");
    card.innerHTML = `
      <img src="${ingredient.image}" alt="${ingredient.name}" loading="lazy">
      <strong>${ingredient.name}</strong>
      <small>${selected ? "Selected ✓" : "Tap to select"}</small>
    `;

    card.addEventListener("click", () => toggleIngredient(ingredient.id));
    grid.appendChild(card);
  });
}

function toggleIngredient(id) {
  if (cookingReady || !currentOrder) return;

  if (selectedItems.includes(id)) {
    selectedItems = selectedItems.filter(item => item !== id);
  } else {
    selectedItems.push(id);
  }

  renderIngredients();
  renderSelectedIngredients();
}

function renderSelectedIngredients() {
  const area = $("selectedIngredients");
  if (!area) return;

  area.className = "selected-list";

  if (selectedItems.length === 0) {
    area.textContent = "No ingredients selected yet.";
    return;
  }

  area.innerHTML = "";

  selectedItems.forEach(id => {
    const ingredient = ingredients.find(item => item.id === id);
    if (!ingredient) return;

    const chip = document.createElement("span");
    chip.className = "selected-chip";
    chip.textContent = ingredient.name;
    area.appendChild(chip);
  });
}

// ========================================
// COOKING
// ========================================

function prepareMeal() {
  if (!currentOrder || cookingReady) return;

  if (selectedItems.length === 0) {
    showToast("Choose some ingredients first!");
    guideSay("Choose the ingredients shown in the recipe, Chef!", "A little hint 💡");
    return;
  }

  const required = currentOrder.recipe.ingredients;
  const missing = required.filter(id => !selectedItems.includes(id));
  const extra = selectedItems.filter(id => !required.includes(id));

  if (missing.length > 0 || extra.length > 0) {
    setText("cookingSteps", "Not quite right! Check the recipe and try again.");
    setText("cookingContent", "You need the correct ingredients to prepare this dish.");
    setText("orderFeedback", "Some ingredients are missing or incorrect.");
    guideSay("Oops! Check the recipe again. You can remove ingredients by tapping them.", "Let's try again! 💗");
    return;
  }

  cookingReady = true;

  if ($("prepareMealBtn")) $("prepareMealBtn").disabled = true;

  setText("cookingSteps", "Step 1: Ingredients collected ✓");
  setText("cookingContent", "Step 2: Mixing and cooking your ingredients...");

  guideSay("Perfect ingredient selection! Your meal is cooking. Great job!", "Cooking time! 🍳");

  setTimeout(() => {
    if (!currentOrder || currentOrder.completed) return;

    setText("cookingSteps", "Step 3: Your dish is ready! ✓");
    setText("cookingContent", "Beautifully prepared! Now serve it to your customer.");
    if ($("serveMealBtn")) $("serveMealBtn").disabled = false;
  }, 1800);
}

function serveMeal() {
  if (!currentOrder || !cookingReady || currentOrder.completed) return;

  currentOrder.completed = true;
  clearInterval(orderTimerInterval);

  const recipe = currentOrder.recipe;
  const speedBonus = orderTime >= 40 ? 15 : orderTime >= 20 ? 8 : 0;
  const reward = recipe.reward + speedBonus;

  player.completedOrders++;
  player.happyCustomers++;
  player.reputation += 10;

  addCoins(reward);
  addXP(35);

  updateMissionProgress(1, 1);
  updateMissionProgress(2, 1);

  setText("customerMood", "😍 Very happy!");
  setText("orderFeedback", `Amazing! You earned ${reward} coins and 35 XP!`);
  setText("cookingContent", "Your customer loved the meal! 🎉");

  if ($("serveMealBtn")) $("serveMealBtn").disabled = true;

  addOrderHistory(recipe.name, reward);

  showToast(`Order completed! +${reward} coins and +35 XP`);

  guideSay("Wonderful work! Your customer is happy. Keep cooking to become a Freshopia star!", "Fantastic, Chef! 🌟");

  checkAchievements();
  updatePlayerDisplay();

  setTimeout(() => {
    if (restaurantOpen) startNextOrder();
  }, 3500);
}

function addOrderHistory(name, reward) {
  const history = $("orderHistory");
  if (!history) return;

  const item = document.createElement("p");
  item.textContent = `✓ ${name} — ${reward} coins earned`;
  history.prepend(item);
}

// ========================================
// RECIPES
// ========================================

function renderRecipes() {
  const grid = $("recipeGrid");
  if (!grid) return;

  grid.innerHTML = "";

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
      <p>🪙 Reward: ${recipe.reward} coins</p>
      <button type="button">View ingredients</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      const names = recipe.ingredients.map(id =>
        ingredients.find(item => item.id === id)?.name
      ).filter(Boolean);

      showToast(names.join(" • "));
    });

    grid.appendChild(card);
  });
}

// ========================================
// CHARACTERS
// ========================================

function renderCharacters() {
  const grid = $("characterGrid");
  if (!grid) return;

  const team = [
    {
      name: "Mika",
      role: "Your cooking guide",
      image: "mika.png"
    },
    {
      name: "Emma",
      role: "A friendly customer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
    },
    {
      name: "Oliver",
      role: "A food lover",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    }
  ];

  grid.innerHTML = "";

  team.forEach(character => {
    const card = document.createElement("div");
    card.className = "character-card";
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" loading="lazy">
      <h3>${character.name}</h3>
      <p>${character.role}</p>
    `;
    grid.appendChild(card);
  });
}

// ========================================
// MISSIONS
// ========================================

function renderMissions() {
  const list = $("missionList");
  if (!list) return;

  list.innerHTML = "";

  missions.forEach(mission => {
    const completed = mission.progress >= mission.target;
    const card = document.createElement("div");
    card.className = "mission-card" + (completed ? " completed" : "");

    card.innerHTML = `
      <h3>${completed ? "✅" : "🎯"} ${mission.title}</h3>
      <p>Progress: ${Math.min(mission.progress, mission.target)} / ${mission.target}</p>
      <p>Reward: ${mission.reward} coins</p>
      ${completed ? "<strong>Mission completed!</strong>" : ""}
    `;

    list.appendChild(card);
  });
}

function updateMissionProgress(id, amount) {
  const mission = missions.find(item => item.id === id);
  if (!mission) return;

  const wasCompleted = mission.progress >= mission.target;
  mission.progress += amount;

  if (!wasCompleted && mission.progress >= mission.target) {
    player.coins += mission.reward;
    showToast(`Mission completed! +${mission.reward} coins 🎯`);
    updatePlayerDisplay();
  }

  renderMissions();
}

// ========================================
// ACHIEVEMENTS
// ========================================

function renderAchievements() {
  const list = $("achievementList");
  if (!list) return;

  list.innerHTML = "";

  achievements.forEach(achievement => {
    const card = document.createElement("div");
    card.className = "achievement-card" + (achievement.unlocked ? " unlocked" : "");

    card.innerHTML = `
      <h3>${achievement.unlocked ? "🏆" : "🔒"} ${achievement.title}</h3>
      <p>${achievement.description}</p>
      <small>${achievement.unlocked ? "Unlocked!" : "Not unlocked yet"}</small>
    `;

    list.appendChild(card);
  });
}

function checkAchievements() {
  const checks = [
    player.completedOrders >= 1,
    player.completedOrders >= 5,
    player.level >= 3
  ];

  achievements.forEach((achievement, index) => {
    if (checks[index] && !achievement.unlocked) {
      achievement.unlocked = true;
      showToast(`Achievement unlocked: ${achievement.title} 🏆`);
      addXP(10);
    }
  });

  renderAchievements();
}

// ========================================
// FOOD KNOWLEDGE PUZZLE
// ========================================

function renderPuzzle() {
  const area = $("puzzleGame");
  if (!area) return;

  const questions = [
    {
      question: "Which ingredient is commonly used to make pesto?",
      options: ["Fresh basil", "Chocolate", "Potato"],
      answer: "Fresh basil"
    },
    {
      question: "Which food is a good source of protein?",
      options: ["Chicken", "Sugar", "Soft drink"],
      answer: "Chicken"
    },
    {
      question: "Which ingredient is used to make pasta?",
      options: ["Pasta", "Lettuce", "Apple"],
      answer: "Pasta"
    }
  ];

  const question = questions[Math.floor(Math.random() * questions.length)];
  currentPuzzleAnswer = question.answer;

  area.innerHTML = `
    <div class="puzzle-card">
      <h2>🧠 Food Quiz</h2>
      <p>${question.question}</p>
      <div id="puzzleOptions"></div>
      <p id="puzzleFeedback"></p>
      <button onclick="renderPuzzle()">Next Question ↻</button>
    </div>
  `;

  const options = $("puzzleOptions");

  question.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => answerPuzzle(option));
    options.appendChild(button);
  });
}

function answerPuzzle(answer) {
  const feedback = $("puzzleFeedback");
  if (!feedback) return;

  if (answer === currentPuzzleAnswer) {
    feedback.textContent = "Correct! Great job! +10 XP 🎉";
    addXP(10);
  } else {
    feedback.textContent = "Not quite! Try another question.";
  }
}

// ========================================
// GENERAL MESSAGE
// ========================================

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
