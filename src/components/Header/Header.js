import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../redux/actions/logoutUser'
import defaultAvatar from '../../pics/avatar.png'
export default function Header() {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/articles')
  }
  return (
    <header className={styles.header}>
      <Link className={styles.link} to={`/articles/`}>
        <h6 className={styles.blogName}>Realworld Blog</h6>
      </Link>
      {!user ? (
        <div className={styles.buttons}>
          <Link className={styles.link} to={`/sign-in`}>
            <button type="button" className={styles.button}>
              Sign In
            </button>
          </Link>
          <Link className={styles.link} to={`/sign-up`}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonGreen}`}
            >
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <Link to="/create-article" className={styles.link}>
            <button className={`${styles.button} ${styles.buttonCreate}`}>
              Create Article
            </button>
          </Link>
          <Link className={styles.link} to={`/profile`}>
            <span>{user.username}</span>
          </Link>
          <Link className={styles.link} to={`/profile`}>
            <img
              src={user.image || defaultAvatar}
              className={styles.avatar}
              alt="avatar"
            />
          </Link>
          <button
            className={`${styles.button} ${styles.buttonBordered}`}
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  )
}