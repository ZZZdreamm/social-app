/// <reference types="cypress" />
export function logBefore() {
  beforeEach(() => {
    cy.visit("http://localhost:3000/social-app#/");
    cy.get("#email").type("example@gmail.com");
    cy.get("#password").type("Example1@");
    cy.get("form").find("button").click();
  });
}


export const setLocalStorage = (key, value) => {
  cy.window().then((win) => {
    win.localStorage.setItem(key, value);
  });
};