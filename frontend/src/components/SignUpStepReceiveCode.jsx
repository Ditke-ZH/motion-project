import { useState } from "react";
import useLogin from "../hooks/useLogin";
import styled from "styled-components";

export default function SignUpStepReceiveCode () {
      const [signupStep, setSignupStep] = useState("enterEmail");

    const handleCodeReceived = () => {
        setSignupStep("enterDetails");
      };

    return (
        <>
            {signupStep === "receiveCode" ? (
                <div>
                <h2>Congratulations!</h2>
                <p>We've sent a confirmation code to your email {email}</p>
                <button onClick={handleCodeReceived}>Continue</button>
                <p>Step 2 out of 3</p>
                </div>
            ) : (
                ""
            )}
        </>
  )
}