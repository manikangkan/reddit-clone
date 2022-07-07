import { Image } from "../icons/Image";
import ReactTeaxtareaAutosize from "react-textarea-autosize";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const { title, body } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/comments", {
      ...formData,
      author: state.author,
    });
    navigate("/");
  };

  return (
    <form
      className="my-2 p-4 flex flex-col space-x-2 bg-neutral-900 space-y-4"
      onSubmit={handleSubmit}>
      <input
        required
        type="text"
        className="input-style ml-2"
        placeholder="Title"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <ReactTeaxtareaAutosize
        required
        type="text"
        className="input-style resize-none"
        placeholder="Body"
        name="body"
        value={body}
        onChange={handleChange}
      />
      <div className="flex justify-end space-x-2">
        <button onClick={() => navigate("/")}>Cancel</button>
        <button type="submit">Post</button>
      </div>
    </form>
  );
};

export default Form;
