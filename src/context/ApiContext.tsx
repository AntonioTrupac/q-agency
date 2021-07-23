import {createContext, PropsWithChildren, useCallback, useEffect, useState} from "react";
import axios from "axios";

const initialState = {
   dataPosts: [
      {
         userId: 0,
         id: 0,
         title: '',
         body: ''
      },
   ],
   loading: false,
   error: false
}

type InitialState = typeof initialState.dataPosts[0]

type Store = {
   dataPosts?: InitialState[];
   loading?: boolean;
   error?: boolean;
}

const AppContext = createContext<Store>(initialState);

interface Props extends PropsWithChildren<any> {}

const FetchContext = (props: Props) => {
   const [posts, setPosts] = useState(initialState.dataPosts);
   const [loading, setLoading] = useState(initialState.loading);
   const [error] =useState(initialState.error)

   const getPosts = useCallback(async () => {
      try {
         const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
         if(response.status === 200) {
            setPosts(response.data);
         }
         if(response.status === 404) {
            console.log('error!');
            setPosts([]);
         }
         setLoading(false);
      } catch (err) {
         console.error(err);
         console.error(err.message);
         throw new Error('Could not get the data!')
      }
   }, [])



   useEffect(() => {
       setLoading(true);
       getPosts();
   }, [getPosts])

   return (
      <AppContext.Provider value={{dataPosts: posts, loading, error}}>
         {props.children}
      </AppContext.Provider>
   );
};

export { AppContext };
export default FetchContext;