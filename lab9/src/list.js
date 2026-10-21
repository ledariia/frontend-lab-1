import { toggle, watchlist } from './state.js';
import { openDetails } from './details.js';

export function initList(refresh) {
  const results = document.getElementById('results');
  const countDisplay = document.getElementById('watchlist-count');

  if (countDisplay) {
    countDisplay.textContent = watchlist.size;
  }

  results.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const li = button.closest('li');
    if (!li) return;

    const id = Number(li.dataset.id);
    const action = button.dataset.action;

    if (action === 'toggle') {
      const nextId = li.nextElementSibling ? li.nextElementSibling.dataset.id : null;
      const prevId = li.previousElementSibling ? li.previousElementSibling.dataset.id : null;

      const isInList = toggle(id);
      button.setAttribute('aria-pressed', String(isInList));

      if (countDisplay) {
        countDisplay.textContent = watchlist.size;
      }

      refresh();
      const newCard = document.querySelector(`li[data-id="${id}"]`);
      if (newCard) {
        newCard.querySelector('[data-action="toggle"]').focus();
      } else if (nextId && document.querySelector(`li[data-id="${nextId}"]`)) {
        document.querySelector(`li[data-id="${nextId}"] [data-action="toggle"]`).focus();
      } else if (prevId && document.querySelector(`li[data-id="${prevId}"]`)) {
        document.querySelector(`li[data-id="${prevId}"] [data-action="toggle"]`).focus();
      } else {
        const heading = document.getElementById('results-heading');
        if (heading) {
          heading.tabIndex = -1;
          heading.focus();
        }
      }
    } else if (action === 'details') {
      openDetails(id);
    }
  });
}