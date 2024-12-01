describe('Test Example', () => {
  it('should visit the home page', () => {
    cy.visit('/');
    cy.contains('Bienvenidos');
  });
});