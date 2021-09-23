import React, { FC, useEffect, useState } from 'react'
import { IProduct } from '../pages/AlternativeDiscovery'
import ProductCard from './ProductCard'
import ProductCarouselArrow from './ProductCarouselArrow'

const ProductCarousel: FC<IProps> = ({ alternatives, selectProduct }): JSX.Element => {
  // States
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    window.location.href = `#splashup-product-${activeIndex}`
  }, [activeIndex])

  const handlePrevProduct = () => {
    if (activeIndex === 0) return

    setActiveIndex(prevState => prevState - 1)
  }

  const handleNextProduct = () => {
    if (activeIndex === alternatives.length - 1) return

    setActiveIndex(prevState => prevState + 1)
  }
  return (
    <div className="relative h-40">
      <div className="absolute z-10 ml-4 -translate-y-1/2 top-1/2">
        <ProductCarouselArrow direction="left" handleClick={handlePrevProduct}></ProductCarouselArrow>
      </div>

      <div className="absolute right-0 z-10 mr-4 -translate-y-1/2 top-1/2">
        <ProductCarouselArrow direction="right" handleClick={handleNextProduct}></ProductCarouselArrow>
      </div>
      <div
        className="relative flex w-full h-full overflow-x-auto"
        style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {alternatives.map((alternative, index) => (
          <ProductCard
            id={index}
            key={alternative.id}
            product={alternative}
            selectProduct={selectProduct}
          ></ProductCard>
        ))}
      </div>
    </div>
  )
}

type IProps = {
  alternatives: IProduct[]
  selectProduct: (arg: string) => void
}

export default ProductCarousel
