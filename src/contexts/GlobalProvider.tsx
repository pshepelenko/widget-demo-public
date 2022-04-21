/* eslint-disable react/no-unused-state */
import React, { useReducer } from 'react'
import useGlobalReducer from '../reducers/useGlobalReducer'

const initialTags = ['Cheaper', 'Excellent condition', 'Exciting styles']

const SetInitialState = () : any => {
  if (localStorage.getItem('state')) {
    return JSON.parse(localStorage.getItem('state')!)
  } else   

  return  {
    products: null,
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
  const [state, dispatch] = useReducer(useGlobalReducer, newInitialState)
  
  return (
    <GlobalProviderState.Provider value={{ ...state }}>
      <GlobalProviderDispatch.Provider value={dispatch}>{children}</GlobalProviderDispatch.Provider>
    </GlobalProviderState.Provider>
  )
}

export interface IProduct {
  brand_name: string
  id: string
  image_urls: Array <string>
  name: string
  //offer_price: number
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
  tagsSelected: string[],
  scenario: any,
  activeFilters: any,
  executionFlag: number
}
