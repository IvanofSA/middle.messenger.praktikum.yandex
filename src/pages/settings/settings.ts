import { compile } from "pug";
import Block from "../../utils/Block";
import PageModel from "../../constans/page.model";
import Profile from "../profile/profile";
import { Avatar } from "../../components/avatar";
import AuthApi from "../../api/authApi";

const template: string = `
.profile__container
    .profile__avatar
      #profileAvatar
    #profile`;

export default class Settings extends Block {
  constructor(props: PageModel) {
    const profile = new Profile({});
    const profileAvatar = new Avatar({});
    const events = {};
    super({
      tagName: "main",
      classNames: ["profile", "main"],
      children: {
        profile,
        profileAvatar,
      },
      ...props,
      events,
    });
  }

  componentDidMount() {
    new AuthApi().getUserInfo().then((data) => {
      const result = JSON.parse(data);
      const { avatar, second_name, first_name } = result;
      const { profileAvatar } = this.props.children;
      profileAvatar.setProps({
        src: avatar,
        text: `${first_name} ${second_name}`,
      });
    });
  }

  render(): string {
    return compile(template)(this.props);
  }
}
