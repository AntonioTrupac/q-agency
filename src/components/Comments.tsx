import { FC } from 'react';
import { CommentType } from '../types/types';

type CommentProps = {
  comment: CommentType;
};

export const Comments: FC<CommentProps> = (props) => {
  return (
    <div className='comment'>
      <p>{props.comment.body}</p>
    </div>
  );
};
