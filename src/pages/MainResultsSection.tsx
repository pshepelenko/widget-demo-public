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
  const { changeTab, selectProduct } = props

  const getAlternativeResult = (error: string | null, isLoading: boolean, products: IProduct[] | null) => {
    if (error) return <p>{error}</p>

    if (isLoading) return <LoadingWheel />

    if (!products) return <p>Oops something went wrong</p>

    if (products.length === 0)
      return <p>We haven&apos;t found an alternative that could match your criteria, try another search?</p>

    if (products.length > 0) return <ProductCarousel alternatives={products} selectProduct={selectProduct} />
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
            <ProductCarousel alternatives={history} selectProduct={selectProduct} />
          </div>
        )}
        <div className="px-2 ">
          {productSelected && <ProductDescription product={productSelected}></ProductDescription>}
        </div>
        <Footer />
      </div>
    </div>
  )
}

interface IProps {
  selectProduct: (arg: string) => void
  changeTab: (arg: number) => void
}

export default MainResultsSection
