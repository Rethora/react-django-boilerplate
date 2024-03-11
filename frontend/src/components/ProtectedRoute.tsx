import { Fragment } from 'react'
import { useAppSelector } from 'app/hooks'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Fragment>{props.children}</Fragment>
}

export default ProtectedRoute
