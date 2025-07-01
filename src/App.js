import Header from './components/Header/Header'
import ArticleList from './components/ArticleList/ArticleList'
import { Routes, Route } from 'react-router-dom'
import ArticlePage from './components/ArticlePage/ArticlePage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import SignInPage from './components/SignInPage/SignInPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import { useDispatch } from 'react-redux'
import { loadUserFromStorage } from './redux/actions/loadUser'
import { useEffect } from 'react'
import CreateArticle from './components/CreateArticle/CreateArticle'
import PrivateRoute from './components/PrivateRoute'
import EditArticle from './components/EditArticle/EditArticle'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [dispatch])
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route
          path="/create-article"
          element={
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/articles/:slug/edit"
          element={
            <PrivateRoute>
              <EditArticle />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App