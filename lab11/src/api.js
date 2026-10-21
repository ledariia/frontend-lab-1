export const API = 'https://api.tvmaze.com';

export async function searchShows(query, { signal } = {}) {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${API}/search/shows?${params}`, { signal });

  if (!response.ok) {
    const error = new Error(`HTTP Error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.map((item) => item.show);
}

export async function getShow(id, { signal } = {}) {
  const url = `${API}/shows/${id}?embed[]=episodes&embed[]=cast`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error(`HTTP Error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return {
    show: data,
    episodes: data._embedded?.episodes || [],
    cast: data._embedded?.cast || []
  };
}