import { Request, Response } from "express";
import User from "../models/User";

export const genericUserSearch = async (req: Request, res: Response) => {
  const searchParam: string = req.params.searchparam;

  try {
    let user = await User.find({
      email: { $regex: "^" + searchParam, $options: "i" },
    });

    if (user.length > 0) {
      return res.status(200).json(user);
    }

    user = await User.find({
      fullName: { $regex: "^" + searchParam, $options: "i" },
    });
    if (user.length > 0) {
      return res.status(200).json(user);
    }

    return res.status(200).json({ UserNotFoundError: "No users found!" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  let startWithQuery: { [key: string]: Object } = {};
  let anyMathWithQuery: { [key: string]: Object } = {};
  const { fullName, email } = req.body;

  if (req.body.email) {
    startWithQuery.email = { $regex: `^${email}`, $options: "i" };
    anyMathWithQuery.email = { $regex: `.*${email}.*`, $options: "i" };
  } else if (req.body.fullName) {
    startWithQuery.fullName = { $regex: `^${fullName}`, $options: "i" };
    anyMathWithQuery.fullName = { $regex: `.*${fullName}.*`, $options: "i" };
  }

  try {
    const startWithUser = await User.find(startWithQuery);
    const anyMathWithUser = await User.find(anyMathWithQuery);
    const mergedQuery = [...startWithUser, ...anyMathWithUser];

    return res
      .status(200)
      .json([
        ...new Map(mergedQuery.map((item) => [item["email"], item])).values(),
      ]);
  } catch (error) {
    return res.status(400).json({ errorMessage: error });
  }
};
