import React from 'react'

function Post({ post, lastPostElementRef }) {
  return (
    <div ref={lastPostElementRef}>
      <em>
        {new Date(post.createdAt).toLocaleTimeString() +
          ' ' +
          new Date(post.createdAt).toLocaleDateString()}
      </em>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: '0.5em',
          }}
        >
          {/* <img
            style={{
              marginRight: '1em',
              width: '30px',
              height: 'auto',
              borderRadius: '50%',
            }}
            src={post.userData.avatar}
            alt={post.userData.name}
          /> */}
          {post.user.username}
        </p>
        |<p style={{ marginLeft: '0.5em' }}>{post.text}</p>
      </div>
    </div>
  )
}

export default function Posts({ posts, lastPostElementRef }) {
  if (!posts.length) {
    return <></>
  }
  return (
    <>
      {
        <ul>
          {posts.map((doc, index) => (
            <li
              key={doc._id}
              style={{
                border: '1px solid',
                padding: '1em 0.5em',
                marginBottom: '2em',
              }}
            >
              {posts.length === index + 1 ? (
                <Post post={doc} lastPostElementRef={lastPostElementRef} />
              ) : (
                <Post post={doc} />
              )}
            </li>
          ))}
        </ul>
      }
    </>
  )
}
