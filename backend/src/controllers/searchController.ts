import { Request, Response } from "express";
import User from "../models/User";
import Ticket from "../models/Ticket";

export const search = async (req: Request, res: Response) => {
  const { searchParams, searchType } = req.body;

  try {
    if (searchType === "user") {
      let startWithQuery: { [key: string]: Object } = {};
      let anyMatchWithQuery: { [key: string]: Object } = {};
      startWithQuery.fullName = { $regex: `^${searchParams}`, $options: "i" };
      anyMatchWithQuery.fullName = {
        $regex: `.*${searchParams}.*`,
        $options: "i",
      };
      const startWithUser = await User.find(startWithQuery);
      const anyMatchWithUser = await User.find(anyMatchWithQuery);
      const mergedQuery = [...startWithUser, ...anyMatchWithUser];

      return res.status(200).json({
        searchResult: [
          ...new Map(mergedQuery.map((item) => [item["email"], item])).values(),
        ],
        type: "user",
      });
    } else if (searchType === "ticket") {
      let startWithQuery: { [key: string]: Object } = {};
      let anyMatchWithQuery: { [key: string]: Object } = {};
      startWithQuery.clientName = { $regex: `^${searchParams}`, $options: "i" };
      anyMatchWithQuery.clientName = {
        $regex: `.*${searchParams}.*`,
        $options: "i",
      };
      const startWithUser = await Ticket.find(startWithQuery);
      const anyMatchWithUser = await Ticket.find(anyMatchWithQuery);
      const mergedQuery = [...startWithUser, ...anyMatchWithUser];

      return res.status(200).json({
        searchResult: [
          ...new Map(
            mergedQuery.map((item) => [item["ticketNumber"], item]),
          ).values(),
        ],
        type: "ticket",
      });
    } else {
      throw new Error("invalid search type");
    }
  } catch (error) {
    return res.status(200).json({ errorMessage: error });
  }
};

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
  let anyMatchWithQuery: { [key: string]: Object } = {};
  const { fullName, email } = req.body;

  if (req.body.email) {
    startWithQuery.email = { $regex: `^${email}`, $options: "i" };
    anyMatchWithQuery.email = { $regex: `.*${email}.*`, $options: "i" };
  } else if (req.body.fullName) {
    startWithQuery.fullName = { $regex: `^${fullName}`, $options: "i" };
    anyMatchWithQuery.fullName = { $regex: `.*${fullName}.*`, $options: "i" };
  }

  try {
    const startWithUser = await User.find(startWithQuery);
    const anyMathWithUser = await User.find(anyMatchWithQuery);
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
