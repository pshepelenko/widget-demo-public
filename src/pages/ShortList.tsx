import React, { ChangeEvent, FC, useContext } from 'react'

// Components
import Button from '../components/Button'
import CloseButton from '../components/CloseButton'
import FormErrorMessage from '../components/FormErrorMessage'
import SearchField from '../components/SearchField'

// Contexts
import { GlobalProviderState } from '../contexts/GlobalProvider'

// Images
import logo from '../_images/speedo_logo.png'

const Quiz: FC<IProps> = props => {
  // Contexts
  const { search, searchFieldError, tags, tagsSelected, scenario, activeFilters } = useContext(GlobalProviderState)

  // Props
  const { closeModule, handleFilterOptionClick } = props

  return (
    <div className="px-2 bg-gray-100 drop-shadow-xl">
      {/* Questions */}
      <div className="flex flex-col flex-wrap justify-center">
        {
          Object.keys(activeFilters).map( (activeFilter) => (
            <div key={activeFilter}>
              <div className="mb-2 mt-4 font-semibold"> {scenario[activeFilter].question} </div>
              <div>
              { 
                Object.keys(scenario[activeFilter].options).map(option =>(
                  <Button
                    key={option}
                    inverted={!activeFilters[activeFilter].activeOptions.includes(option)}
                    onClick={() => handleFilterOptionClick({option: option, filter: activeFilter, children: scenario[activeFilter].options[option].children})}
                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                  >
                  {scenario[activeFilter].options[option].label}
                  </Button>
                ))
              } 
              </div>
            </div>            
          ))       
        }
      </div>

      
    </div>
  )
}

interface IProps {
  closeModule: () => void
  handleFilterOptionClick: (arg: any) => void
  
}

export default Quiz
