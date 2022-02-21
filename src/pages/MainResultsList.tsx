import React, { FC, useContext } from 'react'

// Components
import Footer from '../components/Footer'
import LoadingWheel from '../components/LoadingWheel'
import ProductCarousel from '../components/ProductCarousel'
import ProductDescription from '../components/ProductDescription'
import RecommendationsList from '../components/RecommendationsList'
import Tabs from '../components/tabs'

// Contexts
import { GlobalProviderState, IProduct } from '../contexts/GlobalProvider'

const MainResultsSection: FC<IProps> = props => {
  // Contexts
  const { error, isLoading, products } = useContext(GlobalProviderState)

  // Props
  const { handleAlternativeClick, handleProductClick } = props

  const getAlternativeResult = (error: string | null, isLoading: boolean, products: IProduct[] | null) => {
    if (error) return <p>{error}</p>

    if (isLoading) return <LoadingWheel />

    if (!products) return <p>Oops something went wrong</p>

    if (products.length === 0)
      return <p>We haven&apos;t found an alternative that could match your criteria, try another search?</p>

    if (products.length > 0)
      return <RecommendationsList products={products} handleProductClick={handleProductClick} />
  }

  return (
    <div className="flex-grow">
      <div className="flex flex-col h-full">
       <div className="flex-grow px-2">{getAlternativeResult(error, isLoading, products)}</div>
            
      </div>
    </div>
  )
}

interface IProps {
  
  handleAlternativeClick: (arg: string) => void
  handleProductClick: (arg: IProduct) => void
}

export default MainResultsSection
