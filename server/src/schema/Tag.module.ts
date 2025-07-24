import { type Document, Schema, model } from "mongoose";

export interface ITag extends Document {
  name: string;
  createDate: Date;
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

export default model<ITag>("Tag", TagSchema);
