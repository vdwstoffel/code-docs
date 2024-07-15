import { Router } from "express";

const router = Router();

import { loginRequired, getToken, secret} from "../controllers/authController";

router.route("/getToken").get(getToken);
router.route("/secret").post(loginRequired, secret);

export default router;