function sortMenu() {
  const customSelect = document.getElementById('custom-select');
  const optionsList = customSelect.querySelector('.options');

  // Initialise tabindex, role et aria-selected sur chaque option
  function updateOptionsAttributes() {
    const opts = Array.from(optionsList.querySelectorAll('.option'));
    opts.forEach((opt, i) => {
      opt.setAttribute('role', 'option');
      const isSel = opt.classList.contains('selected');
      opt.setAttribute('aria-selected', isSel ? 'true' : 'false');
      // Seule l’option « courante » (selected) est dans le cycle Tab
      opt.setAttribute('tabindex', isSel ? '0' : '-1');
    });
  }
  updateOptionsAttributes();

  // Utilitaire pour récupérer tableau et index courant
  function getOptions() {
    const opts = Array.from(optionsList.querySelectorAll('.option'));
    const currentIndex = opts.findIndex((o) =>
      o.classList.contains('selected')
    );
    return { opts, currentIndex };
  }

  // Clic souris (inchangé)
  optionsList.addEventListener('click', (e) => {
    const clicked = e.target.closest('.option');
    if (!clicked) return;

    // toggle si même option
    if (clicked.classList.contains('selected')) {
      optionsList.classList.toggle('open');
      return;
    }

    // changement de sélection
    const old = optionsList.querySelector('.option.selected');
    old.classList.remove('selected');
    clicked.classList.add('selected');
    optionsList.insertBefore(clicked, optionsList.firstChild);

    // fermeture, callback et ré‑initialisation
    optionsList.classList.remove('open');
    handleSortChange(clicked.dataset.value);
    customSelect.focus();
    updateOptionsAttributes();
  });

  // clic hors dropdown ferme
  document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
      optionsList.classList.remove('open');
    }
  });

  // Gestion clavier
  customSelect.addEventListener('keydown', (e) => {
    const { opts, currentIndex } = getOptions();
    const isOpen = optionsList.classList.contains('open');

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          optionsList.classList.add('open');
        } else {
          const next = (currentIndex + 1) % opts.length;
          opts[next].focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          optionsList.classList.add('open');
        } else {
          const prev = (currentIndex - 1 + opts.length) % opts.length;
          opts[prev].focus();
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          // ouvre et focus l’option sélectionnée
          optionsList.classList.add('open');
          opts[currentIndex].focus();
        } else {
          // simule un clic sur l’option focusée
          const focused = document.activeElement;
          if (focused.classList.contains('option')) {
            focused.click();
          }
        }
        break;

      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          optionsList.classList.remove('open');
          customSelect.focus();
        }
        break;
    }
  });
}
