// =====================================
// FRESHOPIA - GAME ENGINE
// =====================================

const defaultData = {
  name: "Chef",
  xp: 0,
  level: 1,
  character: 0,
  completedMissions: [],
  achievements: [],
  recipesCreated: 0,
  puzzlesWon: 0,
  cookedRecipes: [],
  selectedIngredients: []
};

let game = {
  ...defaultData,
  ...JSON.parse(localStorage.getItem("freshopiaSave") || "{}")
};

function saveGame() {
  localStorage.setItem("freshopiaSave", JSON.stringify(game));
}

const characters = [
  {name:"Sakura", emoji:"👩🏻‍🍳", role:"Sweet Dessert Chef", color:"Pink"},
  {name:"Mika", emoji:"👩🏼‍🍳", role:"Master Baker", color:"Purple"},
  {name:"Hana", emoji:"👩🏽‍🍳", role:"Vegetable Specialist", color:"Green"},
  {name:"Yuki", emoji:"👩🏻‍🍳", role:"Pasta Expert", color:"Blue"},
  {name:"Akira", emoji:"👨🏻‍🍳", role:"Professional Chef", color:"Red"},
  {name:"Ren", emoji:"👨🏽‍🍳", role:"Grill Master", color:"Orange"},
  {name:"Aoi", emoji:"👩🏾‍🍳", role:"Healthy Food Chef", color:"Mint"},
  {name:"Kaito", emoji:"👨🏻‍🍳", role:"Sushi Chef", color:"Black"},
  {name:"Emi", emoji:"👩🏼‍🍳", role:"Pastry Artist", color:"Pink"},
  {name:"Sora", emoji:"👨🏼‍🍳", role:"World Cuisine Chef", color:"Purple"}
];

const recipes = [
  {
    id:1,
    name:"Italian Tomato Pasta",
    emoji:"🍝",
    category:"Main Course",
    time:"25 min",
    ingredients:["Pasta","Tomato","Garlic","Olive Oil","Basil","Parmesan"],
    steps:[
      "Boil water in a large pot.",
      "Cook the pasta until al dente.",
      "Sauté garlic in olive oil.",
      "Add chopped tomatoes and simmer.",
      "Mix the pasta with the sauce.",
      "Finish with fresh basil and Parmesan."
    ]
  },
  {
    id:2,
    name:"Margherita Pizza",
    emoji:"🍕",
    category:"Italian Cuisine",
    time:"35 min",
    ingredients:["Flour","Tomato","Mozzarella","Olive Oil","Basil","Yeast"],
    steps:[
      "Prepare the dough with flour, yeast and water.",
      "Let the dough rise.",
      "Spread tomato sauce over the dough.",
      "Add mozzarella cheese.",
      "Bake until golden.",
      "Finish with fresh basil."
    ]
  },
  {
    id:3,
    name:"Fresh Garden Salad",
    emoji:"🥗",
    category:"Healthy Food",
    time:"15 min",
    ingredients:["Lettuce","Tomato","Cucumber","Olive Oil","Lemon","Feta Cheese"],
    steps:[
      "Wash all vegetables.",
      "Chop lettuce, tomato and cucumber.",
      "Add feta cheese.",
      "Mix olive oil and lemon juice.",
      "Dress the salad and serve."
    ]
  },
  {
    id:4,
    name:"Chocolate Cake",
    emoji:"🍰",
    category:"Dessert",
    time:"50 min",
    ingredients:["Flour","Egg","Milk","Sugar","Cocoa","Butter"],
    steps:[
      "Preheat the oven to 180°C.",
      "Mix eggs and sugar.",
      "Add milk and melted butter.",
      "Mix flour and cocoa into the batter.",
      "Pour into a cake tin.",
      "Bake until cooked through."
    ]
  },
  {
    id:5,
    name:"Japanese Vegetable Sushi",
    emoji:"🍣",
    category:"Japanese Cuisine",
    time:"40 min",
    ingredients:["Rice","Nori","Cucumber","Avocado","Rice Vinegar"],
    steps:[
      "Wash and cook the sushi rice.",
      "Season rice with rice vinegar.",
      "Place nori on a bamboo mat.",
      "Spread rice over the nori.",
      "Add cucumber and avocado.",
      "Roll and cut into pieces."
    ]
  },
  {
    id:6,
    name:"Strawberry Smoothie",
    emoji:"🥤",
    category:"Drinks",
    time:"5 min",
    ingredients:["Strawberry","Milk","Banana","Honey"],
    steps:[
      "Wash the strawberries.",
      "Peel the banana.",
      "Add fruit and milk to a blender.",
      "Blend until smooth.",
      "Add honey if desired."
    ]
  }
];

