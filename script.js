/* ==========================================
   FRESHOPIA - ANIME COOKING ADVENTURE
   REALISTIC FOOD EDITION
========================================== */

const SAVE_KEY = "freshopia_anime_realistic_v1";

const defaultPlayer = {
  name: "Chef",
  avatar: "👩🏻‍🍳",
  xp: 0,
  coins: 100,
  cooked: 0,
  badges: [],
  sound: true,
  completedLessons: []
};

let player = loadPlayer();
let selectedRecipe = null;
let selectedAvatar = player.avatar;
let audioContext = null;

function loadPlayer() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    return { ...defaultPlayer, ...(saved || {}) };
  } catch {
    return { ...defaultPlayer };
  }
}

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(player));
}

const recipes = [
  {
    id: 1,
    name: "Creamy Salmon Pasta",
    category: "Italian Cuisine",
    time: "25 min",
    reward: 35,
    image: "photo-1473093295043-cdd812d0e601",
    description: "Creamy pasta with fresh herbs and delicious salmon.",
    ingredients: ["Pasta", "Salmon", "Cream", "Garlic", "Basil"],
    steps: [
      "Boil the pasta in salted water.",
      "Cook the salmon thoroughly in a pan.",
      "Prepare a creamy garlic sauce.",
      "Combine pasta, salmon and sauce.",
      "Finish with fresh basil and serve."
    ]
  },
  {
    id: 2,
    name: "Fresh Garden Salad",
    category: "Healthy Food",
    time: "15 min",
    reward: 25,
    image: "photo-1512621776951-a57141f2eabc",
    description: "A colorful salad with fresh seasonal vegetables.",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Avocado", "Olive Oil"],
    steps: [
      "Wash all vegetables carefully.",
      "Cut the vegetables into suitable pieces.",
      "Arrange everything in a serving bowl.",
      "Add olive oil and seasoning.",
      "Serve fresh."
    ]
  },
  {
    id: 3,
    name: "Grilled Salmon Plate",
    category: "Fine Dining",
    time: "30 min",
    reward: 40,
    image: "photo-1467003909585-2f8a72700288",
    description: "Restaurant-style salmon with vegetables.",
    ingredients: ["Salmon", "Broccoli", "Lemon", "Potato", "Olive Oil"],
    steps: [
      "Prepare the salmon with olive oil and seasoning.",
      "Cook the salmon thoroughly.",
      "Steam the broccoli until tender.",
      "Prepare the potatoes.",
      "Arrange everything elegantly on a plate."
    ]
  },
  {
    id: 4,
    name: "Margherita Pizza",
    category: "Italian Cuisine",
    time: "35 min",
    reward: 30,
    image: "photo-1579751626657-72bc17010498",
    description: "Classic pizza with tomato, mozzarella and basil.",
    ingredients: ["Pizza Dough", "Tomato", "Mozzarella", "Basil", "Olive Oil"],
    steps: [
      "Prepare and stretch the pizza dough.",
      "Spread tomato sauce over the dough.",
      "Add mozzarella cheese.",
      "Bake until the crust is golden and cheese melts.",
      "Finish with fresh basil."
    ]
  },
  {
    id: 5,
    name: "Avocado Toast",
    category: "Breakfast",
    time: "10 min",
    reward: 20,
    image: "photo-1525351484163-7529414344d8",
    description: "A delicious breakfast with avocado and fresh bread.",
    ingredients: ["Bread", "Avocado", "Egg", "Lemon", "Tomato"],
    steps: [
      "Toast the bread until golden.",
      "Mash the avocado with lemon juice.",
      "Prepare the egg safely.",
      "Spread avocado on the toast.",
      "Add egg and tomato."
    ]
  },
  {
    id: 6,
    name: "Berry Dessert Bowl",
    category: "Dessert",
    time: "15 min",
    reward: 25,
    image: "photo-1490474418585-ba9bad8fd0ea",
    description: "A beautiful dessert with yogurt and fresh berries.",
    ingredients: ["Strawberry", "Blueberry", "Yogurt", "Honey", "Granola"],
    steps: [
      "Wash the berries.",
      "Add yogurt to a serving bowl.",
      "Arrange strawberries and blueberries.",
      "Add granola and a little honey.",
      "Serve chilled."
    ]
  }
];

