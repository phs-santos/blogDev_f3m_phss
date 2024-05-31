import { useState } from 'react';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export const userUpdateDocument = (docCollection, docId) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateDocument = async (newData) => {
        setLoading(true);
        try {
            const docRef = doc(db, docCollection, docId);
            const documentUpdated = await updateDoc(docRef, newData);
            setLoading(false);
            return documentUpdated;
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
        setLoading(false);
    };

    return {
        updateDocument,
        error,
        loading

    };
};