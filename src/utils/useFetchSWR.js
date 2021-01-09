import useSWR from 'swr'
import fetcher from '@utils/fetcher'

const useFetchSWR = uri => {
  return useSWR(uri, fetcher)
}

export default useFetchSWR