const ingredients = [
  {
    name: "Fresh Salmon",
    category: "Seafood",
    image: "photo-1467003909585-2f8a72700288"
  },
  {
    name: "Fresh Broccoli",
    category: "Vegetables",
    image: "photo-1459411621453-7b03977f4bfc"
  },
  {
    name: "Strawberries",
    category: "Fruits",
    image: "photo-1464965911861-746a04b4bca6"
  },
  {
    name: "Avocado",
    category: "Healthy Fats",
    image: "photo-1523049673857-eb18f1d7b578"
  },
  {
    name: "Fresh Tomatoes",
    category: "Vegetables",
    image: "photo-1546094096-0df4bcaaa337"
  },
  {
    name: "Pasta",
    category: "Grains",
    image: "photo-1551183053-bf91a1d81141"
  },
  {
    name: "Blueberries",
    category: "Fruits",
    image: "photo-1498557850523-fd3d118b962e"
  },
  {
    name: "Fresh Mushrooms",
    category: "Vegetables",
    image: "photo-1504545102780-26774c1bb073"
  }
];

const badgeDefinitions = [
  { id: "first", name: "First Recipe", icon: "🍓", condition: () => player.cooked >= 1 },
  { id: "five", name: "Little Chef", icon: "👩🏻‍🍳", condition: () => player.cooked >= 5 },
  { id: "ten", name: "Master Chef", icon: "👑", condition: () => player.cooked >= 10 },
  { id: "level5", name: "Rising Star", icon: "⭐", condition: () => getLevel() >= 5 },
  { id: "nutrition", name: "Healthy Mind", icon: "🥦", condition: () => player.completedLessons.includes("nutrition") },
  { id: "planet", name: "Eco Hero", icon: "🌍", condition: () => player.completedLessons.includes("sustainability") },
  { id: "safety", name: "Safety Expert", icon: "🧼", condition: () => player.completedLessons.includes("safety") }
];

const lessons = {
  nutrition: {
    title: "🥦 Healthy Nutrition",
    content: `
      <h2>Healthy Nutrition</h2>
      <p>A balanced diet includes different food groups.</p>
      <ul>
        <li>🥕 Vegetables and fruits provide vitamins and minerals.</li>
        <li>🍞 Whole grains provide dietary fibre.</li>
        <li>🥚 Protein supports growth and tissue repair.</li>
        <li>🥑 Healthy fats support normal body functions.</li>
        <li>💧 Water is essential for hydration.</li>
      </ul>
      <p><b>Chef tip:</b> Aim for variety and balance in your meals!</p>
    `
  },
  sustainability: {
    title: "♻️ Food Sustainability",
    content: `
      <h2>Food Sustainability</h2>
      <p>Sustainable food practices help protect natural resources.</p>
      <ul>
        <li>Use seasonal ingredients.</li>
        <li>Plan meals to prevent food waste.</li>
        <li>Store food at appropriate temperatures.</li>
        <li>Use edible leftovers safely.</li>
        <li>Choose responsible food sources.</li>
      </ul>
      <p><b>Chef tip:</b> Every ingredient deserves respect!</p>
    `
  },
  safety: {
    title: "🧼 Food Safety",
    content: `
      <h2>Food Safety</h2>
      <p>Food hygiene is essential in every professional kitchen.</p>
      <ul>
        <li>Wash hands before food preparation.</li>
        <li>Keep raw and ready-to-eat foods separate.</li>
        <li>Use clean equipment and surfaces.</li>
        <li>Cook food to safe internal temperatures.</li>
        <li>Refrigerate perishable ingredients promptly.</li>
      </ul>
      <p><b>Chef tip:</b> Clean kitchens help prevent foodborne illness!</p>
    `
  }
};

/* ------------------------------------------
   IMAGE SYSTEM
------------------------------------------ */

function foodImage(id, width = 800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
}

