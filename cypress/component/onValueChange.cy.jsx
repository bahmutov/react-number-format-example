import { NumericFormat } from 'react-number-format'
import '../../src/App.css'

describe('onValueChange.cy.jsx', () => {
  it('playground', () => {
    cy.mount(
      <NumericFormat
        value={1234}
        prefix="$"
        allowNegative={false}
        decimalScale={2}
        inputMode="decimal"
        onValueChange={cy.stub().as('onValueChange')}
        data-cy="price"
      />,
    )
    // work with the component as if it were a web app
    cy.get('[data-cy=price]').clear()
    cy.get('@onValueChange')
      .should('have.been.calledOnceWith', {
        formattedValue: '',
        value: '',
        floatValue: undefined,
      })
      .invoke('resetHistory')
    cy.get('[data-cy=price]').type('50.99')
    // check each call
    cy.get('@onValueChange').should('have.property', 'callCount', 5)
    cy.get('@onValueChange')
      .its('firstCall.args.0')
      .should('deep.equal', { formattedValue: '$5', value: '5', floatValue: 5 })
    cy.get('@onValueChange').its('secondCall.args.0').should('deep.equal', {
      formattedValue: '$50',
      value: '50',
      floatValue: 50,
    })
    cy.get('@onValueChange').its('thirdCall.args.0').should('deep.equal', {
      formattedValue: '$50.',
      value: '50.',
      floatValue: 50,
    })
    cy.get('@onValueChange').its('thirdCall.args.0').should('deep.equal', {
      formattedValue: '$50.',
      value: '50.',
      floatValue: 50,
    })
    cy.get('@onValueChange')
      .invoke('getCall', 3)
      .its('args.0')
      .should('deep.equal', {
        formattedValue: '$50.9',
        value: '50.9',
        floatValue: 50.9,
      })
    cy.get('@onValueChange')
      .invoke('getCall', 4)
      .its('args.0')
      .should('deep.equal', {
        formattedValue: '$50.99',
        value: '50.99',
        floatValue: 50.99,
      })
  })
})
