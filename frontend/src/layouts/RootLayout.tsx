import { Outlet } from 'react-router-dom'
import { useRefreshTokenQuery, useVerifyTokenQuery } from '../services/auth/api'
import { useEffect } from 'react'

const RootLayout = () => {
  const { isLoading: refreshLoading, refetch } = useRefreshTokenQuery(
    undefined,
    {
      skip: !localStorage.getItem('refresh'),
    }
  )
  const { isLoading: verifyLoading } = useVerifyTokenQuery(undefined, {
    skip: !localStorage.getItem('access') || refreshLoading,
  })

  // * refresh token every 5 minutes
  useEffect(() => {
    setInterval(
      () => {
        refetch()
      },
      5 * 60 * 1000
    )
  }, [refetch])

  if (verifyLoading || refreshLoading) {
    return <div>Loading...</div>
  }

  return <Outlet />
}

export default RootLayout
