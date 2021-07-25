import {FC, useState, useEffect, useCallback, useContext} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {PostType} from '../types/types';
import { UserDetails } from './UserDetails';
import { AppContext } from '../context/ApiContext';
import { useFetch } from '../hooks/useFetch';

type PostDetailsProps = {
    helloMessage: string;
}

type ParamTypes = {
    id: string;
}

export const PostDetails: FC<PostDetailsProps> = (props) => {
    // const [postDetails, setPostDetails] = useState<PostType>();
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string>("");
    const hello = 'post details component';
    const context = useContext(AppContext)

    let { id } = useParams<ParamTypes>();

    const {data, loading } = useFetch<PostType>(`https://jsonplaceholder.typicode.com/posts/${id}`);

    // const fetchPostDetails = useCallback(async () => {
    // try {
    //     const response = await axios.get(
    //     `https://jsonplaceholder.typicode.com/posts/${id}`
    //     );
    //     if (response.status === 200) {
    //     setPostDetails(response.data);
    //     setIsLoading(false);
    //     }
    // } catch (error) {
    //     console.error(error);
    //     setError(error.message);
    //     throw new Error("Something went wrong");
    // }
    // }, [id]);

    // useEffect(() => {
    // setIsLoading(true);
    // fetchPostDetails();
    // }, [fetchPostDetails]);

    // useEffect(() => {
    //     console.log(`${props.helloMessage}${hello}`)
    // }, [props.helloMessage])

    return (
    <div>
        <UserDetails post={data} user={context.dataUser}/>
        {data?.body}
        {data?.title}
    </div>
    );
}