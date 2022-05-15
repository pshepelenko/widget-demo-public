import React, { FC, HTMLAttributes } from 'react'

const PopUpButton: FC<IProps> = ({ children, size, color = 'white', ...rest }) => (
  <button
    className={`py-1 px-2 text-sm font-medium border rounded shadow-sm focus:none mb-3 flex items-center justify-center ${
      color === 'white'
        ? 'text-secondary bg-white border-secondary  hover:bg-gray-300'
        : 'text-secondary bg-secondary text-white hover:bg-gray-300 '
    }
    ${size === 'big' ? 'text-sm px-8' : ''}
    `}
    {...rest}
  >
    {children}
  </button>
)

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  color?: string
  size?: 'big'
}

export default PopUpButton
