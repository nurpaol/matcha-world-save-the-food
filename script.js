
/* =====================================================
   MATCHA WORLD: SAVE THE FOOD
   ULTIMATE GAME ENGINE 4.0
===================================================== */

/* -----------------------------
   1. GAME DATA
----------------------------- */

const GAME_KEY = "matchaUltimateSave";

let selectedAvatar = "👩‍🍳";
let selectedIngredients = [];
let currentCustomer = null;

let player = {
    nickname: "Chef",
    avatar: "👩‍🍳",
    preference: "Sustainable Gastronomy"
};

let game = {
    points: 0,
    satisfaction: 100,
    waste: 0,
    completedOrders: 0,
    cash: 1500,
    stock: 30,
    ecoScore: 75,
    level: 1,
    experience: 0,
    totalIncome: 0,
    totalExpenses: 0,
    staff: [],
    upgrades: [],
    recycling: 70,
    water: 75,
    energy: 80,
    financeHistory: [],
    sound: true,
    music: false,
    day: 1
};

const ingredients = [
    { emoji: "🥑", name: "Avokado" },
    { emoji: "🥬", name: "Ispanak" },
    { emoji: "🍅", name: "Domates" },
    { emoji: "🥕", name: "Havuç" },
    { emoji: "🥒", name: "Salatalık" },
    { emoji: "🍟", name: "Patates Kızartması" }
];

const customers = [
    {
        name: "Emma",
        type: "Sağlıklı Beslenen",
        avatar: "👩🏻",
        recipe: "Healthy Green Bowl",
        ingredients: ["🥑", "🥬", "🍅"],
        reward: 500
    },
    {
        name: "Oliver",
        type: "VIP Müşteri",
        avatar: "👨🏻",
        recipe: "Premium Garden Bowl",
        ingredients: ["🥕", "🥒", "🥑"],
        reward: 800
    },
    {
        name: "Mia",
        type: "Genç Müşteri",
        avatar: "👩🏼",
        recipe: "Colorful Veggie Bowl",
        ingredients: ["🥕", "🍅", "🥒"],
        reward: 400
    },
    {
        name: "Lucas",
        type: "Gurme Müşteri",
        avatar: "👨🏽",
        recipe: "Chef's Special Bowl",
        ingredients: ["🥬", "🥒", "🥑"],
        reward: 650
    },
    {
        name: "Sophia",
        type: "Yoğun Müşteri",
        avatar: "👩🏽",
        recipe: "Fresh Energy Bowl",
        ingredients: ["🍅", "🥬", "🥕"],
        reward: 550
    }
];

const upgradeData = {
    stove: {
        name: "Profesyonel Ocak",
        price: 700,
        description: "Mutfak kapasitesini geliştirir."
    },
    tables: {
        name: "Yeni Masa Takımı",
        price: 500,
        description: "Müşteri kapasitesini artırır."
    },
    garden: {
        name: "Organik Bahçe",
        price: 900,
        description: "Sürdürülebilirlik puanını artırır."
    }
};

const staffData = {
    chef: {
        name: "Aşçı",
        emoji: "👨‍🍳",
        salary: 180,
        description: "Mutfak verimliliğini artırır."
    },
    waiter: {
        name: "Garson",
        emoji: "🧑‍🍽️",
        salary: 120,
        description: "Müşteri memnuniyetini destekler."
    }
};

/* -----------------------------
   2. HELPER FUNCTIONS
----------------------------- */

function getElement(id) {
    return document.getElementById(id);
}

function setText(id, value) {
    const element = getElement(id);
    if (element) element.textContent = value;
}

function formatMoney(value) {
    return Math.floor(value).toLocaleString("tr-TR") + " ₺";
}

function addHistory(description, amount) {
    game.financeHistory.unshift({
        description,
        amount,
        day: game.day
    });

    game.financeHistory = game.financeHistory.slice(0, 20);
}

function showMessage(message, type = "success", target = "game-message") {
    const element = getElement(target);
    if (!element) return;

    element.textContent = message;
    element.className = "feedback-message " + type;
}

