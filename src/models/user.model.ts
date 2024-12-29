import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string; // 'admin' or 'user'
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
