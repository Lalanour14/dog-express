import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { dogController } from './controller/dog-controller';

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use('/api/dog', dogController);
app.listen(port, () => {
    console.log('listening on http://localhost:'+port);
});

