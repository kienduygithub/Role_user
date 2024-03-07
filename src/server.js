import express from 'express';
require('dotenv').config();
import initViewEngine from './config/viewEngine';
import initWebApiRoutes from './routes/rootRouter';
import initWebAppRoutes from './routes/web';
import connectDB from './config/connectDB';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
const app = express();
const port = process.env.PORT || 8080;

const corsConfig = {
    origin: process.env.URL_CLIENT,
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    credentials: true
}
app.use(compression({
    level: 6,
    threshold: 100 * 1000,// Nếu dữ liệu lớn hơn 100kB thì compress nhỏ hơn thì không cần
    filter: (req, res) => {
        if (req.header[ 'x-no-compress' ]) {
            return false;
        }
        return compression.filter(req, res);
    }
}));
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// CONFIG
initViewEngine(app);
initWebApiRoutes(app);
initWebAppRoutes(app);
connectDB();

app.listen(port, () => {
    console.log(`Connect to http://localhost:${ port }`);
})

