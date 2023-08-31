import React from "react";
import RightBar from "../../src/MainComponents/RightBar";
describe("<RightBar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.stub(React, "useContext")
      .returns({
        myFriends: [
          {
            Id: 1,
            Email: "Hania",
            ProfileImage: "https://fastly.picsum.photos/id/834/200/300.jpg?hmac=9hu4aro5r8PEFwzVlhizygx4urxyeGGjgyMRXUgKOsE",
          },
          {
            Id: 2,
            Email: "Arek",
            ProfileImage: "https://fastly.picsum.photos/id/834/200/300.jpg?hmac=9hu4aro5r8PEFwzVlhizygx4urxyeGGjgyMRXUgKOsE",
          },
        ],
      });
    cy.mount(<RightBar />);
  });
});
