import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import type { JSX } from 'react'

interface Props {
  children: JSX.Element
}

const PrivateRoute = ({ children }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user)

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute
