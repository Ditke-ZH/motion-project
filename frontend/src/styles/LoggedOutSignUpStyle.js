import styled from "styled-components"

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height:80%;
`

export const EmailDiv = styled.div`
  width: 288px;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-width: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
  padding-bottom: 10px;
`

export const LoggedOutStyledInput = styled.input`
  border: none;
  width: 98%;
  padding-left: 10px;
  height: 30px;
`