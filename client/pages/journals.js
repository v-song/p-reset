import React from 'react'
import Entries from '@/components/Entries'
import Navbar from '@/components/Navbar'
import Journal from '@/components/forms/Journal'

const Journals = () => {
  return (
    <div className='radial-gradient'>
    <Navbar/>
    <div className="flex justify-between">
      <Entries/>
      </div>
    </div>
  )
}

export default Journals
