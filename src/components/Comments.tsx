import { FC, useEffect } from 'react';
import { CommentType } from '../types/types';

type CommentProps = {
  comment: CommentType;
  helloMessage: string;
};

export const Comments: FC<CommentProps> = (props) => {
  //   const component = 'from Comments';

  //   useEffect(() => {
  //     console.log(`${props.helloMessage}${component}`);
  //   }, [props.helloMessage]);

  return (
    <div className='comment'>
      <p>{props.comment.body}</p>
    </div>
  );
};
