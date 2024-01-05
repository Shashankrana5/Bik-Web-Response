import { Request, Response } from "express";
import User from "../models/User";
import { MongoServerError } from "mongodb";
import { signJWT } from "../utils/jwt.utils";

import { createSession } from "../db/sessiondb";

export async function addUser(req: Request, res: Response) {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.create({ fullName, email, password });

    const session = createSession(email, user.fullName);
    const accessToken = signJWT(
      { email: user.email, name: user.fullName, sessionId: session.sessionId },
      "5s",
    );

    const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

    // set access token in cookie
    res.cookie("accessToken", accessToken, {
      maxAge: 30000000, // 5 minutes
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
    });

    // send user back
    return res.send({ session, user });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return res.status(409).json({ message: "Invalid email" });
    }

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
