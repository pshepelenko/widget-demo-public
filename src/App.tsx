import React, { useEffect, useState } from 'react'
import { GlobalProvider } from './contexts/GlobalProvider'
import AlternativeDiscovery from './pages/Main'
import { v4 as uuidv4 } from 'uuid';

// For development only
// const testProductIdSplashUp = '849791fa-f626-4ee2-9e2c-9052097847fa'
// const testProductIdGoHock = '587'

const App = (): JSX.Element | null => {
  // States
  const [productId, setProductId] = useState<string | null>(null)

  const openDiscoveryModule = (e: any) => {
    console.log('Event emitted')

    const productId = '12345'//e.target.getAttribute('data-product-id')

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
  //User identification
  let userId: string = ''
  //const products = localStorage.getItem('shortlistedItems') 
  const products = ['aaa', 'bbb']
  const splashupCookie = document.cookie?.split('; ')?.find(row => row.startsWith('splpId='))?.split('=')[1];
  if (!localStorage.getItem('splpId') && !splashupCookie) {
    console.log('New user');
    userId = uuidv4();
    localStorage.setItem('splpId', userId)
    document.cookie = "splpId=" + userId +"; max-age=315360000"
  } else {
    if (!localStorage.getItem('splpId') && splashupCookie) {
      localStorage.setItem('splpId', splashupCookie)
      userId = splashupCookie       
    } 
    if (localStorage.getItem('splpId') && !splashupCookie) {
      document.cookie = "splpId=" + localStorage.getItem('splpId')+"; max-age=315360000"
      userId = localStorage.getItem('splpId')!
    }
  }

  return (
    <GlobalProvider>
      <AlternativeDiscovery shortlisteditems={products} userId={userId} closeModule={closeModule}></AlternativeDiscovery>
    </GlobalProvider>
  )
}
export default App
