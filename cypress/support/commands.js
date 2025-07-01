const API_URL = Cypress.env('apiUrl')

Cypress.Commands.add('login', (
  email = Cypress.env('userEmail'),
  password = Cypress.env('userPassword')
) => {
  const setup = () => {
    cy.request('POST', `${API_URL}/login`, {
      email: email,
      password: password
    }).then(({ body, status }) => {
      expect(status).to.eq(200)
      cy.window().then((win) => {
        win.localStorage.setItem('serverest/userEmail', email)
        win.localStorage.setItem('serverest/userToken', body.authorization)
      })
    })
  }

  cy.session(email, setup)

  cy.intercept('GET', `${API_URL}/produtos`).as('getProducts')
  cy.visit('/home')
  cy.contains('button', 'Logout').should('be.visible')
  cy.wait('@getProducts').its('response.statusCode').should('be.equal', 200)
})
