import {FC, useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';

type Post = {

id: number, title: string, body: string, userId: number
}

type PostsProps = {
   helloMessage: string;
}

export const Posts: FC<PostsProps> = ({helloMessage}) => {
   const [posts, setPosts] = useState<Post[]>([]);
   const postComponent = 'post component';

   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");

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
      console.log(`${helloMessage} ${postComponent}`)
   }, [helloMessage])

   if(loading) return <div>LOADING...</div>

   return(
      <div className='post-list'>

      </div>
   )
}