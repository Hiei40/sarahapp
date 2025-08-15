import * as authservices from "./auth.service.js";
import { Router  } from "express";

const  router=Router();


router.post("/signup",authservices.signup);

router.post ("/login",authservices.login)

export default router;