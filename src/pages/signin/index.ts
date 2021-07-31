import "./signin.scss";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import SignIn from "./signin";

const signIn = new SignIn({
  title: "Вход",
  children: {
    email: new Input({
      theme: "login",
      label: "Email",
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
      classNames: ["form__link"],
      href: "#",
    }).getContent(),
    button: new Button({
      text: "Авторизоваться",
      classNames: ["form__enter"],
      type: "submit",
      disabled: false,
    }).getContent(),
  },
});

const element = document.getElementById("login");
element?.appendChild(signIn.getContent());
