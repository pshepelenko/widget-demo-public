import React from 'react'

import splashupIcon from '../_images/icon-splashup.png'

const Footer = (): JSX.Element => (
  <footer className="flex items-center justify-center my-4 text-center ">
    <img src={splashupIcon} className="h-4 mr-1" alt="splashup" />
    <p className="text-sm">
      powered by{' '}
      <a href="https://splashup.co" target="_blank" rel="noopener noreferrer" className="text-secondary">
        splashup.co
      </a>
    </p>
  </footer>
)

export default Footer
