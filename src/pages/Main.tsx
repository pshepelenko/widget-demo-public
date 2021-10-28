import React, { FC, useContext } from 'react'

// Components
import MainFilteringSection from './MainFilteringSection'
import MainResultsSection from './MainResultsSection'
import { MainOverlay } from './MainOverlay'

// Hooks
import useApi from '../hooks/useApi'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'

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

  const changeTab = (newTab: number) => {
    dispatch({ type: 'CHANGE_TAB', payload: newTab })
  }

  console.log('Rendering Module', productId)

  return (
    <section id="splashup-discovery-module">
      <div className="fixed top-0 left-0 z-10 flex w-full h-full">
        <div className="bg-white " style={{ width: '330px' }}>
          <div className="flex flex-col h-full">
            <MainFilteringSection
              closeModule={closeModule}
              toggleTag={toggleTag}
              handleSearchChange={handleSearchChange}
              handleSearchSubmit={handleSearchSubmit}
            />
            <MainResultsSection changeTab={changeTab} selectProduct={selectProduct} />
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
