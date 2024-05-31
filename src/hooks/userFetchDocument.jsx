import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const userFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const loadDocument = async () => {
            setLoading(true);

            try {
                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                setDocument({
                    ...docSnap.data(),
                    id: docSnap.id
                });
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
            setLoading(false)
        }

        loadDocument()

    }, [docCollection, id])

    return {
        document,
        error,
        loading
    }
}