// Récupère l'ID du photographe depuis l'URL
const params = new URLSearchParams(window.location.search);
const photographerId = parseInt(params.get('id'));

async function getPhotographersData() {
  const response = await fetch('/data/photographers.json');
  const data = await response.json();
  return data;
}

async function init() {
  const data = await getPhotographersData();

  const photographer = data.photographers.find((p) => p.id === photographerId);
  if (!photographer) {
    console.error('Photographe non trouvé !');
    return;
  }

  await displayPhotographer(photographer);
  sortMenu();
  handleSortChange({ target: { value: 'popularity' } });
}

init();

async function handleSortChange(eventOrValue) {
  const data = await getPhotographersData();
  let allLikes = 0;

  const medias = data.media.filter((m) => m.photographerId === photographerId);
  medias.forEach((media) => {
    allLikes += media.likes;
  });
  const photographer = data.photographers.find((p) => p.id === photographerId);
  priceProfile(allLikes, photographer.price);

  const criteria =
    typeof eventOrValue === 'string' ? eventOrValue : eventOrValue.target.value;

  const sortedMedias = sortMedia(medias, criteria);
  displayMedia(sortedMedias);
}
