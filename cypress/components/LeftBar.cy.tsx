import React from "react";
import LeftBar from "../../src/MainComponents/LeftBar";
import { HashRouter, useNavigate } from "react-router-dom";

describe("<LeftBar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <HashRouter>
        <LeftBar />
      </HashRouter>
    );
  });
});
