/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const divStyle = css`
  display: flex;
  height: 30px;
`;

const inputStyle = css`
  flex: 8;
`;

const buttonStyle = css`
  flex: 2;
`;

const MessageInput: React.FC<{
  message: string;
  setMessage: (value: string) => void;
  sendMessage: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ message, setMessage, sendMessage }) => {
  return (
    <div css={divStyle}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="보내실 메시지를 입력하세요."
        css={inputStyle}
      />
      <button onClick={sendMessage} css={buttonStyle}>
        보내기
      </button>
    </div>
  );
};

export default MessageInput;
