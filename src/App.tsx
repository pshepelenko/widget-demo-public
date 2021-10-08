import React, { useEffect, useState } from 'react'
import AlternativeDiscovery from './pages/AlternativeDiscovery'

const testProductIdSplashUp = '849791fa-f626-4ee2-9e2c-9052097847fa' // For development only
const testProductIdGoHock = '1035' // For development only

const App = (): JSX.Element | null => {
  // States
  const [productId, setProductId] = useState<string | null>(null)

  function openDiscoveryModule(this: HTMLElement, e: any) {
    console.log('Event emitted')

    const productId = e.target.getAttribute('data-product-id')

    setProductId(productId)
  }

  // Add listener
  useEffect(() => {
    console.log('App mounted')

    console.log('Adding listener...')

    document.documentElement.addEventListener('su-open-discovery-module', openDiscoveryModule, true)

    return () => {
      console.log('Removing listener...')

      document.documentElement.removeEventListener('su-open-discovery-module', openDiscoveryModule)
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
