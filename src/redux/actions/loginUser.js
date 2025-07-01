export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST })

    try {
      const response = await fetch(
        'https://blog-platform.kata.academy/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              email,
              password,
            },
          }),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.errors ? JSON.stringify(errorData.errors) : 'Login failed'
        )
      }

      const data = await response.json()
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user })

      localStorage.setItem('token', data.user.token)

      localStorage.setItem('user', JSON.stringify(data.user))
    } catch (error) {
      let message = error.message

      try {
        const parsed = JSON.parse(error.message)
        message = Object.entries(parsed)
          .map(
            ([field, msg]) =>
              `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`
          )
          .join(', ')
      } catch {
        // error.message не JSON — оставить как есть
      }

      dispatch({ type: LOGIN_USER_FAILURE, payload: message })
    }
  }
}