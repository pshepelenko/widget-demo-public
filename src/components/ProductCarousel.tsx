import React, { FC, useEffect, useState } from 'react'
import { IProduct } from '../pages/AlternativeDiscovery'
import ProductCard from './ProductCard'
import ProductCarouselArrow from './ProductCarouselArrow'
import { Carousel } from '@trendyol-js/react-carousel'

const ProductCarousel: FC<IProps> = ({ alternatives, selectProduct }): JSX.Element => {
  return (
    <div className="relative h-40">
      <Carousel
        useArrowKeys
        show={1.5}
        slide={1}
        swiping={true}
        leftArrow={
          <div className="absolute z-20 -translate-y-1/2 left-1 top-14">
            <ProductCarouselArrow direction="left"></ProductCarouselArrow>
          </div>
        }
        rightArrow={
          <div className="absolute z-20 -translate-y-1/2 right-1 top-14">
            <ProductCarouselArrow direction="right"></ProductCarouselArrow>
          </div>
        }
      >
        {alternatives.map((alternative, index) => (
          <ProductCard
            id={index}
            key={alternative.id}
            product={alternative}
            selectProduct={selectProduct}
          ></ProductCard>
        ))}
      </Carousel>
    </div>
  )
}

type IProps = {
  alternatives: IProduct[]
  selectProduct: (arg: string) => void
}

export default ProductCarousel
