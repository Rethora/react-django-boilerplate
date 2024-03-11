import { useLogoutMutation, useTestAuthenticatedQuery } from 'services/auth/api'

const Protected = () => {
  const [logout] = useLogoutMutation()
  const { data, isLoading } = useTestAuthenticatedQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Protected</h1>
      <p>{data?.message}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}
export default Protected
