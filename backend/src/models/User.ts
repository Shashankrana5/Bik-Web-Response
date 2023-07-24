import mongoose from "mongoose";
import { Schema } from "mongoose";
import { UserType } from "../utils/ChatType/ChatType";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    role: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<UserType>("User", userSchema);
export default User;
