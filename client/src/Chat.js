import React, { useEffect, useState } from "react";

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
		}
	};

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
			// console.log(data);
		});
	}, [socket]);
	return (
		<div>
			<p>Live Chat</p>
			<div className="chat-header"></div>
			<div className="chat-body">
				{messageList.map((messageItem) => {
					return <p>{messageItem.message}</p>;
				})}
			</div>
			<div className="chat-footer">
				<input
					placeholder="Hey..."
					onChange={(event) => {
						setCurrentMessage(event.target.value);
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	);
}

export default Chat;