const ingredients = [
  "Pasta","Rice","Flour","Egg","Milk","Butter",
  "Tomato","Potato","Carrot","Lettuce","Cucumber",
  "Garlic","Onion","Mushroom","Broccoli","Spinach",
  "Chicken","Beef","Salmon","Shrimp",
  "Mozzarella","Parmesan","Feta Cheese",
  "Olive Oil","Lemon","Basil","Parsley",
  "Strawberry","Banana","Apple","Avocado",
  "Sugar","Cocoa","Honey","Nori","Rice Vinegar"
];

const ingredientIcons = {
  Pasta:"🍝", Rice:"🍚", Flour:"🌾", Egg:"🥚",
  Milk:"🥛", Butter:"🧈", Tomato:"🍅",
  Potato:"🥔", Carrot:"🥕", Lettuce:"🥬",
  Cucumber:"🥒", Garlic:"🧄", Onion:"🧅",
  Mushroom:"🍄", Broccoli:"🥦", Spinach:"🌿",
  Chicken:"🍗", Beef:"🥩", Salmon:"🐟",
  Shrimp:"🦐", Mozzarella:"🧀", Parmesan:"🧀",
  "Feta Cheese":"🧀", "Olive Oil":"🫒",
  Lemon:"🍋", Basil:"🌱", Parsley:"🌿",
  Strawberry:"🍓", Banana:"🍌", Apple:"🍎",
  Avocado:"🥑", Sugar:"🍬", Cocoa:"🍫",
  Honey:"🍯", Nori:"🍃", "Rice Vinegar":"🍶"
};

const missions = [
  {id:"cook", title:"First Cooking Adventure", description:"Complete one recipe.", reward:40},
  {id:"create", title:"Creative Chef", description:"Create your own recipe.", reward:50},
  {id:"quiz", title:"Food Knowledge", description:"Complete a quiz.", reward:30},
  {id:"memory", title:"Memory Master", description:"Complete the memory puzzle.", reward:30},
  {id:"order", title:"Kitchen Organizer", description:"Complete the recipe order challenge.", reward:40}
];

// =====================================
// INITIALIZATION
// =====================================

function initializeGame() {
  const name = localStorage.getItem("freshopiaName");

  if (!name) {
    const answer = prompt("Welcome to Freshopia! What is your chef name?");
    if (answer && answer.trim()) {
      game.name = answer.trim().slice(0,20);
      localStorage.setItem("freshopiaName",game.name);
    }
  } else {
    game.name = name;
  }

  updateInterface();
  renderCharacters();
  renderRecipes();
  renderIngredients();
  renderMissions();
  renderAchievements();
  updateCharacterMessage();
}

function updateInterface() {
  document.getElementById("playerName").textContent = game.name;
  document.getElementById("level").textContent = game.level;
  document.getElementById("xp").textContent = game.xp;
  document.getElementById("heroCharacter").textContent =
    characters[game.character].emoji;

  const progress = game.xp % 100;
  document.getElementById("xpProgress").style.width = progress + "%";
  document.getElementById("xpProgressText").textContent =
    progress + " / 100 XP";

  saveGame();
}

