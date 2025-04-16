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

// We fetch the API data and render the characters
async function fetchCharacters(curentPage, currentSearchQuery) {
  let apiUrl = `https://rickandmortyapi.com/api/character/?page=${curentPage}`; // Base URL

  // If a search query is provided, append it to the URL
  if (currentSearchQuery) {
    apiUrl += `&name=${currentSearchQuery}`;
  }

  try {
    const response = await fetch(`${apiUrl}`); // Fetching data from the API

    // Check if the response is ok
    if (!response.status === 404) {
      throw new Error(`Something went wrong with the API! 404`);
    }

    if (!response.ok) {
      throw new Error(`Something went wrong with the API!`);
    }

    const data = await response.json(); // Parsing the response data

    return data; // Return the data
  } catch (error) {
    console.log(`Fetching error: ${error}`);
    cardContainer.innerHTML =
      '<p class="error-message">Could not load characters. Please try again later.</p>';

    return null;
  }
}

// Render the Character Card
async function renderCharacter() {
  const characterData = await fetchCharacters(page, searchQuery); // Fetching data by ID or search query

  // Check if the data is valid
  if (
    !characterData ||
    !characterData.results ||
    characterData.results.length === 0
  ) {
    console.log("No character data received or results array is empty.");
    return;
  }

  maxPage = characterData.info.pages; // Get the total number of pages

  pagination.textContent = `${page} / ${maxPage}`; // Update pagination text

  cardContainer.innerHTML = ""; // Clear cards
  // Create and append character cards
  characterData.results.forEach((character) => {
    const cardElement = createCharacterCard(character);
    cardContainer.append(cardElement);
  });

  // Disable buttons if on first or last page
  prevButton.disabled = page === 1; // Disable by setting the disabled property
  nextButton.disabled = page === maxPage;
}

// Pagination Buttons
nextButton.addEventListener("click", () => {
  // Check if the current page is less than the maximum page
  if (page < maxPage) {
    page++; // Increment the page number

    renderCharacter(); // Call the renderCharacter function to update the displayed characters
  }
});

prevButton.addEventListener("click", () => {
  if (page <= maxPage) {
    page--; // Decrement the page number

    renderCharacter();
  }
});

// Search Bar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData(event.target); // Get the form data from the event target
  const newSearchQuery = formData.get("query").trim(); // Get the value of the "query" input field and trim whitespace

  searchQuery = newSearchQuery; // Update the search query state
  page = 1; // Reset the page to 1 when a new search is made
  renderCharacter(); // Call the renderCharacter function to update the displayed characters
});

// Initial render
renderCharacter(); // Call the renderCharacter function to display the initial characters
