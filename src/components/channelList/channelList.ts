import { render } from "pug";
import Block from "../../utils/Block/Block";

const template = `- for (var i = 0; i < countChannels; i++)
     div(id="channelCard-"+i)
`;

export default class ChannelList extends Block {
  constructor(props) {
    super({
      tagName: "ul",
      classNames: ["menu__list"],
      ...props,
      countChannels: "",
    });
  }

  render(): string {
    const { countChannels } = this.props;
    return render(template, { countChannels });
  }
}
