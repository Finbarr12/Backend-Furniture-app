import userModel from "../Config/Model/userModel";
import { Request, Response } from "express";
import bycrpt from "bcrypt";

export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const salt = await bycrpt.genSalt(12);
    const HashPassword = await bycrpt.hash(password, salt);

    const CreatedUser = await userModel.create({
      name,
      email,
      password: HashPassword,
      confirmPassword: HashPassword,
    });

    return res.status(200).json({
      status: "success",
      data: CreatedUser,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const LoginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({
        message: "Input an email",
      });
    }
    const UserInfo = await userModel.findOne({ email });

    if (!UserInfo) {
      return res.status(404).json({
        message: "User dosen't exist",
      });
    }

    const Checkpass = await bycrpt.compare(password, UserInfo!.password);

    if (!Checkpass) {
      return res.status(404).json({
        message: "User dosen't exist",
      });
    }

    return res.status(200).json({
      status: "success",
      data: UserInfo,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};

export const GetallUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const AllUsers = await userModel.find();

    return res.status(200).json({
      status: `${AllUsers.length} users has been gotten successfully`,
      data: AllUsers,
    });
  } catch (error: any) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};
