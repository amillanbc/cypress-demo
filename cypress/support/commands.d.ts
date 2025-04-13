// cypress/support/commands.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in
     * @param email - The user's email
     * @param password - The user's password
     */
    login(email: string, password: string): Chainable<void>;
    addToCart(): Chainable<void>;
  }
}
