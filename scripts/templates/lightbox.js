function setupLightbox(medias) {
  const modal = document.getElementById('lightbox-modal');
  const content = modal.querySelector('.lightbox-content');
  const btnClose = modal.querySelector('.lightbox-close');
  const btnPrev = modal.querySelector('.lightbox-prev');
  const btnNext = modal.querySelector('.lightbox-next');

  let currentIndex = 0;
  let lastFocusedElement = null;

  function openModal(index) {
    currentIndex = index;
    const media = medias[index];

    content.innerHTML = '';
    let element;

    if (media.image) {
      element = document.createElement('img');
      element.src = `assets/images/${media.image}`;
      element.alt = media.title;
    } else if (media.video) {
      element = document.createElement('video');
      element.controls = true;
      element.tabIndex = 0;
      element.setAttribute('aria-label', media.title);
      const source = document.createElement('source');
      source.src = `assets/videos/${media.video}`;
      source.type = 'video/mp4';
      element.appendChild(source);
    }

    const title = document.createElement('p');
    title.textContent = media.title;
    title.classList.add('lightbox-title');

    content.appendChild(element);
    content.appendChild(title);

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('role', 'dialog');

    lastFocusedElement = document.activeElement;
    btnClose.focus();
    trapFocus(modal);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    releaseFocusTrap();

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % medias.length;
    openModal(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + medias.length) % medias.length;
    openModal(currentIndex);
  }

  btnClose.addEventListener('click', closeModal);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
      switch (e.key) {
        case 'ArrowRight':
          showNext();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'Escape':
          closeModal();
          break;
      }
    }
  });

  const cards = document.querySelectorAll('.media-image, .media-video');
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      openModal(index);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(index);
      }
    });
  });

  let focusableEls = [];
  let firstFocusableEl = null;
  let lastFocusableEl = null;

  function trapFocus(container) {
    focusableEls = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];

    container.addEventListener('keydown', handleFocusTrap);
  }

  function releaseFocusTrap() {
    modal.removeEventListener('keydown', handleFocusTrap);
  }

  function handleFocusTrap(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableEl) {
          e.preventDefault();
          lastFocusableEl.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableEl) {
          e.preventDefault();
          firstFocusableEl.focus();
        }
      }
    }
  }
}
