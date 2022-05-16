import React, { FC, HTMLAttributes, useState } from 'react'
import CloseButton from './CloseButton';
import PopUpButton from './PopUpButton'


const ExportSuccess: FC<IProps> = ({ type = 'e-mail', closePopup}): JSX.Element | null => {
  const [quantity, setQuantity] = useState(0);
  const [scale, setScale] = useState('day');

  return (
    <div className='flex items-center justify-center'>
      <div onClick={() => {closePopup(true)}} className="fixed top-0 left-0 bg-gray-500/50 w-full h-full z-[102] flex items-center justify-center" />
      <div className="fixed top-1/4 bg-gray-100 w-80 h-80 z-[102] px-10 py-10 flex flex-col items-center justify-around" >
  
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24 0C37.2686 0 48 10.7314 48 24C48 37.2686 37.2686 48 24 48C10.7314 48 0 37.2686 0 24C0 10.7314 10.7314 0 24 0ZM9.71572 24.9429L12.2533 22.4053L19.5042 29.6562L35.8182 13.3422C36.6884 14.2124 37.4859 15.0099 38.3558 15.8798C32.0477 22.1878 25.8123 28.4232 19.5038 34.7318C16.241 31.469 12.9781 28.2061 9.7152 24.9432L9.71572 24.9429Z" fill="black"/>
        </svg>

          
        <div className='flex flex-col mt-3 text-sm text-center'>
          This shortlist has been sent to your email.
        </div>
          
          
        <div className='flex flex-row mt-3 w-full justify-center'>
          <button className='py-1 px-2 w-40 text-sm font-medium border shadow-sm focus:none mb-3 flex items-center justify-center text-secondary bg-secondary text-white' onClick={() => closePopup(true)}> Close </button>
       </div>
      </div>      
    </div>
  )
}


interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?: string
  closePopup: (state: boolean) => void  
}

export default ExportSuccess
