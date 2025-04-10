import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function TrainerView() {
  const [whoIsTyping, setWhoIsTyping] = useState("");
  const [receivedText, setReceivedText] = useState("");

  useEffect(() => {
    socket.on("receiveTyping", ({ name, text }) => {
      setWhoIsTyping(name);
      setReceivedText(text);
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

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>👀 Trainer View</h2>
      {whoIsTyping ? <p><strong>{whoIsTyping}</strong> is typing...</p> : <p>No one is typing</p>}
      {receivedText && (
        <div>
          <strong>Live Preview:</strong>
          <p>{receivedText}</p>
        </div>
      )}
    </div>
  );
}

export default TrainerView;
