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
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character`);
    if (!response.ok) {
      throw `Something went wrong with the API!`;
    }
    const data = await response.json();
    // check if api is ok
    // console.log(`Name: ${data.results[7].name}`);
    // console.log(`ID: ${data.results[7].id}`);

    return data;
  } catch (error) {
    console.log(`Fetching error: ${error}`);
  }
}
