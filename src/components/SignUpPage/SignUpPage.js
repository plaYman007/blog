import styles from './SignUpPage.module.scss'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { registerUser } from '../../redux/actions/registerUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function SignUpPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error, user } = useSelector((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onChange' })
  const password = watch('password')

  const onSubmit = (data) => {
    const { username, email, password } = data
    dispatch(registerUser({ username, email, password }))
  }
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
  return () => {
    dispatch({ type: 'CLEAR_USER_ERROR' })
  }
}, [dispatch])

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        {error && <p className={styles.registerError}>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.title}>Create new account</h3>

          <label>
            <p className={styles.inputName}>Username</p>
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="Username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be at most 20 characters',
                },
              })}
            />
            {errors.username && (
              <p className={styles.errorText}>{errors.username.message}</p>
            )}
          </label>

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
                maxLength: {
                  value: 40,
                  message: 'Password must be at most 40 characters',
                },
              })}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </label>

          <label>
            <p className={styles.inputName}>Repeat Password</p>
            <input
              type="password"
              className={`${styles.input} ${errors.repeatPassword ? styles.inputError : ''}`}
              placeholder="Repeat Password"
              {...register('repeatPassword', {
                required: 'Please repeat your password',
                validate: (value) =>
                  value === password || 'Passwords must match',
              })}
            />
            {errors.repeatPassword && (
              <p className={styles.errorText}>
                {errors.repeatPassword.message}
              </p>
            )}
          </label>

          <label className={styles.checkboxWrapper}>
            <input
              className={styles.checkboxInput}
              type="checkbox"
              {...register('confirm', {
                required: 'You must agree to the terms',
              })}
            />
            I agree to the processing of my personal information
            <span className={styles.checkbox}></span>
          </label>

          {errors.confirm && (
            <p className={styles.errorText}>{errors.confirm.message}</p>
          )}

          <button
            type="submit"
            className={`${styles.formButton} ${!isValid ? styles.disabledButton : ''}`}
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Loading...' : 'Create'}
          </button>

          <p className={styles.signUpText}>
            Already have an account?
            <span className={styles.blueText}>
              <Link className={styles.link} to={`/sign-in`}>
                Sign In
              </Link>
            </span>
            .
          </p>
        </form>
      </div>
    </div>
  )
}