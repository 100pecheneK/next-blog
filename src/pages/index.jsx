import MainPage from '@layout/MainPage'
import createMarkup from '@utils/createMarkup'

import React, { useCallback, useRef, useState, useEffect } from 'react'
import fetcher from '@utils/fetcher'
import Loader from '@components/Loader'
function Post({ post, isLast, lastPostElementRef }) {
  return (
    <div
      className='rounded shadow-md bg-gray-100 mb-10 px-4 py-2'
      ref={isLast ? lastPostElementRef : null}
    >
      <p dangerouslySetInnerHTML={createMarkup(post.text)} className='mb-2' />
      <span className='text-white cursor-pointer'>
        <span className='py-1 pl-2 pr-1 rounded-l bg-blue-600'>Author: </span>
        <span className='py-1 pr-2 pl-1 rounded-r bg-blue-400'>
          {post.user.username}
        </span>
      </span>
    </div>
  )
}

const getKey = (pageIndex, previousPageData, firstId) => {
  if (previousPageData && !previousPageData?.message?.hasNextPage) return null
  return `/api/post?perPage=10&q=all&page=${pageIndex}${
    firstId ? `&first=${firstId}` : ''
  }`
}

function useFetchInfinite(getKey) {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const getData = useCallback(async () => {
    if (!hasMore) return
    try {
      setLoading(true)
      const firstId = data.length && data[0].message.docs[0]._id
      const key = getKey(page, data[page - 2], firstId)
      console.log(key)
      if (key === null) {
        setHasMore(false)
        return
      }
      const d = await fetcher(key)
      setData(prevD => [...prevD, d])
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [data, page, hasMore])

  useEffect(() => {
    getData()
  }, [page])
  return { data, error, page, setPage, loading, hasMore }
}

export default function Index() {
  const { data, error, loading, setPage, hasMore } = useFetchInfinite(getKey)

  const observer = useRef()
  const lastPostElementRef = useCallback(
    node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <MainPage>
      <h1 className='font-bold text-4xl text-center'>Last posts</h1>
      <div className='container md:w-9/12 xl:w-2/4 mt-5 px-0'>
        {data.map(({ message: { docs: posts } }) =>
          posts.map((post, index) => (
            <Post
              key={post._id}
              post={post}
              lastPostElementRef={lastPostElementRef}
              isLast={index === posts.length - 1}
            />
          ))
        )}
        <div>{loading && <Loader color={'text-black'} />}</div>
        <div>{error && 'Error'}</div>
      </div>
    </MainPage>
  )
}
