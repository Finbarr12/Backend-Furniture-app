import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface iUser extends User, mongoose.Document {}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Input a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 letters"],
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

export default mongoose.model<iUser>("authdb", UserSchema);
