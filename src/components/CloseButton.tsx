import React, { FC } from 'react'

import closeIcon from '../_images/close-icon.svg'

const CloseButton: FC<IProps> = ({ onClick }): JSX.Element => (
  <button className="border-none" onClick={onClick}>
    <img src={closeIcon} alt="close-cross"></img>
  </button>
)

type IProps = {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void
}

export default CloseButton
