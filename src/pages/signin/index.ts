import "./signin.scss";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import SignIn from "./signin";

const template: string = `
form.form.login-page__form
    h1.form__title= title
    .form__inputs-box
      #email
      #password
    #button    
    #link`;
/* eslint-disable no-new */
new SignIn({
  title: "Вход2",
  template,
  children: {
    email: new Input({
      theme: "login",
      label: "Логин",
      id: "email",
      placeholder: "Введите email",
      name: "email",
      type: "email",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    password: new Input({
      theme: "login",
      label: "Пароль",
      id: "password",
      placeholder: "Введите пароль",
      name: "password",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    link: new Link({
      text: "Нет аккаунта?",
      className: "form__link",
      href: "#",
    }).getContent(),
    button: new Button({
      text: "Авторизоваться",
      className: "form__enter",
      type: "submit",
      disabled: false,
    }).getContent(),
  },
});
