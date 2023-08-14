import { Request, Response } from "express";
import TodoList from "../models/TodoList";

export async function getTodosByUserId(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const todoList = await TodoList.findOne({ userId: id });
    if (todoList) {
      todoList.tasks = todoList.tasks.sort((a, b) =>
        //@ts-ignore
        a.completed > b.completed ? 1 : b.completed > a.completed ? -1 : 0,
      );
    }
    return res.status(200).json(todoList);
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
}
export async function createTodo(req: Request, res: Response) {
  const { userId, tasks } = req.body;

  try {
    const todoList = await TodoList.create({ userId, tasks });

    return res.status(200).json(todoList);
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
}

export async function updateTodo(req: Request, res: Response) {
  const { tasks, userId } = req.body;

  try {
    const updatedTodoList = await TodoList.findOneAndUpdate(
      { userId },
      {
        tasks: tasks,
      },
    );
    return res.status(200).json(updatedTodoList);
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
}
