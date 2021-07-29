import "./signup.scss";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import SignUp from "./signup";

const template: string = `
form.form.login-page__form
    h1.form__title= title
    .form__inputs-box
      #email
      #firstName
      #secondName
      #phone
      #password
      #repeatPassword
    #button    
    #link`;
/* eslint-disable no-new */
new SignUp({
  title: "Регистрация",
  template,
  children: {
    email: new Input({
      theme: "login",
      label: "Почта",
      id: "email",
      placeholder: "Введите email",
      name: "email",
      type: "email",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    firstName: new Input({
      theme: "login",
      label: "Имя",
      id: "name",
      placeholder: "Введите Имя",
      name: "name",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    secondName: new Input({
      theme: "login",
      label: "Фамилия",
      id: "secondName",
      placeholder: "Введите Фамилия",
      name: "secondName",
      type: "text",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    phone: new Input({
      theme: "login",
      label: "Телефон",
      id: "phone",
      placeholder: "Введите Телефон",
      name: "phone",
      type: "tel",
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
    repeatPassword: new Input({
      theme: "login",
      label: "Пароль (ещё раз)",
      id: "repassword",
      placeholder: "Введите пароль",
      name: "repassword",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    link: new Link({
      text: "Войти",
      className: "form__link",
      href: "#",
    }).getContent(),
    button: new Button({
      text: "Зарегистрироваться",
      className: "form__enter",
      type: "submit",
      disabled: false,
    }).getContent(),
  },
});
