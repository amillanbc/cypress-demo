/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      addToCart(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (email, password) => {
  cy.get('[data-cy="auth-btn"]').click();
  cy.get('[data-cy="user-input"]').type(email);
  cy.get('[data-cy="pass-input"]').type(password);
  cy.get('[data-cy="login-btn"]').click();
});

Cypress.Commands.add("addToCart", () => {
  cy.get('[data-cy="product-tile-0"]').click();
  cy.get('[data-cy="product-add-btn"]').click();
});

export {};
