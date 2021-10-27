import React, { FC } from 'react'

import magnifier from '../_images/magnifier.svg'

const SearchField: FC<IProps> = ({ name, value, maxLength, onChange }): JSX.Element => (
  <div className="relative">
    <input
      type="text"
      placeholder={`i.e. Ikea brand`}
      className="w-full px-2 py-1 text-sm border-2 rounded-full focus:ring-1 focus:outline-none focus:ring-primary focus:ring-opacity-50"
      name={name}
      value={value}
      maxLength={maxLength}
      onChange={onChange}
    ></input>
    <button type="submit" className="absolute -translate-y-1/2 top-1/2 right-4 z-2">
      <img src={magnifier} />
    </button>
  </div>
)

type IProps = {
  name: string
  value: string
  maxLength?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default SearchField
