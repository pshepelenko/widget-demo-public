/* eslint-disable react/no-unused-state */
import React, { useReducer } from 'react'
import useGlobalReducer from '../reducers/useGlobalReducer'

const initialTags = ['Cheaper', 'Excellent condition', 'Exciting styles']

const SetInitialState = () : any => {
  if (localStorage.getItem('state')) {
    return JSON.parse(localStorage.getItem('state')!)
  } else   

  return  {
    products: [
      {
        brand_name: 'Ksubi',
        id: '12345',
        imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395', 'https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'],
        name: 'top',
        retailPrice: 195,
        url: 'sadas'
      },
      {
        brand_name: 'Ksubi',
        id: '12345',
        imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/DRESS_ARISE_TANK_GREY_MARLE_BLACKcopy_3ad65266-7519-490d-af81-810b2e9b0696_2000x.jpg?v=1646887091', 'https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'],
        name: 'top',
        retailPrice: 200,
        url: 'sadas'
      },
      {
        brand_name: 'Ksubi',
        id: '12345',
        imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/TOP_ARISE_SS_TEE_CHOCOLATE_2692_dbb43b6a-1083-4175-a192-dd22c90e8267_2000x.jpg?v=1646927142', 'https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'],
        name: 'top',
        retailPrice: 205,
        url: 'sadas'
      },
      {
        brand_name: 'Ksubi',
        id: '12345',
        imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/DRESS_ARISE_TANK_CHOCOLATE_2354_fe43a8d4-4e69-4214-8fcf-6addb9ee21b2.jpg?v=1646887058', 'https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'],
        name: 'top',
        retailPrice: 210,
        url: 'sadas'
      }
    ],
    productSelected: null,
    history: [],
    error: null,
    isLoading: false,
    search: '',
    searchFieldError: null,
    tabSelected: 1,
    tags: initialTags,
    tagsSelected: [],
    scenario: {
      swimmerType: {
        question: 'WHAT TYPE OF SWIMMER ARE YOU?',
        options: {
          casual: {
            label: 'CASUAL',
            children: ['budgetZone']
          },
          competitive: {
            label: 'COMPETITIVE',
            children: ['budgetZone']
          }
        }
      },
      budgetZone: {
        question: 'BUDGET COMFORT ZONE',
        options: {
          range1: {
            label: 'RANGE1',
            children: []
          },
          range2: {
            label: 'RANGE2',
            children: []
          },
          range3: {
            label: 'RANGE3',
            children: []
          },
        }
      }
    },
    activeFilters: {
      swimmerType: {
        activeOptions: ['casual'],
        parentsCount: 1
      },
      budgetZone: {
        activeOptions: [],
        parentsCount: 1
      },
    },
    executionFlag: 0
  }
  

}


export const GlobalProviderState = React.createContext<IGlobalProvider>(SetInitialState())
export const GlobalProviderDispatch = React.createContext<any>(null)

export const GlobalProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const newInitialState = SetInitialState();
  const [state, dispatch] = useReducer(useGlobalReducer, SetInitialState())
  localStorage.setItem('state', JSON.stringify(newInitialState)); 
  return (
    <GlobalProviderState.Provider value={{ ...state }}>
      <GlobalProviderDispatch.Provider value={dispatch}>{children}</GlobalProviderDispatch.Provider>
    </GlobalProviderState.Provider>
  )
}

export interface IProduct {
  brand_name: string
  id: string
  imageUrls: Array <string>
  name: string
  //offer_price: number
  retailPrice: number
  url: string
}

export interface IGlobalProvider {
  products: IProduct[] | null
  productSelected: IProduct | null
  history: IProduct[]
  error: string | null
  isLoading: boolean
  search: string
  searchFieldError: string | null
  tabSelected: number
  tags: string[]
  tagsSelected: string[],
  scenario: any,
  activeFilters: any,
  executionFlag: number
}
