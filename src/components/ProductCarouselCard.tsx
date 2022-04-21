import React, { FC } from 'react'
import { IProduct } from '../contexts/GlobalProvider'

const ProductCarouselCard: FC<IProps> = ({ product, handleAlternativeClick }): JSX.Element => {
  return (
    <div className="w-full h-80">
      <div
        className="w-full h-full border-2 rounded border-secondary"
        style={{
          backgroundImage: `url(${product.image_urls[0]}`,
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
