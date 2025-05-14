import loginandcheckout from "../pageobjectmodel/loginandcheckout";

describe('template spec', () => {
  it('valid username and password', () => {
    loginandcheckout
    .visiturl()
    .enterusernameandpassword();
    cy.url().then(url => {  
      if (url.includes('/inventory.html')) {
        loginandcheckout
        .afterlogin()
        .checkout()
        .checkoutdetails()
        .continuecheckout()
        cy.get('body').then(($body) => {
          if ($body.find('[data-test="error"]').length > 0) {
            loginandcheckout.checkoutfailed()
        }else {    
            loginandcheckout.checkoutsuccess()
        }
        })
        }else {
          loginandcheckout.failedlogin()
      }
    })
  })
})
