import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const frontendOrigin = process.env.FRONTEND_ORIGIN || (codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173');

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});