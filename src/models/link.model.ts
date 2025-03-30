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
    },
  },
  { timestamps: true }
);

const Link = models?.Link_Schema || model("Link_Schema", userlinkmodel);

export default Link;
