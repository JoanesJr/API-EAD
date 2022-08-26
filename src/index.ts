require('dotenv').config();
import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import routes from './routes/Router';
import cors from 'cors';
import {AppDataSource} from './config/data-source';

try {
    const port = process.env.PORT;
    const app = express();
    //MIDDLEWARES
    app.use(express.json());
    app.use(cors({
    origin: 'http://localhost:3000'
}));
    //DATABASE
    AppDataSource.initialize()
        .then(() => {
            console.log("Connection has been succed with database");
        })
        .catch((error) => console.log(error))


    app.use('/api', routes);
    app.listen(port, () => {
        console.log("Server has ben run in port " + port)
    })
}catch(e: any) {
    console.log("This server can't started");
    console.log(`Error: ${e}`);
}
