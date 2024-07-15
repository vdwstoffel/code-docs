import { Router, } from "express";

import {getCats} from "../controllers/catController"

const router: Router = Router();

router.route("/").get(getCats)

export default router;