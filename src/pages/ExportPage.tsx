import React, { ChangeEvent, FC, useContext } from 'react'

// Components
import ProductCarousel from '../components/ProductCarousel'
//import { IProduct } from '../contexts/GlobalProvider'
import Button from '../components/Button'
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'



const ExportPage: FC<IProps> = props => {
  const dispatch = useContext(GlobalProviderDispatch)

  const handleFilterOptionClick = (optionClicked: any) => {
    dispatch({ type: 'SELECT_FILTER_OPTION', payload: optionClicked })
    console.log(optionClicked);
    event('click_tag', optionClicked)
    logEvent('click_tag', { value: optionClicked })
  }
  
  //let shortlistedItems:  IProduct[] 
  //shortlistedItems = [{ brand_name: 'Ksubi', id: 111, imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'], name: 'Polo shirt', retailPrice: 80, url: ''},{ brand_name: 'Ksubi', id: 'bbb', imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/Womens-ECOM-ContactHigh3971_a5fb9428-0886-45a4-8be9-45392bedb2de_2000x.jpg?v=1646942334'], name: 'Polo shirt', retailPrice: 80, url: ''} ]
  
  return (
    <div className="mt-24 flex px-9 flex-col items-center">
       
      <div className="flex flex-col items-center justify-center  mb-3 text-center">
        <p>This is a link to your shortlist</p>
        <p className="mt-5" >You can use it on another computer to restore these items</p>
      </div>
                
      
      <div  className="flex flex-row bg-gray items-center justify-between px-5 my-4 w-full">
        <div className="text-gray-600"> 
          http://speedo.com/?shortlistid=1..
        </div>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C18.3063 2 19.4175 2.83485 19.8293 4.00009L10.1278 4C8.34473 4 7.69816 4.18565 7.04631 4.53427C6.39446 4.88288 5.88288 5.39446 5.53427 6.04631C5.18565 6.69816 5 7.34473 5 9.12777L5.00009 19.8293C3.83485 19.4175 3 18.3063 3 17V8C3 4.68629 5.68629 2 9 2H17ZM21 6C22.6569 6 24 7.34315 24 9V22C24 23.6569 22.6569 25 21 25H10C8.34315 25 7 23.6569 7 22V9C7 7.34315 8.34315 6 10 6H21ZM21 8H10C9.44772 8 9 8.44772 9 9V22C9 22.5523 9.44772 23 10 23H21C21.5523 23 22 22.5523 22 22V9C22 8.44772 21.5523 8 21 8Z" fill="black"/>
        </svg>

      </div>
      <div>
          We can also send this shortlist to your e-mail
      </div>  
      <div className="flex flex-row bg-gray items-center justify-start px-5 mt-4 text-gray-600 w-full h-7">
        your@email.com
      </div> 
      <button className="p-2 w-40 mt-9 flex justify-center items-center text-xs font-medium border rounded-full shadow-sm focus:none text-white bg-secondary border-secondary  hover:border-opacity-100"> 
        SEND SHORTLIST
      </button>

     
    </div>
  )
}

interface IProps {
  
}

export default ExportPage
