import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='w-full py-4'>
      <div className='w-full max-w-[1200px] mx-auto'>
        <div className='flex flex-row items-center justify-between'>
          <div>
            <h1 className='font-bold text-2xl'>
              <Link to='/'>Weather App</Link>
            </h1>
          </div>
          <ul className='flex flex-row items-center gap-6'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/search'>Search</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar