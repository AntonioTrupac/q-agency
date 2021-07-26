export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CommentType = {
  postId: number;
  id: number;
  name: string;
  body: string;
};

export type UserType = {
  id: number;
  name: string;
};
