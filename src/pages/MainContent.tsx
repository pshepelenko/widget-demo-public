import React, { ChangeEvent, FC, useContext, useReducer } from 'react'

// Components
import ProductCarousel from '../components/ProductCarousel'
//import { IProduct } from '../contexts/GlobalProvider'
import Button from '../components/Button'
import { logEvent } from '../utils/logEvent'
import { event } from '../utils/googleAnalytics'

// Contexts
import { GlobalProviderDispatch, GlobalProviderState, IProduct } from '../contexts/GlobalProvider'
import ProductCarouselCard from '../components/ProductCarouselCard'
import ProductCarousel2 from '../components/ProductCarousel2'



const MainContent: FC<IProps> = ({ products }) : JSX.Element => {
  const dispatch = useContext(GlobalProviderDispatch)
  const { productSelected } = useContext(GlobalProviderState)
  

  const handleFilterOptionClick = (optionClicked: any) => {
    dispatch({ type: 'SELECT_FILTER_OPTION', payload: optionClicked })
    console.log(optionClicked);
    event('click_tag', optionClicked)
    logEvent('click_tag', { value: optionClicked })
  }

  const handleVerticalCarouselClick = (optionClicked: any) => {
    dispatch({ type: 'SELECT_PRODUCT', payload: optionClicked })
    console.log(optionClicked);
    event('click_tag', optionClicked)
    logEvent('click_tag', { value: optionClicked })
    
  }
  
  let shortlistedItems:  IProduct[] 
  shortlistedItems = [{ brand_name: 'Ksubi', id: 'aaa', imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/BOMBER_JACKET_BLACK_BORG_5160_d1adc06d-1f0e-48c1-9c65-14866121353b_2000x.jpg?v=1646928395'], name: 'Polo shirt', retailPrice: 80, url: ''},{ brand_name: 'Ksubi', id: 'bbb', imageUrls: ['https://cdn.shopify.com/s/files/1/0518/6233/9773/products/Womens-ECOM-ContactHigh3971_a5fb9428-0886-45a4-8be9-45392bedb2de_2000x.jpg?v=1646942334'], name: 'Polo shirt', retailPrice: 80, url: ''} ]
  

  return (
    <div className="flex px-4 flex flex-col">
      {//<NotificationsColumn />
      }
      <div>Get notified</div>
      <div className='flex flex-row'>
        <div className="flex flex-col mr-2">
          <Button>
          <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9309 0.50018C16.1044 0.50018 14.616 1.95315 14.616 3.73612C14.616 4.5451 14.9266 5.32493 15.4863 5.92154C15.5518 5.99169 15.6433 6.03347 15.7405 6.03777C15.8375 6.04192 15.9324 6.00828 16.0041 5.94418C16.0758 5.88009 16.1183 5.7908 16.1223 5.69594C16.1266 5.60107 16.0918 5.5086 16.0258 5.43876C15.5895 4.97366 15.3477 4.36652 15.3477 3.73612C15.3477 2.33927 16.4998 1.21446 17.9309 1.21446C19.3618 1.21446 20.5141 2.33915 20.5141 3.73612C20.5141 4.34709 20.2867 4.93717 19.8745 5.39697C19.8095 5.46808 19.7765 5.56167 19.7825 5.65669C19.7886 5.75188 19.8333 5.84068 19.9068 5.9035C19.9803 5.96616 20.0765 5.99757 20.1739 5.99072C20.2714 5.98386 20.3618 5.93938 20.4254 5.86699C20.9541 5.27724 21.2456 4.51973 21.2456 3.73594C21.2456 1.95293 19.7572 0.5 17.9307 0.5L17.9309 0.50018ZM11.7335 2.28588C11.6365 2.28588 11.5434 2.32351 11.4748 2.39048L0.864876 12.7476C0.722125 12.8871 0.722125 13.1132 0.864876 13.2527L8.18204 20.3955C8.32495 20.5348 8.55655 20.5348 8.69946 20.3955L19.3093 10.0384C19.3779 9.97143 19.4165 9.88055 19.4165 9.78585V2.64303C19.4165 2.4458 19.2527 2.28588 19.0506 2.28588H16.8555C16.7575 2.28445 16.6629 2.32144 16.5932 2.38856C16.5234 2.45568 16.4841 2.54736 16.4841 2.64303C16.4841 2.73869 16.5234 2.83036 16.5932 2.89749C16.6629 2.96461 16.7575 3.0016 16.8555 3.00017H18.6848V9.63809L8.44075 19.638L1.64123 13.0005L11.8853 3.00058H13.563V3.00042C13.661 3.00185 13.7554 2.96486 13.8253 2.89774C13.895 2.83062 13.9344 2.73894 13.9344 2.64327C13.9344 2.54761 13.895 2.45594 13.8253 2.38881C13.7554 2.32169 13.661 2.2847 13.563 2.28613L11.7335 2.28588ZM16.4662 4.69865H16.466C16.3173 4.70646 16.1881 4.8018 16.1397 4.9394C16.0914 5.07715 16.1335 5.22974 16.246 5.32508C16.4012 5.46076 16.4897 5.654 16.4897 5.85728C16.4897 6.25603 16.1665 6.57156 15.758 6.57156C15.3495 6.57156 15.0263 6.25603 15.0263 5.85728C15.0276 5.76178 14.9897 5.66962 14.921 5.60154C14.8522 5.53346 14.7583 5.49504 14.6604 5.49504C14.5624 5.49504 14.4687 5.53346 14.3999 5.60154C14.3312 5.66962 14.2931 5.76178 14.2946 5.85728C14.2946 6.64205 14.9541 7.28584 15.758 7.28584C16.5619 7.28584 17.2214 6.64205 17.2214 5.85728C17.2214 5.45135 17.0439 5.06377 16.7341 4.79288C16.6707 4.7358 16.5887 4.70248 16.5026 4.69865C16.4904 4.69801 16.4783 4.69801 16.4661 4.69865H16.4662ZM10.6894 8.28267C10.5294 8.29112 10.3935 8.40018 10.3543 8.55196L8.74725 14.4062C8.71981 14.4984 8.73157 14.5975 8.77992 14.6811C8.82826 14.7646 8.90895 14.8259 9.00384 14.8507C9.0989 14.8754 9.20016 14.8621 9.28477 14.8131C9.36937 14.7643 9.43046 14.6843 9.45398 14.591L11.061 8.73675C11.0932 8.62578 11.0685 8.50652 10.9949 8.41644C10.9212 8.32636 10.8073 8.27645 10.6894 8.28267L10.6894 8.28267ZM12.563 9.87307C12.3518 9.85808 12.1346 9.90161 11.9392 10.0119C11.418 10.3056 11.2367 10.9667 11.5376 11.4754C11.8385 11.9842 12.5156 12.1619 13.0368 11.8681C13.558 11.5744 13.7393 10.9128 13.4384 10.404C13.2503 10.0861 12.9151 9.89807 12.5631 9.87321L12.563 9.87307ZM12.4436 10.5838C12.585 10.5657 12.7271 10.6301 12.8044 10.761C12.9076 10.9354 12.8495 11.1486 12.6708 11.2493C12.4921 11.3501 12.2745 11.2927 12.1713 11.1183C12.0681 10.9439 12.1263 10.7315 12.3049 10.6307C12.3497 10.6055 12.3964 10.5901 12.4436 10.584L12.4436 10.5838ZM7.39601 11.1357C7.18482 11.1207 6.96693 11.165 6.77141 11.2752C6.25022 11.5689 6.06892 12.2299 6.36978 12.7386C6.67065 13.2474 7.34782 13.4244 7.86897 13.1307C8.39016 12.837 8.57146 12.176 8.2706 11.6672C8.08244 11.3493 7.74811 11.1606 7.39596 11.1357L7.39601 11.1357ZM7.27661 11.8471C7.41805 11.8289 7.56015 11.8933 7.6374 12.0242C7.74063 12.1987 7.68183 12.411 7.50299 12.5118C7.32431 12.6126 7.10675 12.5558 7.00354 12.3814C6.90031 12.2069 6.95846 11.9938 7.13714 11.893C7.18189 11.868 7.22926 11.853 7.27646 11.8469L7.27661 11.8471Z" fill="black"/>
          </svg>
          Goes on sale
          </Button>  
          <Button>
          <svg width="28" height="21" viewBox="0 0 28 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.2199 6.62109C22.044 6.62183 23.7945 7.34068 25.0926 8.62188C26.3909 9.90324 27.1326 11.6441 27.1573 13.4682C27.182 15.292 26.4878 17.0525 25.2248 18.3684C23.9617 19.6844 22.2315 20.4504 20.4082 20.5005H13.3094C13.0836 20.5004 12.8736 20.3843 12.7533 20.1933C12.6328 20.0023 12.6189 19.7629 12.716 19.5591C12.8133 19.3553 13.0082 19.2155 13.2324 19.1889L13.3094 19.1843H20.2201V19.1842C22.2089 19.1835 24.0495 18.1324 25.0608 16.4202C26.0722 14.7078 26.1042 12.5885 25.1449 10.8465C24.1857 9.10438 22.3778 7.99829 20.3899 7.93743H2.29031C2.06451 7.93714 1.85457 7.82123 1.73425 7.63024C1.61379 7.43911 1.59968 7.1998 1.69694 6.99603C1.79419 6.79212 1.989 6.6524 2.21332 6.62581L2.2903 6.62111L20.2199 6.62109Z" fill="black"/>
            <path d="M7.14052 0.702294C7.2986 0.537606 7.53087 0.466648 7.75401 0.514833C7.97717 0.563018 8.15948 0.723449 8.2356 0.938692C8.31184 1.15392 8.27101 1.39324 8.12777 1.57113L8.07311 1.63298L2.42529 7.2793L8.07086 12.9249H8.071C8.18427 13.0383 8.25229 13.189 8.26243 13.349C8.27242 13.5088 8.22379 13.6671 8.12551 13.7937L8.07086 13.8555H8.071C7.95759 13.9688 7.80686 14.037 7.64688 14.047C7.4869 14.0569 7.32882 14.0083 7.20219 13.9102L7.14034 13.8555L1.02879 7.74511C0.915376 7.6317 0.847356 7.48097 0.83722 7.32099C0.82723 7.161 0.875856 7.00293 0.974141 6.8763L1.02879 6.81445L7.14052 0.702294Z" fill="black"/>
          </svg>
          Size back in stock
          </Button>
          <Button>
          <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.99895 0.5C8.00208 0.5 7.18065 1.32143 7.18065 2.31829V3.16105C4.04277 3.96787 1.72609 6.80624 1.72609 10.1968V15.6513H0.210938V16.8634H17.7867V15.6513H16.2716V10.1968C16.2716 6.80608 13.9549 3.96732 10.817 3.16105V2.31829C10.817 1.32143 9.9956 0.5 8.99873 0.5H8.99895ZM8.99895 1.71202C9.34518 1.71202 9.60496 1.9718 9.60496 2.31802V2.9526C9.40626 2.93633 9.20186 2.92428 8.99895 2.92428C8.79604 2.92428 8.59162 2.93633 8.39294 2.9526V2.31802C8.39294 1.97179 8.65272 1.71202 8.99895 1.71202V1.71202ZM8.99895 4.13632C12.367 4.13632 15.0596 6.82886 15.0596 10.1969V15.6515H2.93833V10.1969C2.93833 6.82886 5.63086 4.13632 8.99895 4.13632ZM6.87778 17.4697V18.3788C6.87778 19.5435 7.83428 20.5 8.99895 20.5C10.1636 20.5 11.1201 19.5435 11.1201 18.3788V17.4697H9.90809V18.3788C9.90809 18.8929 9.51303 19.288 8.99895 19.288C8.48487 19.288 8.0898 18.8929 8.0898 18.3788V17.4697H6.87778Z" fill="black"/>
          </svg>
          Remind in a week
          </Button>
          
        </div>
        <div className="w-3/5 h-full mr-2">
          <ProductCarousel2 selectedProduct={productSelected!}  handleAlternativeClick={handleFilterOptionClick}/>
          
          
              
          <div>
            <div className='font-bold'>$295</div>
            <div className='flex justify-start items-center'> 
            <svg className="mr-2" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.49999 0C8.62967 0 9.54545 0.935798 9.54545 2.09016C9.54545 2.80757 9.08088 3.4865 8.1818 4.18636L8.18181 4.31088L13.8536 6.88897C14.5518 7.20631 15 7.90244 15 8.66934C15 9.74942 14.1244 10.625 13.0443 10.625H1.95567C0.875582 10.625 0 9.74942 0 8.66934C0 7.90244 0.448245 7.20631 1.14641 6.88897L6.81818 4.31089V4.18634C6.81818 3.7514 7.01692 3.34141 7.3555 3.07788C7.91236 2.64441 8.18181 2.28366 8.18181 2.09016C8.18181 1.70538 7.87655 1.39344 7.49999 1.39344C7.12344 1.39344 6.81818 1.70538 6.81818 2.09016C6.81818 2.47495 6.51292 2.78689 6.13636 2.78689C5.7598 2.78689 5.45454 2.47495 5.45454 2.09016C5.45454 0.935798 6.37032 0 7.49999 0ZM1.66366 8.02693L7.5 5.37404L13.3363 8.02693C13.5883 8.14143 13.75 8.39262 13.75 8.66934C13.75 9.05907 13.4341 9.37501 13.0443 9.37501H1.95567C1.56594 9.37501 1.25 9.05907 1.25 8.66934C1.25 8.39262 1.41174 8.14143 1.66366 8.02693Z" fill="#000000"/>
            </svg>

              Sizes: M, L, XL
            </div>
            <div>Long sleeve</div>          
          </div>
        </div>
        {//<ProductList />
        }
        <div className="h-80 w-16 carousel carousel-vertical ">
          {
            products.map((product: IProduct) => (
              <button 
                key={product.id} 
                className = "carousel-item h-1/4 mb-2"
                onClick={() => {handleVerticalCarouselClick(product.id)}}
              >
                  <img className={product.id === productSelected!.id ? "border-secondary border" : "" } src={product.imageUrls[0]} />                    
              </button>
            ))
            
          }

          
          
        </div>
      </div>    
    </div>
  )
}

interface IProps {
  products: IProduct[]
}

export default MainContent
