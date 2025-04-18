function createImageMedia(media) {
  function getDOM() {
    const article = document.createElement('article');
    article.classList.add('media-card');

    const img = document.createElement('img');
    img.src = `assets/images/${media.image}`;
    img.alt = media.title;
    img.classList.add('media-image');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${media.title}, ouvrir en grand`);

    const info = createMediaInfo(media);
    article.appendChild(img);
    article.appendChild(info);

    return article;
  }

  return { getDOM };
}
