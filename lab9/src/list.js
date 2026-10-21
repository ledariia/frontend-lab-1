import { toggle, watchlist } from './state.js';
import { openDetails } from './details.js';

/**
 * C2. Підключає кнопки карток у списку #results: «До списку» додає серіал до мого списку або
 * прибирає з нього, «Детальніше» відкриває діалог (openDetails з details.js). main.js викликає
 * цю функцію один раз, після першого показу списку. Специфікація — ТЗ, C2.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initList(refresh) {
  const results = document.getElementById('results');

  results.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const card = button.closest('.card');
    if (!card) return;

    const id = Number(card.dataset.id);
    const action = button.dataset.action;

    if (action === 'toggle') {
      const isInList = toggle(id);
      button.setAttribute('aria-pressed', isInList);
      refresh();
    } else if (action === 'details') {
      openDetails(id);
    }
  });
}
