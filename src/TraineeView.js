// src/TraineeView.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://your-server-url"); // Replace with your actual backend URL

function TraineeView() {
  const [traineeName, setTraineeName] = useState("");
  const [text, setText] = useState("");
  const sampleText = "The quick brown fox jumps over the lazy dog.";

  useEffect(() => {
    socket.emit("trainee-joined", traineeName);
  }, [traineeName]);

  useEffect(() => {
    socket.emit("typing", { name: traineeName, text });
  }, [text]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Live Trainee Typing Tracker</h2>
      <input
        type="text"
        value={traineeName}
        onChange={(e) => setTraineeName(e.target.value)}
        placeholder="Enter your name"
        style={{ marginBottom: "1rem", display: "block" }}
      />
      <p><strong>Type this:</strong></p>
      <p>{sampleText}</p>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing here..."
        disabled={!traineeName}
      />
    </div>
  );
}

export default TraineeView;
