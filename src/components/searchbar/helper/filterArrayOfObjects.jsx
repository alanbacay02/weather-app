import PropTypes from 'prop-types'

export const filterArrayOfObjects = (array, filterKeys) => {
  if (!array) {
    throw new Error("'array' parameter requires an input equal to an array.")
  }

  if (!Array.isArray(array)) {
    throw new Error("Input supplied to 'array' is not an array.")
  }

  if (!filterKeys) {
    throw new Error(
      "'filterKeys' parameter requires an input equal to an array."
    )
  }

  if (!Array.isArray(filterKeys)) {
    throw new Error('Input supplied to filterKeys is not an array.')
  }

  // Map through each address object in array
  return array.map((object, index) => {
    // Return empty string if addressObj is not an object
    if (typeof object !== 'object') {
      throw new Error('Array contains non-object elements.')
    }

    return (
      filterKeys
        // Exclude specific properties (postcode, country_code, country) from object
        .filter((key) => object.hasOwnProperty(key))
        // Map over filtered keys and return their values
        .map((key) => object[key])
        // Join all values in array to string
        .join(', ')
    )
  })
}

filterArrayOfObjects.propTypes = {
  array: PropTypes.array.isRequired,
  filterKeys: PropTypes.array.isRequired,
}
