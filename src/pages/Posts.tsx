import { FC, useCallback, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PostType } from '../types/types';
import { Post } from './Post';
import { UserDetails } from './UserDetails';
import { AppContext } from '../context/ApiContext';
import { Comments } from './Comments';
import { useFetch } from '../hooks/useFetch';

type PostsProps = {
  helloMessage: string;
};

export const Posts: FC<PostsProps> = (props) => {
  const { data, loading, error } = useFetch<PostType[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const { dataUser, dataComments } = useContext(AppContext);
  const hello = 'post component';

  useEffect(() => {
    console.log(`${props.helloMessage} ${hello}`);
  }, [props.helloMessage]);

  if (loading) return <div>LOADING...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='post-container'>
      {data?.map((post) => {
        const filterComments = dataComments?.filter(
          (comment) => comment.postId === post.id
        );
        return (
          <div key={post.id}>
            <Post post={post}>
              <div className='post-comment'>
                <h3 className='post-comment__heading'>Comments</h3>
                {filterComments?.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <Comments comment={comment} />
                    </div>
                  );
                })}
              </div>
              <UserDetails post={post} user={dataUser} />
            </Post>
          </div>
        );
      })}
    </div>
  );
};
