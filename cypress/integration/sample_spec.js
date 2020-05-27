describe('Integration Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('initial page should have => 1.buttons, 2.Bug 3.Header Text', () => {
    cy.contains('Left');
    cy.contains('Right');
    cy.contains('Go');

    cy.contain('Move the bug to eat all food!');
  });
});
