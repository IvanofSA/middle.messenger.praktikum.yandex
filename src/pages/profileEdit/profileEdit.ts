import { compile } from "pug";
import Block from "../../utils/block";
import ProfileEditModel from "./profileEdit.model";
import {getData} from "../../utils/getData";

export default class ProfileEdit extends Block {
  constructor(props: ProfileEditModel) {
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
    const element = document.getElementById("profileEdit");
    element?.appendChild(this.getContent());
    return element as HTMLElement;
  }

  render(): string {
    const { template } = this.props;
    return compile(template)(this.props);
  }
}
