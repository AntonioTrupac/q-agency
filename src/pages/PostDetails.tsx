import { FC, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../types/types';
import { UserDetails } from '../components/UserDetails';
import { StoreContext } from '../context/FetchContext';
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
  const context = useContext(StoreContext);
  const { data, loading } = useFetch<PostType>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  const hello = 'post details component';

  useEffect(() => {
    console.log(`${props.helloMessage}${hello}`);
  }, [props.helloMessage]);

  const filterComments = context?.dataComments?.filter(
    (comment) => comment.postId === data?.id
  );

  return (
    <div className='details-container'>
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
        <div className='details'>
          <div className='details__title'>{data?.title}</div>
          <div className='details__body'>{data?.body}</div>
          {filterComments?.map((comment) => {
            return (
              <div key={comment.id} className='details__comments'>
                <Comments comment={comment} helloMessage={props.helloMessage} />
              </div>
            );
          })}
          <div>
            <UserDetails
              post={data}
              user={context?.dataUser}
              helloMessage={props.helloMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
