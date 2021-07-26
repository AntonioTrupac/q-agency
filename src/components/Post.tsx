import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PostType } from '../types/types';

type PostProps = {
  post: PostType;
};

export const Post: FC<PostProps> = (props) => {
  return (
    <div className='post-list'>
      <Link to={`/posts/${props.post.id}`} className='link'>
        <div className='post-list__item'>
          <div className='title'>
            <p className='title__paragraph'>{props.post.title}</p>
          </div>
          <div className='post-body'>
            <p className='post-body__par'>{props.post.body}</p>
          </div>
          <div>{props.children}</div>
        </div>
      </Link>
    </div>
  );
};
