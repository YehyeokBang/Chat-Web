/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import ChatLogs from "./ChatLogs";
import UserNameInput from "./UserNameInput";
import MessageInput from "./MessageInput";
import axios from "axios";

const containerStyle = css`
  width: 500px;
  margin: 0 auto;
`;

const ChatComponent: React.FC = () => {
  const [userNameInput, setUserNameInput] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [chatLogs, setChatLogs] = useState<string[]>([]);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (userName) {
      // 만약 true이면 사용자 이름 중복이니 다시 입력하라는 메시지를 띄워주고, userName을 초기화
      axios.get(`http://localhost:8080/user/${userName}`).then((res) => {
        if (res.data) {
          alert("이미 존재하는 사용자 이름입니다.");
          setUserName("");
          return;
        }
      });

      wsRef.current = new WebSocket(`ws://localhost:8080/chat`);

      wsRef.current.onopen = () => console.log("Connection opened");

      wsRef.current.onmessage = (event) =>
        setChatLogs((prevChatLogs) => [...prevChatLogs, event.data]);

      wsRef.current.onclose = (event) => {
        if (event.wasClean) {
          console.log(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          );
        } else {
          console.log("[close] Connection died");
        }

        alert("서버와의 연결이 종료되었습니다. 재연결합니다.");
        setUserNameInput("");
        setChatLogs([]);
        setUserName("");
      };

      return () => wsRef.current?.close();
    }

    return undefined;
  }, [userName]);

  const sendMessage = () => {
    if (
      message.trim() !== "" &&
      userName.trim() !== "" &&
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN
    ) {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let time = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
      let payload = JSON.stringify({
        author: userName,
        message: message,
        time: time,
      });
      wsRef.current.send(payload);

      setMessage("");
    }
  };

  return (
    <div css={containerStyle}>
      <h1>아지트</h1>
      <ChatLogs logs={chatLogs} userName={userName} />
      {!userName ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (userNameInput) {
              setUserName(userNameInput);
            }
          }}
        >
          <UserNameInput
            userNameInput={userNameInput}
            setUserNameInput={setUserNameInput}
            setUserName={setUserName}
          />
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={(e) => sendMessage()}
          />
        </form>
      )}
    </div>
  );
};

export default ChatComponent;
