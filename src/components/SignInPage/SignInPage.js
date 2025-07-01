import styles from './SignInPage.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../redux/actions/loginUser'

export default function SignInPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, user } = useSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })

  const onSubmit = (data) => {
    const { email, password } = data
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && <p className={styles.registerError}>{error}</p>}
          <h3 className={styles.title}>Sign In</h3>

          <label>
            <p className={styles.inputName}>Email address</p>
            <input
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="Email address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}
          </label>

          <label>
            <p className={styles.inputName}>Password</p>
            <input
              type="password"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.',
                },
              })}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </label>

          <button
            type="submit"
            className={`${styles.formButton} ${!isValid || isLoading ? styles.disabledButton : ''}`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>

          <p className={styles.signUpText}>
            Don’t have an account?
            <span className={styles.blueText}>
              <Link className={styles.link} to={`/sign-up`}>
                Sign Up
              </Link>
            </span>
            .
          </p>
        </form>
      </div>
    </div>
  )
}