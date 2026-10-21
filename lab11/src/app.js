/**
 * Поведінка ShowFinder: пошук (C1), сторінка серіалу (C2), помилки й повторні спроби (C3).
 */
import { getShow, searchShows } from './api.js';
import { renderResults, renderShow } from './view.js';

export function initApp() {
  const searchForm = document.getElementById('search');
  const searchInput = document.getElementById('search-query');
  const resultsContainer = document.getElementById('results');
  const statusElement = document.getElementById('status');

  const loadingTemplate = document.getElementById('state-loading').content;
  const messageTemplate = document.getElementById('state-message').content;

  let debounceTimeout;
  let currentAbortController = null;

  function showMessage(text) {
    resultsContainer.innerHTML = '';
    const clone = messageTemplate.cloneNode(true);
    const textEl = clone.querySelector('.state__text') || clone.firstElementChild;
    if (textEl) {
      textEl.textContent = text;
    }

    resultsContainer.appendChild(clone);
    statusElement.textContent = text;
  }

  function showLoading() {
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(loadingTemplate.cloneNode(true));
    resultsContainer.setAttribute('aria-busy', 'true');
    statusElement.textContent = 'Завантаження…';
  }

  function clearLoading() {
    resultsContainer.removeAttribute('aria-busy');
  }

  async function performSearch(query) {
    if (currentAbortController) {
      currentAbortController.abort();
    }

    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      statusElement.textContent = '';
      clearLoading();
      return;
    }

    currentAbortController = new AbortController();
    const signal = currentAbortController.signal;

    showLoading();

    try {
      const shows = await searchShows(query, { signal });
      clearLoading();

      if (shows.length === 0) {
        showMessage(`Нічого не знайдено за запитом «${query}»`);
        return;
      }

      renderResults(resultsContainer, shows);
      statusElement.textContent = `Знайдено: ${shows.length}`;
    } catch (error) {
      if (error.name === 'AbortError') return;

      clearLoading();
      console.error(error);
    }
  }

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      performSearch(e.target.value.trim());
    }, 500);
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(debounceTimeout);
    performSearch(searchInput.value.trim());
  });
}
