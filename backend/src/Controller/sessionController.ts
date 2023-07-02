import { Request, Response } from "express";
import { createSession, invalidateSession } from "../db/sessiondb";
import { signJWT, verifyJWT } from "../utils/jwt-utils";
let User = require("../models/User");

// login handler
export async function createSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  // const user = getUser(email);
  const user = await User.findOne({email: email});

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  const session = createSession(email, user.name);

  // create access token
  const accessToken = signJWT(
    { email: user.email, name: user.name, sessionId: session.sessionId },
    "5s"
  );

  const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");

  // set access token in cookie
  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
  });

  // send user back
  return res.send(session);
}

// get the session session

// log out handler
export function getSessionHandler(req: Request, res: Response) {
  // @ts-ignore
  return res.send(req.user);
}

export function deleteSessionHandler(req: Request, res: Response) {
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });

  // @ts-ignore
  const session = invalidateSession(req.user.sessionId);

  return res.send(session);
}
