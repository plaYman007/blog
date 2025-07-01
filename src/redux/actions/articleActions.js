export default function fetchArticles(page) {
  return async function (dispatch) {
    dispatch({ type: 'FETCH_ARTICLES_START' })

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Token ${token}` }),
          },
        }
      )

      if (!res.ok) throw new Error('Ошибка при загрузке статей')

      const data = await res.json()

      const articlesWithId = data.articles.map((article, index) => ({
        ...article,
        id: index + 1,
      }))

      dispatch({
        type: 'FETCH_ARTICLES_SUCCESS',
        payload: {
          articles: articlesWithId,
          articlesCount: data.articlesCount,
        },
      })
    } catch (err) {
      dispatch({ type: 'FETCH_ARTICLES_FAILURE', payload: err.message })
    }
  }
}

export function fetchArticleBySlug(slug) {
  return async function (dispatch) {
    dispatch({ type: 'FETCH_ARTICLE_START' })

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Token ${token}` }),
          },
        }
      )

      if (!res.ok) throw new Error('Ошибка при загрузке статьи')

      const data = await res.json()
      dispatch({
        type: 'FETCH_ARTICLE_SUCCESS',
        payload: { article: data.article },
      })
    } catch (err) {
      dispatch({ type: 'FETCH_ARTICLE_FAILURE', payload: err.message })
    }
  }
}

export function likeArticle(slug) {
  return async (dispatch, getState) => {
    const token = getState().user.user?.token
    if (!token) return

    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (!res.ok) throw new Error('Ошибка при лайке')

      const data = await res.json()
      dispatch({ type: 'LIKE_ARTICLE_SUCCESS', payload: data.article })
    } catch (err) {
      console.error(err)
    }
  }
}

export function unlikeArticle(slug) {
  return async (dispatch, getState) => {
    const token = getState().user.user?.token
    if (!token) return

    try {
      const res = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (!res.ok) throw new Error('Ошибка при дизлайке')

      const data = await res.json()
      dispatch({ type: 'UNLIKE_ARTICLE_SUCCESS', payload: data.article })
    } catch (err) {
      console.error(err)
    }
  }
}