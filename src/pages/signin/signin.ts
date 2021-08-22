import { compile } from "pug";
import Block from "../../utils/Block/Block";
import PageModel from "../../constans/page.model";
import { multiValidate } from "../../utils/validate";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import { authAPI } from "../../api/authApi";
import router from "../../index";

const template: string = `
.login__container
  form.form.login-page__form
    h1.form__title Вход
    .form__inputs-box
      #loginField
      #password
    #button    
    #link`;

const compileTemplate = compile(template);

export default class SignIn extends Block {
  constructor(props: PageModel) {
    const loginField = new Input({
      theme: "login",
      label: "Логин",
      id: "loginField",
      placeholder: "Введите логин",
      name: "login",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const password = new Input({
      theme: "login",
      label: "Пароль",
      id: "password",
      placeholder: "Введите пароль",
      name: "password",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const link = new Link({
      text: "Нет аккаунта?",
      classNames: ["form__link"],
      href: "/sign-up",
    });
    const button = new Button({
      text: "Авторизоваться",
      classNames: ["form__enter"],
      type: "submit",
      disabled: false,
    });
    const events = {
      signin: {
        eventName: "submit",
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();
          const isValid = multiValidate(e.target, "signin");
          if (isValid) {
            const data = new FormData(e.target);
            authAPI
              .signIn(data)
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
      tagName: "main",
      classNames: ["login", "main"],
      children: {
        loginField,
        password,
        link,
        button,
      },
      ...props,
      events,
    });
  }

  render(): string {
    return compileTemplate(this.props);
  }
}
