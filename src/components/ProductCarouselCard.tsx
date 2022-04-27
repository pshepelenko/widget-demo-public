import React, { FC } from 'react'
import { IProduct } from '../contexts/GlobalProvider'

const ProductCarouselCard: FC<IProps> = ({ product, image, handleAlternativeClick }): JSX.Element => {
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
         <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleAlternativeClick(product.id)}>
            <circle cx="14" cy="14" r="12" fill="white" fill-opacity="0.7"/>
            <path d="M14 2C20.6274 2 26 7.37258 26 14C26 20.6274 20.6274 26 14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2ZM14 4C8.47715 4 4 8.47715 4 14C4 19.5228 8.47715 24 14 24C19.5228 24 24 19.5228 24 14C24 8.47715 19.5228 4 14 4ZM9.79289 9.79289C10.1834 9.40237 10.8166 9.40237 11.2071 9.79289L14 12.585L16.7929 9.79289C17.1534 9.43241 17.7206 9.40468 18.1129 9.7097L18.2071 9.79289C18.5976 10.1834 18.5976 10.8166 18.2071 11.2071L15.415 14L18.2071 16.7929C18.5676 17.1534 18.5953 17.7206 18.2903 18.1129L18.2071 18.2071C17.8166 18.5976 17.1834 18.5976 16.7929 18.2071L14 15.415L11.2071 18.2071C10.8466 18.5676 10.2794 18.5953 9.8871 18.2903L9.79289 18.2071C9.40237 17.8166 9.40237 17.1834 9.79289 16.7929L12.585 14L9.79289 11.2071C9.43241 10.8466 9.40468 10.2794 9.7097 9.8871L9.79289 9.79289Z" fill="#555555"/>
          </svg>    
      </div>
    </div>
  )
}

type IProps = {
  product: IProduct
  image: string
  handleAlternativeClick: (arg: string) => void
}

export default ProductCarouselCard
