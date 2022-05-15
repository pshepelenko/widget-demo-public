import React, { FC, HTMLAttributes, useState } from 'react'
import PopUpButton from './PopUpButton'


const EmailCollection: FC<IProps> = ({ type = 'e-mail', closePopup, saveEmail}): JSX.Element | null => {
  const [userEmail, setUserEmail] = useState("your@email.com");

  return (
    <div className='flex items-center justify-center'>
      <div onClick={() => {closePopup(true)}} className="fixed top-0 left-0 bg-gray-500/50 w-full h-full z-[102] flex items-center justify-center" />
      <div className="fixed top-1/4 bg-gray-100 w-80 h-80 z-[102] px-10 py-20" >
        Please enter your e-mail
        <input className="mt-3" value={userEmail} type="text" onChange={(e) => setUserEmail(e.target.value)}/>

        <div className='flex flex-row absolute bottom-3 right-10 w-1/3 justify-between'>
          <PopUpButton onClick={() => {saveEmail(userEmail)}}> Save </PopUpButton>
          <PopUpButton color='black' onClick={() => {closePopup(true)}}> Close </PopUpButton>  
        </div>
      </div>      
    </div>
  )
}


interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?: string
  closePopup: (state: boolean) => void
  saveEmail: (email: string) => void  
}

export default EmailCollection
