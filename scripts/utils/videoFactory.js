function createVideoMedia(media) {
  function getDOM() {
    const article = document.createElement('article');
    article.classList.add('media-card');

    const video = document.createElement('video');
    video.classList.add('media-video');
    video.muted = true;
    video.playInline = true;

    const source = document.createElement('source');
    source.src = `assets/videos/${media.video}`;
    source.type = 'video/mp4';
    video.appendChild(source);

    const info = createMediaInfo(media);
    article.appendChild(video);
    article.appendChild(info);

    return article;
  }

  return { getDOM };
}
