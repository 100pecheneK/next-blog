import React from 'react'
import Link from 'next/Link'

export default function Navbar({ user }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 2em',
      }}
    >
      {user && (
        <>
          <p style={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{
                marginRight: '1em',
                width: '50px',
                height: 'auto',
                borderRadius: '50%',
              }}
              src={user.picture}
              alt={user.name}
            />
            {user.name}
          </p>
          <Link href='create'>
            <a>Create post</a>
          </Link>
        </>
      )}
      <div>
        {user ? (
          <a style={{ color: 'blue' }} href='/api/logout'>
            Logout
          </a>
        ) : (
          <a style={{ color: 'blue' }} href='/login'>
            Login
          </a>
        )}
      </div>
    </nav>
  )
}
