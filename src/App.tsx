import React, { useEffect, useState } from 'react'
import AlternativeDiscovery from './pages/AlternativeDiscovery'

const App = (): JSX.Element | null => {
  // States
  const [productId, setProductId] = useState<string | null>(null)

  // Add listener
  useEffect(() => {
    console.log('App mounted')

    function checkClickEvent(this: HTMLElement, e: any) {
      // this function will be always called if a click happens,
      // even if stopImmediatePropagation is used on the event target
      console.log('Event emitted')

      if (e.target?.className === 'splashup-alternatives') {
        const productId = e.target.getAttribute('data-product-id')

        setProductId(productId)
      }
    }

    console.log('Adding listener')

    document.documentElement.addEventListener('click', checkClickEvent, true)

    return function cleanUpListener() {
      console.log('Removing listener')

      document.documentElement.removeEventListener('click', checkClickEvent)
    }
  }, [window.location])

  const closeModule = () => {
    setProductId(null)
  }

  if (!productId) return null

  console.log('Rendering App', productId)

  return <AlternativeDiscovery productId={productId} closeModule={closeModule}></AlternativeDiscovery>
}
export default App
