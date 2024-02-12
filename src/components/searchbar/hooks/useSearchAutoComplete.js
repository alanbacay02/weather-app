export const useSearchAutoComplete = () => {
  const getAutoCompleteResults = (locationQuery) => {
    return new Promise(async (resolve, reject) => {
      try {
        const apiUrl = `https://api.locationiq.com/v1/autocomplete?key=${process.env.REACT_APP_LOCATIONIQ_API}&q=${locationQuery}&limit=5`
        const response = await fetch(apiUrl)
        const result = await response.json()
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  return { getAutoCompleteResults }
}
