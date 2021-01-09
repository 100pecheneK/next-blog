import React from 'react'
import Link from 'next/Link'
import { useAuth } from '@contexts/AuthContext'
import ContentWithErrorAndLoading from '@components/ContentWithErrorAndLoading'

export default function Navbar() {
  const { user, error, loading } = useAuth()
  return (
    <nav className=' bg-gradient-to-r from-purple-500 to-purple-700 p-6'>
      <div className='container flex flex-wrap'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <Link href='/'>
            <a>
              <span className='font-bold text-xl'>Mitter</span>
            </a>
          </Link>
        </div>
        <div className='w-full block flex-grow sm:flex sm:items-center sm:w-auto'>
          <ContentWithErrorAndLoading
            error={error}
            loading={loading}
            color={'white'}
            render={() => {
              const href = user ? '/me' : '/login'
              const text = user ? 'My Profile' : 'Login'
              return (
                <>
                  <div className='text-sm sm:flex-grow'>
                    {user && (
                      <>
                        <Link href='/posts/create'>
                          <a className='block mt-4 mr-4 sm:inline-block sm:mt-0 text-gray-200 hover:text-white'>
                            Create
                          </a>
                        </Link>
                        {/* <Link href='/posts/my'>
                          <a className='block mt-4 mr-4 sm:inline-block sm:mt-0 text-gray-200 hover:text-white'>
                            View my
                          </a>
                        </Link> */}
                      </>
                    )}
                  </div>
                  <div>
                    <Link href={href}>
                      <a className='inline-block text-sm px-4 py-2 mt-4 md:mt-0 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple-700 hover:bg-white'>
                        {text}
                      </a>
                    </Link>
                  </div>
                </>
              )
            }}
          />
        </div>
      </div>
    </nav>
  )
}
