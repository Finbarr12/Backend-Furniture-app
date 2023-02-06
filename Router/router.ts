import { Router } from "express";
import {
  GetallUsers,
  LoginUser,
  RegisterUser,
} from "../Controller/userController";

const router = Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/getall").get(GetallUsers);

export default router;
