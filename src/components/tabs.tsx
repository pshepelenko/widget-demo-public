import React, { FC } from 'react'

const Tabs: FC<IProps> = ({ nbOfProduct, nbOfProductHistory, tab = 1, setTab }: IProps) => (
  <div className="flex justify-around m-4">
    <div className="flex cursor-pointer" onClick={() => setTab(1)}>
      <p className={`relative ${tab === 1 ? 'tab-underline font-bold' : ''}`}>Alternatives</p>
      {nbOfProduct !== 0 && (
        <div
          className="w-5 h-5 ml-1 text-center text-white rounded-full line bg-secondary"
          style={{ lineHeight: '1.25rem' }}
        >
          {nbOfProduct}
        </div>
      )}
    </div>
    <div className="flex cursor-pointer" onClick={() => setTab(2)}>
      <p className={`relative ${tab === 2 ? 'tab-underline font-bold' : ''}`}>Previously clicked</p>
      {nbOfProductHistory !== 0 && (
        <div
          className="w-5 h-5 ml-1 text-center text-white rounded-full line bg-secondary"
          style={{ lineHeight: '1.25rem' }}
        >
          {nbOfProductHistory}
        </div>
      )}
    </div>
  </div>
)

export default Tabs

interface IProps {
  nbOfProduct: number
  nbOfProductHistory: number
  tab: number
  setTab: (args: number) => void
}
