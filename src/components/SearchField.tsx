import React, { FC } from 'react'

import magnifier from '../_images/magnifier.svg'

const SearchField: FC<IProps> = ({ name, value, onChange }): JSX.Element => (
  <div className="relative">
    <input
      autoFocus
      type="text"
      placeholder={`Try "better style..."`}
      className="w-full px-3 py-2 text-sm rounded-full focus:outline-none focus:ring focus:border-purple-300 "
      name={name}
      value={value}
      onChange={onChange}
    ></input>
    <button className="absolute -translate-y-1/2 top-1/2 right-4 z-2">
      <img src={magnifier} />
    </button>
  </div>
)

type IProps = {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default SearchField
