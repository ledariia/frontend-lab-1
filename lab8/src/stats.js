/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows) {
  const rawStats = shows.reduce((acc, show) => {
    const genres = show.genres || [];

    genres.forEach(genre => {
      if (!acc[genre]) {
        acc[genre] = { count: 0, sum: 0, ratedCount: 0 };
      }

      acc[genre].count += 1;
      if (show.rating !== null && show.rating !== undefined) {
        acc[genre].sum += show.rating;
        acc[genre].ratedCount += 1;
      }
    });

    return acc;
  }, {});
  const result = {};
  for (const genre in rawStats) {
    const { count, sum, ratedCount } = rawStats[genre];
    let averageRating = null;
    if (ratedCount > 0) {
      averageRating = Math.round((sum / ratedCount) * 10) / 10;
    }

    result[genre] = { count, averageRating };
  }

  return result;
}
