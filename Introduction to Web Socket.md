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
