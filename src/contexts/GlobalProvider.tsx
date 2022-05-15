/* eslint-disable react/no-unused-state */
import React, { useReducer } from 'react'
import useGlobalReducer from '../reducers/useGlobalReducer'

const initialTags = ['Cheaper', 'Excellent condition', 'Exciting styles']

const SetInitialState = () : any => {
  if (localStorage.getItem('state')) {
    let state = JSON.parse(localStorage.getItem('state')!);
    let notifications = state.notifications || []
    state = {
      ...state, 
      error: null,
      isLoading: false,
      activeFilters: {},
      executionFlag: 0,
      activeSlide: 0,
      notifications: notifications      
    }
    
    return state
  } else   

  return  {
    products: [],
    productSelected: null,
    notifications: [],
    email: '',
    error: null,
    isLoading: false,
    activeFilters: {},
    executionFlag: 0,
    activeSlide: 0,
    sizeSelected: '',
    userEmail: ''
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
  id: number,
  title: string,
  handle: string,
  description: string,
  published_at: string,
  created_at: string,
  vendor: string,
  type: string,
  tags: string[],
  price: number,
  price_min: number,
  price_max: number,
  available: boolean,
  price_varies: boolean,
  compare_at_price: number,
  compare_at_price_min: number,
  compare_at_price_max: number,
  compare_at_price_varies: boolean,
  variants: any [],
  images: string[],
  featured_image: string,
  options: any[],
  url: string,
  media: any[]  
}

export interface IGlobalProvider {
  products: IProduct[] | null
  productSelected: IProduct | null
  notifications: any[],
  email: string,
  error: string | null
  isLoading: boolean
  activeFilters: any,
  executionFlag: number,
  activeSlide: number,
  sizeSelected: string,
  userEmail: string
}
