import React, { FC } from 'react'
import { IProduct } from '../contexts/GlobalProvider'

const ProductCarouselCard: FC<IProps> = ({ product, image, handleRemoveClick }): JSX.Element => {
  return (
    <div className="w-full h-80">
      <div
        className="w-full h-full border-2 rounded border-secondary flex justify-end"
        style={{
          backgroundImage: `url(${image}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        
      >
        <svg className="mt-1 mr-1" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleRemoveClick(product.id)}>
          <circle cx="11" cy="11" r="10" fill="white" fill-opacity="0.7" stroke="#555555" stroke-width="2"/>
          <rect x="6" y="10" width="10" height="2" rx="1" fill="#555555"/>
        </svg>

           
      </div>
    </div>
  )
}

type IProps = {
  product: IProduct
  image: string
  handleRemoveClick: (arg: number) => void
}

export default ProductCarouselCard
