export const useSearchLocation = () => {
  const searchLocation = (query) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${query}&format=json`
        )
        const result = await response.json()
        console.log(result)
        resolve({ latitude: result[0].lat, longitude: result[0].lon })
      } catch (error) {
        reject(error)
      }
    })
  }

  return { searchLocation }
}
