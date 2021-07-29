import { compile } from "pug";
import Block from "../../utils/block";
import SignInModel from "./signin.model";
import {getData} from "../../utils/getData";

export default class SignIn extends Block {
  constructor(props: SignInModel) {
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
      classNames: ["login__container"],
      ...props,
      events,
    });
  }

  componentDidMount(): HTMLElement {
    const element = document.getElementById("login");
    element?.appendChild(this.getContent());
    return element as HTMLElement;
  }

  render(): string {
    const { template } = this.props;
    return compile(template)(this.props);
  }
}
