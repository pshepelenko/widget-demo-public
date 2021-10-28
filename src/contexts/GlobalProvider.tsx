/* eslint-disable react/no-unused-state */
import React, { useReducer } from 'react'
import useGlobalReducer from '../reducers/useGlobalReducer'

const initialTags = ['Cheaper', 'Excellent condition', 'Exciting styles']

const initialState = {
  products: null,
  productSelected: null,
  history: [],
  error: null,
  isLoading: false,
  search: '',
  searchFieldError: null,
  tabSelected: 1,
  tags: initialTags,
  tagsSelected: []
}

export const GlobalProviderState = React.createContext<IGlobalProvider>(initialState)
export const GlobalProviderDispatch = React.createContext<any>(null)

export const GlobalProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, dispatch] = useReducer(useGlobalReducer, initialState)

  return (
    <GlobalProviderState.Provider value={{ ...state }}>
      <GlobalProviderDispatch.Provider value={dispatch}>{children}</GlobalProviderDispatch.Provider>
    </GlobalProviderState.Provider>
  )
}

export interface IProduct {
  brand_name: string
  gender: string
  id: string
  image_alt_text: string
  image_url: string
  name: string
  offer_price: number
  retail_price: number
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
  tagsSelected: string[]
}
