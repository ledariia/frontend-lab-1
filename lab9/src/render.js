import { watchlist, notes } from './state.js';

export function renderShows(list) {
  const results = document.getElementById('results');
  const status = document.getElementById('status');
  const template = document.getElementById('show-card');

  results.replaceChildren();

  if (list.length === 0) {
    if (status) status.textContent = 'Нічого не знайдено';
    return;
  }

  if (status) status.textContent = `Знайдено: ${list.length} з 30`;

  const fragment = document.createDocumentFragment();

  for (const show of list) {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    if (li) li.dataset.id = show.id;

    const safeSetText = (selector, text) => {
      const el = clone.querySelector(selector);
      if (el) el.textContent = text;
    };

    safeSetText('[data-field="name"]', show.name);
    safeSetText('[data-field="year"]', show.year ?? '—');
    safeSetText('[data-field="genres"]', show.genres && show.genres.length ? show.genres.join(', ') : '—');
    safeSetText('[data-field="rating"]', show.rating ?? '—');

    const btnToggle = clone.querySelector('[data-action="toggle"]');
    if (btnToggle) {
      btnToggle.setAttribute('aria-label', `До списку: ${show.name}`);
      btnToggle.setAttribute('aria-pressed', String(watchlist.has(show.id)));
    }

    const btnDetails = clone.querySelector('[data-action="details"]');
    if (btnDetails) {
      btnDetails.setAttribute('aria-label', `Детальніше про ${show.name}`);
    }
    const savedNote = notes.get(show.id);

    const ratingEl = clone.querySelector('[data-field="my-rating"]');
    const noteEl = clone.querySelector('[data-field="note"]');
    const ratingParent = clone.querySelector('.card__mine');
    const noteParent = clone.querySelector('.card__note');

    if (savedNote) {
      if (ratingEl) {
        ratingEl.textContent = savedNote.rating;
      }
      if (ratingParent) {
        ratingParent.hidden = false;
      }

      if (noteEl) {
        noteEl.textContent = savedNote.text;
      }
      if (noteParent && savedNote.text) {
        noteParent.hidden = false;
      } else if (noteParent) {
        noteParent.hidden = true;
      }
    } else {
      if (ratingParent) {
        ratingParent.hidden = true;
      }
      if (noteParent) {
        noteParent.hidden = true;
      }
    }

    fragment.appendChild(clone);
  }

  results.appendChild(fragment);
}