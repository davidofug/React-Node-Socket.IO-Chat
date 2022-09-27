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
		<div className="chat-wrapper">
			<div className="chat-header">
				<h1>Live Chat</h1>
			</div>
			<div className="chat-body">
				<ScrollToBottom className="chat-body-inner">
					{messageList.map((messageItem, index) => {
						return (
							<div
								key={index.toString()}
								className={`message-wrapper ${
									username === messageItem.author
										? "you"
										: "other"
								}`}>
								<article className="message">
									{messageItem.message}
								</article>
								<div className="author-time">
									{messageItem.time}{" "}
									<span>{messageItem.author}</span>
								</div>
							</div>
						);
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
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							sendMessage();
						}
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	);
}

export default Chat;
