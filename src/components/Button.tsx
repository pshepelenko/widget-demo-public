import React, { FC, HTMLAttributes } from 'react'

const Button: FC<IProps> = ({ children, size, inverted = false, ...rest }) => (
  <button
    className={`p-2 text-xs font-medium border rounded shadow-sm focus:none ${
      inverted
        ? 'text-secondary  border-secondary  hover:border-opacity-100'
        : 'text-secondary bg-pink border-secondary hover:bg-secondary '
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
