// FloatingAlert.js
import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`${styles.floatingAlert} ${styles[type]}`}>
      <p>{message}</p>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default Alert;
