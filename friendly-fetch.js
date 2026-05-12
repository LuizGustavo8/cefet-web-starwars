export async function friendlyFetch(url) {
  const cached = localStorage.getItem(url)
  if (cached) {
    return JSON.parse(cached)
  }

  const response = await fetch(url)
  const data = await response.json()
  localStorage.setItem(url, JSON.stringify(data))
  return data
}