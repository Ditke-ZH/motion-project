import { useState } from "react";
import { api } from "../axios";
import styled from "styled-components";

export default function SignUpStepEnterEmail () {
    const [email, setEmail] = useState(
        `alexander+${Math.floor(Math.random() * 1000)}@muedespacher.ch`
      );

      const [signupStep, setSignupStep] = useState("enterEmail");

      const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await api.post("auth/registration/", {
            email: email,
          });
          setSignupStep("receiveCode");
        } catch (e) {
          console.log("API error: ", e);
        }
      };

    return(
        <>
            {signupStep === "enterEmail" ? (
                <div>
                <h1>Sign up</h1>
                <form onSubmit={(e) => handleRegisterSubmit(e)}>
                    <div>
                    <span>eMail</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div>
                    <button type="submit">Continue</button>
                    </div>
                </form>
                <p>Step 1 out of 3</p>
                </div>
            ) : (
                ""
            )}
        </>
    )
}