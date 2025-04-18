let trapFocus = null;
let firstFocusable = null;
let lastFocusable = null;

function displayModal() {
  const name = document.getElementById('photographer_name').innerText;
  const contactName = document.getElementById('contact_name');
  contactName.innerHTML = `Contactez-moi<br>${name}`;
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  const form = document.querySelector('form');

  const firstInput = document.getElementById('first-name');
  firstInput.focus();

  document.addEventListener('keydown', handleKeyDown);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log(
      'Prénom :',
      firstName,
      'Nom :',
      lastName,
      'Email :',
      email,
      'Message :',
      message
    );
  });

  const focusableElements = modal.querySelectorAll(
    'input, textarea, button, [tabindex]:not([tabindex="-1"])'
  );
  firstFocusable = focusableElements[0];
  lastFocusable = focusableElements[focusableElements.length - 1];

  trapFocus = function (e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  document.addEventListener('keydown', trapFocus);
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

  document.removeEventListener('keydown', trapFocus);
  document.removeEventListener('keydown', handleKeyDown);

  document.getElementById('contact_button').focus();
}

function handleKeyDown(e) {
  const isModalOpen =
    document.getElementById('contact_modal').style.display === 'block';
  if (!isModalOpen) return;

  if (e.key === 'Escape') {
    closeModal();
  }
}
