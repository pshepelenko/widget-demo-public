import { IGlobalProvider } from '../contexts/GlobalProvider'

const useTodoReducer = (state: IGlobalProvider, action: IAction) => {
  
  const asyncLocalStorage = {
    setItem: function (key:string, value:string) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: function (key:string ) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
};

  switch (action.type) {
    case 'START_FETCHING_PRODUCTS': {
      return { ...state, products: null, productSelected: null, error: null, isLoading: true }
    }

    case 'PRODUCTS_FETCH_SUCCESS': {
      return { ...state, products: action.payload, productSelected: action.payload[0], isLoading: false }
    }

    case 'PRODUCTS_FETCH_ERROR': {
      return { ...state, error: action.payload, isLoading: false }
    }
    
    case 'SET_SELECTED_PRODUCT': {
      //console.log('changedFocus true')
      return { ...state, productSelected: action.payload}
    }

    case 'SLIDE_CHANGED': {
      //console.log('changedFocus false')
      return { ...state, activeSlide: action.payload }
    }
    
    case 'SELECT_PRODUCT': {
      const productSelected = state.products!.find(product => product.id === action.payload)
      return { ...state, productSelected: productSelected, activeSlide: 0 }
    }

    case 'REMOVE_ITEM': {
      const newProducts=state.products!.filter((item)=>item.id !== action.payload)
      return { ...state, products: newProducts, productSelected: newProducts[0]}
    }
    case 'NOTIFICATION_IS_SET': {
      return { ...state, notifications: action.payload}
    }
    
    case 'SIZE_SELECTED': {
      return { ...state, sizeSelected: action.payload}
    }

    case 'SET_USER_EMAIL': {
      return { ...state, userEmail: action.payload}
    }

    case 'SELECT_FILTER_OPTION': {
      const currentActiveFilters = state.activeFilters
      const optionSelected = action.payload
      let flag = state.executionFlag
      flag++
      console.log(flag)
      
      let newActiveFilters = currentActiveFilters;
      if (1) {
        
        if (newActiveFilters[optionSelected.filter].activeOptions.includes(optionSelected.option))
        {
          newActiveFilters[optionSelected.filter].activeOptions = newActiveFilters[optionSelected.filter].activeOptions.filter((option : any) => option !== optionSelected.option)
          console.log('deactivate ' + optionSelected.option)
          optionSelected.children.map( (child : any) =>
            {
              newActiveFilters[child].parentsCount--
              if (newActiveFilters[child].parentsCount === 0)
              {
                delete newActiveFilters[child]
              }

            }
          )
        }
        else {
          newActiveFilters[optionSelected.filter].activeOptions = [...newActiveFilters[optionSelected.filter].activeOptions, optionSelected.option]
          console.log('activate ' + newActiveFilters[optionSelected.filter].activeOptions )
          optionSelected.children.map( (child : any) =>
            {
              if (Object.keys(newActiveFilters).includes(child))
              {
                newActiveFilters[child].parentsCount++
              }
              else {
                newActiveFilters[child] = {}
                newActiveFilters[child].activeOptions = []
                newActiveFilters[child].parentsCount = 1
              }  
              
            }
          )
        }      
        console.log(newActiveFilters)
      } 
      localStorage.setItem('state', JSON.stringify({ ...state, activeFilters: newActiveFilters, executionFlag: flag })); 
      return { ...state, activeFilters: newActiveFilters, executionFlag: flag }
    }

    

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export interface IAction {
  type:
    | 'START_FETCHING_PRODUCTS'
    | 'PRODUCTS_FETCH_SUCCESS'
    | 'PRODUCTS_FETCH_ERROR'
    | 'SELECT_PRODUCT'
    | 'SELECT_FILTER_OPTION'
    | 'REMOVE_ITEM'
    | 'SET_SELECTED_PRODUCT'
    | 'SLIDE_CHANGED'
    | 'NOTIFICATION_IS_SET'
    | 'SIZE_SELECTED'
    | 'SET_USER_EMAIL'
  payload?: any
}

export default useTodoReducer
