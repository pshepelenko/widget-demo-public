import React, { useEffect, useState } from 'react'
import { GlobalProvider } from './contexts/GlobalProvider'
import AlternativeDiscovery from './pages/Main'

// For development only
const testProductIdSplashUp = '849791fa-f626-4ee2-9e2c-9052097847fa'
const testProductIdGoHock = '587'

const App = (): JSX.Element | null => {
  // States
  const [productId, setProductId] = useState<string | null>(null)

  const openDiscoveryModule = (e: any) => {
    console.log('Event emitted')

    const productId = e.target.getAttribute('data-product-id')

    setProductId(productId)
  }

  // Add listener
  useEffect(() => {
    console.log('App mounted, adding listener...')

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

  return (
    <GlobalProvider>
      <AlternativeDiscovery productId={productId} closeModule={closeModule}></AlternativeDiscovery>
    </GlobalProvider>
  )
}
export default App
