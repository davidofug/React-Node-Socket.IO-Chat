import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:3001");

function App() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);
	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			/* 			setUsername("");
			setRoom(""); */
			setShowChat(true);
		}
	};

	return (
		<div className="App">
			{!showChat ? (
				<div>
					<h3>Join A Chat</h3>
					<input
						placeholder="Enter name"
						onChange={(event) => setUsername(event.target.value)}
					/>
					<input
						placeholder="Enter name 2"
						onChange={(event) => setRoom(event.target.value)}
					/>
					<button onClick={joinRoom}>Join A Room</button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default App;
