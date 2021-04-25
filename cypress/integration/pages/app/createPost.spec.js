/// <reference types="cypress" />

import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';
import PostCreationObject from '../../../../src/components/screens/app/ProfileMenu/PostCreation.pageObject';

describe('/pages/app/profile', () => {
  describe('open post modal and fill form', () => {
    it('show success animation', () => {
      cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app')
        .as('userLogin');

      // Cenário
      const loginScreen = new LoginScreenPageObject(cy);
      loginScreen
        .fillFormsFields({ user: 'omariosouto', password: 'senhasegura' })
        .clickOnSubmit();

      // Asserções
      cy.url().should('include', '/app/profile');

      const postCreation = new PostCreationObject(cy);
      postCreation.openPostModal().fillData({ url: 'https://source.unsplash.com/5IKfw-BKapo/600x600', description: 'Description test' }).chooseFilter().sendPost();

      // Assercões
      // Should have a Lottie animation playing
      cy.get('#lottieSuccess').should('be.visible');
    });
  });
});
