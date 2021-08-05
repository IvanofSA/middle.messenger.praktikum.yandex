import { compile } from "pug";
import Block from "../../utils/Block";
import PageModel from "../../constans/page.model";
import { multiValidate } from "../../utils/validate";

const template: string = `
form.form.login-page__form
  h1.form__title= title
  .form__inputs-box
    #email
    #password
  #button    
  #link`;

export default class SignIn extends Block {
  constructor(props: PageModel) {
    const events = {
      submit: {
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const isValid = multiValidate(e.target, "signin");
          if (!isValid) {
            const data = new FormData(e.target);
            console.log(data, "data signin");
          }
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

  render(): string {
    return compile(template)(this.props);
  }
}
