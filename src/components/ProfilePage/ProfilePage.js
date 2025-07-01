import styles from './ProfilePage.module.scss'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function ProfilePage() {
  const user = useSelector((state) => state.user && state.user.user)

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }

    const userData = {
      username: data.username,
      email: data.email,
      ...(data.password && { password: data.password }),
      ...(data.image && { image: data.image }),
    }

    try {
      const res = await fetch('https://blog-platform.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ user: userData }),
      })

      const result = await res.json()

      if (!res.ok) {
        throw result
      }

      dispatch({ type: 'UPDATE_USER', payload: result.user })
      localStorage.setItem('user', JSON.stringify(result.user))
    } catch (err) {
      // console.error('Ошибка обновления:', err)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.title}>Edit Profile</h3>
          <label>
            <p className={styles.inputName}>Username</p>
            <input
              type="text"
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              placeholder="Username"
              {...register('username', {
                required: 'Username is required',
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
              className={styles.input}
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
            <p className={styles.inputName}>New password</p>
            <input
              type="password"
              className={styles.input}
              placeholder="New password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password must be no more than 40 characters',
                },
              })}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </label>
          <label>
            <p className={styles.inputName}>Avatar image (url)</p>
            <input
              type="text"
              className={styles.input}
              placeholder="Avatar image"
              {...register('image', {
                pattern: {
                  value: /^(https?:)?\/\/.+/i,
                  message: 'Invalid image URL',
                },
              })}
            />
            {errors.image && (
              <p className={styles.errorText}>{errors.image.message}</p>
            )}
          </label>
          <button type="submit" className={styles.formButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}