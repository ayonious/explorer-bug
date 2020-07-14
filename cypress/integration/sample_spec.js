describe('Integration Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('initial page should have => 1.buttons, 2.Header Text', () => {
    // Buttons
    cy.contains('Left');
    cy.contains('Right');
    cy.contains('Go');

    // Header text
    cy.contains('Move the bug to eat all food!');
    cy.contains('Scores:');
  });
});
