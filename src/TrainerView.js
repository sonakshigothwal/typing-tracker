import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://typing-tracker.onrender.com");

const TrainerView = () => {
  const [typingData, setTypingData] = useState({});

  useEffect(() => {
    socket.on("receiveTyping", ({ name, text }) => {
      setTypingData((prev) => ({
        ...prev,
        [name]: text
      }));
    });

    return () => {
      socket.off("receiveTyping");
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Trainer View</h2>
      {Object.entries(typingData).map(([name, text]) => (
        <div key={name} style={{ marginBottom: "1.5rem" }}>
          <strong>{name}</strong>
          <p style={{ border: "1px solid #ccc", padding: "1rem" }}>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default TrainerView;
