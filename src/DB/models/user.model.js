import mongoose from "mongoose";

export const genderEnum = { male: "male", female: "female", other: "other" };
export const roleEnum = { user: "user", admin: "admin" };

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: [20, "first name must be less than 20 characters, you entered {VALUE}"],
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: [20, "last name must be less than 20 characters, you entered {VALUE}"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: Object.values(genderEnum),
        message: `gender only allowed to be one of: ${Object.values(genderEnum).join(", ")}`,
      },
      default: genderEnum.male,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(roleEnum),
        message: `role only allowed to be one of: ${Object.values(roleEnum).join(", ")}`,
      },
      default: roleEnum.user,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