/* ------------------------------------------
   PLAYER SYSTEM
------------------------------------------ */

function getLevel() {
  return Math.floor(player.xp / 100) + 1;
}

function getLevelTitle() {
  const level = getLevel();

  if (level >= 15) return "Legendary Chef";
  if (level >= 10) return "Professional Chef";
  if (level >= 5) return "Expert Chef";
  if (level >= 3) return "Junior Chef";

  return "Beginner Chef";
}

function renderPlayer() {
  const level = getLevel();
  const progress = player.xp % 100;

  document.getElementById("coins").textContent = player.coins;
  document.getElementById("xp").textContent = player.xp;
  document.getElementById("level").textContent = level;

  document.getElementById("playerName").textContent = player.name;
  document.getElementById("playerAvatar").textContent = player.avatar;

  document.querySelector(".level-text").textContent =
    `Level ${level} · ${getLevelTitle()}`;

  document.getElementById("xpBar").style.width = progress + "%";
  document.getElementById("xpProgress").textContent =
    `${progress} / 100 XP`;

  document.getElementById("soundButton").textContent =
    player.sound ? "🔊" : "🔇";
}

/* ------------------------------------------
   RECIPE SYSTEM
------------------------------------------ */

function renderRecipes() {
  const grid = document.getElementById("recipeGrid");

  grid.innerHTML = recipes.map(recipe => `
    <article class="recipe-card"
      data-recipe="${recipe.id}"
      onclick="selectRecipe(${recipe.id})">

      <img
        class="food-photo"
        src="${foodImage(recipe.image)}"
        alt="${recipe.name}"
        loading="lazy"
      >

      <div class="recipe-details">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>

        <div class="recipe-meta">
          <span>⏱ ${recipe.time}</span>
          <span>⭐ ${recipe.reward} XP</span>
        </div>
      </div>
    </article>
  `).join("");
}

function selectRecipe(id) {
  selectedRecipe = recipes.find(recipe => recipe.id === id);

  document.querySelectorAll(".recipe-card").forEach(card => {
    card.classList.toggle(
      "selected",
      Number(card.dataset.recipe) === id
    );
  });

  const recipe = selectedRecipe;

  document.getElementById("cookingPanel").innerHTML = `
    <div class="cooking-layout">
      <div>
        <img src="${foodImage(recipe.image)}" alt="${recipe.name}">
        <h3 style="margin-top:12px">${recipe.name}</h3>
        <p>${recipe.description}</p>
        <p style="margin-top:8px">🍽 ${recipe.category}</p>
        <p>⏱ ${recipe.time}</p>
      </div>

      <div>
        <h3>🛒 Required Ingredients</h3>
        <ul class="ingredient-list">
          ${recipe.ingredients.map(item =>
            `<li>🥬 ${item}</li>`
          ).join("")}
        </ul>

        <h3>👩🏻‍🍳 Cooking Instructions</h3>
        <ol style="padding-left:20px;line-height:1.9;font-size:13px">
          ${recipe.steps.map(step => `<li>${step}</li>`).join("")}
        </ol>

        <button class="cook-button" onclick="cookRecipe()">
          Prepare & Serve 🍽️
        </button>
      </div>
    </div>
  `;

  document.getElementById("cookingPanel").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

  document.getElementById("characterMessage").textContent =
    `Great choice! Let's prepare ${recipe.name}! 💗`;

  playSound(600);
}

/* ------------------------------------------
   COOKING AND REWARD SYSTEM
------------------------------------------ */

