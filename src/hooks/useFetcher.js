import fetcher from '@utils/fetcher'
import { useState, useEffect, useCallback } from 'react'

export default function useFetcher(url) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false)

  function refresh() {
    setIsRefresh(prev => !prev)
  }

  const getData = useCallback(
    async function getData() {
      try {
        const d = await fetcher(url)
        setData(d)
      } catch (e) {
        setError(e.info.error)
      } finally {
        setLoading(false)
      }
    },
    [isRefresh]
  )

  useEffect(() => {
    getData()
  }, [isRefresh])

  return { data, loading, error, refresh }
}
