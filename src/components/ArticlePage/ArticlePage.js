import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchArticleBySlug } from '../../redux/actions/articleActions'
import MarkdownIt from 'markdown-it'
import Article from '../Article/Article'
import styles from './ArticlePage.module.scss'

const ArticlePage = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [slug, dispatch])

  const article = useSelector((state) => state.articles.currentArticle)
  const loading = useSelector((state) => state.articles.loadingArticle)
  const error = useSelector((state) => state.articles.error)

  const fixMarkdown = (mdText) =>
    mdText
      .replace(/^(#{1,6})([^\s#])/gm, '$1 $2') // пробел после #
      .replace(/^(-|\+|\*)([^\s])/gm, '$1 $2') // пробел после маркера списка
      .replace(/^(\d+\.)[^\s]/gm, '$1 ') // пробел после цифры в списке

  if (loading) return <p>Загружается статья...</p>
  if (error) return <p>Произошла ошибка: {error}</p>
  if (!article) return <p>Статья не найдена.</p>

  const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
  const rawBody = article.body || ''
  const fixedBody = fixMarkdown(rawBody)
  const articleContent = md.render(fixedBody)
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Article
          article={article}
          isFullPage
          className={styles.Article}
          isAuthor={article.author.username === article.author.username}
        />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: articleContent }}
        />
      </div>
    </div>
  )
}

export default ArticlePage