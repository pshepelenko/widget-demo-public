import React, { ChangeEvent, FC, useContext } from 'react'

// Components
import Button from '../components/Button'
import CloseButton from '../components/CloseButton'
import FormErrorMessage from '../components/FormErrorMessage'
import SearchField from '../components/SearchField'

// Contexts
import { GlobalProviderState } from '../contexts/GlobalProvider'

// Images
import logo from '../_images/logo-gohock.png'

const MainFilteringSection: FC<IProps> = props => {
  // Contexts
  const { search, searchFieldError, tags, tagsSelected } = useContext(GlobalProviderState)

  // Props
  const { closeModule, toggleTag, handleSearchChange, handleSearchSubmit } = props

  return (
    <div className="px-2 bg-gray-100 drop-shadow-xl">
      {/* Logo and close button */}
      <div className="flex items-center justify-between">
        <img src={logo} width="100" alt="client-logo" />
        <CloseButton onClick={closeModule}></CloseButton>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap justify-center my-2 ">
        {tags.map(tag => (
          <Button
            key={tag}
            inverted={!tagsSelected.includes(tag)}
            onClick={() => toggleTag(tag)}
            style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Search field */}
      <div className="mx-4 mt-2 mb-4">
        {/* autoComplete="off" prevents browser to display suggestions */}
        <form className="relative" autoComplete="off" onSubmit={handleSearchSubmit}>
          <p className="text-sm text-center">Or try us out, we&apos;ll do our best</p>
          <SearchField name="search" value={search} maxLength={25} onChange={handleSearchChange}></SearchField>
          <div className="absolute -bottom-4">
            {searchFieldError && <FormErrorMessage message={searchFieldError} />}
          </div>
        </form>
      </div>
    </div>
  )
}

interface IProps {
  closeModule: () => void
  toggleTag: (arg: string) => void
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default MainFilteringSection
