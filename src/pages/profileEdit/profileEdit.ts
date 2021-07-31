import { compile } from "pug";
import Block from "../../utils/Block";
import PageModel from "../../constans/page.model";
import {multiValidate} from "../../utils/validate";

const template: string = `
.profile__avatar
  #profileAvatar
form.profile__form
  .profile__inputs-box
    #email
    #loginField
    #firstName
    #secondName
    #phone
  #button`;

export default class ProfileEdit extends Block {
  constructor(props: PageModel) {
    const events = {
      submit: {
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const isValid = multiValidate(e.target, "profile");

          if (isValid) {
            const data = new FormData(e.target);
            console.log(data, "data ProfileEdit");
          }
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

  render(): string {
    return compile(template)(this.props);
  }
}
