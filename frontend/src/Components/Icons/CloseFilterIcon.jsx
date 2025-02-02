import React from "react";

const CloseFilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="#f1f2f9"
    >
      <path d="M15.836,15.129l6.164-6.342V4.5c0-1.378-1.122-2.5-2.5-2.5H4.5c-.494,0-.966,.155-1.371,.422L.764,.057,.057,.764,23.237,23.944l.707-.707L15.836,15.129ZM4.5,3h15c.827,0,1.5,.673,1.5,1.5v3.88l-5.871,6.041L3.856,3.149c.2-.095,.418-.149,.644-.149Zm9.5,14.536l1,1v5.496l-6-4.532v-3.561L2,8.787v-3.251l1,1v1.845l7,7.151v3.402l4,3.066v-4.464Z" />
    </svg>
  );
};

export default React.memo(CloseFilterIcon);
