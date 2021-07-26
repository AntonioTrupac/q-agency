import { FC, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { PostType, UserType } from '../types/types';

type UserProps = {
  user?: UserType[];
  isLoading?: boolean;
  error?: string;
  post?: PostType | null;
};

export const UserDetails: FC<UserProps> = (props) => {
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
