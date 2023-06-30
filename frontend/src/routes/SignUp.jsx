import { useState } from "react";
import { api } from "../axios";
import { useNavigate } from "react-router-dom";
import Branding from "../components/Branding";
import SignUpHeader from "../components/SignupHeader";
import { Error } from "../styles/Error";
import useLogin from "../hooks/useLogin";
import styled from "styled-components";
import { BrandingDiv } from "./SignIn";
import SignUpStepEnterEmail from "../components/SignUpStepEnterEmail";
import SignUpStepReceiveCode from "../components/SignUpStepReceiveCode";
import { LoggedOutColoredButton } from "../styles/Button";
import { StyledForm, EmailDiv, LoggedOutStyledInput } from "../styles/LoggedOutSignUpStyle"
import email_logo from "../assets/svgs/email_logo.svg"
import checkmark from "../assets/svgs/checkmark.svg"

export const SignUpPage = styled.div`
  display: flex;
`
export const HeaderAndSignUpDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`
export const SignUpStep = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: 90%;
`
export const SignUpAlternatingDiv= styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  height: 70%;
  && >p{
    width: 300px;
    opacity: 0.5;
  } && >img{
    height: 12rem;
  } &&>h1{
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 2em;
  }
`
export const VerificationForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width:576px;
`
export const VerificationFormInputsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`
export const VerificationLowerDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap:40px;
`
const NarrowField = styled.div`
  width: 268px;
`
export const VerificationDiv = styled.div`
  width: 576px;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-width: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
  padding-bottom: 10px;
`
const SignUpHeightChangeDiv = styled.div`
  height: 1000px;
  padding-top: 70px;
`
const DotContainer = styled.div`
  display: flex;
  gap: 5px;
`
const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black;
  margin: 6px;
`
const EmptyDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 5px;
  border: 1px solid black;
`

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupStep, setSignupStep] = useState("enterEmail");
  const [validationErrors, setValidationErrors] = useState({});
  const { handleLogin, loginError } = useLogin(email, password);
  const navigate = useNavigate();

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

  const handleCodeReceived = () => {
    setSignupStep("enterDetails");
  };

  const handleRegisterValidate = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setValidationErrors({ password_confirm: ["Passwords don't match"] });
      return;
    }
    try {
      const res = await api.post("auth/registration/validation/", {
        email: email,
        username: userName,
        code: code,
        password: password,
        password_repeat: password2,
        first_name: firstName,
        last_name: lastName,
      });
      handleLogin(email, password);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setValidationErrors(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return (
    <SignUpPage>
      {" "}
      <BrandingDiv>
        <Branding />
      </BrandingDiv>
      <HeaderAndSignUpDiv>
        {signupStep === "enterEmail" ? (<SignUpHeader redirectTo="signIn" />) : ('')}
        <SignUpStep>
          {signupStep === "enterEmail" ? (
            <SignUpAlternatingDiv>
              <h1>Sign up</h1>
              <SignUpHeightChangeDiv>
                <StyledForm onSubmit={(e) => handleRegisterSubmit(e)}>
                  <EmailDiv>
                    <img src={email_logo}/>
                    <LoggedOutStyledInput
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </EmailDiv>
                  <div>
                    <LoggedOutColoredButton type="submit">SIGN UP</LoggedOutColoredButton>
                  </div>
                </StyledForm>
              </SignUpHeightChangeDiv>
              <DotContainer>
                <Dot></Dot>
                <EmptyDot></EmptyDot>
                <EmptyDot></EmptyDot>
              </DotContainer>
            </SignUpAlternatingDiv>
          ) : (
            ""
          )}


          {signupStep === "receiveCode" ? (
            <SignUpAlternatingDiv>
              <h1>Congratulations!</h1>
              <img src={checkmark}/>
              <p>We've sent a confirmation code to your email {email}</p>
              <LoggedOutColoredButton onClick={handleCodeReceived}>CONTINUE</LoggedOutColoredButton>
              <DotContainer>
                <EmptyDot></EmptyDot>
                <Dot></Dot>
                <EmptyDot></EmptyDot>
              </DotContainer>
            </SignUpAlternatingDiv>
          ) : (
            ""
          )}


          {signupStep === "enterDetails" ? (
            <SignUpAlternatingDiv>
              <h1>Verification</h1>
              <VerificationForm onSubmit={(e) => handleRegisterValidate(e)}>
                <VerificationFormInputsDiv>
                  <div>
                    {/* <span>Verification code: </span> */}
                      <VerificationDiv>
                        <LoggedOutStyledInput
                          placeholder="Validation Code"
                          type="text"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                        {validationErrors.code && (
                          <Error>
                            {validationErrors.code.map((e) => (
                              <span key={e}>{e}</span>
                            ))}
                          </Error>
                        )}
                      </VerificationDiv>
                  </div>
                  <VerificationLowerDiv>
                    <NarrowField>
                      <EmailDiv>
                        {/* <span>Email: </span> */}
                        <LoggedOutStyledInput placeholder="Email" type="email" value={email} disabled />
                      </EmailDiv>
                    </NarrowField>
                    <NarrowField>
                      {/* <span>Username: </span> */}
                      <EmailDiv>
                        <LoggedOutStyledInput
                          placeholder="Username"
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        {validationErrors.username && (
                          <Error>
                            {validationErrors.username.map((e) => (
                              <span key={e}>{e}</span>
                            ))}
                          </Error>
                        )}
                      </EmailDiv>
                    </NarrowField>
                    <NarrowField>
                      <EmailDiv>
                        {/* <span>First name:</span> */}
                        <LoggedOutStyledInput
                          placeholder="First Name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {validationErrors.first_name && (
                          <span>
                            {validationErrors.first_name.map((e) => (
                              <span key={e}>{e}</span>
                            ))}
                          </span>
                        )}
                      </EmailDiv>
                    </NarrowField>
                    <NarrowField>
                      <EmailDiv>
                        {/* <span>Last name: </span> */}
                        <LoggedOutStyledInput
                          placeholder="Last Name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {validationErrors.last_name && (
                          <span>
                            {validationErrors.last_name.map((e) => (
                              <span key={e}>{e}</span>
                            ))}
                          </span>
                        )}
                      </EmailDiv>
                    </NarrowField>
                    <NarrowField>
                      <EmailDiv>
                        {/* <span>Password</span> */}
                        <LoggedOutStyledInput
                          placeholder="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {validationErrors.password && (
                          <span>
                            {validationErrors.password.map((e) => (
                              <span key={e}>{e}</span>
                            ))}
                          </span>
                        )}
                      </EmailDiv>
                    </NarrowField>
                    <NarrowField>
                      <EmailDiv>
                        {/* <span>Repeat password</span> */}

                        <LoggedOutStyledInput
                          placeholder="Repeat Password"
                          type="password"
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                        />
                        {validationErrors.password_confirm && (
                          <span>
                            {validationErrors.password_confirm.map((e) => (
                              <span key={e}>{e}</span>
                            ))}
                          </span>
                        )}
                      </EmailDiv>
                    </NarrowField>
                  </VerificationLowerDiv>
                </VerificationFormInputsDiv>
                <div>
                  <LoggedOutColoredButton type="submit">COMPLETE</LoggedOutColoredButton>
                </div>
              </VerificationForm>
              <DotContainer>
                <EmptyDot></EmptyDot>
                <EmptyDot></EmptyDot>
                <Dot></Dot>
              </DotContainer>
            </SignUpAlternatingDiv>
          ) : (
            ""
          )}
        </SignUpStep>
      </HeaderAndSignUpDiv>
    </SignUpPage>
  );
}
