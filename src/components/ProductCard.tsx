import React, { FC } from 'react'
import { IProduct } from '../pages/AlternativeDiscovery'

const ProductCard: FC<IProps> = ({ id, product, selectProduct }): JSX.Element => (
  <div
    id={`splashup-product-${id}`}
    className="relative flex justify-center flex-shrink-0 w-48 h-full mx-4 rounded cursor-pointer align-center bg-gray"
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
  >
    <div className="absolute bottom-0 w-full h-10 p-1 text-xs text-white bg-black bg-opacity-40">
      <p>{product.name}</p>
    </div>
  </div>
)

type IProps = {
  id: number
  product: IProduct
  selectProduct: (arg: string) => void
}

export default ProductCard
