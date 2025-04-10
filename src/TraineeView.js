import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://typing-tracker.onrender.com");

const TraineeView = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("joinTrainee", name);
  }, [name]);

  const handleInput = (e) => {
    const value = e.target.value;
    setText(value);
    socket.emit("typing", { name, text: value });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Trainee View</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "300px" }}
      />
      <br />
      <textarea
        rows={5}
        cols={50}
        placeholder="Start typing here..."
        value={text}
        onChange={handleInput}
        disabled={!name}
        style={{ padding: "0.5rem" }}
      />
    </div>
  );
};

export default TraineeView;
