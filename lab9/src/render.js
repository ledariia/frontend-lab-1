/** @typedef {import('./state.js').Show} Show */

/**
 * C1. Показує серіали в списку #results — по картці з шаблону #show-card на кожен, у тому
 * самому порядку, — і оновлює рядок статусу #status. Специфікація — ТЗ, C1.
 *
 * @param {readonly Show[]} list серіали, які треба показати
 */
export function renderShows(list) {
  const results = document.getElementById('results');
  const status = document.getElementById('status');
  const template = document.getElementById('show-card');

  results.innerHTML = '';

  if (list.length === 0) {
    status.textContent = 'Немає серіалів, що відповідають фільтрам.';
    return;
  }

  status.textContent = `Знайдено серіалів: ${list.length}`;

  for (const show of list) {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.card');

    card.dataset.id = show.id;
    card.querySelector('[data-field="name"]').textContent = show.name;
    card.querySelector('[data-field="year"]').textContent = show.year ?? 'Невідомо';
    card.querySelector('[data-field="genres"]').textContent = show.genres.length ? show.genres.join(', ') : 'Немає';
    card.querySelector('[data-field="rating"]').textContent = show.rating ?? 'Немає оцінки';

    results.appendChild(clone);
  }
}
