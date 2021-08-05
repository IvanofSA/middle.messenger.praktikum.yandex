import "./signup.scss";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { Button } from "../../components/button";
import SignUp from "./signup";

const signUp = new SignUp({
  title: "Регистрация",
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
    name: new Input({
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
      id: "repeatPassword",
      placeholder: "Введите пароль",
      name: "repeatPassword",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    link: new Link({
      text: "Войти",
      classNames: ["form__link"],
      href: "#",
    }).getContent(),
    button: new Button({
      text: "Зарегистрироваться",
      classNames: ["form__enter"],
      type: "submit",
      disabled: false,
    }).getContent(),
  },
});

const element = document.getElementById("reg");
element?.appendChild(signUp.getContent());
