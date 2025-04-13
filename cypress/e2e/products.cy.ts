/// <reference types="cypress" />

describe("Products loading in Home and PDP view", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://fakestoreapi.com/products", {
      fixture: "products.json",
    }).as("getProducts");
    cy.intercept("GET", "https://fakestoreapi.com/products/1", {
      fixture: "product.json",
    }).as("getProduct");
    cy.visit(Cypress.env("URL"));
  });
  it("Should load products successfully in Home View", () => {
    cy.get('[data-cy="product-tile-name-0"]').should("contain", "Mock");
    cy.get('[data-cy="product-tile-price-0"]').should("contain", "50");
  });
  it("Should load single product successfully in PDP View", () => {
    cy.get('[data-cy="product-tile-0"]').click();
    cy.get('[data-cy="product-name"]').should("contain", "Mock");
    cy.get('[data-cy="product-description"]').should(
      "contain",
      "Mock Product Description"
    );
    cy.get('[data-cy="product-price"]').should("contain", "25");
  });
});
