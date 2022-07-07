import { Routes, Route } from "react-router-dom";
import Posts from "./Posts";
import DetailComment from "./DetailComment";
import Form from "./Form";

const Board = ({ user }) => {
  return (
    <Routes>
      <Route index element={<Posts author={user.username} />} />
      <Route path="comment/:id" element={<DetailComment author={user.username} />} />
      <Route path="create" element={<Form />} />
    </Routes>
  );
};

export default Board;
