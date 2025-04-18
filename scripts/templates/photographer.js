function photographerTemplate(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.setAttribute('href', 'photographer.html?id=' + id);
    const img = document.createElement('img');
    if (portrait === undefined || portrait === '') {
      img.setAttribute('src', 'assets/photographers/account.png');
    } else {
      img.setAttribute('src', picture);
    }
    img.setAttribute('alt', name);
    img.classList.add('user-picture');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    link.appendChild(img);
    link.appendChild(h2);
    link.classList.add('user-card');
    article.appendChild(link);
    const location = document.createElement('span');
    location.textContent = city + ', ' + country;
    location.classList.add('location');
    article.appendChild(location);
    const line = document.createElement('span');
    line.textContent = tagline;
    line.classList.add('line');
    article.appendChild(line);
    const cost = document.createElement('span');
    cost.textContent = price + '€/jour';
    cost.classList.add('cost');
    article.appendChild(cost);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
