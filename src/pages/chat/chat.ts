import { compile } from "pug";
import Block from "../../utils/block";
import ChatModel from "./chat.model";

export default class Chat extends Block {
  constructor(props: ChatModel) {
    super({ tagName: "div", classNames: ["home__container"], ...props });
  }

  componentDidMount(): HTMLElement {
    const element = document.getElementById("home");
    element?.appendChild(this.getContent());
    return element as HTMLElement;
  }

  render(): string {
    const { template } = this.props;
    return compile(template)(this.props);
  }
}
