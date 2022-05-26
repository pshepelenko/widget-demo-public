import React, { ChangeEvent, FC, useContext, useReducer, useState } from 'react'

// Components
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import ProductCarousel3 from '../components/ProductCarousel3'
import NotificationsColumn from '../components/NotificationColumn'
import ProductInfo from '../components/ProductInfo'


const MainContent: FC<IProps> = ({ SizeWarningFlag, products,  handleNotificationClick }) : JSX.Element => {
  
  const dispatch = useContext(GlobalProviderDispatch)
  const { notifications, productSelected, userEmail } = useContext(GlobalProviderState)
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
  
  
  
 
  return (
    <div className="flex px-4 flex flex-col">

      {//<NotificationsColumn />
      }
      <div>Get notified</div>
      <div className='flex flex-row'>
        <NotificationsColumn handleNotificationClick={handleNotificationClick} />
 
 
 
        <div className="w-3/5 h-full mr-2 max-w-[200px]">
          <ProductCarousel3 selectedProduct={productSelected!}  handleRemoveClick={handleRemoveItemClick} changedFocus={changedFocus} />
          
          <ProductInfo />
          {
            SizeWarningFlag &&
            <div className="text-red-400 font-semibold"> Please select the size you want </div>
          }    
         
        </div>
        {//<ProductList />
        }
        <div className="h-80 w-1/4 carousel carousel-vertical ">
          {
            products.map((product: IProduct) => (
              <button 
                key={product.id.toString()} 
                className = "carousel-item mb-2"
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
  SizeWarningFlag: boolean
    products: IProduct[]
  handleNotificationClick: (notificationType: string, productId: number) => void
}

export default MainContent
