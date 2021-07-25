import {FC, useCallback, useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { PostType } from '../types/types';
import { Post } from './Post';
import { UserDetails } from './UserDetails';
import { AppContext } from '../context/ApiContext';
import { Comments } from './Comments';


type PostsProps = {
   helloMessage: string;
}

export const Posts: FC<PostsProps> = (props) => {
   const [posts, setPosts] = useState<PostType[]>([]);
   const hello = 'post component';

   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");

   const { dataUser, dataComments } = useContext(AppContext)


   const getPosts = useCallback(async () => {
      try {
         const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
         );
         if (response.status === 200) {
            setPosts(response.data);
            setLoading(false);
         }
      } catch (error) {
         console.error(error);
         setError(error.message);
      }
   }, []);

   useEffect(() => {
      setLoading(true);
      getPosts();
   }, [getPosts]);


   useEffect(()=> {
      console.log(`${props.helloMessage} ${hello}`)
   }, [props.helloMessage])

   

   if(loading) return <div>LOADING...</div>
   if(error) return <div>{error}</div>

   return(
     <div className='post-container'>
        {posts.map((post) => {
            const filterComments = dataComments?.filter((comment) => comment.postId === post.id);
            return (
            <div key={post.id}>
                <Post post={post} >
                    <div className='post-comment'>
                    <h3 className='post-comment__heading'>Comments</h3>   
                    {filterComments?.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <Comments comment={comment} />
                            </div>
                        )
                    })}
                    </div>
                    <UserDetails post={post} user={dataUser}/>
                </Post>
            </div>
            );
        })}
    </div>
   )
}