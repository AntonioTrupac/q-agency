import { FC, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../types/types';
import { UserDetails } from '../components/UserDetails';
import { AppContext } from '../context/ApiContext';
import { useFetch } from '../hooks/useFetch';
import { Comments } from '../components/Comments';
import ReactLoading from 'react-loading';

type PostDetailsProps = {
  helloMessage: string;
};

type ParamTypes = {
  id: string;
};

export const PostDetails: FC<PostDetailsProps> = (props) => {
  let { id } = useParams<ParamTypes>();
  const context = useContext(AppContext);
  const { data, loading } = useFetch<PostType>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  const hello = 'post details component';

  useEffect(() => {
    console.log(`${props.helloMessage}${hello}`);
  }, [props.helloMessage]);

  const filterComments = context.dataComments?.filter(
    (comment) => comment.postId === data?.id
  );

  return (
    <div>
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
        <div className='details'>
          <div className='details__title'>{data?.title}</div>
          <div className='details__body'>{data?.body}</div>
          {filterComments?.map((comment) => {
            return (
              <div key={comment.id} className='details__comments'>
                <Comments comment={comment} />
              </div>
            );
          })}
          <div>
            <UserDetails post={data} user={context.dataUser} />
          </div>
        </div>
      )}
    </div>
  );
};
