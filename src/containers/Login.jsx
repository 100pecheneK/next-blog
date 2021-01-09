import React, { useState } from 'react'
import Link from 'next/Link'
import { useRouter } from 'next/router'
import ErrorMessage from '@components/ErrorMessage'
import SubmitButton from '@components/SubmitButton'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const { email, password } = form
  const onInput = e => {
    setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (!form.email) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'This field is required.',
      }))
      return
    }
    if (!form.password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'This field is required.',
      }))
      return
    }
    if (form.password.length < 3) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must be at least 3 characters.',
      }))
      return
    }
    setErrors({})
    setLoading(true)
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }).then(async res => {
      setLoading(false)
      if (res.status === 200) {
        router.push('/me')
      } else {
        const { error } = await res.json()
        setErrors({ error })
      }
    })
  }

  return (
    <div className='container flex h-screen justify-center items-center'>
      <form
        className='max-w-sm mx-auto p-6 bg-white rounded-lg shadow-xl'
        onSubmit={handleSubmit}
      >
        <h1 className='font-bold text-xl mb-2 text-center'>
          Login to your account
        </h1>
        <Link href='/register'>
          <a className='block text-center text-blue-500 hover:text-blue-400 mb-4'>
            or create a new account
          </a>
        </Link>
        <input
          type='email'
          name='email'
          onChange={onInput}
          value={email}
          placeholder='Enter email'
          autoComplete='email'
          required
          className={`block py-2 px-4 w-64 border border-gray-400 focus:outline-none focus:ring focus:border-blue-400 rounded ${
            !errors['email'] ? 'mb-3' : ''
          }`}
        />
        {errors['email'] && (
          <ErrorMessage className='mb-3' message={errors['email']} />
        )}
        <input
          className={`block py-2 px-4 w-64 border border-gray-400 focus:outline-none focus:ring focus:border-blue-400 rounded ${
            !errors['password'] ? 'mb-3' : ''
          }`}
          type='password'
          name='password'
          placeholder='Enter password'
          onChange={onInput}
          value={password}
          required
          autoComplete='current-password'
        />
        {errors['password'] && (
          <ErrorMessage className='mb-3' message={errors['password']} />
        )}
        <SubmitButton
          error={errors['error']}
          loading={loading}
          text={'Login'}
        />
        {errors['error'] && (
          <ErrorMessage className='mt-2' message={errors['error']} />
        )}
      </form>
    </div>
  )
}
