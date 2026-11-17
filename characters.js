/* FRESHOPIA - SHARED CHARACTER IMAGE SYSTEM */

const FRESHOPIA_CHARACTERS = [
  {
    id: "sakura",
    name: "Sakura",
    role: "Head Chef",
    description: "A cheerful chef who loves cooking.",
    level: 1,
    position: "0%"
  },
  {
    id: "hana",
    name: "Hana",
    role: "Organic Chef",
    description: "An expert in fresh and organic food.",
    level: 3,
    position: "33.333%"
  },
  {
    id: "yuki",
    name: "Yuki",
    role: "Premium Chef",
    description: "A specialist in premium recipes.",
    level: 5,
    position: "66.666%"
  },
  {
    id: "mika",
    name: "Mika",
    role: "Sustainability Expert",
    description: "A creative zero-waste chef.",
    level: 7,
    position: "100%"
  }
];

const CHARACTER_IMAGE = "assets/characters.png";
const CHARACTER_KEY = "freshopiaSelectedCharacter";

function getFreshopiaLevel() {
  try {
    const saved = JSON.parse(
      localStorage.getItem("freshopiaProfessional6")
    );
    return Number(saved?.level) || 1;
  } catch {
    return 1;
  }
}

function getFreshopiaSelected() {
  return localStorage.getItem(CHARACTER_KEY) || "sakura";
}

function selectFreshopiaCharacter(id) {
  const character = FRESHOPIA_CHARACTERS.find(c => c.id === id);
  if (!character) return;

  if (getFreshopiaLevel() < character.level) {
    alert(`Unlock ${character.name} at Level ${character.level}!`);
    return;
  }

  localStorage.setItem(CHARACTER_KEY, id);
  renderFreshopiaCharacters();

  alert(`${character.name} is now your chef!`);
}

function renderFreshopiaCharacters() {
  const container = document.getElementById("freshopia-characters");
  if (!container) return;

  const level = getFreshopiaLevel();
  const selected = getFreshopiaSelected();

  container.innerHTML = FRESHOPIA_CHARACTERS.map(c => {
    const unlocked = level >= c.level;
    const active = selected === c.id;

    return `
      <article class="fresh-character-card ${active ? "selected" : ""}">
        <div class="fresh-character-art"
             style="--character-position:${c.position}">
          <div class="character-crop"></div>
          ${!unlocked ? `<span class="character-lock">🔒 Level ${c.level}</span>` : ""}
        </div>

        <div class="fresh-character-info">
          <h3>${c.name}</h3>
          <p class="fresh-character-role">${c.role}</p>
          <p>${c.description}</p>

          <button
            class="character-select-button"
            ${!unlocked ? "disabled" : ""}
            onclick="selectFreshopiaCharacter('${c.id}')">
            ${active ? "✓ Selected" : unlocked ? "Choose Chef" : "Locked"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  renderActiveFreshopiaCharacter();
}

function renderActiveFreshopiaCharacter() {
  const container = document.getElementById("active-freshopia-character");
  if (!container) return;

  const character = FRESHOPIA_CHARACTERS.find(
    c => c.id === getFreshopiaSelected()
  );

  if (!character) return;

  container.innerHTML = `
    <div class="active-chef-display">
      <h3>Your Active Chef: ${character.name}</h3>
      <p>${character.role}</p>
      <div class="active-chef-image"
           style="--character-position:${character.position}">
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderFreshopiaCharacters();
});

window.addEventListener("freshopia:levelUp", () => {
  renderFreshopiaCharacters();
});

window.FreshopiaCharacters = {
  select: selectFreshopiaCharacter,
  refresh: renderFreshopiaCharacters,
  getSelected: getFreshopiaSelected
};
