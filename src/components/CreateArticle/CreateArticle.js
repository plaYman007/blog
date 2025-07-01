import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import styles from './CreateArticle.module.scss'
import { Link } from 'react-router-dom'
export default function CreateArticle() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  useEffect(() => {
    if (fields.length === 0) append('')
  }, [fields, append])

  const onSubmit = async (data) => {
    setMessage('')
    setError('')

    const token = localStorage.getItem('token')
    const bodyToSend = { article: data }

    try {
      const response = await fetch(
        'https://blog-platform.kata.academy/api/articles',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(bodyToSend),
        }
      )

      const result = await response.json()

      if (response.ok) {
        setMessage('Article created successfully!')
      } else {
        setError(result.errors ? result.errors : 'Something went wrong.')
      }
    } catch (error) {
      setError('Network error occurred.')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.title}>Create new article</h3>

          <label>
            <p className={styles.inputName}>Title</p>
            <input
              className={styles.input}
              placeholder="Title"
              {...register('title', { required: true, maxLength: 100 })}
            />
            {errors.title?.type === 'required' && (
              <p className={styles.error}>Title is required</p>
            )}
            {errors.title?.type === 'maxLength' && (
              <p className={styles.error}>
                Title must be at most 100 characters
              </p>
            )}
          </label>

          <label>
            <p className={styles.inputName}>Short description</p>
            <input
              className={styles.input}
              placeholder="Short description"
              {...register('description', { required: true, maxLength: 170 })}
            />
            {errors.description?.type === 'required' && (
              <p className={styles.error}>Description is required</p>
            )}
            {errors.description?.type === 'maxLength' && (
              <p className={styles.error}>
                Description must be at most 170 characters
              </p>
            )}
          </label>

          <label>
            <p className={styles.inputName}>Text</p>
            <textarea
              className={styles.textarea}
              placeholder="Text"
              {...register('body', { required: true })}
            />
          </label>
          {errors.body && <p className={styles.error}>Text is required</p>}
          <div className={styles.tagsMenu}>
            <p className={styles.inputName}>Tags</p>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.tagCreate}>
                <div>
                  {' '}
                  <input
                    className={styles.inputTag}
                    placeholder="Tag"
                    {...register(`tagList.${index}`, {
                      required: true,
                      maxLength: 50,
                    })}
                  />
                  {errors.tagList?.[index]?.type === 'required' && (
                    <p className={styles.error}>Tag is required</p>
                  )}
                  {errors.tagList?.[index]?.type === 'maxLength' && (
                    <p className={styles.error}>
                      Tag must be at most 50 characters
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonDelete}`}
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  Delete
                </button>
                {index === fields.length - 1 && (
                  <button
                    type="button"
                    className={`${styles.button} ${styles.buttonAdd}`}
                    onClick={() => append('')}
                  >
                    Add tag
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.formButton}>
              Send
            </button>
            {error && (
              <p className={`${styles.errorMessage} ${styles.message}`}>
                {error}
              </p>
            )}
            {message && (
              <>
                <p
                  className={`${styles.successfullyMessage} ${styles.message}`}
                >
                  {message}
                </p>
                <Link to={'/'}>
                  <button
                    type="button"
                    className={`${styles.formButton} ${styles.goHomeButton}`}
                  >
                    Go to home
                  </button>
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}