import { compile } from "pug";
import Block from "../../utils/Block/Block";
import "./button.scss";
import ButtonModel from "./button.model";

const template: string = `button.button(class=[classNames] type=type disabled=disabled)= text`;
const compileTemplate = compile(template);
export default class Button extends Block {
  constructor(props: ButtonModel) {
    super({ tagName: "template", ...props });
  }

  render(): string {
    return compileTemplate(this.props);
  }
}
