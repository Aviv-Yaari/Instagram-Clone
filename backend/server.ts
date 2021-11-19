declare module 'express-session' {
  export interface SessionData {
    userId: string;
  }
}

import { Request, Response } from 'express';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');
const app = express();

// Express App Config
const port = process.env.PORT || 3030;
const session = expressSession({
  secret: 'swello is the best app ever',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
app.use(express.json());
app.use(session);

// if (process.env.NODE_ENV === 'production') {
// app.use(express.static(path.resolve(__dirname, 'public')));
// } else {
const corsOptions = {
  origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOptions));
// }

const postRoutes = require('./api/post/post.routes');
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req: Request, res: Response) => {
  res.send('Hello World');
  //   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log('server listening at http://localhost:' + port);
});
