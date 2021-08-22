import { compile } from "pug";
import Block from "../../utils/Block/Block";
import PageModel from "../../constans/page.model";
import { multiValidate } from "../../utils/validate";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Link } from "../../components/link";
import { usersAPI } from "../../api/usersApi";
import router from "../../index";

const template: string = `
form.profile__form(name="profileEditPassword")
  .profile__inputs-box
    #password
    #newPassword
    #repeatPassword
  #button
#backLink`;

const compileTemplate = compile(template);

export default class ProfileEditPassword extends Block {
  constructor(props: PageModel) {
    const password = new Input({
      theme: "profile",
      label: "Старый пароль",
      id: "oldpassword",
      placeholder: "Введите старый пароль",
      name: "oldPassword",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const newPassword = new Input({
      theme: "profile",
      label: "Новый пароль",
      id: "password",
      placeholder: "Введите новый пароль",
      name: "newPassword",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const repeatPassword = new Input({
      theme: "profile",
      label: "Повторите новый пароль",
      id: "passwordRepeat",
      placeholder: "Повторите новый пароль",
      name: "passwordRepeat",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const button = new Button({
      text: "Сохранить",
      classNames: ["profile__button"],
      type: "submit",
      disabled: false,
    });
    const backLink = new Link({
      text: "Назад",
      classNames: ["profile__link", "link_back"],
      href: "/settings",
    });
    const events = {
      submit: {
        eventName: "submit",
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const isValid = multiValidate(e.target, "passwords");

          if (isValid) {
            const data = new FormData(e.target);
            data.delete("repeatPassword");
            usersAPI
              .changeUserPassword(data)
              .then(() => {
                router.go("/messenger");
              })
              .catch((err) => {
                console.error(err);
              });
          }
        },
      },
    };
    super({
      tagName: "div",
      classNames: ["profile__form"],
      ...props,
      children: {
        password,
        newPassword,
        repeatPassword,
        button,
        backLink,
      },
      events,
    });
  }

  render(): string {
    return compileTemplate(this.props);
  }
}
