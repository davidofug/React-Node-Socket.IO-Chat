# Simple Web based Chat APP

The chat was built using React, Node, Express, and Socket.io.
The major goal of building this chat was to learn websockets using socket.io

# Project Structure

-   Client is the directory with React and client side Socket.io Code.
-   Server is the directory with Node, Express and Server side Socket.io code.

# Set up the project on your computer

1. `git clone https://github.com/davidofug/React-Node-Socket.IO-Chat.git`

2. `cd server`

3. `yarn` or `npm install`

4 `yarn start` or `npm run start`

5. `cd client`

6. `yarn` or `npm install`

7. `yarn start` or `npm run start`

# How to use the Realtime Web based Chat app

1. Open 2 Browser windows and point each to http://localhost:3000

2. Provide a name and room id in each browser window. The room id should be similar but the names should be different to test successfully.

3. The Chat screen will show up in each Browser window. You should be start typing messages and send messages.

# Troubleshooting

-   Make sure yarn or npm has installed the necessary dependences.
-   In case project doesn't run check your terminal for errors.
-   You can also check the browser console.
-   If the receiver or sender receives the double or repeat messages make sure to use the clean up function in the useEffect hook in client/Chat.js and use an empty array for the useEffect dependencies.

### Did you like it?

Follow me on (Twitter)[https://twitter.com/davidofug]
(Click here)[https://youtube.com/c/davidwampamba] to subscribe to my YouTube channel.
(Click here)[blog.davidofug.com] to check out my blog
