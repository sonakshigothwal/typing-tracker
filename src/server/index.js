import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to backend (port 5000)
const socket = io("http://localhost:5000");

const expectedText = "Welcome to the real-time typing tracker!";

function App() {
  const [input, setInput] = useState("");
  const [received, setReceived] = useState("");

  useEffect(() => {
    // Listen for incoming typing data
    socket.on("receiveTyping", (data) => {
      setReceived(data);
    });

    // Clean up the socket on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    socket.emit("typing", value); // Send input to server
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>💻 Type the following:</h2>
      <p style={{ fontWeight: "bold", fontSize: "18px" }}>{expectedText}</p>

      <textarea
        value={input}
        onChange={handleChange}
        style={{ width: "100%", height: "100px", marginTop: "1rem" }}
        placeholder="Start typing here..."
      />

      <h3>🔍 Trainer View (Live Typing):</h3>
      <div style={{ padding: "1rem", border: "1px solid #ccc", minHeight: "100px" }}>
        {received}
      </div>
    </div>
  );
}

export default App;

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('typing', ({ trainee, text }) => {
    // broadcast to all other clients
    socket.broadcast.emit('receive-typing', { trainee, text });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});

const path = require("path");

// Serve static frontend
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
