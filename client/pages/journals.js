import React from 'react'
import Entries from '@/components/Entries'
import Navbar from '@/components/Navbar'
import Journal from '@/components/Journal'

const Journals = () => {
  return (
    <div>
    <Navbar/>
    <div className="flex py-2 justify-between">
      <Entries/>
      <Journal/>
      </div>
    </div>
  )
}

export default Journals
