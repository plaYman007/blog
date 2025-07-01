import { loadUserFromToken } from './loadUserFromToken'
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST })

  try {
    const response = await fetch(
      'https://blog-platform.kata.academy/api/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      const entries = Object.entries(data.errors || {})
      const message = entries.map(([key, val]) => `${key} ${val}`).join(', ')
      throw new Error(message || 'Registration failed')
    }

    localStorage.setItem('token', data.user.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

    dispatch(loadUserFromToken(data.user.token))
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAILURE, payload: error.message })
  }
}