import { compile } from "pug";
import "./avatar.scss";
import Block from "../../utils/Block";
import AvatarModel from "./avatar.model";

const template: string = `
.avatar-component
  .avatar-component__img
    img(src=src)
  if text
    .avatar-component__name= text`;

export default class Button extends Block {
  constructor(props: AvatarModel) {
    super({ tagName: "template", ...props });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
