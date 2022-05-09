import React, { ChangeEvent, FC, useContext, useReducer, useState } from 'react'

// Components
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import ProductCarousel3 from '../components/ProductCarousel3'
import NotificationsColumn from '../components/NotificationColumn'



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
    console.log(currentNotifications)
    console.log(notificationType)
    console.log(productSelected?.id)
    console.log(newNotifications)
    console.log(currentNotifications.active.includes(notificationType))
    if (currentNotifications.active.includes(notificationType)){
      console.log('there is a subscription')
      newNotifications = newNotifications.filter(item => item.productId !== productSelected?.id)
      console.log(newNotifications)
      currentNotifications.active = currentNotifications.active.filter((option: string) => option !== notificationType) 
      newNotifications = [...newNotifications, currentNotifications]   
      dispatch({ type: 'NOTIFICATION_IS_SET', payload: newNotifications })
    }
    else{
      console.log('there is no subscription')
      newNotifications = newNotifications.filter(item => item.productId !== productSelected?.id)
      console.log(newNotifications)
      currentNotifications.active.push(notificationType) 
      
      console.log(currentNotifications)
      newNotifications = [...newNotifications, currentNotifications]   
      dispatch({ type: 'NOTIFICATION_IS_SET', payload: newNotifications })
    }
    console.log(newNotifications)
    
    /*
    let optionClicked = {type: notificationType, productId: productId}
    dispatch({ type: 'NOTIFICATION_IS_SET', payload: optionClicked })
    event('click_tag', productId.toString())
    logEvent('click_tag', { value: optionClicked })
    
    /*switch (type) {
      case ('onSale') : {
        dispatch({ type: 'NOTIFICATION_IS_SET', payload: optionClicked })
        event('click_tag', productId.toString())
        logEvent('click_tag', { value: optionClicked })
        return 1        
      }
        
    }*/
    
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
          
          
              
          <div>
            <div className='font-bold'>$295</div>
            <div className='flex justify-start items-center'> 
            <svg className="mr-2" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.49999 0C8.62967 0 9.54545 0.935798 9.54545 2.09016C9.54545 2.80757 9.08088 3.4865 8.1818 4.18636L8.18181 4.31088L13.8536 6.88897C14.5518 7.20631 15 7.90244 15 8.66934C15 9.74942 14.1244 10.625 13.0443 10.625H1.95567C0.875582 10.625 0 9.74942 0 8.66934C0 7.90244 0.448245 7.20631 1.14641 6.88897L6.81818 4.31089V4.18634C6.81818 3.7514 7.01692 3.34141 7.3555 3.07788C7.91236 2.64441 8.18181 2.28366 8.18181 2.09016C8.18181 1.70538 7.87655 1.39344 7.49999 1.39344C7.12344 1.39344 6.81818 1.70538 6.81818 2.09016C6.81818 2.47495 6.51292 2.78689 6.13636 2.78689C5.7598 2.78689 5.45454 2.47495 5.45454 2.09016C5.45454 0.935798 6.37032 0 7.49999 0ZM1.66366 8.02693L7.5 5.37404L13.3363 8.02693C13.5883 8.14143 13.75 8.39262 13.75 8.66934C13.75 9.05907 13.4341 9.37501 13.0443 9.37501H1.95567C1.56594 9.37501 1.25 9.05907 1.25 8.66934C1.25 8.39262 1.41174 8.14143 1.66366 8.02693Z" fill="#000000"/>
            </svg>

              Sizes: M, L, XL
            </div>
            <div>Long sleeve</div>          
          </div>
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
