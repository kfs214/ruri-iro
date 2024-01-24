describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/');

    cy.get('body > header > div > div').contains('Next.js App Router');
  });
});
