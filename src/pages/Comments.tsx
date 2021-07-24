import {FC} from 'react';

type CommentType = {
    postId: number;
    id: number;
    name: string;
    body: string;
}

type CommentProps = {
    comment: CommentType
}

export const Comments: FC<CommentProps> = (props) => {

    return (
        <div className='comment'>
            <p>{props.comment.body}</p>
        </div>
    )
}