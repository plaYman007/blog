const BASE_URL = 'https://blog-platform.kata.academy/api'

export async function loginUserService(email, password) {
  return await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: { email, password } }),
  }).then((res) => res.json())
}

export async function registerUserService(userData) {
  return await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userData }),
  }).then((res) => res.json())
}

export async function getCurrentUser(token) {
  return await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((res) => res.json())
}

export async function updateUser(userData, token) {
  return await fetch(`${BASE_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user: userData }),
  }).then((res) => res.json())
}