import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function TraineeView() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [receivedText, setReceivedText] = useState("");
  const [whoIsTyping, setWhoIsTyping] = useState("");

  useEffect(() => {
    socket.on("receiveTyping", ({ name, text }) => {
      setReceivedText(text);
      setWhoIsTyping(name);
    });

    socket.on("userStoppedTyping", () => {
      setWhoIsTyping("");
      setReceivedText("");
    });

    return () => {
      socket.off("receiveTyping");
      socket.off("userStoppedTyping");
    };
  }, []);

  const handleTyping = (e) => {
    const typedText = e.target.value;
    setText(typedText);
    if (name) {
      socket.emit("typing", { name, text: typedText });
    }
    if (typedText === "") {
      socket.emit("stopTyping");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      alert(`Welcome, ${name}!`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>✍️ Real-Time Typing Tracker - Trainee View</h2>

      {!name ? (
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
      ) : (
        <>
          <h4>Welcome, {name}</h4>
          <textarea
            rows={5}
            cols={50}
            placeholder="Start typing..."
            value={text}
            onChange={handleTyping}
          />
        </>
      )}

      {whoIsTyping && whoIsTyping !== name && (
        <p>👀 {whoIsTyping} is typing...</p>
      )}

      {receivedText && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Live Preview from Others:</strong>
          <p>{receivedText}</p>
        </div>
      )}
    </div>
  );
}

export default TraineeView;
