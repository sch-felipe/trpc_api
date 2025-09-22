import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/trpc', createExpressMiddleware({
  router: appRouter,
  createContext: () => ({}),
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});