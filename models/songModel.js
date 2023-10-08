import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const songSchema = new Schema(
  {
    songURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

songSchema.post("save", handleMongooseError);

const Song = model("song", songSchema);

export default Song;
