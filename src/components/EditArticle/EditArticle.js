import React, { useState } from 'react';
import styles from './EditArticle.module.scss';

const EditArticle = () => {
  const [title, setTitle] = useState('123');
  const [description, setDescription] = useState('123');
  const [text, setText] = useState('123');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(['123']);

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(t => t !== tagToDelete));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Edit Article</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            className={styles.textarea}
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div>
            {tags.map((t) => (
              <div key={t} className={styles.buttonRow}>
                <span>{t}</span>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteTag(t)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className={styles.buttonRow}>
            <input
              className={styles.tagInput}
              placeholder="Enter tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              type="button"
              className={styles.addTag}
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>
          <button type="submit" className={styles.submitBtn}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;