import { compile } from "pug";
import Block from "../../utils/Block/Block";
import "./channel.scss";
import ChannelModel from "./channel.model";
import { Avatar } from "../avatar";

const template: string = `
.channel__container
  .channel__avatar
    #avatar
  span.channel__name= name
  if lastMessage
    span.channel__message= lastMessage
  span.channel__time= time
  if missed
    span.channel__missed= missed`;

export default class Channel extends Block {
  constructor(props: ChannelModel) {
    const { src } = props;

    const avatar = new Avatar({ src });
    super({
      tagName: "li",
      classNames: ["channel"],
      attribute: { "data-id": props.id },
      ...props,
      children: {
        avatar,
      },
    });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
