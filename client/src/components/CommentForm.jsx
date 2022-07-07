import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTeaxtareaAutosize from "react-textarea-autosize";

const CommentForm = ({ author, parentId, rootId, onCancel }) => {
  const navigate = useNavigate();

  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/comments", {
      author,
      body,
      parentId,
      rootId,
    });
    setBody("");
    navigate(0);
  };

  return (
    <form className="flex flex-col items-end space-y-2" onSubmit={handleSubmit}>
      <ReactTeaxtareaAutosize
        required
        type="text"
        className="input-style resize-none w-full"
        placeholder={`Comment as ${author}...`}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="space-x-2">
        {onCancel && <button onClick={() => onCancel()}>Cancel</button>}
        <button type="submit">Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
