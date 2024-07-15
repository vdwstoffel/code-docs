import { Router } from "express";

const router = Router();

import { createUser, passwordResetRequest, resetPassword } from "../controllers/userController";

router.route("/create").get(createUser);
router.route("/resetRequest").post(passwordResetRequest);
router.route("/resetPassword/:resetToken").post(resetPassword);

export default router;
