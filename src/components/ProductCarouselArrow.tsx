import React, { FC } from 'react'

import arrowRight from '../_images/arrow-right.svg'

const ProductCarouselArrow: FC<IProps> = ({ direction }): JSX.Element => (
  <button className="w-9 h-9 min-h-0 btn btn-circle bg-white bg-opacity-60">
    {direction === 'right' && <img className="p-3" src={arrowRight} />}
    {direction === 'left' && <img className="p-3 rotate-180" src={arrowRight} />}
  </button>
)

type IProps = {
  direction: 'left' | 'right'
}

export default ProductCarouselArrow
