import { useContext, useEffect } from 'react'
import { GlobalProviderDispatch } from '../contexts/GlobalProvider'

// import productsStub from '../utils/productsStub.json'

const useApi = (url: string): void => {
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
}

export default useApi
