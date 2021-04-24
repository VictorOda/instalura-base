export default class PostCretionObject {
  constructor(cy) {
    this.cy = cy;

    this.cy.visit('/app/profile');
  }

  openPostModal() {
    // clicar no botão de submit
    this.cy.get('#plusButton').click();

    return this;
  }

  fillData({ url, description }) {
    // preencher o input usuario
    this.cy.get('#postUrl').type(url);
    // clicar no botão de carregar imagem
    this.cy.get('#loadImageButton').click();
    // preencher o input senha
    this.cy.get('#postDescription').type(description);
    // clicar no botão de avançar
    this.cy.get('#avançar button[type="button"]').click();

    return this;
  }

  chooseFilter() {
    return this;
  }

  sendPost() {
    // clicar no botão de submit
    this.cy.get('#submitBox button[type="button"]').click();

    return this;
  }
}
