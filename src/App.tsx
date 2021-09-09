import React, { useState, FC, ChangeEvent } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

/* eslint-disable */
const axios = require('axios')
/* eslint-disable */

const App: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [buttonState, setButtonState] = useState<boolean>(false)
  const [errorState, setErrorState] = useState<boolean>(false)
  const [isLogin, setisLogin] = useState<boolean>(false)

  const onClickButton = (): void => {
    const verifiedEmailState = (email: string) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email) && email.length < 50 ? true : false
    }

    const verifiedPasswordState = (password: string) => {
      return password.length < 16 ? password.length > 4 ? true : false : false
    }

    if (verifiedPasswordState(password) && verifiedEmailState(email)) {

      const Post = async () => {
        const data = new FormData()
        data.append('email', email)
        data.append('password', password)
        const body = data;
        axios
          .post("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", body)
          .then((response: any) => {
            setButtonState(true)
            setErrorState(false)
            setisLogin(true)
          })
          .catch(() => {
            setErrorState(true)
          });
      }
      Post()
    }
  }

  const handleEmailOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handlePasswordOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }
  return (
    <Wrapper>
      {isLogin && <Redirect to="/todoList" />}
      <Logo alt={`Rapptr Labs Logo`} src={`${logoUrl}`} />
      <LoginFormContainer onSubmit={handleSubmit}>
        <h3 style={{ color: '#e8e3e3' }}>Email :</h3>
        <InputField name='email' type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={handleEmailOnChange} placeholder="user@rapptrlabs.com" style={{ backgroundImage: 'url(https://img.icons8.com/ios-glyphs/30/000000/user--v1.png)' }}
          onKeyPress={event => {
            if (event.key === 'Enter') {

            }
          }} />
        <h3 style={{ color: '#e8e3e3' }}>Password :</h3>
        <InputField name='password' type='password' onChange={handlePasswordOnChange} required pattern=".{4,16}" title='It must be at least 4 characters and less than 16 characters' placeholder="Must be at least 4 characters" style={{ backgroundImage: 'url(https://img.icons8.com/ios-glyphs/30/000000/password--v1.png)' }} onKeyPress={event => {
          if (event.key === 'Enter') {

          }
        }} />
        <MyButton type='submit' disabled={buttonState} onClick={onClickButton} > Login </MyButton>
        {errorState && <h4 style={{ color: '#f75639', textAlign: 'center' }}>Error! Please try again.</h4>}
      </LoginFormContainer>
    </Wrapper>
  );
}

export const Wrapper = styled.section`
  display : grid;
  place-items:start center;
  height:800px;
`

export const LoginFormContainer = styled.form`
  display :flex;
  flex-direction: column;
  height:300px;
  width:450px;
  border:solid;
  border-color: #e8e3e3;
  borderRadius: 1;
  padding : 15px 20px 50px 20px;
  justify-content: space-between;

  `

export const InputField = styled.input`
  background-color:#e8e3e3;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  border-radius: 5px;
  padding: 12px 45px;
  font-size: 20px; 
  &:focus {
    }
  `

export const MyButton = styled.button`
  background: #1976d2;
  color: #e8e3e3;
  font-size: 20px;
  margin-top: 28px;
  padding: 8px;
  border: 2px solid #00000078;
  border-radius: 6px;
  &:active {
    background:#1959d2;
    }
   &:disabled {
    background:#848080;
    }
  `

export const Logo = styled.img`
  height : 325px;
  width : 400px;
  `

export const logoUrl = 'https://d33wubrfki0l68.cloudfront.net/fea3e88940cd1796276d8f5e7ffe533492e074d4/e02ed/static/rapptr_logo-39a625a8171d1568d21fd071d11ddb14.png'

export default App;
