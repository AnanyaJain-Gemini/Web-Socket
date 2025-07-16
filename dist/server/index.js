import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename);
app.use(express.static(path.join(_dirname, "../public")));
io.on("connection", (socket) => {
    console.log(`New user: ${socket.id}`);
    socket.on("location-update", (coords) => {
        const payload = {
            id: socket.id,
            coords,
        };
        console.log(payload);
        socket.broadcast.emit("user-moved", payload);
        console.log("User Moved");
    });
    console.log("Location Updated");
    socket.on("disconnect", () => {
        console.log(`User left: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
