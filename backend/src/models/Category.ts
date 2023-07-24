import mongoose, { Schema } from "mongoose";
import { GroupType } from "../utils/ChatType/ChatType";

const groupSchema = new Schema(
  {
    category: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", groupSchema);
export default Category;
