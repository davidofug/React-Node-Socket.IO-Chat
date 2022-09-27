import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room: room,
				author: username,
				message: currentMessage,
				time: `${new Date(Date.now()).getHours()}:${new Date(
					Date.now()
				).getHours()}`,
			};

			await socket.emit("send_message", messageData);
			setMessageList((list) => [...list, messageData]);
			setCurrentMessage("");
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
		});
		return () => {
			socket.off("receive_message");
		};
	}, []);
	return (
		<div>
			<p>Live Chat</p>
			<div className="chat-header"></div>
			<div className="chat-body">
				<ScrollToBottom>
					{messageList.map((messageItem) => {
						return <p>{messageItem.message}</p>;
					})}
				</ScrollToBottom>
			</div>
			<div className="chat-footer">
				<input
					placeholder="Hey..."
					value={currentMessage}
					onChange={(event) => {
						setCurrentMessage(event.target.value);
					}}
				/>
				<button
					onClick={sendMessage}
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							sendMessage();
						}
					}}>
					&#9658;
				</button>
			</div>
		</div>
	);
}

export default Chat;
