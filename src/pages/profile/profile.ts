import { compile } from "pug";
import Block from "../../utils/Block";
import PageModel from "../../constans/page.model";

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
#changeDataLink
#changePasswordLink
#exitLink`;

export default class Profile extends Block {
  constructor(props: PageModel) {
    super({ tagName: "div", classNames: ["profile__container"], ...props });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
