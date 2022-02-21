import React, { FC, useContext, useState, useEffect } from 'react'

// Components
import Quiz from './Quiz'
import MainResultsList from './MainResultsList'
import { MainOverlay } from './MainOverlay'
import MainHeader from './MainHeader'
import Footer from '../components/Footer'
import FacebookLoginButton from '../components/FacebookLogin'

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
  const { tagsSelected } = useContext(GlobalProviderState)
  const dispatch = useContext(GlobalProviderDispatch)

  // Props
  const { productId, userId, closeModule } = props

  // Fetch
  useApi(
    `${alternativeEndPointUrl}?apiKey=${apiKey}&userid=&${userId}id=${productId}${
      tagsSelected.length > 0 ? `&tags=${tagsSelected.join(',')}` : ''
    }`
  )

  


  const handleFilterOptionClick = (optionClicked: any) => {
    dispatch({ type: 'SELECT_FILTER_OPTION', payload: optionClicked })
    console.log(optionClicked);
    event('click_tag', optionClicked)
    logEvent('click_tag', { value: optionClicked })
  }

 
  const handleAlternativeClick = (id: string) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: id })
    event('click_alternative', id)
    logEvent('click_alternative', { value: id })
  }

  const handleProductClick = async (product: IProduct) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: product.id })
    event('click_view_product', product.id)
    // Here we wait till we log the event because of the window.open() coming next
    await logEvent('click_view_product', { value: product.id })
    //window.open(product.url, '_self')
  }

  const [isMobile, setIsMobile] = useState(window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => { 
    const handler = (e: { matches: React.SetStateAction<boolean> }) => setIsMobile(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
   }, [])

  return (
    <section id="splashup-discovery-module">
      <div className="fixed top-0 md:top-10  left-0 md:left-20 z-10 flex w-full" >
        <div className="bg-gray-100 w-full md:w-1/4"  >
          <div className="flex flex-col" >
            <MainHeader
              closeModule={closeModule}
              
            />
            <div className="overflow-y-auto overscroll-contain" style={isMobile ? {height: '500px'} : {height: '700px'} } >
              <Quiz
              closeModule={closeModule}
              handleFilterOptionClick={handleFilterOptionClick}
             
              />
              <FacebookLoginButton />
              <MainResultsList
              
                handleAlternativeClick={handleAlternativeClick}
                handleProductClick={handleProductClick}
              />
            </div>
            <Footer />
          </div>
          
        </div>
        
      </div>
    </section>
  )
}

interface IProps {
  productId: string
  userId: string
  closeModule: () => void
}

export interface IAlternativeRes {
  userId: string
  base_product: IProduct
  alternatives: IProduct[]
}

export default AlternativeDiscovery
