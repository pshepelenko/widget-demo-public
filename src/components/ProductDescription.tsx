import React, { FC } from 'react'
import Button from './Button'

import { IProduct } from '../pages/AlternativeDiscovery'

const ProductDescription: FC<IProps> = ({ product }): JSX.Element => {
  const shortProductName = product.name.length > 20 ? `${product.name.substr(0, 20)}...` : product.name

  return (
    <div className="flex flex-col h-full p-4 text-center text-gray-darkest">
      <div
        className="flex-grow w-10/12 mx-auto mt-2"
        style={{
          backgroundImage: `url(${product.image_url}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scrollSnapAlign: 'start',
          transformOrigin: 'center center',
          transform: 'scale(1)',
          transition: 'transform 0.5s'
        }}
      ></div>
      <div>
        <p className="my-2 text-sm text-gray-darkest">
          <strong>
            {shortProductName} <span className="text-gray-dark">{`$${product.retail_price}`}</span>
          </strong>
        </p>

        <Button size="big" onClick={() => window.open(product.url)}>
          View Product
        </Button>
      </div>
    </div>
  )
}

type IProps = {
  product: IProduct
}

export default ProductDescription
