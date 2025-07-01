const initialState = {
  articles: [],
  loadingArticles: false,
  loadingArticle: false,
  error: null,
  articlesCount: 0,
  currentArticle: null,
}

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ARTICLES_START':
      return { ...state, loadingArticles: true, error: null }

    case 'FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        loadingArticles: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      }

    case 'FETCH_ARTICLES_FAILURE':
      return { ...state, loadingArticles: false, error: action.payload }

    case 'FETCH_ARTICLE_START':
      return {
        ...state,
        loadingArticle: true,
        error: null,
        currentArticle: null,
      }

    case 'FETCH_ARTICLE_SUCCESS':
      return {
        ...state,
        loadingArticle: false,
        currentArticle: action.payload.article,
      }

    case 'FETCH_ARTICLE_FAILURE':
      return { ...state, loadingArticle: false, error: action.payload }

    case 'LIKE_ARTICLE_SUCCESS':
      return {
        ...state,
        articles: state.articles.map((a) =>
          a.slug === action.payload.slug
            ? {
                ...a,
                favorited: true,
                favoritesCount: action.payload.favoritesCount,
              }
            : a
        ),
        currentArticle:
          state.currentArticle?.slug === action.payload.slug
            ? {
                ...state.currentArticle,
                favorited: true,
                favoritesCount: action.payload.favoritesCount,
              }
            : state.currentArticle,
      }

    case 'UNLIKE_ARTICLE_SUCCESS':
      return {
        ...state,
        articles: state.articles.map((a) =>
          a.slug === action.payload.slug
            ? {
                ...a,
                favorited: false,
                favoritesCount: action.payload.favoritesCount,
              }
            : a
        ),
        currentArticle:
          state.currentArticle?.slug === action.payload.slug
            ? {
                ...state.currentArticle,
                favorited: false,
                favoritesCount: action.payload.favoritesCount,
              }
            : state.currentArticle,
      }

    default:
      return state
  }
}