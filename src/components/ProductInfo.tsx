import React, { ChangeEvent, FC, useContext } from 'react'

// Components
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import Button from './Button'
import SizeButton from './SizeButton'



const ProductInfo: FC<IProps> = props => {
  const {productSelected, sizeSelected} = useContext(GlobalProviderState)  
  const sizeOptions = productSelected?.options.find(option => option.name === 'Size')
  const dispatch = useContext(GlobalProviderDispatch)
  
  const handleSizeClick = (sizeClicked: string) => {
    dispatch({ type: 'SIZE_SELECTED', payload: sizeClicked })
  }


  return (
    <div>
      <div className='font-bold'>{productSelected!.title}</div>
      <div className='font-semibold'>${productSelected!.price/100}</div>
      <div className='flex justify-between items-center'> 
        { 
          productSelected?.variants.map( (variant) => (
            <SizeButton 
              inStock={variant.available} 
              selected = {(variant.public_title == sizeSelected)? true : false}
              onClick = {() => handleSizeClick(variant.public_title)}
            >{variant.public_title}
              
            </SizeButton>
          ))
        }  
      </div>
                     
    </div>
  )
}

interface IProps {
  
}

export default ProductInfo
