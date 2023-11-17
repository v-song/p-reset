import React from 'react'
import Navbar from '@/components/Navbar'
import HabitForm from '@/components/forms/HabitForm'
import HabitsList from '@/components/Habits'

const Habits = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-between'>
        <HabitsList/>
        <HabitForm/>
        </div>
    </div>
  )
}

export default Habits
