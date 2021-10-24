import React, { FC } from 'react'
import { IProduct } from '../contexts/GlobalProvider'
import { Carousel } from '@trendyol-js/react-carousel'
import ProductCarouselCard from './ProductCarouselCard'
import ProductCarouselArrow from './ProductCarouselArrow'

const ProductCarousel: FC<IProps> = ({ alternatives, selectProduct }): JSX.Element => {
  const nbOfPage = 4

  const carouselPages = alternatives.reduce((acc: any, product, index) => {
    const page = Math.floor(index / nbOfPage)

    if (!acc[page]) acc.push([])

    acc[page].push(product)

    return acc
  }, [])

  return (
    <div className="relative">
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
        {carouselPages.map((page: IProduct[], index: number) => (
          <div key={index} className="flex flex-row flex-wrap">
            {page.map(product => (
              <ProductCarouselCard
                key={product.id}
                product={product}
                selectProduct={selectProduct}
              ></ProductCarouselCard>
            ))}
          </div>
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
