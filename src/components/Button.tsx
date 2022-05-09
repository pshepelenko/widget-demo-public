import React, { FC, HTMLAttributes } from 'react'

const Button: FC<IProps> = ({ children, size, inverted = false, ...rest }) => (
  <button
    style={{width: '70px', height: '70px'}}
    className={`p-1 text-xs font-medium border rounded shadow-sm focus:none mb-3 grid place-items-center ${
      inverted
        ? 'text-secondary bg-gray-300 border-secondary  hover:border-2'
        : 'text-secondary bg-white border-secondary hover:bg-gray-300 '
    }
    ${size === 'big' ? 'text-sm px-8' : ''}
    `}
    {...rest}
  >
    {children}
  </button>
)

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  inverted?: boolean
  size?: 'big'
}

export default Button
