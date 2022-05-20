import React, { ChangeEvent, FC, useContext } from 'react'

// Components
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'



const MainContent: FC<IProps> = props => {
  const dispatch = useContext(GlobalProviderDispatch)

  const handleFilterOptionClick = (optionClicked: any) => {
    dispatch({ type: 'SELECT_FILTER_OPTION', payload: optionClicked })
    console.log(optionClicked);
    event('click_tag', optionClicked)
    logEvent('click_tag', { value: optionClicked })
  }
  
  //let shortlistedItems:  IProduct[] 
  //shortlistedItems = [{ brand_name: 'Ksubi', id: 'aaa', imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'], name: 'Polo shirt', retailPrice: 80, url: ''},{ brand_name: 'Ksubi', id: 'bbb', imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/Womens-ECOM-ContactHigh3971_a5fb9428-0886-45a4-8be9-45392bedb2de_2000x.jpg?v=1646942334'], name: 'Polo shirt', retailPrice: 80, url: ''} ]
  
  return (
    <div className='px-5'>
      The K Man Cardigan Black features a branded patch, branded buttons, back 4x4 cross embroidery, signature woven sleeve tag and Ksubi t-box print. This cardigan has a relaxed fit and made from premium mohair blend yarn.
      <div> FEATURES </div>
    </div>
  )
}

interface IProps {
  
}

export default MainContent