function showSection(sectionId) {
  document.querySelectorAll(".game-section").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(sectionId);
  if (target) target.classList.add("active");

  window.scrollTo({top:0,behavior:"smooth"});
}

// =====================================
// XP AND LEVEL SYSTEM
// =====================================

function addXP(amount, reason) {
  const oldLevel = game.level;
  game.xp += amount;

  while (game.xp >= game.level * 100) {
    game.xp -= game.level * 100;
    game.level++;
  }

  updateInterface();

  showToast("⭐ +" + amount + " XP! " + (reason || ""));

  if (game.level > oldLevel) {
    setTimeout(() => showLevelUp(),400);
  }

  checkAchievements();
}

function showLevelUp() {
  document.getElementById("danceCharacter").textContent =
    characters[game.character].emoji;

  document.getElementById("levelMessage").textContent =
    "Congratulations " + game.name +
    "! You reached Level " + game.level + "!";

  document.getElementById("levelModal").classList.remove("hidden");
}

function closeLevelModal() {
  document.getElementById("levelModal").classList.add("hidden");
  showToast("🎁 New adventures are waiting for you!");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  },2500);
}

// =====================================
// CHARACTER SELECTION
// =====================================

function renderCharacters() {
  const grid = document.getElementById("characterGrid");

  grid.innerHTML = characters.map((character,index) => {
    const unlocked = index === 0 || game.level >= index + 1;
    const selected = game.character === index;

    return `
      <article class="character-card ${selected ? "selected" : ""}">
        <div class="character-art">${character.emoji}</div>
        <h3>${character.name}</h3>
        <p>${character.role}</p>
        <p>Style: ${character.color}</p>
        ${
          unlocked
          ? `<button onclick="selectCharacter(${index})">
              ${selected ? "Selected ✓" : "Choose Character"}
             </button>`
          : `<button disabled>Unlock at Level ${index+1} 🔒</button>`
        }
      </article>
    `;
  }).join("");
}

function selectCharacter(index) {
  if (index > 0 && game.level < index+1) {
    showToast("🔒 Reach Level " + (index+1) + " to unlock!");
    return;
  }

  game.character = index;
  updateInterface();
  renderCharacters();
  updateCharacterMessage();
  showToast(characters[index].name + " is your new chef!");
}

function updateCharacterMessage() {
  const messages = [
    "Let's make something delicious today! 💗",
    "Every great chef starts with a recipe!",
    "Learning is the secret ingredient!",
    "Your kitchen adventure begins now!"
  ];

  document.getElementById("characterMessage").textContent =
    messages[game.level % messages.length];
}

// =====================================
// RECIPE ACADEMY
// =====================================

function renderRecipes() {
  const grid = document.getElementById("recipeGrid");

  grid.innerHTML = recipes.map(recipe => `
    <article class="recipe-card">
      <div class="recipe-art">${recipe.emoji}</div>
      <h3>${recipe.name}</h3>
      <p>${recipe.category}</p>
      <p>⏱ ${recipe.time}</p>
      <button onclick="openRecipe(${recipe.id})">View Recipe</button>
    </article>
  `).join("");
}

function openRecipe(id) {
  const recipe = recipes.find(item => item.id === id);
  const details = document.getElementById("recipeDetails");

  details.classList.remove("hidden");

  details.innerHTML = `
    <h2>${recipe.emoji} ${recipe.name}</h2>
    <p>Category: ${recipe.category} | Time: ${recipe.time}</p>

    <h3>Ingredients</h3>
    <ul>
      ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
    </ul>

    <h3>Preparation Steps</h3>
    <ol>
      ${recipe.steps.map(step => `<li>${step}</li>`).join("")}
    </ol>

    <button class="primary-btn" onclick="completeRecipe(${id})">
      I Completed This Recipe! 🍳
    </button>
  `;

  details.scrollIntoView({behavior:"smooth",block:"start"});
}

