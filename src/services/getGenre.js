export const getGenre = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer  ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=es`,
      options,
    )
    if (!response.ok) {
      throw new Error('Failed to fetch genres')
    }
    const data = await response.json()
    console.log(data.genres)
    return data
  } catch (error) {
    console.log(error)
  }
}
