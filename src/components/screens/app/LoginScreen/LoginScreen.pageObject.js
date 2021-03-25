export default class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;

    this.cy.visit('/login');
  }

  fillFormsFields({ user, password }) {
    // preencher o input usuario
    this.cy.get('#formCadastro input[name="usuario"]').type(user);
    // preencher o input senha
    this.cy.get('#formCadastro input[name="senha"]').type(password);

    return this;
  }

  clickOnSubmit() {
    // clicar no botão de submit
    this.cy.get('#formCadastro button[type="submit"]').click();

    return this;
  }
}
