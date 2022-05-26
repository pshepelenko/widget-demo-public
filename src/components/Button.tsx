import React, { FC, HTMLAttributes } from 'react'

const Button: FC<IProps> = ({ children, size, inverted = false, ...rest }) => (
  <button
    style={{width: '76px', height: '76px'}}
    className={`px-1 py-2 text-sm font-normal border rounded shadow-sm focus:none mb-3 flex flex-col justify-between items-center ${
      inverted
        ? 'text-secondary bg-gray-300 border-secondary  hover:border-2 hover:border-gray-500'
        : 'text-secondary bg-white border-secondary hover:border-2 hover:border-gray-500'
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
