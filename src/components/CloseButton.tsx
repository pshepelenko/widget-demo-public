import React, { FC } from 'react'

import closeIcon from '../_images/close-icon.svg'

const CloseButton: FC<IProps> = ({ onClick, color = 'black'}): JSX.Element => (
  <button className="border-none" onClick={onClick}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4L14.6 16L8 22.6L9.4 24L16 17.4L22.6 24L24 22.6L17.4 16L24 9.4Z" fill={color}/>
    </svg>
  </button>
)

type IProps = {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void
  color?: string
}

export default CloseButton
