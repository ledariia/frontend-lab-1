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

  results.replaceChildren();

  if (list.length === 0) {
    status.textContent = 'Нічого не знайдено';
    return;
  }

  status.textContent = `Знайдено: ${list.length} з 30`;

  const fragment = document.createDocumentFragment();

  for (const show of list) {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');

    li.dataset.id = show.id;

    clone.querySelector('[data-field="name"]').textContent = show.name;
    clone.querySelector('[data-field="year"]').textContent = show.year ?? '—';
    clone.querySelector('[data-field="genres"]').textContent = show.genres && show.genres.length ? show.genres.join(', ') : '—';
    clone.querySelector('[data-field="rating"]').textContent = show.rating ?? '—';

    const btnToggle = clone.querySelector('[data-action="toggle"]');
    const btnDetails = clone.querySelector('[data-action="details"]');

    btnToggle.setAttribute('aria-label', `До списку: ${show.name}`);
    btnDetails.setAttribute('aria-label', `Детальніше про ${show.name}`);

    fragment.appendChild(clone);
  }

  results.appendChild(fragment);
}