export const useUserLocation = () => {
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          // Start of Try Catch Block
          try {
            const latitude = pos.coords.latitude
            const longitude = pos.coords.longitude
            const apiUrl = `https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATIONIQ_API}&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
            const response = await fetch(apiUrl)
            const result = await response.json()
            resolve({ address: result.address, latitude, longitude })
          } catch (error) {
            reject(error)
          }
          // End of Try Catch Block
        })
      }
    })
  }
  return { getLocation }
}
