import { FC, useEffect } from 'react';
import { PostType, UserType } from '../types/types';

type UserProps = {
  user?: UserType[];
  isLoading?: boolean;
  error?: string;
  post?: PostType | null;
  helloMessage?: string;
};

export const UserDetails: FC<UserProps> = (props) => {
  //   const component = 'from User';

  //   useEffect(() => {
  //     console.log(`${props.helloMessage}${component}`);
  //   }, [props.helloMessage]);

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
