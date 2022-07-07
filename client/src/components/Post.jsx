import { ArrowUp } from "../icons/ArrowUp";
import { MoreHorizontal } from "../icons/MoreHorizontal";
import { Comment as CommentIcon } from "../icons/Comment";
import { Share } from "../icons/Share";
import { Trophy } from "../icons/Trophy";

import { format } from "timeago.js";

import CommentForm from "./CommentForm";
import Comments from "./Comments";

const Post = ({ comment: rootComment, author, isDetailComment, comments }) => {
  return (
    <article
      className={`my-2 p-4 bg-neutral-900 flex items-start space-x-4 border-y border-neutral-900 ${
        !isDetailComment && "hover:border-gray-600"
      }`}>
      <section className="flex flex-col items-center space-y-2">
        <ArrowUp />
        <h1 className="text-xs dark:text-gray-100 font-semibold">23</h1>
        <div className="rotate-180">
          <ArrowUp />
        </div>
      </section>
      {/* post content */}
      <section className="space-y-4 w-full">
        <div className="space-y-2">
          <p className="text-xs dark:text-gray-400">
            Post by {rootComment.author} . {format(rootComment.createdAt)}
          </p>
          {/* title */}
          <h1 className="text-sm dark:text-gray-100 font-semibold leading-relaxed">
            {rootComment.title}
          </h1>
          <p className="text-sm dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {rootComment.body}
          </p>
        </div>
        {/* post reaction */}
        <section className="flex items-center justify-between">
          {/* comment */}
          <div className="flex items-center space-x-2">
            <CommentIcon />
            <p className="text-sm dark:text-gray-400">27 comments</p>
          </div>
          {/* award */}
          <div className="flex items-center space-x-2">
            <Trophy />
            <p className="text-sm dark:text-gray-400">award</p>
          </div>
          {/* share */}
          <div className="flex items-center space-x-2">
            <Share />
            <p className="text-sm dark:text-gray-400">share</p>
          </div>
          <MoreHorizontal />
        </section>
        {/* comment form */}
        {isDetailComment && (
          <section>
            <CommentForm
              author={author}
              parentId={rootComment._id}
              rootId={rootComment._id}
            />
            {/* comments */}
            <Comments
              comments={comments}
              parentId={rootComment._id}
              rootId={rootComment._id}
              author={author}
            />
          </section>
        )}
      </section>
    </article>
  );
};

export default Post;
