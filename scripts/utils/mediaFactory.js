function mediaFactory(media) {
  if (media.image) {
    return createImageMedia(media);
  } else if (media.video) {
    return createVideoMedia(media);
  } else {
    throw new Error('Type de média inconnu');
  }
}
