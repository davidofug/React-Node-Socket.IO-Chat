import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [status, setStatus] = useState("");

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

		socket.on("display_typing_status", (data) => {
			if (data.typing === true) {
				setStatus(`${data.user} is Typing...`);
			} else {
				setStatus("");
			}
		});

		return () => {
			socket.off("receive_message");
			socket.off("display");
		};
	}, []);

	return (
		<div className="chat-wrapper">
			<div className="chat-header">
				<h1 className="chat-heading">
					Live Chat
					<br />
					<span className="chat-typing-status">{status}</span>
				</h1>
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
					onKeyPress={async (event) => {
						if (event.key === "Enter") {
							sendMessage();
						}
					}}
					onKeyDown={async (event) => {
						await socket.emit("typing", {
							user: username,
							room: room,
							typing: true,
						});
					}}
					onBlur={async (event) => {
						await socket.emit("typing", {
							user: username,
							room: room,
							typing: false,
						});
					}}
				/>
				<button onClick={sendMessage}>&#9658;</button>
			</div>
		</div>
	);
}

export default Chat;
