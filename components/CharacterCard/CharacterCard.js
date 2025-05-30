export function createCharacterCard(character) {
  const listItem = document.createElement("li"); // Create a new list item
  listItem.classList.add("card"); // Add the class "card" to the list item

  // Set the inner HTML of the list item with the character data
  listItem.innerHTML = `
      <div class="card__image-container">
          <img
              class="card__image"
              src="${character.image}" 
              alt="${character.name}"
          />
          <div class="card__image-gradient"></div>
      </div>
      <div class="card__content">
          <h2 class="card__title">${character.name}</h2>
           <dl class="card__info">
               <dt class="card__info-title">Status</dt>
               <dd class="card__info-description">${character.status}</dd>
               <dt class="card__info-title">Type</dt>
               <dd class="card__info-description">${character.species}</dd>
               <dt class="card__info-title">Occurrences</dt>
               <dd class="card__info-description">${character.episode.length}</dd>
           </dl>
      </div>
    `;

  return listItem; // Return the list item
}
