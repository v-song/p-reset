import React from 'react'
import Navbar from '@/components/Navbar'
import HabitForm from '@/components/forms/HabitForm'
import HabitsList from '@/components/Habits'

const Habits = () => {
  return (
    <div>
      <Navbar/>
      <h1 className='font-bold text-center text-2xl'>Habits</h1>
      <div className='flex justify-between'>
        <HabitsList/>
        <HabitForm/>
        </div>
    </div>
  )
}

export default Habits
