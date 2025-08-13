describe('Authentication Flow', () => {
    it('should allow a user to register and login', () => {
      cy.visit('/register');
      cy.get('input[name="username"]').type('e2euser');
      cy.get('input[name="email"]').type('e2e@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, e2euser');
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
      cy.get('input[name="email"]').type('e2e@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });
  });