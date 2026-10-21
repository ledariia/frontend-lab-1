/**
 * Поведінка ShowFinder: пошук (C1), сторінка серіалу (C2), помилки й повторні спроби (C3).
 * Тут — обробники подій, життєвий цикл кожного запиту й стани областей #results і #details:
 * завантаження, результат, порожній результат, помилка. Специфікація — ТЗ, §3–4.
 */
import { getShow, searchShows } from './api.js';
import { renderResults, renderShow } from './view.js';

/** Підключає форму пошуку #search і області #results та #details. main.js викликає її один раз. */
export function initApp() {
  const searchForm = document.getElementById('search');
  const resultsContainer = document.getElementById('results');
  const statusElement = document.getElementById('status');

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const query = formData.get('query').trim();

    if (!query) {
      renderResults(resultsContainer, []);
      statusElement.textContent = 'Введіть назву серіалу для пошуку.';
      return;
    }

    statusElement.textContent = '';
    const loadingTemplate = document.getElementById('state-loading');
    resultsContainer.replaceChildren(loadingTemplate.content.cloneNode(true));

    try {
      const shows = await searchShows(query);
      renderResults(resultsContainer, shows);

      if (shows.length === 0) {
        statusElement.textContent = 'Нічого не знайдено.';
      }
    } catch (error) {
      const errorTemplate = document.getElementById('state-error');
      const errorClone = errorTemplate.content.cloneNode(true);
      errorClone.querySelector('.state__text').textContent = `Помилка: ${error.message}`;
      resultsContainer.replaceChildren(errorClone);
    }
  });
}
