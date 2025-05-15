import loginandcheckout from "../pageobjectmodel/loginandcheckout";

describe('template spec', () => {
  it('valid username and password', () => {
    loginandcheckout
    .visiturl()
    cy.get('.login_credentials_wrap-inner > .login_credentials')
      .invoke('html')
      .then((innerHtml)=>{
        const username= innerHtml.split('<br>').map(str=>str.replace(/<[^>]+>/g, '').trim()).filter(Boolean)
        cy.wrap(username).as('username')
    })
    cy.get('@username').then((username)=>{
      cy.log('Listed username',username)
    })
    loginandcheckout.enterusernameandpassword(); 
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
