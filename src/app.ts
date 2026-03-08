import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import routerEventRoutes from "./routes/routerEvents.routes.js";
import cookieParser from 'cookie-parser';

const app = express();

// ──────────────────────────────────────────────
//          CORS Configuration
// ──────────────────────────────────────────────
app.use(cors({
  origin: [
    'https://router-dev.indirex.io',
    'https://router-meter.vercel.app',
    'https://router-meter-frontend.vercel.app', //Indi link for vercel
    'http://localhost:3000',            // React default
    'http://localhost:5173',            // Vite default
    'http://localhost:4200',            // Angular default (optional)
    'http://127.0.0.1:5173',            // sometimes needed in dev
     // your main Vercel domain
    // Add preview branches if needed (wildcard is less secure but useful for testing):
    // 'https://*.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,                    // required for cookies, auth headers, sessions
  preflightContinue: false,
  optionsSuccessStatus: 204,            // modern browsers expect 204 for OPTIONS
}));

// Parse JSON bodies
app.use(express.json());

//cookies parser
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', routerEventRoutes);

// Optional protected route example
app.get('/api/protected', (req, res) => {
  res.json({ message: 'Protected content' });
});

// Catch-all 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;