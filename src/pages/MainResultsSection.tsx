import React, { FC, useContext } from 'react'

// Components
import Footer from '../components/Footer'
import LoadingWheel from '../components/LoadingWheel'
import ProductCarousel from '../components/ProductCarousel'
import ProductDescription from '../components/ProductDescription'
import Tabs from '../components/tabs'

// Contexts
import { GlobalProviderState, IProduct } from '../contexts/GlobalProvider'

const MainResultsSection: FC<IProps> = props => {
  // Contexts
  const { history, tabSelected, error, isLoading, products, productSelected } = useContext(GlobalProviderState)

  // Props
  const { changeTab, handleAlternativeClick, handleProductClick } = props

  const getAlternativeResult = (error: string | null, isLoading: boolean, products: IProduct[] | null) => {
    if (error) return <p>{error}</p>

    if (isLoading) return <LoadingWheel />

    if (!products) return <p>Oops something went wrong</p>

    if (products.length === 0)
      return <p>We haven&apos;t found an alternative that could match your criteria, try another search?</p>

    if (products.length > 0)
      return <ProductCarousel alternatives={products} handleAlternativeClick={handleAlternativeClick} />
  }

  return (
    <div className="flex-grow">
      <div className="flex flex-col h-full">
        <Tabs
          nbOfProduct={products?.length || 0}
          nbOfProductHistory={history.length}
          tab={tabSelected}
          setTab={changeTab}
        />
        {tabSelected === 1 && <div className="flex-grow px-2">{getAlternativeResult(error, isLoading, products)}</div>}
        {tabSelected === 2 && (
          <div className="flex-grow px-2">
            <ProductCarousel alternatives={history} handleAlternativeClick={handleAlternativeClick} />
          </div>
        )}
        <div className="px-2 ">
          {productSelected && (
            <ProductDescription product={productSelected} handleProductClick={handleProductClick}></ProductDescription>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}

interface IProps {
  changeTab: (arg: number) => void
  handleAlternativeClick: (arg: string) => void
  handleProductClick: (arg: IProduct) => void
}

export default MainResultsSection
