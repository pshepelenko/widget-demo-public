import React, { FC, HTMLAttributes } from 'react'

const Button: FC<IProps> = ({ children, inverted = false, ...rest }): JSX.Element => (
  <button
    className={`px-4 py-2 text-sm font-medium border rounded-md shadow-sm focus:none ${
      inverted
        ? 'text-purple bg-white border-purple-700  hover:border-opacity-100 border-opacity-20'
        : 'text-white bg-purple-700 border-transparent hover:bg-purple-700 '
    }`}
    {...rest}
  >
    {children}
  </button>
)

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  inverted?: boolean
}

export default Button
