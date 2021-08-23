import { expect } from "chai";
import { JSDOM } from "jsdom";
import Block from "../Block/Block";
import { Router } from "./router";

describe("Checking the transitions at Route", () => {
  const { window } = new JSDOM(
    `<html>
        <body>
            <div id="app"></div>
        </body>
        </html>`,
    { url: "http://localhost:3000" }
  );

  global.window = window;
  global.document = window.document;

  const router = new Router("#app");
  router.use("/messenger", Block);
  router.start();

  it("Should change the state of the history entity", () => {
    router.go("/messenger");
    expect(router.history.length).to.equal(2);
  });

  it("Should change pathname", () => {
    router.go("/settings");
    expect(window.location.pathname).to.equal("/settings");
  });
});
