import React from "react";

function CustomCursor() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 0, left: 0, zIndex: 9999 }}
    >
      <circle
        cx="12"
        cy="12"
        r="6"
        fill="transparent"
        stroke="#000"
        strokeWidth="2"
      />
    </svg>
  );
}

export default React.memo(CustomCursor);
