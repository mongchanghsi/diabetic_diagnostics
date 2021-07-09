import express from 'express';
import cors from 'cors';
import { createTypeormConn } from './utils/db_connection';
import userAPI from './src/user';
import imageAPI from './src/image';

const app = express();
app.use(express.json());
app.use(cors());

createTypeormConn();
app.use('/api/user', userAPI);
app.use('/api/image', imageAPI);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
