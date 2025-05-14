describe('template spec', () => {
  it('valid username and password', () => {
    cy.visit('https://www.saucedemo.com/')
     const users = [
      'standard_user',
      'locked_out_user',
      'problem_user',
      'performance_glitch_user'
    ];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    cy.get('[data-test="username"]').should('be.visible').type(randomUser)
    cy.get('[data-test="password"]').should('be.visible').type('secret_sauce').wait(1000)
    cy.get('[data-test="login-button"]').should('be.visible').click({ force: true })
    cy.url().then(url => {  
      if (url.includes('/inventory.html')) {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click({ force: true })
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click({ force: true })
        cy.get('[data-test="shopping-cart-link"]').should('be.visible').click()
        cy.get(':nth-child(4) > .cart_item_label > .item_pricebar').should('exist')
        cy.get('.inventory_item_price').each(($el) => {
        const price = parseFloat($el.text().replace('$', ''));
          expect(price).to.be.greaterThan(0);
        });
        cy.get('[data-test="checkout"]').should('be.visible').click({ force: true })
        cy.get('[data-test="firstName"]').should('be.visible').type('Abhisehk',{ delay: 100 })
        cy.get('[data-test="lastName"]').should('be.visible').type('Parajuli',{ delay: 100 })
        cy.get('[data-test="postalCode"]').should('be.visible').type('10111',{ delay: 100 })
        cy.get('[data-test="continue"]').should('be.visible').click({ force: true });  
        cy.get('body').then(($body) => {
          if ($body.find('[data-test="error"]').length > 0) {
          cy.get('[data-test="error"]').should('be.visible').and('not.be.empty');
          cy.log('Checkout failed due to an error.');
          } else {    
        cy.get('[data-test="finish"]').should('be.visible').click({ force: true })
        cy.get('[data-test="back-to-products"]').should('be.visible').click({ force: true })
        }
        });
        }else {
        cy.log('Check in with valid credentials')
      }
    })
  })
})
