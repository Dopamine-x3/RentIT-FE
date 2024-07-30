import { Client } from "@stomp/stompjs";

let socketClient = null;

export const initializeSocket = (brokerURL, roomName, onMessageReceived) => {
  if (socketClient) {
    // 이미 연결이 되어 있는 경우 연결을 닫고 새로운 연결을 설정
    socketClient.deactivate();
  }

  socketClient = new Client({
    brokerURL,
    debug: function (str) {
      console.log(str);
    },
    onConnect: function () {
      console.log("WebSocket 연결이 열렸습니다.");
      socketClient.publish({
        destination: "/topic/messages",
        body: JSON.stringify({ roomName }),
      });

      socketClient.subscribe(`/topic/messages/${roomName}`, function (message) {
        const parsedMessage = JSON.parse(message.body);
        onMessageReceived(parsedMessage);
      });
    },
    onDisconnect: function () {
      console.log("WebSocket 연결이 닫혔습니다.");
    },
    onStompError: function (frame) {
      console.error("WebSocket 오류:", frame.headers.message);
    },
  });

  socketClient.activate();
};

export const sendMessage = (roomName, userName, message) => {
  if (!socketClient) {
    console.error("Socket client is not initialized.");
    return;
  }

  socketClient.publish({
    destination: `/topic/messages/${roomName}`,
    body: JSON.stringify({ message, userName }),
  });
};

export const disconnectSocket = () => {
  if (socketClient) {
    socketClient.deactivate();
    socketClient = null;
  }
};
