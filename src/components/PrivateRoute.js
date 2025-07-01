import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user.user)

  return user ? children : <Navigate to="/sign-in" replace />
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}