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

// Import for helper functions
import { filterArrayOfObjects } from './helper/filterArrayOfObjects'

const Searchbar = () => {
  const [showResults, setShowResults] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)
  const searchMenuRef = useRef()

  const { getLocation } = useUserLocation()
  const { getAutoCompleteResults } = useSearchAutoComplete()

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

  const findUserLocation = async () => {
    if (userLocation) {
      setUserLocation(null)
      return
    }

    try {
      const location = await getLocation()
      setUserLocation(`${location.road}, ${location.suburb}, ${location.city}`)
    } catch (error) {
      console.error(error)
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
              <button onClick={() => {}} className="search-button">
                <i>
                  <FaMagnifyingGlass />
                </i>
              </button>
            ) : (
              <button onClick={findUserLocation} className="search-button">
                <i>
                  {userLocation ? (
                    <MdOutlineLocationOn />
                  ) : (
                    <MdOutlineLocationOff />
                  )}
                </i>
              </button>
            )}
          </div>
          {/* End of Search Bar */}

          {/* Results Dropdown Menu */}
          {showResults && (
            <div className="drop-menu">
              <button className="drop-button" onClick={findUserLocation}>
                <MdOutlineGpsFixed />
                {userLocation ? (
                  <p className="drop-menu-p">{userLocation}</p>
                ) : (
                  <p className="drop-menu-p">Use Location</p>
                )}
              </button>
              <ul className="drop-ul">
                {Array.isArray(suggestions) &&
                  suggestions.length >= 1 &&
                  suggestions.map((location, index) => {
                    return <li key={location + index}>{location}</li>
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
