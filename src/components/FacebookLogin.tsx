import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Button from './Button'

const responseFacebook = (response: any) => {
    console.log(response);
  }
  
const componentClicked = () => {
  console.log('button was clicked');
}
  

const FacebookLoginButton = (): JSX.Element => (
  <Button><FacebookLogin
  appId="1330508167421584"
  autoLoad={false}
  fields="name,email,picture"
  onClick={componentClicked}
  callback={responseFacebook}
  render={renderProps => (
    <button onClick={renderProps.onClick}>This is my custom FB button</button>
  )}
  />  
  </Button>
)

export default FacebookLoginButton

 
 
