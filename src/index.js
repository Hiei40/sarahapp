import path from 'node:path';
import  dotenv from 'dotenv';


dotenv.config({path:path.resolve("./config/.dev.env")});
import bootstrarp from "./app.controller.js";

bootstrarp()