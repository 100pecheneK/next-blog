import React, { useEffect, useState } from 'react'
import MainPage from '@layout/MainPage'
import { privateServerSideProps } from '@utils/getAuthServerSideProps'
import ContentWithErrorAndLoading from '@components/ContentWithErrorAndLoading'
import useFetchSWR from '@utils/useFetchSWR'
import useFetcher from '@hooks/useFetcher'
import { useAuth } from '@contexts/AuthContext'

const Profile = ({ user }) => (
  <>
    <p className='text-2xl'>
      <strong>Username: </strong>
      {user?.username}
    </p>
    <p className='text-2xl'>
      <strong>Email: </strong>
      {user?.email}
    </p>
    <a
      href='/api/logout'
      className='block text-red-600 hover:text-red-400 hover:underline mt-4'
    >
      Logout from account
    </a>
  </>
)

export default function Me() {
  const { user, error, loading, refresh } = useAuth()
  
  useEffect(() => {
    refresh()
  }, [])

  return (
    <MainPage>
      <h1 className='text-4xl font-bold mb-4'>Your profile</h1>
      <ContentWithErrorAndLoading
        error={error}
        loading={loading}
        render={() => <Profile user={user} />}
      />
    </MainPage>
  )
}

export const getServerSideProps = privateServerSideProps
