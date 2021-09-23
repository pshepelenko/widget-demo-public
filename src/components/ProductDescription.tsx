import React, { FC } from 'react'
import Button from './Button'

import { IProduct } from '../pages/AlternativeDiscovery'

const ProductDescription: FC<IProps> = ({ product }): JSX.Element => (
  <div className="relative h-40">
    <div className="flex text-white">
      <div className="w-3/4">{product.name}</div>
      <div className="w-1/4 font-bold text-right">{`$${product.retail_price}`}</div>
    </div>
    <div className="my-8 text-center">
      <Button onClick={() => window.open(product.url)}>Buy Now</Button>
    </div>
  </div>
)

type IProps = {
  product: IProduct
}

export default ProductDescription
