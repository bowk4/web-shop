import React from "react";

const CounterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <circle cx="7" cy="7" r="6.5" fill="#EB5757" stroke="#0F1121" />
    </svg>
  );
};

export default React.memo(CounterIcon);
