import express from 'express';

// import './src/DB/model/associations' // تقدر تفعلها وقت ما تحتاجها
import userController from './modules/user/user.controller.js';
import authController from './modules/auth/auth.controller.js';
import connectDB from './DB/connection.db.js';

const bootstrap = async () => {
  const app = express();
  const port = 3000;

  await connectDB();

  // Convert Buffer Data
  app.use(express.json());

  // App routing
  app.get('/', (req, res) => res.json({ message: "Welcome to app ❤️" }));
  app.use('/auth', authController);
  app.use('/user', userController);
  app.all('/*', (req, res) => res.status(404).json({ message: "Invalid routing" }));

  // Global error handler
  app.use(globalerrorhandling);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

export default bootstrap;
