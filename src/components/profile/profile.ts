import { compile } from "pug";
import Block from "../../utils/Block/Block";
import PageModel from "../../constans/page.model";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { authAPI } from "../../api/authApi";
import router from "../../index";

const template: string = `
form.profile__edit
  .profile__inputs-box
    #inputEmail
    #inputLogin
    #inputFirstName
    #inputSecondName
    #inputPhone
#changeDataLink
#changePasswordLink
#exitLink`;

export default class Profile extends Block {
  type: string;
  constructor(props: PageModel) {
    const inputEmail = new Input({
      theme: "profile",
      label: "Почта",
      id: "email",
      placeholder: "Введите email",
      name: "email",
      type: "email",
      value: "",
      disabled: true,
      error: "Ошибка",
    });
    const inputLogin = new Input({
      theme: "profile",
      label: "Логин",
      id: "login",
      placeholder: "Введите логин",
      name: "login",
      type: "text",
      value: "",
      disabled: true,
      error: "Ошибка",
    });
    const inputFirstName = new Input({
      theme: "profile",
      label: "Имя",
      id: "name",
      placeholder: "Введите Имя",
      name: "name",
      type: "text",
      value: "",
      disabled: true,
      error: "Ошибка",
    });
    const inputSecondName = new Input({
      theme: "profile",
      label: "Фамилия",
      id: "secondName",
      placeholder: "Введите Фамилия",
      name: "secondName",
      type: "text",
      value: "",
      disabled: true,
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
      disabled: true,
      error: "Ошибка",
    });
    const changeDataLink = new Link({
      text: "Изменить данные",
      classNames: ["profile__link", "profile__link_edit"],
    });
    const changePasswordLink = new Link({
      text: "Изменить пароль",
      classNames: ["profile__link", "profile__link_passwords"],
      href: "#",
    });
    const exitLink = new Link({
      text: "Выйти",
      classNames: ["profile__link", "profile__link_logout", "link_red"],
      href: "#",
    });

    const events = {
      logout: {
        eventName: "click",
        tagEvent: ".profile__link_logout",
        callback: (e) => {
          e.preventDefault();
          authAPI.logOut();
          router.go("/");
        },
      },
    };
    super({
      tagName: "div",
      classNames: ["profile__form"],
      children: {
        inputEmail,
        inputLogin,
        inputFirstName,
        inputSecondName,
        inputPhone,
        changeDataLink,
        changePasswordLink,
        exitLink,
      },
      ...props,
      events,
    });
    this.type = "";
  }

  render(): string {
    return compile(template)(this.props);
  }
}
