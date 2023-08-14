import mongoose, { Schema } from "mongoose";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};
const todoListSchema = new Schema(
  {
    tasks: {
      type: Array<Task>(),
      require: true,
    },
    userId: { type: String, require: true },
  },
  { timestamps: true },
);

const TodoList = mongoose.model("TodoList", todoListSchema);
export default TodoList;
