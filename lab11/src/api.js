/**
 * Запити до TVmaze API: https://www.tvmaze.com/api.
 * Специфікація — ТЗ, §3.2 і §4.
 */

export const API = 'https://api.tvmaze.com';

/**
 *
 * @param {string} query
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<object[]>}
 */
export async function searchShows(query, { signal } = {}) {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${API}/search/shows?${params}`, { signal });

  if (!response.ok) {
    throw new Error(`Failed to search shows: ${response.status}`);
  }

  const data = await response.json();
  return data.map((item) => item.show);
}

/**
 *
 * @param {number} id
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ show: object, episodes: object[], cast: object[] }>}
 */
export async function getShow(id, { signal } = {}) {
  // TODO C2
}