function cookRecipe() {
  if (!selectedRecipe) return;

  const recipe = selectedRecipe;

  player.cooked++;
  player.xp += recipe.reward;
  player.coins += 20;

  checkBadges();
  saveGame();
  renderPlayer();
  renderBadges();
  renderMission();

  document.getElementById("characterMessage").textContent =
    "Amazing job, chef! Your dish looks delicious! ✨";

  document.getElementById("cookingPanel").innerHTML = `
    <div style="text-align:center;padding:15px">
      <div style="font-size:65px">🎉</div>
      <h2 style="color:#a36eaa">Order Completed!</h2>
      <img
        src="${foodImage(recipe.image, 600)}"
        alt="${recipe.name}"
        style="width:100%;max-width:350px;height:190px;object-fit:cover;border-radius:18px;margin:15px auto"
      >
      <h3>${recipe.name}</h3>
      <p>Customer is happy with your meal!</p>
      <p style="margin-top:12px">⭐ +${recipe.reward} XP</p>
      <p>🪙 +20 Coins</p>
      <button class="primary-button" style="margin-top:15px"
        onclick="resetKitchen()">Cook Another Dish</button>
    </div>
  `;

  playSound(850);
  showToast(`Wonderful! +${recipe.reward} XP and +20 coins!`);

  if (getLevel() > Math.floor((player.xp - recipe.reward) / 100) + 1) {
    levelUp();
  }
}

function resetKitchen() {
  selectedRecipe = null;

  document.querySelectorAll(".recipe-card").forEach(card => {
    card.classList.remove("selected");
  });

  document.getElementById("cookingPanel").innerHTML = `
    <div class="empty-kitchen">
      <span>🍓</span>
      <h3>Choose a new recipe!</h3>
      <p>Your next culinary adventure is waiting.</p>
    </div>
  `;
}

function levelUp() {
  const level = getLevel();

  player.coins += 50;
  saveGame();
  renderPlayer();
  checkBadges();
  renderBadges();

  document.getElementById("heroCharacter").textContent = "👩🏻‍🍳";

  document.getElementById("characterMessage").textContent =
    `LEVEL UP! You are now Level ${level}! So proud of you! 💖`;

  showToast(`🌸 LEVEL UP! You reached Level ${level}! +50 bonus coins!`);
  playSound(1000);
}

/* ------------------------------------------
   INGREDIENT COLLECTION
------------------------------------------ */

function renderIngredients() {
  document.getElementById("ingredientGrid").innerHTML =
    ingredients.map(item => `
      <article class="ingredient-card">
        <img
          src="${foodImage(item.image, 500)}"
          alt="${item.name}"
          loading="lazy"
        >
        <h4>${item.name}</h4>
        <p>${item.category}</p>
      </article>
    `).join("");
}

/* ------------------------------------------
   BADGE SYSTEM
------------------------------------------ */

function checkBadges() {
  badgeDefinitions.forEach(badge => {
    if (badge.condition() && !player.badges.includes(badge.id)) {
      player.badges.push(badge.id);
      showToast(`🏆 New Badge Unlocked: ${badge.name}!`);
      playSound(950);
    }
  });

  saveGame();
}

function renderBadges() {
  document.getElementById("badgeGrid").innerHTML =
    badgeDefinitions.map(badge => {
      const unlocked = player.badges.includes(badge.id);

      return `
        <div class="badge-item ${unlocked ? "" : "locked"}">
          <span>${unlocked ? badge.icon : "🔒"}</span>
          <h4>${badge.name}</h4>
          <small>${unlocked ? "Unlocked!" : "Locked"}</small>
        </div>
      `;
    }).join("");
}

/* ------------------------------------------
   MISSIONS
------------------------------------------ */

function renderMission() {
  const missions = [
    {
      title: "First Cooking Adventure",
      description: "Prepare your first delicious recipe.",
      target: 1,
      reward: "25 Coins"
    },
    {
      title: "Kitchen Explorer",
      description: "Prepare 5 different meals.",
      target: 5,
      reward: "50 Coins"
    },
    {
      title: "Master of the Kitchen",
      description: "Prepare 10 meals.",
      target: 10,
      reward: "100 Coins"
    }
  ];

  const mission = missions.find(item => player.cooked < item.target);

  if (!mission) {
    document.getElementById("missionCard").innerHTML = `
      <h3>🌟 All Missions Completed!</h3>
      <p>You are becoming a legendary chef!</p>
    `;
    return;
  }

  const progress = Math.min(
    player.cooked / mission.target * 100,
    100
  );

  document.getElementById("missionCard").innerHTML = `
    <h3>🎯 ${mission.title}</h3>
    <p>${mission.description}</p>
    <p>Progress: ${player.cooked} / ${mission.target}</p>
    <div class="xp-track">
      <div style="width:${progress}%;height:100%;background:#a98ae4;border-radius:20px"></div>
    </div>
    <p>🎁 Reward: ${mission.reward}</p>
  `;
}

