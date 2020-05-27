describe('Integration Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  })

  it('initial page should have no name shown', () => {
    cy.get('.MuiCard-root').invoke('text').should('contain', '');
  });

});
