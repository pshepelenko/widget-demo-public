import React, { FC, useContext } from 'react'
import { GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import { Carousel } from '@trendyol-js/react-carousel'
import ProductCarouselCard from './ProductCarouselCard'
import ProductCarouselArrow from './ProductCarouselArrow'

const ProductCarousel2: FC<IProps> = ({ selectedProduct, handleAlternativeClick }): JSX.Element => {
  const { productSelected } = useContext(GlobalProviderState)
  //const state = JSON.parse(localStorage.getItem('state')!)
  //const productSelected = state.productSelected
  console.log(productSelected!.imageUrls)

  const carouselButtonIndexPrevious = (index: number): string => {
    if (index === 0) return (productSelected!.imageUrls.length - 1).toString()
    return (index - 1).toString()
  }
  
  const carouselButtonIndexNext = (index: number): string => {
    if (index === (productSelected!.imageUrls.length - 1)) return '0'
    return (index + 1).toString()
  }

  return (
    <div className="relative ">
      <div className="carousel w-full">
        
        
        
        {
          productSelected!.imageUrls.map((image: string, index: number) => (
            <div id={index.toString()} className="carousel-item flex flex-row flex-wrap  relative w-full">
              
                <ProductCarouselCard
                  image={image}
                  product={productSelected!}
                  handleAlternativeClick={handleAlternativeClick}
                ></ProductCarouselCard>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
                  <a href={'#' + carouselButtonIndexPrevious(index)} className="btn btn-circle">❮</a> 
                  <a href={'#' + carouselButtonIndexNext(index)} className="btn btn-circle">❯</a>
                </div>                    
            </div>
          ))
        /*
          () => {
            let i = 0
            let image: string
            for (image of productSelected!.imageUrls) {
              <div id={i.toString()} className="carousel-item relative w-full">
                <ProductCarouselCard
                image={image}
                product={productSelected!}
                handleAlternativeClick={handleAlternativeClick}
                ></ProductCarouselCard>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={'#' + (i-1).toString()} className="btn btn-circle">❮</a> 
                  <a href={'#' + (i+1).toString()} className="btn btn-circle">❯</a>
                </div>            
              </div>      
            }  
          }
        */}
      </div>
    </div> 
  )
}

type IProps = {
  selectedProduct: IProduct
  handleAlternativeClick: (arg: string) => void
}

export default ProductCarousel2
