import { compile } from "pug";
import Block from "../../utils/Block/Block";
import "./link.scss";
import LinkModel from "./link.model";

const template: string = `a.link(class=[classNames] href=href)= text`;
const compileTemplate = compile(template);

export default class Link extends Block {
  constructor(props: LinkModel) {
    super({ tagName: "template", ...props });
  }

  render(): string {
    return compileTemplate(this.props);
  }
}
