/** @typedef {import('./state.js').Filters} Filters */

/**
 * C3. Повертає поточні значення форми фільтрів #filters. Поки C3 не виконано, фільтрів немає,
 * і список показує всі серіали. Специфікація — ТЗ, C3.
 *
 * @returns {Filters}
 */
export function readFilters() {
  const form = document.getElementById('filters');
  return {
    query: form.elements.query.value.trim().toLowerCase(),
    genre: form.elements.genre.value,
    mine: form.elements.mine.checked
  };
}

export function initFilters(refresh) {
  const form = document.getElementById('filters');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  form.addEventListener('input', (event) => {
    if (event.target.name === 'query') refresh();
  });

  form.addEventListener('change', (event) => {
    if (event.target.name === 'genre' || event.target.name === 'mine') refresh();
  });

  form.addEventListener('reset', () => {
    setTimeout(refresh, 0);
  });
}