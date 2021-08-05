import { compile } from "pug";
import Block from "../../utils/Block";
import "./link.scss";
import LinkModel from "./link.model";

const template: string = `a.link(class=[classNames] href=href)= text`;

export default class Link extends Block {
  constructor(props: LinkModel) {
    super({ tagName: "template", ...props });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
