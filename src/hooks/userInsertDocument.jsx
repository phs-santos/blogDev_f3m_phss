import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const userInsertDocument = (docCollection) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const insertDocument = async (document) => {
        setLoading(true)

        try {
            const newDocument = {
                ...document,
                createdAt: Timestamp.now()
            };

            const docRef = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            return docRef;
        } catch (error) {
            console.error(error);
            setError(error.message);
        };

        setLoading(false);
    }

    return { insertDocument, error, loading };
}