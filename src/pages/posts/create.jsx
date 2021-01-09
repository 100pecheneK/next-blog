import React, { useRef, useState, useEffect } from 'react'
import { Message } from '@components/ErrorMessage'
import Link from 'next/Link'
import { SecondaryButton, SubmitButton } from '@components/Button'
import MainPage from '@layout/MainPage'
import { privateServerSideProps } from '@utils/getAuthServerSideProps'

const initialForm = {
  text: '',
}

export default function Create() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [ok, setOk] = useState(false)
  const textareaRef = useRef()
  const [textAreaHeight, setTextAreaHeight] = useState('auto')
  const { text } = form

  function resetTextArea() {
    setTextAreaHeight('auto')
  }

  function onFormChange(e) {
    resetTextArea()
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    setTextAreaHeight(`${textareaRef.current.scrollHeight}px`)
  }, [text])

  useEffect(() => {
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }, [textareaRef.current?.scrollHeight])

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.text.replaceAll('\n', '').length) {
      setErrors(prevErrors => ({
        ...prevErrors,
        text: 'This field is required.',
      }))
      return
    }
    setErrors({})
    setLoading(true)
    fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form,
        text: text.replace(/<[^>]*>/g, '').replaceAll('\n', '<br>'),
      }),
    }).then(async res => {
      setLoading(false)
      if (res.ok) {
        setOk(true)
        setForm(prev => {
          resetTextArea()
          return initialForm
        })
      } else {
        const { error } = await res.json()
        setErrors({ error })
      }
    })
  }

  return (
    <MainPage>
      <form
        onSubmit={handleSubmit}
        className='max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl'
      >
        <h1 className='font-bold text-xl mb-2 text-center'>
          Share your thoughts
        </h1>
        <textarea
          ref={textareaRef}
          type='text'
          name='text'
          onChange={onFormChange}
          value={text}
          rows={1}
          style={{
            height: textAreaHeight,
          }}
          placeholder='Enter text'
          autoComplete='text'
          required
          className={`block py-2 px-4 w-full overflow-hidden border border-gray-400 focus:outline-none focus:ring focus:border-blue-400 rounded ${
            !errors['password'] ? 'mb-3' : ''
          }`}
        />
        {ok && (
          <Message
            type='ok'
            message='Post successfully created'
            className='mb-3 w-full'
          />
        )}
        {errors['error'] && (
          <Message
            type='error'
            message={errors['error']}
            className='mb-3 w-full'
          />
        )}
        <div className='flex justify-end items-center'>
          <SubmitButton
            error={errors['error']}
            loading={loading}
            text={'Create'}
          />
          <SecondaryButton
            href='/'
            isLink={true}
            text='Go back'
            className='ml-2'
          />
        </div>
      </form>
    </MainPage>
  )
}

export const getServerSideProps = privateServerSideProps
