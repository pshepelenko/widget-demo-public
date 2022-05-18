import React, { FC, HTMLAttributes, useState } from 'react'
import CloseButton from './CloseButton';
import PopUpButton from './PopUpButton'


const EmailCollection: FC<IProps> = ({ type = 'e-mail', closePopup, saveEmail}): JSX.Element | null => {
  const [userEmail, setUserEmail] = useState("Email Address");

  return (
    <div className='flex items-center justify-center'>
      <div onClick={() => {closePopup(true)}} className="absolute top-0 left-0 bg-gray-500/50 w-full h-full z-[102] flex items-center justify-center" />
      <div className="fixed top-1/4 bg-gray-100 w-80 z-[102] px-10 pt-20 pb-10" >
        <div className='flex flex-row bg-secondary text-white h-10 w-full absolute top-0 left-0 px-2 justify-between items-center'> 
          <div className='w-5'/>
          PLEASE ENTER YOUR EMAIL 
          <CloseButton color='white' onClick={() => closePopup(true)} />
        </div>
        
        <input className="my-3 w-full h-10 px-2 border" value={userEmail} type="text" onChange={(e) => setUserEmail(e.target.value)}/>

        <div className='flex flex-row mt-5 w-full justify-center'>
          <button className='py-1 px-2 w-40 text-sm  border shadow-sm focus:none mb-3 flex items-center justify-center text-secondary bg-secondary text-white' onClick={() => {saveEmail(userEmail)}}> SUBMIT </button>
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