/* -----------------------------
   3. SCREEN NAVIGATION
----------------------------- */

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = getElement(screenId);

    if (!target) {
        console.warn("Ekran bulunamadı:", screenId);
        return;
    }

    target.classList.add("active");

    const nav = document.querySelector(".bottom-nav");

    if (nav) {
        nav.style.display =
            screenId === "welcome-screen" ||
            screenId === "profile-screen"
                ? "none"
                : "flex";
    }

    updateAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* -----------------------------
   4. PLAYER PROFILE
----------------------------- */

function selectAvatar(avatar, button) {
    selectedAvatar = avatar;

    document.querySelectorAll(".avatar").forEach(item => {
        item.classList.remove("selected");
    });

    if (button) {
        button.classList.add("selected");
    } else if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add("selected");
    }
}

function createPlayer() {
    const nicknameInput = getElement("nickname");
    const preferenceInput = getElement("preference");

    const nickname = nicknameInput
        ? nicknameInput.value.trim()
        : "";

    if (!nickname) {
        showMessage(
            "Lütfen şef adını gir.",
            "error",
            "profile-message"
        );
        return;
    }

    player = {
        nickname,
        avatar: selectedAvatar,
        preference: preferenceInput
            ? preferenceInput.value
            : "Sustainable Gastronomy"
    };

    saveGame();
    updateAll();
    showScreen("dashboard-screen");
}

function updatePlayer() {
    setText("player-welcome", "Hoş geldin, " + player.nickname);
    setText("dashboard-avatar", player.avatar);
}

/* -----------------------------
   5. CUSTOMER SYSTEM
----------------------------- */

function generateCustomerOrder() {
    const customer = customers[
        Math.floor(Math.random() * customers.length)
    ];

    currentCustomer = {
        ...customer,
        ingredients: [...customer.ingredients]
    };

    setText("customer-avatar", currentCustomer.avatar);
    setText("customer-name", currentCustomer.name);
    setText("customer-type", currentCustomer.type);
    setText("recipe-name", currentCustomer.recipe);
    setText(
        "customer-request",
        "Sipariş: " + currentCustomer.ingredients.join(" + ")
    );
    setText("order-reward", formatMoney(currentCustomer.reward));

    selectedIngredients = [];
    updateSelectedIngredients();
}

function startGame() {
    if (!player.nickname || player.nickname === "Chef") {
        showScreen("profile-screen");
        return;
    }

    if (!currentCustomer) {
        generateCustomerOrder();
    }

    selectedIngredients = [];
    updateSelectedIngredients();
    showScreen("game-screen");
}

/* -----------------------------
   6. INGREDIENT SELECTION
----------------------------- */

function chooseIngredient(button, ingredient) {
    // Eski kullanım biçimleriyle de çalışabilmesi için
    if (typeof button === "string" && ingredient === undefined) {
        ingredient = button;
        button = null;
    }

    if (!ingredient) return;

    const index = selectedIngredients.indexOf(ingredient);

    if (index !== -1) {
        selectedIngredients.splice(index, 1);
    } else {
        if (selectedIngredients.length >= 3) {
            showMessage("En fazla 3 malzeme seçebilirsin.", "error");
            return;
        }

        selectedIngredients.push(ingredient);
    }

    updateSelectedIngredients();
}

function updateSelectedIngredients() {
    setText(
        "selected-count",
        selectedIngredients.length + " / 3 seçildi"
    );

    document.querySelectorAll(".ingredient-list button").forEach(button => {
        const buttonText = button.textContent;

        const selected = selectedIngredients.some(item =>
            buttonText.includes(item)
        );

        button.classList.toggle("selected", selected);
    });
}

/* -----------------------------
   7. ORDER SYSTEM
----------------------------- */

