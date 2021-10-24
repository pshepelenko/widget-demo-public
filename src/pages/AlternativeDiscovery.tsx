import React, { useContext, useState } from 'react'

// Components
import CloseButton from '../components/CloseButton'
import Button from '../components/Button'
import ProductDescription from '../components/ProductDescription'
import SearchField from '../components/SearchField'
import FormErrorMessage from '../components/FormErrorMessage'
import Tabs from '../components/tabs'
import ProductCarousel from '../components/ProductCarousel'
import LoadingWheel from '../components/LoadingWheel'
import Footer from '../components/Footer'

// Hooks
import useApi from '../hooks/useApi'

// Images
import logo from '../_images/logo-gohock.png'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'

const alternativeEndPointUrl = 'https://api.splashup.co/discover/v3/alternatives'
const apiKey = '31805389-c240-4d42-8ff9-2cc30f753212'

const AlternativeDiscovery = (props: IProps): JSX.Element => {
  // Context
  const { products, productSelected, history, error, isLoading } = useContext(GlobalProviderState)
  const { search, searchFieldError, tags, tagsSelected } = useContext(GlobalProviderState)

  const dispatch = useContext(GlobalProviderDispatch)

  // Props
  const { productId, closeModule } = props
  const [tab, setTab] = useState<number>(1)

  // Fetch products
  useApi(
    `${alternativeEndPointUrl}?apiKey=${apiKey}&id=${productId}${
      tagsSelected.length > 0 ? `&tags=${tagsSelected.join(',')}` : ''
    }`
  )

  const toggleTag = (tagClicked: string) => {
    dispatch({ type: 'SELECT_TAG', payload: tagClicked })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value })
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!search) {
      return dispatch({ type: 'SEARCH_ERROR', payload: 'Type your search in the field above' })
    }

    if (tags.includes(search)) {
      return dispatch({ type: 'SEARCH_ERROR', payload: 'This search is already active' })
    }

    dispatch({ type: 'SUBMIT_NEW_SEARCH', payload: search })
  }

  const selectProduct = (id: string) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: id })
  }

  const getAlternativeResult = (error: string | null, isLoading: boolean, products: IProduct[] | null) => {
    if (error) return <p>{error}</p>

    if (isLoading) return <LoadingWheel />

    if (!products) return <p>Oops something went wrong</p>

    if (products.length === 0)
      return <p>We haven&apos;t found an alternative that could match your criteria, try another search?</p>

    if (products.length > 0) return <ProductCarousel alternatives={products} selectProduct={selectProduct} />
  }

  console.log('Rendering Module', productId, products)

  return (
    <section id="splashup-discovery-module">
      <div className="fixed top-0 left-0 z-10 flex w-full h-full">
        <div className="flex flex-col bg-white" style={{ width: '330px' }}>
          <div className="flex flex-col h-full">
            <div className="px-2 bg-gray-100 drop-shadow-xl">
              {/* Logo and close button */}
              <div className="flex items-center justify-between">
                <img src={logo} width="100" alt="client-logo" />
                <CloseButton onClick={closeModule}></CloseButton>
              </div>

              {/* Search field */}
              <div className="mx-4 my-4">
                {/* autoComplete="off" prevent browser to display suggestions */}
                <form className="relative" autoComplete="off" onSubmit={handleSearchSubmit}>
                  <SearchField name="search" value={search} maxLength={25} onChange={handleSearchChange}></SearchField>
                  <div className="absolute -bottom-4">
                    {searchFieldError && <FormErrorMessage message={searchFieldError} />}
                  </div>
                </form>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center my-2 ">
                {tags.map(tag => (
                  <Button
                    key={tag}
                    inverted={!tagsSelected.includes(tag)}
                    onClick={() => toggleTag(tag)}
                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
            <Tabs nbOfProduct={products?.length || 0} nbOfProductHistory={history.length} tab={tab} setTab={setTab} />
            {tab === 1 && <div className="flex-grow px-2">{getAlternativeResult(error, isLoading, products)}</div>}
            {tab === 2 && (
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
        <div className="flex-grow bg-black bg-opacity-90 " onClick={closeModule}></div>
      </div>
    </section>
  )
}

interface IProps {
  productId: string
  closeModule: () => void
}

export interface IAlternativeRes {
  userId: string
  base_product: IProduct
  alternatives: IProduct[]
}

export default AlternativeDiscovery
