import { model, models, Schema } from "mongoose";

const userlinkmodel = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true, // ✅ No duplicate short keys
      index: true,  // ✅ Fast lookups
    },
    userEmail: {
      type: String,
      required: true,
      index: true,  // ✅ Speeds up queries by user
    },
  },
  { timestamps: true }
);


const Link = models?.Link_Schema || model("Link_Schema", userlinkmodel);

export default Link;
