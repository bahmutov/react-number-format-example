import { NumericFormat } from 'react-number-format'
import '../../src/App.css'
// https://github.com/bahmutov/cypress-map
import 'cypress-map'

describe('onValueChange.cy.jsx', () => {
  it('calls onValueChange', () => {
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
      .invoke('getCalls')
      .map('args.0')
      .should('deep.equal', [
        { formattedValue: '$5', value: '5', floatValue: 5 },
        {
          formattedValue: '$50',
          value: '50',
          floatValue: 50,
        },
        {
          formattedValue: '$50.',
          value: '50.',
          floatValue: 50,
        },
        {
          formattedValue: '$50.9',
          value: '50.9',
          floatValue: 50.9,
        },
        {
          formattedValue: '$50.99',
          value: '50.99',
          floatValue: 50.99,
        },
      ])
  })
})
