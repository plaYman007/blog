import styles from './EditArticle.module.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getArticleBySlug, updateArticle } from '../../services/articleService'

export default function EditArticle() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const token = useSelector((state) => state.user?.user?.token || '')
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
        const { article } = await getArticleBySlug(slug, token)
        reset({
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList.map((tag) => ({ value: tag })),
        })
      } catch (err) {
        setError('Ошибка загрузки статьи')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug, token, reset])

  const onSubmit = async (data) => {
    const tagList = data.tagList.map((tag) => tag.value).filter(Boolean)

    try {
      const res = await updateArticle(slug, { ...data, tagList }, token)

      if (res.errors) {
        const messages = Object.entries(res.errors)
          .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
          .join('; ')
        throw new Error(messages)
      }

      setMessage('Статья успешно обновлена')
      navigate(`/articles/${slug}`)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Загрузка...</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Форма редактирования статьи */}
    </form>
  )
}