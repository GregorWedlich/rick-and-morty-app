import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters(curentPage) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${curentPage}`
    );
    if (!response.ok) {
      throw new Error(`Something went wrong with the API!`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(`Fetching error: ${error}`);
    cardContainer.innerHTML =
      '<p class="error-message">Could not load characters. Please try again later.</p>';

    return null;
  }
}

async function renderCharacter() {
  const characterData = await fetchCharacters(page);

  if (
    !characterData ||
    !characterData.results ||
    characterData.results.length === 0
  ) {
    console.log("No character data received or results array is empty.");
    return;
  }

  maxPage = characterData.info.pages;

  pagination.textContent = `${page} / ${maxPage}`;

  cardContainer.innerHTML = ""; // clear html
  characterData.results.forEach((character) => {
    const cardElement = createCharacterCard(character);
    cardContainer.append(cardElement);
  });

  prevButton.disabled = page === 1;
  nextButton.disabled = page === maxPage;
}

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;

    renderCharacter();
  }
});

prevButton.addEventListener("click", () => {
  if (page <= maxPage) {
    page--;

    renderCharacter();
  }
});

renderCharacter();
