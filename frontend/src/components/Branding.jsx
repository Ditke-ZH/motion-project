import styled from "styled-components";
import white_motion_logo from "../assets/images/logo_white.png"
import apple_image from "../assets/svgs/apple.svg"
import google_play_image from "../assets/svgs/google.svg"
import twitter_logo from "../assets/svgs/twitter_icon.svg"
import facebook_logo from "../assets/svgs/facebook_icon.svg"
import instagram_logo from "../assets/svgs/instagram_icon.svg"

export const BrandingContainer = styled.div`
  background: url("/src/assets/images/background_image.png"), linear-gradient(132.96deg, #C468FF 3.32%, #6E91F6 100%);
  background-blend-mode: multiply, normal;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  height: 100vh;
  width: 100vw;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const BrandingLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 73%;
  align-items: center;
  margin-bottom: 100px;
  && >img {
    width: 80px;
    height: 80px;
  } && >h2 {
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 2em;
  }&& >p {
    width: 280px;
    opacity: 0.5;
  }
`

export const TransparentLink = styled.a`
  margin: 5px 15px;
  height: 30px;
  width: 100px;
  border-radius: 99px;
  background-color: transparent;
  border-color: grey;
  border-width: thin;
  border-style: groove;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BrandingAppLinks = styled.div`
  display: flex;
`

export const BrandingBottomContainer = styled.div`
  height: 27%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const BrandingSocialButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`

export const BrandingCopyRightDiv = styled.div`
 && >p {
  font-size: 13px;
} 
`

export const SocialButton = styled.a`
  border-radius: 100px;
  width: 40px;
  height: 40px;
  border-style: none;
  padding: 0;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  && >img {
    width: 90%;
    height: 90%;
  }
`;




export default function Branding() {
  // some other code here

  return (
    <BrandingContainer>
        <BrandingLogoContainer>
          <img src={white_motion_logo}/>
          <h2>Motion</h2>
          <p>Connect with friends and the world around you with Motion.</p>
          <BrandingAppLinks>
            <TransparentLink href='https://www.apple.com/store' target="_blank"><img src={apple_image}/></TransparentLink>
            <TransparentLink href='https://play.google.com/store/games?pli=1' target="_blank"><img src={google_play_image}/></TransparentLink>
          </BrandingAppLinks>
        </BrandingLogoContainer>
        <BrandingBottomContainer>
          <BrandingSocialButtonDiv>
            <SocialButton href='https://www.twitter.com/' target="_blank"><img alt="Twitter" src={twitter_logo}/></SocialButton>
            <SocialButton href='https://www.facebook.com/' target="_blank"><img alt="Facebook" src={facebook_logo}/></SocialButton>
            <SocialButton href='https://www.instagram.com/' target="_blank"><img alt="Instagram" src={instagram_logo}/></SocialButton>
          </BrandingSocialButtonDiv>  
          <BrandingCopyRightDiv>
            <p>© Motion 2018. All rights reserved.</p>
          </BrandingCopyRightDiv>
        </BrandingBottomContainer>
    </BrandingContainer>
  );
}