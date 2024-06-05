import React from "react";

const CheckMarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      className="ionicon"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="#2FC72FF2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="30"
        d="M416 128L192 384l-96-96"
      />
    </svg>
  );
};

export default React.memo(CheckMarkIcon);
