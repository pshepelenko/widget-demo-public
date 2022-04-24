import React, { FC } from 'react'

// Components
import CloseButton from '../components/CloseButton'


// Images
import logo from '../_images/speedo_logo.png'

const MainHeader: FC<IProps> = props => {
  // Props
  const { closeModule } = props

  return (
    <div>
      {/* Logo and close button */}
      <div className="px-3 bg-gray h-10 flex items-center justify-between">
        <div style={{width: '32px'}}/>
        <div className='font-bold'> YOUR POCKET </div>
        <CloseButton onClick={closeModule}></CloseButton>
      </div>
 
    </div>
  )
}

interface IProps {
  closeModule: () => void
  
}

export default MainHeader
