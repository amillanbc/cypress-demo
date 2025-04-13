/// <reference types="cypress" />

describe("Login and registration authentication specs", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("URL"));
  });
  it("Should login and logout successfully", () => {
    cy.login("admin", "admin");
    cy.get('[data-cy="auth-welcome"]').should("contain", "Welcome");
    cy.get('[data-cy="logout-btn"]').click();
    cy.get('[data-cy="login-form"]').should("be.visible");
  });
  it("Should show login error", () => {
    cy.login("user", "user");
    cy.get('[data-cy="login-err-msg"]').should("be.visible");
  });
  it("Should register successfully", () => {
    cy.get('[data-cy="auth-btn"]').click();
    cy.get('[data-cy="register-btn"]').click();
    cy.get('[data-cy="user-register-input"]').type("username");
    cy.get('[data-cy="email-register-input"]').type("test@gmail.com");
    cy.get('[data-cy="pass-register-input"]').type("password123");
    cy.get('[data-cy="repass-register-input"]').type("password123");
    cy.get('[data-cy="accept-register-checkbox"]').click();
    cy.get('[data-cy="register-btn"]').click();
    cy.get('[data-cy="registration-toast"]').should("be.visible");
    cy.url().should("include", "/");
  });
  it("Should redirect to Home from Checkout if not logged in", () => {
    cy.wait(300);
    cy.visit(`${Cypress.env("URL")}checkout`);
    cy.wait(300);
    cy.url().should("eq", Cypress.env("URL"));
  });
});
