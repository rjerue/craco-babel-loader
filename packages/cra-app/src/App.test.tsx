import { mount } from "@cypress/react";
import App from "./App";

it("renders learn code from code-to-include", () => {
  mount(<App />);
  cy.get("div").contains("Ryan");
});
