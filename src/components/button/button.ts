import { compile } from "pug";
import Block from "../../utils/Block";
import "./button.scss";
import ButtonModel from "./button.model";

const template: string = `button.button(class=[classNames] type=type disabled=disabled)= text`;

export default class Button extends Block {
  constructor(props: ButtonModel) {
    super({ tagName: "template", ...props });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
