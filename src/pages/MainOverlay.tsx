// @flow
import React, { FC } from 'react'

export const MainOverlay: FC<IProps> = props => (
  <div className="flex-grow bg-black bg-opacity-90 " onClick={props.closeModule}></div>
)

interface IProps {
  closeModule: () => void
}
