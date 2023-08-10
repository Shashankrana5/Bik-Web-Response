import mongoose, { Schema } from "mongoose";

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
