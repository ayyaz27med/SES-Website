import { useState } from "react";
import OtpInput from "react-otp-input";

const OtpInputField = ({ onOtpChange }) => {
  const [otp, setOtp] = useState("");

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <OtpInput
        onChange={(otp) => {
          setOtp(otp);
          onOtpChange?.(otp);
        }}
        value={otp}
        numInputs={4}
        renderInput={(props) => {
          const updatedProps = {
            ...props,
            style: {
              width: "45px",
              fontWeight: "bold",
              margin: "0 5px",
              color: "#00000099",
              textAlign: "center",
            },
          };
          return <input {...updatedProps} className="input input-bordered" />;
        }}
      />
    </div>
  );
};

export default OtpInputField;
