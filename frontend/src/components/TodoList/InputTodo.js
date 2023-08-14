import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
  });

  const { addTodoProps } = props;

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim()) {
      addTodoProps(inputText.title);
      setInputText({
        title: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container flex px-4 pb-2 border-b-2 border-gray-200"
    >
      <input
        type="text"
        className="input-text grow focus:bg-neutral-100 focus:border-none p-1"
        placeholder="Add todo..."
        value={inputText.title}
        onChange={onChange}
        name="title"
      />
      <button type="button" className="input-submit" onClick={handleSubmit}>
        <FaPlusCircle
          style={{ color: "darkcyan", fontSize: "20px", marginTop: "2px" }}
        />
      </button>
    </form>
  );
};

InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};

export default InputTodo;
