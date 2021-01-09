import { AuthProvider } from '@contexts/AuthContext'
import '../../styles/index.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
