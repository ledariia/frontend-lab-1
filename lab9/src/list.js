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
      const isInList = toggle(id);
      button.setAttribute('aria-pressed', String(isInList));
      if (countDisplay) {
        countDisplay.textContent = watchlist.size;
      }
      refresh();
      const newCard = document.querySelector(`li[data-id="${id}"]`);
      if (newCard) {
        const newBtn = newCard.querySelector('[data-action="toggle"]');
        newBtn.setAttribute('aria-pressed', String(isInList));
        newBtn.focus();
      } else {
        const firstCard = document.querySelector('#results li');
        if (firstCard) {
          firstCard.querySelector('[data-action="toggle"]').focus();
        } else {
          const heading = document.getElementById('results-heading');
          if (heading) heading.focus();
        }
      }
    } else if (action === 'details') {
      openDetails(id);
    }
  });
}