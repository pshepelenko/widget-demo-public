import React, { FC, HTMLAttributes, useState } from 'react'
import CloseButton from './CloseButton';
import PopUpButton from './PopUpButton'


const ReminderSettings: FC<IProps> = ({ type = 'e-mail', closePopup, saveSettings}): JSX.Element | null => {
  const [quantity, setQuantity] = useState(0);
  const [scale, setScale] = useState('day');

  return (
    <div className='flex items-center justify-center'>
      <div onClick={() => {closePopup(true)}} className="absolute top-0 left-0 bg-gray-500/50 w-full h-full z-[102] flex items-center justify-center" />
      <div className="fixed top-1/4 bg-gray-100 w-80 z-[102] px-10 py-10" >
        <div className='flex flex-row bg-secondary text-white h-10 w-full absolute top-0 left-0 px-2 justify-between items-center'> 
          <div className='w-5'/>
          REMIND ME 
          <CloseButton color='white' onClick={() => closePopup(true)} />
          
        </div>
        
        <div className='flex flex-col mt-3'>
          <label>
            <input className="mt-3 mr-1" style={{accentColor: "black"}} name="period"  type="radio" onChange={() => {setQuantity(1); setScale('day') }}/>
            In 1 day
          </label>
          <label>
            <input className="mt-3 mr-1" style={{accentColor: "black"}} name="period" type="radio" onChange={() => {setQuantity(7); setScale('day') }}/>
            In 7 days
          </label>
          <label>
            <input className="mt-3 mr-1" style={{accentColor: "black"}} name="period" type="radio" onChange={() => {setQuantity(2); setScale('week') }}/>
            In 2 weeks
          </label>
        </div>
        <div className="font-bold my-3"> 
          Customize
        </div>
        <div> 
          <select className="border w-20 mb-3"  name="reminder-number" onChange={(e) => setQuantity(parseInt(e.target.value))}> 
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div className='flex flex-row'>
            <label className='mr-4'>
              <input className="mt-3 mr-1" style={{accentColor: "black"}} name="period" type="radio" onChange={() => setScale('day')}/>
              Day
            </label>
            <label className='mr-4'>
              <input className="mt-3 mr-1" style={{accentColor: "black"}} name="period"  type="radio" onChange={() => setScale('week')}/>
              Week
            </label>
            <label className='mr-4'>
              <input className="mt-3 mr-1" style={{accentColor: "black"}} name="period"  type="radio" onChange={() => setScale('month')}/>
              Month
            </label>
          </div>
        </div>

        <div className='flex flex-row mt-5 w-full justify-center'>
          <button className='py-1 px-2 w-40 text-sm font-medium border shadow-sm focus:none mb-3 flex items-center justify-center text-secondary bg-secondary text-white' onClick={() => {saveSettings(quantity, scale)}}> Submit </button>
            
        </div>
      </div>      
    </div>
  )
}


interface IProps extends HTMLAttributes<HTMLButtonElement> {
  type?: string
  closePopup: (state: boolean) => void
  saveSettings: (quantity: number, scale: string) => void  
}

export default ReminderSettings
