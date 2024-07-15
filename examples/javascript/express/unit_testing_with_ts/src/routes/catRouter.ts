import { Router } from "express";

import { getCats, addCat } from "../controllers/catController";

const router: Router = Router();

router.route("/cat").get(getCats).post(addCat);

export default router;
