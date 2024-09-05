/* eslint-disable no-unused-vars */
import Header from '@/components/ui/custom/header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'

function Home() {
  return (
    <>
    <div> landing scree</div>
    <div className='flex justify-center'><UserButton/></div>
    </>
  )
}

export default Home