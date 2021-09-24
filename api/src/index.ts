import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => console.log(`Server is Running at: http://localhost:${port}`));