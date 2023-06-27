import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  * {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
 }
 
 *,
 *::after,
 *::before {
  box-sizing: inherit;
 }

 html {
  box-sizing: border-box;
  font-size: 100%;
 }

 body {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  height: 100%;
  margin: 0px;
  
  &.modal-open {
    overflow: hidden;
  }

 }

 textarea {
  font-family: "Roboto", sans-serif;
 }
 
 p {
  line-height: 1.625rem;
  font-size: 1rem;
  margin-block-start: 0;
  margin-block-end: 0;
 }

 ul {
  padding-inline-start: 0;
 }
`;
