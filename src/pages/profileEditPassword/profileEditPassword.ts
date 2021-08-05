import { compile } from "pug";
import Block from "../../utils/Block";
import PageModel from "../../constans/page.model";
import { multiValidate } from "../../utils/validate";

const template: string = `
.profile__avatar
  #profileAvatar  
form.profile__form(name="profileEditPassword")
  .profile__inputs-box
    #password
    #newPassword
    #repeatPassword
  #button`;

export default class ProfileEditPassword extends Block {
  constructor(props: PageModel) {
    const events = {
      submit: {
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const isValid = multiValidate(e.target, "passwords");

          if (isValid) {
            const data = new FormData(e.target);
            console.log(data, "data ProfileEditPassword");
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
