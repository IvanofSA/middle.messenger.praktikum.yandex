import { expect, assert } from "chai";
import { JSDOM } from "jsdom";
import { compile } from "pug";
import Block from "./Block";
import ButtonModel from "../../components/button/button.model";

const template: string = `button.button(class=[classNames] type=type disabled=disabled)= text`;

export default class Button extends Block {
  constructor(props: ButtonModel) {
    super({ tagName: "template", ...props });
  }

  render(): string {
    return compile(template)(this.props);
  }
}

describe("Block check", () => {
  const { window } = new JSDOM(
    `<html>
        <body>
            <div id="app"></div>
        </body>
        </html>`,
    { url: "http://localhost" }
  );
  global.window = window;
  global.document = window.document;

  it("Should create HTML element", () => {
    const button = new Button();
    expect(button.element.constructor.name).to.equal("HTMLButtonElement");
  });

  it("Should change Props", () => {
    const button = new Button({
      text: "Сохранить",
      classNames: ["profile__button"],
      type: "submit",
      disabled: false,
    });

    button.setProps({ srcImg: "picture2" });
    assert.propertyVal(button.props, "srcImg", "picture2");
  });
});
