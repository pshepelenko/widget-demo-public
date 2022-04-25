import React, { ChangeEvent, FC, useContext } from 'react'

// Components
import ProductCarousel from '../components/ProductCarousel'
//import { IProduct } from '../contexts/GlobalProvider'
import Button from '../components/Button'
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

import sampleImage from '../_images/Ksubi-empty.png'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'



const EmptyWidget: FC<IProps> = props => {
  const dispatch = useContext(GlobalProviderDispatch)

  const handleFilterOptionClick = (optionClicked: any) => {
    dispatch({ type: 'SELECT_FILTER_OPTION', payload: optionClicked })
    console.log(optionClicked);
    event('click_tag', optionClicked)
    logEvent('click_tag', { value: optionClicked })
  }
  
  let shortlistedItems:  IProduct[] 
  shortlistedItems = [{ brand_name: 'Ksubi', id: 'aaa', imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'], name: 'Polo shirt', retailPrice: 80, url: ''},{ brand_name: 'Ksubi', id: 'bbb', imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/Womens-ECOM-ContactHigh3971_a5fb9428-0886-45a4-8be9-45392bedb2de_2000x.jpg?v=1646942334'], name: 'Polo shirt', retailPrice: 80, url: ''} ]
  
  return (
    <div className="mt-24 flex px-9 flex-col items-center">
       
      <div className="flex flex-col items-center justify-center  mb-3 text-center">
        <p>Your shortlist is empty</p>
        <p className="flex mt-5" >
          <div className="mr-2">You can add items to it by clicking</div> 
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.40008 0 0 5.40008 0 12C0 18.5999 5.40008 24 12 24C18.5999 24 24 18.5999 24 12C24 5.40008 18.5999 0 12 0ZM12 21.6003C6.71975 21.6003 2.39969 17.2802 2.39969 12C2.39969 6.71975 6.71975 2.39969 12 2.39969C17.2802 2.39969 21.6003 6.71975 21.6003 12C21.6003 17.2802 17.2802 21.6003 12 21.6003Z" fill="black"/>
            <path d="M17.9984 10.8002H13.1984L13.1982 6.00004C13.1982 4.44009 10.7981 4.44009 10.7981 6.00004V10.8L5.99809 10.8002C4.43814 10.8002 4.43814 13.2003 5.99809 13.2003H10.7981V18.0003C10.7981 19.5603 13.1982 19.5603 13.1982 18.0003V13.2003H17.9982C19.5584 13.2001 19.5584 10.8002 17.9984 10.8002V10.8002Z" fill="black"/>
          </svg>
        </p>
      </div>
                
      
      <div  className="my-4 w-2/3">
        <img src={sampleImage} />
      </div>

     
    </div>
  )
}

interface IProps {
  
}

export default EmptyWidget
