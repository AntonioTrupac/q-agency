import axios from "axios";
import { useCallback, useEffect } from "react";
import { useState } from "react";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchData = useCallback( async (url: string) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            if(response.status === 200) {
            setData(response.data);
            setLoading(false);
        }
            if(response.status === 404) {
            setError(response.statusText);
        }
        } catch (error) {
            console.error(error.message);
            setError(error.message);  
        }
    }, [])

    useEffect(() => {
        fetchData(url);
    }, [fetchData, url]);

    return { data, loading, error};
}