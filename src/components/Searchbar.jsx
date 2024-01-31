import React, { useEffect, useState, useRef } from 'react'
import { CiLocationOff, CiLocationOn } from "react-icons/ci";
import { MdOutlineGpsFixed } from "react-icons/md";

const Searchbar = () => {
  const [showResults, setShowResults] = useState(false)
  const [userPosition, setUserPosition] = useState(null)
  const searchMenuRef = useRef()

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

  const findUserLocation = () => {
    // Todo: Make a better cleanup of state to turn off location
    if (userPosition) {
      // Clear state if there is a previous value in `userPosition`
      return setUserPosition(null)
    }

    // Get location of user and assign position value to `userPosition`
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {setUserPosition(pos); console.log(pos.coords.latitude)})
    } else {
      // Return this if geolocation is not support by device/browser
      console.log('Geolocation is not supported by this browser.')
    }
  }

  return (
    <div className='w-full py-4'>
      <div className='w-full max-w-[1200px] mx-auto px-2'>
        {/* Parent Flex Container */}
        <div ref={searchMenuRef} className='relative flex flex-col'>

          {/* Search Bar */}
          <div className='flex flex-row items-center gap-1 text-darkText'>
            <label htmlFor='search-bar' aria-label='Search Bar' className='sr-only'>Search Bar</label>
            <input
              id='search-bar'
              className='w-full rounded-xl py-2 px-4 bg-neutral-900 placeholder-gray-400 outline-none'
              placeholder={userPosition ? 'User has position' : 'Find Location'}
              onFocus={() => {setShowResults(true)}}
            />
            <button
              onClick={findUserLocation}
              className='text-xl p-2 rounded-full bg-neutral-900 active:bg-neutral-700'
            >
              <i>{userPosition ? <CiLocationOn /> : <CiLocationOff />}</i>
            </button>
          </div>
          {/* End of Search Bar */}

          {/* Results Dropdown Menu */}
          {showResults && (
            <div className='absolute top-full mt-2 left-0 right-0 rounded-xl bg-neutral-900 px-4 py-2 text-darkText'>
              <button
                onClick={() => {}}
                className='w-full flex flex-row items-center gap-1 pb-1 border-b border-gray-600 active:bg-neutral-800'
              >
                <MdOutlineGpsFixed />
                <p className=''>Use Location</p>
              </button>
              <ul className='mt-2 flex flex-col gap-1'>
                <li>
                  Manila
                </li>
                <li>
                  France
                </li>
                <li>
                  Germany
                </li>
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