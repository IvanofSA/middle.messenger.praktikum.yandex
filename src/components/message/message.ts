import { compile } from "pug";
import Block from "../../utils/Block";
import "./message.scss";
import MessageModel from "./message.model";

const template: string = `
.message(class='message_'+ position)
  p.message__text= message
  .message__info
    if status
      span.message__status
    span.message__time= time`;

export default class Message extends Block {
  constructor(props: MessageModel) {
    super({ tagName: "template", ...props });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
