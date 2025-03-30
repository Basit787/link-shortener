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
    },
    userEmail: {
      type: String,
      required: true,
      default: "defaultEmail@gmail.com",
    },
  },
  { timestamps: true }
);

const Link = models?.Link_Schema || model("Link_Schema", userlinkmodel);

export default Link;
