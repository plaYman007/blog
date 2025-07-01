import styles from './Article.module.scss'
import { truncateText } from '../../helpers/truncateText'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import defaultAvatar from '../../pics/avatar.png'
import { Button, message, Popconfirm } from 'antd'
import { deleteArticle } from '../../helpers/deleteArticle'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { likeArticle, unlikeArticle } from '../../redux/actions/articleActions'
import { useDispatch } from 'react-redux'
export default function Article({
  article,
  isFullPage = false,
  isAuthor = false,
}) {
  const likes = article.favoritesCount
  const slug = article.slug
  const tagList = article.tagList
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.user?.token)
  const dispatch = useDispatch()
  const isLiked = article.favorited
  const confirm = async () => {
    try {
      await deleteArticle(slug, token)
      message.success('Article deleted')
      navigate('/')
    } catch (error) {
      message.error('Failed to delete article')
      console.error(error)
    }
  }

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  const handleLikeToggle = () => {
    if (isLiked) {
      dispatch(unlikeArticle(slug))
    } else {
      dispatch(likeArticle(slug))
    }
  }

  return (
    <div
      className={`${styles.Article} ${!isFullPage ? styles['Article--shadow'] : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.upline}>
          <Link className={styles.link} to={`/articles/${slug}`}>
            <h3 className={styles.title}>
              {article.title.trim().length > 0 ? article.title : 'No title'}
            </h3>
          </Link>
          <button
            onClick={handleLikeToggle}
            className={`${styles.like} ${isLiked ? styles.likeActive : ''}`}
          />
          <span>{likes}</span>
        </div>
        <div className={styles.tags}>
          {tagList.filter((tag) => tag && tag.trim().length > 0).length > 0 ? (
            tagList
              .filter((tag) => tag && tag.trim().length > 0)
              .map((tag, index) => (
                <span key={index} className={styles.tagItem}>
                  {truncateText(tag, 75)}
                </span>
              ))
          ) : (
            <p>No tags added</p>
          )}
        </div>

        <div className={styles.description}>
          {truncateText(article.description, 147)}
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.profile}>
          <div className={styles.authorWrapper}>
            <div className={styles.author}>{article.author.username}</div>
            <div className={styles.date}>
              {format(new Date(article.createdAt), 'MMMM d, yyyy')}
            </div>
          </div>
          <img
            alt="avatar"
            src={article.author.image || defaultAvatar}
            className={styles.avatar}
          />
        </div>
        {isAuthor && (
          <div className={styles.buttons}>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="right"
              сlassName={styles.customPop}
            >
              <Button className={`${styles.button} ${styles.buttonDelete}`}>
                Delete
              </Button>
            </Popconfirm>

            <Link to={`/articles/${slug}/edit`}>
              <button className={`${styles.button} ${styles.buttonEdit}`}>
                Edit
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

Article.propTypes = {
  isFullPage: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  article: PropTypes.shape({
    favorited: PropTypes.bool.isRequired,
    tagList: PropTypes.array.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
}