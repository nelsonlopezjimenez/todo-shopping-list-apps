import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.get('/', (req, res) => {
    res.send("Hello World!!!")
});

app.listen(3001);