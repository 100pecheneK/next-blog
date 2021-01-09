import Loader from '@components/Loader'
import ErrorMessage from '@components/ErrorMessage'

export default function ContentWithErrorAndLoading({
  children,
  error,
  loading,
  color = 'black',
  render: Render,
}) {
  if (error) {
    return <ErrorMessage message={error} />
  }
  if (loading) {
    return <Loader color={`text-${color}`} />
  }
  return children ? <>{children}</> : <Render />
}
