import "dotenv/config";
import express from 'express';
import configViewEngine from './src/config/configEngine';
import routes from './src/routes/web';
import cronJobContronler from './src/controllers/cronJobContronler';
import socketIoController from './src/controllers/socketIoController';
let cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);

const port =  process.env.PORT;
const TWO_HOURS = 1000 * 60 * 60 * 2;
const IN_PROD = process.env.NODE_ENV === 'production'

const options ={
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'custom_session_id',
            expires: 'custom_expires_column_name',
            data: 'custom_data_column_name'
        }
    }

}
const  sessionStore = new mysqlStore(options);

app.use(session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        maxAge: TWO_HOURS,
        sameSite: true,
        secure: IN_PROD
    }
}))


const piNetworkApi = process.env.NETWORK_API;
const API_KEY = process.env.PIAPI_KEY;

app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup viewEngine
configViewEngine(app);
// init Web Routes
routes.initWebRouter(app);

// Cron game 1 Phut 
cronJobContronler.cronJobGame1p(io);

// Check xem ai connect vào sever 
socketIoController.sendMessageAdmin(io);

// app.all('*', (req, res) => {
//     return res.render("404.ejs"); 
// });

server.listen(port, () => {
    console.log("http://localhost:" + port);
});