function completeRecipe(id) {
  if (game.cookedRecipes.includes(id)) {
    showToast("You already completed this recipe!");
    return;
  }

  game.cookedRecipes.push(id);
  addXP(50,"Recipe completed!");
  completeMission("cook");
  saveGame();
}

// =====================================
// RECIPE CREATOR
// =====================================

function renderIngredients() {
  const grid = document.getElementById("ingredientGrid");

  grid.innerHTML = ingredients.map(item => `
    <label class="ingredient-option">
      <input type="checkbox" value="${item}"
        onchange="toggleIngredient('${item}',this.checked)">
      <span>${ingredientIcons[item] || "🍴"} ${item}</span>
    </label>
  `).join("");
}

function toggleIngredient(item,checked) {
  if (checked && !game.selectedIngredients.includes(item)) {
    game.selectedIngredients.push(item);
  } else if (!checked) {
    game.selectedIngredients =
      game.selectedIngredients.filter(x => x !== item);
  }
}

function createRecipe() {
  const name = document.getElementById("dishName").value.trim();
  const method = document.getElementById("cookingMethod").value;
  const selected = game.selectedIngredients;

  if (!name) {
    showToast("Please give your recipe a name!");
    return;
  }

  if (selected.length < 2) {
    showToast("Choose at least two ingredients!");
    return;
  }

  if (!method) {
    showToast("Choose a cooking method!");
    return;
  }

  game.recipesCreated++;

  const output = document.getElementById("createdRecipe");

  output.innerHTML = `
    <h3>🎉 Your Recipe Is Ready!</h3>
    <h2>${escapeHTML(name)}</h2>
    <p><b>Cooking Method:</b> ${method}</p>
    <p><b>Ingredients:</b></p>
    <ul>${selected.map(x => `<li>${ingredientIcons[x] || "🍴"} ${x}</li>`).join("")}</ul>
    <p>Great creativity, Chef!</p>
  `;

  addXP(50,"Creative recipe!");
  completeMission("create");

  game.selectedIngredients = [];
  document.querySelectorAll(".ingredient-option input").forEach(input => {
    input.checked = false;
  });

  document.getElementById("dishName").value = "";
  document.getElementById("cookingMethod").value = "";

  saveGame();
}

// =====================================
// PUZZLE 1 - INGREDIENT QUIZ
// =====================================

const quizQuestions = [
  {
    question:"Which ingredient is commonly used to make guacamole?",
    answers:["Avocado","Potato","Strawberry"],
    correct:"Avocado",
    fact:"Avocado is the main ingredient in traditional guacamole."
  },
  {
    question:"Which food is rich in vitamin C?",
    answers:["Lemon","Butter","Rice"],
    correct:"Lemon",
    fact:"Lemons are a good source of vitamin C."
  },
  {
    question:"Which ingredient helps bread dough rise?",
    answers:["Yeast","Salt","Olive Oil"],
    correct:"Yeast",
    fact:"Yeast produces carbon dioxide, helping dough rise."
  },
  {
    question:"Which cooking method uses hot water?",
    answers:["Boiling","Grilling","Baking"],
    correct:"Boiling",
    fact:"Boiling cooks food in bubbling hot water."
  },
  {
    question:"Which ingredient is traditionally used in sushi?",
    answers:["Rice","Pasta","Couscous"],
    correct:"Rice",
    fact:"Japanese sushi commonly uses seasoned short-grain rice."
  }
];

let quizIndex = 0;
let quizScore = 0;

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  showSection("puzzles");
  showQuizQuestion();
}

function showQuizQuestion() {
  const area = document.getElementById("puzzleGame");
  area.classList.remove("hidden");

  if (quizIndex >= quizQuestions.length) {
    area.innerHTML = `
      <h2>🎉 Quiz Completed!</h2>
      <p>Your score: ${quizScore} / ${quizQuestions.length}</p>
      <button onclick="startQuiz()">Play Again</button>
    `;

    if (quizScore >= 3) {
      addXP(30,"Quiz completed!");
      completeMission("quiz");
      game.puzzlesWon++;
      checkAchievements();
    }

    return;
  }

  const q = quizQuestions[quizIndex];

  area.innerHTML = `
    <p>Question ${quizIndex+1} of ${quizQuestions.length}</p>
    <div class="quiz-question">${q.question}</div>
    ${q.answers.map(answer => `
      <button onclick="answerQuiz('${answer.replace(/'/g,"\\'")}')">
        ${answer}
      </button>
    `).join("")}
    <p id="quizFeedback"></p>
  `;
}

