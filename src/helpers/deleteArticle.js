export async function deleteArticle(slug, token) {
  const response = await fetch(
    `https://blog-platform.kata.academy/api/articles/${slug}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to delete article')
  }

  return true
}