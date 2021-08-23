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
form.profile__form
  .profile__inputs-box
    #inputEmail
    #inputLogin
    #inputFirstName
    #inputSecondName
    #inputPhone
  #button
#backLink`;

const compileTemplate = compile(template);

export default class ProfileEdit extends Block {
  constructor(props: PageModel) {
    const inputEmail = new Input({
      theme: "profile",
      label: "Почта",
      id: "email",
      placeholder: "Введите email",
      name: "email",
      type: "email",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const inputLogin = new Input({
      theme: "profile",
      label: "Логин",
      id: "login",
      placeholder: "Введите email",
      name: "login",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const inputFirstName = new Input({
      theme: "profile",
      label: "Имя",
      id: "name",
      placeholder: "Введите Имя",
      name: "first_name",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const inputSecondName = new Input({
      theme: "profile",
      label: "Фамилия",
      id: "secondName",
      placeholder: "Введите Фамилия",
      name: "second_name",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const inputPhone = new Input({
      theme: "profile",
      label: "Телефон",
      id: "phone",
      placeholder: "Введите Телефон",
      name: "phone",
      type: "tel",
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
        tagEvent: "form",
        eventName: "submit",
        callback: (e) => {
          e.preventDefault();
          const isValid = multiValidate(e.target, "profile");

          if (isValid) {
            const data = new FormData(e.target);
            data.append("display_name", "");
            usersAPI
              .changeUserProfile(data)
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
        inputEmail,
        inputLogin,
        inputFirstName,
        inputSecondName,
        inputPhone,
        backLink,
        button,
      },
      events,
    });
  }

  render(): string {
    return compileTemplate(this.props);
  }
}
