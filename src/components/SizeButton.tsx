import React, { FC, HTMLAttributes } from 'react'


const SizeButton: FC<IProps> = ({ children, size, inStock = true, selected = false, ...rest }): JSX.Element => {
  return (
    <button
    className={`p-1 text-sm font-normal border shadow-sm focus:none mb-3 flex justify-center items-center ${
      inStock
        ? selected
          ? 'h-10 w-10 border border-secondary bg-gray-300'
          : 'h-10 w-10 border border-secondary'
        : selected
          ? 'h-10 w-10 border border-secondary bg-gray-300'
          : 'h-10 w-10 bg-gray text-gray-400'
    }
    ${size === 'big' ? 'text-sm px-8' : ''}
    `}
    {...rest}
  >
    {children}
  </button>
  )
}


interface IProps extends HTMLAttributes<HTMLButtonElement> {
  inStock?: boolean
  selected?: boolean
  size?: 'big'
}

export default SizeButton
