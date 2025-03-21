import { Schema, model } from 'mongoose';

import handleMongooseError from '../helpers/handleMongooseError.js';

const songSchema = new Schema(
  {
    artist: {
      type: String,
      default: null
    },
    trackName: {
      type: String,
      default: null
    },
    trackDuration: {
      type: String,
      default: null
    },
    trackPictureURL: {
      type: String,
      default: null
    },
    trackURL: {
      type: String,
      default: null
    }
  },
  { versionKey: false, timestamps: true }
);

songSchema.post('save', handleMongooseError);

const Song = model('song', songSchema);

export default Song;