function answerQuiz(answer) {
  const q = quizQuestions[quizIndex];
  const feedback = document.getElementById("quizFeedback");

  if (answer === q.correct) {
    quizScore++;
    feedback.innerHTML = "✅ Correct! " + q.fact;
  } else {
    feedback.innerHTML = "❌ Correct answer: " + q.correct + ". " + q.fact;
  }

  document.querySelectorAll("#puzzleGame button").forEach(button => {
    button.disabled = true;
  });

  quizIndex++;
  setTimeout(showQuizQuestion,1800);
}

// =====================================
// PUZZLE 2 - FOOD MEMORY
// =====================================

let memoryCards = [];
let memoryOpen = [];
let memoryMatches = 0;
let memoryLocked = false;

function startMemory() {
  showSection("puzzles");

  const foods = ["🍓","🍕","🥕","🍰","🍋","🥑"];
  memoryCards = [...foods,...foods].sort(() => Math.random()-.5);
  memoryOpen = [];
  memoryMatches = 0;
  memoryLocked = false;

  renderMemory();
}

function renderMemory() {
  const area = document.getElementById("puzzleGame");
  area.classList.remove("hidden");

  area.innerHTML = `
    <h2>🧠 Food Memory</h2>
    <p>Find all matching food pairs!</p>
    <div class="memory-grid">
      ${memoryCards.map((food,index) => `
        <button class="memory-tile"
          onclick="flipMemory(${index})"
          id="memory-${index}">
          ${memoryOpen.includes(index) ? food : "❔"}
        </button>
      `).join("")}
    </div>
    <p>Matches: ${memoryMatches} / 6</p>
  `;
}

function flipMemory(index) {
  if (memoryLocked || memoryOpen.includes(index)) return;

  const button = document.getElementById("memory-"+index);
  button.textContent = memoryCards[index];
  memoryOpen.push(index);

  if (memoryOpen.length === 2) {
    memoryLocked = true;

    const [a,b] = memoryOpen;

    if (memoryCards[a] === memoryCards[b]) {
      memoryMatches++;
      memoryOpen = [];
      memoryLocked = false;

      if (memoryMatches === 6) {
        setTimeout(() => {
          document.getElementById("puzzleGame").innerHTML =
            "<h2>🏆 Memory Master!</h2><p>All pairs matched!</p>";

          addXP(30,"Memory completed!");
          completeMission("memory");
          game.puzzlesWon++;
          checkAchievements();
        },300);
      } else {
        renderMemory();
      }
    } else {
      setTimeout(() => {
        memoryOpen = [];
        memoryLocked = false;
        renderMemory();
      },900);
    }
  }
}

// =====================================
// PUZZLE 3 - RECIPE ORDER
// =====================================

const correctSteps = [
  "Wash the vegetables.",
  "Chop the vegetables.",
  "Heat olive oil in a pan.",
  "Cook the vegetables.",
  "Season and serve."
];

function startOrder() {
  showSection("puzzles");

  const shuffled = [...correctSteps].sort(() => Math.random()-.5);
  const area = document.getElementById("puzzleGame");
  area.classList.remove("hidden");

  area.innerHTML = `
    <h2>📋 Recipe Order Challenge</h2>
    <p>Arrange the cooking steps in the correct order.</p>
    <div id="orderOptions">
      ${shuffled.map((step,index) => `
        <button onclick="selectOrder(${index})"
          id="order-${index}">${step}</button>
      `).join("")}
    </div>
    <p id="orderResult"></p>
  `;

  window.orderShuffled = shuffled;
  window.orderSelected = [];
}

