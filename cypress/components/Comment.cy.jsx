import React from 'react'
import Comment from '../../src/Comments/Comment'

describe('<Comment />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Comment Id={0} PostId={0} AutorName={'sd'} TextContent={'sd'} AutorProfileImage={'sd'} Date={Date} />)
  })
})