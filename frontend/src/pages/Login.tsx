import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { useLoginMutation } from '../services/auth/api'
import { useCallback } from 'react'

const Login = () => {
  const [login] = useLoginMutation()
  const { user } = useAppSelector((state) => state.auth)

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const credentials = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      }
      login(credentials)
    },
    [login]
  )

  if (user) {
    return <Navigate to="/protected" />
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
