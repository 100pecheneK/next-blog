import React, { useContext, useState, useEffect } from 'react'
import { PostsContext } from '../contexts/PostContext'
import Posts from './Posts'

export default function PostForm() {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState('')
  const { addPost, createdPosts, setCreatedPosts } = useContext(PostsContext)
  useEffect(() => {
    setCreatedPosts([])
  }, [])
  const handleSubmit = async e => {
    e.preventDefault()
    if (post) {
      setLoading(true)
      await addPost(post)
      setLoading(false)
      setPost('')
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='text'
            name='post'
            id='post'
            autoComplete='off'
            value={post}
            onChange={e => setPost(e.target.value)}
            placeholder='Today I...'
          />
          <button type='submit'>Submit {loading && ' | Loading...'}</button>
        </div>
      </form>
      {createdPosts.length ? (
        <Posts posts={createdPosts} />
      ) : (
        <p>Here you will see your created posts</p>
      )}
    </>
  )
}
