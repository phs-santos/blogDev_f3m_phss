import React from 'react';
import { useParams } from 'react-router-dom';
import { userFetchDocument } from '../../hooks/userFetchDocument';
import styles from './Post.module.css';
import loadingGif from '../../assets/loading.gif';

export default function Post() {
  const { id } = useParams();
  const { document, error, loading } = userFetchDocument('posts', id);

  if (loading) {
    return (
      <div className='container load'>
        <img src={loadingGif} alt="Loading" />
      </div>
    );
  }

  return (
    <div className={styles.post_container}>
      <h1>{document?.title}</h1>
      <img src={document?.image} alt="Post Image" />
      <p>{document?.body}</p>
      <h3>Este post trata sobre:</h3>
      <div className={styles.tags}>
        {document?.tags?.map((tag, index) => (
          <p key={index}><span>#</span>{tag}</p>
        ))}
      </div>
    </div>
  );
}
