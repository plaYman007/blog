const BASE_URL = 'https://blog-platform.kata.academy/api'

export async function getArticles(page, token) {
  const res = await fetch(`${BASE_URL}/articles?limit=5&offset=${(page - 1) * 5}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }),
    },
  })

  if (!res.ok) {
    throw new Error(`Ошибка при загрузке статей: ${res.status}`)
  }

  return res.json()
}
export async function createArticle(articleData, token) {
  return await fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: articleData }),
  }).then((res) => res.json())
}

export async function updateArticle(slug, articleData, token) {
  return await fetch(`${BASE_URL}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: articleData }),
  }).then((res) => res.json())
}

export async function deleteArticle(slug, token) {
  return await fetch(`${BASE_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}

export async function getArticleBySlug(slug, token) {
  return await fetch(`${BASE_URL}/articles/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Token ${token}` }),
    },
  }).then((res) => res.json())
}