import { FC, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
// import useFetch from '../hooks/useFetch';
import { PostType } from '../types/types';

type UserType = {
  id: number;
  name: string;
};

type UserProps = {
  user?: UserType[];
  isLoading?: boolean;
  error?: string;
  post?: PostType | null;
};

export const UserDetails: FC<UserProps> = (props) => {
  // const [users, setUsers] = useState<UserType[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');

  // const url = 'https://jsonplaceholder.typicode.com/users';

  // const { status , data, error } = useFetch<UserType[]>(url)
  // console.log({status, data, error});

  // console.log(props.user);

  const filterUser = props.user?.filter(
    (user) => user.id === props.post?.userId
  );

  return (
    <>
      {filterUser?.map((item) => {
        return (
          <div key={item.id} className='user-name'>
            <p>Post by: {item.name}</p>
          </div>
        );
      })}
    </>
  );
};
