import { render } from "pug";
import Block from "../../utils/Block/Block";

const template = `
-   for (var i = 0; i < countMessages; i++)
    div(id="message-"+i)
`;

type Props = {
  [key: string]: any;
};

export default class ChatBody extends Block {
  constructor(props: Props = {}) {
    super({
      tagName: "div",
      classNames: ["messages__body"],
      ...props,
      countMessages: "",
    });
  }

  render(): string {
    const { countMessages } = this.props;
    return render(template, { countMessages });
  }
}
