import express from 'express';
import path from 'node:path';
import  dotenv from 'dotenv';
dotenv.config({path:path.resolve("./src/config/.dev.env")});
import userController from './modules/user_moduel/user.controller.js';
import authController from './modules/auth_moduel/auth.controller.js';
import connectDB from './DB/connection.db.js';
import { globalErrorHandling } from './utils/responsed.js';

const 
bootstrap = async () => {
  const app = express();
  const port = process.env.port;
  // console.log(port);
  

  await connectDB();

  // Convert Buffer Data
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  // App routing
  app.get('/', (req, res) => res.json({ message: "Welcome to app ❤️" }));
  app.use('/auth', authController);
  app.use('/user', userController);
  app.all('{/*dummy}', (req, res) => res.status(404).json({ message: "Invalid routing" }));

  // Global error handler
  app.use(globalErrorHandling);

  


  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

export default bootstrap;
