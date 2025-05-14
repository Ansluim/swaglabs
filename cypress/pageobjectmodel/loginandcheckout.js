class Loginandcheckout{
    users = [
      'standard_user',
      'locked_out_user',
      'problem_user',
      'performance_glitch_user'
    ]

    visiturl(){
        cy.visit('https://www.saucedemo.com/')
        return this;
    }

    enterusernameandpassword(){
    cy.get('[data-test="username"]').should('be.visible').type('standard_user')
    .get('[data-test="password"]').should('be.visible').type('secret_sauce').wait(1000)
    .get('[data-test="login-button"]').should('be.visible').click({ force: true })
    return this;
    }
    afterlogin(){
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click({ force: true })
        .get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click({ force: true })
        .get('[data-test="shopping-cart-link"]').should('be.visible').click()
        .get(':nth-child(4) > .cart_item_label > .item_pricebar').should('exist')
        .get('.inventory_item_price').each(($el) => {
        const price = parseFloat($el.text().replace('$', ''));
          expect(price).to.be.greaterThan(0);
        });
    return this;
    }

    checkout(){
        cy.get('[data-test="checkout"]').should('be.visible').click({ force: true })
        return this;
    }

    checkoutdetails(){
        cy.get('[data-test="firstName"]').should('be.visible').type('Abhisehk')
        .get('[data-test="lastName"]').should('be.visible').type('Parajuli')
        .get('[data-test="postalCode"]').should('be.visible').type('10111')
        return  this;
    }

    continuecheckout(){
        cy.get('[data-test="continue"]').should('be.visible').click({ force: true });  
        return this;
    }

    checkoutfailed(){
        cy.get('[data-test="error"]').should('be.visible').and('not.be.empty')
        .log('Checkout failed due to an error.');
    }

    checkoutsuccess(){
        cy.get('[data-test="finish"]').should('be.visible').click({ force: true })
        .get('[data-test="back-to-products"]').should('be.visible').click({ force: true })
    }

    failedlogin(){
        cy.log('Check in with valid credentials')
        return this;
    }

}

export default new Loginandcheckout();