import { render } from "pug";
import Block from "../../utils/Block/Block";
import PageModel from "../../constans/page.model";
import Profile from "../../components/profile/profile";
import ProfileEdit from "../../components/profileEdit/profileEdit";
import ProfileEditPassword from "../../components/profileEditPassword/profileEditPassword";
import { Avatar } from "../../components/avatar";
import { authAPI } from "../../api/authApi";

const template: string = `
.profile__container
    .profile__avatar
      #profileAvatar
    if type === 'edit'
        #profileEdit
    else if type === 'password'
        #profileEditPassword
    else
        #profile`;

export default class Settings extends Block {
  type: string;
  user: {};

  constructor(props: PageModel) {
    const profile = new Profile({});
    const profileEdit = new ProfileEdit({});
    const profileEditPassword = new ProfileEditPassword({});
    const profileAvatar = new Avatar({});
    const events = {
      editLink: {
        eventName: "click",
        tagEvent: ".profile__link_edit",
        callback: (e) => {
          e.preventDefault();
          this.setProps({
            type: "edit",
          });
          this.setUserData(profileEdit.props.children);
        },
      },
      passLink: {
        eventName: "click",
        tagEvent: ".profile__link_passwords",
        callback: (e) => {
          e.preventDefault();
          this.setProps({
            type: "password",
          });
        },
      },
    };
    super({
      tagName: "main",
      classNames: ["profile", "main"],
      children: {
        profile,
        profileAvatar,
        profileEdit,
        profileEditPassword,
      },
      events,
      ...props,
    });
    this.type = "";
    this.user = {};
  }

  setUserData({
    inputEmail,
    inputLogin,
    inputFirstName,
    inputSecondName,
    inputPhone,
  } = {}) {
    inputEmail.setProps({
      value: this.user.email,
    });
    inputLogin.setProps({
      value: this.user.login,
    });
    inputFirstName.setProps({
      value: this.user.first_name,
    });
    inputSecondName.setProps({
      value: this.user.second_name,
    });
    inputPhone.setProps({
      value: this.user.phone,
    });
  }

  componentDidMount() {
    authAPI
      .getUserInfo()
      .then((payload) => {
        const user = payload;
        this.user = { ...user };
        const { avatar, second_name, first_name } = user;
        const { profileAvatar, profile } = this.props.children;

        profileAvatar.setProps({
          src: avatar,
          text: `${first_name} ${second_name}`,
        });

        this.setUserData(profile.props.children);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render(): string {
    const { type } = this.props;
    return render(template, { type });
  }
}
