import React, { FC } from 'react'
import { IProduct } from '../contexts/GlobalProvider'

const ProductCarouselCard: FC<IProps> = ({ product, selectProduct }): JSX.Element => {
  return (
    <div className="w-1/2 p-1">
      <div
        className="w-full h-24 border-2 rounded border-secondary"
        style={{
          backgroundImage: `url(${product.image_url}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={() => selectProduct(product.id)}
      ></div>
    </div>
  )
}

type IProps = {
  product: IProduct
  selectProduct: (arg: string) => void
}

export default ProductCarouselCard
