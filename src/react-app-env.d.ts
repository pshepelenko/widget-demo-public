// Necessary to be able to import images as a module
declare module '*.jpg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg'

// Tell typescript to add gaCustomer instance to the global window object
// TODO: get the type library for the gaCustomer instance (instead of using "any")
type gaCustomerType = any

interface Window {
  gaCustomer: gaCustomerType
}
