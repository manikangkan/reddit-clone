import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "../icons/Image";
import Header from "./Header";
import Post from "./Post";

const Posts = ({ author }) => {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);

  // fetching all the root comments
  useEffect(() => {
    const getComments = async () => {
      const { data } = await axios.get("http://localhost:4000/comments");
      setComments(data);
    };
    getComments();
  }, []);

  return (
    <main className="space-y-2">
      {/* header */}
      <Header />
      {/* form */}
      <div className="p-4 flex items-center space-x-2 bg-neutral-900">
        {/* profile image */}
        <img
          src={`https://avatars.dicebear.com/api/adventurer/:${author}.svg?background=%23ffffff`}
          alt="profile image"
          className="w-8 aspect-square rounded-sm object-cover"
        />
        <button
          className="w-full"
          onClick={() =>
            navigate("create", {
              state: {
                author,
              },
            })
          }>
          Create a post as {author}
        </button>
        <Image />
      </div>
      {/* posts */}
      {comments.map((comment) => (
        <Link to={`comment/${comment._id}`} key={comment._id}>
          <Post key={comment._id} comment={comment} />
        </Link>
      ))}
    </main>
  );
};

export default Posts;
