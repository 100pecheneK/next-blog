import { createContext, useState, useEffect } from 'react'
const PostsContext = createContext()

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [createdPosts, setCreatedPosts] = useState([])

  const addPost = async text => {
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      })
      const newPost = await res.json()
      setCreatedPosts(prevPosts => [newPost, ...prevPosts])
    } catch (e) {
      console.error(e)
    }
  }

  const deletePost = async id => {
    try {
      await fetch('/api/post/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      })
      setPosts(prevPosts => prevPosts.filter(psot => psot._id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        deletePost,
        setPosts,
        createdPosts,
        setCreatedPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
export { PostsProvider, PostsContext }