function serveOrder() {
    if (!currentCustomer) {
        showMessage("Önce bir müşteri siparişi oluştur.", "error");
        return;
    }

    if (selectedIngredients.length !== 3) {
        showMessage("Lütfen 3 malzeme seç.", "error");
        return;
    }

    if (game.stock < 3) {
        showMessage("Stok yetersiz! Önce marketten malzeme al.", "error");
        return;
    }

    const correct = currentCustomer.ingredients.every(item =>
        selectedIngredients.includes(item)
    );

    game.stock -= 3;

    if (correct) {
        let reward = currentCustomer.reward;

        const chefCount = game.staff.filter(
            person => person === "chef"
        ).length;

        const waiterCount = game.staff.filter(
            person => person === "waiter"
        ).length;

        reward += chefCount * 25;
        reward += waiterCount * 15;

        game.cash += reward;
        game.totalIncome += reward;
        game.points += 100;
        game.completedOrders += 1;
        game.experience += 50;

        game.satisfaction = Math.min(
            100,
            game.satisfaction + 3 + waiterCount
        );

        game.ecoScore = Math.min(100, game.ecoScore + 1);

        addHistory("Başarılı müşteri siparişi", reward);

        showMessage(
            "Harika! Sipariş doğru hazırlandı. +" +
            formatMoney(reward),
            "success"
        );

        checkLevelUp();

    } else {
        game.waste += 3;
        game.points = Math.max(0, game.points - 20);
        game.satisfaction = Math.max(
            0,
            game.satisfaction - 8
        );
        game.ecoScore = Math.max(0, game.ecoScore - 2);

        showMessage(
            "Sipariş yanlış! Malzemeler israf edildi.",
            "error"
        );
    }

    selectedIngredients = [];
    updateAll();
    saveGame();

    setTimeout(() => {
        generateCustomerOrder();
        updateAll();
    }, 1200);
}

/* -----------------------------
   8. LEVEL SYSTEM
----------------------------- */

function checkLevelUp() {
    while (game.experience >= game.level * 200) {
        game.experience -= game.level * 200;
        game.level += 1;
        game.cash += 300;
        game.totalIncome += 300;

        addHistory("Seviye ödülü", 300);
    }
}

/* -----------------------------
   9. MARKET SYSTEM
----------------------------- */

function buyIngredients(amount, cost) {
    if (game.cash < cost) {
        showMessage(
            "Yeterli paran yok.",
            "error",
            "supply-message"
        );
        return;
    }

    if (game.stock + amount > 100) {
        showMessage(
            "Depo kapasitesi 100 birim. Önce stoklarını kullan.",
            "error",
            "supply-message"
        );
        return;
    }

    game.cash -= cost;
    game.stock += amount;
    game.totalExpenses += cost;

    addHistory("Malzeme satın alımı", -cost);

    showMessage(
        amount + " birim malzeme satın alındı.",
        "success",
        "supply-message"
    );

    updateAll();
    saveGame();
}

/* -----------------------------
   10. STAFF MANAGEMENT
----------------------------- */

function hireStaff(type) {
    const staff = staffData[type];

    if (!staff) return;

    const hiringCost = staff.salary * 2;

    if (game.cash < hiringCost) {
        showMessage("Personel almak için yeterli paran yok.", "error");
        return;
    }

    if (game.staff.length >= 6) {
        showMessage("En fazla 6 personel çalıştırabilirsin.", "error");
        return;
    }

    game.cash -= hiringCost;
    game.totalExpenses += hiringCost;
    game.staff.push(type);

    addHistory(staff.name + " işe alındı", -hiringCost);

    showMessage(staff.name + " ekibine katıldı!");

    updateAll();
    saveGame();
}

function renderStaff() {
    const list = getElement("staff-list");
    if (!list) return;

    if (game.staff.length === 0) {
        list.innerHTML = "<p>Henüz personel çalıştırmıyorsun.</p>";
        return;
    }

    list.innerHTML = game.staff.map((type, index) => {
        const staff = staffData[type];

        return `
            <div class="staff-card">
                <span>${staff.emoji}</span>
                <div>
                    <h3>${staff.name} #${index + 1}</h3>
                    <p>${staff.description}</p>
                    <strong>${formatMoney(staff.salary)} / gün</strong>
                </div>
            </div>
        `;
    }).join("");
}

/* -----------------------------
   11. RESTAURANT UPGRADES
----------------------------- */