function selectOrder(index) {
  if (window.orderSelected.includes(index)) return;

  window.orderSelected.push(index);

  const button = document.getElementById("order-"+index);
  button.classList.add("correct");
  button.disabled = true;

  if (window.orderSelected.length === correctSteps.length) {
    const result = window.orderSelected.map(i => window.orderShuffled[i]);
    const success = result.every((step,i) => step === correctSteps[i]);

    document.getElementById("orderResult").textContent =
      success ? "🎉 Perfect! All steps are correct!" :
      "Not quite! Try again to learn the correct sequence.";

    if (success) {
      addXP(40,"Recipe order completed!");
      completeMission("order");
      game.puzzlesWon++;
      checkAchievements();
    } else {
      setTimeout(startOrder,2000);
    }
  }
}

// =====================================
// DAILY MISSIONS
// =====================================

function renderMissions() {
  const area = document.getElementById("missionList");

  area.innerHTML = missions.map(mission => {
    const completed = game.completedMissions.includes(mission.id);

    return `
      <div class="mission-card">
        <div>
          <h3>${completed ? "✅ " : "🎯 "}${mission.title}</h3>
          <p>${mission.description}</p>
          <small>Reward: ⭐ ${mission.reward} XP</small>
        </div>
        <button ${completed ? "disabled" : ""}
          onclick="claimMission('${mission.id}')">
          ${completed ? "Completed" : "View Mission"}
        </button>
      </div>
    `;
  }).join("");
}

function completeMission(id) {
  if (!game.completedMissions.includes(id)) {
    game.completedMissions.push(id);
    renderMissions();
    saveGame();
  }
}

function claimMission(id) {
  const conditions = {
    cook:game.cookedRecipes.length > 0,
    create:game.recipesCreated > 0,
    quiz:game.completedMissions.includes("quiz"),
    memory:game.completedMissions.includes("memory"),
    order:game.completedMissions.includes("order")
  };

  if (!conditions[id]) {
    showToast("Complete the challenge first!");
    return;
  }

  showToast("Mission already rewarded or completed!");
}

// =====================================
// ACHIEVEMENTS
// =====================================

const achievements = [
  {id:"first",name:"First Steps",icon:"🌱",description:"Reach Level 2",check:()=>game.level>=2},
  {id:"chef",name:"Master Chef",icon:"👩‍🍳",description:"Reach Level 5",check:()=>game.level>=5},
  {id:"creator",name:"Creative Mind",icon:"🎨",description:"Create a recipe",check:()=>game.recipesCreated>=1},
  {id:"cook",name:"Cooking Star",icon:"🍳",description:"Complete 3 recipes",check:()=>game.cookedRecipes.length>=3},
  {id:"puzzle",name:"Puzzle Genius",icon:"🧩",description:"Complete a puzzle",check:()=>game.puzzlesWon>=1},
  {id:"legend",name:"Legendary Chef",icon:"👑",description:"Reach Level 10",check:()=>game.level>=10}
];

function checkAchievements() {
  achievements.forEach(item => {
    if (item.check() && !game.achievements.includes(item.id)) {
      game.achievements.push(item.id);
      showToast("🏆 New Achievement: "+item.name);
    }
  });

  renderAchievements();
  saveGame();
}

function renderAchievements() {
  const area = document.getElementById("achievementList");

  area.innerHTML = achievements.map(item => {
    const unlocked = game.achievements.includes(item.id);

    return `
      <div class="achievement-item ${unlocked ? "" : "locked"}">
        <span>${item.icon}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <small>${unlocked ? "Unlocked ✓" : "Locked 🔒"}</small>
      </div>
    `;
  }).join("");
}

// =====================================
// SECURITY AND SAVE
// =====================================

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  })[char]);
}

window.addEventListener("beforeunload",saveGame);

initializeGame();
