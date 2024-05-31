import React from 'react';
import styles from './Dashboard.module.css';
import { userFetchDocuments } from '../../hooks/userFetchDocuments';
import { userDeleteDocument } from '../../hooks/userDeleteDocument';
import { useAuthValue } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuthValue();
  const docCollection = 'posts';
  const { documents, error, loading } = userFetchDocuments(docCollection, null, user.uid);
  const { deleteDocument } = userDeleteDocument(docCollection);

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      alert('Post excluído com sucesso!');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      <div className={styles.post_header}>
        <span>Título</span>
        <span>Ações</span>
      </div>
      {documents && documents.map((doc, index) => (
        <div className={styles.post_row} key={index}>
          <p>{doc.title}</p>
          <div>
            <a className="btn btn-outline" href={`/posts/${doc.id}`}>Ver</a>
            <a className="btn btn-outline" href={`/posts/edit/${doc.id}`}>Editar</a>
            <button className="btn btn-outline" onClick={() => handleDelete(doc.id)}>Excluir</button>
          </div>
        </div>
      ))}

      {documents && documents.length === 0 && <h2>Sem posts</h2>}
    </div>
  );
};

export default Dashboard;