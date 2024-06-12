import { Request, Response } from "express";
import User from "../models/User";

export async function addUser(req: Request, res: Response) {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.create({ fullName, email, password });

    const response = await fetch(`${process.env.PRODUCT_SERVICE_URI}/api/chat/adduser`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id, fullName: user.fullName, email: user.email}),
      }
    )

    return res.status(200).json(response);
  } catch (error) {

    return res.status(400).json({ message: error });
  }
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getUserByEmail(req: Request, res: Response) {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
}

export async function getAdmins(req: Request, res: Response) {
  try {
    const admins = await User.find({ role: "ADMIN" });
    return res.status(200).json(admins);
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
}
