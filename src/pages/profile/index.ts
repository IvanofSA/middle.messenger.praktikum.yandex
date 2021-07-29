import "./profile.scss";
import Profile from "./profile";
import { Input } from "../../components/input";
import { Link } from "../../components/link";
import { Avatar } from "../../components/avatar";

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

/* eslint-disable no-new */
new Profile({
  template,
  children: {
    email: new Input({
      theme: "profile",
      label: "Почта",
      id: "email",
      placeholder: "Введите email",
      name: "email",
      type: "email",
      value: "",
      disabled: true,
      error: "Ошибка",
    }).getContent(),
    loginField: new Input({
      theme: "profile",
      label: "Логин",
      id: "login",
      placeholder: "Введите логин",
      name: "login",
      type: "text",
      value: "",
      disabled: true,
      error: "Ошибка",
    }).getContent(),
    firstName: new Input({
      theme: "profile",
      label: "Имя",
      id: "name",
      placeholder: "Введите Имя",
      name: "name",
      type: "text",
      value: "",
      disabled: true,
      error: "Ошибка",
    }).getContent(),
    secondName: new Input({
      theme: "profile",
      label: "Фамилия",
      id: "secondName",
      placeholder: "Введите Фамилия",
      name: "secondName",
      type: "text",
      value: "",
      disabled: true,
      error: "Ошибка",
    }).getContent(),
    phone: new Input({
      theme: "profile",
      label: "Телефон",
      id: "phone",
      placeholder: "Введите Телефон",
      name: "phone",
      type: "tel",
      value: "",
      disabled: true,
      error: "Ошибка",
    }).getContent(),
    changeDataLink: new Link({
      text: "Изменить данные",
      classNames: ["profile__link"],
      href: "#",
    }).getContent(),
    changePasswordLink: new Link({
      text: "Изменить пароль",
      classNames: ["profile__link"],
      href: "#",
    }).getContent(),
    exitLink: new Link({
      text: "Выйти",
      classNames: ["profile__link", "link_red"],
      href: "#",
    }).getContent(),
    profileAvatar: new Avatar({
      id: "1",
      src: "https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg",
      text: "Ivanov Sergey",
    }).getContent(),
  },
});
