/* =====================================================
   FRESHOPIA — ANIME CHARACTER SYSTEM
   Character selection, levels and unlocks
===================================================== */

const FRESHOPIA_CHARACTERS = [
  {
    id: "sakura",
    name: "Sakura",
    role: "Head Chef",
    description: "A cheerful chef who loves creating beautiful dishes.",
    avatar: "🌸",
    color: "#f4b5cc",
    unlockLevel: 1,
    bonus: "Extra cooking experience"
  },
  {
    id: "hana",
    name: "Hana",
    role: "Organic Chef",
    description: "An expert in fresh ingredients and sustainable cooking.",
    avatar: "🌿",
    color: "#a9d5ae",
    unlockLevel: 3,
    bonus: "Better ingredient efficiency"
  },
  {
    id: "yuki",
    name: "Yuki",
    role: "Premium Chef",
    description: "A talented chef specializing in premium recipes.",
    avatar: "❄️",
    color: "#c9c0e9",
    unlockLevel: 5,
    bonus: "Premium recipe bonus"
  },
  {
    id: "mika",
    name: "Mika",
    role: "Sustainability Expert",
    description: "A creative chef who believes in a zero-waste kitchen.",
    avatar: "🌷",
    color: "#edbfd3",
    unlockLevel: 7,
    bonus: "More sustainability points"
  }
];

const CHARACTER_STORAGE_KEY = "freshopiaSelectedCharacter";

function getFreshopiaPlayerLevel() {
  try {
    const player = JSON.parse(
      localStorage.getItem("freshopiaProfessional6")
    );

    return Number(player?.level) || 1;
  } catch {
    return 1;
  }
}

function getSelectedCharacter() {
  return localStorage.getItem(CHARACTER_STORAGE_KEY) || "sakura";
}

function selectFreshopiaCharacter(characterId) {
  const character = FRESHOPIA_CHARACTERS.find(
    item => item.id === characterId
  );

  if (!character) return;

  const level = getFreshopiaPlayerLevel();

  if (level < character.unlockLevel) {
    if (typeof showNotification === "function") {
      showNotification(
        `Unlock ${character.name} at level ${character.unlockLevel}!`
      );
    }
    return;
  }

  localStorage.setItem(CHARACTER_STORAGE_KEY, characterId);

  renderFreshopiaCharacters();

  if (typeof showNotification === "function") {
    showNotification(`${character.name} is now your chef!`);
  }
}

function renderFreshopiaCharacters() {
  const container = document.getElementById("freshopia-characters");

  if (!container) return;

  const level = getFreshopiaPlayerLevel();
  const selected = getSelectedCharacter();

  container.innerHTML = FRESHOPIA_CHARACTERS.map(character => {
    const unlocked = level >= character.unlockLevel;
    const active = selected === character.id;

    return `
      <article
        class="fresh-character-card ${active ? "selected" : ""} ${!unlocked ? "locked" : ""}"
        style="--character-color:${character.color}"
      >
        <div class="fresh-character-art">
          <div class="fresh-character-glow"></div>
          <span class="fresh-character-avatar">${character.avatar}</span>
          ${!unlocked ? `
            <span class="fresh-character-lock">
              🔒 Level ${character.unlockLevel}
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
            class="primary-btn"
            ${!unlocked ? "disabled" : ""}
            onclick="selectFreshopiaCharacter('${character.id}')"
          >
            ${active ? "Selected ✓" : unlocked ? "Choose Chef" : "Locked"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderActiveFreshopiaCharacter() {
  const character = FRESHOPIA_CHARACTERS.find(
    item => item.id === getSelectedCharacter()
  );

  const container = document.getElementById("active-freshopia-character");

  if (!container || !character) return;

  container.innerHTML = `
    <div class="active-chef-display" style="--character-color:${character.color}">
      <span class="active-chef-avatar">${character.avatar}</span>
      <div>
        <strong>${character.name}</strong>
        <p>${character.role}</p>
        <small>Your Freshopia chef</small>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderFreshopiaCharacters();
  renderActiveFreshopiaCharacter();
});
