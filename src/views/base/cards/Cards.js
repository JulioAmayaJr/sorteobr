import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

import ReactImg from 'src/assets/images/react.jpg'

const Cards = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Card</strong> <small>Example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Cards are built with as little markup and styles as possible but still manage to
              deliver a bunch of control and customization. Built with flexbox, they offer easy
              alignment and mix well with other CoreUI components. Cards have no top, left, and
              right margins by default, so use{' '}
              <a href="https://coreui.io/docs/utilities/spacing">spacing utilities</a> as needed.
              They have no fixed width to start, so they&#39;ll fill the full width of its parent.
            </p>
            <p className="text-body-secondary small">
              Below is an example of a basic card with mixed content and a fixed width. Cards have
              no fixed width to start, so they&#39;ll naturally fill the full width of its parent
              element.
            </p>
            <DocsExample href="components/card">
              <CCard style={{ width: '18rem' }}>
                <CCardImage orientation="top" src={ReactImg} />
                <CCardBody>
                  <CCardTitle>Card title</CCardTitle>
                  <CCardText>
                    Some quick example text to build on the card title and make up the bulk of the
                    card&#39;s content.
                  </CCardText>
                  <CButton color="primary" href="#">
                    Go somewhere
                  </CButton>
                </CCardBody>
              </CCard>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
  
      
      
    </CRow>
  )
}

export default Cards
