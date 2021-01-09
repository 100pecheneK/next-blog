import {useRouter} from 'next/router'
import {useEffect} from 'react'


export default function usePrivatePage(redirect) {
  const router = useRouter()

  useEffect(() => {
    console.log(redirect)
    if (redirect) {
      router.push(redirect.destination)
    }
  }, [])
  return null
}