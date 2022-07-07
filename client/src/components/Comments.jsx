import { useState } from "react";
import { format } from "timeago.js";

import CommentForm from "./CommentForm";

import Votes from "./Votes";

const Comments = ({ comments, parentId, rootId, author }) => {
  // comments -> all comments except the root comment
  // parentId -> root comment id
  const [isOpen, setIsOpen] = useState(false);

  // getting the first comment from a particular comment thread
  const firstComment = comments.filter(
    (comment) => comment.parentId === parentId
  );

  return (
    <div className="my-4">
      {firstComment.map((first) => {
        // getting the followed comment of first comment
        const followedComment = comments.filter(
          (comment) => comment.parentId === first._id
        );

        return (
          <div key={first._id}>
            {/* profile header */}
            <div className="flex items-center space-x-4">
              <img
                src={`https://avatars.dicebear.com/api/adventurer/:${first.author}.svg?background=%23ffffff`}
                alt="profile image"
                className="w-8 aspect-square rounded-sm object-cover"
              />
              <h1 className="dark:text-gray-100 text-sm font-semibold">
                {first.author}{" "}
                <span className="dark:text-gray-400 text-xs font-normal">
                  . {format(first.createdAt)}
                </span>
              </h1>
            </div>
            <div className="border-l dark:border-gray-600 ml-4 pl-8">
              <p className="dark:text-gray-400 text-sm leading-relaxed">
                {first.body}
              </p>
              {/* comment reaction */}
              <section className="flex items-center space-x-8">
                <Votes author={author} first={first} />
                <p
                  className="my-2 cursor-pointer text-xs dark:text-gray-400"
                  onClick={() => setIsOpen(first._id)}>
                  Reply
                </p>
              </section>
              {first._id === isOpen && (
                <CommentForm
                  author={author}
                  parentId={first._id}
                  rootId={rootId}
                  onCancel={() => setIsOpen(false)}
                />
              )}
              {followedComment && (
                <Comments
                  comments={comments}
                  parentId={first._id}
                  rootId={rootId}
                  author={author}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
