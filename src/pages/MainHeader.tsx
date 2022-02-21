import React, { FC } from 'react'

// Components
import CloseButton from '../components/CloseButton'


// Images
import logo from '../_images/speedo_logo.png'

const MainHeader: FC<IProps> = props => {
  // Props
  const { closeModule } = props

  return (
    <div className="bg-gray-100">
      {/* Logo and close button */}
      <div className="px-2 flex items-center justify-between">
        <img src={logo} width="100" alt="client-logo" />
        <CloseButton onClick={closeModule}></CloseButton>
      </div>
 
    </div>
  )
}

interface IProps {
  closeModule: () => void
  
}

export default MainHeader
