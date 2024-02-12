import React, { useEffect, useState, useRef } from 'react'
import './searchbar.css'

// Imports for react-icons
import { FaMagnifyingGlass } from 'react-icons/fa6'
import {
  MdOutlineGpsFixed,
  MdOutlineLocationOn,
  MdOutlineLocationOff,
} from 'react-icons/md'

// Imports for custom hooks
import { useUserLocation } from './hooks/useUserLocation'
import { useSearchAutoComplete } from './hooks/useSearchAutoComplete'
import { useSearchLocation } from './hooks/useSearchLocation'

// Import for helper functions
import { filterArrayOfObjects } from './helper/filterArrayOfObjects'

const Searchbar = () => {
  const [showResults, setShowResults] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [isGpsOn, setIsGpsOn] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)
  const searchMenuRef = useRef()

  const { getLocation } = useUserLocation()
  const { getAutoCompleteResults } = useSearchAutoComplete()
  const { searchLocation } = useSearchLocation()

  useEffect(() => {
    // event handler called during mousedown events
    const handleMouseDown = (e) => {
      // set `showResults` to false if `searchMenuRef` does not contain mousedown target
      if (!searchMenuRef.current.contains(e.target)) {
        setShowResults(false)
      }
    }

    // Add mousedown event listener to document
    document.addEventListener('mousedown', handleMouseDown)

    // clean up function on component unmount
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [showResults])

  const handleSearchChange = async (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (!query) {
      setSuggestions([])
      return
    }

    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // set new timeout
    const newTimeoutId = setTimeout(async () => {
      try {
        // Returns an array of location results.
        const result = await getAutoCompleteResults(searchQuery)
        const suggestions = result.map((obj) => obj.address)
        let filteredSuggestions = filterArrayOfObjects(suggestions, [
          'name',
          'city',
          'suburb',
          'state',
          'country',
        ])
        setSuggestions(filteredSuggestions)
      } catch (error) {
        console.error(error)
      }
    }, 800)

    // Set new timeout id
    setTimeoutId(newTimeoutId)
  }

  const handleGeoLocation = async () => {
    if (isGpsOn) {
      setUserLocation(null)
      setIsGpsOn(false)
      return
    }

    try {
      // Returns an object with location string and location coordinates
      const location = await getLocation()
      const address = location.address
      console.log(location.longitude, location.latitude)
      setUserLocation(`${address.road}, ${address.suburb}, ${address.city}`)
      setSearchQuery('')
      setSuggestions([])
      setIsGpsOn(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchLocation = async (query) => {
    // Sanitize code to prepare query for API call
    const sanitizeRegex = /^\W+|\W+$/g
    const sanitizedQuery = query.replace(sanitizeRegex, '')
    const apiRegex = /[,\s]+/g
    const apiQuery = sanitizedQuery.replace(apiRegex, '%20')

    try {
      // `searchLocation` returns coordinates of user location.
      const result = await searchLocation(apiQuery)
      setSearchQuery('')
      setUserLocation(sanitizedQuery)
      setIsGpsOn(false)
      console.log(result)
    } catch (error) {
      console.error(error)
    } finally {
      setShowResults(false)
    }
  }

  return (
    <div className="parent-container">
      <div className="child-container">
        {/* Parent Flex Container */}
        <div ref={searchMenuRef} className="search-drop-container">
          {/* Search Bar */}
          <div className="search-container">
            <label
              htmlFor="search-bar"
              aria-label="Search Bar"
              className="sr-only"
            >
              Search Bar
            </label>
            <input
              id="search-bar"
              className="search-bar"
              placeholder={userLocation ? userLocation : 'Find Location'}
              onChange={handleSearchChange}
              value={searchQuery}
              onFocus={() => {
                setShowResults(true)
              }}
            />
            {showResults ? (
              <button
                onClick={() => {
                  handleSearchLocation(searchQuery)
                }}
                className="search-button"
              >
                <i>
                  <FaMagnifyingGlass />
                </i>
              </button>
            ) : (
              <button onClick={handleGeoLocation} className="search-button">
                <i>
                  {isGpsOn ? <MdOutlineLocationOn /> : <MdOutlineLocationOff />}
                </i>
              </button>
            )}
          </div>
          {/* End of Search Bar */}

          {/* Results Dropdown Menu */}
          {showResults && (
            <div className="drop-menu">
              <button className="drop-button" onClick={handleGeoLocation}>
                <MdOutlineGpsFixed />
                {isGpsOn ? (
                  <p className="drop-menu-p">{userLocation}</p>
                ) : (
                  <p className="drop-menu-p">Use Location</p>
                )}
              </button>
              <ul className="drop-ul">
                {Array.isArray(suggestions) &&
                  suggestions.length >= 1 &&
                  suggestions.map((location, index) => {
                    return (
                      <li key={location + index}>
                        <button
                          className="drop-loc-button"
                          onClick={() => {
                            handleSearchLocation(location)
                          }}
                        >
                          {location}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}
          {/* End of Results Dropdown Menu */}
        </div>
        {/* End of Flex Container */}
      </div>
    </div>
  )
}

export default Searchbar
