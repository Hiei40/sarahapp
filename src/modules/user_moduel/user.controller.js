import * as userservices from "./user.service";
import { Router } from "express";

const router =Router();


router.get("./:userId",userservices.profile);

export default router;