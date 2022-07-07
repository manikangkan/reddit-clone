import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Post from "./Post";

const DetailComment = ({ author }) => {
  const { id } = useParams();
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getParamsComment = async () => {
      const { data } = await axios.get(`http://localhost:4000/comments/${id}`);
      setComment(data);
    };
    getParamsComment();

    const getComments = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/comments/root/${id}`
      );
      setComments(data);
    };
    getComments();
  }, [id]);

  return (
    <>
      {comment && (
        <Post
          comment={comment}
          author={author}
          isDetailComment
          comments={comments}
        />
      )}
    </>
  );
};

export default DetailComment;
