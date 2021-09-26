import React, { FC, HTMLAttributes } from 'react'

const Button: FC<IProps> = ({ children, size, inverted = false, ...rest }): JSX.Element => (
  <button
    className={`p-2 text-xs font-medium border rounded shadow-sm focus:none ${
      inverted
        ? 'text-purple-700  border-purple-700  hover:border-opacity-100'
        : 'text-white bg-purple-700 border-transparent hover:bg-purple-700 '
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
