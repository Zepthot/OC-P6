function displayMedia(medias) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  medias.forEach((media) => {
    const mediaComponent = mediaFactory(media);
    const mediaCard = mediaComponent.getDOM();
    gallery.appendChild(mediaCard);
  });
  setupLightbox(medias);
}
