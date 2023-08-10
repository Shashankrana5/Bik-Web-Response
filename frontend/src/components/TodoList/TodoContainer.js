import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";
import { useCurrentUserContext } from "../../hooks/useCurrentUserContext";
import axios from "axios";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useCurrentUserContext();

  const handleChange = async (id) => {
    const newState = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(newState);
    await axios.put("http://localhost:1913/api/todo/updatetodo", {
      tasks: newState,
      userId: currentUser._id,
    });
  };

  const delTodo = async (id) => {
    if (id && currentUser) {
      await axios.put("http://localhost:1913/api/todo/updatetodo", {
        tasks: [...todos.filter((todo) => todo.id !== id)],
        userId: currentUser._id,
      });
      setTodos([...todos.filter((todo) => todo.id !== id)]);
    }
  };

  const addTodoItem = async (title) => {
    if (title && currentUser) {
      const newTodo = {
        id: uuidv4(),
        title,
        completed: false,
      };
      await axios.put("http://localhost:1913/api/todo/updatetodo", {
        tasks: [...todos, newTodo],
        userId: currentUser._id,
      });
      setTodos([...todos, newTodo]);
    }
  };

  const setUpdate = async (updatedTitle, id) => {
    if (id && currentUser) {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          // eslint-disable-next-line no-param-reassign
          todo.title = updatedTitle;
        }
        return todo;
      });

      setTodos(newTodos);
      await axios.put("http://localhost:1913/api/todo/updatetodo", {
        tasks: newTodos,
        userId: currentUser._id,
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      const fetchUserTodos = async () => {
        const response = await axios.get(
          "http://localhost:1913/api/todo/gettodo/" + currentUser._id,
        );
        if (response) {
          setTodos(response.data.tasks);
        }
      };
      fetchUserTodos();
    }
  }, [currentUser]);

  return (
    <div className="container bg-white p-8 rounded-lg shadow-lg">
      <div className="inner">
        <InputTodo addTodoProps={addTodoItem} />
        <TodoList
          todos={todos}
          handleChangeProps={handleChange}
          deleteTodoProps={delTodo}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
};

export default TodoContainer;
