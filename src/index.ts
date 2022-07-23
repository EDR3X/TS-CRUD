import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logger';
import routeDirector from './routes/router.director';
import routeMovie from './routes/router.movie';

const app: Express = express();

mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info('Connected to Database');
        serverStart();
    })
    .catch((err) => Logging.error(`Unable to connect \n Check DB Url \n ${err}`));

const serverStart = () => {
    //* Logger
    app.use((req: Request, res: Response, next: NextFunction) => {
        Logging.info(`Outgoing -> [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Incomming -> [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    //* Middlewares
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //* Api Rules
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Directorization, api-key');

        const apiKey = req.headers["api-key"];
        if (apiKey !== config.api.header) {
            return res.status(500).json({ errrr: "Access Denied" });
        }

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
            return res.status(200).json({});
        }
        next();
    });

    //* Routes
    app.use('/directors', routeDirector);
    app.use('/movies', routeMovie);

    //* Test
    app.get('/hello-there', (_req: Request, res: Response) => {
        res.status(200).json({ message: 'General Kebobi' });
    });

    //* Error Handeling
    app.use((_req: Request, res: Response) => {
        const error = new Error('Not Found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    const port = config.server.port;
    app.listen(port, () => Logging.info(`Server started on port ${port}`));
};
