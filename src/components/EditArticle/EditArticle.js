import styles from './EditArticle.module.scss'
import { useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function EditArticle() {
  const { slug } = useParams()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://blog-platform.kata.academy/api/articles/${slug}`
        )
        const { article } = await response.json()
        reset({
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList.length ? article.tagList : [''],
        })
        setLoading(false)
      } catch (err) {
        console.error('Ошибка загрузки статьи:', err)
      }
    }
    fetchArticle()
  }, [slug, reset])

  const onSubmit = async (data) => {
    const token = localStorage.getItem('token')
    const bodyToSend = { article: data }
    setMessage('')
    setError('')
    try {
      const response = await fetch(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(bodyToSend),
        }
      )
      await response.json()
      setMessage('Article edited successfully!')
    } catch (err) {
      setError('Network error occurred.')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className={styles.title}>Edit article</h3>

          <label>
            {loading && <p>Loading...</p>}
            <p className={styles.inputName}>Title</p>
            <input
              className={styles.input}
              placeholder="Title"
              {...register('title', { required: true })}
            />
            {errors.title && <p className={styles.error}>Title is required</p>}
          </label>

          <label>
            <p className={styles.inputName}>Short description</p>
            <input
              className={styles.input}
              placeholder="Short description"
              {...register('description', { required: true })}
            />
            {errors.description && (
              <p className={styles.error}>Description is required</p>
            )}
          </label>

          <label>
            <p className={styles.inputName}>Text</p>
            <textarea
              className={styles.textarea}
              placeholder="Text"
              {...register('body', { required: true })}
            />
            {errors.body && <p className={styles.error}>Text is required</p>}
          </label>

          <div className={styles.tagsMenu}>
            <p className={styles.inputName}>Tags</p>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.tagCreate}>
                <input
                  className={styles.inputTag}
                  placeholder="Tag"
                  {...register(`tagList.${index}`, { required: true })}
                />
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonDelete}`}
                  onClick={() => remove(index)}
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