/* ------------------------------------------
   PROFILE SYSTEM
------------------------------------------ */

function openProfile() {
  document.getElementById("nickname").value = player.name;
  selectedAvatar = player.avatar;

  document.querySelectorAll(".avatar-option").forEach(button => {
    button.classList.toggle(
      "active",
      button.textContent === selectedAvatar
    );
  });

  document.getElementById("profileModal").classList.remove("hidden");
}

document.getElementById("profileButton").addEventListener("click", openProfile);

document.querySelectorAll(".avatar-option").forEach(button => {
  button.addEventListener("click", () => {
    selectedAvatar = button.textContent;

    document.querySelectorAll(".avatar-option").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    playSound(500);
  });
});

document.getElementById("saveProfile").addEventListener("click", () => {
  const name = document.getElementById("nickname").value.trim();

  if (!name) {
    showToast("Please enter your chef name!");
    return;
  }

  player.name = name;
  player.avatar = selectedAvatar;

  saveGame();
  renderPlayer();

  document.getElementById("profileModal").classList.add("hidden");

  showToast("Your chef profile has been saved! 🌸");
});

/* ------------------------------------------
   ACADEMY SYSTEM
------------------------------------------ */

document.querySelectorAll("[data-lesson]").forEach(button => {
  button.addEventListener("click", () => {
    const lessonId = button.dataset.lesson;
    const lesson = lessons[lessonId];

    const alreadyCompleted =
      player.completedLessons.includes(lessonId);

    document.getElementById("infoContent").innerHTML = `
      ${lesson.content}
      <button class="primary-button" id="completeLesson"
        style="margin-top:18px">
        ${alreadyCompleted ? "Completed ✓" : "Complete Lesson +15 XP"}
      </button>
    `;

    document.getElementById("infoModal").classList.remove("hidden");

    document.getElementById("completeLesson").addEventListener("click", () => {
      if (alreadyCompleted) {
        showToast("You have already completed this lesson!");
        return;
      }

      player.completedLessons.push(lessonId);
      player.xp += 15;
      player.coins += 10;

      checkBadges();
      saveGame();
      renderPlayer();
      renderBadges();

      document.getElementById("infoModal").classList.add("hidden");

      showToast("Lesson completed! +15 XP and +10 coins!");
      playSound(800);
    });
  });
});

/* ------------------------------------------
   MODAL CONTROLS
------------------------------------------ */

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.close).classList.add("hidden");
  });
});

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
});

/* ------------------------------------------
   SOUND SYSTEM
------------------------------------------ */

function playSound(frequency = 600) {
  if (!player.sound) return;

  try {
    audioContext ??= new (
      window.AudioContext || window.webkitAudioContext
    )();

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.2
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.log("Audio is not available.", error);
  }
}

document.getElementById("soundButton").addEventListener("click", () => {
  player.sound = !player.sound;
  saveGame();
  renderPlayer();

  if (player.sound) playSound(700);
});

/* ------------------------------------------
   START GAME
------------------------------------------ */

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("kitchen").scrollIntoView({
    behavior: "smooth"
  });

  document.getElementById("characterMessage").textContent =
    "Let's cook together! Choose your first recipe! 💗";

  playSound(700);
});

/* ------------------------------------------
   TOAST NOTIFICATIONS
------------------------------------------ */

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* ------------------------------------------
   GAME INITIALIZATION
------------------------------------------ */

function initializeGame() {
  renderPlayer();
  renderRecipes();
  renderIngredients();
  checkBadges();
  renderBadges();
  renderMission();

  if (player.name === "Chef") {
    document.getElementById("characterMessage").textContent =
      "Welcome, chef! First, create your own profile! 🌸";
  } else {
    document.getElementById("characterMessage").textContent =
      `Welcome back, ${player.name}! Let's cook! 💗`;
  }
}

initializeGame();
