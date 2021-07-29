import { compile } from "pug";
import Block from "../../utils/block";
import ProfileModel from "./profile.model";

export default class Profile extends Block {
  constructor(props: ProfileModel) {
    super({ tagName: "div", classNames: ["profile__container"], ...props });
  }

  componentDidMount(): HTMLElement {
    const element = document.getElementById("profile");
    element?.appendChild(this.getContent());
    return element as HTMLElement;
  }

  render(): string {
    const { template } = this.props;
    return compile(template)(this.props);
  }
}
