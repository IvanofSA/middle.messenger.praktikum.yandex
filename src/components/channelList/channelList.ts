import { render } from "pug";
import Block from "../../utils/Block/Block";

const template = `- for (var i = 0; i < countChannels; i++)
     div(id="channelCard-"+i)
`;

type Props = {
  [key: string]: any;
};

export default class ChannelList extends Block {
  constructor(props: Props = {}) {
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
