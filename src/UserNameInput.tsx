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

const UserNameInput: React.FC<{
  userNameInput: string;
  setUserNameInput: (value: string) => void;
  setUserName: (value: string) => void;
}> = ({ userNameInput, setUserNameInput, setUserName }) => {
  return (
    <div css={divStyle}>
      <input
        type="text"
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
        placeholder="사용자명을 입력하세요."
        css={inputStyle}
      />
      <button
        onClick={() => userNameInput && setUserName(userNameInput)}
        css={buttonStyle}
      >
        이름 등록
      </button>
    </div>
  );
};

export default UserNameInput;
