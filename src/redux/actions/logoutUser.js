export const LOG_OUT = 'LOG_OUT'

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    dispatch({ type: LOG_OUT })
  }
}