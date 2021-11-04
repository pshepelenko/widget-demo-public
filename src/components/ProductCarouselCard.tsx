import React, { FC } from 'react'
import { IProduct } from '../contexts/GlobalProvider'

const ProductCarouselCard: FC<IProps> = ({ product, handleAlternativeClick }): JSX.Element => {
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
        onClick={() => handleAlternativeClick(product.id)}
      ></div>
    </div>
  )
}

type IProps = {
  product: IProduct
  handleAlternativeClick: (arg: string) => void
}

export default ProductCarouselCard
