# Web Socket

### 🔹What is web socket?
WebSocket is a **computer communications protocol** that provides **full-duplex (two-way)** communication channels over a **single TCP connection**. It is designed to be used in **real-time web applications** and enables low-latency communication between the client and the server.

It is standardized by ***RFC 6455*** and supported by most modern browsers and servers.

> WebSocket in the computer world — a two-way (bi-directional), constant communication line between your browser (client) and a server.

### 🔹Traditional HTTP vs WebSocket:
| Feature       | HTTP                     | WebSocket                    |
| ------------- | ------------------------ | ---------------------------- |
| Communication | Request/Response         | Full-duplex                  |
| Persistent    | No                       | Yes                          |
| Overhead      | High (headers each time) | Low (once during handshake)  |
| Use case      | Standard websites, APIs  | Real-time apps (chat, games) |


### 🔹How WebSocket Works:

1. **Initial Handshake** – Client requests WebSocket upgrade using an HTTP request.
2. **Upgrade to WebSocket** – Server responds and agrees to upgrade protocol.
3. **Persistent Connection** – The connection remains open.
4. **Data Exchange** – Both client and server can send messages any time.

### 🔹WebSocket vs Socket.IO:
| Feature          | WebSocket             | Socket.IO                              |
| ---------------- | --------------------- | -------------------------------------- |
| Protocol         | Native                | Custom on top of WebSocket + fallbacks |
| Browser Support  | Limited older support | Works with fallback (XHR, polling)     |
| Auto-reconnect   | No                    | Yes                                    |
| Rooms/Namespaces | No                    | Yes                                    |
| Ease of Use      | Lower-level           | High-level API                         |

> **When to use Socket.IO:** When you need robust support, fallback, auto-reconnect, and rooms.

### 🔹Client-Side WebSocket Connections (Browser or Frontend):

 **1. Browser-native WebSocket API** (Standard way)
```js
// Create a new WebSocket connection
// const socket = new WebSocket(url[, protocols]);
const socket = new WebSocket('wss://echo.websocket.org');

// Handle connection open
socket.onopen = (event) => {
  console.log('Connection established');

  // Send a message
  socket.send('Hello, WebSocket server!');
};

// Handle messages
socket.onmessage = (event) => {
  console.log('Message received:', event.data);

  // Close the connection after receiving a message
  socket.close(1000, 'Work complete');
};

// Handle errors
socket.onerror = (event) => {
  console.error('WebSocket error:', event);
};

// Handle connection close
socket.onclose = (event) => {
  console.log('Connection closed. Code:', event.code, 'Reason:', event.reason);
};
```

**2. Using libraries or wrappers** - **Socket.IO** (most common alternative)

Socket.IO wraps WebSocket + adds features like reconnect, fallback (HTTP polling), namespaces, etc.

```js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.emit("message", "Hello Server!");
socket.on("message", (data) => console.log(data));
```
> Socket.IO is not pure WebSocket — it's a custom protocol built over WebSocket/HTTP.

### 🔹Server-Side WebSocket Setup (Node.js)

#### **1. Using ws (native WebSocket lib)**

a. **Standalone server (no HTTP)**

This is a pure WebSocket Server. This creates a standalone WebSocket server that directly listens on a port (like 8080), without using Express or HTTP server.
```js
import {WebSocket} from "ws";

// specify the port for the standalone web-socket server
const wss = new WebSocket.Server({port: 8080});

wss.on('connection', (socket) => {
  console.log('Client connected');
});
```
b. **Attach to existing HTTP/Express server**

This is attached on top of an existing HTTP server (created using `http.createServer()` or `Express`).
```js
import http from "http";
import {WebSocket} from "ws";

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('WebSocket client connected');
});

server.listen(8080, () => {
  console.log('HTTP + WS server on http://localhost:8080');
});
```
#### **2. Using `Socket.IO` (higher-level abstraction)**
```js
import { Server } from "socket.io";

const io = new Server(server); // server = http.createServer(app)

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
```
> Socket.IO is not directly compatible with `new WebSocket(...)` unless you use its client lib (`socket.io-client`).


### 🔹WebSocket Methods:

1. `WebSocket.send(data, [callback])`: Send a message or data (text or binary) to the server or client.
2. `WebSocket.close([code, reason])`: Close the connection gracefully

### 🔹WebSocket Events:

1. **Client-side WebSocket** (in browser)
   
| Event       | Triggered When               |
| ----------- | ---------------------------- |
| `onopen`    | Connection is established    |
| `onmessage` | Message received from server |
| `onerror`   | Error occurs in connection   |
| `onclose`   | Connection is closed         |

Example:

```js
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => console.log("Connected!");
socket.onmessage = (e) => console.log("Message:", e.data);
socket.onerror = (e) => console.error("Error:", e);
socket.onclose = () => console.log("Disconnected");
```

2. **Server-side WebSocket** (Node.js using `ws`)
   
| Event        | Triggered When       |
| ------------ | -------------------- |
| `connection` | A client connects    |
| `message`    | Client sends message |
| `close`      | Client disconnects   |
| `error`      | Connection error     |

Example:

```js
import WebSocket from "ws";
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log("Client connected");

  socket.send("Welcome!");

  socket.on('message', (msg) => console.log("Received:", msg));
  socket.on('close', () => console.log("Client disconnected"));
  socket.on('error', (err) => console.error("Error:", err));
});
```

### 🔹WebSocket Properties:
| Property         | Meaning                                           |
| ---------------- | ------------------------------------------------- |
| `url`            | URL of the server or client you're connected to             |
| `readyState`     | 0 (CONNECTING), 1 (OPEN), 2 (CLOSING), 3 (CLOSED) |
| `protocol`       | Subprotocol agreed (if any)                   |
| `bufferedAmount` | Bytes of data queued for sending (client-side only)                 |
| `binaryType`     | `"blob"` (default) or `"arraybuffer"`; `"nodebuffer"` default in Node.js            |
| `extensions`     | Negotiated extensions (e.g., compression)         |


# 🔹What is `.on`?
`.on` is a method used to register event listeners — meaning:

> “When this event happens, run this function.”

It's part of the **event-driven programming model** in JavaScript and Node.js. You see it with:
- Native `EventEmitter` (Node.js)
- WebSocket servers like `ws`
- Libraries like `Socket.IO`

**🔹Basic Syntax:**
```js
socket.on(""eventName", callbackFunction);
```
| Term               | Meaning                                                                           |
| ------------------ | --------------------------------------------------------------------------------- |
| `"eventName"`      | Name of the event you want to listen to (e.g., `"message"`, `"close"`, `"error"`) |
| `callbackFunction` | Code to run when the event happens                                                |

