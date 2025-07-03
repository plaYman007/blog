import styles from './CreateArticle.module.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createArticle } from '../../redux/actions/articleActions'

export default function CreateArticle() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [tagList, setTagList] = useState([''])
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const cleanedTags = tagList.filter((tag) => tag && tag.trim() !== '')

    const newArticle = {
      title,
      description,
      body,
      tagList: cleanedTags,
    }

try {
  await dispatch(createArticle(newArticle))
  navigate('/articles')
} catch (err) {
  setError('Failed to create article. Please try again.')
}
  }
  const handleTagChange = (index, value) => {
    const newTags = [...tagList]
    newTags[index] = value
    setTagList(newTags)
  }

  const addTag = () => setTagList([...tagList, ''])

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>Create New Article</h2>
          {error && <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>}

          <div className={styles.inputName}>Title</div>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className={styles.inputName}>Short description</div>
          <input
            type="text"
            placeholder="Short Description"
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className={styles.inputName}>Text</div>
          <textarea
            placeholder="Text"
            className={styles.textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />

<div className={styles.tagsMenu}>
  {tagList.map((tag, index) => (
    <div key={index} className={styles.tagCreate}>
      <input
        type="text"
        className={styles.inputTag}
        placeholder="Enter tag"
        value={tag}
        onChange={(e) => {
          const newTags = [...tagList]
          newTags[index] = e.target.value
          setTagList(newTags)
        }}
      />
      <button
        type="button"
        className={`${styles.button} ${styles.buttonDelete}`}
        onClick={() => {
          const newTags = tagList.filter((_, i) => i !== index)
          setTagList(newTags)
        }}
      >
        Delete
      </button>
    </div>
  ))}

  <button
    type="button"
    className={`${styles.button} ${styles.buttonAdd}`}
    onClick={() => setTagList([...tagList, ''])}
  >
    Add Tag
  </button>
</div>

<div className={styles.buttonWrapper}>
  <button type="submit" className={styles.formButton}>
    Send
  </button>
</div>
        </form>
      </div>
    </div>
  )
}
