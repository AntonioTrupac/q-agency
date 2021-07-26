import { FC, useCallback, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PostType } from '../types/types';
import { Post } from '../components/Post';
import { UserDetails } from '../components/UserDetails';
import { AppContext } from '../context/ApiContext';
import { Comments } from '../components/Comments';
import { useFetch } from '../hooks/useFetch';
import ReactLoading from 'react-loading';

type PostsProps = {
  helloMessage: string;
};

export const Posts: FC<PostsProps> = (props) => {
  const { data, loading, error } = useFetch<PostType[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const context = useContext(AppContext);
  const hello = 'post component';

  useEffect(() => {
    console.log(`${props.helloMessage} ${hello}`);
  }, [props.helloMessage]);

  if (error) return <div>{error}</div>;

  return (
    <div className='post-container'>
      {loading || context.loading ? (
        <div className='spinner'>
          <ReactLoading
            color='black'
            type='spin'
            width='300px'
            height='300px'
          />
        </div>
      ) : (
        <>
          {data?.map((post) => {
            const filterComments = context.dataComments?.filter(
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
                  <UserDetails post={post} user={context.dataUser} />
                </Post>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
