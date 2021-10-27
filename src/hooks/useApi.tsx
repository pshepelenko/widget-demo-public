import React, { useContext, useEffect, useState } from 'react'
import { GlobalProviderDispatch } from '../contexts/GlobalProvider'

const stub = {
  user_id: '1f677374-6561-4897-9ca9-2ae8492832f8',
  base_product: {
    id: '587',
    brand_name: 'Anekka Scarth',
    url: 'https://gohock.com.au/en/listings/587',
    image_url:
      'https://hookitup.s3-ap-southeast-2.amazonaws.com/images/listing_images/images/2669/medium/d52e7c39-4206-4f34-9124-95a423e474b7.jpeg',
    image_alt_text: 'd52e7c39-4206-4f34-9124-95a423e474b7.jpeg',
    name: 'Ikea Bunk Beds with Mattresses and Protectors',
    offer_price: 250,
    retail_price: 250
  },
  alternatives: [
    {
      id: '656',
      brand_name: 'Lauren Star',
      url: 'https://gohock.com.au/en/listings/656',
      image_url:
        'https://hookitup.s3-ap-southeast-2.amazonaws.com/images/listing_images/images/2881/medium/screen_shot_2021-06-06_at_4_47_06_pm.png',
      image_alt_text: 'screen_shot_2021-06-06_at_4_47_06_pm.png',
      name: 'Bedroom Set, Queen Bed, 2 Wooden Bedside Drawers ',
      offer_price: 600,
      retail_price: 600
    },
    {
      id: '579',
      brand_name: 'Valentina  Garcia ',
      url: 'https://gohock.com.au/en/listings/579',
      image_url:
        'https://hookitup.s3-ap-southeast-2.amazonaws.com/images/listing_images/images/2639/medium/whatsapp_image_2021-05-09_at_13_26_05.jpeg',
      image_alt_text: 'whatsapp_image_2021-05-09_at_13_26_05.jpeg',
      name: 'Single bed with Mattress ',
      offer_price: 60,
      retail_price: 60
    },
    {
      id: '578',
      brand_name: 'RuiRui Liao',
      url: 'https://gohock.com.au/en/listings/578',
      image_url:
        'https://hookitup.s3-ap-southeast-2.amazonaws.com/images/listing_images/images/2633/medium/7a64acb3-c555-4914-92a0-9deaaeaf4000.jpeg',
      image_alt_text: '7a64acb3-c555-4914-92a0-9deaaeaf4000.jpeg',
      name: 'Almost new queen size bed ➕ mattress',
      offer_price: 260,
      retail_price: 260
    },
    {
      id: '590',
      brand_name: 'Adam L',
      url: 'https://gohock.com.au/en/listings/590',
      image_url:
        'https://hookitup.s3-ap-southeast-2.amazonaws.com/images/listing_images/images/2678/medium/screen_shot_2021-05-17_at_4_17_09_pm.png',
      image_alt_text: 'screen_shot_2021-05-17_at_4_17_09_pm.png',
      name: 'Eccosa King size mattress and timber bed frame',
      offer_price: 500,
      retail_price: 500
    },
    {
      id: '635',
      brand_name: 'Tim Nicholas',
      url: 'https://gohock.com.au/en/listings/635',
      image_url: 'https://hookitup.s3-ap-southeast-2.amazonaws.com/images/listing_images/images/2810/medium/1a.jpg',
      image_alt_text: '1a.jpg',
      name: 'test',
      offer_price: 1,
      retail_price: 1
    }
  ]
}

const useApi = (url: string) => {
  const dispatch = useContext(GlobalProviderDispatch)

  useEffect(() => {
    const fetchData = async (url: string) => {
      dispatch({ type: 'START_FETCHING_PRODUCTS' })

      // This timeout is just to not return the data too fast and showing the actual loading wheel. Could be removed once in production.
      setTimeout(async () => {
        try {
          const response = await fetch(url, { method: 'GET' })

          const responseData = await response.json()

          dispatch({ type: 'PRODUCTS_FETCH_SUCCESS', payload: responseData.alternatives })
        } catch (err) {
          const errorMessage: string = err.message
          console.error(errorMessage)
          dispatch({
            type: 'PRODUCTS_FETCH_ERROR',
            payload: 'Oops something went wrong, do you want to try another search?'
          })
        }
      }, 1000)
    }

    if (url) fetchData(url)
  }, [url])

  console.log('Rendering useApi', url)
}

export default useApi
