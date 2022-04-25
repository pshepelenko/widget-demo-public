import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// Create React anchor element 
const rootID = 'splashup-root'
const rootDiv = document.createElement('div')
rootDiv.id = rootID
document.body.appendChild(rootDiv)

console.log('Root div created')

ReactDOM.render(
  
    <App />,
  
  document.getElementById(rootID)
)
