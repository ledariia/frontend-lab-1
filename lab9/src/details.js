import { getShow, notes, saveNote } from './state.js';

let currentShowId = null;

/**
 * C4. Відкриває діалог #details для серіалу: назва, опис, посилання на сторінку TVmaze і форма
 * з моєю оцінкою й нотаткою. Специфікація — ТЗ, C4.
 *
 * @param {number} id
 */
export function openDetails(id) {
  const show = getShow(id);
  const dialog = document.getElementById('details');
  const title = document.getElementById('details-title');
  const summary = document.getElementById('details-summary');
  const link = document.getElementById('details-link');
  const ratingInput = document.getElementById('note-rating');
  const noteInput = document.getElementById('note-text');
  const ratingError = document.getElementById('note-rating-error');

  currentShowId = id;
  ratingError.textContent = '';

  title.textContent = show.name;
  summary.innerHTML = show.summary;
  link.href = show.url;

  const note = notes.get(id);
  if (note) {
    ratingInput.value = note.rating;
    noteInput.value = note.text;
  } else {
    ratingInput.value = '';
    noteInput.value = '';
  }

  dialog.showModal();
}

/**
 * C4. Підключає діалог #details: закриття й форму «Моя оцінка й нотатка». main.js викликає цю
 * функцію один раз. Специфікація — ТЗ, C4.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initDetails(refresh) {
  const dialog = document.getElementById('details');
  const noteForm = document.getElementById('note-form');
  const cancelBtn = noteForm.querySelector('button[type="button"]');
  const ratingInput = document.getElementById('note-rating');
  const ratingError = document.getElementById('note-rating-error');

  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (currentShowId === null) return;

    const rating = Number(ratingInput.value);
    const note = document.getElementById('note-text').value;

    try {
      saveNote(currentShowId, { rating, text: note });
      ratingError.textContent = '';
      dialog.close();
      refresh();
    } catch (error) {
      ratingError.textContent = error.message;
    }
  });
}
