// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/dmtrKovalenko/cypress-real-events
import 'cypress-real-events'

it('enters phone number and dollar amount', () => {
  cy.visit('/')
  cy.get('[data-cy=phone]')
    .type('2345678900')
    // cy.realPress command comes from cypress-real-events
    .realPress('Tab')
  // confirm the "Tab" press moves the focus to the price input field
  cy.focused().should('have.attr', 'data-cy', 'price').clear().type('18.99')
  cy.log('**confirm formatted values**')
  cy.get('[data-cy=phone]').should('have.value', '+1 (234) 567 8900')
  cy.get('[data-cy=price]').should('have.value', '$18.99')
})

it('ignores invalid characters in price input', () => {
  cy.visit('/')
  cy.get('[data-cy=price]')
    .clear()
    .type('-012.345.678')
    .should('have.value', '$012.34')
    .blur()
    .should('have.value', '$12.34')
})

it('ignores invalid characters in phone input', () => {
  cy.visit('/')
  cy.get('[data-cy=phone]')
    .type('-phone 123/456-7890.1234')
    // all characters but 10 digit phone are removed
    .should('have.value', '+1 (123) 456 7890')
})
