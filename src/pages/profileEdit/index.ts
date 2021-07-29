import "../profile/profile.scss";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import ProfileEdit from "./profileEdit";
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
    #button`;

/* eslint-disable no-new */
new ProfileEdit({
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
      disabled: false,
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
      disabled: false,
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
      disabled: false,
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
      disabled: false,
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
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    button: new Button({
      text: "Сохранить",
      classNames: ["profile__button"],
      type: "submit",
      disabled: false,
    }).getContent(),
    profileAvatar: new Avatar({
      id: "1",
      src: "https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg",
      text: "Ivanov Sergey",
    }).getContent(),
  },
});
