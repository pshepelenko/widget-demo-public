import React, { FC, HTMLAttributes, useState } from 'react'


const PopUp: FC<IProps> = ({ type = 'e-mail', closePopup}): JSX.Element | null => {
  return (
    <div className="bg-gray-100 w-1/2 h-1/2" >
      Please enter your e-mail
      <input type="text" />

      <button onClick={() => {closePopup()}}> Close PopUp</button>  
    </div>      
  )
}


interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?: string
  closePopup: () => void  
}

export default PopUp
