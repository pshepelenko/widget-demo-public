import React, { FC } from 'react'
import { IProduct } from '../pages/AlternativeDiscovery'

const ProductCard: FC<IProps> = ({ id, product, selectProduct }): JSX.Element => {
  const shortProductName = product.name.length > 20 ? `${product.name.substr(0, 20)}...` : product.name

  return (
    <div>
      <div
        id={`splashup-product-${id}`}
        className="flex justify-center flex-shrink-0 w-48 mx-4 rounded cursor-pointer h-28 align-center bg-gray"
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
        onClick={() => selectProduct(product.id)}
      ></div>
      <div className="w-full h-12 text-xs text-center text-gray">
        <p>{shortProductName}</p>
        <p>${product.offer_price}</p>
      </div>
    </div>
  )
}

type IProps = {
  id: number
  product: IProduct
  selectProduct: (arg: string) => void
}

export default ProductCard
