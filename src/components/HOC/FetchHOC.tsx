import {ComponentType, FC, useState, useEffect} from 'react';
import axios from 'axios';


export const withLoaderAndFetch = <P extends object>(WrappedComponent: ComponentType<P>, requestUrl: string) => {
    
    const WithLoadingAndFetch: FC<P> = (props) => {
        const [data, setData] = useState<[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [error, setError] = useState<string>('');

        useEffect(() => {
            setIsLoading(true);
            if(requestUrl) fetchData(requestUrl)
        }, [])

        const fetchData = async (url: string) => {
            try {
                const response = await axios.get(url);

                if(response.status === 200) {
                    setData(response.data);
                    setIsLoading(false)
                }
                console.log(data, 'resoponse', response.data);
            } catch (error) {
                console.error(error.message);
                setIsLoading(false);
                setError(error.message);
            }
        }

        return <WrappedComponent  {...props} data={data} isLoading={isLoading} error={error}/>
    } 

    return WithLoadingAndFetch;
};