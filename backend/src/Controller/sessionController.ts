import { Request, Response } from "express";
import { createSession, invalidateSession } from "../db/sessiondb";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import User from "../model/User";
import { UserType } from "../utils/ChatType/ChatType";

// login handler
export async function createSessionHandler(req: Request, res: Response) {
  
  const { email, password } = req.body;

  const user:UserType |null = await User.findOne({email: email, password});
  
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const session = createSession(email, user.fullName);

  // create access token
  const accessToken = signJWT(
    { email: user.email, name: user.fullName, sessionId: session.sessionId },
    "5s"
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
  return res.send({session, user});
}

// get the session session

// log out handler
export async function getSessionHandler(req: Request, res: Response) {
  //@ts-ignore
  const user = await User.findOne({email: req.user.email})
  // @ts-ignore
  return res.send({session: req.user, user});
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
