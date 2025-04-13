/// <reference types="cypress" />

describe("Cart handler specs", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("URL"));
  });
  it("Should add and remove item from cart successfully", () => {
    cy.login("admin", "admin");
    cy.addToCart();
    cy.url().should("contain", "/checkout");
    cy.get('[data-cy="remove-from-cart-btn"]').click();
    cy.get('[data-cy="empty-cart-msg"]').should("be.visible");
  });
  it("Should show error if add to cart not logged in", () => {
    cy.addToCart();
    cy.get('[data-cy="login-required-toast"]').should("be.visible");
    cy.url().should("eq", `${Cypress.env("URL")}product/1`);
  });
});
