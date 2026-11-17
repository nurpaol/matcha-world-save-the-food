<div style="margin-top:18px">
        <label>Chef Nickname</label>
        <input id="nickname-input" maxlength="18" value="${escapeHTML(player.nickname)}" placeholder="Enter your chef name">
        <button class="primary-button" data-action="save-profile">Save Profile</button>
      </div>
    </section>`;
}

function chooseAvatar(index) {
  if (!avatarOptions[index]) return;
  player.avatar = index;
  notify(`${avatarOptions[index].name} selected!`);
  renderCharacter();
  renderPlayer();
  saveGame();
}

function saveProfile() {
  const input = $("nickname-input");
  if (!input) return;

  const nickname = input.value.trim();
  if (!nickname) {
    notify("Please enter a nickname.");
    return;
  }

  player.nickname = nickname.slice(0, 18);
  notify("Chef profile saved!");
  logActivity(`${player.nickname} updated their chef profile.`, "👩‍🍳");
  renderCharacter();
  renderPlayer();
  saveGame();
}

/* -------------------- NAVIGATION -------------------- */

function showPage(pageName) {
  const pages = document.querySelectorAll("[data-page]");
  pages.forEach(page => {
    page.hidden = page.dataset.page !== pageName;
    page.classList.toggle("active", page.dataset.page === pageName);
  });

  document.querySelectorAll("[data-nav]").forEach(button => {
    button.classList.toggle("active", button.dataset.nav === pageName);
  });

  const titles = {
    dashboard: "Dashboard",
    restaurant: "Restaurant",
    kitchen: "Kitchen",
    inventory: "Ingredients & Inventory",
    recipes: "Recipe Collection",
    orders: "Customers & Orders",
    suppliers: "Suppliers",
    finance: "Finance & Analytics",
    sustainability: "Sustainability",
    achievements: "Achievements",
    character: "My Chef Profile"
  };

  const heading = $("page-title");
  if (heading) heading.textContent = titles[pageName] || "Freshopia";

  if (pageName === "character") renderCharacter();
  if (pageName === "inventory") renderInventory();
  if (pageName === "recipes") renderRecipes();
  if (pageName === "orders") renderOrders();
  if (pageName === "suppliers") renderSuppliers();
  if (pageName === "finance") renderFinance();
  if (pageName === "sustainability") renderSustainability();
  if (pageName === "achievements") renderAchievements();

  document.body.classList.remove("sidebar-open");
}

/* -------------------- MODAL -------------------- */

function closeModal() {
  const modal = $("modal-container");
  if (modal) modal.classList.remove("open");
}

/* -------------------- RESTAURANT SCENE -------------------- */

function renderRestaurantScene() {
  const scene = $("restaurant-scene");
  if (!scene) return;

  scene.innerHTML = `
    <div class="restaurant-visual">
      <div class="restaurant-window">
        <div class="window-sky"></div>
        <div class="window-building"></div>
      </div>
      <div class="restaurant-interior">
        <div class="restaurant-light">✦</div>
        <div class="restaurant-counter">
          <span>FRESHOPIA</span>
        </div>
        <div class="restaurant-table table-one">
          <span>🍽️</span>
        </div>
        <div class="restaurant-table table-two">
          <span>🥗</span>
        </div>
        <div class="anime-chef-scene">
          <img src="${chefAvatar()}" alt="Your anime chef">
          <span>${escapeHTML(player.nickname)}</span>
        </div>
      </div>
    </div>
    <p class="scene-caption">Welcome to your restaurant, Chef!</p>
  `;
}

/* -------------------- GAME DAY -------------------- */

function nextDay() {
  player.day++;

  ingredients.forEach(item => {
    if (item.shelf > 0) {
      item.shelf--;
    }

    if (item.shelf <= 0 && item.quantity > 0) {
      const wasted = item.quantity;
      player.waste += wasted;
      item.quantity = 0;
      item.freshness = 0;
      logActivity(`${item.name} expired and was recorded as food waste.`, "⚠️");
    } else if (item.shelf <= 2) {
      item.freshness = Math.max(0, item.freshness - 12);
    }
  });

  notify(`Day ${player.day} has started!`);
  logActivity(`Started Day ${player.day}.`, "☀️");
  renderAll();
}

/* -------------------- SUPPLIER SHOP -------------------- */

function openSupplierShop(supplierIndex) {
  const supplier = supplierData[supplierIndex];
  if (!supplier) return;

  const products = ingredients.filter(item => {
    if (supplierIndex === 0) return ["vegetable", "fruit"].includes(item.category);
    if (supplierIndex === 1) return item.id === "salmon";
    if (supplierIndex === 2) return ["grain"].includes(item.category);
    return ["dairy"].includes(item.category);
  });

  $("modal-body").innerHTML = `
    <h3>${escapeHTML(supplier.name)}</h3>
    <p>${escapeHTML(supplier.type)}</p>
    <div class="shop-list">
      ${products.map(item => `
        <div class="objective-item">
          <div>
            <strong>${escapeHTML(item.name)}</strong>
            <small>${money(item.price)} per ${item.unit}</small>
          </div>
          <button class="primary-button"
            data-action="supplier-purchase"
            data-id="${item.id}">
            Buy
          </button>
        </div>
      `).join("")}
    </div>
  `;

  $("modal-container").classList.add("open");
}

/* -------------------- SEARCH & FILTERS -------------------- */

function setupFilters() {
  $("ingredient-search")?.addEventListener("input", renderInventory);
  $("ingredient-category")?.addEventListener("change", renderInventory);

  document.querySelectorAll("[data-recipe-filter]").forEach(button => {
    button.addEventListener("click", () => {
      currentRecipeFilter = button.dataset.recipeFilter;
      document.querySelectorAll("[data-recipe-filter]").forEach(item => {
        item.classList.toggle("active", item === button);
      });
      renderRecipes();
    });
  });
}

/* -------------------- EVENT SYSTEM -------------------- */

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    showPage(nav.dataset.nav);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  const id = actionButton.dataset.id;

  switch (action) {
    case "cook":
      cookRecipe(id);
      break;

    case "restock":
      purchaseIngredient(id, 2);
      break;

    case "new-order":
      generateOrder();
      break;

    case "serve-order":
      serveOrder(id);
      break;

    case "choose-avatar":
      chooseAvatar(Number(id));
      break;

    case "save-profile":
      saveProfile();
      break;

    case "add-ingredient":
      showAddIngredientModal();
      break;

    case "supplier-buy":
      openSupplierShop(Number(id));
      break;

    case "supplier-purchase":
      purchaseIngredient(id, 2);
      closeModal();
      break;

    case "next-day":
      nextDay();
      break;

    case "close-modal":
      closeModal();
      break;

    case "save-game":
      saveGame();
      notify("Your progress has been saved!");
      break;

    case "reset-game":
      if (confirm("Are you sure you want to reset your Freshopia game?")) {
        localStorage.removeItem(GAME_KEY);
        location.reload();
      }
      break;
  }
});

document.addEventListener("click", event => {
  if (event.target.matches("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("click", event => {
  const saveButton = event.target.closest("#save-new-ingredient");
  if (saveButton) addNewIngredient();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

/* -------------------- RENDER ENGINE -------------------- */

function renderAll() {
  renderPlayer();
  renderInventory();
  renderRecipes();
  renderOrders();
  renderObjectives();
  renderActivity();
  renderSuppliers();
  renderFinance();
  renderSustainability();
  renderAchievements();
  renderCharacter();
  renderRestaurantScene();
  saveGame();
}

/* -------------------- INITIALIZATION -------------------- */

function initializeFreshopia() {
  loadGame();

  setupFilters();
  renderAll();

  const welcome = $("welcome-screen");
  if (welcome) welcome.hidden = true;

  console.log("FRESHOPIA GAME ENGINE 2.0");
  console.log("Anime + Restaurant Simulation initialized.");
  console.log("Player:", player.nickname);
}

document.addEventListener("DOMContentLoaded", initializeFreshopia);
