import { getShow, notes, saveNote } from './state.js';

let currentShowId = null;
let openerButton = null;

export function openDetails(id) {
  currentShowId = id;
  openerButton = document.activeElement;

  const show = getShow(id);
  const dialog = document.getElementById('details');
  const form = document.getElementById('note-form');

  document.getElementById('details-title').textContent = show.name;
  document.getElementById('details-link').href = show.url;

  const temp = document.createElement('template');
  temp.innerHTML = show.summary;
  document.getElementById('details-summary').textContent = temp.content.textContent;

  const ratingInput = form.elements.rating;
  ratingInput.removeAttribute('aria-invalid');
  ratingInput.removeAttribute('aria-describedby'); 
  document.getElementById('note-rating-error').textContent = '';

  const saved = notes.get(id);
  if (saved) {
    form.elements.rating.value = saved.rating;
    form.elements.note.value = saved.text;
  } else {
    form.reset();
  }
  dialog.showModal();
}

export function initDetails(refresh) {
  const dialog = document.getElementById('details');
  const form = document.getElementById('note-form');

  form.noValidate = true;

  const ratingInput = form.elements.rating;
  const errorElement = document.getElementById('note-rating-error');
  const cancelBtn = form.querySelector('button[type="button"]');

  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  dialog.addEventListener('close', () => {
    if (openerButton && document.body.contains(openerButton)) {
      openerButton.focus();
    }
  });

  ratingInput.addEventListener('input', () => {
    ratingInput.removeAttribute('aria-invalid');
    ratingInput.removeAttribute('aria-describedby');
    errorElement.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const rating = ratingInput.valueAsNumber;
    if (Number.isNaN(rating) || rating < 1 || rating > 10 || !Number.isInteger(rating)) {
      ratingInput.setAttribute('aria-invalid', 'true');
      ratingInput.setAttribute('aria-describedby', 'note-rating-error'); // ВАЖЛИВО ДЛЯ C4.7
      errorElement.textContent = 'Оцінка має бути цілим числом від 1 до 10';
      ratingInput.focus();
      return;
    }

    saveNote(currentShowId, {
      rating: rating,
      text: form.elements.note.value.trim()
    });

    refresh();

    const show = getShow(currentShowId);
    document.getElementById('status').textContent = `Нотатку до ${show.name} збережено`;

    dialog.close();

    const newCard = document.querySelector(`li[data-id="${currentShowId}"]`);
    if (newCard) {
      newCard.querySelector('[data-action="details"]').focus();
    }
  });
}