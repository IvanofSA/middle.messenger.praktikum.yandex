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
    h1.form__title Регистрация
    .form__inputs-box
      #login
      #email
      #name
      #secondName
      #phone
      #password
      #repeatPassword
    #button    
    #link`;

export default class SignUp extends Block {
  constructor(props: PageModel) {
    const events = {
      signup: {
        eventName: "submit",
        tagEvent: "form",
        callback: (e) => {
          e.preventDefault();

          const isValid = multiValidate(e.target, "signup");
          if (isValid) {
            const data = new FormData(e.target);
            data.delete("repeatPassword");
            authAPI
              .signUp(data)
              .then(() => {
                router.go("/messenger");
              })
              .catch((er) => {
                console.error(er);
              });
          }
        },
      },
    };
    const login = new Input({
      theme: "login",
      label: "Логин",
      id: "login",
      placeholder: "Введите email",
      name: "login",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const email = new Input({
      theme: "login",
      label: "Почта",
      id: "email",
      placeholder: "Введите email",
      name: "email",
      type: "email",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const name = new Input({
      theme: "login",
      label: "Имя",
      id: "name",
      placeholder: "Введите Имя",
      name: "first_name",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const secondName = new Input({
      theme: "login",
      label: "Фамилия",
      id: "secondName",
      placeholder: "Введите Фамилия",
      name: "second_name",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const phone = new Input({
      theme: "login",
      label: "Телефон",
      id: "phone",
      placeholder: "Введите Телефон",
      name: "phone",
      type: "tel",
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
    const repeatPassword = new Input({
      theme: "login",
      label: "Пароль (ещё раз)",
      id: "repeatPassword",
      placeholder: "Введите пароль",
      name: "repeatPassword",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    });
    const link = new Link({
      text: "Войти",
      classNames: ["form__link"],
      href: "/",
    });
    const button = new Button({
      text: "Зарегистрироваться",
      classNames: ["form__enter"],
      type: "submit",
      disabled: false,
    });
    super({
      tagName: "main",
      classNames: ["reg", "main"],
      children: {
        login,
        email,
        name,
        secondName,
        phone,
        password,
        repeatPassword,
        link,
        button,
      },
      ...props,
      events,
    });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
