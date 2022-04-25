import React, { FC, useContext, useState, useEffect } from 'react'

// Components
import Quiz from './Quiz'
import MainResultsList from './MainResultsList'
import { MainOverlay } from './MainOverlay'
import MainHeader from './MainHeader'
import Footer from '../components/Footer'
import FacebookLoginButton from '../components/FacebookLogin'
import Button from '../components/Button'

// Hooks
import useApi from '../hooks/useApi'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'

// Utils
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'
import MainContent from './MainContent'
import MainBottom from './MainBottom'
import ExportPage from './ExportPage'
import EmptyWidget from './EmptyWidget'

//const splashupEndPointUrl = 'https://api.splashup.co/discover/v3/alternatives'
//Sconst apiKey = '31805389-c240-4d42-8ff9-2cc30f753212'

const AlternativeDiscovery: FC<IProps> = props => {
  // Context
  const { products } = useContext(GlobalProviderState)
  const dispatch = useContext(GlobalProviderDispatch)
  console.log('products')
  console.log(products)

  // Props
  const {shortlisteditems, userId, closeModule } = props

 
  
  // Fetch
  /*useApi(
    `${splashupEndPointUrl}?apiKey=${apiKey}&userid=&${userId}${
      shortlisteditems.length > 0 ? `&items=${shortlisteditems.join(',')}` : ''
    }`
  )*/

  


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
  const [seeMore, setSeeMore] = useState(false)
  const [exportPage, setExportpage] = useState(false)

  useEffect(() => { 
    const handler = (e: { matches: React.SetStateAction<boolean> }) => setIsMobile(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
   }, [])

  return (
    <section id="splashup-discovery-module">
      <div className="fixed top-12 md:top-10 left-0 md:left-20 z-10 flex w-full font-sans overflow-y-auto overscroll-contain" style={isMobile ? {height: '680px'} : {height: '680px'} }>
        <div className="bg-gray-100"    >
          <div className="flex flex-col bg-gray-100 " style={{width: '390px'}}>
            <MainHeader
              closeModule={closeModule}              
            />
            {
              (products ==undefined || products?.length == 0)? 
              <EmptyWidget />       
              : !exportPage && 
              <div className=""  >
                <div className="w-full flex justify-center items-center mt-5 mb-5">
                  <button className="w-10/12 p-2  flex justify-center items-center text-xs font-medium border rounded-full shadow-sm focus:none text-secondary border-secondary border-2 hover:border-opacity-100"> 
                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5 19C16.0523 19 16.5 19.4477 16.5 20C16.5 20.5523 16.0523 21 15.5 21H1.5C0.947715 21 0.5 20.5523 0.5 20C0.5 19.4477 0.947715 19 1.5 19H15.5ZM8.5 0L8.51935 0.000186205C8.54268 0.000634945 8.566 0.0018949 8.58925 0.00396633L8.5 0C8.55062 0 8.60036 0.00376108 8.64896 0.0110192C8.66595 0.013628 8.68338 0.0167022 8.70073 0.0202401C8.72275 0.0246398 8.74444 0.0298337 8.76584 0.0357211C8.78146 0.0400978 8.79685 0.0447288 8.81214 0.0497382C8.8318 0.0561226 8.85158 0.0633158 8.87106 0.071104C8.8888 0.0781965 8.9061 0.0856792 8.92322 0.0936735C8.94389 0.103377 8.96429 0.113794 8.98428 0.124876C8.99639 0.131499 9.00861 0.138607 9.02071 0.145995C9.04628 0.161719 9.07113 0.17849 9.09516 0.196314C9.13433 0.225313 9.17171 0.257499 9.20711 0.292893L9.11675 0.212786C9.11966 0.215071 9.12256 0.217372 9.12545 0.219689L9.20711 0.292893L16.2071 7.29289C16.5976 7.68342 16.5976 8.31658 16.2071 8.70711C15.8166 9.09763 15.1834 9.09763 14.7929 8.70711L9.5 3.414V16C9.5 16.5523 9.05228 17 8.5 17C7.94772 17 7.5 16.5523 7.5 16V3.414L2.20711 8.70711C1.84662 9.06759 1.27939 9.09532 0.887101 8.7903L0.792893 8.70711C0.402369 8.31658 0.402369 7.68342 0.792893 7.29289L7.79289 0.292893L7.87455 0.219689C7.87744 0.217372 7.88034 0.215071 7.88325 0.212786C7.89016 0.207284 7.8974 0.201753 7.90469 0.196335C7.92887 0.17849 7.95372 0.161719 7.97934 0.146067C7.99139 0.138607 8.00361 0.131499 8.01594 0.124671C8.03571 0.113794 8.05611 0.103377 8.0769 0.0936537C8.0939 0.0856789 8.1112 0.0781963 8.12866 0.0712254C8.14842 0.0633157 8.1682 0.0561225 8.18826 0.0495467C8.20315 0.0447288 8.21854 0.0400976 8.23401 0.035845C8.25556 0.0298335 8.27725 0.0246399 8.29921 0.0201652C8.31662 0.0167022 8.33405 0.0136281 8.35153 0.0110178C8.3705 0.00811223 8.39015 0.00576618 8.40997 0.00399804C8.43434 0.00186566 8.45798 0.000599378 8.48164 0.000167608C8.4872 6.02983e-05 8.49359 0 8.5 0Z" fill="black"/>
                    </svg>
                    <div 
                      className="ml-2 font-bold"
                      onClick={() => {setExportpage(true)}}
                    > 
                      EXPORT SESSION SHORTLIST 
                    </div>
                  </button>
                </div>
                
                <MainContent products={products!}/>

                <div className="w-full flex justify-center items-center mt-5 mb-5">
                  <button className="p-2 w-40 flex justify-center items-center text-xs font-medium border rounded-full shadow-sm focus:none text-white bg-secondary border-secondary  hover:border-opacity-100"> 
                    ADD TO CART
                  </button>
                </div>

                <button 
                  className="w-full flex flex-col grid place-items-center mt-5 mb-5"
                  onClick={() => setSeeMore(!seeMore)}
                >
                  {
                    !seeMore && 
                    <div className='flex flex-col justify-center items-center'> 
                      More description
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.39363 11.964L13.8952 4.92031C13.9097 4.90191 13.9187 4.87979 13.9212 4.8565C13.9237 4.8332 13.9195 4.80968 13.9092 4.78863C13.899 4.76758 13.883 4.74986 13.8631 4.7375C13.8432 4.72514 13.8202 4.71864 13.7968 4.71875L12.5889 4.71875C12.5124 4.71875 12.4389 4.75469 12.3921 4.81406L7.99988 10.439L3.60769 4.81406C3.56082 4.75313 3.48738 4.71875 3.41082 4.71875L2.203 4.71875C2.09832 4.71875 2.0405 4.83906 2.10457 4.92031L7.60613 11.964C7.65283 12.0239 7.71256 12.0723 7.78079 12.1057C7.84902 12.139 7.92395 12.1563 7.99988 12.1563C8.0758 12.1563 8.15073 12.139 8.21896 12.1057C8.28719 12.0723 8.34693 12.0239 8.39363 11.964Z" fill="#262626"/>
                      </svg> 
                    </div>  
                  }
                  {
                    seeMore && 
                    <div className='flex flex-col justify-center items-center'> 
                      See less
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.60637 4.03595L2.10481 11.0797C2.09032 11.0981 2.08131 11.1202 2.07883 11.1435C2.07634 11.1668 2.08048 11.1903 2.09076 11.2114C2.10104 11.2324 2.11704 11.2501 2.13694 11.2625C2.15684 11.2749 2.17982 11.2814 2.20325 11.2812L3.41106 11.2812C3.48762 11.2812 3.56106 11.2453 3.60793 11.1859L8.00012 5.56095L12.3923 11.1859C12.4392 11.2469 12.5126 11.2812 12.5892 11.2812L13.797 11.2812C13.9017 11.2812 13.9595 11.1609 13.8954 11.0797L8.39387 4.03595C8.34717 3.97609 8.28744 3.92766 8.21921 3.89435C8.15098 3.86104 8.07605 3.84372 8.00012 3.84372C7.92419 3.84372 7.84927 3.86104 7.78104 3.89435C7.71281 3.92766 7.65307 3.97609 7.60637 4.03595Z" fill="#262626"/>
                      </svg>
                    </div>  
                  }
                  

                </button>
                {
                  seeMore && <MainBottom />
                  
                }
              </div>
            }
            {
              exportPage &&
              <div className='flex flex-col items-center'> 
                <ExportPage /> 
                <button 
                  className="p-2 mt-40 w-40 flex justify-center items-center text-xs font-medium border rounded-full shadow-sm focus:none border-secondary  hover:border-opacity-100"
                  onClick={() => {setExportpage(false)}}
                > 
                  EDIT SHORTLIST
                </button>
              </div>  
            }
            
          </div>
          
        </div>
        
      </div>
    </section>
  )
}

interface IProps {
  shortlisteditems: Array <string>
  userId: string
  closeModule: () => void
}

export interface IAlternativeRes {
  userId: string
  base_product: IProduct
  alternatives: IProduct[]
}

export default AlternativeDiscovery
