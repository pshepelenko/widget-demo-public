import React, { FC, useContext } from 'react'
import { GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import { Carousel } from '@trendyol-js/react-carousel'
import ProductCarouselCard from './ProductCarouselCard'
import ProductCarouselArrow from './ProductCarouselArrow'

const ProductCarousel: FC<IProps> = ({ selectedProduct, handleAlternativeClick }): JSX.Element => {
  const { productSelected } = useContext(GlobalProviderState)
  //const state = JSON.parse(localStorage.getItem('state')!)
  //const productSelected = state.productSelected
  console.log(productSelected!.images)

  return (
    <div className="relative ">
      <Carousel
        useArrowKeys
        show={1}
        slide={1}
        swiping={true}
        leftArrow={
          <div className="absolute z-20 -translate-y-1/2 -left-1 top-1/2">
            <ProductCarouselArrow direction="left"></ProductCarouselArrow>
          </div>
        }
        rightArrow={
          <div className="absolute z-20 -translate-y-1/2 -right-1 top-1/2">
            <ProductCarouselArrow direction="right"></ProductCarouselArrow>
          </div>
        }
      >
        {productSelected!.images.map((image: string) => (
          <div key={image} className="flex flex-row flex-wrap">
            
              <ProductCarouselCard
                image={image}
                product={productSelected!}
                handleRemoveClick={handleAlternativeClick}
              ></ProductCarouselCard>
            
          </div>
        ))}
      </Carousel>
    </div>
  )
}

type IProps = {
  selectedProduct: IProduct
  handleAlternativeClick: (arg: number) => void
}

export default ProductCarousel
