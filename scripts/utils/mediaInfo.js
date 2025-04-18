function createMediaInfo(media) {
  const info = document.createElement('div');
  info.classList.add('media-info');

  const title = document.createElement('p');
  title.classList.add('media-title');
  title.textContent = media.title;

  const likeContainer = document.createElement('span');
  likeContainer.classList.add('media-like');

  const likeCount = document.createElement('span');
  likeCount.textContent = media.likes;
  likeCount.classList.add('like-count');

  const likeIcon = document.createElement('i');
  likeIcon.classList.add('fas', 'fa-heart');
  likeIcon.setAttribute('aria-label', 'likes');
  likeIcon.tabIndex = 0;

  likeIcon.addEventListener('click', () => {
    media.likes++;
    likeCount.textContent = media.likes;
    const totalLikes = document.getElementById('total-likes');
    totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
  });

  likeIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      likeIcon.click();
    }
  });

  likeContainer.appendChild(likeCount);
  likeContainer.appendChild(likeIcon);
  info.appendChild(title);
  info.appendChild(likeContainer);

  return info;
}
