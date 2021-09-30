import React, { useEffect, useState } from 'react'

const useApi = (url: string): IState => {
  const [state, setState] = useState<IState>({ data: null, error: null, isLoading: false })

  useEffect(() => {
    const fetchData = async (url: string) => {
      setState({ data: null, error: null, isLoading: true })

      // This timeout is just to not return the data too fast and showing the actual loading wheel. Could be removed once in production.
      setTimeout(async () => {
        try {
          const response = await fetch(url, { method: 'GET' })

          const responseData = await response.json()

          setState({ data: responseData, error: null, isLoading: false })
        } catch (err) {
          const errorMessage: string = err.message
          console.error(errorMessage)
          setState({
            data: null,
            error: 'Oops something went wrong, do you want to try another search?',
            isLoading: false
          })
        }
      }, 1000)
    }

    if (url) fetchData(url)
  }, [url])

  console.log('Rendering useApi', url)

  return state
}

interface IState {
  data: any | null
  error: string | null
  isLoading: boolean
}

export default useApi
