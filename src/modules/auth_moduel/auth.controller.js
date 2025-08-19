import * as authservices from "./auth.service.js";
import { Router  } from "express";

const  router=Router();


router.post("/signup",authservices.signUp);

router.post ("/login",authservices.login);
router.post ("/login",authservices.login);
router.put("/update-password", authservices.updatePassword);

export default router;