function purchaseUpgrade(type) {
    const upgrade = upgradeData[type];

    if (!upgrade) return;

    if (game.upgrades.includes(type)) {
        showMessage("Bu geliştirmeye zaten sahipsin.", "error");
        return;
    }

    if (game.cash < upgrade.price) {
        showMessage("Bu geliştirme için yeterli paran yok.", "error");
        return;
    }

    game.cash -= upgrade.price;
    game.totalExpenses += upgrade.price;
    game.upgrades.push(type);

    if (type === "garden") {
        game.ecoScore = Math.min(100, game.ecoScore + 15);
    }

    if (type === "tables") {
        game.satisfaction = Math.min(100, game.satisfaction + 5);
    }

    addHistory(upgrade.name + " satın alındı", -upgrade.price);

    showMessage(upgrade.name + " başarıyla satın alındı.");

    updateAll();
    saveGame();
}

/* -----------------------------
   12. FINANCE SYSTEM
----------------------------- */

function renderFinance() {
    setText("finance-cash", formatMoney(game.cash));
    setText("total-income", formatMoney(game.totalIncome));
    setText("total-expenses", formatMoney(game.totalExpenses));

    const profit = game.totalIncome - game.totalExpenses;

    setText("net-profit", formatMoney(profit));

    const history = getElement("finance-history");
    if (!history) return;

    if (game.financeHistory.length === 0) {
        history.innerHTML = "<p>Henüz finansal işlem bulunmuyor.</p>";
        return;
    }

    history.innerHTML = game.financeHistory.map(item => `
        <div class="finance-entry">
            <span>${item.description} · Gün ${item.day}</span>
            <strong style="color:${item.amount >= 0 ? '#438354' : '#C66D5B'}">
                ${item.amount >= 0 ? "+" : ""}
                ${formatMoney(item.amount)}
            </strong>
        </div>
    `).join("");
}

/* -----------------------------
   13. DAILY OPERATIONS
----------------------------- */

function endBusinessDay() {
    const salary = game.staff.reduce((total, type) => {
        return total + staffData[type].salary;
    }, 0);

    const rent = 100;
    const dailyExpenses = salary + rent;

    game.cash -= dailyExpenses;
    game.totalExpenses += dailyExpenses;
    game.day += 1;

    addHistory("Günlük işletme giderleri", -dailyExpenses);

    game.satisfaction = Math.max(
        0,
        game.satisfaction - (game.stock === 0 ? 10 : 0)
    );

    updateAll();
    saveGame();

    showMessage(
        "Yeni gün başladı. Günlük gider: " +
        formatMoney(dailyExpenses),
        "success"
    );
}

/* -----------------------------
   14. SUSTAINABILITY SYSTEM
----------------------------- */

function updateEcoSystem() {
    const eco = Math.round(
        (game.ecoScore + game.recycling + game.water + game.energy) / 4
    );

    game.ecoScore = Math.max(0, Math.min(100, game.ecoScore));

    setText("eco-dashboard-score", game.ecoScore + " / 100");
    setText("eco-waste", game.waste);
    setText("recycling-score", game.recycling + " / 100");
    setText("water-score", game.water + " / 100");
    setText("energy-score", game.energy + " / 100");
}

function recycleWaste() {
    if (game.waste <= 0) {
        showMessage("Geri dönüştürülecek atık bulunmuyor.", "error");
        return;
    }

    const recycled = Math.min(5, game.waste);

    game.waste -= recycled;
    game.recycling = Math.min(100, game.recycling + 5);
    game.ecoScore = Math.min(100, game.ecoScore + 3);

    updateAll();
    saveGame();

    showMessage(recycled + " birim atık geri dönüştürüldü.");
}

/* -----------------------------
   15. REPORT SYSTEM
----------------------------- */

function renderReport() {
    setText("report-orders", game.completedOrders);
    setText("report-points", game.points);
    setText("report-satisfaction", game.satisfaction + "%");
    setText("report-eco", game.ecoScore + "/100");
}

/* -----------------------------
   16. INVENTORY
----------------------------- */

function renderInventory() {
    setText("inventory-total", game.stock + " / 100");

    const list = getElement("inventory-list");
    if (!list) return;

    list.innerHTML = ingredients.map(item => `
        <div class="inventory-item">
            <strong>${item.emoji} ${item.name}</strong>
            <span> Depo stoğu: ${game.stock} birim genel stok</span>
        </div>
    `).join("");
}

