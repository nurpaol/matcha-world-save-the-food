/* =====================================================
   FRESHOPIA — CHARACTER COLLECTION 2.0
===================================================== */

const FRESHOPIA_CHARACTERS = [
  {
    id: "sakura",
    name: "Sakura",
    role: "Head Chef",
    description: "A cheerful chef who loves creating beautiful dishes.",
    image: "assets/characters/sakura.png",
    color: "#f6b2cc",
    unlockLevel: 1,
    bonus: "+20% Cooking Experience"
  },
  {
    id: "hana",
    name: "Hana",
    role: "Organic Chef",
    description: "An expert in fresh ingredients and sustainable cooking.",
    image: "assets/characters/hana.png",
    color: "#a9d5ae",
    unlockLevel: 3,
    bonus: "+15% Ingredient Efficiency"
  },
  {
    id: "yuki",
    name: "Yuki",
    role: "Premium Chef",
    description: "A talented chef specializing in premium recipes.",
    image: "assets/characters/yuki.png",
    color: "#c9c0e9",
    unlockLevel: 5,
    bonus: "+15% Premium Recipe Rewards"
  },
  {
    id: "mika",
    name: "Mika",
    role: "Sustainability Expert",
    description: "A creative chef who believes in a zero-waste kitchen.",
    image: "assets/characters/mika.png",
    color: "#edbfd3",
    unlockLevel: 7,
    bonus: "+20% Sustainability Points"
  }
];

const FRESHOPIA_CHARACTER_KEY = "freshopiaSelectedCharacter";

function freshopiaGetLevel() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("freshopiaProfessional6")
    );

    return Number(saved?.level) || 1;
  } catch {
    return 1;
  }
}

function freshopiaGetSelected() {
  return localStorage.getItem(FRESHOPIA_CHARACTER_KEY) || "sakura";
}

function freshopiaNotify(message) {
  if (typeof window.showNotification === "function") {
    window.showNotification(message);
  } else {
    console.info("[Freshopia]", message);
  }
}

function selectFreshopiaCharacter(id) {
  const character = FRESHOPIA_CHARACTERS.find(
    item => item.id === id
  );

  if (!character) return;

  if (freshopiaGetLevel() < character.unlockLevel) {
    freshopiaNotify(
      `Reach Level ${character.unlockLevel} to unlock ${character.name}!`
    );
    return;
  }

  localStorage.setItem(FRESHOPIA_CHARACTER_KEY, id);

  renderFreshopiaCharacters();
  freshopiaNotify(`${character.name} is now your active chef!`);

  window.dispatchEvent(
    new CustomEvent("freshopia:characterChanged", {
      detail: character
    })
  );
}

function renderFreshopiaCharacters() {
  const container = document.getElementById("freshopia-characters");

  if (!container) return;

  const level = freshopiaGetLevel();
  const selected = freshopiaGetSelected();

  container.innerHTML = FRESHOPIA_CHARACTERS.map(character => {
    const unlocked = level >= character.unlockLevel;
    const active = selected === character.id;

    return `
      <article
        class="fresh-character-card
          ${active ? "selected" : ""}
          ${!unlocked ? "locked" : ""}"
        style="--character-color:${character.color}"
      >
        <div class="fresh-character-art">
          <img
            src="${character.image}"
            alt="${character.name}, ${character.role}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='grid';"
          >

          <div class="character-image-fallback">
            ${character.name}
          </div>

          ${active ? `
            <span class="character-status">ACTIVE ✓</span>
          ` : ""}

          ${!unlocked ? `
            <span class="character-lock">
              🔒 LEVEL ${character.unlockLevel}
            </span>
          ` : ""}
        </div>

        <div class="fresh-character-info">
          <h3>${character.name}</h3>
          <p class="fresh-character-role">${character.role}</p>
          <p class="fresh-character-description">
            ${character.description}
          </p>

          <div class="fresh-character-bonus">
            ✨ ${character.bonus}
          </div>

          <button
            class="character-select-button"
            ${!unlocked ? "disabled" : ""}
            onclick="selectFreshopiaCharacter('${character.id}')"
          >
            ${
              active
                ? "✓ Selected"
                : unlocked
                  ? "Choose Chef"
                  : `Unlock at Level ${character.unlockLevel}`
            }
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderFreshopiaActiveChef() {
  const container = document.getElementById(
    "active-freshopia-character"
  );

  if (!container) return;

  const character = FRESHOPIA_CHARACTERS.find(
    item => item.id === freshopiaGetSelected()
  );

  if (!character) return;

  container.innerHTML = `
    <div class="active-chef-display"
      style="--character-color:${character.color}">

      <img src="${character.image}"
        alt="${character.name}"
        onerror="this.style.display='none'">

      <div>
        <strong>${character.name}</strong>
        <p>${character.role}</p>
        <small>${character.bonus}</small>
      </div>
    </div>
  `;
}

function refreshFreshopiaCharacters() {
  renderFreshopiaCharacters();
  renderFreshopiaActiveChef();
}

document.addEventListener("DOMContentLoaded", () => {
  refreshFreshopiaCharacters();
});

window.addEventListener("freshopia:levelUp", () => {
  refreshFreshopiaCharacters();
});

window.FreshopiaCharacters = {
  all: FRESHOPIA_CHARACTERS,
  getSelected: freshopiaGetSelected,
  getLevel: freshopiaGetLevel,
  select: selectFreshopiaCharacter,
  refresh: refreshFreshopiaCharacters
};
