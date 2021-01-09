import React from 'react'

export function Message({ type, ...props }) {
  return type === 'error' ? (
    <ErrorMessage {...props} />
  ) : (
    <SuccessMessage {...props} />
  )
}
function SuccessMessage({ message, className = '' }) {
  return (
    <div
      className={`bg-green-100 border w-64 border-green-400 text-green-700 px-4 py-3 rounded relative ${className}`}
      role='alert'
    >
      <strong className='font-bold'>Success!</strong>{' '}
      <span className='block sm:inline'>{message}</span>
    </div>
  )
}
export default function ErrorMessage({ message, className = '' }) {
  return (
    <div
      className={`bg-red-100 border w-64 border-red-400 text-red-700 px-4 py-3 rounded relative ${className}`}
      role='alert'
    >
      <strong className='font-bold'>Alert!</strong>{' '}
      <span className='block sm:inline'>{message}</span>
    </div>
  )
}
