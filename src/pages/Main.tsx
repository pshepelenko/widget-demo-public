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

import EmptyWidget from './EmptyWidget'


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
      <div className="fixed bottom-0 min-h-min md:bottom-5 left-0 md:left-5 z-[101] flex font-sans overflow-y-auto overscroll-contain no-scrollbar" style={{ height: isMobile ? '95%' : '95%'}}>
        <div className="bg-gray-100"    >
          <div className="flex flex-col bg-gray-100 " style={{width: '390px'}}>
            <MainHeader
              closeModule={closeModule}              
            />
            <div className='mt-9'>
              <EmptyWidget /> 
              
            </div>
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
