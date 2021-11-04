import React, { FC, useContext } from 'react'

// Components
import MainFilteringSection from './MainFilteringSection'
import MainResultsSection from './MainResultsSection'
import { MainOverlay } from './MainOverlay'

// Hooks
import useApi from '../hooks/useApi'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'

// Utils
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

const alternativeEndPointUrl = 'https://api.splashup.co/discover/v3/alternatives'
const apiKey = '31805389-c240-4d42-8ff9-2cc30f753212'

const AlternativeDiscovery: FC<IProps> = props => {
  // Context
  const { search, tags, tagsSelected } = useContext(GlobalProviderState)
  const dispatch = useContext(GlobalProviderDispatch)

  // Props
  const { productId, closeModule } = props

  // Fetch
  useApi(
    `${alternativeEndPointUrl}?apiKey=${apiKey}&id=${productId}${
      tagsSelected.length > 0 ? `&tags=${tagsSelected.join(',')}` : ''
    }`
  )

  const handleTagClick = (tagClicked: string) => {
    dispatch({ type: 'SELECT_TAG', payload: tagClicked })
    event('click_tag', tagClicked)
    logEvent('click_tag', { value: tagClicked })
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
    event('submit_semantic_search', search)
    logEvent('submit_semantic_search', { value: search })
  }

  const handleAlternativeClick = (id: string) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: id })
    event('click_alternative', id)
    logEvent('click_alternative', { value: id })
  }

  const handleProductClick = async (product: IProduct) => {
    event('click_view_product', product.id)
    // Here we wait till we log the event because of the window.open() coming next
    await logEvent('click_view_product', { value: product.id })
    window.open(product.url, '_self')
  }

  const changeTab = (newTab: number) => {
    dispatch({ type: 'CHANGE_TAB', payload: newTab })
  }

  return (
    <section id="splashup-discovery-module">
      <div className="fixed top-0 left-0 z-10 flex w-full h-full">
        <div className="bg-white " style={{ width: '330px' }}>
          <div className="flex flex-col h-full">
            <MainFilteringSection
              closeModule={closeModule}
              handleTagClick={handleTagClick}
              handleSearchChange={handleSearchChange}
              handleSearchSubmit={handleSearchSubmit}
            />
            <MainResultsSection
              changeTab={changeTab}
              handleAlternativeClick={handleAlternativeClick}
              handleProductClick={handleProductClick}
            />
          </div>
        </div>
        <MainOverlay closeModule={closeModule} />
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
