import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const DontHaveAnAccount = styled.p`
`

export const LoggedOutHeaderOrientation = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 10%;
  padding-left: 20px;
  padding-right: 20px;
  && >p{
    font-size: 14px;
  }
`

export const TransparentButton = styled.button`
  margin: 5px 15px;
  height: 40px;
  width: 100px;
  border-radius: 99px;
  background-color: transparent;
  border-color: grey;
  border-width: thin;
  border-style: groove;
  cursor: pointer;
`

export default function SignUpHeader({ redirectTo }) {
  const navigate = useNavigate();

  const targetLink = () => (redirectTo === "signUp" ? "/signup" : "/signin");
  const text = () => (redirectTo === "signUp" ? "Don't have an account?" : "Already have an account?");
  const SignUpOrIn = () => (redirectTo === "signIn" ? "Sign In" : "Sign Up")

    return (
      <LoggedOutHeaderOrientation>
        <DontHaveAnAccount>{text()}</DontHaveAnAccount>
        <TransparentButton onClick={() => navigate(targetLink())}>{SignUpOrIn()}</TransparentButton>
      </LoggedOutHeaderOrientation>
    )

  // some other code here
}
