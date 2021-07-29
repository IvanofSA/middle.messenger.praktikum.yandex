import { compile } from "pug";
import Block from "../../utils/block";
import SignUpModel from "./signup.model";
import { getData } from "../../utils/getData";
export default class SignUp extends Block {
  constructor(props: SignUpModel) {
    const events = {
      submit: {
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const data = getData(e.target);
          console.log(data);

          /*ToDo не очень догнал как провалидировать при клике по человечески и в других формах*/
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
    const element = document.getElementById("reg");
    element?.appendChild(this.getContent());
    return element as HTMLElement;
  }

  render(): string {
    const { template } = this.props;
    return compile(template)(this.props);
  }
}
