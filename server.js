import "dotenv/config";
import express from 'express';
import configViewEngine from './src/config/configEngine';
import routes from './src/routes/web';
import cronJobContronler from './src/controllers/cronJobContronler';
import socketIoController from './src/controllers/socketIoController';
let cookieParser = require('cookie-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port =  process.env.PORT;

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

