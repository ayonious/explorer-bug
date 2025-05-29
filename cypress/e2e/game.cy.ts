describe('Explorer Bug Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('should load the game successfully', () => {
    cy.get('body').should('be.visible')
    cy.contains('Explorer Bug').should('be.visible')
  })

  it('should have basic game controls visible', () => {
    // Check for game controls
    cy.get('button').should('have.length.at.least', 1)
  })

  it('should respond to keyboard controls', () => {
    // Test keyboard interactions
    cy.get('body').type('{leftarrow}')
    cy.get('body').type('{rightarrow}')
    cy.get('body').type('{uparrow}')
    cy.get('body').type('{downarrow}')
  })

  it('should have a visible game area', () => {
    // Check if the game canvas/area is visible
    cy.get('div').should('be.visible')
  })
}) 