import React, { FC } from 'react'

import closeIcon from '../_images/close-icon.svg'

const CloseButton: FC<IProps> = ({ onClick }): JSX.Element => (
  <button className="relative w-10 h-10 bg-gray-200 border-none" onClick={onClick}>
    <img className="mx-auto" src={closeIcon}></img>
  </button>
)

type IProps = {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void
}

export default CloseButton
