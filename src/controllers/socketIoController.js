import connection from '../config/connectDB';
import "dotenv/config";
import md5 from "md5";

const sendMessageAdmin = (io) => {
    io.on('connection', (socket) => {
        socket.on('data-server', (msg) => {
            io.emit('data-server', msg);
        });
        socket.on('data-server_2', (msg) => {
            io.emit('data-server_2', msg);
        });
        socket.on('data-server-5', (msg) => {
            io.emit('data-server-5', msg);
        });
        socket.on('data-server-3', (msg) => {
            io.emit('data-server-3', msg);
        });
        // socket.on("disconnect", () => {
        // console.log('a user disconnect ' + socket.id);
        // });
    });
} 
module.exports = {
    sendMessageAdmin,
}