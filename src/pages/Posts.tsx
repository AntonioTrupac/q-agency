import { FC, useEffect, useContext, useState } from 'react';
import { PostType } from '../types/types';
import { Post } from '../components/Post';
import { UserDetails } from '../components/UserDetails';
import { StoreContext } from '../context/FetchContext';
import { Comments } from '../components/Comments';
import { useFetch } from '../hooks/useFetch';
import ReactLoading from 'react-loading';

type PostsProps = {
  helloMessage: string;
};

export const Posts: FC<PostsProps> = (props) => {
  const [search, setSearch] = useState<string>('');
  const { data, loading, error } = useFetch<PostType[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  const context = useContext(StoreContext);
  const hello = 'post component';

  useEffect(() => {
    console.log(`${props.helloMessage} ${hello}`);
  }, [props.helloMessage]);

  const filterPosts = data?.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className='input-container'>
        <p>Search:</p>{' '}
        <input
          placeholder='Search'
          type='text'
          className='input'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='post-container'>
        {error ||
          (context?.error && (
            <div>
              {error}
              {context?.error}
            </div>
          ))}
        {loading || context?.loading ? (
          <div className='spinner-container'>
            <div className='spinner'>
              <ReactLoading
                color='black'
                type='spin'
                width='200px'
                height='200px'
              />
            </div>
          </div>
        ) : (
          <>
            {filterPosts?.map((post) => {
              const filterComments = context?.dataComments?.filter(
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
                            <Comments
                              comment={comment}
                              helloMessage={props.helloMessage}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <UserDetails
                      post={post}
                      user={context?.dataUser}
                      helloMessage={props.helloMessage}
                    />
                  </Post>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
