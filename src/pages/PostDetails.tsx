import {FC, useState, useEffect, useCallback, useContext} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {PostType} from '../types/types';
import { UserDetails } from './UserDetails';
import { AppContext } from '../context/ApiContext';

type ParamTypes = {
    id: string;
}

export const PostDetails: FC = (props) => {
    const [postDetails, setPostDetails] = useState<PostType>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const { dataUser, loading} = useContext(AppContext)

    let { id } = useParams<ParamTypes>();

    const fetchPostDetails = useCallback(async () => {
    try {
        const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (response.status === 200) {
        setPostDetails(response.data);
        setIsLoading(false);
        }
    } catch (error) {
        console.error(error);
        setError(error.message);
        throw new Error("Something went wrong");
    }
    }, [id]);

    useEffect(() => {
    setIsLoading(true);
    fetchPostDetails();
    }, [fetchPostDetails]);

    return (
    <div>
        <UserDetails post={postDetails} user={dataUser}/>
        {postDetails?.body}
        {postDetails?.title}
    </div>
    );
}