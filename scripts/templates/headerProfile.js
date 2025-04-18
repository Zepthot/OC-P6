async function displayPhotographer(photographer) {
  document.querySelector('.photograph-header').innerHTML = `
      <div class="photographer-info">
          <h1 id='photographer_name' class='user-name'>${photographer.name}</h1>
          <p class='user-location'>${photographer.city}, ${photographer.country}</p>
          <p class='user-line'>${photographer.tagline}</p>
      </div>
      <button id="contact_button" class="contact_button" onclick="displayModal()">Contactez-moi</button>
      <img src="assets/photographers/${photographer.portrait}" class="user-picture" alt="${photographer.name}">
      <div class="likes-price">
          <span class="likes"></span>
          <span class="price"></span>
      </div>
  `;
}
