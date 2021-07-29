import "../profile/profile.scss";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import ProfileEditPassword from "./profileEditPassword";
import { Avatar } from "../../components/avatar";

const template: string = `
.profile__avatar
    #profileAvatar
form.profile__form
    .profile__inputs-box
        #password
        #newPassword
        #repeatPassword
    #button`;

/* eslint-disable no-new */
new ProfileEditPassword({
  template,
  children: {
    password: new Input({
      theme: "profile",
      label: "Старый пароль",
      id: "oldpassword",
      placeholder: "Введите старый пароль",
      name: "oldpassword",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    newPassword: new Input({
      theme: "profile",
      label: "Новый пароль",
      id: "password",
      placeholder: "Введите новый пароль",
      name: "password",
      type: "password",
      value: "",
      disabled: false,
      error: "Ошибка",
    }).getContent(),
    repeatPassword: new Input({
      theme: "profile",
      label: "Повторите новый пароль",
      id: "repassword",
      placeholder: "Повторите новый пароль",
      name: "repassword",
      type: "password",
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
