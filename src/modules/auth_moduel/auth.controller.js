import * as authservices from "./auth.services.js";
import { Router  } from "express";

const  router=Router();


router.post("/signup",authservices.asyncHandlersignup);

router.post ("/login",authservices.login)

export default router;