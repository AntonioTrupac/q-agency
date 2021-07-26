import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

type UserData = {
  id: number;
  name: string;
};

type CommentsData = {
  postId: number;
  id: number;
  name: string;
  body: string;
};

type Store = {
  dataUser?: UserData[];
  dataComments?: CommentsData[];
  loading?: boolean;
  error?: string;
};

const StoreContext = createContext<Store | undefined>(undefined);

interface Props extends PropsWithChildren<any> {}

const FetchContext = (props: Props) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [comments, setComments] = useState<CommentsData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getData = useCallback(async () => {
    try {
      const responsePosts = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      const responseComments = await axios.get(
        'https://jsonplaceholder.typicode.com/comments'
      );
      if (responsePosts.status === 200) {
        setUsers(responsePosts.data);
        console.log(responsePosts.data);
        setLoading(false);
      }
      if (responseComments.status === 200) {
        setComments(responseComments.data);
        setLoading(false);
        console.log(responseComments.data);
      }
      if (responsePosts.status === 404 || responseComments.status === 404) {
        console.log('error!');
        setUsers([]);
        setComments([]);
        throw new Error('Could not get the data!');
      }
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getData();
  }, [getData]);

  const value = {
    dataUser: users,
    dataComments: comments,
    loading,
    error,
  };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default FetchContext;
