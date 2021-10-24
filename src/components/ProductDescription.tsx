import React, { FC } from 'react'

import brandIcon from '../_images/brand-icon.png'
import locationIcon from '../_images/location-icon.png'

import { IProduct } from '../contexts/GlobalProvider'

const ProductDescription: FC<IProps> = ({ product }): JSX.Element => {
  const { name, url, image_url, retail_price, brand_name } = product

  const shortProductName = name.length > 20 ? `${name.substr(0, 20)}...` : name

  return (
    <a href={url}>
      <div className="border-2 rounded border-secondary">
        <div
          className="relative h-36 "
          style={{
            backgroundImage: `url(${image_url}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Price */}
          <div className="absolute top-0 right-0 px-4 py-2 bg-white rounded">
            <p className="font-bold text-black ">{`$${retail_price}`}</p>
          </div>

          {/* Product name */}
          <div className="absolute bottom-0 left-0 px-2 py-2 bg-black rounded bg-opacity-60">
            <p className="text-sm text-white ">
              {shortProductName} <span className="text-gray-dark">{`$${retail_price}`}</span>
            </p>
          </div>
        </div>

        {/* Product info */}
        <div className="p-2 text-secondary">
          <div className="flex items-center">
            <img className="h-4 mx-0.5" src={brandIcon} alt="brand" />
            <p className="my-2 text-sm ">
              <strong>{brand_name}</strong>
            </p>
          </div>
          <div className="flex items-center">
            <img className="h-4 mx-1" src={locationIcon} alt="location" />
            <p className="text-sm ">Camperdown</p>
          </div>
        </div>
      </div>
    </a>
  )
}

type IProps = {
  product: IProduct
}

export default ProductDescription
