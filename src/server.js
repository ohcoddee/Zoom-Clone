import http from "http";
import WebSocket from "ws";
import express from "express";
// import res from "express/lib/response";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// app.listen(3000);

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
// function handleConnection(socket) {
//   console.log(socket);
// }

wss.on("connection", (socket) => {
  console.log("Connected to Browser✅");
  socket.on("close", () => console.log("Disconnedted from the Browser❌"));
  socket.on("message", (message) => {
    console.log(message.toString("utf8"));
  });
  socket.send("hello!");
});

server.listen(3000, handleListen);
