import React, { useEffect, useState, useRef } from 'react'

const Searchbar = () => {
  const [showResults, setShowResults] = useState(false)
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

  return (
    <div className='w-full py-8'>
      <div className='w-full max-w-[1200px] mx-auto px-4'>
        {/* Parent Flex Container */}
        <div ref={searchMenuRef} className='flex flex-col gap-2'>

          {/* Search Bar */}
          <div>
            <label htmlFor='search-bar' aria-label='Search Bar' className='sr-only'>Search Bar</label>
            <input
              id='search-bar'
              className='w-full rounded-xl py-2 px-4 bg-neutral-900 placeholder-gray-400 text-darkText outline-none'
              placeholder={'Find Location'}
              onFocus={() => {setShowResults(true)}}
            />
          </div>
          {/* End of Search Bar */}

          {/* Results Dropdown Menu */}
          {showResults && (
            <div className='rounded-xl bg-neutral-900 px-4 py-2 text-darkText'>
              <p className='pb-1 border-b border-gray-600'>Use Location</p>
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