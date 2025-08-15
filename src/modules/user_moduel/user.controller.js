import * as userservices from "./user.service";
import { Router } from "express";

const router =Router();


router.get("/user",userservices.profile);

export default router;