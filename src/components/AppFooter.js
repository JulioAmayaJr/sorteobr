import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://code-factory.pages.dev" target="_blank" rel="noopener noreferrer">
          Code-Factory
        </a>
        <span className="ms-1">&copy; 2024 SorteosBr.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://code-factory.pages.dev/" target="_blank" rel="noopener noreferrer">
          Code Factory
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
