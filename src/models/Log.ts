import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  message: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema({
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ILog>("Log", LogSchema);
