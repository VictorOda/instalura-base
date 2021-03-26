/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';

describe('/pages/app/login', () => {
  describe('when fill and submit a form login request', () => {
    it('go to the profile page', () => {
      cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app')
        .as('userLogin');

      // Cenário
      const loginScreen = new LoginScreenPageObject(cy);
      loginScreen
        .fillFormsFields({ user: 'omariosouto', password: 'senhasegura' })
        .clickOnSubmit();

      // Asserções
      cy.url().should('include', '/app/profile');

      cy.wait('@userLogin')
        .then((intercept) => {
          const { token } = intercept.response.body.data;
          cy.getCookie('APP_TOKEN')
            .should('exist')
            .should('have.property', 'value', token);
        });
    });
  });
});
