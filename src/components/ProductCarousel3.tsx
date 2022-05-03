import React, { FC, useContext, useState, useEffect } from 'react'
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import ProductCarouselCard from './ProductCarouselCard'
import ProductCarouselArrow from './ProductCarouselArrow'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const ProductCarousel3: FC<IProps> = ({ selectedProduct, handleRemoveClick, changedFocus }): JSX.Element => {
  const { productSelected, activeSlide } = useContext(GlobalProviderState)
  const dispatch = useContext(GlobalProviderDispatch)
  
  const next = () => {
    if (activeSlide === (productSelected!.images.length - 1)) {
      dispatch({ type: 'SLIDE_CHANGED', payload: 0}) 
      return 0
    }
    dispatch({ type: 'SLIDE_CHANGED', payload: activeSlide + 1})
    
    return 1    
  }

  const prev = () => {
    if (activeSlide === 0) {
      dispatch({ type: 'SLIDE_CHANGED', payload: productSelected!.images.length - 1}) 
      return 0
    }
    dispatch({ type: 'SLIDE_CHANGED', payload: activeSlide - 1 })
    return 1   
  }

  const updateCurrentSlide = (index: number) => {
    if (activeSlide !== index) {
      dispatch({ type: 'SLIDE_CHANGED', payload: index })
    }
    
  }

  return (
    <div className="relative ">
      <Carousel className="-mb-10"
        statusFormatter={(current, total) => ``}
        showIndicators = {false}
        selectedItem={activeSlide}
        onChange={updateCurrentSlide}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          
            <div className="absolute z-20 -translate-y-1/2 left-1 top-1/2" onClick={prev}>
              <ProductCarouselArrow  direction="left"></ProductCarouselArrow>
            </div>
          
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
          
            <div className="absolute z-20 -translate-y-1/2 right-1 top-1/2" onClick={next}>
              <ProductCarouselArrow direction="right"></ProductCarouselArrow>
            </div>
          
      }
      >
        {productSelected!.images.map((image: string) => (
          <div key={image} className="flex flex-row flex-wrap">
            
              <ProductCarouselCard
                image={image}
                product={productSelected!}
                handleRemoveClick={handleRemoveClick}
              ></ProductCarouselCard>
            
          </div>
        ))}
      </Carousel>
      
    </div> 
  )
}

type IProps = {
  selectedProduct: IProduct
  changedFocus: boolean
  handleRemoveClick: (arg: number) => void
}

export default ProductCarousel3
