import React from 'react'
import Loader from '@components/Loader'
import Link from 'next/Link'

const L = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  )
}

const B = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

export default function Button({
  color = 'blue',
  textColor = 'white',
  loading,
  isFull,
  isLink,
  text,
  className,
  ...props
}) {
  const classes = [
    isFull ? 'w-full' : '',
    isLink ? 'inline-flex' : '',
    loading ? 'opacity-50' : '',
    `focus:border-${color}-400`,
    `bg-${color}-500`,
    `hover:bg-${color}-400`,
    `text-${textColor}`,
    `ring-${color}-200`,
    'flex justify-center items-center font-bold py-2 px-4 focus:outline-none focus:ring rounded',
    className,
  ]
  const E = isLink ? L : B
  return (
    <E {...props} className={classes.join(' ')}>
      {text}
      {loading && <Loader className='ml-2' />}
    </E>
  )
}

export function SubmitButton(props) {
  return <Button {...props} color='blue' textColor='white' />
}

export function SecondaryButton(props) {
  return <Button {...props} color='gray' textColor='white' />
}
