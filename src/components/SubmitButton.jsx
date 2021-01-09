import React from 'react'
import Loader from '@components/Loader'

export default function SubmitButton({ error, loading, text }) {
  return (
    <button
      className={`w-full bg-blue-500 flex justify-center items-center hover:bg-blue-400 text-white font-bold py-2 px-4 focus:outline-none focus:ring focus:border-blue-400 rounded ${
        (error ? 'mb-3' : '', loading ? 'opacity-50' : '')
      }`}
    >
      {text}
      {loading && <Loader className='ml-2' />}
    </button>
  )
}
