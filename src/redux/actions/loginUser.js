import { loginUserService } from '../../services/userService'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST })

    try {
      const data = await loginUserService(email, password)

      if (data.errors) {
        const errorMessage = Object.entries(data.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('; ')
        throw new Error(errorMessage)
      }

      dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user })

      localStorage.setItem('token', data.user.token)
      localStorage.setItem('user', JSON.stringify(data.user))
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAILURE, payload: error.message })
    }
  }
}