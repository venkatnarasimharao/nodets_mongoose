import express from 'express';
import Allroutes from './routes'
import cors from 'cors'
import bodyParser from 'body-parser';
import config from './config/config'
import mongoose from 'mongoose';

const router = express();

/** Connect to Mongo */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        console.log(result, 'Mongo Connected');
    })
    .catch((error) => {
        console.log('error connection in mongo', error.message, error);
        process.exit(1)
    });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// connection btw two different ports
router.use(cors());

router.use('/api', Allroutes)

router.listen(config.server.port, () => {
    console.log(`server started with server port no is ${JSON.stringify(config.server)}`);
});
