// cypress/support/commands.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    addToCart(): Chainable<void>;
  }
}
