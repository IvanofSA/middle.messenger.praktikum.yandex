import { compile } from "pug";
import Block from "../../utils/Block";
import "./channel.scss";
import ChannelModel from "./channel.model";
import { Avatar } from "../avatar";

const template: string = `
.channel
    if avatarSrc
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
    super({
      tagName: "template",
      ...props,
      children: {
        avatar: new Avatar({
          id: props.avatarId,
          src: props.avatarSrc,
          text: props.avatarName,
        }).getContent(),
      },
    });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
