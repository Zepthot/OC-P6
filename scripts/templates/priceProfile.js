function priceProfile(likes, price) {
  const likesElement = document.querySelector('.likes');
  const priceElement = document.querySelector('.price');

  if (likesElement && priceElement) {
    likesElement.innerHTML = `<span id="total-likes" class="like-count">${likes}</span><i class="fas fa-heart" aria-label="likes"></i>`;
    priceElement.textContent = `${price}€ / jour`;
  } else {
    console.error('Elements not found');
  }
}