/* -----------------------------
   17. KITCHEN
----------------------------- */

function renderKitchen() {
    const recipeList = getElement("recipe-list");
    const orders = getElement("kitchen-orders");

    if (recipeList) {
        recipeList.innerHTML = customers.map(customer => `
            <div class="management-item">
                <span>🥗 ${customer.recipe}</span>
                <strong>${formatMoney(customer.reward)}</strong>
            </div>
        `).join("");
    }

    if (orders) {
        orders.innerHTML = currentCustomer
            ? `<div class="management-item">
                <span>${currentCustomer.name}</span>
                <strong>${currentCustomer.recipe}</strong>
               </div>`
            : "<p>Şu anda aktif sipariş yok.</p>";
    }
}

/* -----------------------------
   18. SETTINGS
----------------------------- */

function toggleSound() {
    game.sound = !game.sound;
    setText("sound-toggle", game.sound ? "Açık" : "Kapalı");
    saveGame();
}

function toggleMusic() {
    game.music = !game.music;
    setText("music-toggle", game.music ? "Açık" : "Kapalı");
    saveGame();
}

/* -----------------------------
   19. SAVE SYSTEM
----------------------------- */

function saveGame() {
    try {
        const saveData = {
            version: 4,
            player,
            game
        };

        localStorage.setItem(
            GAME_KEY,
            JSON.stringify(saveData)
        );

        return true;
    } catch (error) {
        console.error("Kayıt hatası:", error);
        return false;
    }
}

function loadGame() {
    try {
        const saved = localStorage.getItem(GAME_KEY);

        if (!saved) {
            showMessage("Kayıtlı oyun bulunamadı.", "error");
            return;
        }

        const data = JSON.parse(saved);

        if (!data || !data.game || !data.player) {
            throw new Error("Kayıt dosyası geçersiz.");
        }

        player = { ...player, ...data.player };
        game = { ...game, ...data.game };

        updateAll();
        showScreen("dashboard-screen");

        showMessage("Kayıt başarıyla yüklendi.");

    } catch (error) {
        console.error("Yükleme hatası:", error);
        showMessage("Kayıt yüklenemedi.", "error");
    }
}

/* -----------------------------
   20. UPDATE ALL INTERFACES
----------------------------- */

function updateAll() {
    updatePlayer();

    setText("points", game.points);
    setText("satisfaction", game.satisfaction + "%");
    setText("waste", game.waste);

    setText("cash", formatMoney(game.cash));
    setText("stock", game.stock);
    setText("eco-score", game.ecoScore);
    setText("completed-orders", game.completedOrders);

    setText("header-level", game.level);
    setText("market-cash", formatMoney(game.cash));

    setText("level", game.level);

    setText(
        "experience-text",
        game.experience + " / " + (game.level * 200) + " XP"
    );

    const progress = getElement("experience-progress");

    if (progress) {
        progress.style.width =
            Math.min(100, game.experience / (game.level * 200) * 100) + "%";
    }

    renderStaff();
    renderFinance();
    renderInventory();
    renderKitchen();
    renderReport();
    updateEcoSystem();

    setText("sound-toggle", game.sound ? "Açık" : "Kapalı");
    setText("music-toggle", game.music ? "Açık" : "Kapalı");
}

/* -----------------------------
   21. INITIALIZATION
----------------------------- */

function initializeGame() {
    updateAll();

    const saved = localStorage.getItem(GAME_KEY);

    if (saved) {
        try {
            const data = JSON.parse(saved);

            if (data.player && data.game) {
                player = { ...player, ...data.player };
                game = { ...game, ...data.game };
                updateAll();
            }
        } catch (error) {
            console.error("Kayıt okunamadı:", error);
        }
    }

    const activeScreen = document.querySelector(".screen.active");

    if (!activeScreen) {
        showScreen("welcome-screen");
    }

    if (!currentCustomer) {
        generateCustomerOrder();
    }

    updateAll();
}

document.addEventListener("DOMContentLoaded", initializeGame);
