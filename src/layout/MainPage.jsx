import React from 'react'
import Navbar from '@components/Navbar'

export default function MainPage({ children }) {
  return (
    <>
      <Navbar />
      <div className='container mt-5'>{children}</div>
    </>
  )
}
