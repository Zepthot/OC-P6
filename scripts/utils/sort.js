function sortMedia(medias, criteria) {
  let sortedMedias = [...medias]; // Copie pour éviter de modifier l'original

  if (criteria === 'popularity') {
    sortedMedias.sort((a, b) => b.likes - a.likes);
  } else if (criteria === 'date') {
    sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (criteria === 'title') {
    sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sortedMedias;
}
