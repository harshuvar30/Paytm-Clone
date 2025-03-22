import React from 'react'
import { Appbar } from '../components/Appbar'
import { Users } from '../components/User'
import { Balance } from '../components/Balance'

export const Dashboard = () => {
  return (
    <div className='flex flex-col py-2'>
        <Appbar/>
        <Balance value={"10,000"}/>
        <Users/>
    </div>
  )
}
