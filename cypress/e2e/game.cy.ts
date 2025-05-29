describe('Explorer Bug Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should load the game successfully', () => {
    cy.get('body').should('be.visible')
    cy.contains('Move the bug to eat all food!').should('be.visible')
  })

  it('should have all game controls visible', () => {
    // Check for specific game controls
    cy.contains('Left').should('be.visible')
    cy.contains('Right').should('be.visible')
    cy.contains('Go').should('be.visible')
    
    // Check score display
    cy.contains('Scores:').should('be.visible')
  })

  it('should respond to keyboard controls', () => {
    // Test keyboard interactions
    cy.get('body').type('{leftarrow}')
    cy.get('body').type('{rightarrow}')
    cy.get('body').type('{uparrow}')
    cy.get('body').type('{downarrow}')
  })

  it('should respond to button clicks', () => {
    // Test button interactions
    cy.contains('Left').click()
    cy.contains('Right').click()
    cy.contains('Go').click()
  })

  it('should have a visible game area with bug', () => {
    // Check if the game area is visible
    cy.get('div').should('be.visible')
    
    // Check if the bug icon is present
    cy.get('[data-testid="BugReportIcon"]').should('be.visible')
  })

  it('should have score visible', () => {
    // Check if score is visible and is a number
    cy.contains(/Scores: \d+/).should('be.visible')
  })
}) 