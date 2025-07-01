export const loadUserFromToken = (token) => async (dispatch) => {
  try {
    const res = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) throw new Error('Failed to load user')

    const data = await res.json()
    dispatch({ type: 'USER_LOADED', payload: data.user })
  } catch (err) {
    dispatch({ type: 'AUTH_ERROR' })
    console.error('Ошибка при загрузке пользователя:', err)
  }
}