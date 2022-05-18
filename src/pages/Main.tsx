import React, { FC, useContext, useState, useEffect } from 'react'

// Components
import MainHeader from './MainHeader'

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
import Button from '../components/Button'
import EmailCollection from '../components/EmailCollection'
import ReminderSettings from '../components/ReminderSettings'
import ExportSuccess from '../components/ExportSuccess'

//const splashupEndPointUrl = 'https://api.splashup.co/discover/v3/alternatives'
//Sconst apiKey = '31805389-c240-4d42-8ff9-2cc30f753212'

const AlternativeDiscovery: FC<IProps> = props => {
  // Context
  const { productSelected, products, userEmail, notifications, sizeSelected} = useContext(GlobalProviderState)
  const dispatch = useContext(GlobalProviderDispatch)
  const state = useContext(GlobalProviderState)
  localStorage.setItem('state', JSON.stringify(state))
  // Props
  const {shortlisteditems, userId, closeModule } = props
  const [popUpClosed, setPopUpClosed] = useState(true)
  const [popUpType, setPopUpType] = useState('e-mail')
  const [SizeWarning, showSizeWarning] = useState(false)
  
  
  // Fetch
  /*useApi(
    `${splashupEndPointUrl}?apiKey=${apiKey}&userid=&${userId}${
      shortlisteditems.length > 0 ? `&items=${shortlisteditems.join(',')}` : ''
    }`
  )*/


  const handleProductClick = async (product: IProduct) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: product.id })
    event('click_view_product', product.id.toString())
    // Here we wait till we log the event because of the window.open() coming next
    await logEvent('click_view_product', { value: product.id })
    //window.open(product.url, '_self')
  }

  const saveEmail = (email: string) => {
    dispatch({ type: 'SET_USER_EMAIL', payload: email })
    console.log(email);
    setPopUpClosed(true)
    event('click_tag', email)
    logEvent('click_tag', { value: email })
    
  }

  const handleNotificationClick = (notificationType: string, productId: number) => {
    if (userEmail === '' || !userEmail)
    {
      setPopUpType('e-mail')
      setPopUpClosed(false)
      return
    } 
    
    if (notificationType === 'sizeInStock' && !sizeSelected)
    {
      showSizeWarning(true)
      return
    }
    showSizeWarning(false)
    const currentNotifications = notifications.find(item => item.productId === productSelected?.id) || {productId: productSelected?.id, active: []}
    let newNotifications = notifications
    if (currentNotifications.active.includes(notificationType)){
      newNotifications = newNotifications.filter(item => item.productId !== productSelected?.id)
      currentNotifications.active = currentNotifications.active.filter((option: string) => option !== notificationType) 
      newNotifications = [...newNotifications, currentNotifications]   
      dispatch({ type: 'NOTIFICATION_IS_SET', payload: newNotifications })
    }
    else{
      newNotifications = newNotifications.filter(item => item.productId !== productSelected?.id)
      currentNotifications.active.push(notificationType) 
      newNotifications = [...newNotifications, currentNotifications]   
      dispatch({ type: 'NOTIFICATION_IS_SET', payload: newNotifications })
    }
      
    let optionClicked = {type: notificationType, productId: productId}
    event('click_tag', productId.toString())
    logEvent('click_tag', { value: optionClicked })
    
  }

  const handleRemiderClick = () => {
    if (userEmail === '' || !userEmail)
    {
      setPopUpType('e-mail')
      setPopUpClosed(false)
      return
    }
    setPopUpType('reminder')
    setPopUpClosed(false)
    event('click_tag', userEmail)
    logEvent('click_tag', { value: userEmail })
    
  }

  const handleRemiderSubmit = (quantity: number, scale: string) => {
    setPopUpClosed(true)
    event('click_tag', scale)
    logEvent('click_tag', { value: scale })
    
  }

  const handleExportClick = () => {
    console.log('export clicked')
    if (userEmail === '' || !userEmail)
    {
      setPopUpType('e-mail')
      setPopUpClosed(false)
      return
    } 
    setPopUpType('export')
    setPopUpClosed(false)
    event('click_tag', userEmail)
    logEvent('click_tag', { value: userEmail })
    
  }

  const [isMobile, setIsMobile] = useState(window.matchMedia("(min-width: 768px)").matches);
  const [seeMore, setSeeMore] = useState(false)
  const [exportPage, setExportpage] = useState(false)
  

  useEffect(() => { 
    const handler = (e: { matches: React.SetStateAction<boolean> }) => setIsMobile(e.matches);
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
    //writing state to a localstorage
    
   }, [])

  const styleMobile = {} 
  return (
    <section id="splashup-discovery-module">
      <div className='absolute left-0 top-0 h-full w-full z-[100]' onClick={()=>closeModule()} />
      <div className="fixed top-12 min-h-min md:bottom-0 left-0 z-[101] flex font-sans overflow-y-auto overscroll-contain no-scrollbar" style={{ height: isMobile ? '90%' : '90%'}}>
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
                {//Notifications popup
                  !popUpClosed &&
                  popUpType === 'e-mail' && 
                    <EmailCollection saveEmail={saveEmail} closePopup={setPopUpClosed}/>
                }
                {
                  !popUpClosed &&
                  popUpType === 'reminder' && 
                    <ReminderSettings saveSettings={handleRemiderSubmit} closePopup={setPopUpClosed}/>
                }
                {
                  !popUpClosed &&
                  popUpType === 'export' && 
                    <ExportSuccess  closePopup={setPopUpClosed}/>
                }
                
                <div className="w-full flex justify-center items-center mt-4 mb-4">
                  <button onClick={() => {handleExportClick()}} className="w-10/12 p-2 bg-secondary text-white flex justify-center items-center text-xs font-medium border rounded-full shadow-sm focus:none text-secondary border-secondary border-2 hover:border-opacity-100"> 
                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5 19C16.0523 19 16.5 19.4477 16.5 20C16.5 20.5523 16.0523 21 15.5 21H1.5C0.947715 21 0.5 20.5523 0.5 20C0.5 19.4477 0.947715 19 1.5 19H15.5ZM8.5 0L8.51935 0.000186205C8.54268 0.000634945 8.566 0.0018949 8.58925 0.00396633L8.5 0C8.55062 0 8.60036 0.00376108 8.64896 0.0110192C8.66595 0.013628 8.68338 0.0167022 8.70073 0.0202401C8.72275 0.0246398 8.74444 0.0298337 8.76584 0.0357211C8.78146 0.0400978 8.79685 0.0447288 8.81214 0.0497382C8.8318 0.0561226 8.85158 0.0633158 8.87106 0.071104C8.8888 0.0781965 8.9061 0.0856792 8.92322 0.0936735C8.94389 0.103377 8.96429 0.113794 8.98428 0.124876C8.99639 0.131499 9.00861 0.138607 9.02071 0.145995C9.04628 0.161719 9.07113 0.17849 9.09516 0.196314C9.13433 0.225313 9.17171 0.257499 9.20711 0.292893L9.11675 0.212786C9.11966 0.215071 9.12256 0.217372 9.12545 0.219689L9.20711 0.292893L16.2071 7.29289C16.5976 7.68342 16.5976 8.31658 16.2071 8.70711C15.8166 9.09763 15.1834 9.09763 14.7929 8.70711L9.5 3.414V16C9.5 16.5523 9.05228 17 8.5 17C7.94772 17 7.5 16.5523 7.5 16V3.414L2.20711 8.70711C1.84662 9.06759 1.27939 9.09532 0.887101 8.7903L0.792893 8.70711C0.402369 8.31658 0.402369 7.68342 0.792893 7.29289L7.79289 0.292893L7.87455 0.219689C7.87744 0.217372 7.88034 0.215071 7.88325 0.212786C7.89016 0.207284 7.8974 0.201753 7.90469 0.196335C7.92887 0.17849 7.95372 0.161719 7.97934 0.146067C7.99139 0.138607 8.00361 0.131499 8.01594 0.124671C8.03571 0.113794 8.05611 0.103377 8.0769 0.0936537C8.0939 0.0856789 8.1112 0.0781963 8.12866 0.0712254C8.14842 0.0633157 8.1682 0.0561225 8.18826 0.0495467C8.20315 0.0447288 8.21854 0.0400976 8.23401 0.035845C8.25556 0.0298335 8.27725 0.0246399 8.29921 0.0201652C8.31662 0.0167022 8.33405 0.0136281 8.35153 0.0110178C8.3705 0.00811223 8.39015 0.00576618 8.40997 0.00399804C8.43434 0.00186566 8.45798 0.000599378 8.48164 0.000167608C8.4872 6.02983e-05 8.49359 0 8.5 0Z" fill="white"/>
                    </svg>
                    <div 
                      className="ml-2 font-bold"
                      
                    > 
                      EXPORT SESSION SHORTLIST 
                    </div>
                  </button>
                </div>
                
                <div className="w-full flex justify-center items-center mt-4 mb-4">
                  <button 
                    className="w-10/12 p-2  flex justify-center items-center text-xs font-medium border rounded-full shadow-sm focus:none text-secondary border-secondary border-2 hover:border-opacity-100"
                    onClick={() => {handleRemiderClick()}}
                  > 
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.99895 0.5C8.00208 0.5 7.18065 1.32143 7.18065 2.31829V3.16105C4.04277 3.96787 1.72609 6.80624 1.72609 10.1968V15.6513H0.210938V16.8634H17.7867V15.6513H16.2716V10.1968C16.2716 6.80608 13.9549 3.96732 10.817 3.16105V2.31829C10.817 1.32143 9.9956 0.5 8.99873 0.5H8.99895ZM8.99895 1.71202C9.34518 1.71202 9.60496 1.9718 9.60496 2.31802V2.9526C9.40626 2.93633 9.20186 2.92428 8.99895 2.92428C8.79604 2.92428 8.59162 2.93633 8.39294 2.9526V2.31802C8.39294 1.97179 8.65272 1.71202 8.99895 1.71202V1.71202ZM8.99895 4.13632C12.367 4.13632 15.0596 6.82886 15.0596 10.1969V15.6515H2.93833V10.1969C2.93833 6.82886 5.63086 4.13632 8.99895 4.13632ZM6.87778 17.4697V18.3788C6.87778 19.5435 7.83428 20.5 8.99895 20.5C10.1636 20.5 11.1201 19.5435 11.1201 18.3788V17.4697H9.90809V18.3788C9.90809 18.8929 9.51303 19.288 8.99895 19.288C8.48487 19.288 8.0898 18.8929 8.0898 18.3788V17.4697H6.87778Z" fill="black"/>
                    </svg>
                    Remind me later
                  </button>
                  
                </div>

                <MainContent SizeWarningFlag={SizeWarning} handleNotificationClick={handleNotificationClick} products={products!}/>

                <div className="w-full flex justify-center items-center mt-4 mb-4">
                  <button className="p-2 w-40 flex justify-center items-center text-xs font-medium border rounded-full shadow-sm focus:none text-white bg-secondary border-secondary  hover:border-opacity-100"> 
                    ADD TO CART
                  </button>
                </div>

                <MainBottom />

             
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
