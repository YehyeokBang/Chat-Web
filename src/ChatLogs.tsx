/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const chatBoxStyle = css`
  background-color: black;
  color: white;
  height: 500px;
  overflow-y: auto;
`;

const userNameStyle = css`
  color: white;
  margin-left: 8px;
`;

const myMessageStyle = css`
  text-align: right;
  margin-right: 8px;
`;

const myMessageTextStyle = css`
  color: white;
  display: inline-block;
  background-color: #3f51b5;
  padding: 7px;
  border-radius: 10px;
  margin-top: 5px;
`;

const otherMessageTextStyle = css`
  color: white;
  display: inline-block;
  background-color: #666666;
  padding: 7px;
  border-radius: 10px;
  margin-top: 5px;
`;

const timeStyle = css`
  color: white;
  font-size: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
  vertical-align: bottom;
`;

const ChatLogs: React.FC<{ logs: string[]; userName: string }> = ({
  logs,
  userName,
}) => {
  return (
    <div css={chatBoxStyle}>
      {logs.map((logStr, i) => {
        const log = JSON.parse(logStr);
        const isMine = log.author === userName;
        return (
          <p key={`msg_${i}`} css={userNameStyle}>
            {isMine ? (
              <div css={myMessageStyle}>
                {`${log.author}`} <br />
                <span css={timeStyle}>{`${log.time}`}</span>
                <div css={myMessageTextStyle}>{`${log.message}`}</div>
              </div>
            ) : (
              <div>
                {`${log.author}`} <br />
                <div css={otherMessageTextStyle}>{`${log.message}`}</div>
                <span css={timeStyle}>{`${log.time}`}</span>
              </div>
            )}
          </p>
        );
      })}
    </div>
  );
};

export default ChatLogs;
