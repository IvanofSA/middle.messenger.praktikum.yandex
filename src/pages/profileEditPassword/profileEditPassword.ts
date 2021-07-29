import { compile } from "pug";
import Block from "../../utils/block";
import ProfileEditPasswordModel from "./profileEditPassword.model";
import {getData} from "../../utils/getData";

export default class ProfileEditPassword extends Block {
  constructor(props: ProfileEditPasswordModel) {
    const events = {
      submit: {
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const data = getData(e.target);
          console.log(data);
        },
      },
    };
    super({
      tagName: "div",
      classNames: ["profile__container"],
      ...props,
      events,
    });
  }

  componentDidMount(): HTMLElement {
    const element = document.getElementById("profileEditPassword");
    element?.appendChild(this.getContent());
    return element as HTMLElement;
  }

  render(): string {
    const { template } = this.props;
    return compile(template)(this.props);
  }
}
