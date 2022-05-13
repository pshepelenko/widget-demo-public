import React, { ChangeEvent, FC, useContext, useReducer, useState } from 'react'

// Components
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import ProductCarousel3 from '../components/ProductCarousel3'
import NotificationsColumn from '../components/NotificationColumn'
import ProductInfo from '../components/ProductInfo'



const MainContent: FC<IProps> = ({ products }) : JSX.Element => {
  
  const dispatch = useContext(GlobalProviderDispatch)
  const { notifications, productSelected } = useContext(GlobalProviderState)
  const [changedFocus, setFocus] = useState(false)


  let newProductSelected = productSelected;
  if (products!== [] && productSelected === null) {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: products![0] })
    newProductSelected = products[0]  
  }  

  const handleRemoveItemClick = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
    let icon = document.querySelector('#splasup-shortlist-remove-icon')
    icon!.dispatchEvent(new Event('shortlist-item-removed',{bubbles:false}));
    console.log(productId);
    event('click_tag', productId.toString())
    logEvent('click_tag', { value: productId })
  }

  const handleVerticalCarouselClick = (optionClicked: any) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: optionClicked })
    setFocus(true)
    console.log(optionClicked);
    event('click_tag', optionClicked)
    logEvent('click_tag', { value: optionClicked })
    
  }
  const handleNotificationClick = (notificationType: string, productId: number) => {
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
    console.log(newNotifications)
    
    let optionClicked = {type: notificationType, productId: productId}
    event('click_tag', productId.toString())
    logEvent('click_tag', { value: optionClicked })
    
  }
  
 
  return (
    <div className="flex px-4 flex flex-col">
      {//<NotificationsColumn />
      }
      <div>Get notified</div>
      <div className='flex flex-row'>
        <NotificationsColumn handleNotificationClick={handleNotificationClick} />
 
 
 
        <div className="w-3/5 h-full mr-2">
          <ProductCarousel3 selectedProduct={productSelected!}  handleRemoveClick={handleRemoveItemClick} changedFocus={changedFocus} />
          
          <ProductInfo />
              
         
        </div>
        {//<ProductList />
        }
        <div className="h-80 w-16 carousel carousel-vertical ">
          {
            products.map((product: IProduct) => (
              <button 
                key={product.id.toString()} 
                className = "carousel-item h-1/4 mb-2"
                onClick={() => {handleVerticalCarouselClick(product.id)}}
              >
                  <img id={product.id.toString()} className={product.id === newProductSelected!.id ? "border-secondary border" : "" } src={product.images[0]} />                    
              </button>
            ))
            
          }

          
          
        </div>
      </div>    
    </div>
  )
}

interface IProps {
  products: IProduct[]
}

export default MainContent
