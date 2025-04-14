/// <reference types="cypress" />

describe("Checkout process specs", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("URL"));
  });
  it("Should show or hide checkout btn", () => {
    cy.get('[data-cy="checkout-btn"]').should("not.be.visible");
    cy.login("admin", "admin");
    cy.get('[data-cy="checkout-btn"]').should("be.visible");
  });
  it("Should disable 'Place Order' btn if empty cart", () => {
    cy.login("admin", "admin");
    cy.get('[data-cy="checkout-btn"]').click();
    cy.get('[data-cy="place-order-btn"]').should("have.attr", "disabled");
  });
  it("Should checkout items successfully", () => {
    cy.login("admin", "admin");
    cy.addToCart();
    cy.get('[data-cy="place-order-btn"]').click();
    cy.get('[data-cy="order-placed-toast"]').should("be.visible");
  });
  it("Should calculate checkout amounts correctly", () => {
    cy.login("admin", "admin");
    cy.addToCart();
    cy.get('[data-cy="sub-total-amt"]').should("contain", "$109.95");
    cy.get('[data-cy="taxes-amt"]').should("contain", "$7.70");
    cy.get('[data-cy="total-amt"]').should("contain", "$117.65");
  });
});
