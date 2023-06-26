import Branding from "../components/Branding";
import { useState } from "react";
import { useSelector } from "react-redux";
import SignUpHeader from "../components/SignupHeader";
import useLogin from "../hooks/useLogin";
import styled from "styled-components";
import avatar from "../assets/svgs/avatar.svg"
import lock from "../assets/svgs/password.svg"
import {LoggedOutColoredButton } from "../styles/Button"
import { StyledForm, EmailDiv, LoggedOutStyledInput } from "../styles/LoggedOutSignUpStyle"

export const SignInPage = styled.div`
  display: flex;
`

export const BrandingDiv = styled.div`
  display: flex;
  width: 40%;
`

export const SignInDiv = styled.div`
display: flex;
flex-direction: column;
width: 60%;
`

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: 90%;
`
export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  height: 60%;
  && >h1{
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 2em;
  }
`

export const EmailPasswordDiv = styled.div`
  width: 288px;
  height: 60px;
  display: flex;
  flex-direction: column;
`

export default function SignIn() {
  const accessToken = useSelector((state) => state.user.accessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loginError } = useLogin(email, password);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <SignInPage>
      <BrandingDiv>
        <Branding />
      </BrandingDiv>
      <SignInDiv>
        <SignUpHeader redirectTo="signUp" />
        <LoginContainer>
          <SignInContainer className="signincontainer">
            <h1>Sign In</h1>
            <StyledForm onSubmit={(e) => handleLoginSubmit(e)}>
              <EmailPasswordDiv>
                <EmailDiv>
                  <img src={avatar}/>
                  <LoggedOutStyledInput
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </EmailDiv>
                <EmailDiv>
                  <img src={lock}/>
                  <LoggedOutStyledInput
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </EmailDiv>
              </EmailPasswordDiv>
              <span>{loginError}</span>
              <div>
                <LoggedOutColoredButton type="submit">SIGN IN</LoggedOutColoredButton>
              </div>
            </StyledForm>
          </SignInContainer>
        </LoginContainer>
        {/* <p>{accessToken}</p> */}
      </SignInDiv>
    </SignInPage>
  );
}