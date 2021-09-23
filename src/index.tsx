import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const rootID = 'splashup-root'

const rootDiv = document.createElement('div')
rootDiv.id = rootID
document.body.appendChild(rootDiv)

console.log('Root div created')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById(rootID)
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
