import { registerUserService } from '../../services/userService'

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

export const registerUser = ({ username, email, password }) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST })

    try {
      const data = await registerUserService({ username, email, password })

if (data.errors) {
  const errorMessage = Object.entries(data.errors)
    .map(([field, messages]) => {
      const msgs = Array.isArray(messages) ? messages : [messages]
      return `${field} is already taken`
    })
    .join(', ')
  throw new Error(errorMessage)
}

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

      localStorage.setItem('token', data.user.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    } catch (error) {
      dispatch({ type: REGISTER_USER_FAILURE, payload: error.message })
    }
  }
}