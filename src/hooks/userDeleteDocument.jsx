import { useState } from 'react';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

export const userDeleteDocument = (docCollection) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const deleteDocument = async (id) => {
        setLoading(true);

        try {
            const docRef = await doc(db, docCollection, id);
            const documentDeleted = await deleteDoc(docRef);
            return documentDeleted;
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
        setLoading(false)
    }

    return {
        deleteDocument,
        error,
        loading
    }
}