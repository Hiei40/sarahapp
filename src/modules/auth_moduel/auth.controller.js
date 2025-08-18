import * as authservices from "./auth.service.js";
import { Router  } from "express";

const  router=Router();


router.post("/signup",authservices.signup);

router.post ("/login",authservices.login);
router.post ("/login",authservices.login);
router.put("/update-password", authservices.updatePassword);

router.post ("/hi",authservices.hi)

export default router;