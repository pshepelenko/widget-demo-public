import React, { FC } from 'react'
import { IProduct } from '../contexts/GlobalProvider'
import ProductCard from './ProductCard'

const RecommendationsList: FC<IProps> = ({ products, handleProductClick }): JSX.Element => {
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {
        products.map( product =>
          <ProductCard product={product} handleProductClick={handleProductClick} />
        )
      }
    </div>
  )
}

type IProps = {
  products: IProduct[]
  handleProductClick: (arg: IProduct) => void
}

export default RecommendationsList
