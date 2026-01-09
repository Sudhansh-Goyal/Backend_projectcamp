import { Router } from "express";
import {registeredUser} from "../controllers/authuser.controller.js"
import userRegistrationValidator from "../validators/index.js"
import {validate} from "../middlewares/validator.middleware.js";

const router=Router()

router.route("/register").post(userRegistrationValidator(),validate,registeredUser)


export default router