import React, { FC } from 'react'

import brandIcon from '../_images/brand-icon.png'
import locationIcon from '../_images/location-icon.png'

import { IProduct } from '../contexts/GlobalProvider'

const ProductDescription: FC<IProps> = ({ product, handleProductClick }): JSX.Element => {
  const { name, image_url, retail_price, brand_name } = product

  const shortProductName = name.length > 20 ? `${name.substr(0, 20)}...` : name

  return (
    <div className="border-2 rounded border-secondary" onClick={() => handleProductClick(product)}>
      <div
        className="relative h-36 "
        style={{
          backgroundImage: `url(${image_url}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        

        
      </div>

      {/* Product info */}
      <div className="p-2 text-secondary">
        <div className="flex items-center">
          <img className="h-4 mx-0.5" src={brandIcon} alt="brand" />
          <p className="my-2 text-sm ">
            <strong>Price: ${retail_price}</strong>
          </p>
        </div>
        
      </div>
    </div>
  )
}

type IProps = {
  product: IProduct
  handleProductClick: (arg: IProduct) => void
}

export default ProductDescription
