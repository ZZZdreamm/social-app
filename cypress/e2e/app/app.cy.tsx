/// <reference types="cypress" />

import { logBefore } from "./NeededFunctions";




describe("App test", () => {
  logBefore()
  context("Posting", () => {
    it("Post form", () => {
      cy.get(".post-form-up-placeholder").click();
      cy.get(".modal-body-text").type("Hello world2!");
      cy.get("button").contains("Submit post").click();
      cy.get(".post-content-text").contains("Hello world2!");

      const parent = cy
        .get(".post-content-text")
        .contains("Hello world2!")
        .parent()
        .parent();
      parent.find("button").contains("Comment it").click();
      // cy.get(".post-content-text").contains("Hello world2!").parent().parent();
      // const submitButton = parent.find("button").contains("Post comment")
      // submitButton.should("be.enabled");
      // submitButton.click();
      // parent.find(".comment").contains("Commenting");
    });
  });
  context("Navigation", () => {
    it("Go into Profile back and forth", () => {
      cy.get("nav").find(".small-profile-image").click();
      cy.get(".profile-up-options-down")
        .find("button")
        .contains("Friends")
        .click();
      cy.get(".friend-profile").find("span").contains("mage@gmail.com").click();
      cy.get(".profile-up-options-down")
        .find("button")
        .contains("Friends")
        .click();
      cy.get(".friend-profile")
        .find("span")
        .contains("example@gmail.com")
        .click();
      cy.get(".profile-up-options-down")
        .find("button")
        .contains("Friends")
        .click();
      cy.get(".friend-profile").find("span").contains("mage@gmail.com").click();
    });

    it("Go to all left bar pages", () => {
      cy.get(".bar-left").find("ul > :nth-child(1)").click();
      cy.get(".bar-left").find("ul > :nth-child(2)").click();
      cy.get(".bar-left").find("ul > :nth-child(3)").click();
      cy.get(".bar-left").find("ul > :nth-child(4)").click();
      cy.get(".bar-left").find("ul > :nth-child(5)").click();
      cy.get(".bar-left").find("ul > :nth-child(6)").click();
      cy.get("#go-to-app").find(".go-back-button").click();
    });
  });

  context("Friend requests", () => {
    it("Search for a user and send friend request", () => {
      cy.get("#user-search-typeahead").type("lot");
      cy.get(".data-option-part").contains("lot@gmail.com").click();
      cy.get(".profile-up-options-down > :nth-child(3)").click();
      cy.get(".bar").find("ul > :nth-child(5)").click();
      cy.get(":nth-child(1) > .friend-request-options > button").click();
      const friendRequest = cy
        .get(".friend-request-email")
        .contains("lot@gmail.com")
        .parent()
        .parent();
      friendRequest.find("button").contains("Cancel request").click();
    });
  });

  context("Chat tests", () => {
    it("Open chat and close it", () => {
      cy.get(':nth-child(3) > [data-testid="rightBarFriend-email"]').click();
      cy.get(".chat").should("be.visible");
      cy.get(".listOfOpenedChats").children().should("have.length", 1);
      cy.get(".chat-header-close").click();
      cy.get(".listOfOpenedChats").children().should("have.length", 0);
    });
    it("Send text message", () => {
      cy.get(':nth-child(3) > [data-testid="rightBarFriend-email"]').click();
      cy.get(".chat-footer-input", { timeout: 1000 }).type("Hello friend");
      cy.get(".chat-footer-send").click();
      cy.get(".listOfMessages").last().contains("Hello friend");
    });

    it("Send files in message", () => {
      cy.get(':nth-child(3) > [data-testid="rightBarFriend-email"]').click();
      cy.get(".custom-file-input").selectFile([
        "public/small_carrr.png",
        "public/carrr.png",
      ]);
      cy.get(".chat-footer-input-images-container")
        .children()
        .should("have.length", 2 + 1);
      cy.get(".custom-file-input").selectFile(["public/carrr.png"]);
      cy.get(".chat-footer-input-images-container")
        .children()
        .should("have.length", 3 + 1);
    });
  });
  context("Post container", () => {

  });
});
