import {createContext, PropsWithChildren, useCallback, useEffect, useState, useMemo} from "react";
import axios from "axios";

const initialState = {
   dataUser: [
      {
         
         id: 0,
         name: ''
      },
   ],
   dataComments: [
       {
           postId: 0,
           id: 0,
           name: '',
           body: '',
       }
   ],
   loading: false,
   error: false
}

type InitialState = typeof initialState.dataUser[0]
type InitialCommentsState = typeof initialState.dataComments[0]

type Store = {
   dataUser?: InitialState[];
   dataComments?: InitialCommentsState[];
   loading?: boolean;
   error?: boolean;
}

const AppContext = createContext<Store>(initialState);

interface Props extends PropsWithChildren<any> {}

const FetchContext = (props: Props) => {
   const [users, setUsers ] = useState(initialState.dataUser);
   const [comments, setComments] = useState(initialState.dataComments)
   const [loading, setLoading] = useState(initialState.loading);
   const [error] = useState(initialState.error);

   const getData = useCallback(async () => {
      try {
         const responsePosts = await axios.get('https://jsonplaceholder.typicode.com/users');
         const responseComments = await axios.get('https://jsonplaceholder.typicode.com/comments');
         if(responsePosts.status === 200) {
            setUsers(responsePosts.data);
            console.log(responsePosts.data);
            setLoading(false);
         }
         if(responseComments.status === 200) {
             setComments(responseComments.data);
             setLoading(false);
             console.log(responseComments.data);
         }
         if(responsePosts.status === 404 || responseComments.status === 404) {
            console.log('error!');
            setUsers([]);
            setComments([]);
            throw new Error('Could not get the data!')
         }
         
      } catch (err) {
         console.error(err);
         console.error(err.message);
      }
   }, []);


   useEffect(() => {
       setLoading(true);
       getData();
   }, [getData])

   const value = {
       dataUser: users,
       dataComments: comments,
       loading,
       error
   };

   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   );
};

export { AppContext };
export default FetchContext;