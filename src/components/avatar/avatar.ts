import { render } from "pug";
import "./avatar.scss";
import Block from "../../utils/Block/Block";
import AvatarModel from "./avatar.model";
const template: string = `
.avatar-component__img
  img(src=src)
if text
  .avatar-component__name= text`;

export default class Button extends Block {
  constructor(props: AvatarModel = {}) {
    super({ tagName: "div", classNames: ["avatar-component"], ...props });
  }

  render(): string {
    let { src, text } = this.props;
    src = src ? `https://ya-praktikum.tech/api/v2/resources${src}` : "";
    return render(template, { src, text });
  }
}
