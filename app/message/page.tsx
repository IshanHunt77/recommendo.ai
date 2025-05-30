"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useSocket } from "../providers";
import LoaderComponent from "../api/components/Loader/page";

export default function LiveChat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!socket || !message.trim()) return;

    socket.emit("sendMessage", { room, message });
    setMessage("");
  };

  const handleJoin = () => {
    if (!socket || !room.trim()) return;
    socket.emit("room-name", room);
    setJoined(true);
  };

  return (
    <form onSubmit={sendMessage}>
      <LoaderComponent/>
      {!joined ? (
        <div>
          <input
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="button" onClick={handleJoin}>Join</button>
        </div>
      ) : (
        <>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
          />
          <button type="submit">Send</button>
        </>
      )}
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </form>
  );
}
