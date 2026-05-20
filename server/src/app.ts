import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoute from './routes/analyze.route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/analyze', analyzeRoute);

app.get('/', (_req, res) => {
  res.send('SawitCare AI API Running 🌱');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
