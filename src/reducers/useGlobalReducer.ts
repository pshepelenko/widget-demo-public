import { IGlobalProvider } from '../contexts/GlobalProvider'

const useTodoReducer = (state: IGlobalProvider, action: IAction) => {
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

    case 'SELECT_PRODUCT': {
      const productSelected = state.products!.find(product => product.id === action.payload)
      const newHistory = productSelected ? [...state.history, productSelected] : [...state.history]

      return { ...state, productSelected: productSelected, history: newHistory }
    }

    case 'UPDATE_SEARCH': {
      return { ...state, search: action.payload, searchFieldError: null }
    }

    case 'SUBMIT_NEW_SEARCH': {
      const newTags = [...state.tags, action.payload]
      const newTagsSelected = [...state.tagsSelected, action.payload]

      return { ...state, search: '', tags: newTags, tagsSelected: newTagsSelected }
    }

    case 'SEARCH_ERROR': {
      return { ...state, searchFieldError: action.payload }
    }

    case 'SELECT_TAG': {
      const currentTagsSelectedArr = state.tagsSelected
      const tagSelected = action.payload

      const newTagsSelectedArr = currentTagsSelectedArr.includes(tagSelected)
        ? currentTagsSelectedArr.filter(tag => tag !== tagSelected)
        : [...currentTagsSelectedArr, tagSelected]

      return { ...state, tagsSelected: newTagsSelectedArr }
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
    | 'UPDATE_SEARCH'
    | 'SUBMIT_NEW_SEARCH'
    | 'SEARCH_ERROR'
    | 'SELECT_TAG'
  payload?: any
}

export default useTodoReducer
